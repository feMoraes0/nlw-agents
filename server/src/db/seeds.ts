import { reset, seed } from "drizzle-seed";
import { db, sql } from "./connection.ts";
import { schema } from "./schemas/index.ts";

// clean database
await reset(db, schema);
// adds the new entries
await seed(db, schema).refine((f) => {
  return {
    rooms: {
      count: 20, // quantity of entries
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
      },
    },
    questions: {
      count: 20,
    },
  };
});
// end the connection
await sql.end();
