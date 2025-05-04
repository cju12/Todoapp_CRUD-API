# Todoapp

Using Express.js, Mongoose mongoDB, EJS, CSS and Javascript, I made a simple webapp which allow users to set the goals, its priorities and deadlines, and display it on the webpage. 

Building a CRUD-api in express.js and node.js, allowing users to Create, Read, Update, Delete their goals.

27/04/2025 : 

The "/add" address will now function as the same as the "/patch" "/delete" addresses by using fetch api (it's no longer a html based. Like form action="".... method="").

Fixed the bug in "/patch" which was allowing the wrong date inputs like (123/02/20254 .... etc).

28/04/2025 :

Added isValidDate() function to check whether the deadline of the goals are valid (not like 31/02/2025 or 31/11/2025)

01/05/2025 : 

Designed the main page, and few changes are made in index ejs file for the design

02/05/2025 : 

Fixed (From **TODO** : delete todos are sometimes not working, bug fix is needed.). Designing the mainpage is completed. 

03/05/2025 : 

Designed the "/add" address, with a minor id values changes in add.ejs file 

==============================================================================================
==============================================================================================
==============================================================================================

Below is the todos for further development
** TODO **

topUI should be added in add.ejs file

Display the goals in an order from "high" priority to "low" (prolly, I can do that in mongodb?)

Show the time remaining till the deadline (If I can)


DESIGN THE WHOLE THING :(
