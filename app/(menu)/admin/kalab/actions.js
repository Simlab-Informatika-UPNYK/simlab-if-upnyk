"use server";
import { db } from "@/db";
import { kalab } from "@/db/schema";
import { eq } from "drizzle-orm";
import slugify from "react-slugify";
import { requireAdmin } from "@/lib/admin-auth";
import { translatePostgresError } from "@/lib/postgres-error-translator";

export async function getKalabData() {
  try {
    const data = await db
      .select({
        nama: kalab.nama,
        nip: kalab.nip,
        email: kalab.email,
        no_hp: kalab.no_hp,
        slug: kalab.slug,
        photo: kalab.photo,
      })
      .from(kalab);

    return data.map((item) => ({
      "Nama Lengkap": item.nama,
      "NIDN/NIP": item.nip,
      Email: item.email,
      no_hp: item.no_hp,
      Jabatan: "",
      slug: item.slug,
      photo: item.photo || "",
    }));
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function getKalabDetail(slug) {
  try {
    const [data] = await db
      .select()
      .from(kalab)
      .where(eq(kalab.slug, slug))
      .limit(1);

    if (!data) {
      throw new Error("Data kalab tidak ditemukan");
    }
    return data;
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function createKalab(data) {
  try {
    await requireAdmin();
    const kalabData = {
      nama: data["Nama Lengkap"],
      nip: data["NIDN/NIP"],
      email: data["Email"],
      no_hp: data["No Telepon"],
      slug: slugify(data["Nama Lengkap"]),
    };

    const insertedData = await db.insert(kalab).values(kalabData).returning();
    return insertedData[0];
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function deleteKalab(slug) {
  try {
    await requireAdmin();
    const deletedData = await db
      .delete(kalab)
      .where(eq(kalab.slug, slug))
      .returning();

    if (!deletedData.length) {
      throw new Error("Data kalab tidak ditemukan");
    }
    return deletedData[0];
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function editKalab(slug, data) {
  try {
    await requireAdmin();
    const kalabData = {
      nama: data["Nama Lengkap"],
      nip: data["NIDN/NIP"],
      email: data["Email"],
      no_hp: data["No Telepon"],
      slug: data["Nama Lengkap"] ? slugify(data["Nama Lengkap"]) : slug,
    };

    const updatedData = await db
      .update(kalab)
      .set(kalabData)
      .where(eq(kalab.slug, slug))
      .returning();

    if (!updatedData.length) {
      throw new Error("Data kalab tidak ditemukan");
    }
    return updatedData[0];
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}
