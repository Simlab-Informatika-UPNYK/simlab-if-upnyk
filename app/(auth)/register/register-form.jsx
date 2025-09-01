'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { register } from './actions';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    const result = await register(formData);
    if (result?.success) {
      toast({
        title: 'Berhasil',
        description: 'Berhasil register, silahkan login dengan akun ini',
      });
      router.push('/login');
    } else {
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">username</Label>
          <Input
            name="username"
            id="username"
            type="text"
            placeholder="Masukkan username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">email</Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="Masukkan email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <div className="mt-2 text-sm text-red-600 text-center border border-red-200 bg-red-50 rounded p-2">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full">
          Register
        </Button>
      </div>
    </form>
  );
}
