class TcbsController < ApplicationController
  skip_before_filter :authorize
  #before_filter :authorize
  # GET /tcbs
  # GET /tcbs.json
  def index
    @tcbs = Tcb.order(:name)

    respond_to do |format|
      format.html # index.html.erb
      format.json  { render :json => @tcbs }
    end
  end

  # GET /tcbs/1
  # GET /tcbs/1.json
  def show
    @tcb = Tcb.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json  { render :json => @tcb }
    end
  end

  # GET /tcbs/new
  # GET /tcbs/new.json
  def new
    @tcb = Tcb.new

    respond_to do |format|
      format.html # new.html.erb
      format.json  { render :json => @tcb }
    end
  end

  # GET /tcbs/1/edit
  def edit
    @tcb = Tcb.find(params[:id])
  end

  # POST /tcbs
  # POST /tcbs.json
  def create
    @tcb = Tcb.new(params[:tcb])

    respond_to do |format|
      if @tcb.save
        format.html { redirect_to(tcbs_url,
          :notice => "Tcb #{@tcb.name} was successfully created.") }
        format.json  { render :json => @tcb,
          :status => :created, :location => @tcb }
      else
        format.html { render :action => "new" }
        format.json  { render :json => @tcb.errors,
          :status => :unprocessable_entity }
      end
    end
  end

  # PUT /tcbs/1
  # PUT /tcbs/1.json
  def update
    @tcb = Tcb.find(params[:id])

    respond_to do |format|
      if @tcb.update_attributes(params[:tcb])
        format.html { redirect_to(tcbs_url,
          :notice => "Tcb #{@tcb.name} was successfully updated.") }
        format.json  { head :ok }
      else
        format.html { render :action => "edit" }
        format.json  { render :json => @tcb.errors,
          :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /tcbs/1
  # DELETE /tcbs/1.json
  def destroy
    @tcb = Tcb.find(params[:id])
    @tcb.destroy

    respond_to do |format|
      format.html { redirect_to(tcbs_url) }
      format.json  { head :ok }
    end
  end
end
