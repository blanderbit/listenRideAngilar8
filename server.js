//Install express server
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// Serve only the static files form the dist directory
app.use(express.static('./dist/listnride-frontend-new'));

app.get('/*', function (req, res) {

  res.sendFile(path.join(__dirname, '/dist/listnride-frontend-new/index.html'));
});


app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})