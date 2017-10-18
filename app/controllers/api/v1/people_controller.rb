class Api::V1::PeopleController < ApplicationController
  def index
    @people = Person.all
    render "index.json.jbuilder"
  end

  def show
    @person = Person.find(params[:id])
    render 'show.json.jbuilder'
  end

  def create
    @person = Person.create(
      name: params[:name],
      bio: params[:bio]
    )
    render 'show.json.jbuilder'
  end
end
