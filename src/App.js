import React, { useState } from 'react';
import './App.css';

function App() {
  const [cid, setCid] = useState('');
  const [message, setMessage] = useState('');
  const [contentType, setContentType] = useState('');  // State for content type
  const [responseTime, setResponseTime] = useState(null);  // New state for response time

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
      if (result.responseTime) {  // If responseTime is available in response
        setResponseTime(result.responseTime);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  }

  return (
    <div className="App">
      <div className="container">
        <h1>IPFS CID Analyzer</h1>
        <img src={`${process.env.PUBLIC_URL}/cidinspector.png`} alt="Analyzer" className="cidinspector-image" />
        <input
          type="text"
          placeholder="Enter IPFS CID"
          value={cid}
          onChange={e => setCid(e.target.value)}
        />
        <button onClick={processCID}>Analyze CID</button>
        
        <p>{message}</p>
        { contentType && <p>Content Type: {contentType}</p> }  {/* Display content type if available */}
        { responseTime !== null && <p>Response Time: {responseTime} ms</p> }  {/* Display response time if available */}
      </div>
    </div>
  );
}

export default App;
