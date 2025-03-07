const axios = require('axios');

const verifyCaptcha = async (req, res, next) => {
  const token = req.body['g-recaptcha-response'];
  const secret = config.RECAPTCHA_SECRET;
  
  try {
    const { data } = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
    );
    
    if (!data.success) throw new Error('CAPTCHA verification failed');
    next();
  } catch (error) {
    res.status(400).send('Invalid CAPTCHA');
  }
};

module.exports = verifyCaptcha;