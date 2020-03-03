# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


user1 = User.create({
    username: "user1", first_name: "user", last_name: "one", 
    birthday: "9/13/1993", gender: "male", pronouns: "he/him/his", 
    email: "email", password: "password"
})

