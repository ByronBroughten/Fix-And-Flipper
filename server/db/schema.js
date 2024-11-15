const {
  decimal,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
  boolean,
} = require("drizzle-orm/pg-core");

function varChar(length) {
  return varchar({ length });
}

function timeDefault() {
  return timestamp().defaultNow();
}

function dec(precision, scale) {
  return decimal({ precision, scale });
}
function money() {
  return decimal({ precision: 15, scale: 2 });
}

function serialPrimary() {
  return serial().primaryKey();
}

function insertedUpdated() {
  return {
    inserted_at: timeDefault(),
    updated_at: timeDefault(),
  };
}

const user = pgTable("user", {
  id: serialPrimary(),
  username: varChar(80).unique().notNull(),
  password: varChar(1000).notNull(),
  holding_period_default: integer().default(6),
});

function childReferencesUser() {
  return integer()
    .references(() => user.id, { onDelete: "cascade" })
    .notNull();
}

const property_api_data = pgTable("property_api_data", {
  id: serialPrimary(),
  google_address_id: varChar(200),
  address: varChar(1000).notNull(),
  ...insertedUpdated(),
  purchase_price: money(),
  taxes_yearly: money(),
  after_repair_value: money(),
  property_type: varChar(1000),
  bedrooms: integer(),
  bathrooms: money(),
  square_footage: money(),
});

function referencesPropertyApi() {
  return integer()
    .references(() => property_api_data.id, { onDelete: "restrict" })
    .notNull();
}

const properties = pgTable("properties", {
  id: serialPrimary(),
  user_id: childReferencesUser(),
  property_api_id: referencesPropertyApi(),
  address: varChar(1000).notNull(),
  ...insertedUpdated(),
  purchase_price: money(),
  holding_period: integer().default(6),
  taxes_yearly: money(),
  after_repair_value: money(),
  total_repair_cost: money(),
  total_upfront_cost: money(),
  monthly_holding_cost: money(),
  total_holding_cost: money(),
  total_cost: money(),
  profit: money(),
  monthly_profit: money(),
  is_archived: boolean().default(false),
});

function childReferencesProperty() {
  return integer()
    .references(() => properties.id, {
      onDelete: "cascade",
    })
    .notNull();
}

const default_holdings = pgTable("default_holdings", {
  id: serialPrimary(),
  user_id: childReferencesUser(),
  holding_name: varChar(1000),
  holding_cost: decimal(),
});

const default_repairs = pgTable("default_repairs", {
  id: serialPrimary(),
  user_id: childReferencesUser(),
  repair_name: varChar(1000),
  repair_cost: decimal(),
});

const holding_items = pgTable("holding_items", {
  id: serialPrimary(),
  property_id: childReferencesProperty(),
  name: varChar(1000),
  cost: decimal(),
});

const repair_items = pgTable("repair_items", {
  id: serialPrimary(),
  property_id: childReferencesProperty(),
  name: varChar(1000),
  cost: decimal(),
});

const default_mortgage_calculations = pgTable("default_mortgage_calculations", {
  id: serialPrimary(),
  property_id: childReferencesProperty(),
  interest_rate: dec(15, 3),
  interest_rate_inserted_at: timeDefault(),
  interest_rate_updated_at: timeDefault(),
  loan_term: integer().default(30),
  down_payment_percentage: dec(15, 3).default(0.2),
  closing_costs_percentage: dec(15, 3).default(0.03),
  base_loan_amount: money(),
  interest_rate_annual: dec(15, 3),
});

const mortgage_calculations = pgTable("mortgage_calculations", {
  id: serialPrimary(),
  property_id: childReferencesProperty(),
  interest_rate: dec(15, 3),
  interest_rate_api_inserted_at: timeDefault(),
  interest_rate_api_updated_at: timeDefault(),
  loan_term: integer().default(30),
  down_payment: money(),
  down_payment_percentage: dec(15, 3).default(0.2),
  base_loan_amount: money(),
  closing_costs: money(),
  closing_costs_percentage: dec(15, 3).default(0.03),
  base_loan_amount: money(),
  interest_rate_annual: dec(15, 3),
  interest_rate_monthly: dec(15, 3),
  interest_decimal_monthly: dec(15, 4),
  interest_payment_monthly: money(),
});

module.exports = {
  user,
  property_api_data,
  properties,
  default_holdings,
  default_repairs,
  holding_items,
  repair_items,
  default_mortgage_calculations,
  mortgage_calculations,
};
