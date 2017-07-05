/**
Broadly Coding Challenge. - Part 2
Assumptions 
Each class URL had multiple roasters of students (2 or 3). Code accumulats of students who are older or 25 yeard old. The code is fragmented in 2 parts. 
This code reads data from data.json and calculates average. You may need to adjust the path for the json file.
*/

var pluck = require('arr-pluck');
var _ = require('underscore');
var fs = require('fs');
var rl = require('readline');

var rooms = fs.readFileSync('/tmp/data.json').toString().split('\r\n');

rooms.pop();

for (var i = 0; i < rooms.length; i++) {
    rooms[i] = JSON.parse(rooms[i]);
}

var groupedRooms = _.groupBy(rooms, "roomNo");
var summator = function(memo, el) {
    return memo + el;
};
var result = _.map(groupedRooms, function(group, roomNo) {
    return {
        roomNo: roomNo,
        totalStudents: _.reduce(_.pluck(group, 'students'), summator, 0),
        noOfRooms: _.reduce(_.pluck(group, 'count'), summator, 0)
    }
});

var result = _.map(groupedRooms, function(group, roomNo) {
    return {
        roomNo: roomNo,
        AvgNoOfStudents: (_.reduce(_.pluck(group, 'students'), summator, 0))/(_.reduce(_.pluck(group, 'count'), summator, 0))
    }
});
console.log("Final Result - ");
console.log(result);