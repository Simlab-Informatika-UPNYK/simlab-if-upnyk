import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  Pencil,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/back-button";
import { getKalabDetail } from "../actions.js";
import { DeleteButton } from "./../_components/delete-button.jsx";

export default async function KalabDetailPage({ params }) {
  const slug = (await params).id;
  const data = (await getKalabDetail(slug))[0];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{data.nama}</h1>
        <div className="flex gap-2">
          <Link href={`/kalab/${data.slug}/edit`}>
            <Button variant="outline" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteButton slug={slug} />
          <BackButton />
        </div>
      </div>

      <div className="bg-white p-6">
        <div className="flex flex-col items-center mb-6">
          <Avatar className="h-32 w-32 mb-4">
            {data.profileImage ? (
              <AvatarImage src={data.profileImage} alt={data.name} />
            ) : (
              <AvatarFallback>
                {data.name?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
        </div>

        <div className="gap-6">
          <div className="space-y-4">
            <div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Email
                  </h4>
                  <div className="flex gap-2 items-center">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <p>{data.email || "No email provided"}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    No Telepon
                  </h4>
                  <div className="flex gap-2 items-center">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <p>{data.no_hp || "No phone provided"}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    NIP
                  </h4>
                  <p>{data.nip || "Not specified"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {data.description && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-500 mb-1">
              Description
            </h4>
            <p className="text-gray-700">{data.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
