class CreateBathrooms < ActiveRecord::Migration[5.2]
  def change
    enable_extension "hstore"
    create_table :bathrooms do |t|
      t.string :name
      t.references :user, foreign_key: true
      t.string :address
      t.string :business_type
      t.integer :rating
      t.string :changing_table
      t.text :description
      t.string :object_type, default: "bathroom"
      t.json :photos, array: true, default: []
      t.hstore :coordinates, array: true, default: []
      t.timestamps
    end
  end
end
