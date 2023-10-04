import React, { useState } from 'react';
import './App.css';

function App() {
  const [cid, setCid] = useState(''); // To store the CID from the input
  const [message, setMessage] = useState(''); // To store messages or results from the worker

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
      </div>
    </div>
  );
}

export default App;