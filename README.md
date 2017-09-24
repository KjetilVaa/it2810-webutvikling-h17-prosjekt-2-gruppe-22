# Repository for Group 22 - Project 2

## Earth.js

This project is set up with a Nodejs backend and a javascript/jQuery based frontend.

To set up the project we chose to use Docker to eliminate compatability problems between our systems. The project can also be run without Docker.

## Run the project with Docker

To run the project with Docker, install Docker CE and docker-compose for your operating system from [https://docs.docker.com/engine/installation/](docker.com)

From your terminal/command line, clone the project to your system and run the following commands:
```
cd <project-directory>
```

Install node dependencies
```
npm i
```

From the project directory, start docker-compose. It automatically uses the docker-compose.yml config file from the current directory and starts the project.
```
docker-compose up
```

The project will be available i your web browser at `localhost:8000`

## Run the project without Docker

From your terminal/command line, clone the project to your system and run the following commands:
```
cd <project-directory>
```

Make sure you have both Nodejs (node) and Node Package Manager (npm)installed on your system.

install webpack globally on your system (apply `sudo` if needed)
```
npm i webpack -g
```

Install node dependencies
```
npm i
```

Run webpack to compile frontend javascript:
```
webpack
```

Start the project with npm/node
```
npm start
```

The project will be available in your web browser at `localhost:8000`

## Notes
The project is served at port 8000 for development.
To change the project port, export the P2_PORT environment variable in your terminal:
```
export P2_PORT=8082
```



