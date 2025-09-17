import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

export function KalabListCard({ kalabList }) {
  return (
    <div>
      <div className="pb-3">
        <h2 className="text-lg font-semibold">Kepala Laboratorium</h2>
        <p className="text-sm text-muted-foreground">Daftar koordinator lab</p>
      </div>
      <div className="space-y-3">
        {kalabList.length === 0 ? (
          <p className="text-muted-foreground text-sm">Tidak ada data kepala lab</p>
        ) : (
          kalabList.map((kalab, index) => (
            <div key={index} className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-2">{kalab.nama}</h4>
              <div className="space-y-1 text-xs text-muted-foreground">
                {kalab.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    <span>{kalab.email}</span>
                  </div>
                )}
                {kalab.no_hp && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    <span>{kalab.no_hp}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
