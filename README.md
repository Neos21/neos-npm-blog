# neos-npm-blog

[![NPM Version](https://img.shields.io/npm/v/@neos21/ccc.svg)](https://www.npmjs.com/package/@neos21/neos-npm-blog)

npm パッケージとして配信するブログの試みです。


## Installation

```sh
$ npm install -g @neos21/neos-npm-blog
```

## How To Use

- 引数未指定 : バージョン確認を行った後、インストール済のバージョンの最新記事を表示します。新しいバージョンのリリースが確認された場合は最新のバージョン番号を案内しますが、アップデートは手動で行ってください。

```sh
$ neos-npm-blog
```

- `list` or `ls` : 記事ファイルの一覧を表示します。

```sh
$ neos-npm-blog list
$ neos-npm-blog ls
```

- `show 【YYYYMMDD】` : 指定した日付の記事ファイルを表示します。

```sh
$ neos-npm-blog show 20180428
```

記事のファイル名は `YYYYMMDD.md` で統一しています。

- `--help` or `help` : ヘルプを表示します。

```sh
$ neos-npm-blog --help
$ neos-npm-blog help
```


## Author

[Neo](http://neo.s21.xrea.com/) ([@Neos21](https://twitter.com/neos21))

- [GitHub - neos-npm-blog](https://github.com/Neos21/neos-npm-blog)
- [npm - @neos21/neos-npm-blog](https://www.npmjs.com/package/@neos21/neos-npm-blog)


## Links

- [Neo's World](http://neo.s21.xrea.com/)
- [Corredor](http://neos21.hatenablog.com/)
- [Murga](http://neos21.hatenablog.jp/)
- [El Mylar](http://neos21.hateblo.jp/)
- [Bit-Archer](http://bit-archer.hatenablog.com/)
- [GitHub - Neos21](https://github.com/Neos21/)
