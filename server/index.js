const debug = require('debug')('app:startup');
const Joi = require('joi');
const logger = require('./middleware/logger');
const home = require('./routes/home');
const roadmaps = require('./routes/roadmaps');
const authenticator = require('./middleware/auth');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // default

app.use(express.json());

app.use(logger);
app.use(authenticator);
app.use('/', home)
app.use('/api/roadmaps', roadmaps)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
