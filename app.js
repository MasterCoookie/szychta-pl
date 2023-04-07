const express = require('express');
const session = require('express-session');
const secret = require('./secret');

const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log('szychta.pl listening for reqests on port ' + port);
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

app.get('/', (req, res) => {
    res.send("szychta.pl");
})