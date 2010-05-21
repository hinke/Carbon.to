class Logging < ActiveRecord::Migration
  def self.up
    create_table :logs do |t|
      t.column :content, :string
      t.timestamps
    end
  end

  def self.down
  end
end
