import { getOneMk } from "../../actions.jsx"
import { notFound } from "next/navigation"
import FormEdit from "./form-edit.jsx"

export default async function Page({ params }) {
  const mk = await getOneMk(params.id)

  if (!mk) {
    return notFound()
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Mata Kuliah Praktikum</h1>
      <FormEdit initialData={mk} />
    </div>
  )
}
