const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const loginEmail = process.env.LOGIN_EMAIL || 'demo@eyeheat.com';
  const loginPassword = process.env.LOGIN_PASSWORD || 'demo123';

  if (email === loginEmail && password === loginPassword) {
    const tokenPayload = `${email}:${Date.now()}`;
    const token = Buffer.from(tokenPayload).toString('base64url');
    return res.json({ token, message: 'Success' });
  }
  
  return res.status(401).json({ message: 'Invalid email or password.' });
});

module.exports = router;
