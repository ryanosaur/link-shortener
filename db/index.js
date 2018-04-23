const Redis = require('ioredis');
const ShortLink = require('../models/shortlink');
const { REDIS_HOST, REDIS_PASSWORD } = process.env

const database = {
  db: new Redis({
    port: 15284,
    host: REDIS_HOST || '',
    family: 4,
    password: REDIS_PASSWORD || '',
    db: 0
  }),
  findShortLinkByHash(hash = '') {
    return new Promise((resolve, reject) => {
      this.db.get(hash, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(new ShortLink(hash, result));
        }
      })
    });
  },
  insertShortLink(url = '') {
    return new Promise((resolve, reject) => {
      if (!url) {
        reject('URL cannot be blank.');
      }
      const newlink = new ShortLink(null, url);
      this.findShortLinkByHash(newlink.hash)
      .then(shortlink => {
        if (!shortlink.url) {
          this.db.set(shortlink.hash, url);
          resolve(newlink);
        } else {
          return this.insertShortLink(url);
        }
      })
      .catch(reject)
    });
  }
};

module.exports = database;
