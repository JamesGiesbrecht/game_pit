# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_11_05_000814) do

  create_table "addresses", force: :cascade do |t|
    t.string "address"
    t.string "city"
    t.integer "province_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "customer_id", null: false
    t.index ["customer_id"], name: "index_addresses_on_customer_id"
    t.index ["province_id"], name: "index_addresses_on_province_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "customers", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.integer "phone"
    t.string "email"
    t.string "password"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "details", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "order_products", force: :cascade do |t|
    t.integer "order_id", null: false
    t.integer "product_id", null: false
    t.integer "quantity"
    t.decimal "price"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["order_id"], name: "index_order_products_on_order_id"
    t.index ["product_id"], name: "index_order_products_on_product_id"
  end

  create_table "order_statuses", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "orders", force: :cascade do |t|
    t.datetime "order_date"
    t.integer "address_id", null: false
    t.decimal "gst"
    t.decimal "pst"
    t.integer "order_status_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["address_id"], name: "index_orders_on_address_id"
    t.index ["order_status_id"], name: "index_orders_on_order_status_id"
  end

  create_table "product_details", force: :cascade do |t|
    t.integer "product_id", null: false
    t.integer "detail_id", null: false
    t.string "value"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["detail_id"], name: "index_product_details_on_detail_id"
    t.index ["product_id"], name: "index_product_details_on_product_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "category_id", null: false
    t.decimal "price"
    t.integer "stock_quantity"
    t.decimal "discount"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["category_id"], name: "index_products_on_category_id"
  end

  create_table "provinces", force: :cascade do |t|
    t.string "name"
    t.decimal "gst"
    t.decimal "pst"
    t.integer "tax_type_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["tax_type_id"], name: "index_provinces_on_tax_type_id"
  end

  create_table "tax_types", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "addresses", "customers"
  add_foreign_key "addresses", "provinces"
  add_foreign_key "order_products", "orders"
  add_foreign_key "order_products", "products"
  add_foreign_key "orders", "addresses"
  add_foreign_key "orders", "order_statuses"
  add_foreign_key "product_details", "details"
  add_foreign_key "product_details", "products"
  add_foreign_key "products", "categories"
  add_foreign_key "provinces", "tax_types"
end
