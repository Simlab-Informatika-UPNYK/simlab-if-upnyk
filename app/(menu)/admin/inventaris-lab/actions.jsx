'use server';

import { db } from '@/db';
import { lab, inventaris } from '@/db/schema';
import { requireAdmin } from '@/lib/admin-auth';
import translatePostgresError from '@/lib/postgres-error-translator';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// Fungsi untuk mendapatkan semua data inventaris berdasarkan ID lab
export async function getInventarisByLabId(labId) {
  try {
    const data = await db
      .select({
        id: inventaris.id,
        no_meja: inventaris.no_meja,
        no_snbt: inventaris.no_snbt,
        merek_model: inventaris.merek_model,
        monitor: inventaris.monitor,
        processor: inventaris.processor,
        storage: inventaris.storage,
        ram: inventaris.ram,
        gpu: inventaris.gpu,
        lan_card: inventaris.lan_card,
        ups: inventaris.ups,
        merk_ups: inventaris.merk_ups,
        keterangan: inventaris.keterangan,
        lab_nama: lab.nama,
      })
      .from(inventaris)
      .leftJoin(lab, eq(inventaris.lab_id, lab.id))
      .where(eq(inventaris.lab_id, labId));

    // Transform manual ke camelCase
    const transformedData = data.map((item) => ({
      id: item.id,
      noMeja: item.no_meja,
      noSNBT: item.no_snbt,
      merekModel: item.merek_model,
      monitor: item.monitor,
      processor: item.processor,
      storage: item.storage,
      ram: item.ram,
      gpu: item.gpu,
      lanCard: item.lan_card,
      ups: item.ups,
      merkUps: item.merk_ups,
      keterangan: item.keterangan,
      labNama: item.lab_nama,
    }));
    return { success: true, data: transformedData };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

// Fungsi untuk mendapatkan detail inventaris berdasarkan ID inventaris
export async function getInventarisById(id) {
  try {
    const [data] = await db
      .select({
        id: inventaris.id,
        no_meja: inventaris.no_meja,
        no_snbt: inventaris.no_snbt,
        merek_model: inventaris.merek_model,
        monitor: inventaris.monitor,
        processor: inventaris.processor,
        storage: inventaris.storage,
        ram: inventaris.ram,
        gpu: inventaris.gpu,
        lan_card: inventaris.lan_card,
        ups: inventaris.ups,
        merk_ups: inventaris.merk_ups,
        keterangan: inventaris.keterangan,
        lab_id: inventaris.lab_id,
        lab_nama: lab.nama,
      })
      .from(inventaris)
      .leftJoin(lab, eq(inventaris.lab_id, lab.id))
      .where(eq(inventaris.id, id))
      .limit(1);

    if (!data) {
      return { success: false, error: 'Inventaris not found' };
    }

    // Transform manual ke camelCase
    return {
      success: true,
      data: {
        id: data.id,
        noMeja: data.no_meja,
        noSNBT: data.no_snbt,
        merekModel: data.merek_model,
        monitor: data.monitor,
        processor: data.processor,
        storage: data.storage,
        ram: data.ram,
        gpu: data.gpu,
        lanCard: data.lan_card,
        ups: data.ups,
        merkUps: data.merk_ups,
        keterangan: data.keterangan,
        labId: data.lab_id,
        labNama: data.lab_nama,
      },
    };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

// Fungsi untuk menambah inventaris baru
export async function addInventaris(data) {
  try {
    await requireAdmin();
    // Transform manual ke snake_case
    const snakeData = {
      no_meja: data.noMeja,
      no_snbt: data.noSNBT,
      merek_model: data.merekModel,
      monitor: data.monitor,
      processor: data.processor,
      storage: data.storage,
      ram: data.ram,
      gpu: data.gpu,
      lan_card: data.lanCard,
      ups: data.ups,
      merk_ups: data.merkUps,
      keterangan: data.keterangan,
      lab_id: data.labId,
    };
    const [result] = await db.insert(inventaris).values(snakeData).returning();

    revalidatePath(`/inventaris-lab/${data.labId}`);
    return {
      success: true,
      data: {
        id: result.id,
        noMeja: result.no_meja,
        noSNBT: result.no_snbt,
        merekModel: result.merek_model,
        monitor: result.monitor,
        processor: result.processor,
        storage: result.storage,
        ram: result.ram,
        gpu: result.gpu,
        lanCard: result.lan_card,
        ups: result.ups,
        merkUps: result.merk_ups,
        keterangan: result.keterangan,
        labId: result.lab_id,
      },
    };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

// Fungsi untuk mengupdate data inventaris
export async function updateInventaris(id, data) {
  try {
    await requireAdmin();
    const snakeData = {
      no_meja: data.noMeja,
      no_snbt: data.noSNBT,
      merek_model: data.merekModel,
      monitor: data.monitor,
      processor: data.processor,
      storage: data.storage,
      ram: data.ram,
      gpu: data.gpu,
      lan_card: data.lanCard,
      ups: data.ups,
      merk_ups: data.merkUps,
      keterangan: data.keterangan,
      lab_id: data.labId,
    };
    const [result] = await db
      .update(inventaris)
      .set(snakeData)
      .where(eq(inventaris.id, id))
      .returning();

    revalidatePath(`/inventaris-lab/${data.labId}`);
    return {
      success: true,
      data: {
        id: result.id,
        noMeja: result.no_meja,
        noSNBT: result.no_snbt,
        merekModel: result.merek_model,
        monitor: result.monitor,
        processor: result.processor,
        storage: result.storage,
        ram: result.ram,
        gpu: result.gpu,
        lanCard: result.lan_card,
        ups: result.ups,
        merkUps: result.merk_ups,
        keterangan: result.keterangan,
        labId: result.lab_id,
      },
    };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

// Fungsi untuk menghapus inventaris
export async function deleteInventaris(id, labId) {
  try {
    await requireAdmin();
    await db.delete(inventaris).where(eq(inventaris.id, id));

    revalidatePath(`/inventaris-lab/${labId}`);
    return { success: true };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}
