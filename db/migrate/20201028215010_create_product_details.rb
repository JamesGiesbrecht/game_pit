class CreateProductDetails < ActiveRecord::Migration[6.0]
  def change
    create_table :product_details do |t|
      t.references :product, null: false, foreign_key: true
      t.references :detail, null: false, foreign_key: true
      t.string :value

      t.timestamps
    end
  end
end
