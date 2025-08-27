"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getInventarisById } from "../../actions";
import InventoryForm, { upsToString } from "../_components/inventory-form";
// import { upsToString } from "../../_components/inventory-form";

export default function EditInventarisPage() {
  const params = useParams();
  const router = useRouter();
  const labSlug = params.id;
  const inventarisId = params.subid;
  const [inventarisData, setInventarisData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getInventarisById(inventarisId);
        if (result.success) {
          // console.log(result);
          setInventarisData({
            ...result.data,
            ups: upsToString(result.data.ups),
          });
        }
      } catch (error) {
        console.error("Error fetching inventaris:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [inventarisId]);

  if (loading) return <div>Loading...</div>;
  if (!inventarisData) return <div>Inventaris tidak ditemukan</div>;

  return <InventoryForm mode="edit" initialData={inventarisData} />;
}
