class CreateProvinces < ActiveRecord::Migration[6.0]
  def change
    create_table :provinces do |t|
      t.string :name
      t.decimal :gst
      t.decimal :pst
      t.references :tax_type, foreign_key: true

      t.timestamps
    end
  end
end
