const express = require('express');
const db = require('../db/database');
const { requireLogin } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

const PROVINCES = ['Gilgit-Baltistan', 'Khyber Pakhtunkhwa', 'Punjab', 'Sindh', 'Balochistan', 'Islamabad Capital Territory', 'Azad Jammu & Kashmir'];
const CATEGORIES = ['Mountains', 'Historical', 'Religious', 'Beaches', 'Lakes', 'Cities'];

function getPlaceCard(row) {
  const photo = db.prepare('SELECT url FROM place_photos WHERE place_id = ? LIMIT 1').get(row.id);
  const rating = db.prepare('SELECT AVG(rating) AS avg, COUNT(*) AS count FROM reviews WHERE place_id = ?').get(row.id);
  return {
    ...row,
    photo: photo ? photo.url : null,
    avg_rating: rating.avg ? Math.round(rating.avg * 10) / 10 : null,
    review_count: rating.count
  };
}

// Home: list + search + filter
router.get('/', (req, res) => {
  const { province, category, q } = req.query;
  let sql = 'SELECT * FROM places WHERE 1=1';
  const params = [];

  if (province) { sql += ' AND province = ?'; params.push(province); }
  if (category) { sql += ' AND category = ?'; params.push(category); }
  if (q) { sql += ' AND (name LIKE ? OR description LIKE ?)'; params.push(`%${q}%`, `%${q}%`); }
  sql += ' ORDER BY name ASC';

  const rows = db.prepare(sql).all(...params);
  const places = rows.map(getPlaceCard);

  res.render('index', {
    places,
    provinces: PROVINCES,
    categories: CATEGORIES,
    filters: { province: province || '', category: category || '', q: q || '' }
  });
});

// Suggest a new place
router.get('/places/suggest', requireLogin, (req, res) => {
  res.render('suggest-place', { provinces: PROVINCES, categories: CATEGORIES, error: null, form: {} });
});

router.post('/places/suggest', requireLogin, upload.array('photos', 6), (req, res) => {
  const { name, province, category, description, best_time, how_to_get_there, entry_fee, estimated_cost, map_lat, map_lng } = req.body;

  if (!name || !province || !category) {
    return res.render('suggest-place', {
      provinces: PROVINCES, categories: CATEGORIES,
      error: 'Name, province, and category are required.', form: req.body
    });
  }

  const info = db.prepare(`
    INSERT INTO places (name, province, category, description, best_time, how_to_get_there, entry_fee, estimated_cost, map_lat, map_lng, suggested_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    name.trim(), province, category, description || null, best_time || null,
    how_to_get_there || null, entry_fee || null, estimated_cost || null,
    map_lat ? parseFloat(map_lat) : null, map_lng ? parseFloat(map_lng) : null,
    req.session.user.id
  );

  const placeId = info.lastInsertRowid;
  const insertPhoto = db.prepare('INSERT INTO place_photos (place_id, url) VALUES (?, ?)');
  (req.files || []).forEach(f => insertPhoto.run(placeId, '/uploads/' + f.filename));

  res.redirect('/places/' + placeId);
});

// Place detail page
router.get('/places/:id', (req, res) => {
  const place = db.prepare('SELECT * FROM places WHERE id = ?').get(req.params.id);
  if (!place) return res.status(404).render('404');

  const photos = db.prepare('SELECT * FROM place_photos WHERE place_id = ?').all(place.id);
  const hotels = db.prepare('SELECT * FROM hotels WHERE place_id = ?').all(place.id);
  const tours = db.prepare('SELECT * FROM tours WHERE place_id = ?').all(place.id);
  const reviews = db.prepare(`
    SELECT reviews.*, users.name AS user_name
    FROM reviews JOIN users ON users.id = reviews.user_id
    WHERE place_id = ? ORDER BY reviews.created_at DESC
  `).all(place.id);
  reviews.forEach(r => {
    r.photos = db.prepare('SELECT url FROM review_photos WHERE review_id = ?').all(r.id);
  });
  const ratingRow = db.prepare('SELECT AVG(rating) AS avg, COUNT(*) AS count FROM reviews WHERE place_id = ?').get(place.id);

  res.render('place', {
    place, photos, hotels, tours, reviews,
    avg_rating: ratingRow.avg ? Math.round(ratingRow.avg * 10) / 10 : null,
    review_count: ratingRow.count
  });
});

module.exports = router;
