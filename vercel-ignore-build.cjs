// vercel-ignore-build.cjs
const https = require('https');
// const {exec} = require('child_process');

// exec('git diff --quiet HEAD^ HEAD .', (error, stdout, stderr) => {
//   if (error) {
//     console.log(`detected changes in the project`);
//     console.log('✅ - Build can proceed');
//     process.exit(1);
//   } else {
//     console.log('no changes detected');
//   }
// });

let vercelEnv = process.env.VERCEL_ENV;

const options = {
  hostname: 'api.vercel.com',
  port: 443,
  path: `/v13/deployments/${process.env.VERCEL_URL}?teamId=team_cXIMR8D2hD4beAIzUxCwUCEq`,
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

    prodRunningFromDeployHook =
      parsedData.target === 'production' &&
      parsedData.meta.deployHookName === 'main'; // replace this with the name of your deploy hook

    console.log({
      target: parsedData.target,
      hook: parsedData.meta.deployHookName,
    });

    if (vercelEnv === 'production' && !prodRunningFromDeployHook) {
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
