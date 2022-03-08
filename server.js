//Install express server
const express = require('express');
const path = require('path');

const root = 'dist/dz-dialect-app';
const app = express();

app.use(forceHttpsIfProxy);

// Serve only the static files form the dist directory
app.use(express.static(`${__dirname}/${root}`));

app.get('/*', function (req, res) {

  res.sendFile(path.join(`${__dirname}/${root}/index.html`));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

function forceHttpsIfProxy(req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.hostname, req.url].join(''));
  }

  return next();
}
