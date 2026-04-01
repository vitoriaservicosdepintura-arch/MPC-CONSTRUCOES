const https = require('https');

const OWNER = 'vitoriaservicosdepintura-arch';
const REPO = 'MPC-CONSTRUCOES';
const BRANCH = 'main';

function gh(method, path, body) {
  return new Promise((resolve, reject) => {
    const token = process.env.GITHUB_PAT;
    if (!token) return reject(new Error('GITHUB_PAT missing'));

    const opts = {
      hostname: 'api.github.com',
      path,
      method,
      headers: {
        Authorization: 'token ' + token,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'MPC-Admin',
      },
    };

    if (body) {
      const json = JSON.stringify(body);
      opts.headers['Content-Type'] = 'application/json';
      opts.headers['Content-Length'] = Buffer.byteLength(json);
    }

    const req = https.request(opts, (res) => {
      let d = '';
      res.on('data', (c) => (d += c));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(d) });
        } catch {
          resolve({ status: res.statusCode, data: d });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function getFile(fp) {
  return gh('GET', '/repos/' + OWNER + '/' + REPO + '/contents/' + fp + '?ref=' + BRANCH);
}

function putFile(fp, content, msg) {
  const encoded = Buffer.from(JSON.stringify(content)).toString('base64');
  return gh('PUT', '/repos/' + OWNER + '/' + REPO + '/contents/' + fp, {
    message: msg,
    content: encoded,
    branch: BRANCH,
  });
}

function updateFile(fp, content, msg, sha) {
  const encoded = Buffer.from(JSON.stringify(content)).toString('base64');
  return gh('PUT', '/repos/' + OWNER + '/' + REPO + '/contents/' + fp, {
    message: msg,
    content: encoded,
    sha,
    branch: BRANCH,
  });
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    try {
      const [cfgRes, portRes] = await Promise.all([
        getFile('site-data.json'),
        getFile('portfolio-data.json'),
      ]);

      let config = {};
      let portfolio = [];

      if (cfgRes.status === 200 && cfgRes.data && cfgRes.data.content) {
        config = JSON.parse(Buffer.from(cfgRes.data.content, 'base64').toString('utf8'));
      }
      if (portRes.status === 200 && portRes.data && portRes.data.content) {
        portfolio = JSON.parse(Buffer.from(portRes.data.content, 'base64').toString('utf8'));
      }

      return res.status(200).json({ config, portfolio });
    } catch (err) {
      console.error('GET error:', err.message);
      return res.status(200).json({ config: {}, portfolio: [] });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = await parseBody(req);
      const { config, portfolio } = body;

      if (!config || !portfolio) {
        return res.status(400).json({ error: 'Missing config or portfolio' });
      }

      const cfgRes = await getFile('site-data.json');
      if (cfgRes.data && cfgRes.data.sha) {
        await updateFile('site-data.json', config, 'Update site config', cfgRes.data.sha);
      } else {
        await putFile('site-data.json', config, 'Create site config');
      }

      const portRes = await getFile('portfolio-data.json');
      if (portRes.data && portRes.data.sha) {
        await updateFile('portfolio-data.json', portfolio, 'Update portfolio', portRes.data.sha);
      } else {
        await putFile('portfolio-data.json', portfolio, 'Create portfolio');
      }

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('POST error:', err.message);
      return res.status(500).json({ error: 'Save failed', details: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
