"use client";

import { useState, useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import SertifikatPDF from "./sertifikat-pdf";
import { getAslabDetailByNim } from "../actions";

export default function CertificatePreview({ nim, namaAsisten, onCertificateDataLoaded }) {
  const [certificateData, setCertificateData] = useState("Default");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificateData = async () => {
      if (!nim) return;

      setLoading(true);
      setError(null);
      try {
        const detail = await getAslabDetailByNim(nim);

        // Format data untuk sertifikat
        const formattedData = {
          ...detail,
          nama: namaAsisten,
          nim: nim,
        };

        // setCertificateData(formattedData);
        setCertificateData(detail);
        if (onCertificateDataLoaded) {
          onCertificateDataLoaded(formattedData);
        }
      } catch (err) {
        console.error("Error fetching certificate data:", err);
        setError("Gagal memuat data sertifikat");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificateData();
  }, [nim, namaAsisten, onCertificateDataLoaded]);

  if (loading) {
    return (
      <div className="mt-6 pt-4 border-t">
        <h4 className="text-lg font-semibold mb-3">Sertifikat Anda</h4>
        <div className="flex justify-center items-center h-32">
          <p>Memuat data sertifikat...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 pt-4 border-t">
        <h4 className="text-lg font-semibold mb-3">Sertifikat Anda</h4>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  if (!certificateData) {
    return null;
  }

  return (
    <div className="mt-6 pt-4 border-t">
      <h4 className="text-lg font-semibold mb-3">Sertifikat Anda</h4>
      <p className="text-gray-600 mb-4">
        Permintaan sertifikat Anda telah disetujui. Anda dapat melihat dan mengunduh sertifikat.
      </p>

      <PDFViewer style={{ width: "100%", height: "50rem" }}>
        <SertifikatPDF data={certificateData} />
      </PDFViewer>
    </div>
  );
}
