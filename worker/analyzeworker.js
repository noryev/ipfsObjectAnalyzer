import { render } from "@testing-library/react";

const IPFS_GATEWAY = 'https://ipfs.io/ipfs/';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  // Checking for the ping endpoint first
  if (url.pathname === '/ping') {
    return new Response('pong');
  }



  // This guy is going to fuck a whole bunch of shit up.... Come and Take em? 

  
  if (request.method === "POST") {
    let data;
    try {
      data = await request.json();
    } catch (err) {
      return newResponse({
        progress: 0,
        message: "Invalid JSON payload provided."
      }, 400);
    }

    // Validate CID presence
    if (!data.cid) {
      return newResponse({
        progress: 0,
        message: "CID not provided in the request."
      }, 400);
    }

    const ipfsResponse = await fetch(`${IPFS_GATEWAY}${data.cid}`);

    if (!ipfsResponse.ok) {
      return newResponse({
        progress: 0,
        message: `Failed to retrieve IPFS object for CID: ${data.cid}`
      }, 400);
    }

    const ipfsData = await ipfsResponse.text();
    const dataSize = ipfsData.length;

    return newResponse({
      progress: 100,
      message: `IPFS object size for CID ${data.cid}: ${dataSize} bytes`
    });
  }

  return new Response("Method not allowed", { status: 405 });
}

function newResponse(body, status = 200) {
  const response = new Response(JSON.stringify(body), {
    status: status,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return response;
}
