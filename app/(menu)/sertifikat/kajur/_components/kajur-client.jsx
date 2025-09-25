"use client";

import { useState, useRef, useEffect, useMemo, useActionState } from "react";
import { useFormStatus } from "react-dom";
import BackButton from "@/components/back-button";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImagePlus, Trash2, FileText } from "lucide-react";
import CertificatePreview from "./certificate-preview";

const createInitialFormState = (initial) => ({
    status: "idle",
    message: null,
    data: initial || null,
});

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Menyimpan..." : "Simpan"}
        </Button>
    );
}

export default function KajurClient({ initial, action }) {
    const { toast } = useToast();
    const [displayKajur, setDisplayKajur] = useState(initial || null);
    const [namaKajur, setNamaKajur] = useState(initial?.nama || "");
    const [nipKajur, setNipKajur] = useState(initial?.nip || "");
    const [signatureFile, setSignatureFile] = useState(null);
    const [editing, setEditing] = useState(false);
    const [signaturePosition, setSignaturePosition] = useState({
        top: initial?.signature_top || 0,
        left: initial?.signature_left || 0,
        height: initial?.signature_height || 100,
        width: initial?.signature_width || 200
    });
    const fileInputRef = useRef(null);

    const initialFormState = useMemo(() => createInitialFormState(initial), [initial]);
    const [formState, formAction] = useActionState(action, initialFormState);

    useEffect(() => {
        setDisplayKajur(initial || null);
        setSignaturePosition({
            top: initial?.signature_top || 0,
            left: initial?.signature_left || 0,
            height: initial?.signature_height || 100,
            width: initial?.signature_width || 200
        });
    }, [initial]);

    useEffect(() => {
        setNamaKajur(displayKajur?.nama || "");
        setNipKajur(displayKajur?.nip || "");
    }, [displayKajur]);

    useEffect(() => {
        if (!formState || formState.status === "idle") return;

        if (formState.status === "success") {
            toast({
                title: "Berhasil",
                description: formState.message || "Data kepala jurusan berhasil disimpan.",
            });

            setDisplayKajur(formState.data || null);
            setEditing(false);
            setSignatureFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } else if (formState.status === "error") {
            toast({
                title: "Gagal menyimpan",
                description: formState.message || "Terjadi kesalahan pada saat menyimpan data.",
                variant: "destructive",
            });
        }
    }, [formState, toast]);

    const handleFileChange = (e) => {
        const f = e.target.files?.[0] ?? null;
        if (!f) {
            setSignatureFile(null);
            return;
        }

        const allowed = ["image/png", "image/jpeg"];
        if (!allowed.includes(f.type)) {
            toast({ title: "Format tidak didukung", description: "Silakan unggah PNG atau JPG.", variant: "destructive" });
            return;
        }

        setSignatureFile(f);
    };

    const handleRemoveSignature = () => {
        setSignatureFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleToggleEditing = () => {
        if (editing) {
            setNamaKajur(displayKajur?.nama || "");
            setNipKajur(displayKajur?.nip || "");
            setSignatureFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
        setEditing((prev) => !prev);
    };

    const currentSignatureUrl = signatureFile ? null : displayKajur?.tanda_tangan || null;

    return (
        <div className="container mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Konfigurasi Kepala Jurusan</h1>
                <div className="flex gap-4">
                    <Button type="button" onClick={handleToggleEditing}>{editing ? "Batal" : "Edit"}</Button>
                    <BackButton />
                </div>
            </div>
            <form action={formAction}>
                <div className="max-w-3xl">
                    <div>
                        {editing ? (
                            <div className="grid gap-4">
                                {/* Input hidden untuk posisi tanda tangan */}
                                <input type="hidden" name="signature_top" value={signaturePosition.top} />
                                <input type="hidden" name="signature_left" value={signaturePosition.left} />
                                <input type="hidden" name="signature_height" value={signaturePosition.height} />
                                <input type="hidden" name="signature_width" value={signaturePosition.width} />

                                <div>
                                    <Label className="text-sm">Nama Kepala Jurusan</Label>
                                    <Input name="nama" value={namaKajur} onChange={(e) => setNamaKajur(e.target.value)} placeholder="Masukkan nama kepala jurusan" className="mt-1" autoComplete="off" />
                                </div>

                                <div>
                                    <Label className="text-sm">NIP Kepala Jurusan</Label>
                                    <Input name="nip" value={nipKajur} onChange={(e) => setNipKajur(e.target.value)} placeholder="Masukkan NIP (angka saja)" className="mt-1" autoComplete="off" />
                                </div>

                                <div>
                                    <Label className="text-sm">Unggah Tanda Tangan (PNG / JPG)</Label>
                                    <input name="signature" ref={fileInputRef} onChange={handleFileChange} type="file" accept="image/png,image/jpeg" className="sr-only" aria-hidden />
                                    <div className="mt-2 flex items-center gap-2">
                                        <Button variant="outline" type="button" onClick={() => fileInputRef.current?.click()}><ImagePlus className="mr-2 h-4 w-4" /> Unggah</Button>

                                        {signatureFile && (
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <div>
                                                    <div className="font-medium">{signatureFile.name}</div>
                                                    <div className="text-xs text-muted-foreground">{(signatureFile.size / 1024).toFixed(0)} KB</div>
                                                </div>

                                                <Button variant="ghost" type="button" onClick={handleRemoveSignature} aria-label="Hapus tanda tangan"><Trash2 className="h-4 w-4 text-red-600" /></Button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4 space-y-2 text-sm text-gray-500">
                                        {signatureFile ? (
                                            <div>Tanda tangan siap diunggah: {signatureFile.name}</div>
                                        ) : currentSignatureUrl ? (
                                            <div className="flex flex-col gap-2">
                                                <span>Tanda tangan saat ini:</span>
                                                <img src={currentSignatureUrl} alt="tanda tangan" className="h-24 w-auto object-contain border rounded p-2 bg-gray-50" />
                                            </div>
                                        ) : (
                                            <div>Belum ada tanda tangan diunggah.</div>
                                        )}
                                    </div>
                                </div>

                                <CertificatePreview
                                    kajur={displayKajur}
                                    onPositionChange={setSignaturePosition}
                                />

                                <div className="mt-4 flex gap-3">
                                    <SubmitButton />
                                </div>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                <div>
                                    <span className="text-sm">Nama Kepala Jurusan</span>
                                    <div className="py-1 mt-2 text-black">{displayKajur?.nama || "—"}</div>
                                </div>

                                <div>
                                    <span className="text-sm">NIP Kepala Jurusan</span>
                                    <div className="py-1 mt-2 text-black">{displayKajur?.nip || "—"}</div>
                                </div>

                                <div>
                                    <div className="text-sm">Tanda Tangan</div>
                                    <div className="mt-2">
                                        {displayKajur?.tanda_tangan ? (
                                            <img src={displayKajur.tanda_tangan} alt="tanda tangan" className="h-24 object-contain" />
                                        ) : (
                                            <div className="mt-2 text-sm text-gray-500">Belum ada tanda tangan terpasang.</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
