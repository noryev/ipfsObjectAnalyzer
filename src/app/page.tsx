import React, { useState } from 'react';
import axios from 'axios';

function ClientPage() {
  const [cid, setCid] = useState('');
  const [data, setData] = useState(null);

  const handleCidChange = (e) => {
    setCid(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get(`https://ipfs.io/ipfs/${cid}`);
    setData(response.data);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleCidChange} placeholder="Enter CID" />
        <button type="submit">Submit</button>
      </form>
      {data && <div>{data}</div>}
    </div>
  );
}

export default ClientPage;
