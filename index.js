import express from 'express';
import bookRoutes from './routes/bookRoutes.js';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use([
    bookRoutes
]);

app.get('/hello-word', (req, res) => {
    res.send('hello word');
})

app.listen(6000, () => {
    console.log('server turn on');
})