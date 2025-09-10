import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { FirstTimePasswordForm } from "./_components/first-time-password-form";
import { changeFirstTimePassword, getCurrentUserRequiresPasswordChange } from "./actions";

export default async function ChangePasswordPage() {
  const session = await getServerSession();

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect("/login");
  }

  // Check if user actually requires password change
  const { requiresPasswordChange } = await getCurrentUserRequiresPasswordChange();

  // If user doesn't require password change, redirect to dashboard
  if (!requiresPasswordChange) {
    redirect("/dashboard");
  }

  const handleSubmit = async (data) => {
    "use server";

    try {
      await changeFirstTimePassword(data);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">🔒</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Ubah Password Anda</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Untuk keamanan akun, Anda diharuskan mengubah password default sebelum melanjutkan.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Password Baru</CardTitle>
            <CardDescription>Buat password baru yang kuat untuk akun Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <FirstTimePasswordForm onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
