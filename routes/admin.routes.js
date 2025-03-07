import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Admin panel');
});

module.exports = router;