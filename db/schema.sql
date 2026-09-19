CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS places (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  province TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  best_time TEXT,
  how_to_get_there TEXT,
  entry_fee TEXT,
  estimated_cost TEXT,
  map_lat REAL,
  map_lng REAL,
  suggested_by INTEGER,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (suggested_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS place_photos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  place_id INTEGER NOT NULL,
  url TEXT NOT NULL,
  FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS hotels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  place_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  price_per_night INTEGER,
  contact TEXT,
  description TEXT,
  FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tours (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  place_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  price INTEGER,
  duration TEXT,
  description TEXT,
  FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  place_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS review_photos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  review_id INTEGER NOT NULL,
  url TEXT NOT NULL,
  FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  place_id INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('tour','hotel')),
  reference_id INTEGER NOT NULL,
  date_from TEXT NOT NULL,
  date_to TEXT,
  guests INTEGER DEFAULT 1,
  status TEXT DEFAULT 'pending',
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (place_id) REFERENCES places(id)
);
