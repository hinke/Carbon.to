class LogController < ApplicationController
  def save
    log = Log.new
    log.content = params[:message]
    log.save
    render :nothing => true 
  end
end
