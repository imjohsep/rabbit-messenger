var nodemon = require('nodemon');

nodemon({
    args: process.argv,
    script: 'tests/index.js',
    execMap: {js: 'node_modules/.bin/babel-node'},
    ext: 'js',
    watch: ['src/', 'tests/unit', 'tests/integration']
})
.on('quit', function() {
    // This is dumb but it was still running after exit...
    process.exit();
})
