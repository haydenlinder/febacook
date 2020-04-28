class Post < ApplicationRecord
    validates :author_id, :recipient_id, presence: true

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    belongs_to :recipient,
        foreign_key: :recipient_id,
        class_name: :User 

    has_many :likes
    
    has_many :likers,
        through: :likes,
        source: :liker

    has_many_attached :photos

    has_many :comments

    validate do 
        if self.photos.length < 1 && self.body.length < 1
            self.errors.add(:body, "Post must have a body or photo attachment.")
        end
    end

end
