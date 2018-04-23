const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const port = process.env.API_PORT || 5000;
const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', express.static('docs'));
app.get('/favicon.ico', express.static('docs'));
app.get('/styles.css', express.static('docs'));
app.get('/scripts.js', express.static('docs'));

app.post('/shortlink', (req, res) => {
  const { url } = req.body;
  db.insertShortLink(url)
  .then(shortlink => {
    res.json(shortlink);
  })
  .catch(err => {
    res.json(err);
  })
})

app.get('/:hash', (req, res) => {
  const { hash } = req.params;
  db.findShortLinkByHash(hash).then(shortlink => {
    const { url } = shortlink;
    if (url) {
      return res.json({ url });
    }
    res.redirect('/');
  })
})

// NOTE: for more straightforward api
// app.get('/:hash', (req, res) => {
//   const { hash } = req.params;
//   db.findShortLinkByHash(hash).then(shortlink => {
//     const { url } = shortlink;
//     if (url) {
//       return res.redirect(url);
//     }
//     res.redirect('/');
//   })
// })

app.listen(port, () => console.log(`${new Date()} Listening http on port: ${port}`));
