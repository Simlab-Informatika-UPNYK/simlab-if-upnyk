import { FormEditUser } from "./form-edit-user";
import { getOneUser } from "../../actions";
import BackButton from "@/components/back-button";

export default async function EditUserPage({ params }) {
  const slug = (await params).id;
  const user = await getOneUser(slug);

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
  );
}
