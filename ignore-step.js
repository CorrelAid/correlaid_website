// vercel-ignore-build.js
const https = require('https');

let vercelEnv = process.env.VERCEL_ENV;

const options = {
  hostname: 'api.vercel.com',
  port: 443,
  path: '/v5/now/deployments?limit=5&teamId=team_cXIMR8D2hD4beAIzUxCwUCEq',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${process.env.VERCEL_API_KEY}`,
  },
};
let data = '';

const req = https.request(options, (res) => {
  res.on('data', (d) => {
    data += d.toString();
  });
  res.on('end', (d) => {
    let parsedData = JSON.parse(data);
    let prodRunningFromDeployHook;

    try {
      prodRunningFromDeployHook = parsedData.deployments.find(
        ({state, meta, target}) =>
          state === 'BUILDING' &&
          target === 'production' &&
          meta.deployHookName === 'CD',
      );
    } catch (e) {
      console.log('e: ', e);
      process.exit(0);
    }

    if (!prodRunningFromDeployHook) {
      console.log('🛑 - Build cancelled');
      process.exit(0);
    } else {
      console.log('✅ - Build can proceed');
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();
