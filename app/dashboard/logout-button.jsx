'use client';

import { Button } from '@/components/ui/button';
import { signOut } from '@/app/(auth)/login/actions';
export default function LogoutButton() {
    return (
        <Button
            onClick={async () => {
                await signOut();
            }}
        >
            Logout
        </Button>
    );
}