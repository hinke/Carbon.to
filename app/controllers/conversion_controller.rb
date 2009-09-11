class ConversionController < ApplicationController
  
  def show
    c = Conversion.find_by_slug(params[:id])
    
    respond_to do |format|
      format.xml {render :xml => c.to_xml  }
      format.json {render :json => c.to_json  }
    end
    
  end
  
end
