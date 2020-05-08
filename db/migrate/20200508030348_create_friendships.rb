class CreateFriendships < ActiveRecord::Migration[5.2]
  def change
    create_table :friendships do |t|
      t.integer :author_id, null: false
      t.integer :recipient_id, null: false
      t.boolean :accepted

      t.timestamps
    end
    add_index :friendships, [:author_id, :recipient_id], unique: true
  end
end
