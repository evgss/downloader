const express = require('express');
const path = require("path");
const data = require('./data.json');

const app = express();

const PORT = process.env.PORT || 5000;
const urlencodedParser = express.urlencoded({extended: false});

app.use(express.json());
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use("/storage", express.static(path.join(__dirname, "storage")));

app.get('/', async (req, res) => {
    return res.sendFile(path.join(__dirname, 'index.html'));
});

app.post("/", urlencodedParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const note = data.filter(n => n.email === req.body.email)[0]?.file;
    if (note) {
        const url = 'http://localhost:5000';
        return res.status(200).redirect(`${url}/storage/${note}`);
    } else {
        return res.redirect('/');
    }
});

app.get('*', (req, res) => {
    return res.send('<h3>Страница не найдена</h3>');
});

app.listen(PORT, () => console.log('Server has been started'));

