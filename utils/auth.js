const https = require('node:https');

exports.accessToken = async (api_key, api_secret, domain) => {
  try {
    let options = {
      hostname: domain,
      path: '/oauth/v1/generate?grant_type=client_credentials',
      port: 443,
      method: 'GET',
      auth: `${api_key}:${api_secret}`
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, res => {
        let response = '';

        res.on('error', e => reject(e));
        res.on('data', chunk => response += chunk);
        res.on('end', () => {
          response = JSON.parse(response);
          if(!response.access_token){
            reject('could not generate access_token');
          }
          resolve(response.access_token);
        });
      });

      req.on('error', e => reject(e));
      req.end();
    });
  } catch (e) {
    throw new Error('Error getting access token : ', e);
  } 
}