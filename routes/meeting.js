// Generated by CoffeeScript 1.6.3
(function() {
  var meetingRecords, query, queryCurrentMeetingRoom, queryDper_current_room, queryMeeting;

  meetingRecords = require('../db/meeting').data;

  exports.getByEmail = function(req, res) {
    res.setHeader('content-type', 'text/json;charset=UTF-8');
    res.json(200, query('Email', req.params.email));
  };

  exports.getByDper = function(req, res) {
    res.setHeader('content-type', 'text/json;charset=UTF-8');
    return res.json(200, query('Name', req.params.dper));
  };

  exports.get_deper_current_room = function(req, res) {
    res.setHeader('content-type', 'text/json;charset=UTF-8');
    return res.json(200, queryDper_current_room("Name", req.params.dper));
  };

  queryMeeting = function(key, val) {
    return meetingRecords.filter(function(item) {
      return item.MeetingRoom[key].indexOf(val) !== -1;
    });
  };

  exports.queryDper = function(key, val) {
    return meetingRecords.filter(function(item) {
      var dpers;
      dpers = item.Attendees.filter(function(dper) {
        if (dper[key] !== null) {
          return dper[key].indexOf(val) !== -1;
        }
      });
      return dpers.length > 0;
    });
  };

  queryDper_current_room = function(key, val) {
    var current_room, current_time, result, room_list;
    room_list = queryDper('Name', val);
    current_time = +(new Date);
    current_room = room_list.filter(function(room) {
      var end_time, start_time;
      start_time = +new Date("2013-" + room.STime.replace('T', ' ') + ':00');
      end_time = +new Date("2013-" + room.ETime.replace('T', ' ') + ':00');
      return current_time >= start_time && current_time <= end_time;
    });
    return result = current_room.length === 0 ? "他／她暂时不在开会，难道就在座位上？！" : current_room;
  };

  query = exports.query = function(key, val) {
    return meetingRecords.filter(function(item) {
      var dpers;
      dpers = item.Attendees.filter(function(dper) {
        if (dper[key] !== null) {
          return dper[key].indexOf(val) !== -1;
        }
      });
      return dpers.length > 0;
    });
  };

  queryCurrentMeetingRoom = exports.queryCurrentMeetingRoom = function(email) {
    var ODT, currentDate, currentRoom, currentRooms, dataTime, gapDays, gapTime, result, roomList;
    roomList = query('Email', email);
    currentDate = new Date();
    dataTime = new Date();
    dataTime.setFullYear(2013);
    dataTime.setMonth(7);
    dataTime.setDate(23);
    ODT = 24 * 60 * 60 * 1000;
    gapTime = currentDate.getTime() - dataTime.getTime();
    gapDays = Math.floor(gapTime / ODT);
    currentRooms = roomList.filter(function(room) {
      var currentTime, endDate, endTime, startDate, startTime;
      startDate = new Date(currentDate.getFullYear() + '-' + room.STime.replace('T', ' ') + ':00');
      startTime = startDate.getTime();
      endDate = new Date(currentDate.getFullYear() + '-' + room.ETime.replace('T', ' ') + ':00');
      endTime = endDate.getTime();
      currentTime = currentDate.getTime() - gapDays * ODT;
      return currentTime >= startTime && currentTime <= endTime;
    });
    currentRoom = currentRooms.sort(function(a, b) {
      var aStartTime, bStartTime;
      aStartTime = +new Date(currentDate.getFullYear() + '-' + a.STime);
      bStartTime = +new Date(currentDate.getFullYear() + '-' + b.STime);
      return aStartTime - bStartTime > 0;
    });
    return result = currentRoom.length ? currentRoom[0] : null;
  };

}).call(this);
