class Friendship < ApplicationRecord
    validates :author_id, :recipient_id, presence: true

    belongs_to :author,
        foreign_key: :author_handle,
        class_name: :User

    belongs_to :recipient,
        foreign_key: :recipient_handle,
        class_name: :User
end