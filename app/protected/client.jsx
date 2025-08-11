"use client";

import { createAuthClient } from "better-auth/react";
const { useSession } = createAuthClient();

export default function ProtectedClientPage() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">User Session</h1>
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
