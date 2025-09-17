export function JadwalAslabCard({ jadwal, tahunSemester }) {
  const formatHari = (hari) => {
    const days = {
      Senin: "Senin",
      Selasa: "Selasa",
      Rabu: "Rabu",
      Kamis: "Kamis",
      Jumat: "Jumat",
      Sabtu: "Sabtu",
      Minggu: "Minggu",
    };
    return days[hari] || hari;
  };

  return (
    <>
      <div className="space-y-3">
        <div className="">
          <h2 className="text-lg font-semibold">Jadwal Praktikum</h2>
          <p className="text-sm text-muted-foreground">
            {tahunSemester 
              ? `Jadwal mengajar Anda untuk ${tahunSemester.semester} ${tahunSemester.tahun_ajaran}`
              : 'Jadwal mengajar Anda minggu ini'
            }
          </p>
        </div>
        {jadwal.length === 0 ? (
          <p className="text-muted-foreground text-sm">Tidak ada jadwal praktikum</p>
        ) : (
          jadwal.map((item) => (
            <div key={item.id} className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">{item.mataKuliah?.nama}</h4>
                <span className="bg-primary text-xs text-white px-2 py-1 rounded">{formatHari(item.hari)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>
                  <span className="font-medium">Kelas:</span> {item.kelas}
                </div>
                <div>
                  <span className="font-medium">Lab:</span> {item.lab?.nama}
                </div>
                <div>
                  <span className="font-medium">Waktu:</span> {item.waktu_mulai} - {item.waktu_selesai}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
