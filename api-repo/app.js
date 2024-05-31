const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const connectDB = require('./config/db');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

app.get('/ip', (req, res) => {
  const interfaces = os.networkInterfaces();
  let ipAddress = '127.0.0.1';

  for (let interfaceName in interfaces) {
    const iface = interfaces[interfaceName];

    for (let i = 0; i < iface.length; i++) {
        const alias = iface[i];
        if (alias.family === 'IPv4' && !alias.internal) {
            ipAddress = alias.address;
        }
    }
}
  
  res.json({ ipAddress });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
