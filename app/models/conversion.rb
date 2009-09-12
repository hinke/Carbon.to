class Conversion < ActiveRecord::Base
  belongs_to :category
  attr_accessor :amount
  
  def amount=(co2)
    write_attribute(:amount, (co2/self.carbon).ceil)
  end

  def amount
    read_attribute(:amount).to_i
  end
  
  def style(n)
    color = self.category.color
    r = color[0..1].to_i(16)
    g = color[2..3].to_i(16)
    b = color[4..5].to_i(16)
    
    
    if(self.category.name == "housing")
      r = r - (10*n)
    elsif(self.category.name == "food")
      g = g - (10*n)
    else
      b = b - (10*n)
    end
    
    "background: #" + r.to_s(16) + g.to_s(16) + b.to_s(16) +";"
  end
  
  private
  

end
