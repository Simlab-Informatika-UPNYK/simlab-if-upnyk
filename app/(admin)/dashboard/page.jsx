import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import LogoutButton from "./logout-button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {user !== null ? (
        <div className="flex items-center gap-2"></div>
      ) : (
        <Button asChild>
          <Link href="/login">Sign In</Link>
        </Button>
      )}

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Jumlah Kepala Laboratorium</CardTitle>
            <CardDescription>Total keseluruhan kalab</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{50}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Kapasitas</CardTitle>
            <CardDescription>
              Total keseluruhan kapasitas laboratorium
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{50}</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}
