import { createClient } from "@/utils/supabase/server"
import { FormEdit } from "./form-edit"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

async function getData(nim) {
    const supabase = await createClient();

    const { data: aslab } = await supabase
        .from("aslab")
        .select().eq("nim", nim);
    return aslab
}

export default async function Page({ params }) {
    const nim = (await params).nim
    const data = (await getData(nim))[0]


    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Edit</h1>
                <Link href={`/aslab/${nim}`}>
                    <Button variant="ghost" size="icon">
                        <X className="h-4 w-4" />
                    </Button>
                </Link>
            </div>
            <FormEdit data={data} />
        </div>
    )
}