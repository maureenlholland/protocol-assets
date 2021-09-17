// quick and dirty helper to check logo files

var path = require("path");
var fs = require("fs");

var expectedFiles = [
    'logo.svg',
    'logo-white.svg',
    'logo-flat.svg',
    'logo-flat-white.svg',
    'logo-word-hor.svg',
    'logo-word-hor-white.svg',
    'logo-word-ver.svg',
    'logo-word-ver-white.svg',
    'logo-word-hor-stack.svg',
    'logo-word-hor-stack-white.svg',
    'logo-word-ver-stack.svg',
    'logo-word-ver-stack-white.svg'
]

var getDirectories = function(directoryPath) {
    fs.readdir(directoryPath, { withFileTypes: true }, function(err, files) {
        if (err) {
          console.log(err)
        } else {
          files.forEach(function(file) {
              if (file.isDirectory()){
                  var checkPath = path.join(directoryPath, file.name)
                  console.log("checking " + file.name);
                  expectedFiles.forEach(function(expectedFile) {
                      try {
                        fs.accessSync(path.join(checkPath, expectedFile), fs.constants.F_OK);
                      } catch {
                        console.log('Missing! ' + expectedFile)
                      }
                  });
                  getDirectories(checkPath);
              }
          })
        }
      });
};

getDirectories(__dirname);