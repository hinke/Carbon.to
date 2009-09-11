class CreateConversions < ActiveRecord::Migration
  def self.up
    create_table :conversions do |t|
      t.column :slug, :string, :null => false
      t.column :unit, :string, :null => false
      t.column :base_value, :integer, :null => false
      t.column :carbon, :integer, :null => false
      t.column :name, :string, :null => false
      t.column :description, :text
      t.column :icon, :string
      t.column :category_id, :integer, :null => false
      t.timestamps
    end
  end

  def self.down
    drop_table :conversions
  end
end
