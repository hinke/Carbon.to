class ConversionController < ApplicationController
  
  def index
    all = Conversion.all
    
    all.map {|c| c.amount = co2}
    
    respond_to do |format|
      format.xml {render :xml => all.to_xml(:skip_types => true)  }
      format.json {render :json => all.to_json  }
    end
    
  end
  
  def show
    
    c = Conversion.find_by_slug(params[:id])
    
    c.amount = co2
    
    respond_to do |format|
      format.xml {render :xml => c.to_xml(:skip_types => true)  }
      format.json {render :json => c.to_json  }
    end
    
  end

  private
  
  def co2
    if !params[:co2].nil?
      co2 = params[:co2].to_i
      if co2 < 1 then co2 = 1 end
    else
      co2 = 1
    end
    return co2
  end
  
end
