class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username
      t.string :first_name
      t.string :last_name
      t.boolean :admin
      t.string :password_digest
      t.string :email

      t.timestamps
    end
  end
end
