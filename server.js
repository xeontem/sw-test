const express = require('express');
const vapikey = require('./push-notifications-server');

const app = express();
vapikey(app, '/');
app.use(express.static('dist'))

// app.get('/', (req, res) => res.send('Hello World!'));

app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'));