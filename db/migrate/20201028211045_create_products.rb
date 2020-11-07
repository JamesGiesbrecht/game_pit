class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :name
      t.text :description
      t.references :category, null: false, foreign_key: true
      t.decimal :price, precision: 8, scale: 2
      t.integer :stock_quantity
      t.decimal :discount

      t.timestamps
    end
  end
end
