const IPFS_GATEWAY = 'https://leto.gg/ipfs/';  

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  // Handle preflight CORS request
  if (request.method === "OPTIONS") {
    return newResponse({}, 200);
  }

  // Handle ping request
  if (url.pathname === '/ping') {
    return new Response('pong', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

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

    const startTime = Date.now(); // Capture the current time before making the fetch request
    const ipfsResponse = await fetch(`${IPFS_GATEWAY}${data.cid}`);
    const endTime = Date.now(); // Capture the current time after receiving the response

    const responseTime = endTime - startTime; // Calculate the response time in milliseconds

    if (!ipfsResponse.ok) {
      return newResponse({
        progress: 0,
        message: `Failed to retrieve IPFS object for CID: ${data.cid}`
      }, 400);
    }

    const ipfsData = await ipfsResponse.text();
    const dataSize = ipfsData.length;
    const contentType = ipfsResponse.headers.get('Content-Type');  // Extract content type from the response headers

    return newResponse({
      progress: 100,
      message: `IPFS object size for CID ${data.cid}: ${dataSize} bytes`,
      contentType: contentType,  // Return the extracted content type in the response to the client
      responseTime: responseTime  // Return the response time in the response
    });
  }

  return newResponse({ message: "Method not allowed" }, 405);
}

function newResponse(body, status = 200) {
  const response = new Response(JSON.stringify(body), {
    status: status,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return response;
}
