class CreateAddresses < ActiveRecord::Migration[6.0]
  def change
    create_table :addresses do |t|
      t.string :address
      t.string :city
      t.references :province, null: false, foreign_key: true

      t.timestamps
    end
  end
end
