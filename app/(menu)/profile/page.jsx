import { getServerSession } from "@/lib/auth-server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "./_components/form-profile";
import { getProfile, updateProfile } from "./actions";
import { ProfileFormAslab } from "./_components/form-profile-aslab";

const ProfilePage = async () => {
  const session = await getServerSession();
  const profileData = await getProfile();

  const handleUpdateProfile = async (data) => {
    "use server";
    return await updateProfile(data);
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
    aslab: profileData.aslab
      ? {
          nim: profileData.aslab.nim || "",
          no_hp: profileData.aslab.no_hp || "",
          angkatan: profileData.aslab.angkatan || "",
          program_studi: profileData.aslab.program_studi || "Sistem Informasi",
          status: profileData.aslab.status || "Aktif",
          profile_picture: profileData.aslab.profile_picture || "",
        }
      : undefined,
  };

  return (
    <div className={`space-y-6 ${session.user.role === "aslab" ? "md:space-y-0 md:grid md:grid-cols-2 gap-4" : ""}`}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Edit Profil</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm initialData={initialFormData} userRole={session.user.role} onSubmit={handleUpdateProfile} />
        </CardContent>
      </Card>

      {session.user.role === "aslab" && profileData.aslab && (
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
    </div>
  );
};

export default ProfilePage;
