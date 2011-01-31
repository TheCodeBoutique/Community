class CreateTcbs < ActiveRecord::Migration
  def self.up
    create_table :tcbs do |t|
      t.string :name
      t.string :hashed_password
      t.string :salt

      t.timestamps
    end
  end

  def self.down
    drop_table :tcbs
  end
end
