"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { createClient } from "@/utils/supabase/client"

const formSchema = z.object({
    tahun: z.string().min(4, { message: "Tahun harus diisi minimal 4 karakter" }),
    semester: z.string().min(1, { message: "Semester harus diisi" }),
})

export function FormEdit({ data }) {
    const [formError, setFormError] = useState("")
    const [message, setMessage] = useState({})
    const [open, setOpen] = useState(false)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tahun: data.tahun,
            semester: data.semester,
        },
    })

    async function onSubmit(values) {
        try {
            setFormError("")
            const supabase = createClient()

            const { error: updateError } = await supabase
                .from('tahun_semester')
                .update(values)
                .eq('id', data.id)

            if (updateError) throw updateError

            console.log('Successfully updated!')

            setMessage({
                title: "Berhasil Mengupdate Tahun Semester!",
                description: "Data tahun semester berhasil diupdate!",
                footer: {
                    action: {
                        label: "Tambahkan Lagi",
                        onClick: () => {
                            form.reset({
                                tahun: "",
                                semester: "",
                            });
                            setOpen(false)
                        }
                    }
                }
            });

            setOpen(true)
        } catch (error) {
            console.error('Error:', error)

            if (error.message && error.message.toLowerCase().includes('null')) {
                setFormError("Data tidak boleh kosong")
            } else {
                setFormError(error.message || "Terjadi kesalahan saat mengupdate tahun semester")
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="tahun"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium">Tahun</FormLabel>
                                <FormControl>
                                    <Input className="w-full" placeholder="Masukkan tahun" {...field} />
                                </FormControl>
                                <FormMessage className="text-sm text-red-500" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="semester"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium">Semester</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih semester" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Ganjil">Ganjil</SelectItem>
                                        <SelectItem value="Genap">Genap</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-sm text-red-500" />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" className="px-6">Simpan Perubahan</Button>
                </div>
            </form>
        </Form>
    )
}
