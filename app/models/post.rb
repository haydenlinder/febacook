class Post < ApplicationRecord
    validates :author_id, :recipient_id, presence: true

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    belongs_to :recipient,
        foreign_key: :recipient_id,
        class_name: :User 

    has_many_attached :photos


    vaidate do 
        if self.photos.length < 1 && !self.body
            self.errors.add(body: "This post is blank. Please add a body or photo.")
        end
    end
end
