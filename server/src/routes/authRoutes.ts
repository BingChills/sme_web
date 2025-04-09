import { Router } from 'express';
import { db } from '../db';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query the 'sme_info' collection for a user with the provided email
    const user = await db.collection('sme_info').findOne({ email });
    
    // Check if user exists and if the password matches
    if (user && user.password === password) {
      // In a real app, you would return a proper auth token here
      return res.status(200).json({ token: 'dummy-token', email: user.email });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;