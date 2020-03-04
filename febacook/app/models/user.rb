class User < ApplicationRecord
    attr_reader :password

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
