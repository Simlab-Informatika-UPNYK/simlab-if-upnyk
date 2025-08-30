'use client';

import { createAuthClient } from 'better-auth/react';
const { useSession } = createAuthClient();

export function User() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = useSession();
  return { user: session.user, isPending, error, refetch };
}
