class User < ApplicationRecord
    attr_reader :password

    has_many :authored_posts,
        foreign_key: :author_id,
        class_name: :Post 

    has_many :received_posts,
        foreign_key: :recipient_id,
        class_name: :Post

    has_many :received_posts_comments,
        through: :received_posts,
        source: :comments 
    
    has_many :authored_posts_comments,
        through: :authored_posts,
        source: :comments 
        
    has_many :posters,
        through: :received_posts,
        source: :author 

    has_many :received_posts_commenters,
        through: :received_posts_comments,
        source: :user 
    
    has_many :authored_posts_commenters,
        through: :authored_posts_comments,
        source: :user 
    
    has_many :likes,
        foreign_key: :liker_id,
        class_name: :Like

    has_many :authored_friend_requests,
        foreign_key: :author_id,
        class_name: :Friendship
        
    has_many :received_friend_requests,
        foreign_key: :recipient_id,
        class_name: :Friendship

    has_many :potential_received_friends,
        through: :received_friend_requests,
        source: :author 

    has_many :potential_authored_friends,
        through: :authored_friend_requests,
        source: :recipient

    has_many :accepted_authored_friend_requests, -> { where(accepted: true) },
        foreign_key: :author_id,
        class_name: :Friendship

    has_many :accepted_received_friend_requests, -> { where(accepted: true) },
        foreign_key: :recipient_id,
        class_name: :Friendship

    has_many :received_friends,
        through: :accepted_received_friend_requests,
        source: :author

    has_many :authored_friends,
        through: :accepted_authored_friend_requests,
        source: :author 

    has_many :comments

    has_one_attached :profile_photo
    has_one_attached :cover_photo

    before_validation :ensure_session_token

    validates(
        :username, :session_token, 
        presence: true, uniqueness: true
    )
    validates(
        :email, 
        presence: true, uniqueness: true,
        format: { with: URI::MailTo::EMAIL_REGEXP }
    )
    validates(
        :first_name, :last_name, :birthday, 
        :gender, :pronouns, :password_digest,
        presence: true
    )
    validates( 
        :password, 
        length: { minimum: 6, allow_nil: true }
    )

    validate do
        if self.birthday && self.birthday > Date.today
            self.errors.add(:birthday, "can't be in the future")
        end
    end

    def self.find_by_credentials(email, password)
        @user = User.find_by(email: email)
        @user && @user.is_password?(password) ? @user : nil 
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def reset_session_token!
        self.update!(session_token: SecureRandom.urlsafe_base64(16))
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64(16)
    end
end
