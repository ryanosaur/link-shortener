# Link Shortener

## a faux bit.ly link shortener

Basic environment requirements

- Node > v6.10.3
- Yarn `npm i -g yarn`
- Nodemon `npm i -g nodemon`

Then just install project dependencies:

```bash
yarn
cd client/ && yarn
```

To run the app, go the root directory and

```bash
yarn dev
```

## Project structure

Most of the API is simply in `server.js`. The client-side, React code is in `client/`, I use `create-react-app` for the boilerplate, as I felt environment configuration was not entirely the point of this exercise.

Here I'll lay out some of my thought process behind the system design.

### Database

When it comes to a persistant data structure, we're ideally dealing with a high-throughput hash table. I chose Redis as it's pretty well known for being used as a caching system.

### Hashing / Key Creation

The model I chose was pretty straightforward. In `models/shortlink.js` you'll see it's just `hash` and `url`. I chose to implement a very simple key generator most simply because I hadn't implemented one myself recently. Maybe a more scalable choice would've been to use md5 or sha1 and truncate after the first 6 characters, simply to achieve a more deterministic result (same link, same key everytime), and also a better distribution to reduce the chance of running into the same key more than once for different links. I felt like my simple implementation was adequate for the scope of this challenge.

### Node, Express & React

I wrote this app with the API in mind first. I didn't want to go too crazy on the front-end, again, because it didn't really seem like the point of this challenge. Ideally, if this was serving in production, the API would be an isolated & load-balanced microservice, and the frontend would be completely separated from this project.

## Roadmap and Features

If I were to take this challenge further some immediate features that would be neat to implement would be:

- Vanity URL's
- Referrer tracking & other usage metrics
- Quick social sharing

If you have any questions, feel free to reach out at ryan.justin.taylor@gmail.com
