import Image from 'next/image';
import DownloadForm from './DownloadForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DownloadForm />

      {/* ... rest of your component ... */}
    </main>
  );
}