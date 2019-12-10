const { CLIEngine } = require('eslint');

function runESLintOnFilesWithOptions() {
  const filePatterns = ['**/*.{ts,js}'];

  const cli = new CLIEngine();
  const formatter = cli.getFormatter();

  const report = cli.executeOnFiles(filePatterns);

  const messages = report.results.filter((item) => {
    const ignoreMessage =
      'File ignored because of a matching ignore pattern. Use "--no-ignore" to override.';

    return !(item.messages[0] && item.messages[0].message === ignoreMessage);
  });

  const ignoredMessageCount = report.results.length - messages.length;

  return {
    output: formatter(messages),
    errorCount: report.errorCount,
    warningCount: report.warningCount - ignoredMessageCount,
  };
}

function runESLint() {
  const { errorCount, warningCount, output } = runESLintOnFilesWithOptions();

  console.log(output);

  return errorCount === 0 && warningCount === 0;
}
module.exports = runESLint;
