class CreateCategories < ActiveRecord::Migration
  def self.up
    create_table :categories do |t|
      t.column :name, :string, :null => false
      t.column :description, :text
      t.column :icon, :string      
      t.timestamps
    end
  end

  def self.down
    drop_table :categories
  end
end
