import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Pencil } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/back-button";
import { getKalabDetail } from "../actions";
import { DeleteButton } from "../_components/delete-button";
import { notFound } from "next/navigation";

export default async function KalabDetailPage({ params }) {
  try {
    const slug = params.id;
    const data = await getKalabDetail(slug);

    if (!data) {
      return notFound();
    }

    const infoItems = [
      {
        icon: <Mail className="h-4 w-4 text-gray-500" />,
        label: "Email",
        value: data.email || "Tidak tersedia",
      },
      {
        icon: <Phone className="h-4 w-4 text-gray-500" />,
        label: "No Telepon",
        value: data.no_hp || "Tidak tersedia",
      },
      {
        icon: null,
        label: "NIP",
        value: data.nip || "Tidak tersedia",
      },
    ];

    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{data.nama}</h1>
          <div className="flex gap-2">
            <Link href={`/admin/kalab/${data.slug}/edit`}>
              <Button variant="outline" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
            <DeleteButton slug={data.slug} />
            <BackButton />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex flex-col items-center mb-6">
            <Avatar className="h-32 w-32 mb-4">
              {data.photo ? (
                <AvatarImage src={data.photo} alt={data.nama} />
              ) : (
                <AvatarFallback>
                  {data.nama?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
          </div>

          <div className="space-y-4">
            {infoItems.map((item, index) => (
              <div key={index}>
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  {item.label}
                </h4>
                <div className="flex gap-2 items-center">
                  {item.icon}
                  <p>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
