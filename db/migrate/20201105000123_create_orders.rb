class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.datetime :order_date
      t.references :address, null: false, foreign_key: true
      t.decimal :gst
      t.decimal :pst
      t.references :order_status, null: false, foreign_key: true

      t.timestamps
    end
  end
end
