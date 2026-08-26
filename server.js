const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
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

  // The client expects the endpoint to be /v1/auth/login.
  // The original client contract specified 'https://api.marvia.app/v1/auth/login' as the full URL,
  // but the server path should only be '/v1/auth/login'.
  // The previous issue was likely due to the client calling a different base URL than the server's path.
  // Assuming the `marvia-auth-backend.onrender.com` is the base URL and the client appends the path `/v1/auth/login`,
  // the server's route definition `/v1/auth/login` is correct for the path part.

  // --- DUMMY AUTHENTICATION LOGIC --- 
  // In a real application, you would: 
  // 1. Query a database for the user by email.
  // 2. Hash the provided password and compare it to the stored hashed password.
  // 3. Generate a real JWT token.
  // For this example, we'll simulate a successful login with dummy data.
  
  if (email === 'john.doe@example.com' && password === 'securePassword123') {
    // Simulate a JWT token
    const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiAxMjMsImVtYWlsIjogImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjogMTY3ODkwNTYwMH0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    // Simulate user object
    const dummyUser = {
      id: '123',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe'
    };

    res.status(200).json({
      token: dummyToken,
      user: dummyUser
    });
  } else {
    // Invalid credentials
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
