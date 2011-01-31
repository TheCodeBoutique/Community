class User < ActiveRecord::Base
  validates :name, :presence => true, :uniqueness => true
  
  validates :email, :presence => true, :uniqueness => true, :format => {:with => /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i}
  
end
