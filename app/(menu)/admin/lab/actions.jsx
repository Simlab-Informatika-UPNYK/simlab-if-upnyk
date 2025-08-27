"use server";
import slugify from "react-slugify";
import { db } from "@/db";
import { lab, kalab } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/admin-auth";
import { translatePostgresError } from "@/lib/postgres-error-translator";

export async function getAllKalab() {
  try {
    const data = await db.select({
      id: kalab.id,
      nama: kalab.nama
    })
    .from(kalab);

    return data;
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function getAllLab() {
  try {
    const data = await db.select({
      nama: lab.nama,
      lantai: lab.lantai,
      kapasitas: lab.kapasitas,
      slug: lab.slug,
      kalab: kalab.nama
    })
    .from(lab)
    .leftJoin(kalab, eq(lab.kalab, kalab.id));

    return data.map(item => ({
      ...item,
      kalab: item.kalab || null
    }));
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function getOneLab(slug) {
  try {
    const [data] = await db.select({
      id: lab.id,
      nama: lab.nama,
      lantai: lab.lantai,
      slug: lab.slug,
      kapasitas: lab.kapasitas,
      kalab: kalab.nama,
      kalab_id: kalab.id
    })
    .from(lab)
    .leftJoin(kalab, eq(lab.kalab, kalab.id))
    .where(eq(lab.slug, slug))
    .limit(1);

    if (!data) return null;

    return {
      ...data,
      kalab: data.kalab || null,
      kalab_id: data.kalab_id || null
    };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function createLab(data) {
  try {
    await requireAdmin();
    const labData = {
      nama: data.nama,
      lantai: data.lantai,
      kapasitas: data.kapasitas,
      kalab: data.kalab,
      slug: slugify(data.nama),
    };

    const insertedData = await db.insert(lab)
      .values(labData)
      .returning();

    return { success: true, data: insertedData[0] };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function editLab(id, data) {
  try {
    await requireAdmin();
    const labData = {
      nama: data.nama,
      lantai: data.lantai,
      kapasitas: data.kapasitas,
      kalab: data.kalab,
      slug: slugify(data.nama),
    };

    const updatedData = await db.update(lab)
      .set(labData)
      .where(eq(lab.id, id))
      .returning();

    return { success: true, data: updatedData[0] };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function deleteLab(slug) {
  try {
    await requireAdmin();
    const deletedData = await db.delete(lab)
      .where(eq(lab.slug, slug))
      .returning();

    if (deletedData.length === 0) {
      return { 
        success: false, 
        error: 'Laboratorium tidak ditemukan' 
      };
    }

    return { success: true, data: deletedData[0] };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}
