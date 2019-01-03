class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.string :title
      t.references :user, foreign_key: true
      t.text :description
      t.integer :rating
      t.string :playground_id
      t.string :playground_name
      t.string :object_type, default: "review"
      t.timestamps
    end
  end
end
