// Manual seed command: `npm run seed`.
// Usually unnecessary — the app auto-seeds on first boot (see database.js) —
// but useful if you ever wipe db/pak-travel.sqlite and want to reseed by hand.
const db = require('./database');
const { seedIfEmpty } = require('./seed-logic');

const result = seedIfEmpty(db);

if (result.seeded) {
  console.log(`Seeded ${result.count} places with photos, hotels, and tours.`);
} else {
  console.log(`Database already has ${result.count} places. Skipping seed. Delete db/pak-travel.sqlite to reseed.`);
}
