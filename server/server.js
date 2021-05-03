const express = require('express');
const cors = require('cors');
const color = require('colors');
const getPath = require('./controller/pathController');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/path/:givenpath', getPath);

app.listen(PORT, () => {
	console.log(`app is listening at port ${PORT}...`.bgCyan.black);
});
