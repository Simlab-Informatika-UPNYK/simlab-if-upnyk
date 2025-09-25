import KajurClient from "./_components/kajur-client";
import { getKajurPublic, updateKajurFromForm } from "./actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function KajurPage() {
    const kajur = await getKajurPublic();

    return (
        <div className="container mx-auto p-6 space-y-6">
            <KajurClient initial={kajur} action={updateKajurFromForm} />
        </div>
    );
}