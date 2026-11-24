// Vercel Serverless Function: saves Michelle's Idea Box wishes as GitHub Issues
// on RemiMonsarrat/starwillow-witch-school so Amp can read them with zero copy-paste.

const REPO = process.env.GITHUB_WISH_REPO || 'RemiMonsarrat/starwillow-witch-school';

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      configured: Boolean(process.env.GITHUB_WISH_TOKEN),
      repo: REPO,
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const token = (process.env.GITHUB_WISH_TOKEN || '').trim();
  if (!token) {
    return res.status(500).json({ ok: false, error: 'Missing GITHUB_WISH_TOKEN env var on Vercel' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  const text = String(body.text || '').trim().slice(0, 400);
  const cat = String(body.cat || '💡 Idea').trim().slice(0, 40);
  const day = Number(body.day) || 1;
  if (!text) {
    return res.status(400).json({ ok: false, error: 'Wish text is required' });
  }

  const shortTitle = text.length > 60 ? text.slice(0, 57) + '...' : text;
  const issuePayload = {
    title: `🌟 Michelle's Wish: ${shortTitle}`,
    body: [
      `**Category:** ${cat}`,
      `**In-Game Day:** Day ${day}`,
      '',
      `> ${text.replace(/\n/g, '\n> ')}`,
      '',
      '_Sent automatically from Starwillow Witch School Idea Box._',
    ].join('\n'),
    labels: ['michelle-wish'],
  };

  try {
    const ghRes = await fetch(`https://api.github.com/repos/${REPO}/issues`, {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'starwillow-wish-receiver',
      },
      body: JSON.stringify(issuePayload),
    });

    const data = await ghRes.json().catch(() => ({}));
    if (!ghRes.ok) {
      return res.status(ghRes.status).json({ ok: false, error: data.message || 'GitHub API error' });
    }
    return res.status(200).json({ ok: true, number: data.number, url: data.html_url });
  } catch (err) {
    return res.status(502).json({ ok: false, error: 'Failed to reach GitHub' });
  }
}
