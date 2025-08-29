import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getServerSession } from '@/lib/auth-server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession();
  const isLoggedIn = !!session?.user;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">SL</span>
            </div>
            <span className="text-xl font-bold text-gray-800">SimLab IF</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-gray-600 hover:text-blue-600 transition duration-300"
            >
              Fitur
            </Link>
            <Link
              href="#about"
              className="text-gray-600 hover:text-blue-600 transition duration-300"
            >
              Tentang
            </Link>
            <Link
              href="#contact"
              className="text-gray-600 hover:text-blue-600 transition duration-300"
            >
              Kontak
            </Link>
            {!isLoggedIn ? (
              <Button>
                <Link href="/login">Login</Link>
              </Button>
            ) : (
              <Button variant="outline">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b mt-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-1/2 justify-center items-start md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-800">
              Sistem Informasi Laboratorium IF UPNYK
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Kelola, pantau, dan optimalkan laboratorium informatika dengan
              sistem manajemen terpadu yang efisien dan modern.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {!isLoggedIn ? (
                <Link href="/login">
                  <Button className="w-full sm:w-auto">Masuk Sistem</Button>
                </Link>
              ) : (
                <Link href="/dashboard">
                  <Button className="w-full sm:w-auto">Dashboard</Button>
                </Link>
              )}
            </div>
          </div>
          {/* <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <div className="w-full max-w-md h-80 bg-blue-100 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-blue-800 font-semibold">
                  Laboratory Image
                </span>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Fitur Utama
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Manajemen Perangkat',
                description:
                  'Kelola inventaris laboratorium dengan mudah dan efisien.',
                icon: '💻',
              },
              {
                title: 'Penjadwalan',
                description:
                  'Atur jadwal penggunaan laboratorium tanpa konflik.',
                icon: '🗓️',
              },
              {
                title: 'Monitoring Aktivitas',
                description: 'Pantau penggunaan laboratorium secara real-time.',
                icon: '📊',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-blue-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Tentang Kami
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            SimLab IF UPNYK adalah sistem informasi laboratorium yang dirancang
            khusus untuk Program Studi Informatika di Universitas Pembangunan
            Nasional Veteran Yogyakarta.
          </p>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Visi</h3>
              <p className="text-gray-600">
                Menjadi pusat keunggulan dalam pengelolaan laboratorium
                informatika yang efisien, modern, dan mendukung kegiatan
                akademik serta riset berkualitas tinggi.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg  w-full max-w-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Misi</h3>
              <p className="text-gray-600">
                Menyediakan infrastruktur dan layanan laboratorium yang optimal
                untuk mendukung proses pembelajaran, penelitian, dan
                pengembangan keterampilan mahasiswa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Kontak Kami
          </h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm w-full max-w-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Informasi Kontak
              </h3>
              <div className="space-y-4">
                <p className="flex items-center gap-3 text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  (0274) 123456
                </p>
                <p className="flex items-center gap-3 text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  email@example.com
                </p>
                <p className="flex items-center gap-3 text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10.5a8.38 8.38 0 0 1-1.9.5 4.15 4.15 0 0 0 1.8-2.3 8.27 8.27 0 0 1-2.6 1 4.13 4.13 0 0 0-7 3.8 11.7 11.7 0 0 1-8.5-4.3 4.13 4.13 0 0 0 1.3 5.5 4.1 4.1 0 0 1-1.9-.5v.1a4.13 4.13 0 0 0 3.3 4 4.1 4.1 0 0 1-1.9.1 4.13 4.13 0 0 0 3.8 2.8 8.3 8.3 0 0 1-5.1 1.8 11.7 11.7 0 0 0 6.3 1.8c7.5 0 11.6-6.2 11.6-11.6v-.5a8.3 8.3 0 0 0 2-2.1z"></path>
                  </svg>
                  @simlabif
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm w-full max-w-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Lokasi</h3>
              <p className="text-gray-600">
                Jl. SWK 104, Condongcatur, Depok, Sleman, Yogyakarta, 55283
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-16 text-center text-sm text-gray-500">
        <p>© 2024 SimLab IF UPNYK. All rights reserved.</p>
      </footer>
    </div>
  );
}
