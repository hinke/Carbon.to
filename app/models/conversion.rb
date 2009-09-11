class Conversion < ActiveRecord::Base
  belongs_to :category
  attr_accessor :amount
  
  def amount=(co2)
    write_attribute(:amount, (co2/self.carbon).ceil)
  end

  def amount
    read_attribute(:amount).to_i
  end
  
end
