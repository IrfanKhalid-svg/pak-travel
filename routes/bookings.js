const express = require('express');
const db = require('../db/database');
const { requireLogin } = require('../middleware/auth');

const router = express.Router();

// Create a booking (tour or hotel) for a place
router.post('/places/:id/book', requireLogin, (req, res) => {
  const placeId = req.params.id;
  const { type, reference_id, date_from, date_to, guests } = req.body;

  const place = db.prepare('SELECT id FROM places WHERE id = ?').get(placeId);
  if (!place) return res.status(404).render('404');

  if (!['tour', 'hotel'].includes(type) || !reference_id || !date_from) {
    return res.redirect('/places/' + placeId + '?error=missing_booking_fields');
  }

  // Confirm the referenced tour/hotel actually belongs to this place
  const table = type === 'tour' ? 'tours' : 'hotels';
  const ref = db.prepare(`SELECT id FROM ${table} WHERE id = ? AND place_id = ?`).get(reference_id, placeId);
  if (!ref) return res.redirect('/places/' + placeId + '?error=invalid_reference');

  db.prepare(`
    INSERT INTO bookings (user_id, place_id, type, reference_id, date_from, date_to, guests, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
  `).run(req.session.user.id, placeId, type, reference_id, date_from, date_to || null, guests ? parseInt(guests, 10) : 1);

  res.redirect('/my-bookings?booked=1');
});

// View my bookings
router.get('/my-bookings', requireLogin, (req, res) => {
  const bookings = db.prepare(`
    SELECT bookings.*, places.name AS place_name
    FROM bookings JOIN places ON places.id = bookings.place_id
    WHERE bookings.user_id = ?
    ORDER BY bookings.created_at DESC
  `).all(req.session.user.id);

  bookings.forEach(b => {
    const table = b.type === 'tour' ? 'tours' : 'hotels';
    b.item = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(b.reference_id);
  });

  res.render('my-bookings', { bookings, booked: req.query.booked === '1' });
});

// Cancel a booking (only your own)
router.post('/bookings/:id/cancel', requireLogin, (req, res) => {
  db.prepare(`UPDATE bookings SET status = 'cancelled' WHERE id = ? AND user_id = ?`)
    .run(req.params.id, req.session.user.id);
  res.redirect('/my-bookings');
});

module.exports = router;
