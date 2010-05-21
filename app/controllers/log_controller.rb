class LogController < ApplicationController
  def save
    log = Log.new
    log.content = "Test"
    log.save
  end
end
