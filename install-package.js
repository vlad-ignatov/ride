/* global process */
var child_process = require('child_process');
var fs = require('fs');
var name = process.argv[2];

if (!name) {
    console.log(
        'Usage: npm run-script install-package <package>'
    );
}

else {
    child_process.exec(
        'npm install --save ' + name,
        function(error, stdout, stderr) {
            if (stderr) {
                return console.error(stderr);
            }

            if (error !== null) {
                return console.error('exec error: ' + error);
            }

            // package-name@1.0.0 node_modules/package-name
            console.log(stdout);
            var info = stdout.split(' ')[0].split('@');
            var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
            pkg.ride.packages[info[0]] = '^' + info[1];
            fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2), 'utf8');
        }
    )
}
