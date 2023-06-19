import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

export default function Home() {
  const [downloadTime, setDownloadTime] = useState<number | null>(null);
  const [cid, setCid] = useState('');

  const downloadFile = async () => {
    if (!cid) {
      console.error('CID is required');
      return;
    }

    const url = `https://ipfs.io/ipfs/${cid}`; // IPFS URL with the user-provided CID

    console.log('Starting download...');
    const start = new Date().getTime();

    try {
      const response = await axios.get(url, { responseType: 'blob' });
      const end = new Date().getTime();
      const timeTaken = end - start;

      console.log('Download finished. Time taken:', timeTaken);
      setDownloadTime(timeTaken);
    } catch (err) {
      console.error('Error downloading file:', err);
    }
  };

  const handleCidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCid(event.target.value);
  };

  // ...

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input type="text" value={cid} onChange={handleCidChange} placeholder="Enter CID" />
      <button onClick={downloadFile}>Start Download</button>
      {downloadTime && <p>Download time: {downloadTime}ms</p>}

      {/* ... rest of your component ... */}
    </main>
  );
}
