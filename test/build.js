var documentation = require('documentation');
var glob = require('glob');
var fs = require('fs');
var path = require('path');
var testFilePath = path.resolve(__dirname + '/turf.js');

var requireString = 'var turf = require(\'@turf/turf\');\n\nvar turfMeta = require(\'@turf/meta\');\n\nvar test = require(\'ava\');\n\n';
glob('../turf/packages/turf-*/index.js', function (err, files) {
  if (err) {
    throw err;
  }
  documentation.build(files, {}, function (err, turfFunctions) {
    if (err) {
      throw err;
    }
    var writeableStream = fs.createWriteStream(testFilePath);
    writeableStream.write(requireString);
    writeableStream.on('error', function (err) {
      throw err;
    });
    turfFunctions.map(function (turfFunction) {
      if(turfFunction.examples) {
        turfFunction.examples.forEach(function (example) {
          var turfName = turfFunction.name;
          var testFunctionName = turfName + 'Test';
          writeableStream.write('\ntest(\'turf => ' + turfName + '\', function (t) {\n\n');
          writeableStream.write('var ' + testFunctionName + ' = function ' + testFunctionName + '() {\n\n');
          writeableStream.write(example.description);
          writeableStream.write('\n\n}\n');
          writeableStream.write(testFunctionName + '();\n\n');
          writeableStream.write('\nt.pass();\n\n');
          writeableStream.write('});\n\n');
        });
      }
    });
  });
});
