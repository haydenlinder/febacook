class User < ApplicationRecord
    attr_reader :password

    before_validation :ensure_session_token

    validates(
        :username, :session_token, 
        presence: true, uniqueness: true
    )
    validates(
        :email, 
        format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true
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

    def self.find_by_credentials(username, password)
        @user = User.find_by(username: username)
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
        self.session_token ||= self.reset_session_token!
    end
end
