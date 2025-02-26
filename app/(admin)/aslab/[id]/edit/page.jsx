import { createClient } from "@/utils/supabase/server"
import { FormEdit } from "./form-edit"

async function getData(nim) {
    const supabase = await createClient();

    const { data: aslab } = await supabase
        .from("aslab")
        .select().eq("nim", nim);
    return aslab
}

export default async function Page({ params }) {
    const nim = (await params).id
    const data = (await getData(nim))[0]


    return (
        <FormEdit data={data} />
    )
}