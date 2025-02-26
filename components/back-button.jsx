"use client"; 

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Button onClick={handleBack} variant="ghost" size="icon">
        <X className="h-4 w-4" />
      </Button>
    </>
  );
}
