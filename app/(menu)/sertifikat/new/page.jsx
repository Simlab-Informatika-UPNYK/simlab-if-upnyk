"use client";

import React, { useState, useEffect } from "react";
import {
  PDFViewer,
  Document,
  Image,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { getAllAslab } from "../actions";
import { MahasiswaCombobox } from "@/app/(menu)/sertifikat/_components/mahasiswa-combobox";

Font.register({
  family: "CenturyGothic",
  fonts: [
    { src: "/fonts/centurygothic.ttf" },
    { src: "/fonts/centurygothic_bold.ttf", fontWeight: "bold" },
  ],
});
// Definisi style untuk PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    color: "#30337A",
    backgroundColor: "#FFFFFF",
    padding: 40, // Beri padding di sekitar halaman
    fontFamily: "CenturyGothic", // Contoh font, pastikan font terdaftar jika custom
  },
  header: {
    textAlign: "left",
    marginTop: 20,
    marginBottom: 20,
  },
  flex: {
    flexDirection: "row",
  },
  logo: {
    // Ganti dengan gaya logo Anda jika ada
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  headerText: {
    // fontWeight: "bold",
    fontSize: 12,
    textAlign: "left",
  },
  headerTextBold: {
    fontSize: 16,
    letterSpacing: 3,
    textAlign: "left",
    fontWeight: "bold", // Tidak semua font mendukung ini, CenturyGothic mungkin lebih baik
    fontFamily: "CenturyGothic",
  },
  titleSection: {
    marginTop: 30,
    marginBottom: 30,
  },
  mainTitle: {
    fontSize: 60,
    fontWeight: "bold",
    fontFamily: "CenturyGothic",
    marginBottom: 5,
    textTransform: "uppercase",
  },
  subTitle: {
    fontSize: 38,
    // fontWeight: "bold",
    fontFamily: "CenturyGothic",
    // textAlign: "center",
    textTransform: "uppercase",
  },
  body: {
    // flexGrow: 1, // Agar bagian ini mengisi ruang tersisa sebelum footer/signature
    marginTop: 20,
    marginBottom: 20,
  },
  dedication: {
    fontSize: 14,
    // textAlign: "center",
    marginBottom: 15,
    textTransform: "uppercase",
  },
  recipientName: {
    borderBottom: 1,
    paddingBottom: 15,
    fontSize: 38,
    fontWeight: "bold",
    fontFamily: "CenturyGothic",
    // textAlign: "center",
    marginBottom: 15,
    textTransform: "uppercase",
  },
  reason: {
    fontSize: 14,
    marginBottom: 30,
  },
  signatureBlock: {
    marginTop: 10, // Jarak dari atas
    paddingRight: 20, // Sesuaikan posisi
    alignSelf: "flex-start", // Posisikan block ke kanan
  },
  signatureName: {
    fontSize: 14,
    fontFamily: "CenturyGothic",
    paddingBottom: 2,
    borderBottom: 1,
    marginBottom: 2,
    marginTop: 70, // Jarak antara jabatan dan nama
  },
  signatureNIP: {
    fontSize: 14,
  },
  // Styles for Page 2
  detailsSection: {
    marginTop: 20,
    marginBottom: 20,
    textTransform: "uppercase",
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 5,
    fontSize: 12,
  },
  detailLabel: {
    fontWeight: "bold",
    width: 150, // Lebar tetap untuk label
  },
  detailValue: {
    flexGrow: 1, // Isi sisa ruang
    fontFamily: "CenturyGothic",
  },
  roleSection: {
    marginTop: 8,
    marginBottom: 8,
  },
  roleText: {
    fontSize: 13,
    fontWeight: "bold",
    fontFamily: "CenturyGothic",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  table: {
    // display: "table", // react-pdf belum sepenuhnya mendukung display: table
    width: "auto",
    marginTop: 20,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
    minHeight: 20,
  },
  tableHeader: {
    backgroundColor: "#004AAD",
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "CenturyGothic",
  },
  tableColHeader: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "CenturyGothic",
  },
  tableCol: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontSize: 12,
  },
  colNo: {
    width: "10%",
    textAlign: "center",
  },
  colSubject: {
    width: "60%",
  },
  colYear: {
    width: "30%",
    textAlign: "center",
  },
  pageHeader: {
    position: "absolute",
    top: -60,
    left: 0,
    right: 0,
  },
  pageFooter: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
  },
});

// Komponen Sertifikat PDF
const SertifikatPDF = ({ data }) => {
  // Transform data aslab ke format yang dibutuhkan template sertifikat
  const certificateData = {
    recipientName: data.nama || "NAMA MAHASISWA",
    nim: data.nim || "NIM",
    programStudi: data.program_studi || "PROGRAM STUDI",
    activity:
      'PRAKTIKUM DI JURUSAN INFORMATIKA \nUNIVERSITAS PEMBANGUNAN NASIONAL "VETERAN" YOGYAKARTA',
    period: data.periode_ajaran || "GENAP 2021/2022 - GENAP 2023/2024",
    role: "ASISTEN",
    chairmanName: "Dr. Heriyanto, A.Md, S.Kom., M.Cs.",
    chairmanNIP: "19770608 202121 1004",
    // Gunakan data courses dari aslab atau array kosong jika tidak ada
    courses: data.courses || [],
  };

  return (
    <Document>
      {/* Halaman 1 */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageHeader}>
          <Image src="/footer.png" />
        </View>
        <View style={[styles.header, styles.flex]}>
          <View style={{ flexDirection: "row", marginRight: 10 }}>
            <Image style={styles.logo} src="/logo/logo-if.png" />
            <Image style={styles.logo} src="/logo/logo-upn.png" />
          </View>
          <View>
            <Text style={styles.headerTextBold}>LABORATORIUM</Text>
            <Text style={styles.headerText}>JURUSAN INFORMATIKA</Text>
            <Text style={styles.headerText}>UPN VETERAN YOGYAKARTA</Text>
          </View>
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>SERTIFIKAT</Text>
          <Text style={styles.subTitle}>PENGHARGAAN</Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.dedication}>DIDEDIKASIKAN KEPADA</Text>
          <Text style={styles.recipientName}>
            {certificateData.recipientName}
          </Text>
          <Text style={styles.reason}>
            DALAM KEGIATAN {certificateData.activity} {certificateData.period}
          </Text>
        </View>

        <View style={styles.signatureBlock} fixed>
          <Text style={styles.headerText}>KETUA JURUSAN INFORMATIKA</Text>
          <Text style={styles.signatureName}>
            {certificateData.chairmanName}
          </Text>
          <View></View>
          <Text style={styles.signatureNIP}>
            NIP. {certificateData.chairmanNIP}
          </Text>
        </View>
        <View style={styles.pageFooter}>
          <Image src="/footer.png" />
        </View>
      </Page>

      {/* Halaman 2 */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageHeader}>
          <Image src="/footer.png" />
        </View>
        <View style={[styles.header, styles.flex]}>
          <View style={{ flexDirection: "row", marginRight: 10 }}>
            <Image style={styles.logo} src="/logo/logo-if.png" />
            <Image style={styles.logo} src="/logo/logo-upn.png" />
          </View>
          <View>
            <Text style={styles.headerTextBold}>LABORATORIUM</Text>
            <Text style={styles.headerText}>JURUSAN INFORMATIKA</Text>
            <Text style={styles.headerText}>UPN VETERAN YOGYAKARTA</Text>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>NAMA MAHASISWA</Text>
            <Text>: </Text>
            <Text style={styles.detailValue}>
              {certificateData.recipientName}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>NIM</Text>
            <Text>: </Text>
            <Text style={styles.detailValue}>{certificateData.nim}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>PROGRAM STUDI</Text>
            <Text>: </Text>
            <Text style={styles.detailValue}>
              {certificateData.programStudi}
            </Text>
          </View>
          <View style={styles.roleSection}>
            <Text style={styles.roleText}>SEBAGAI {certificateData.role}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>TAHUN AJARAN</Text>
            <Text>: </Text>
            <Text style={styles.detailValue}>{certificateData.period}</Text>
          </View>
        </View>

        {/* Tabel Mata Kuliah */}
        <View style={styles.table}>
          {/* Header Tabel */}
          <View style={[styles.tableRow, styles.tableHeader]} fixed>
            <Text style={[styles.tableColHeader, styles.colNo]}>No</Text>
            <Text style={[styles.tableColHeader, styles.colSubject]}>
              Mata Kuliah Praktikum
            </Text>
            <Text style={[styles.tableColHeader, styles.colYear]}>
              Tahun Ajaran
            </Text>
          </View>
          {/* Baris Data Tabel */}
          {certificateData.courses.map((course) => (
            <View style={styles.tableRow} key={course.no} wrap={false}>
              <Text style={[styles.tableCol, styles.colNo]}>{course.no}</Text>
              <Text style={[styles.tableCol, styles.colSubject]}>
                {course.subject}
              </Text>
              <Text style={[styles.tableCol, styles.colYear]}>
                {course.year}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.pageFooter}>
          <Image src="/footer.png" />
        </View>
      </Page>
    </Document>
  );
};

const NewPage = () => {
  const [aslabData, setAslabData] = useState([]);
  const [selectedAslab, setSelectedAslab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewer] = useState({ width: "100%", height: "50rem" });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllAslab();
        setAslabData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAslab = aslabData.filter((aslab) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      aslab.nama.toLowerCase().includes(searchLower) ||
      aslab.nim.toLowerCase().includes(searchLower) ||
      aslab.program_studi.toLowerCase().includes(searchLower)
    );
  });

  const handleSelectAslab = (aslab) => {
    setSelectedAslab(aslab);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Pilih Mahasiswa:
        </label>
        <MahasiswaCombobox 
          data={filteredAslab}
          value={selectedAslab}
          onSelect={handleSelectAslab}
        />
      </div>

      {selectedAslab && (
        <div className="flex flex-col gap-4">
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Preview Sertifikat</h2>
            <PDFViewer style={viewer}>
              <SertifikatPDF data={selectedAslab} />
            </PDFViewer>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPage;
