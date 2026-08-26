const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// GET /health endpoint for Render health checks
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// POST /v1/auth/login endpoint
app.post('/v1/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // --- This is where actual authentication logic would go ---
  // In a real application, you would:
  // 1. Query a database to find a user by email.
  // 2. Hash the provided password and compare it with the stored hash.
  // 3. Generate a JWT token if credentials are valid.
  // 4. Return user data (without sensitive info like password hash).

  // For this mock implementation, we'll simulate a successful login
  // and generate a dummy token and user object.
  if (email === 'user@example.com' && password === 'password123') {
    const dummyToken = `mock-jwt-token-for-${email}`;
    const dummyUser = {
      id: 'mock-user-123',
      email: email,
      username: 'Example User',
      roles: ['user']
      // Add other user details as needed
    };

    return res.status(200).json({
      token: dummyToken,
      user: dummyUser
    });
  } else {
    // Simulate invalid credentials
    return res.status(401).json({ message: 'Invalid email or password' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
