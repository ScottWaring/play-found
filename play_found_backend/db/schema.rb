# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_12_17_200303) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bathrooms", force: :cascade do |t|
    t.string "title"
    t.bigint "user_id"
    t.string "location"
    t.string "business_type"
    t.integer "rating"
    t.boolean "changing_table"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_bathrooms_on_user_id"
  end

  create_table "cached_playgrounds", force: :cascade do |t|
    t.bigint "user_id"
    t.string "location"
    t.string "business_type"
    t.integer "rating"
    t.boolean "bathroom"
    t.text "description"
    t.string "img_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_cached_playgrounds_on_user_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.string "title"
    t.bigint "user_id"
    t.text "review"
    t.integer "rating"
    t.bigint "cached_playground_id"
    t.string "yelp_playground"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cached_playground_id"], name: "index_reviews_on_cached_playground_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "searches", force: :cascade do |t|
    t.string "lat"
    t.string "long"
    t.string "location"
    t.boolean "bathroom"
    t.boolean "playground"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "first_name"
    t.string "last_name"
    t.boolean "admin"
    t.string "password_digest"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "bathrooms", "users"
  add_foreign_key "cached_playgrounds", "users"
  add_foreign_key "reviews", "cached_playgrounds"
  add_foreign_key "reviews", "users"
end
