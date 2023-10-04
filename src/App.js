import React, { useState } from 'react';
import './App.css';

function App() {
  const [cid, setCid] = useState(''); // To store the CID from the input
  const [message, setMessage] = useState(''); // To store messages or results from the worker
  const [workerResponse, setWorkerResponse] = useState(''); // To store the response from pinging the worker

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
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  }

  async function pingWorker() {
    try {

      // The bit of code that makes sure cors doesnt give AF... 'no-cors' subject the server to no cors protection. 

      const response = await fetch('https://worker-ipfs-analyze.deanlaughing.workers.dev/ping', {
         // Set mode to 'no-cors'
      });

      // Never forget this code that makes CORS not give AF!
      
      if (response.status !== 0) {  // no-cors mode responses have an "opaque" status of 0
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
        <button onClick={pingWorker}>Ping Worker</button>
        <p>Worker says: {workerResponse}</p>
      </div>
    </div>
  );
}

export default App;
