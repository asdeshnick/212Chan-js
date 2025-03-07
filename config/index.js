module.exports = {
    UPLOAD_FOLDER: path.join(__dirname, '../uploads'),
    THUMBS_FOLDER: path.join(__dirname, '../thumbs'),
    ALLOWED_EXTENSIONS: new Set(['png', 'jpg', 'jpeg', 'gif']),
    MAX_FILE_SIZE: 5 * 1024 * 1024 // 5MB
    RECAPTCHA_SECRET: process.env.RECAPTCHA_SECRET,
    RECAPTCHA_SITEKEY: process.env.RECAPTCHA_SITEKEY
  };
