const sS = require("./schema/schemaS");
const { pgTable, integer, decimal, boolean } = require("drizzle-orm/pg-core");

const user = pgTable("user", {
  id: sS.primaryKey(),
  username: sS.varchar(80).unique().notNull(),
  password: sS.varchar(1000).notNull(),
  holding_period_default: integer().default(6),
});

const property_api_data = pgTable("property_api_data", {
  id: sS.primaryKey(),
  google_address_id: sS.varchar(200),
  address: sS.varchar(1000).notNull(),
  ...sS.insertedUpdated(),
  purchase_price: sS.money(),
  taxes_yearly: sS.money(),
  after_repair_value: sS.money(),
  property_type: sS.varchar(1000),
  bedrooms: integer(),
  bathrooms: sS.money(),
  square_footage: sS.money(),
});

const properties = pgTable("properties", {
  id: sS.primaryKey(),
  user_id: childReferencesUser(),
  property_api_id: referencesPropertyApi(),
  address: sS.varchar(1000).notNull(),
  ...sS.insertedUpdated(),
  purchase_price: sS.money(),
  holding_period: integer().default(6),
  taxes_yearly: sS.money(),
  after_repair_value: sS.money(),
  total_repair_cost: sS.money(),
  total_upfront_cost: sS.money(),
  monthly_holding_cost: sS.money(),
  total_holding_cost: sS.money(),
  total_cost: sS.money(),
  profit: sS.money(),
  monthly_profit: sS.money(),
  is_archived: boolean().default(false),
});

const default_holdings = pgTable("default_holdings", {
  id: sS.primaryKey(),
  user_id: childReferencesUser(),
  holding_name: sS.varchar(1000),
  holding_cost: decimal(),
});

const default_repairs = pgTable("default_repairs", {
  id: sS.primaryKey(),
  user_id: childReferencesUser(),
  repair_name: sS.varchar(1000),
  repair_cost: decimal(),
});

const holding_items = pgTable("holding_items", {
  id: sS.primaryKey(),
  property_id: childReferencesProperty(),
  name: sS.varchar(1000),
  cost: decimal(),
});

const repair_items = pgTable("repair_items", {
  id: sS.primaryKey(),
  property_id: childReferencesProperty(),
  name: sS.varchar(1000),
  cost: decimal(),
});

const default_mortgage_calculations = pgTable("default_mortgage_calculations", {
  id: sS.primaryKey(),
  property_id: childReferencesProperty(),
  interest_rate: sS.decimal(15, 3),
  interest_rate_inserted_at: sS.time(),
  interest_rate_updated_at: sS.time(),
  loan_term: integer().default(30),
  down_payment_percentage: sS.decimal(15, 3).default(0.2),
  closing_costs_percentage: sS.decimal(15, 3).default(0.03),
  base_loan_amount: sS.money(),
  interest_rate_annual: sS.decimal(15, 3),
});

const mortgage_calculations = pgTable("mortgage_calculations", {
  id: sS.primaryKey(),
  property_id: childReferencesProperty(),
  interest_rate: sS.decimal(15, 3),
  interest_rate_api_inserted_at: sS.time(),
  interest_rate_api_updated_at: sS.time(),
  loan_term: integer().default(30),
  down_payment: sS.money(),
  down_payment_percentage: sS.decimal(15, 3).default(0.2),
  closing_costs: sS.money(),
  closing_costs_percentage: sS.decimal(15, 3).default(0.03),
  base_loan_amount: sS.money(),
  interest_rate_annual: sS.decimal(15, 3),
  interest_rate_monthly: sS.decimal(15, 3),
  interest_decimal_monthly: sS.decimal(15, 4),
  interest_payment_monthly: sS.money(),
});

function childReferencesUser() {
  return integer()
    .references(() => user.id, { onDelete: "cascade" })
    .notNull();
}

function childReferencesProperty() {
  return integer()
    .references(() => properties.id, {
      onDelete: "cascade",
    })
    .notNull();
}
function referencesPropertyApi() {
  return integer()
    .references(() => property_api_data.id, { onDelete: "restrict" })
    .notNull();
}

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
