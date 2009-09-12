class WelcomeController < ApplicationController

  def index
    @all = Conversion.all
    @co2 = @all.select {|c| c.slug == "co2"}[0]
    @random = @all.rand
  end

  def about
  end

  def api
  end
  
end
