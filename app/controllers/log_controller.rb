class LogController < ApplicationController
  def save
    log = Log.new
    log.content = params[:message]
    log.session = session[:session_id].to_s
    log.save
    render :nothing => true 
  end
  def show
    
    # Cache for 12 hours
    response.headers['Cache-Control'] = 'public, max-age=43200'
    
    # Fetch all
    log = Log.all(:order => "session")
    
    @total = 0
    @light_bulb = 0
    @tea = 0
    @laptop = 0
    @mobile = 0
    @fridge = 0
    @television = 0
    @heating = 0
    @co2 = 0
    @apples = 0
    @bananas = 0
    @carrots = 0
    @tomatoes = 0
    @milk = 0
    @beef = 0
    @salmon = 0
    @rice = 0
    @shrimps = 0
    @bread = 0
    @beer = 0
    @flight = 0
    @flight_distance = 0
    @train = 0
    @underground = 0
    @car = 0

    
    session = log.first.session
    interaction = 0
    @total_users = 1
    
    # Iterate all the logs
    log.each do |l|
      @total += 1
      if session == l.session
        interaction += 1
      c = l.content.to_s.split(" in ")
    case c[0]
      when "co2" then @co2 += 1
      when "milk" then @milk += 1
      when "lightbulb" then @light_bulb += 1
      when "cups-of-tea" then  @tea += 1
      when "laptop" then @laptop += 1
      when "mobile-charges" then  @mobile  += 1
      when "fridge" then @fridge  += 1
      when "tv" then  @television  += 1
      when "heating" then  @heating  += 1
      when "apples" then   @apples  += 1
      when "bananas" then  @bananas  += 1
      when "carrots" then @carrots  += 1
      when "tomatoes" then  @tomatoes  += 1
      when "beef" then  @beef  += 1
      when "salmon" then  @salmon  += 1
      when "rice" then @rice  += 1
      when "shrimps" then @shrimps  += 1
      when "bread" then @bread += 1
      when "beers" then  @beer  += 1
      when "flight" then  @flight += 1
      when "flight-distance" then @flight_distance  += 1
      when "train" then @train  += 1
      when "underground" then @underground  += 1
      when "car" then @car  += 1
    end
    case c[1]
      when "co2" then @co2 += 1
      when "milk" then @milk += 1
      when "lightbulb" then @light_bulb += 1
      when "cups-of-tea" then  @tea += 1
      when "laptop" then @laptop += 1
      when "mobile-charges" then  @mobile  += 1
      when "fridge" then @fridge  += 1
      when "tv" then  @television  += 1
      when "heating" then  @heating  += 1
      when "apples" then   @apples  += 1
      when "bananas" then  @bananas  += 1
      when "carrots" then @carrots  += 1
      when "tomatoes" then  @tomatoes  += 1
      when "beef" then  @beef  += 1
      when "salmon" then  @salmon  += 1
      when "rice" then @rice  += 1
      when "shrimps" then @shrimps  += 1
      when "bread" then @bread += 1
      when "beers" then  @beer  += 1
      when "flight" then  @flight += 1
      when "flight-distance" then @flight_distance  += 1
      when "train" then @train  += 1
      when "underground" then @underground  += 1
      when "car" then @car  += 1
    end
    else
      @total_users  += 1
      session = l.session
    end
    #end each
    end
    
    # CREATE PIE GRAPHIC
     @grafico="http://chart.apis.google.com/chart?cht=bhs&amp;chs=400x680&amp;chf=bg,s,F5F5F5&amp;chd=t:"+
     @co2.to_s+","+@milk.to_s+","+@tomatoes.to_s+","+@apples.to_s+","+@shrimps.to_s+","+@salmon.to_s+","+@beef.to_s+","+
     @carrots.to_s+","+@rice.to_s+","+@bread.to_s+","+@beer.to_s+","+@bananas.to_s+","+@television.to_s+","+
     @heating.to_s+","+@tea.to_s+","+@mobile.to_s+","+@light_bulb.to_s+","+@fridge.to_s+","+@laptop.to_s+","+@car.to_s+
     ","+@underground.to_s+","+@train.to_s+","+@flight.to_s+","+@flight_distance.to_s+
     "&amp;chds=0,"+(@co2+400).to_s+"&amp;chm=N,000000,0,-1,11"+
     "&amp;chxt=y&amp;chxl=0:|flightkm|flight|train|underground|car|laptop|fridge|lightbulb|mobile|heating|tea|tv|bananas|beers|bread|rice|carrots|beef|salmon|shrimps|apples|tomatoes|milk|co2"
  #end show
  end
end
