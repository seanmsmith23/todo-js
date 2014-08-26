class TasksController < ApplicationController
  respond_to :json

  def create
    @task = Task.new(description: params["description"])
    if @task.save
      respond_with @task
    end
  end

  def update

  end

  def destroy

  end
end
