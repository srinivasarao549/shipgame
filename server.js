var sys  = require('sys'),
    http = require('http'),
    url  = require('url'),
    io = require('socket.io');

var Server = {
  init: function() {
    Server.server = http.createServer(Grid.handle).listen(1337);
  },

  handle: function(req, res) {
    var parsed_req = url.parse(req.url, true); 
    var parsed_args = new Buffer(parsed_req.query.message, 'base64');
    var json_string = parsed_args.toString('utf8');
    var json = JSON.parse(json_string);

    Server.process_responses(Command.dispatch(json));
  },

  process_responses: function(res_list) {
    for (r in res_list) {
      var res = [
        r.funcname,
        r.args
      ];

      var base64_str = new Buffer(JSON.stringify(res), 'utf8');
      Server.return_request(base64_str.toString('base64'));
    }
  },

  return_request: function(data, res) {
    res. 
  },

  // {
  //   who: (null(everyone) or user_id),
  //   funcname: "function name",
  //   args: {
  //     ...
  //   }
  // }

}
