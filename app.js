const express = require('express');

const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log('szychta.pl listening for reqests on port ' + port);
});

app.get('/', (req, res) => {
    res.send("szychta.pl");
})