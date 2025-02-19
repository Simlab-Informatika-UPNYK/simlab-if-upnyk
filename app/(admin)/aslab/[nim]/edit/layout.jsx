'use client'

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
    const router = useRouter()

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Edit</h1>
                <Button onClick={() => router.back()} variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                </Button>
            </div>
            {children}
        </div>
    )
}

export default Layout