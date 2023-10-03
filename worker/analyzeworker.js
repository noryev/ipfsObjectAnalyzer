// Define the IPFS gateway URL
const IPFS_GATEWAY = 'https://ipfs.io/ipfs/';

// Define the main event listener for the Fetch event
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
});

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
  // Check if the request method is POST and process the data
  if (request.method === "POST") {
    // Extract the CID from the incoming POST data
    const { cid } = await request.json();

    // Fetch the IPFS object
    const ipfsResponse = await fetch(`${IPFS_GATEWAY}${cid}`);

    // Check for valid response from IPFS gateway
    if (!ipfsResponse.ok) {
      return newResponse({
        progress: 0,
        message: `Failed to retrieve IPFS object for CID: ${cid}`
      }, 400);
    }

    // Get the data and analyze (for this example, we'll just get its size)
    const ipfsData = await ipfsResponse.text();
    const dataSize = ipfsData.length;

    // Respond with some information (here, just the size)
    return newResponse({
      progress: 100,
      message: `IPFS object size for CID ${cid}: ${dataSize} bytes`
    });
  }

  // If not a POST request or other conditions aren't met
  return new Response("Method not allowed", { status: 405 });
}

/**
 * Create a new response with CORS headers
 * @param {Object} body - The JSON response body
 * @param {number} [status=200] - HTTP status code
 */
function newResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status: status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
