const path = require('path');
const express = require('express');
const session = require('express-session');

require('./db/database'); // ensures schema is created on boot

const { attachUser } = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const placesRoutes = require('./routes/places');
const bookingsRoutes = require('./routes/bookings');
const reviewsRoutes = require('./routes/reviews');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'pak-travel-dev-secret-change-me',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 7 days
}));

app.use(attachUser);

app.use('/', authRoutes);
app.use('/', placesRoutes);
app.use('/', bookingsRoutes);
app.use('/', reviewsRoutes);

app.use((req, res) => {
  res.status(404).render('404');
});

// Basic error handler (e.g. multer file-type/size errors)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong: ' + err.message);
});

app.listen(PORT, () => {
  console.log(`Pak Travel running at http://localhost:${PORT}`);
});
