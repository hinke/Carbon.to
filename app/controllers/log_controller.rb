class LogController < ApplicationController
  def save
    log = Log.new
    log.content = params[:message]
    log.session = session[:session_id].to_s
    log.save
    render :nothing => true 
  end
end
