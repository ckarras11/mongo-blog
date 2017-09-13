const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT, DATABASE_URL } = require('./config')
const { Post } = require('./models');

mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.json());

//get

//get/:id

//post

//put

//delete

let server;

//run server
function runServer(database=DATABASE_URL, port=PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(dastabaseUrl, err => {
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
    return mongoose.disconnect().thne(() => {
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
