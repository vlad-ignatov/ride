var nodeunit = require('nodeunit'),
    utils = require('nodeunit/lib/utils'),
    path = require('path'),
    AssertionError = require('assert').AssertionError;

exports.info = "Report tests result inthe browser console";

/**
 * Run all tests within each module, reporting the results to the command-line.
 *
 * @param {Array} files
 * @api public
 */
exports.run = function (files, options, callback) {
    var start = new Date().getTime();
    var paths = files.map(function (p) {
        return path.resolve(p);
    });

    console.group(
        '%cUNIT TESTS',
        'font-weight:bold;font-size:120%;color:#096;border-bottom:2px solid'
    );

    nodeunit.runFiles(paths, {
        moduleStart: function (name) {
            console.groupCollapsed(
                '%c%s%c ',
                'color:#654',
                name,
                'font-weight:normal'
            );
        },
        testDone: function (name, assertions) {
            assertions.forEach(function (a) {
                if (a.failed()) {
                    console.groupCollapsed(
                        '%c✗ %s %c(%sms)',
                        'color:red',
                        name[0],
                        'color:grey',
                        assertions.duration
                    );

                    a = utils.betterErrors(a);

                    if (a.error instanceof AssertionError && a.message) {
                        console.log(
                            'Assertion Message:%c %s',
                            'font-weight:bold',
                            a.message
                        );
                    }

                    console.log(
                        '%c %s',
                        'color:#D60;font-weight:300',
                        a.error.stack
                    );

                    console.groupEnd();
                }
                else {
                    console.log(
                        '%c✔︎ %s %c(%sms)',
                        'color:green',
                        name[0],
                        'color:grey',
                        assertions.duration
                    );
                }
            });
        },
        moduleDone: function () {
            console.groupEnd();
        },
        done: function (assertions) {
            var end = new Date().getTime();
            var duration = end - start;
            if (assertions.failures()) {
                console.log(
                    '%cFAILURES: %s/%s assertions failed (%sms)',
                    'color:red;font-weight:bold',
                    assertions.failures(),
                    assertions.length,
                    assertions.duration
                );
            }
            else {
                console.log(
                    '%cOK: %s assertions (%sms)',
                    'color:green;font-weight:bold',
                    assertions.length,
                    assertions.duration
                );
            }

            if (callback) {
                callback(
                    assertions.failures() ?
                        new Error('We have got test failures.') :
                        undefined
                );
            }

            console.groupEnd();
        }
    });
};
