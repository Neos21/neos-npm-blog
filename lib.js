const localPackageJson = require('./package.json');
const fs               = require('fs');
const packageJson      = require('package-json');
const compareVersions  = require('compare-versions');

/** export するモジュールを定義する */
const lib = {};

/** 定数 */
lib.constants = {
  /** 記事のファイルを格納するディレクトリ : スクリプトファイルが格納されているディレクトリパスに結合して絶対パスにする */
  articlesDir: __dirname + '/articles/',
  /** 記事ファイルに付く拡張子 */
  articleFileExt: '.md'
};

/** ユーティリティ : fs-extra でもいいんだろうけど自分で作ってみたかった… */
lib.utils = {
  /** ディレクトリ内のファイルを取得する */
  readDir: (directoryPath) => {
    return new Promise((resolve, reject) => {
      fs.readdir(directoryPath, (error, fileList) => {
        if(error) {
          reject(error);
        }
        else {
          resolve(fileList);
        }
      });
    });
  },
  /** ファイルを開く */
  readFile: (filePath) => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf-8', (error, result) => {
        if(error) {
          reject(error);
        }
        else {
          resolve(result);
        }
      });
    });
  },
  /** エラー時のコンソール出力 */
  showError: (error) => {
    console.error('');
    console.error('Neo\'s npm Blog : An error has occurred...');
    console.error('');
    console.error(error);
  }
};

/** 最新バージョンを確認する */
lib.checkUpdate = () => {
  return new Promise((resolve, reject) => {
    // インストールしている package.json からパッケージ名を取得して利用する
    const packageName = localPackageJson.name;
    // インストールしている package.json に記載のバージョン番号
    const currentVersion = localPackageJson.version;
    // latest-version で取得した最新版のバージョン番号
    let remoteVersion;
    
    packageJson(packageName)
      .then((data) => {
        remoteVersion = data.version;
        
        if(!remoteVersion) {
          return reject('Remote version not exists.');
        }
        
        console.log('');
        console.log('+--------------------------------------------------');
        console.log('| Neo\'s npm Blog');
        console.log('| ');
        
        if(compareVersions(currentVersion, remoteVersion) < 0) {
          console.log('| New version is available : ' + remoteVersion + ' (Current : ' + currentVersion + ')');
        }
        else {
          console.log('| Current version is latest : ' + currentVersion);
        }
        
        console.log('+--------------------------------------------------');
        console.log('');
        
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/** 最新の記事を取得・表示する */
lib.showLatestArticle = () => {
  return new Promise((resolve, reject) => {
    // 最新の記事のファイル名 (YYYYMMDD)
    let latestFile;
    
    lib.utils.readDir(lib.constants.articlesDir)
      .then((fileList) => {
        // Markdown ファイルのみ抽出し、拡張子を除去してファイル名 (YYYYMMDD) のみの配列にする
        const fileNameList = fileList
          .filter((file) => {
            return file.endsWith(lib.constants.articleFileExt);
          })
          .map((file) => {
            return file.replace(lib.constants.articleFileExt, '');
          });
        
        // 配列から一番大きな値 = 一番最近の日付を取得する
        latestFile = Math.max.apply(null, fileNameList);
        
        // 取得した最新の日付のファイルを取得する
        return lib.utils.readFile(lib.constants.articlesDir + latestFile + lib.constants.articleFileExt);
      })
      .then((result) => {
        console.log('Latest article in this version : ' + latestFile + lib.constants.articleFileExt);
        console.log('');
        console.log(result);
        
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/** ヘルプを表示する */
lib.showHelp = () => {
  console.log('');
  console.log('+--------------------------------------------------');
  console.log('| Neo\'s npm Blog (Version : ' + localPackageJson.version + ')');
  console.log('| ');
  console.log('| npm パッケージとして配信するブログの試みです。');
  console.log('+--------------------------------------------------');
  console.log('');
  console.log('# Usage (使い方) :');
  console.log('  - 引数未指定 : バージョン確認を行った後、インストール済のバージョンの最新記事を表示します。');
  console.log('    $ neos-npm-blog');
  console.log('  - list or ls : 記事ファイルの一覧を表示します。');
  console.log('    $ neos-npm-blog list');
  console.log('    $ neos-npm-blog ls');
  console.log('  - show 【YYYYMMDD】 : 指定した日付の記事ファイルを表示します。');
  console.log('    $ neos-npm-blog show 20180101');
  console.log('  - --help or help : このテキストを表示します。');
  console.log('    $ neos-npm-blog --help');
  console.log('    $ neos-npm-blog help');
  console.log('');
};

/** 記事一覧を表示する */
lib.showArticleList = () => {
  return new Promise((resolve, reject) => {
    lib.utils.readDir(lib.constants.articlesDir)
      .then((fileList) => {
        // Markdown ファイルのみ抽出する (.DS_Store などゴミファイルを除外するため)
        const markdownFileList = fileList.filter((file) => {
          return file.endsWith(lib.constants.articleFileExt);
        });
        
        console.log('');
        console.log('Total ' + markdownFileList.length + ' articles :');
        
        markdownFileList.forEach((file) => {
          console.log('  - ' + file);
        });
        
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/** 引数で指定したファイル名の記事を表示する */
lib.showArticle = (fileName) => {
  return new Promise((resolve, reject) => {
    // 引数チェック
    if(!fileName) {
      console.log('')
      console.log('表示したい記事のファイル名を指定してください … 入力値 : [' + fileName + ']');
      
      return resolve();
    }
    
    // 表示したいファイル名
    let targetFileName = fileName;
    
    // 引数の末尾に拡張子がない場合は付与する
    if(!fileName.endsWith(lib.constants.articleFileExt)) {
      targetFileName += lib.constants.articleFileExt;
    }
    
    lib.utils.readFile(lib.constants.articlesDir + targetFileName)
    .then((result) => {
      console.log('');
      console.log('Show article : ' + targetFileName);
      console.log('');
      console.log(result);
      
      resolve();
    })
    .catch((error) => {
      if(error.code === 'ENOENT') {
        console.log('');
        console.log('指定された記事ファイルはありません : ' + targetFileName);
        
        return resolve();
      }
      
      reject(error);
    });
  });
};

/** Export */
module.exports = lib;
