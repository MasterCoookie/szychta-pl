const express = require('express');
const session = require('express-session');
const secret = require('./secret');
const mongoose = require('mongoose');

const mainRoutes = require('./routes/mainRoutes');
const authRoutes = require('./routes/authRoutes');
const employerRoutes = require('./routes/employerRoutes');
const skillsRoutes = require('./routes/skillsRoutes');
const advertRoutes = require('./routes/advertRoutes');

const app = express();

const PORT = 3000;

const DB_URI = 'mongodb+srv://szychta-dev:' + secret.DB_PASSWORD + '@szychta-pl.nil6bpf.mongodb.net/?retryWrites=true&w=majority'


console.log("szychta.pl server startup...");

mongoose.connect(DB_URI, {
		autoIndex: true
}).then((result) => {
	console.log('db connection established...');
	app.listen(PORT, () => {
		console.log('szychta.pl listening to requests on %s', PORT);
	});
}).catch((err) => {
	console.log(err);
});

app.use(
	session({
		secret: secret.COOKIE_SECRET,
		resave: false,
		//change last number to specify session max age in hours
		cookie: { maxAge: 1000 * 3600 * 1 },
		saveUninitialized: false,
		// store
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

//routers
app.use('/auth', authRoutes);
app.use('/employer', employerRoutes);
app.use('/skills', skillsRoutes);
app.use('/', mainRoutes);
app.use('/advert', advertRoutes);


app.get('/', (req, res) => {
    res.send("szychta.pl");
})