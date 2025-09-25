import { getServerSession } from '@/lib/auth-server';

export async function requireRole(allowedRoles = []) {
  const session = await getServerSession();

  if (!session) {
    throw new Error('Unauthorized: Authentication required');
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(session.user?.role)) {
    throw new Error('Unauthorized: Insufficient permissions');
  }

  return session;
}

export async function requireAdmin() {
  return await requireRole(['admin']);
}

export async function requireAdminOrAslab() {
  return await requireRole(['admin', 'aslab']);
}