# Oriflamme

I really wanted to take a deep dive into WebSockets and enjoy modern boardgames so this is a match made in heaven. This is a browser implmentation of Oriflamme by Studio H Games.

Players find themselves in the middle of a medieval feud over the French royal crown. The King is dead - long live the King! As heads of influential families, the players strive to come to power using cunning, malice, strength, virtue and infamy. The player with the most Influence after 6 rounds wins the throne, and the game!

You can see a video of the implmentation [here](https://www.youtube.com/watch?v=5L3fkxHlPSs). Rules can be found in the `resources` folder.

![Screenshot from 2021-12-13 17-24-15](https://user-images.githubusercontent.com/4533473/145871149-61c867d1-164d-4941-b600-9e1f2a79663e.png)

![Screenshot from 2021-12-13 17-31-13](https://user-images.githubusercontent.com/4533473/145871076-c95404b1-8d2e-4d04-9d6f-43d3e942251d.png)

# Technologies

Front end:

![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)

Back end:

![](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)


# Back end (`/server` directory)

To successfully run the server in development mode you will need to install

* [NodeJS](https://nodejs.org/en/) and the `npm` package manager
* MongoDB - use the [Community Server](https://www.mongodb.com/try/download/community)

Once you have those installed:

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
