class CreateCachedPlaygrounds < ActiveRecord::Migration[5.2]
  def change
    create_table :cached_playgrounds do |t|
      t.references :user, foreign_key: true
      t.string :address
      t.string :name
      t.string :business_type
      t.integer :rating
      t.string :bathroom
      t.text :description
      t.string :img_url
      t.string :object_type, default: "playground"
      t.json :photos, array: true, default: []
      t.json :coordinates, array: true, default: []
      t.timestamps
    end
  end
end
