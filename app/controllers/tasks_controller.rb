class TasksController < ApplicationController
  respond_to :json

  def create
    @task = Task.new(description: params["description"])
    if @task.save
      respond_with @task
    end
  end

  def update
    @task = Task.find_by_id(params[:id])
    @task.completed = true
    @task.save
    render nothing: true
  end

  def destroy
    @task = Task.find_by_id(params[:id])
    @task.destroy
    render nothing: true
  end
end
