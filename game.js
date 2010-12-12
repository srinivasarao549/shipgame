var _ = require('underscore').noConflict();

var Game = {
  init: function() {
    Game.grid = new Grid();
    Game.names_to_players = {};
    Game.clients_to_players = {};
  },

  validate_user:  function(user, pass) {
    if (Games.names_to_players[user]) return {user:user, pass:pass};
    else Game.validate_user(user+"1", pass);
  },

  new_user: function(user, pass) {
    var thin_user = validate_user(user, pass);
    Game.names_to_players[thin_user.user] = new Player(thin_user.user, thin_user.pass, Util.get_id());
  },

  // TODO: Oh snap this ain't done!
  place_ship: function(grid, ship, put_back) {
    put_back = put_back || [];
    var head = Grid.get_open_head();
    var valid = true;
    var oriention = Math.random(2);
    
    var step = oriention == 1? 1:Grid.size;
    for(var i=1;i<ship.size;i++) {
      var index = i*step+head;
      if(!grid.get_cell(index).isEmpty()) {
        valid = false;
        break;
      }
    }
    
    if(valid) {
      for(var i = 0; i < ship.size; i++) {
        var htoci = i*step+head;
        var open_index = grid._heads_to_cells[htoci];
        delete grid._heads_to_cells[htoci];
        var cell = grid._open_heads.splice(open_index, 1);
        cell.belongs_to = ship.id;
        //add to some notification thing to update
      }
    } else {
      put_back.push(head);
      Game.place_ship(grid, ship, put_back);
    }
  },
};

var Grid = function(size){
  var self = this;
  this._cells = _.range(size*size);
  this._open_heads = Util.shuffle(_.range(size*size));
  this._heads_to_cells = {};
  _.each(this._open_heads, function(head, i) {
    self._heads_to_cells[head] = i;
  });
  this.size = size;

  this.get_cell = function(i) {
    return this._cells[i];
  }

  this.get_open_head = function() {
    return this._open_heads.pop();
  }
};

var Player = function(user, pass, id){
  this.user = user;
  this.pass = pass;
  this.id = id;
  
  this.ships = [
    
  ];
};

var Ship = function(size){
  this.size = size;
  this.orientation = null;
  this.head = null;
};
