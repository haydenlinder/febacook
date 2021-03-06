class Friendship < ApplicationRecord
    validates :author_handle, :recipient_handle, presence: true

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    belongs_to :recipient,
        foreign_key: :recipient_id,
        class_name: :User
end