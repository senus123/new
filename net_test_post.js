const http = require('http');
const data = JSON.stringify({
  code: 'TEST_CODE',
  redirect_uri: 'http://localhost:8000/linkedin-callback.html',
  code_verifier: 'TEST_VERIFIER'
});

const opts = {
  hostname: '127.0.0.1',
  port: 4000,
  path: '/auth/linkedin/token',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(opts, (res) => {
  console.log('STATUS', res.statusCode);
  let body = '';
  res.on('data', (c) => body += c);
  res.on('end', () => {
    console.log('BODY', body);
  });
});

req.on('error', (e) => {
  console.error('ERR', e.message);
});

req.write(data);
req.end();
