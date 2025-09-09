import { getServerSession } from "@/lib/auth-server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "./_components/form-profile";
import { getProfile, updateProfile, changePassword } from "./actions";
import { ProfileFormAslab } from "./_components/form-profile-aslab";
import { ChangePasswordForm } from "./_components/form-change-password";

const ProfilePage = async () => {
  const session = await getServerSession();
  const profileData = await getProfile();

  const handleUpdateProfile = async (data) => {
    "use server";
    try {
      await updateProfile(data);
      // Tidak perlu return apa-apa, cukup await selesai untuk trigger success toast
    } catch (error) {
      console.error("Error in handleUpdateProfile:", error);
      throw error;
    }
  };

  const handleChangePassword = async (data) => {
    "use server";
    try {
      await changePassword(data);
    } catch (error) {
      console.error("Error in handleChangePassword:", error);
      throw error;
    }
  };

  const initialFormData = {
    user: {
      name: profileData.user.name || "",
      email: profileData.user.email || "",
      username: profileData.user.username || "",
      displayUsername: profileData.user.displayUsername || "",
      nip: profileData.user.nip || "",
      image: profileData.user.image || "",
    },
    aslab: {
      nim: profileData.aslab?.nim || profileData.user.username || "",
      no_hp: profileData.aslab?.no_hp || "",
      angkatan: profileData.aslab?.angkatan || "",
      program_studi: profileData.aslab?.program_studi || "Sistem Informasi",
      status: profileData.aslab?.status || "Aktif",
      profile_picture: profileData.aslab?.profile_picture || "",
    },
  };

  return (
    <div className={`space-y-6 ${session.user.role === "aslab" ? "md:space-y-0 md:grid lg:grid-cols-2 gap-4" : ""}`}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Edit Profil</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm initialData={initialFormData} userRole={session.user.role} onSubmit={handleUpdateProfile} />
        </CardContent>
      </Card>

      {session.user.role === "aslab" && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Edit Data Asisten</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileFormAslab
              initialData={initialFormData}
              userRole={session.user.role}
              onSubmit={handleUpdateProfile}
            />
          </CardContent>
        </Card>
      )}

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Ganti Password</CardTitle>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm onSubmit={handleChangePassword} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
