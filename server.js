const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT, DATABASE_URL } = require('./config')
const  {Post}  = require('./models');

mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.json());

//get
app.get('/posts', (req, res) => {
    Post
        .find()
        .limit(10)
        .then(posts => {
            res.json({
                posts: posts.map(
                    (post) => post.apiRepr())
            });
        })
        .catch(
            err => {
            console.log(err)
            return res.status(500).json({message: 'Internal server error'})
        });
});
//get/:id

//post
app.post('/posts', (req, res) => {

    const requiredFields = ['title', 'content','author'];
    for(let i = 0; i<requiredFields.length; i++){
        const field = requiredFields[i];
        if(!(field in req.body)) {
            const message = `Missing ${field} in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    Post
        .create({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author
        })
        .then(post => {
            res.status(201).json(post.apiRepr())    
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal server error'});
        });
});
//put

//delete

let server;

//run server
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if(err){
                return reject(err);
            }
            server = app.listen(port, () => {
                console.log(`App listening on port ${port}`);
                resolve();
            })
            .on('error', err => {
                mongoose.disconnect()
                reject(err)
            });
        });
    });   
}
//close server
function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing Server');
            server.close(err => {
                if(err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}
if (require.main === module){
    runServer().catch(err => console.log(err))}

module.exports = {app, runServer, closeServer}
