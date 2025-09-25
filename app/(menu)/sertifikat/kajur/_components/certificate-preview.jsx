"use client";

import { useState, useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import SertifikatPDF from "../../_components/sertifikat-pdf";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RotateCcw, Plus, Minus } from "lucide-react";

export default function CertificatePreview({ kajur, onPositionChange }) {
  const [signatureStyle, setSignatureStyle] = useState({
    top: kajur?.signature_top || 0,
    left: kajur?.signature_left || 0,
    height: kajur?.signature_height || 100,
    width: kajur?.signature_width || 200
  });
  const [isLockedRatio, setIsLockedRatio] = useState(true);
  const [originalRatio, setOriginalRatio] = useState(2); // width/height ratio default

  // Update signature style ketika kajur berubah
  useEffect(() => {
    if (kajur) {
      setSignatureStyle({
        top: kajur.signature_top || 0,
        left: kajur.signature_left || 0,
        height: kajur.signature_height || 100,
        width: kajur.signature_width || 200
      });
    }

    if (kajur?.tanda_tangan) {
      setOriginalRatio(2);
    }
  }, [kajur]);

  // Panggil onPositionChange ketika signatureStyle berubah
  useEffect(() => {
    if (onPositionChange) {
      onPositionChange(signatureStyle);
    }
  }, [signatureStyle, onPositionChange]);

  const handleStyleChange = (property, value) => {
    setSignatureStyle(prev => {
      const newStyle = { ...prev, [property]: value };

      // Jika ratio terkunci dan mengubah height/width, sesuaikan yang lain
      if (isLockedRatio) {
        if (property === 'height') {
          newStyle.width = Math.round(value * originalRatio);
        } else if (property === 'width') {
          newStyle.height = Math.round(value / originalRatio);
        }
      }

      return newStyle;
    });
  };

  const resetToDefault = () => {
    const defaultStyle = {
      top: 0,
      left: 0,
      height: 100,
      width: 200
    };
    setSignatureStyle(defaultStyle);
  };

  const handleIncrement = (property, amount) => {
    setSignatureStyle(prev => {
      const newValue = prev[property] + amount;
      const newStyle = { ...prev, [property]: newValue };

      // Jika ratio terkunci dan mengubah height/width, sesuaikan yang lain
      if (isLockedRatio) {
        if (property === 'height') {
          newStyle.width = Math.round(newValue * originalRatio);
        } else if (property === 'width') {
          newStyle.height = Math.round(newValue / originalRatio);
        }
      }

      return newStyle;
    });
  };

  // Buat objek kajur dengan style yang disesuaikan
  const kajurWithStyle = kajur ? {
    ...kajur,
    signatureStyle: signatureStyle
  } : null;

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
                  value={signatureStyle.top}
                  onChange={(e) => handleStyleChange('top', parseInt(e.target.value) || 0)}
                  className="text-center"
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
                  value={signatureStyle.left}
                  onChange={(e) => handleStyleChange('left', parseInt(e.target.value) || 0)}
                  className="text-center"
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
                  value={signatureStyle.height}
                  onChange={(e) => handleStyleChange('height', parseInt(e.target.value) || 50)}
                  className="text-center"
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
                  value={signatureStyle.width}
                  onChange={(e) => handleStyleChange('width', parseInt(e.target.value) || 100)}
                  className="text-center"
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
        <h3 className="text-lg font-semibold mb-4">Preview Sertifikat</h3>
        <div className="border rounded-lg overflow-hidden">
          <PDFViewer style={{ width: "100%", height: "600px" }}>
            <SertifikatPDF
              kajur={kajurWithStyle}
            />
          </PDFViewer>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          * Preview menggunakan data dummy aslab untuk demonstrasi
        </p>
      </div>
    </div>
  );
}