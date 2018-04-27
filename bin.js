#!/usr/bin/env node

const lib = require('./lib');

if(process.argv.length < 3) {
  // 引数未指定の場合 : バージョンを確認して最新の記事を表示する
  lib.checkUpdate()
    .then(lib.showLatestArticle)
    .catch((error) => {
      lib.utils.showError(error);
      process.on('exit', () => {
        process.exit(1);
      });
    });
}
else if(process.argv.includes('--help') || process.argv.includes('help')) {
  // --help or help が指定されている場合 : ヘルプを表示する
  lib.showHelp();
}
else if(['list', 'ls'].includes(process.argv[2])) {
  // list or ls が指定されている場合 : 記事一覧を表示する
  lib.showArticleList()
    .catch((error) => {
      lib.utils.showError(error);
      process.on('exit', () => {
        process.exit(1);
      });
    });
}
else if(process.argv[2] === 'show') {
  // show が指定されている場合 : 次の引数をファイル名として記事ファイルを検索・表示する
  lib.showArticle(process.argv[3])
    .catch((error) => {
      lib.utils.showError(error);
      process.on('exit', () => {
        process.exit(1);
      });
    });
}
