/* */ 
(function(process) {
  var argv = process.argv.slice(2);
  require('../index').Cmd().name('bla').title('Bla bla bla').helpful().run(argv.length ? argv : ['-h']);
})(require('process'));
