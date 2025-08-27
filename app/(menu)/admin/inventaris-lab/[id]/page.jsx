'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Pencil, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import DeleteInventoryButton from './_components/delete-inventory-button';
import { useParams } from 'next/navigation';
import { getInventarisByLabId } from '../actions';
import { getLabDetail } from './actions';

// Fungsi konversi UPS
const upsToString = (ups) => (ups === null ? 'Tidak' : ups ? 'Pakai' : 'Tidak');

// Menggunakan data dummy sebagai fallback jika database belum ada
const dummyData = [
  {
    id: '1',
    noMeja: 'Asisten',
    noSNBT: 'Pengawas',
    merekModel: 'Axioo MyPC One Pro H5',
    monitor: '-',
    processor: 'i5-6500 @3.20GHz (4CPUs)',
    storage: '1TB HDD',
    ram: '4GB DDR4',
    gpu: 'Intel UHD Graphic 530 2GB',
    lanCard: 'Normal',
    ups: 'Pakai',
    merkUps: 'ICA Baru',
    keterangan: '',
  },
  {
    id: '2',
    noMeja: '1',
    noSNBT: '30',
    merekModel: 'HP 280 G2 SFF',
    monitor: 'HP Pavilion 20fi',
    processor: 'i5-9400 @2.90GHz (6CPUs)',
    storage: '1TB HDD',
    ram: '4GB DDR4',
    gpu: 'Intel UHD Graphic 630 2GB',
    lanCard: 'Normal',
    ups: 'Pakai',
    merkUps: 'ICA Baru',
    keterangan: '',
  },
  {
    id: '3',
    noMeja: '2',
    noSNBT: '31',
    merekModel: 'Lenovo ThinkCentre',
    monitor: 'Lenovo L24e-20',
    processor: 'i7-10700 @3.80GHz (8CPUs)',
    storage: '512GB SSD',
    ram: '8GB DDR4',
    gpu: 'Intel UHD Graphics 750',
    lanCard: 'Normal',
    ups: 'Pakai',
    merkUps: 'APC',
    keterangan: '',
  },
  {
    id: '4',
    noMeja: '3',
    noSNBT: '32',
    merekModel: 'Dell OptiPlex 3080',
    monitor: 'Dell P2419H',
    processor: 'i5-10500 @3.10GHz (6CPUs)',
    storage: '256GB SSD + 1TB HDD',
    ram: '16GB DDR4',
    gpu: 'Intel UHD Graphics 630',
    lanCard: 'Normal',
    ups: 'Tidak',
    merkUps: '-',
    keterangan: 'Perlu perbaikan UPS',
  },
  {
    id: '5',
    noMeja: '4',
    noSNBT: '33',
    merekModel: 'ASUS ExpertCenter D5',
    monitor: 'ASUS VA24EHE',
    processor: 'i3-10100 @3.60GHz (4CPUs)',
    storage: '512GB SSD',
    ram: '8GB DDR4',
    gpu: 'Intel UHD Graphics 630',
    lanCard: 'Normal',
    ups: 'Pakai',
    merkUps: 'ICA Baru',
    keterangan: '',
  },
];

const Page = () => {
  const params = useParams();
  const labSlug = params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [inventarisData, setInventarisData] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [labDetail, setLabDetail] = useState(null);

  // Function to trigger refresh of data
  const refreshData = () => {
    setRefreshFlag((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch lab details
        const labResult = await getLabDetail(labSlug);
        if (!labResult.success) {
          setLabDetail(null);
          return;
        }

        setLabDetail(labResult.data);

        // Fetch inventaris items using the slug from URL params
        const result = await getInventarisByLabId(labResult.data.id);

        if (result.success && result.data && result.data.length > 0) {
          // Data sudah ditransform ke camelCase oleh actions.jsx
          // Hanya perlu transformasi untuk field UPS
          const transformedData = result.data.map((item) => ({
            ...item,
            ups: upsToString(item.ups),
          }));
          setInventarisData(transformedData);
        } else {
          // Fallback to dummy data if no data from database
          // setInventarisData(dummyData);
        }
      } catch (error) {
        setLabDetail(null);
        setInventarisData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [labSlug, refreshFlag]);

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <Link href={'/admin/inventaris-lab'}>
              <Button variant="outline" size="sm" className="mb-2">
                <ChevronLeft />
                Kembali
              </Button>
            </Link>

            <h1 className="text-2xl font-bold">Detail Inventaris</h1>
            {labDetail && (
              <p className="text-gray-500">
                Laboratorium: {labDetail.nama}{' '}
                {labDetail.lantai ? `- Lantai ${labDetail.lantai}` : ''}
              </p>
            )}
          </div>
          <Link href={`/admin/inventaris-lab/${labSlug}/new`}>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Tambah Inventaris
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center p-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary m-auto"></div>
            <p className="mt-2">Memuat data inventaris...</p>
          </div>
        ) : (
          <div className="rounded-md border relative w-[0] min-w-full overflow-x-auto">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                      No. Meja
                    </th>
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                      No. SNBT
                    </th>
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                      Merek & Model
                    </th>
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                      Monitor
                    </th>
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                      Processor
                    </th>
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                      Storage
                    </th>
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                      RAM
                    </th>
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                      GPU
                    </th>
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                      LAN Card
                    </th>
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                      UPS
                    </th>
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                      Merk UPS
                    </th>
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                      Keterangan
                    </th>
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {inventarisData.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <td className="px-2 py-2">{item.noMeja}</td>
                      <td className="px-2 py-2">{item.noSNBT}</td>
                      <td className="px-2 py-2">{item.merekModel}</td>
                      <td className="px-2 py-2">{item.monitor}</td>
                      <td className="px-2 py-2">{item.processor}</td>
                      <td className="px-2 py-2">{item.storage}</td>
                      <td className="px-2 py-2">{item.ram}</td>
                      <td className="px-2 py-2">{item.gpu}</td>
                      <td className="px-2 py-2">{item.lanCard}</td>
                      <td
                        className={`px-2 py-2 ${
                          item.ups === 'Pakai' ? 'bg-green-200' : ''
                        }`}
                      >
                        {item.ups}
                      </td>
                      <td className="px-2 py-2">{item.merkUps}</td>
                      <td className="px-2 py-2">{item.keterangan}</td>
                      <td className="px-2 py-2">
                        {' '}
                        <div className="flex">
                          <Link
                            href={`/admin/inventaris-lab/${labSlug}/${item.id}`}
                          >
                            <Button size="icon" variant="ghost">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <DeleteInventoryButton
                            inventoryId={item.id}
                            inventoryName={item.merekModel}
                            onSuccess={refreshData}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
