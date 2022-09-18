var express = require('express');
var app = express();

var AipSpeechClient = require("baidu-aip-sdk").speech;

// 设置APPID/AK/SK
var APP_ID = "27434312";
var API_KEY = "ATZCKAvKsqgzycNtEjmlFf7a";
var SECRET_KEY = "1Nac5V1rnC1ghoCGPFk4RK9a4vNZpvTf";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');
var path = require('path');

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
    res.header("Content-Type", "application/json;charset=utf-8")
    next()
})

app.post('/process_post', multipartMiddleware, function (req, res) {
    console.log(req.files)
    var source = fs.createReadStream(req.files.voice.path);
    
    streamToBuffer(source).then(buff => {

        console.log(buff);
        console.log("正在识别");

        // 识别本地语音文件
        client.recognize(buff, 'wav', 16000).then(result => {
            console.log('return json: ' + JSON.stringify(result));
            console.log('在线语音识别结果: ' + result.result);

            res.setHeader('Content-Type', 'application/json;charset=utf-8');
            res.end(JSON.stringify(result));
        }, function (err) {
            console.log(err);
        });

    });

    //res.end(JSON.stringify(source));
})


function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
        let buffers = [];
        stream.on('error', reject);
        stream.on('data', (data) => buffers.push(data))
        stream.on('end', () => resolve(Buffer.concat(buffers)))
    });
}

const server = app.listen(8081, function () {

  var port = server.address().port

  console.log("应用实例，访问地址为 http://localhost:%s", port)
})
