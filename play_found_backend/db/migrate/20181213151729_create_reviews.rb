class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.string :title
      t.references :user, foreign_key: true
      t.text :review
      t.integer :rating
      t.references :cached_playground, foreign_key: true
      t.string :yelp_playground

      t.timestamps
    end
  end
end
