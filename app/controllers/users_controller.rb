class UsersController < ApplicationController
  skip_before_filter :authorize
   respond_to :json

          def index
            respond_with(@users = User.all)
          end

          def show
            respond_with(@users = User.find(params[:id]))
          end

          def create
            respond_with(@users = User.create(:name => params[:name], 
            :email => params[:email]))
          end

          def update
            @users = User.find(params[:id])
            @users.name = params[:name]
            @users.email = params[:email]
            @users.save
            respond_with(@users)
          end

          def destroy
            @users = User.find(params[:id])
            @users.destroy
            render(:nothing => User, :status => :ok)
          end
        end