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
    const [signaturePreviewUrl, setSignaturePreviewUrl] = useState(null);
    const [editing, setEditing] = useState(false);
    const [signaturePosition, setSignaturePosition] = useState({
        top: initial?.signature_top || 0,
        left: initial?.signature_left || 0,
        height: Math.max(50, initial?.signature_height || 100),
        width: Math.max(100, initial?.signature_width || 200)
    });
    const fileInputRef = useRef(null);

    const initialFormState = useMemo(() => createInitialFormState(initial), [initial]);
    const [formState, formAction] = useActionState(action, initialFormState);

    useEffect(() => {
        setDisplayKajur(initial || null);
        setSignaturePosition({
            top: initial?.signature_top || 0,
            left: initial?.signature_left || 0,
            height: Math.max(50, initial?.signature_height || 100),
            width: Math.max(100, initial?.signature_width || 200)
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
            setSignaturePreviewUrl(null);
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

    // Cleanup URL object when component unmounts or previewUrl changes
    useEffect(() => {
        return () => {
            if (signaturePreviewUrl) {
                console.log('KajurClient - Revoking signature preview URL:', signaturePreviewUrl);
                URL.revokeObjectURL(signaturePreviewUrl);
            }
        };
    }, [signaturePreviewUrl]);

    // Debug: Track signature changes
    useEffect(() => {
        console.log('KajurClient - signaturePreviewUrl changed:', signaturePreviewUrl);
        console.log('KajurClient - signatureFile:', signatureFile);
    }, [signaturePreviewUrl, signatureFile]);

    const handleFileChange = (e) => {
        const f = e.target.files?.[0] ?? null;
        if (!f) {
            setSignatureFile(null);
            setSignaturePreviewUrl(null);
            return;
        }

        const allowed = ["image/png", "image/jpeg"];
        if (!allowed.includes(f.type)) {
            toast({ title: "Format tidak didukung", description: "Silakan unggah PNG atau JPG.", variant: "destructive" });
            return;
        }

        setSignatureFile(f);
        // Create preview URL for the uploaded file
        const previewUrl = URL.createObjectURL(f);
        console.log('KajurClient - New signature preview URL created:', previewUrl);
        setSignaturePreviewUrl(previewUrl);
    };

    const handleRemoveSignature = () => {
        setSignatureFile(null);
        setSignaturePreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleToggleEditing = () => {
        if (editing) {
            setNamaKajur(displayKajur?.nama || "");
            setNipKajur(displayKajur?.nip || "");
            setSignatureFile(null);
            setSignaturePreviewUrl(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            // Reset signature position to saved values
            setSignaturePosition({
                top: displayKajur?.signature_top || 0,
                left: displayKajur?.signature_left || 0,
                height: Math.max(50, displayKajur?.signature_height || 100),
                width: Math.max(100, displayKajur?.signature_width || 200)
            });
        }
        setEditing((prev) => !prev);
    };

    const handleSignaturePositionChange = (newPosition) => {
        // Validate and clamp values (position can be negative, but size must be positive)
        const validatedPosition = {
            top: newPosition.top || 0,
            left: newPosition.left || 0,
            height: Math.max(50, newPosition.height || 100),
            width: Math.max(100, newPosition.width || 200)
        };
        setSignaturePosition(validatedPosition);
    };

    const currentSignatureUrl = signatureFile ? null : displayKajur?.tanda_tangan || null;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
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

                                    <div className="mt-4 space-y-2">
                                        {signatureFile && signaturePreviewUrl ? (
                                            <div className="flex flex-col gap-2">
                                                <span className="text-sm text-gray-600">Preview tanda tangan:</span>
                                                <img src={signaturePreviewUrl} alt="preview tanda tangan" className="h-24 w-auto object-contain border rounded p-2 bg-gray-50" />
                                                <span className="text-xs text-gray-500">Tanda tangan siap diunggah: {signatureFile.name}</span>
                                            </div>
                                        ) : currentSignatureUrl ? (
                                            <div className="flex flex-col gap-2">
                                                <span className="text-sm text-gray-600">Tanda tangan saat ini:</span>
                                                <img src={currentSignatureUrl} alt="tanda tangan" className="h-24 w-auto object-contain border rounded p-2 bg-gray-50" />
                                            </div>
                                        ) : (
                                            <div className="text-sm text-gray-500">Belum ada tanda tangan diunggah.</div>
                                        )}
                                    </div>
                                </div>

                                <CertificatePreview
                                    kajur={displayKajur}
                                    signaturePreviewUrl={signaturePreviewUrl}
                                    signaturePosition={signaturePosition}
                                    onPositionChange={handleSignaturePositionChange}
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
