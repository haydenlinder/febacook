class ChangeFriendshipsForeignKeys < ActiveRecord::Migration[5.2]
  def change
    change_table :friendships do |t|
      t.remove :author_id, :recipient_id
      t.string :author_handle, null: false
      t.string :recipient_handle, null: false
    end
    add_index :friendships, [:author_handle, :recipient_handle], unique: true
  end
end
