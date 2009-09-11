class ChangeCarbonToFloat < ActiveRecord::Migration
  def self.up
    remove_column :conversions, :carbon
    add_column :conversions, :carbon, :float
  end

  def self.down
    add_column :conversions, :carbon, :integer
    remove_column :conversions, :carbon
  end
end
