# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


user1 = User.create({
    username: "lisasimpson", first_name: "Lisa", last_name: "Simpson", 
    birthday: "9/5/1981", gender: "female", pronouns: "she/her/hers", 
    email: "lisa@email.com", password: "password"
})

user2 = User.create({
    username: "michaelscott", first_name: "Michael" , last_name: "Scott", 
    birthday: "16/3/1964", gender: "male", pronouns: "he/him/his", 
    email: "mscott@dundermifflin.com", password: "password"
})

user3 = User.create({
    username: "successkid", first_name: "Success", last_name: "Kid", 
    birthday: "23/9/2006", gender: "male", pronouns: "he/him/his", 
    email: "kid@email.com", password: "password"
})

user4 = User.create({
    username: "grumpycat", first_name: "Grumpy", last_name: "Cat", 
    birthday: "4/4/2012", gender: "female", pronouns: "she/her/hers", 
    email: "grumpycat@email.com", password: "password"
})



