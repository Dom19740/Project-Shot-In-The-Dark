# Project-Shot-In-The-Dark - CS50X Final Project

### A web-based application version of a fun trivia card game.

### Working project can be played here https://shotinthedark.dpbcreative.com/

### Video Demo:  <https://youtu.be/B1sqG7cLW34>
### Description:
This project takes an existing trivia card game, Shot in the Dark, and puts the entire experience into a web app, and enhances it by being able to select the number of players and the number of points needed to declare a winner. You then play by giving your best guesses to answer the questions. First player to get the the winning number of points is the winner.

The card game has a pack of cards, each with 5 questions on the back and the corresponding answers on the front, and then you can play with as many people and for as long as you like. It is a fun game to play when you are sat around with friends, and the idea to make an app version came about because sometimes we wanted to play but didn't have the cards, so it would be great to have a version online that was always accessible.

First off I wrote out some sample questions and built the basic functionality using python, and got something that I was happy with working in the terminal. I used this to refine the terms of how the app would work, in terms of loading the questions and answers and choosing them randomly. Then adding the asked questions into a list so they are not repeated. I worked out how to create the players and keep track of their scores, and then how to finish the game once the target score had been reached. ONce run, the program asks for the player names, and the winning score, then prints a random question, then after a prompt it shows the answer and the scoreboard, you can then pick a player number to get the point or select 0 if no one gets the point.  It continues asking questions until someone reaches the target score.

Once I was happy with this, I designed a basic html page and started to rebuild the functionality using JavaScript.

I think the app improves upon the card game because you can set a limit on how many points a player needs to win, and then it keeps track of the points and declares the winner once they have the correct number of points.

The html version differed from the terminal version in several ways, but primarily with populating the score field and updating it in accordance with who got the question right. Obviously there was  a lot of work to do with CSS as well, I liked the black and white design of the cards so kept that and the general font type from the card game.

With the javascript I learnt quite a lot from some other courses that I did while taking a break from cs50 (freecodecamp to name one) and learnt about using javascript to show and hide containers which was useful for this project.

Once I had the basic functionality working, I tried to build a pipeline to get all of the questions and answers from the cards into the game. I did this by scanning the cards front and back into an image to text application, and then used a python script to format the text and strip out spaces and things like that, and ultimately populate a csv file with the questions and answers. This should probably be a json but I can add this to a list of improvements I will make to the game in time.

The script.js contains the functions to setup the game, select the options, load the questions, sumbit the players, populate the player list radio buttons, show a random question, show the associated answer the that question, add a point to the selected player and or show the next question, check if any player has reached the winning number of points, listen for the play again button, and ultimately to quit the game. And also to set up the button actions.

The html bascially shows all of the game containers which are shown or hidden according to the javascript.

In order to further develop the application, I would like to find a source of obscure trivia questions that could be used to populate each game with a random set of questions so no 2 games are the same. I would also implement a user system so that people can login and save their game states. I don't think there will be a system to play online though, I like the idea that it is a game you play in a room with people.

### Details
* Name: Dominic Buzugbe
* GitHub and edX username: Dom19740
* City: Lisbon
* Country: Portugal
* Date: 23/05/2024

### Purpose

This repository is designed to demonstrate my skills in development.  
It is not intended for public use, redistribution, or commercial applications.

### License

This project is licensed under the **Non-Commercial Use License**.  
**You may view, use, and modify this code for personal or educational purposes only.**  
Commercial use, redistribution, or publication of this work in any form is strictly prohibited without explicit permission from the author.

If you're interested in using this project commercially, please contact me at dom@dpbcreative.com
