const fetch = require('node-fetch');
exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const body = JSON.parse(event.body);
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const TO_EMAIL = process.env.TO_EMAIL || 'jmunuswa@gmail.com';
    if (!SENDGRID_API_KEY) {
      return { statusCode: 500, body: 'SendGrid not configured' };
    }
    const email = {
      personalizations: [{ to: [{ email: TO_EMAIL }] }],
      from: { email: 'no-reply@jayakumar.dev', name: 'Jayakumar Freelance' },
      subject: `New project brief from ${body.name || 'site visitor'}`,
      content: [{ type: 'text/plain', value: `Name: ${body.name}\nEmail: ${body.email}\nPhone: ${body.phone}\nService: ${body.service}\n\nBrief:\n${body.brief}` }]
    };
    const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(email)
    });
    if (res.status >= 200 && res.status < 300) {
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    } else {
      const txt = await res.text();
      console.error('SendGrid error', res.status, txt);
      return { statusCode: 502, body: 'Email service error' };
    }
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: 'Server error' };
  }
};
