const path = require('path');
const fs = require('fs');
const { DatabaseSync } = require('node:sqlite'); // built into Node 22.5+, no install/compile needed

const DB_PATH = path.join(__dirname, 'pak-travel.sqlite');
const db = new DatabaseSync(DB_PATH);

db.exec('PRAGMA journal_mode = WAL');
db.exec('PRAGMA foreign_keys = ON');

// Run schema on every boot (all statements are IF NOT EXISTS, so this is safe)
const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
db.exec(schema);

// Auto-seed with sample places on first boot only (no-op if data already exists).
// This means hosting platforms without shell access still get a populated site.
const { seedIfEmpty } = require('./seed-logic');
const seedResult = seedIfEmpty(db);
if (seedResult.seeded) {
  console.log(`Auto-seeded ${seedResult.count} sample places on first run.`);
}

module.exports = db;
