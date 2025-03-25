import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BackButton from "@/components/back-button";
import { getCertificateRequestByNim } from "../actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function HonorAsistenDetail({ params }) {
  const nim = (await params).id;
  const data = await getCertificateRequestByNim(nim);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Permintaan Sertifikat</h1>
        <div className="flex gap-2">
          <BackButton />
        </div>
      </div>

      {data ? (
        <>
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm text-gray-500">Nama Mahasiswa</h3>
              <p className="font-medium">{data.nama_mahasiswa}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">NIM</h3>
              <p className="font-medium">{data.nim}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Program Studi</h3>
              <p className="font-medium">{data.program_studi}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Tahun Ajaran</h3>
              <p className="font-medium">{data.tahun_ajaran}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Status</h3>
              <p className="font-medium">{data.status}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Keterangan</h3>
              <p className="font-medium">{data.keterangan ?? "-"}</p>
            </div>
          </div>

          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Mata Kuliah Praktikum</TableHead>
                <TableHead>Tahun Ajaran</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.mata_kuliah_praktikum.map((matkul, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{matkul.nama}</TableCell>
                  <TableCell>{matkul.tahun_ajaran}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="w-full flex mt-4">
            <div className="flex ms-auto gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="px-8" variant="outline">
                    Tolak
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Tolak Permintaan Sertifikat
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid items-center gap-4">
                      <Label htmlFor="alasan">Alasan Penolakan</Label>
                      <Textarea id="alasan" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Tolak</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button className="px-8">Setuju</Button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center p-6">
          <p>Data sertifikat tidak ditemukan</p>
        </div>
      )}
    </div>
  );
}
