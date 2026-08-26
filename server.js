const express = require('express');
const app = express();

// Middleware pour parser le JSON du corps des requêtes
app.use(express.json());

// Middleware pour simuler un délai réseau et/ou un traitement serveur
app.use((req, res, next) => {
  setTimeout(next, 500);
});

// Endpoint GET /health pour la vérification de l'état du service
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Endpoint POST /v1/auth/login
app.post('/v1/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Validation minimale des champs requis
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  // Logique de simulation de connexion (remplacez par votre logique réelle d'authentification)
  // Pour cet exemple, nous simulons une connexion réussie pour toute paire non vide.
  // Dans une application réelle, vous vérifieriez le email et password contre une base de données.
  if (email === 'user@example.com' && password === 'mysecretpassword') {
    // Simulation d'un utilisateur et d'un token
    const token = 'mock_jwt_token_for_' + email + '_' + Date.now();
    const user = {
      id: 'usr_12345',
      email: email,
      firstName: 'Test',
      lastName: 'User'
    };

    // Répondre avec le format attendu
    res.status(200).json({
      token: token,
      user: user
    });
  } else if (email === 'failed@example.com') {
    // Simuler un échec de connexion (par exemple, mauvais mot de passe)
    res.status(401).json({ message: 'Invalid credentials.' });
  } else {
    // Comportement par défaut si email/password ne correspondent pas au test
    res.status(401).json({ message: 'Authentication failed.' });
  }
});

// Port d'écoute, utilise process.env.PORT pour Render ou 3000 par défaut en local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
