var _ = require('underscore').noConflict();

var Game = {
	init: function() {
		Game.grid = new Grid();
		Game.namesToPlayers = {};
		Game.clientsToPlayers = {};
	},

	validate_user:  function(user, pass) {
		if (Games.namesToPlayers[user]) {
			return {user:user, pass:pass};
		} else {
			Game.validateUser(user+"1", pass);
		}
	},

	new_user: function(name, pass) {
		var user = validateUser(name, pass);
		Game.namesToPlayers[user.name] = new Player(user.name, user.pass, Util.getId());
	},

	// TODO: Oh snap this ain't done!
	place_ship: function(grid, ship, putBack) {
		putBack = putBack || [];
		var head = Grid.getOpenHead();
		var valid = true;
		var oriention = Math.random(2);
		var step = oriention == 1? 1:Grid.size;

		for(var i=1;i<ship.size;i++) {
			var index = i*step+head;
			if(!grid.cells[index].isEmpty()) {
				valid = false;
				break;
			}
		}

		if(valid) {
			for(var i = 0; i < ship.size; i++) {
				var htoci = i*step+head;
				var open_index = grid.headsToCells[htoci];
				delete grid.headsToCells[htoci];
				var cell = grid.openHeads.splice(open_index, 1);
				cell.belongs_to = ship.id;
				//add to some notification thing to update
			 }
		} else {
			putBack.push(head);
			Game.place_ship(grid, ship, putBack);
		}
	},
};

var Grid = function(size) {
	var self = this;
	var length = size*size;
	this.cells = _.range(length);
	this.openHeads = Util.shuffle(_.range(length));
	this.headsToCells = {};
	_.each(this.openHeads, function(head, i) {
			self.headsToCells[head] = i;
	});
	this.size = size;

	this.get_cell = function(i) {
		return this.cells[i];
	}

	this.getOpenHead = function() {
		return this.openHeads.pop();
	}
};

var Cell = function() {
	kkkkk

var Player = function(name, pass, id){
	this.name = name;
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
