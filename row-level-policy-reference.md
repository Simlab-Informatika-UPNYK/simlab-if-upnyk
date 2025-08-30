Berdasarkan analisis kodebase Anda, saya memahami bahwa Anda ingin mengimplementasikan Row Level Security (RLS) dengan Drizzle ORM. Berikut adalah rencana komprehensif untuk implementasinya:

## Analisis Current State

Dari yang saya lihat, Anda memiliki:
1. PostgreSQL database dengan Drizzle ORM
2. Sistem autentikasi dengan Better Auth
3. Dua role user: `admin` dan `aslab`
4. Struktur data yang menghubungkan user dengan aslab melalui `aslab_id`

## Pendekatan Row Level Security

Ada dua cara utama untuk mengimplementasikan RLS:

### 1. Database-Level RLS (PostgreSQL Native)
- Menggunakan fitur built-in PostgreSQL RLS
- Membutuhkan policy creation di database
- Lebih aman karena enforcement di level database
- Drizzle akan bekerja dengan policies yang sudah ada

### 2. Application-Level RLS (Drizzle Filtering)
- Mengimplementasikan filtering di application layer
- Menggunakan session context dalam query
- Lebih fleksibel untuk logika bisnis kompleks
- Tidak memerlukan perubahan database schema

## Rencana Implementasi

Saya merekomendasikan hybrid approach:

### Phase 1: Application-Level RLS dengan Drizzle
1. **Extend Database Context**: Tambahkan user context ke semua database queries
2. **Role-Based Filtering**: Implementasikan filter berdasarkan role user
3. **Middleware Auth**: Pastikan semua queries memiliki session context

### Phase 2: Database-Level RLS (Opsional)
1. **Enable RLS di PostgreSQL**: `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`
2. **Create Policies**: Policy untuk setiap table berdasarkan role
3. **Migration Scripts**: Drizzle migrations untuk RLS setup

## Contoh Implementasi untuk Struktur Anda

Untuk table `aslab_honor`, policy bisa seperti:
- Admin: bisa melihat semua data
- Aslab: hanya bisa melihat data mereka sendiri (berdasarkan `aslab_id`)

Apakah Anda ingin saya fokus pada implementasi application-level RLS terlebih dahulu, atau langsung ke database-level RLS? Juga, table mana yang paling prioritas untuk diproteksi dengan RLS?

## Contoh 1: Application-Level RLS dengan Drizzle

### 1. Extended Database Context
```javascript
// lib/db-with-context.js
import { db } from '@/db';
import { getServerSession } from '@/lib/auth-server';

export async function getDbWithContext() {
  const session = await getServerSession();
  
  return {
    db,
    user: session?.user || null,
    userId: session?.user?.id || null,
    userRole: session?.user?.role || null,
    aslabId: session?.user?.aslab_id || null
  };
}
```

### 2. Secure Query Function
```javascript
// lib/secure-query.js
import { and, eq, or } from 'drizzle-orm';
import { getDbWithContext } from './db-with-context';

export async function secureQuery(table, conditions = {}, additionalFilters = {}) {
  const { db, userRole, aslabId } = await getDbWithContext();
  
  let securityFilter;
  
  if (userRole === 'admin') {
    // Admin bisa akses semua data
    securityFilter = undefined;
  } else if (userRole === 'aslab') {
    // Aslab hanya bisa akses data mereka sendiri
    if (table.aslab) {
      securityFilter = eq(table.aslab, aslabId);
    } else if (table.id_aslab) {
      securityFilter = eq(table.id_aslab, aslabId);
    }
  }
  
  const finalConditions = securityFilter 
    ? and(conditions, securityFilter, ...Object.values(additionalFilters))
    : and(conditions, ...Object.values(additionalFilters));
  
  return { db, conditions: finalConditions };
}
```

### 3. Contoh Penggunaan di Actions
```javascript
// app/(menu)/honor-praktikum/secure-actions.js
import { aslab_honor, aslab } from '@/db/schema';
import { secureQuery } from '@/lib/secure-query';
import { eq } from 'drizzle-orm';

export async function getSecureAslabHonor() {
  const { db, conditions } = await secureQuery(aslab_honor);
  
  return db
    .select()
    .from(aslab_honor)
    .where(conditions)
    .innerJoin(aslab, eq(aslab.id_aslab, aslab_honor.aslab));
}
```

## Contoh 2: Database-Level RLS (PostgreSQL Native)

### 1. Migration Script untuk Enable RLS
```sql
-- drizzle/0007_enable_rls_policies.sql
-- Enable RLS untuk semua table yang perlu diproteksi
ALTER TABLE aslab_honor ENABLE ROW LEVEL SECURITY;
ALTER TABLE permintaan_sertifikat ENABLE ROW LEVEL SECURITY;
ALTER TABLE kelas_aslab ENABLE ROW LEVEL SECURITY;

-- Policy untuk aslab_honor
CREATE POLICY aslab_honor_select_policy ON aslab_honor
  FOR SELECT USING (
    -- Admin bisa lihat semua
    current_setting('app.user_role') = 'admin' OR
    -- Aslab hanya bisa lihat data mereka sendiri
    (current_setting('app.user_role') = 'aslab' AND aslab = current_setting('app.aslab_id')::integer)
  );

CREATE POLICY aslab_honor_insert_policy ON aslab_honor
  FOR INSERT WITH CHECK (
    current_setting('app.user_role') = 'admin' OR
    (current_setting('app.user_role') = 'aslab' AND aslab = current_setting('app.aslab_id')::integer)
  );
```

### 2. Database Connection dengan Context Setting
```javascript
// lib/db-with-rls.js
import { db } from '@/db';
import { getServerSession } from '@/lib/auth-server';

export async function getDbWithRLS() {
  const session = await getServerSession();
  
  // Set session variables untuk RLS
  if (session?.user) {
    await db.execute(
      `SELECT set_config('app.user_id', $1, false), 
              set_config('app.user_role', $2, false),
              set_config('app.aslab_id', $3, false)`,
      [
        session.user.id,
        session.user.role || 'guest',
        session.user.aslab_id?.toString() || '0'
      ]
    );
  }
  
  return db;
}
```

### 3. Contoh Penggunaan dengan RLS
```javascript
// app/(menu)/honor-praktikum/rls-actions.js
import { aslab_honor } from '@/db/schema';
import { getDbWithRLS } from '@/lib/db-with-rls';

export async function getRLSAslabHonor() {
  const db = await getDbWithRLS();
  
  return db
    .select()
    .from(aslab_honor);
  // RLS policy akan otomatis diterapkan oleh PostgreSQL
}
```

## Perbandingan Kedua Pendekatan

**Application-Level RLS:**
✅ Lebih mudah di-debug
✅ Fleksibel untuk logika bisnis kompleks
✅ Tidak perlu migration database
❌ Enforcement di application layer

**Database-Level RLS:**
✅ Lebih aman (enforcement di database)
✅ Tidak bisa di-bypass dari application
✅ Performa lebih baik untuk complex queries
❌ Membutuhkan migration dan setup awal

Mana yang ingin Anda implementasikan terlebih dahulu? Saya sarankan mulai dengan Application-Level RLS untuk testing, kemudian upgrade ke Database-Level RLS untuk production.