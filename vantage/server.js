// Create a new instance of vantage.
var vantage = require("vantage")();

// Add the command "foo", which logs "bar".
vantage
  .command("foo")
  .description("Outputs 'bar'.")
  .action(function(args, callback) {
    this.log("bar");
    console.log('svr log');
    callback();
  });

vantage
  .command('opt [arg]')
  .description('Optional argument')
  .action(function(args, callback) {
    console.log(args);
    callback();
  });

// req a1 a2
vantage
  .command('req <arg1> <arg2>')
  .description('Required argument')
  .action(function(args, callback) {
    console.log(args);
    callback();
  });


vantage.command("farm animals");
vantage.command("farm tools");
vantage.command("farm feed [animal]");
vantage.command("farm with farmer brown and reflect on <subject>");


// order pizza --help
// order pizza pepperoni -pod --size "medium" --no-anchovies
//   => { options: { size: 'medium', anchovies: false, pineapple: true, o: true, delivery: true }, type: 'pepperoni' }
vantage
  .command('order pizza [type]', 'Orders a type of food.')
  .option('-s, --size <size>', 'Size of pizza.')
  .option('-a, --anchovies', 'Include anchovies.')
  .option('-p, --pineapple', 'Include pineapple.')
  .option('-o', 'Include olives.')
  .option('-d, --delivery', 'Pizza should be delivered')
  .action(function(args, cb){
    this.log(args);
    cb();
  });

vantage.command("inquirer").action(function(args, cb){
  var self = this;
  this.prompt({
    type: "confirm",
    name: "continue",
    default: false,
    message: "That sounds like a really bad idea. Continue?",
  }, function(result){
    if (!result.continue) {
      self.log("Good move.");
      cb();
    } else {
      self.log("Time to dust off that resume.");
      cb();
    }
  });
});

vantage
  .mode("repl")
  .description("Enters the user into a REPL session.")
  .init(function(args, callback){
    this.log("Entering REPL Mode. To exit, type 'exit'.");
    callback();
  })
  .delimiter("repl:")
  .action(function(command, callback) {
    this.log(eval(command));
    callback();
  });

// Name your prompt delimiter
// "websvr~$", listen on port 8088
// and show the Vantage prompt.

var banner =
"######################################################################\n" +
"#                    Welcome to joescrabshack.com                    #\n" +
"#                                                                    #\n" +
"#              All connections are monitored and recorded            #\n" +
"#      Disconnect IMMEDIATELY if you are not an authorized user      #\n" +
"######################################################################";
var port = 8088;
vantage
  .banner(banner)
  .delimiter('van-' + port + '~$')
  .listen(8088)
  .show();