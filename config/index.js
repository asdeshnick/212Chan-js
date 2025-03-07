// config/index.js
const path = require('path');

module.exports = {
  database: {
    url: process.env.DATABASE_URL || 'sqlite://database.sqlite'
  },
  uploads: {
    folder: path.join(__dirname, '../uploads'),
    thumbs: path.join(__dirname, '../thumbs'),
    allowedExtensions: ['png', 'jpg', 'jpeg', 'gif'],
    maxFileSize: 5 * 1024 * 1024
  },
  security: {
    recaptcha: {
      secret: process.env.RECAPTCHA_SECRET,
      sitekey: process.env.RECAPTCHA_SITEKEY
    }
  }
};