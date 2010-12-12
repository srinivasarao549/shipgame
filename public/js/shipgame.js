(function( $ ){
	
	var game = {
			grid : []
		},
		defaults = {
			rows : 10,
			columns : 15,
			cellSize : 20
		};
	
	// Adapted from the book, "JavaScript Patterns" by Stoyan Stefanov
	function extend(child, parent, doOverwrite){
		var i, 
			toStr = Object.prototype.toString,
			astr = '[object Array]';

		child = child || {};

		for (i in parent){
			if (parent.hasOwnProperty(i)){
				if (typeof parent[i] === 'object'){
					if (!child[i] || doOverwrite){
						child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
					}
					extend(child[i], parent[i]);
				} else {
					if (!child[i] || doOverwrite){
						child[i] = parent[i];
					}
				}
			}
		}
	}

	$.fn.shipgame = function(params) {	
		console.log('Welcome!');
		
		this.game = game;
		this.addClass('grid');
		
		var x, y, row, column, cell,
			self = this;
		
		this._params = {};
		extend(this._params, defaults);
		
		$('.cell', this).live('mouseover', function(ev){
				var i, column, classes = $(ev.target).attr('class').split(' ');
				
				for (i = 0; i < classes.length; i++){
					if (/column_/.test(classes[i])){
						column = classes[i];
					}
				}
				
				// EXTREMELY INEFFICIENT.  CACHE THIS
				$('.cell', self).removeClass('columnHover');
				$('.' + column, self).addClass('columnHover');
				
			}).live('mouseout', function(){
				
			});
		
		// Set up the grid
		for (y = 0; y < this._params.rows; y++){
			
			if (typeof game.grid[y] === 'undefined'){
				game.grid[y] = [];
			}
			
			row = $('<div>', {
				'class': 'row ' + y
			});
			
			for (x = 0; x < this._params.columns; x++){
				if (typeof game.grid[y][x] === 'undefined'){
					cell = $('<div>', {
						'class': 'column_' + x + ' cell'
					});
					
					row.append(cell);
					game.grid[y][x] = cell;
				}
			}
			
			this.append(row);
		}
		
		return this;
	};
	
})( jQuery );