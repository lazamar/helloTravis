// hooks/pre-commit.js

var exec = require('child_process').exec;

// https://npmjs.org/package/execSync
// Executes shell commands synchronously
exec('git diff --cached --quiet', function (err, stdout, stderr) {

  // only run if there are staged changes
  // i.e. what you would be committing if you ran "git commit" without "-a" option.
  if (err) {

    // stash unstaged changes - only test what's being committed
    exec('git stash --keep-index --quiet', function () {

      exec('grunt {{task}}', function (err, stdout, stderr) {
        console.log(stdout);
        // restore stashed changes

        exec('git stash pop --quiet', function () {
          var exitCode = 0;

          if (err) {
            console.log(stderr);
            exitCode = -1;
          }

          process.exit(exitCode);
        });
      });
    });
  }
});
