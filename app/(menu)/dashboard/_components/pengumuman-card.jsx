import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PengumumanCard({ pengumuman }) {
  return (
    <div className="bg-orange-200 border-l-2 border-black/50 p-2 rounded-md divide-black/10 divide-y-[1px]">
      {pengumuman.length === 0 ? (
        <p className="text-white text-sm">Tidak ada pengumuman</p>
      ) : (
        pengumuman.map((item) => (
          <div key={item.id} className="p-3">
            <div className="flex items-start justify-between">
              <h4 className="font-semibold text-sm">{item.judul}</h4>
              {/* <Badge variant="outline" className="text-xs border-orange-400">
                {new Date(item.created_at).toLocaleDateString("id-ID")}
              </Badge> */}
            </div>
            <p className="text-sm text-gray-700 mt-1 line-clamp-2">{item.isi}</p>
          </div>
        ))
      )}
    </div>
  );
}
