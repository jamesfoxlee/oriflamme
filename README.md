# oriflamme

This is the solo project I wrote over 7 days whilst on the intensive and brilliant Codeworks Software Engineering Immersive program. I really enjoy modern boardgames and wanted to learn about WebSockets so a game was the obvious choice. The game in question is Oriflamme by Studio H Games.

Players find themselves in the middle of a medieval feud over the French royal crown. The King is dead - long live the King! As heads of influential families, the players strive to come to power using cunning, malice, strength, virtue and infamy. The player with the most Influence after 6 rounds wins the throne, and the game!

You can see a presentation of the project [here](https://www.youtube.com/watch?v=5L3fkxHlPSs). Rules can be found in the `resources` folder.

![oriflamme-screenshot](https://user-images.githubusercontent.com/4533473/145608318-a98b576f-397b-47bc-94e0-8bce39559621.png)

The app is built using:

- React
- Styling in CSS3, using plenty of flexbox
- NodeJS / Express server with Socket.io
- MongoDB with Mongoose ORM

# Back end (`/server` directory)

To successfully run the server in development mode you will need to install

* [NodeJS](https://nodejs.org/en/) and the `npm` package manager
* MongoDB - use the [Community Server](https://www.mongodb.com/try/download/community)

1. Open a terminal
2. Navigate to the main project folder (it should be named **oriflamme** and contain 2 directories named **client**, **server** and **resources** along with this file, named **README.md** )
3. Ensure you have the latest merged changes by executing following commands:

```
git checkout master
git pull
```

4. Open the **server** folder and install all required application modules and dependencies:

```
cd server
npm install
```

5. The server requires a `.env` ("dotenv") file to run. It may be **hidden** or **missing**. If not present, you can create one in the **server** directory

```
touch .env
```

Open the file in an editor and add the following before saving it:

```
PORT=7777
DB_URL=mongodb://localhost:27017
DB_NAME=oriflamme
```

6. Once complete, run the server (runs on port 7777) with

```
npm start
```

To stop the server, focus the terminal window running the server process and press CTRL+C.

# Front end (`/client` directory)

To run the front end:

1. Open a _new_ terminal - leave the terminal with the server running, don't close it
2. Open the **client** folder and install all required application modules and dependencies (this may take some time):

```
cd client
npm install
```
3. Once complete, run the React development server with

```
npm start
```

4. Open a couple of different browsers and point them to `http://localhost:3000`. You can also run one or more browsers in incognito mode to try the game with 2+ players.
