"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import SertifikatPDF from "../../_components/sertifikat-pdf";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RotateCcw, Plus, Minus } from "lucide-react";

export default function CertificatePreview({ kajur, signaturePreviewUrl, signaturePosition, onPositionChange }) {
  const [isLockedRatio, setIsLockedRatio] = useState(true);
  const [originalRatio, setOriginalRatio] = useState(2); // width/height ratio default

  // Local state untuk input controls (real-time)
  const [localInputPosition, setLocalInputPosition] = useState({
    top: 0,
    left: 0,
    height: 100,
    width: 200
  });

  // State untuk debounce tracking
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasPendingChanges, setHasPendingChanges] = useState(false);

  // Sync local input dengan signaturePosition dari parent
  useEffect(() => {
    if (signaturePosition) {
      setLocalInputPosition(signaturePosition);
      setHasPendingChanges(false);
    }
  }, [signaturePosition]);

  // Debounce update ke parent
  useEffect(() => {
    if (!hasPendingChanges || !onPositionChange) return;

    setIsUpdating(true);
    const timer = setTimeout(() => {
      onPositionChange(localInputPosition);
      setHasPendingChanges(false);
      setIsUpdating(false);
    }, 500); // 2000ms debounce

    return () => {
      clearTimeout(timer);
      if (hasPendingChanges) {
        setIsUpdating(false);
      }
    };
  }, [localInputPosition, hasPendingChanges, onPositionChange]);

  // Set original ratio ketika kajur berubah
  useEffect(() => {
    if (kajur?.tanda_tangan) {
      setOriginalRatio(2);
    }
  }, [kajur]);

  // Memoize PDFViewer key untuk prevent unnecessary re-renders
  const pdfViewerKey = useMemo(() => {
    const signatureKey = signaturePreviewUrl ? 'custom' : 'existing';
    const positionKey = `${signaturePosition?.top || 0}-${signaturePosition?.left || 0}-${signaturePosition?.height || 100}-${signaturePosition?.width || 200}`;
    return `${signatureKey}-${positionKey}`;
  }, [signaturePreviewUrl, signaturePosition]);

  const handleStyleChange = useCallback((property, value) => {
    if (!localInputPosition) return;

    let newValue = parseInt(value) || 0;

    // Validate minimum values (position can be negative, but size must be positive)
    if (property === 'height') {
      newValue = Math.max(50, newValue);
    } else if (property === 'width') {
      newValue = Math.max(100, newValue);
    }
    // top and left can be negative for flexible positioning

    const newPosition = { ...localInputPosition, [property]: newValue };

    // Jika ratio terkunci dan mengubah height/width, sesuaikan yang lain
    if (isLockedRatio && (property === 'height' || property === 'width')) {
      if (property === 'height') {
        newPosition.width = Math.max(100, Math.round(newValue * originalRatio));
      } else if (property === 'width') {
        newPosition.height = Math.max(50, Math.round(newValue / originalRatio));
      }
    }

    // Update local input state immediately for UI responsiveness
    setLocalInputPosition(newPosition);
    setHasPendingChanges(true);
  }, [localInputPosition, isLockedRatio, originalRatio]);

  const resetToDefault = useCallback(() => {
    const defaultPosition = {
      top: 0,
      left: 0,
      height: 100,
      width: 200
    };

    // Update local input state immediately
    setLocalInputPosition(defaultPosition);
    setHasPendingChanges(true);
  }, []);

  const handleIncrement = useCallback((property, amount) => {
    if (!localInputPosition) return;

    let newValue = (localInputPosition[property] || 0) + amount;

    // Validate minimum values (position can be negative, but size must be positive)
    if (property === 'height') {
      newValue = Math.max(50, newValue);
    } else if (property === 'width') {
      newValue = Math.max(100, newValue);
    }
    // top and left can be negative for flexible positioning

    const newPosition = { ...localInputPosition, [property]: newValue };

    // Jika ratio terkunci dan mengubah height/width, sesuaikan yang lain
    if (isLockedRatio && (property === 'height' || property === 'width')) {
      if (property === 'height') {
        newPosition.width = Math.max(100, Math.round(newValue * originalRatio));
      } else if (property === 'width') {
        newPosition.height = Math.max(50, Math.round(newValue / originalRatio));
      }
    }

    // Update local input state immediately for UI responsiveness
    setLocalInputPosition(newPosition);
    setHasPendingChanges(true);
  }, [localInputPosition, isLockedRatio, originalRatio]);

  // Buat objek kajur dengan style yang disesuaikan (memoized)
  const kajurWithStyle = useMemo(() => {
    if (!kajur) return null;

    return {
      ...kajur,
      signatureStyle: signaturePosition,
      signaturePreviewUrl: signaturePreviewUrl
    };
  }, [kajur, signaturePosition, signaturePreviewUrl]);

  // Debug: Track signature changes
  useEffect(() => {
    console.log('CertificatePreview - signaturePreviewUrl changed:', signaturePreviewUrl);
    console.log('CertificatePreview - kajurWithStyle:', kajurWithStyle);
  }, [signaturePreviewUrl, kajurWithStyle]);

  if (!kajur) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-500">Data kepala jurusan belum diatur</p>
        <p className="text-sm text-gray-400 mt-2">Atur data kajur terlebih dahulu untuk melihat preview</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Kontrol Posisi Tanda Tangan */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Pengaturan Posisi Tanda Tangan</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={resetToDefault}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kontrol Position */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="top-position" className="block mb-2 font-medium">
                Posisi Atas (Top)
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleIncrement('top', -10)}
                  className="h-9 w-9 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="top-position"
                  type="number"
                  value={localInputPosition?.top || 0}
                  onChange={(e) => handleStyleChange('top', parseInt(e.target.value) || 0)}
                  placeholder="Bisa negatif"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleIncrement('top', 10)}
                  className="h-9 w-9 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-500 ml-2">px</span>
              </div>
            </div>

            <div>
              <Label htmlFor="left-position" className="block mb-2 font-medium">
                Posisi Kiri (Left)
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleIncrement('left', -10)}
                  className="h-9 w-9 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="left-position"
                  type="number"
                  value={localInputPosition?.left || 0}
                  onChange={(e) => handleStyleChange('left', parseInt(e.target.value) || 0)}
                  placeholder="Bisa negatif"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleIncrement('left', 10)}
                  className="h-9 w-9 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-500 ml-2">px</span>
              </div>
            </div>
          </div>

          {/* Kontrol Size */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="height-size" className="block mb-2 font-medium">
                Tinggi (Height)
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleIncrement('height', -10)}
                  className="h-9 w-9 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="height-size"
                  type="number"
                  value={localInputPosition?.height || 100}
                  onChange={(e) => handleStyleChange('height', parseInt(e.target.value) || 50)}
                  min="50"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleIncrement('height', 10)}
                  className="h-9 w-9 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-500 ml-2">px</span>
              </div>
            </div>

            <div>
              <Label htmlFor="width-size" className="block mb-2 font-medium">
                Lebar (Width)
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleIncrement('width', -10)}
                  className="h-9 w-9 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="width-size"
                  type="number"
                  value={localInputPosition?.width || 200}
                  onChange={(e) => handleStyleChange('width', parseInt(e.target.value) || 100)}
                  min="100"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleIncrement('width', 10)}
                  className="h-9 w-9 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-500 ml-2">px</span>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle Lock Ratio */}
        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="lock-ratio"
            checked={isLockedRatio}
            onChange={(e) => setIsLockedRatio(e.target.checked)}
            className="rounded border-gray-300"
          />
          <Label htmlFor="lock-ratio" className="text-sm">
            Kunci rasio aspek (Width/Height akan menyesuaikan otomatis)
          </Label>
        </div>
      </div>

      {/* Preview Sertifikat PDF */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Preview Sertifikat</h3>
          {hasPendingChanges && (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full animate-pulse"></div>
              <span>Sedang mengupdate...</span>
            </div>
          )}
        </div>
        <div className="border rounded-lg overflow-hidden relative">
          {isUpdating && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
              <div className="text-sm text-gray-600">Memperbarui preview...</div>
            </div>
          )}
          <PDFViewer
            key={pdfViewerKey}
            style={{ width: "100%", height: "600px" }}
          >
            <SertifikatPDF
              kajur={kajurWithStyle}
            />
          </PDFViewer>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          * Preview menggunakan data dummy aslab untuk demonstrasi
          {hasPendingChanges && (
            <div className="mt-1 text-orange-600">
              ⚠️ Preview akan diperbarui setelah 2 detik untuk performa yang lebih baik
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
