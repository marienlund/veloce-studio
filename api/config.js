module.exports = async (req, res) => {
  res.json({
    stripeEnabled: false,
    smtpEnabled: false,
    stripePublicKey: '',
    domain: 'https://velocestudio.dk'
  });
};
