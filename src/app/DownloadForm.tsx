// Create a new file named DownloadForm.tsx
import React from 'react';
import axios from 'axios';

export default function DownloadForm() {
    const downloadFile = (event: { preventDefault: () => void; target: { cid: { value: any; }; }; }) => {
        event.preventDefault();

        const cid = event.target.cid.value;

        if (!cid) {
            console.error('CID is required');
            return;
        }

        const url = `https://ipfs.io/ipfs/${cid}`; // IPFS URL with the user-provided CID

        console.log('Starting download...');
        const start = new Date().getTime();

        axios.get(url, { responseType: 'blob' })
            .then(response => {
                const end = new Date().getTime();
                const timeTaken = end - start;

                console.log('Download finished. Time taken:', timeTaken);
            })
            .catch(err => {
                console.error('Error downloading file:', err);
            });
    };

    return (
        <form onSubmit={downloadFile}>
            <input type="text" name="cid" placeholder="Enter CID" required />
            <button type="submit">Start Download</button>
        </form>
    );
}
