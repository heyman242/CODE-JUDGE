const express = require('express'); 
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb+srv://himanshubobade:dXlzSE9Q7N2XHG3n@cluster0.g1lf9ck.mongodb.net/code-judge?retryWrites=true&w=majority").then(() =>{
    app.listen(5000);
    console.log("database is connected! listening to the localhost 5000");
}).catch((err) =>console.log(err));

