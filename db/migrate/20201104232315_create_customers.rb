class CreateCustomers < ActiveRecord::Migration[6.0]
  def change
    create_table :customers do |t|
      t.string :first_name
      t.string :last_name
      t.integer :phone
      t.string :email
      t.string :password

      t.timestamps
    end
  end
end
