class CreateCachedPlaygrounds < ActiveRecord::Migration[5.2]
  def change
    create_table :cached_playgrounds do |t|
      t.references :user, foreign_key: true
      t.string :location
      t.string :business_type
      t.integer :rating
      t.boolean :bathroom
      t.text :description
      t.string :img_url

      t.timestamps
    end
  end
end
