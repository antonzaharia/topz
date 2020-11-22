# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Option.delete_all
Top.delete_all

   top1 = Top.create(title: "Top Horror Movies")
   top2 = Top.create(title: "Top Comedy Movies")
   top3 = Top.create(title: "Best electric cars 2020")


options_for_horror = [
    {content: "Halloween"},
    {content: "A Girl Walks Home Alone at Night"},
    {content: "Frankenstein"},
    {content: "A Quiet Place"},
    {content: "The Grudge"}
]
options_for_horror.each do |o|
    top1.options.create(o)
end

options_for_comedy = [
    {content: "Lady Bird"},
    {content: "Toy Story 4"},
    {content: "Modern Times"},
    {content: "The Farewell"}
]
options_for_comedy.each do |o|
    top2.options.create(o)
end

options_for_cars = [
    {content: "Tesla"},
    {content: "Audi e-tron"},
    {content: "Kia e-niro"},
    {content: "Nissan Leaf"},
    {content: "Jaguar I-Pace"}
]
options_for_cars.each do |o|
    top3.options.create(o)
end