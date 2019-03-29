# Pet Food Server

### https://pet-food-shopper.cyroc.now.sh/

![Application Main Page Screenshot](https://i.imgur.com/nS89PmU.png)

## Summary

Pet food shopping is hard, the process of searching for foods that
have the right ingredients and none of the wrong ones takes long
enough. Calculating how many dollars per calorie per day your pet
consumes can vary wildly from one diet to the next, and is critical
in budgeting how many dollars go towards Coco and Felix.

Pet Food Shopper is here to simplify this process, removing the need
for a spreadsheet to effectively price shop pet diets. In addition,
you won't need a pet nutritionist to know what that pet food label
is really telling you.

### API Endpoints

All endpoints have serverURL/api/ as root address

Auth Router:

- POST /auth/login: Authenticates username/password.
- POST /auth/refresh: Given authorized user credentials, sends a new JWT.

Food Router:

- GET /foods: Returns 'foods' table from database.

Ingredients Router:

- GET /ingredients: Returns 'ingredients' table from database.

Ratings Router:

- GET /ratings: Returns list of sum of all ratings on a per food basis.
- GET /ratings/users?userid=:userid: Returns a list of foods rated by given user.
- POST /ratings/foods/:foodid: Adds new rating to database storing rating userid, rated foodid, and time of rating. Returns the new rating information.

Users Router:

- POST /users: Adds a new user to database given valid new user registration entry.

### Technologies

Clientside:
React, HTML, CSS

Serverside:
Node, PostgreSQL
