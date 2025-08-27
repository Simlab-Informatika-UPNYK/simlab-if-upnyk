import { getServerSession } from "@/lib/auth-server";

export async function requireAdmin() {
  const session = await getServerSession();
  
  if (!session || session.user?.role !== 'admin') {
    throw new Error('Unauthorized: Admin access required');
  }
  
  return session;
}
