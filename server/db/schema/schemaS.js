const {
  decimal,
  integer,
  serial,
  timestamp,
  varchar,
} = require("drizzle-orm/pg-core");

function time() {
  return timestamp().defaultNow();
}

module.exports = {
  primaryKey() {
    return serial().primaryKey();
  },
  varchar(length) {
    return varchar({ length });
  },
  time,
  decimal(precision, scale) {
    return decimal({ precision, scale });
  },
  money() {
    return decimal({ precision: 15, scale: 2 });
  },
  insertedUpdated() {
    return {
      inserted_at: time(),
      updated_at: time(),
    };
  },
};
