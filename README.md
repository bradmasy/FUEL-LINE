# [FuelLine](https://fuel-line.herokuapp.com/)

Our application can be used to help drivers save money on gas and make educated decisions on their use of transportation with “Fuel Line”


# Technologies Used

### Core Coding languages:
- markup language: HTML
- Style Language: CSS
- Backend Language: JavaScript 

### Core Coding languages used as:
- HTML: rendered from .ejs files from Node.js
- CSS: compiled using SCSS 
- JavaScript: JQuery library used

### Server Implementation:
- Node.js as runtime environment
- express js as application framework
- Hosted on Heroku by SalesForce

### Database Implementation:
- MongoDB implemented in NoSQL


# File Organization
```bash
C:.
|   .gitignore
|   package-lock.json
|   package.json
|   README.md
|   server.js
|   workspace.code-workspace
|   
+---.vscode
|       settings.json
|       
|           
+---public
|   +---audio
|   |       Scooby Doo.mp3
|   |       
|   +---fonts
|   |       IndieFlower-Regular.ttf
|   |       Jost-VariableFont_wght.ttf
|   |       Righteous-Regular.ttf
|   |       
|   +---images
|   |   |   backdrop-normal.png
|   |   |   car-icon-white.png
|   |   |   giphy (1).gif
|   |   |   giphy (2).gif
|   |   |   giphy (3).gif
|   |   |   giphy (3)2.gif
|   |   |   giphy (3)3.gif
|   |   |   giphy (4).gif
|   |   |   giphy (6).gif
|   |   |   logo-2-no-backdrop-lower.png
|   |   |   logo-lower-1-no-backdrop.png
|   |   |   logo-no-backdrop.png
|   |   |   Untitled design (6).png
|   |   |   Untitled design (7).png
|   |   |   Untitled design.png
|   |   |   user.png
|   |   |   
|   |   +---buttons
|   |   |       dropdown.png
|   |   |       favorites-button.png
|   |   |       gas-button-alt.png
|   |   |       gas-button.png
|   |   |       home-button.png
|   |   |       house-logo.png
|   |   |       logout.png
|   |   |       map.png
|   |   |       user-button.png
|   |   |       
|   |   \---logo
|   |           cropped-logo.png
|   |           dropletlogo.png
|   |           fuellinelogo.png
|   |           hdlogo1.png
|   |           logo-1-lower-backdrop.png
|   |           
|   +---photos
|   +---scripts
|   |   |   admin_users_view.js
|   |   |   basicmap.js
|   |   |   car-choice.js
|   |   |   dashboard.js
|   |   |   error_notif.js
|   |   |   index.js
|   |   |   initMap.js
|   |   |   jquery-3.6.0.min.js
|   |   |   login.js
|   |   |   logout.js
|   |   |   nav_indicator.js
|   |   |   privacy.js
|   |   |   profile.js
|   |   |   signup.js
|   |   |   statistics.js
|   |   |   success.js
|   |   |   userModel.js
|   |   |   validations.js
|   |   |   variables.js
|   |   |   
|   |   \---handlers
|   |           footer-buttons.js
|   |           
|   \---styles
|           main.css
|           
+---routes
|       index-routes.js
|       login-routes.js
|       signup-routes.js
|       
+---styles
|   |   main.scss
|   |   
|   \---sass
|       +---colors
|       |       colors.scss
|       |       
|       +---components
|       |       buttons.scss
|       |       page-setup.scss
|       |       
|       +---mixins
|       |       mixin.scss
|       |       
|       +---pages
|       |       admin_user_views.scss
|       |       car-choice.scss
|       |       dashboard.scss
|       |       index.scss
|       |       login.scss
|       |       map.scss
|       |       popup.scss
|       |       privacy.scss
|       |       profile.scss
|       |       signup.scss
|       |       statistics.scss
|       |       user_input.scss
|       |       
|       \---typography
|               fonts.scss
|               
+---uploads
|       
\---views
        404.ejs
        admin_user_views.ejs
        car-choice.ejs
        contact.ejs
        dashboard.ejs
        index.ejs
        login.ejs
        logout.ejs
        map-copy-styles.ejs
        privacy.ejs
        profile.ejs
        signup.ejs
        statistics.ejs
        success.ejs
        user_input.ejs
```

## Installation

### IDE:
- we recommend using [Visual Studio Code](https://code.visualstudio.com/) to develop with our application
### Languages:
- [Javascript](https://www.javascript.com/) for our main backend language
- [JQuery](https://jquery.com/) for our core JavaScript Library
- [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass) extension for Visual Studio code
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) for hosting web application


### Required Frameworks (in order):
```bash
npm install
npm init
npm install express
npm install mongoose
npm install cors
```

### API key provided to access mongoDB server and Google Maps API

### [Testing Documentation](https://docs.google.com/spreadsheets/d/1u1xZyjaZBaWo4F4zx8hTgFSpGwj84Kp8d9aSc5NrYUw/edit?usp=sharing)
## Usage

1. Sign-up for an account
2. login
3. Add vehicle Information
4. Use map to find route to your destination
5. Calculate costs of route
6. Save trip to profile
7. View analytics on home page

## Credits, References and Licenses
- Map functionality powered by Google
- Database hosted by MongoDB
- Fuel Economy API provided by US EPA
## Contact Information
devs:
- colafson1@my.bcit.ca
- ymo3@my.bcit.ca
- ejohnston33@my.bcit.ca
- bmasciotra@my.bcit.ca

