var Util = {

  get_id: (function() {
    var id = 0;
    return function() {
      if(arguments[0] === 0) {
        id = 1;
        return 0;
      } else {
        return id++;
      }
    };
  })(),

  shuffle: function(list) {
    for(var i = 0; i < list.length; i++) {
      var j = Math.floor(Math.random() * list.length);
      var tempi = list[i];
      list[i] = list[j];
      list[j] = tempi;
    }
    return list;
  },
  
};
