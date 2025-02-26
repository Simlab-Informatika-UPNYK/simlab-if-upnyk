'use client'

import BackButton from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
    const router = useRouter()

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Edit</h1>
                <BackButton />
            </div>
            {children}
        </div>
    )
}

export default Layout