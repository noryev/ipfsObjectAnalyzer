import React, { useState } from 'react';
import './App.css';

function App() {
  const [cid, setCid] = useState('');
  const [message, setMessage] = useState('');
  const [workerResponse, setWorkerResponse] = useState('');
  const [contentType, setContentType] = useState('');  // New state for content type

  async function processCID() {
    try {
      const response = await fetch('https://worker-ipfs-analyze.deanlaughing.workers.dev/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cid }),
      });

      if (!response.ok) {
        throw new Error(`Worker responded with status: ${response.status}`);
      }

      const result = await response.json();
      setMessage(result.message);
      if (result.contentType) {   // If content type is available in response
        setContentType(result.contentType);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  }

  async function pingWorker() {
    try {
      const response = await fetch('https://worker-ipfs-analyze.deanlaughing.workers.dev/ping');

      if (response.status !== 0) {
        throw new Error(`Unexpected status: ${response.status}`);
      }

      setWorkerResponse('Ping successful, but response is opaque due to no-cors mode');
    } catch (error) {
      setWorkerResponse('Error connecting to worker');
    }
  }

  return (
    <div className="App">
      <div className="container">
        <h1>IPFS CID Analyzer</h1>
        <input
          type="text"
          placeholder="Enter IPFS CID"
          value={cid}
          onChange={e => setCid(e.target.value)}
        />
        <button onClick={processCID}>Analyze CID</button>
        <div className="progress" style={{ width: `${message.includes('100') ? 100 : 0}%` }}></div>
        <p>{message}</p>
        { contentType && <p>Content Type: {contentType}</p> }  {/* Display content type if available */}
        <button onClick={pingWorker}>Ping Worker</button>
        <p>Worker says: {workerResponse}</p>
      </div>
    </div>
  );
}

export default App;
