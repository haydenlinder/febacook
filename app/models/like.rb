class Like < ApplicationRecord
    validates :liker_id, :post_id, presence: true

    belongs_to :liker,
        foreign_key: :liker_id,
        class_name: :User

    belongs_to :post

    has_many_attached :photos

end