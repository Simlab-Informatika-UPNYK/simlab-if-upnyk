import { FormEditUser } from "./form-edit-user"
import { createClient } from "@/utils/supabase/server"
import BackButton from "@/components/back-button"

async function getUser(id) {
  // const supabase = await createClient()
  // const { data, error } = await supabase
  //   .from("users")
  //   .select()
  //   .eq("id", id)
  //   .single()

  // if (error) {
  //   console.error("Error fetching user:", error)
  //   return null
  // }

  // Return a dummy user object for development/testing
  const dummyUser = {
    id: id,
    nama_lengkap: "John Doe",
    email: "john.doe@example.com",
    peran: "admin",
    status: "aktif",
    tgl_daftar: new Date().toISOString(),
    tgl_login_terakhir: new Date().toISOString()
  }
  
  return dummyUser
}

export default async function EditUserPage({ params }) {
  const userId = (await params).id
  const user = await getUser(userId)

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit User</h1>
        <BackButton />
      </div>

      <div className="">
        {user ? (
          <FormEditUser user={user} />
        ) : (
          <div className="text-center p-4">
            <p className="text-red-500">User tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
  )
}
