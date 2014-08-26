class HomeController < ApplicationController
  def show
    @tasks = Task.all
  end
end
