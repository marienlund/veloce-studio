module.exports = async (req, res) => {
  const sessionId = req.query.session_id;
  if (!sessionId) return res.status(400).json({ error: 'Missing session_id' });

  return res.json({
    success: true,
    receiptId: sessionId.replace('demo_', ''),
    demoMode: true,
    isPaid: true
  });
};
