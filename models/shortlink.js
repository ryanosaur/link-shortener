const CHAR_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const HASH_LENGTH = 6;

class ShortLink {

  constructor(hash = null, url = '') {
    this.hash = hash || this.generateHash();
    this.url = url;
  }

  generateHash() {
    let hash = '';
    for (let i = 0; i < HASH_LENGTH; i++) {
      const randomIndex = Math.floor(Math.random() * (CHAR_SET.length - 1));
      hash += CHAR_SET[randomIndex];
    }
    return hash;
  }

  getHash() {
    return this.hash;
  }

  getUrl() {
    return this.url;
  }

}

module.exports = ShortLink;
