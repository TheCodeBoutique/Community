class SessionsController < ApplicationController
  skip_before_filter :authorize
  def new
  end

  def create
    if tcb = Tcb.authenticate(params[:name], params[:password])
      session[:tcb_id] = tcb.id
      redirect_to adminiphone_url
    else
      redirect_to login_url, :alert => "Invalid user/password combination"
    end
  end

  def destroy
    session[:tcb_id] = nil
    redirect_to login_url, :notice => "Logged out"
  end

end