/**
Broadly Coding Challenge. Part 1
Assumptions 
Each class URL had multiple roasters of students (2 or 3) with room number. The final output prints room no with avg no of student instead of class id for better readability. Code accumulats of students who are older or 25 yeard old. The code is fragmented in 2 parts. 
This is a part where data is collected in a json file data.json
*/
var request = require('request');
var http = require('follow-redirects').http;
var pluck = require('arr-pluck');
var _ = require('underscore');
var fs = require('fs');
var rl = require('readline');
var path = require('path');

var url = 'http://challenge.broadly.com/classes';

callback = function (response) {
    response.on('data', function (chunk) {
      var json = JSON.parse(chunk);
        //fs.unlinkSync('data.json');
     var output = invokeUrls(json.classes, function (data){
              console.log(data);
                fs.appendFile('data.json', JSON.stringify(data)+"\r\n", function (err) {
                    if (err) {
                        console.log("insert error");
                    }
                })
          });
    });
  }

var req = http.request(url, callback);
req.end();


function readStudentData(nestedUrl, callback) {
    http.request(nestedUrl, function(res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
      var json= JSON.parse(chunk);
      var roomProperty = new roomsObj();
      if (json.hasOwnProperty('room')) {
          roomProperty.roomNo = json.room;
      }
      var studentsCount = 0;
      for (var i= 0; i < json.students.length; i++) {
          if (json.students[i].age >= 25) {
              studentsCount++;
          }
      }
      roomProperty.students = studentsCount;
      if (json.hasOwnProperty('next')) {
          readStudentData(json.next, callback);
      }
      return callback(roomProperty);
  });
}).end();
} 

function invokeUrls(urls, callback) {
    for (var i= 0; i < urls.length; i++) {
          readStudentData(urls[i], function (data){
              return callback(data);
          });
    }
}

var roomsObj = function(roomNo, students) {
    this.roomNo = roomNo,
    this.students = students,
    this.count = 1
}