
## Running Unit Tests Without Karma

Unit tests should not require Karma or Webpack. You can save a lot of time by
avoiding them using the `npm run test:unit` script. You can pass arguments to 
only execute specific tests.

```
npm run test:unit -- --grep pattern/to/match
```

If you want to watch for changes, you can use `npm run test:unit:watch`.


## Running Integration Tests Without Karma

Integration tests will prepare a browser-ready build utilizing the test webpack
configuration. Because of this, you should expect these tests to take a little 
longer to execute than unit test.

Any module that has a dependency on Webpack such as images, styles, or other
non-Javascript imports should be run as an integration test.

Integration tests are executed through the same test runner as unit tests so you
can pass arguments in Mocha in the same manner.

```
npm run test:integration -- --grep pattern/to/match
```

You can also watch for changes using `npm run test:integration:watch`


## Running Tests With Karma

You can run tests with Karma/Webpack in order to execute them in a brower
environment. This requires more over head and transpiling so it will take longer
than a normal test run. 

While this configuration will require all tests to be compiled in order to build
a test bundle for the browser, you may still specify a `grep` value to 
instruct Mocha as to which tests you wish to run.

```
npm run test:karma -- --grep pattern/to/match
``` 

Starting Karma/Webpack takes a little while. You can cut down on some of the 
start up time by allowing it to continue running and watch your files. This will
result in tests being run whenever a test is changed. 

```
npm run test:karma:watch
```

## Generating code coverage

Coverage is generated with Istanbul, NYC, and Babel.

```
npm run test:coverage
```
