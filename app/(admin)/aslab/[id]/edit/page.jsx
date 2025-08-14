import { FormEdit } from "./form-edit"
import { getAslabById } from "../../actions"

export default async function Page({ params }) {
    const nim = (await params).id
    const data = await getAslabById(nim)
    console.log(data);

    if (!data) {
        return <div>Aslab not found</div>
    }

    return (
        <FormEdit data={data} />
    )
}
