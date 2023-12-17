import express from 'express';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use([
    bookRoutes,
    userRoutes
]);

app.get('/hello-word', (req, res) => {
    res.send('hello word');
})

app.listen(6000, () => {
    console.log(`Server connected on http://localhost:6000`);
})