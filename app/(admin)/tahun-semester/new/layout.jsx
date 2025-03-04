'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft, X } from 'lucide-react'

const Layout = ({ children }) => {
    const router = useRouter()
    return (
        <div className='py-4'>
            <div className="mx-auto px-4 py-2 bg-white rounded-lg">
                <div className='flex justify-between'>
                    <h2 className="text-lg font-bold mb-6 text-gray-800">Tambah Data Tahun Semester</h2>
                    <Button
                        variant='outline'
                        onClick={() => {
                            router.back()
                        }}
                    >
                        <X />
                    </Button>
                </div>
                <div>{children}</div>
            </div>

        </div>
    )
}

export default Layout