# README


# TOPZ
Welcome !

This is a web app created in using Ruby on Rails as backend and Javascript, HTML and CSS as frontend.

# Overview
This is a one page app that shows a list with a user-created tops, about any topic.
Any user can create, add new option and vote in any top.
After a user votes in one top can also remove the vote and the top will reload at the top of the page.

# Installation
Clone this repository

In your terminal, run 'bundle install' to install all required gems.
In your terminal, type 'rake db:seed' to fill up the database with 3 tops.
# How to run the program
In your terminal, type 'rails s' to start the server.
In your browser, visit: http://localhost:3000/index.html to visit the homepage.
Files information
'/backend/db/migrate' has all the migrations files
'/backend/config' has the setup environment
'/backend/app' has the ruby api app
'/backend/app/controllers' has the controllers files
'/backend/app/models' has the ruby models
'/backend/app/views' has the .erb files to be rendered
'/backendGemfile' has all the required gems to run this project

'/frontend' has the index and the css file
'/frontend/src' has all the javascript files

# Usage
In your terminal, type 'rake db:seed' to fill up the database with 3 tops. In your terminal, type 'rails s' to start the server. In your browser, visit: http://localhost:3000/index.html to visit the homepage.


Visit the index file and checkout the tops that are already created. Choose any top and vote for any option to see a ranking of all the options expressed in percentage.
Remove the vote or choose another top to add an option. Delete option button will be available as long as the option has 0 votes.
You can now vote the option you added or you can delete it.

# Development
After checking out the repo, run bundle install to install dependencies.

Contributing
Bug reports and pull requests are welcome on GitHub at https://github.com/antonzaharia/topz. This project is intended to be a safe, welcoming space for collaboration.

# License
The gem is available as open source under the terms of the MIT License.

# Code of Conduct
Everyone interacting in the TOPZ project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the code of conduct.
