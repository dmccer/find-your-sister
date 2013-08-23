// Generated by CoffeeScript 1.6.3
(function() {
  var meetingRecords, queryDper_current_room, queryMeeting;

  meetingRecords = require('../db/meeting').data;

  exports.getByEmail = function(req, res) {
    res.setHeader('content-type', 'text/json;charset=UTF-8');
    res.json(200, queryMeeting('Email', req.params.email));
  };

  exports.getByDper = function(req, res) {
    res.setHeader('content-type', 'text/json;charset=UTF-8');
    return res.json(200, queryDper('Name', req.params.dper));
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
      start_time = +new Date("2013-" + room.STime);
      end_time = +new Date("2013-" + room.ETime);
      return current_time >= start_time && current_time <= end_time;
    });
    return result = current_room.length === 0 ? "他／她暂时不在开会，难道就在座位上？！" : current_room;
  };

}).call(this);
