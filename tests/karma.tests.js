// https://webpack.github.io/docs/context.html
// Creating a single test bundle with all test cases.

var integrationContext = require.context('./integration', true, /test-.*\.js$/);
integrationContext.keys().forEach(integrationContext);

var unitContext = require.context('./unit', true, /test-.*\.js$/);
unitContext.keys().forEach(unitContext);
