# Oriflamme

This is the solo project I wrote whilst on the intensive and brilliant Codeworks Software Engineering Immersive program. I really enjoy modern boardgames and wanted to learn about WebSockets so a game was the obvious choice.

The game in question is Oriflamme by Studio H Games (short video overview [here](https://youtu.be/RWJh259QSEc?t=36)).

Players find themselves in the middle of a medieval feud over the French royal crown. The King is dead - long live the King! As heads of influential families, the players strive to come to power with cunning, malice, strength, virtue and infamy. The player with the most Influence after 6 rounds wins the game, and the throne!


# Back end (`/server` directory)

To successfully run the server in development mode:

* Open a terminal
* Navigate to the main project folder ( it should be named **oriflamme** and contain 2 directories named **client**, **server** and **resources** along with this file, named **README.md** )

* Ensure you are synchronized and have the latest merged changes by executing following commands :

```
git checkout master
git pull
```

* Open the **server** folder and install all required application modules and dependencies:

```
cd server
npm install
```

*   The server requires a `.env` ("dotenv") file to run. It may be **hidden** or **missing**. If not present, you can create one

*   Once complete, run the server (runs on port 7777) with

```
npm start
```


To stop the server, focus the terminal window running the server process and press CTRL+C.


## Creating a `.env` file

The `.env` file contains constants for the Express server that runs the Oriflamme game.
It is expected to reside inside the root folder of the back-end, for example:

```
./oriflamme/server/
```

If missing, then create a file and enter the following definitions, then save it.

```
PORT=7777
DB_URL=mongodb://localhost:27017
DB_NAME=oriflamme
```

# Front end

To run the front end:

* Open a new terminal, leaving the fro

* Open the **client** folder and install all required application modules and dependencies (this may take some time):

```
cd client
npm install
```
* Once complete, run the React development server with

```
npm start
```
* Open a couple of different browsers and point them to http://localhost:3000. You can also run one or more browsers in incognito mode to try the game with 2+ players.


 # Tech Stack
 
 * React
 * NodeJS / Express server with Socket.io
 * MongoDB with Mongoose ORM



