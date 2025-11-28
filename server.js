const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme';
const SESSION_SECRET = process.env.SESSION_SECRET || 'npc-session-secret';

const DATA_DIR = path.join(__dirname, 'data');
const ALLOWED_FILES = new Set([
  'config.json',
  'names.json',
  'professions.json',
  'traits.json',
  'towns.json',
  'ages.json'
]);

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    name: 'npc-admin',
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DATA_DIR);
  },
  filename: function (req, file, cb) {
    if (!ALLOWED_FILES.has(file.originalname)) {
      return cb(new Error('Invalid file name'));
    }
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

function requireAdmin(req, res, next) {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  return res.redirect('/admin');
}

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/data', express.static(DATA_DIR));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/admin', (req, res) => {
  if (req.session && req.session.isAdmin) {
    return res.redirect('/admin/dashboard');
  }
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.post('/admin/login', (req, res) => {
  const { password } = req.body;
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).send('Invalid password');
  }
  req.session.isAdmin = true;
  res.redirect('/admin/dashboard');
});

app.post('/admin/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin');
  });
});

app.get('/admin/dashboard', requireAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin-dashboard.html'));
});

app.get('/admin/files', requireAdmin, (req, res) => {
  const files = Array.from(ALLOWED_FILES).map((file) => ({
    name: file,
    exists: fs.existsSync(path.join(DATA_DIR, file)),
  }));
  res.json({ files });
});

app.get('/admin/validate', requireAdmin, (req, res) => {
  const results = Array.from(ALLOWED_FILES).map((file) => {
    const filePath = path.join(DATA_DIR, file);
    if (!fs.existsSync(filePath)) {
      return { file, ok: false, error: 'Missing file' };
    }
    try {
      const contents = fs.readFileSync(filePath, 'utf8');
      JSON.parse(contents);
      return { file, ok: true };
    } catch (err) {
      return { file, ok: false, error: err.message };
    }
  });

  res.json({ results });
});

app.post('/admin/upload', requireAdmin, upload.single('dataFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  res.redirect('/admin/dashboard');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server error: ' + err.message);
});

app.listen(PORT, () => {
  console.log(`D&D NPC Crafter server running on http://localhost:${PORT}`);
});
