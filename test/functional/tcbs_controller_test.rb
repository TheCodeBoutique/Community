require 'test_helper'

class TcbsControllerTest < ActionController::TestCase
  setup do
    @tcb = tcbs(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:tcbs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create tcb" do
    assert_difference('Tcb.count') do
      post :create, :tcb => @tcb.attributes
    end

    assert_redirected_to tcb_path(assigns(:tcb))
  end

  test "should show tcb" do
    get :show, :id => @tcb.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @tcb.to_param
    assert_response :success
  end

  test "should update tcb" do
    put :update, :id => @tcb.to_param, :tcb => @tcb.attributes
    assert_redirected_to tcb_path(assigns(:tcb))
  end

  test "should destroy tcb" do
    assert_difference('Tcb.count', -1) do
      delete :destroy, :id => @tcb.to_param
    end

    assert_redirected_to tcbs_path
  end
end
