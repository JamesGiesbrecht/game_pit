class CreateOrderStatuses < ActiveRecord::Migration[6.0]
  def change
    create_table :order_statuses do |t|
      t.string :name

      t.timestamps
    end
  end
end
