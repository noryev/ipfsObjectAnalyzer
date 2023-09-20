const axios = require('axios');

exports.handler = async (event) => {
    let response;
    try {
        response = await axios({
            url: 'https://api.leto.gg/analytics',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Leto-Token': '<access-token>'
            },
            data: JSON.parse(event.body)
        });
    } catch (error) {
        console.error(error);
        return {
            statusCode: error.response.status,
            body: JSON.stringify(error.response.data)
        };
    }

    return {
        statusCode: response.status,
        headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
        },
        body: JSON.stringify(response.data),
    };
};
