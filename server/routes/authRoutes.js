const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// Log every request to this router for debugging
router.use((req, res, next) => {
  console.log(`Auth Route Hit: ${req.method} ${req.url}`);
  next();
});

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
