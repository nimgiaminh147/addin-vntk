var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var async = require('async');
var vntk = require('vntk');
var word_sent = vntk.word_sent;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/', function (req, res) {
    var data = req.body.data;
    var dataRes = "";
    var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";
    data = data.replace("\u0001", "\r");
    data = data.replace(/\. /g, ".\r");
    data = data.replace(/[-+.^:,]/g,"");
    var dataArr = data.split("\r");
    dataArr = _.compact(dataArr);
    console.log(dataArr);
    async.eachSeries(dataArr, function (arr, done) {
        dataRes += word_sent.tag(arr, 'text') + "\r";
        done();
    }, function () {
        res.send(dataRes);
    });
});

app.listen(3000, () => console.log('Server listening on 3000!'));