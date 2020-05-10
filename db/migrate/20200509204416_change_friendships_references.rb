class ChangeFriendshipsReferences < ActiveRecord::Migration[5.2]
  def change
    change_table :friendships do |t|
      t.integer :author_id
      t.integer :recipient_id
    end
    add_index :friendships, [:author_id, :recipient_id], unique: true
  end
end
