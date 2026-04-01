const https = require('https');

const GITHUB_OWNER = 'vitoriaservicosdepintura-arch';
const GITHUB_REPO = 'MPC-CONSTRUCOES';
const GITHUB_BRANCH = 'main';
const FILE_PATH = 'site-data.json';
const PORTFOLIO_PATH = 'portfolio-data.json';

function githubRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const token = process.env.GITHUB_PAT;
    if (!token) {
      return reject(new Error('GITHUB_PAT not configured'));
    }

    const options = {
      hostname: 'api.github.com',
      path,
      method,
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'MPC-Construcoes-Admin',
      },
    };

    if (body) {
      const json = JSON.stringify(body);
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(json);
    }

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function getFileContent(filePath) {
  return githubRequest('GET', `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}`);
}

function updateFileContent(filePath, content, message) {
  return getFileContent(filePath).then(({ data }) => {
    const sha = data.sha;
    const encoded = Buffer.from(JSON.stringify(content)).toString('base64');
    return githubRequest('PUT', `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`, {
      message,
      content: encoded,
      sha,
      branch: GITHUB_BRANCH,
    });
  });
}

function createFileContent(filePath, content, message) {
  const encoded = Buffer.from(JSON.stringify(content)).toString('base64');
  return githubRequest('PUT', `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`, {
    message,
    content: encoded,
    branch: GITHUB_BRANCH,
  });
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const [configRes, portfolioRes] = await Promise.all([
        getFileContent(FILE_PATH),
        getFileContent(PORTFOLIO_PATH),
      ]);

      let config = {};
      let portfolio = [];

      if (configRes.status === 200 && configRes.data.content) {
        const decoded = Buffer.from(configRes.data.content, 'base64').toString('utf8');
        config = JSON.parse(decoded);
      }

      if (portfolioRes.status === 200 && portfolioRes.data.content) {
        const decoded = Buffer.from(portfolioRes.data.content, 'base64').toString('utf8');
        portfolio = JSON.parse(decoded);
      }

      return res.status(200).json({ config, portfolio });
    } catch (err) {
      return res.status(200).json({ config: {}, portfolio: [], error: 'No data yet' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { config, portfolio } = req.body;

      const configPromise = getFileContent(FILE_PATH).then(({ data }) => {
        if (data.sha) {
          return updateFileContent(FILE_PATH, config, 'Update site config');
        }
        return createFileContent(FILE_PATH, config, 'Create site config');
      }).catch(() => {
        return createFileContent(FILE_PATH, config, 'Create site config');
      });

      const portfolioPromise = getFileContent(PORTFOLIO_PATH).then(({ data }) => {
        if (data.sha) {
          return updateFileContent(PORTFOLIO_PATH, portfolio, 'Update portfolio');
        }
        return createFileContent(PORTFOLIO_PATH, portfolio, 'Create portfolio');
      }).catch(() => {
        return createFileContent(PORTFOLIO_PATH, portfolio, 'Create portfolio');
      });

      await Promise.all([configPromise, portfolioPromise]);

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('Save error:', err);
      return res.status(500).json({ error: 'Failed to save', details: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
