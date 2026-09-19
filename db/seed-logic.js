const places = require('./seed-places-data');

// Inserts the sample places, but only if the database is empty.
// Safe to call every time the app starts — it's a no-op after the first run.
function seedIfEmpty(db) {
  const existing = db.prepare('SELECT COUNT(*) AS c FROM places').get();
  if (existing.c > 0) {
    return { seeded: false, count: existing.c };
  }

  const insertPlace = db.prepare(`
    INSERT INTO places (name, province, category, description, best_time, how_to_get_there, entry_fee, estimated_cost, map_lat, map_lng)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertPhoto = db.prepare(`INSERT INTO place_photos (place_id, url) VALUES (?, ?)`);
  const insertHotel = db.prepare(`INSERT INTO hotels (place_id, name, price_per_night, contact, description) VALUES (?, ?, ?, ?, ?)`);
  const insertTour = db.prepare(`INSERT INTO tours (place_id, name, price, duration, description) VALUES (?, ?, ?, ?, ?)`);

  db.exec('BEGIN');
  try {
    for (const p of places) {
      const info = insertPlace.run(
        p.name, p.province, p.category, p.description, p.best_time,
        p.how_to_get_there, p.entry_fee, p.estimated_cost, p.map_lat, p.map_lng
      );
      const placeId = info.lastInsertRowid;
      for (const url of p.photos) insertPhoto.run(placeId, url);
      for (const h of p.hotels) insertHotel.run(placeId, h.name, h.price_per_night, h.contact, h.description);
      for (const t of p.tours) insertTour.run(placeId, t.name, t.price, t.duration, t.description);
    }
    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }

  return { seeded: true, count: places.length };
}

module.exports = { seedIfEmpty };
