(function( $ ){
	
	var game = {
			grid : [],
			cache : {}
		},
		defaults = {
			rows : 10,
			columns : 15
		};
		
	function $cached(selector){
		if (typeof game.cache[selector] === 'undefined'){
			game.cache[selector] = $(selector);
		}
		
		return game.cache[selector];
	}
	
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

	$.fn.grid = function(params) {	
		console.log('Welcome!');
		
		this.game = game;
		this.addClass('grid');
		
		var x, y, row, column, cell,
			self = this,
			hoveredColumn,
			lastHovered;
		
		this._params = {};
		extend(this._params, defaults);
		
		// Highlight the current row/grid that is being hovered.
		$('.cell', this).live('mouseover', function(ev){
				var i, column, 
					currentTarget = $(ev.currentTarget),
					classes = currentTarget.attr('class').split(' ');
					
				lastHovered = currentTarget;
				//currentTarget[0].svg.circle(15, 15, 15);
				
				// Dun' work
				//currentTarget[0].svg.path('M0 ' + currentTarget.width() + 'L0 ' + currentTarget.height());
				
				for (i = 0; i < classes.length; i++){
					if (/column_/.test(classes[i])){
						column = classes[i];
					}
				}
				
				hoveredColumn = column;
				
				$cached('.' + hoveredColumn).addClass('columnHover');
				
			}).live('mouseout', function(){
				lastHovered[0].svg.clear();
				$cached('.' + hoveredColumn).removeClass('columnHover');
			});
		
		// Build the grid
		for (y = 0; y < this._params.rows; y++){
			
			if (typeof game.grid[y] === 'undefined'){
				game.grid[y] = [];
			}
			
			row = $('<div>', {
					'class': 'row ' + y
				})
				.appendTo(this);
			
			for (x = 0; x < this._params.columns; x++){
				if (typeof game.grid[y][x] === 'undefined'){
					cell = $('<div>', {
						'class': 'column_' + x + ' cell'
					});
					
					row.append(cell);
					cell[0].svg = Raphael(cell[0], cell.width(), cell.height(), {
							stroke: '#f0f'
						});
					//console.log(cell.svg)
					game.grid[y][x] = cell;
				}
			}
		}
		
		return this;
	};
	
})( jQuery );