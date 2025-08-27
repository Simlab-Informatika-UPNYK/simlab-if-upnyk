import { getOneHonor, getTahunSemesterId } from "../actions.js";
import { HonorProvider } from "../_components/honor-context.jsx";
import DetailPageContent from "./detail-page-content.jsx";

export default async function DetailPage({ params, searchParams }) {
  const nim = (await params).subid;
  const periodeSlug = (await params)?.id;

  // try {
  const tahunSemesterId = await getTahunSemesterId(periodeSlug);
  const honorData = await getOneHonor(nim, tahunSemesterId);

  // return <pre>{JSON.stringify(honorData, null, 2)}</pre>;

  if (honorData.error) {
    return <div className="p-6 text-destructive">Error: {honorData.error}</div>;
  }

  if (!honorData) {
    return <div className="p-6">Data honor tidak ditemukan</div>;
  }

  return (
    <HonorProvider initialData={honorData}>
      <DetailPageContent params={params} />
    </HonorProvider>
  );

  // } catch (err) {
  //   console.error("Error fetching honor data:", err);
  //   return (
  //     <div className="p-6 text-destructive">
  //       Terjadi kesalahan saat memuat data honor
  //     </div>
  //   );
  // }
}
