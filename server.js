const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Endpoint de santé pour Render
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Endpoint POST /v1/auth/login
app.post('/v1/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Validation basique des champs
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // NOTE: Dans un cas réel, vous devriez:
  // 1. Vérifier les identifiants dans une base de données.
  // 2. Hacher les mots de passe.
  // 3. Générer un JWT (JSON Web Token) sécurisé.
  // Ici, nous simulons une réponse réussie.

  // Simulation d'une authentification réussie
  if (email === 'user@example.com' && password === 'MySecretPassword123') {
    // Générer un token bidon pour l'exemple
    const token = 'fake-jwt-token-for-' + btoa(email);
    const user = { id: 'user123', email: email, name: 'Example User' };
    
    return res.status(200).json({ token, user });
  } else {
    // Simulation d'une authentification échouée
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Gérer les routes non trouvées (404)
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Écouter sur le port configuré par Render ou 3000 localement
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
