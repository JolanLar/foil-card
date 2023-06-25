# Foil card project
inspired by : https://poke-holo.simey.me/

## Run it

### Web service

You can run it with any web service like apache.

### Docker

Run it with docker compose :

<code>docker compose up -d</code>

Or if you prefer to build it and run it manually :

<code>docker build -t foil-card:latest .</code>

<code>docker run -d -p 80:80 foil-card:latest</code>
