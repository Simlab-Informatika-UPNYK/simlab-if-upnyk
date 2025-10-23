import KajurClient from "./_components/kajur-client";
import { getKajurPublic, updateKajurFromForm } from "./actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function KajurPage() {
    const kajur = await getKajurPublic();

    return (
        <div className="container mx-auto px-4 py-2">
            <h1 className="text-3xl font-bold">Konfigurasi Kepala Jurusan</h1>
            <p className="text-gray-500 mb-4">
                Atur data kepala jurusan dan tanda tangan untuk sertifikat
            </p>

            <KajurClient initial={kajur} action={updateKajurFromForm} />
        </div>
    );
}