class CreateSearches < ActiveRecord::Migration[5.2]
  def change
    create_table :searches do |t|
      t.string :lat
      t.string :long
      t.string :location
      t.boolean :bathroom
      t.boolean :playground
      t.timestamps
    end
  end
end
