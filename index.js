import express from 'express'; // ESM

const app = express();

//Routing
app.get('/', (req, res) => {
    res.send('holdfgdfgdgdgdfga');
})
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Server started on port .' , port);
} );