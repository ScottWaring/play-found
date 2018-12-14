class CreateBathrooms < ActiveRecord::Migration[5.2]
  def change
    create_table :bathrooms do |t|
      t.string :title
      t.references :user, foreign_key: true
      t.string :location
      t.string :business_type
      t.integer :rating
      t.boolean :changing_table
      t.text :description

      t.timestamps
    end
  end
end
