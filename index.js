const express = require('express'); // bringing the express module
const path = require('path');// bringing the path module
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const members = require('./Members');

const app = express();


// init middleware
// app.use(logger);

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded( { extended: false}));

// handlebars 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Attendance App',
    members
}));

// setting a static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000; //looking for enviroment variables called port, OR use PORT 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));   // listen on a port, with adding a callback for the second parameter, simple console.log to know when the server is running