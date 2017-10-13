const copydir = require('copy-dir');

copydir('./template/turf-template/dist', './', function(err, file) {
  if(err){
    console.log(err);
  } else {
    console.log('ok');
  }
});

