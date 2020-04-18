class Post < ApplicationRecord
    validates :author_id, :recipient_id, presence: true

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    belongs_to :recipient,
        foreign_key: :recipient_id,
        class_name: :User 

    has_many_attached :photos
    # has_many :photos
    # accepts_nested_attributes_for :photos

    validate do 
        if self.photos.length < 1 && self.body.length < 1
            self.errors.add(:body, "Post must have a body or photo attachment.")
        end
    end

end
