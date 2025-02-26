import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  Building,
  Calendar,
  Pencil,
  MoreHorizontal,
  Copy,
  UserCheck,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/back-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// Dummy data for development
const DUMMY_DATA = {
  id: 1,
  name: "Dr. Budi Santoso",
  email: "budi.santoso@example.com",
  phone: "+62 812 3456 7890",
  nip: "198205152006041002",
  laboratory: "Computer Network Laboratory",
  status: "Active",
  startPeriod: "2022-01-01",
  endPeriod: "2025-12-31",
  description:
    "Expert in computer networks and cybersecurity with over 15 years of experience. Leading research in network optimization and security protocols.",
  profileImage: null,
};

async function getData(id) {
  // Comment this for production use
  return DUMMY_DATA;

  /* Uncomment this for production
    const supabase = await createClient();
    const { data: kalab } = await supabase
        .from("kalab")
        .select().eq("id", id);
    return kalab[0];
    */
}

export default async function KalabEditPage({ params }) {
  const {id} = (await params).id;
  const data = await getData(id);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit {data.name}</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                More <MoreHorizontal className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Clone Item
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserCheck className="mr-2 h-4 w-4" />
                Mark as Active
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <BackButton />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              {data.profileImage ? (
                <AvatarImage src={data.profileImage} alt={data.name} />
              ) : (
                <AvatarFallback>
                  {data.name?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <h2 className="text-2xl font-bold text-center">{data.name}</h2>
            <Badge className="mt-2">{data.status || "Active"}</Badge>

            <div className="mt-6 space-y-3 w-full">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <Input type="email" defaultValue={data.email || ""} />
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <Input type="tel" defaultValue={data.phone || ""} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <h3 className="text-xl font-semibold">Kalab Information</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">NIP</h4>
              <Input type="text" defaultValue={data.nip || ""} />
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Laboratory</h4>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-gray-500" />
                <Input type="text" defaultValue={data.laboratory || ""} />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">
                Position Period
              </h4>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <Input type="date" defaultValue={data.startPeriod || ""} />
                <span>-</span>
                <Input type="date" defaultValue={data.endPeriod || ""} />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Description</h4>
              {/* <Textarea defaultValue={data.description || ""} /> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
