var Command = {
  dispatch: function(args) {
    return Command.commands(args[0],args[1]);
  },

  commands: {
    'new_user': Game.new_user,
  }
};
