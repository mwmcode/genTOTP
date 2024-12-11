import { TOTPGenerator } from '@/components/totp-generator';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">TOTP Generator</h1>
      <TOTPGenerator />
      <Toaster />
    </main>
  );
}
