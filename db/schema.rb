# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20100523114442) do

  create_table "categories", :force => true do |t|
    t.string   "name",        :null => false
    t.text     "description"
    t.string   "icon"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "color"
  end

  create_table "conversions", :force => true do |t|
    t.string   "slug",        :null => false
    t.string   "unit",        :null => false
    t.integer  "base_value",  :null => false
    t.string   "name",        :null => false
    t.text     "description"
    t.string   "icon"
    t.integer  "category_id", :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "carbon"
  end

  create_table "logs", :force => true do |t|
    t.string   "content"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "session"
  end

end
