const express = require('express');
const db = require('../db/database');
const { requireLogin } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/places/:id/reviews', requireLogin, upload.array('photos', 4), (req, res) => {
  const placeId = req.params.id;
  const { rating, comment } = req.body;

  const place = db.prepare('SELECT id FROM places WHERE id = ?').get(placeId);
  if (!place) return res.status(404).render('404');

  const ratingNum = parseInt(rating, 10);
  if (!ratingNum || ratingNum < 1 || ratingNum > 5) {
    return res.redirect('/places/' + placeId + '?error=invalid_rating');
  }

  const info = db.prepare('INSERT INTO reviews (place_id, user_id, rating, comment) VALUES (?, ?, ?, ?)')
    .run(placeId, req.session.user.id, ratingNum, (comment || '').trim());

  const reviewId = info.lastInsertRowid;
  const insertPhoto = db.prepare('INSERT INTO review_photos (review_id, url) VALUES (?, ?)');
  (req.files || []).forEach(f => insertPhoto.run(reviewId, '/uploads/' + f.filename));

  res.redirect('/places/' + placeId + '#reviews');
});

module.exports = router;
