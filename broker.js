
module.exports.run = function (broker) {
  console.log('   >> Broker PID:', process.pid);

  broker.on('publish',function(channel,data) {
  	if (channel == 'broker') {
  		console.log(data);
  	}
  });



  

};
