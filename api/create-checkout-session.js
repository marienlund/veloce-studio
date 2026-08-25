const JSZip = require('jszip');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, brandName, websitePages } = req.body;
  const receiptId = `VELOCE-${Math.floor(10000 + Math.random() * 90000)}`;

  // Demo mode
  return res.json({
    demoMode: true,
    success: true,
    receiptId,
    message: 'Demo mode. Payment simulated!',
    sessionId: `demo_${receiptId}`
  });
};
