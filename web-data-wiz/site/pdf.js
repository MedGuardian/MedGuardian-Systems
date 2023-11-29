process.env.AMBIENTE_PROCESSO = "desenvolvimento";
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;


const fs = require('fs');
var express = require("express");
var cors = require("cors");
var path = require("path");
const axios = require('axios');
const bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());




