"use client";

import React from "react";
import {
  Document,
  Image,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

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
    padding: 40,
    fontFamily: "CenturyGothic",
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
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 12,
    textAlign: "left",
  },
  headerTextBold: {
    fontSize: 16,
    letterSpacing: 3,
    textAlign: "left",
    fontWeight: "bold",
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
    fontFamily: "CenturyGothic",
    textTransform: "uppercase",
  },
  body: {
    marginTop: 20,
    marginBottom: 20,
  },
  dedication: {
    fontSize: 14,
    marginBottom: 15,
    textTransform: "uppercase",
  },
  recipientName: {
    borderBottom: 1,
    paddingBottom: 15,
    fontSize: 38,
    fontWeight: "bold",
    fontFamily: "CenturyGothic",
    marginBottom: 15,
    textTransform: "uppercase",
  },
  reason: {
    fontSize: 14,
    marginBottom: 30,
  },
  signatureBlock: {
    marginTop: 10,
    paddingRight: 20,
    alignSelf: "flex-start",
  },
  signatureName: {
    fontSize: 14,
    fontFamily: "CenturyGothic",
    paddingBottom: 2,
    borderBottom: 1,
    marginBottom: 2,
    marginTop: 70,
  },
  signatureNIP: {
    fontSize: 14,
  },
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
    width: 150,
  },
  detailValue: {
    flexGrow: 1,
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

// Fungsi untuk mendapatkan periode aajaran dari courses
const getPeriodFromCourses = (courses) => {
  if (!courses || courses.length === 0) return "GENAP 2021/2022 - GENAP 2023/2024";

  const semesters = courses.map(course => course.semester);
  const uniqueSemesters = [...new Set(semesters)];

  if (uniqueSemesters.length === 1) {
    return uniqueSemesters[0];
  }

  // Sort semesters chronologically
  uniqueSemesters.sort((a, b) => {
    const [semA, yearA] = a.split(' ');
    const [semB, yearB] = b.split(' ');

    const yearNumA = parseInt(yearA.split('/')[0]);
    const yearNumB = parseInt(yearB.split('/')[0]);

    if (yearNumA !== yearNumB) return yearNumA - yearNumB;
    return semA === "Gasal" ? -1 : 1;
  });

  const earliest = uniqueSemesters[0];
  const latest = uniqueSemesters[uniqueSemesters.length - 1];

  return `${earliest} S.D. ${latest}`;
};

// Komponen Sertifikat PDF
const SertifikatPDF = ({ data = {}, kajur }) => {
  // Transform data aslab ke format yang dibutuhkan template sertifikat
  console.log('ada data', kajur);
  const certificateData = {
    recipientName: data.nama || "NAMA MAHASISWA",
    nim: data.nim || "NIM",
    programStudi: data.program_studi || "PROGRAM STUDI",
    activity: 'PRAKTIKUM DI JURUSAN INFORMATIKA \nUNIVERSITAS PEMBANGUNAN NASIONAL "VETERAN" YOGYAKARTA',
    period: getPeriodFromCourses(data.courses),
    role: "ASISTEN",
    chairmanName: kajur?.nama || "Dr. Heriyanto, A.Md, S.Kom., M.Cs.",
    chairmanNIP: kajur?.nip || "19770608 202121 1004",
    signatureStyle: {
      top: Number(kajur?.signature_top ?? 0),
      left: Number(kajur?.signature_left ?? 0),
      height: Number(kajur?.signature_height ?? 100),
      width: Number(kajur?.signature_width ?? 200),
    },
    courses: data.courses ? data.courses.map((course, index) => ({
      no: index + 1,
      subject: course.mata_kuliah,
      year: course.semester
    })) : [],
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
          {/* TANDA TANGAN */}
          {kajur?.tanda_tangan && (
            <Image
              src={kajur.tanda_tangan}
              style={{
                position: "absolute",
                zIndex: -1,
                height: certificateData.signatureStyle.height,
                width: certificateData.signatureStyle.width,
                top: certificateData.signatureStyle.top,
                left: certificateData.signatureStyle.left,
              }}
            />
          )}
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
        {certificateData.courses.length > 0 && (
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
        )}
        <View style={styles.pageFooter}>
          <Image src="/footer.png" />
        </View>
      </Page>
    </Document>
  );
};

export default SertifikatPDF;
