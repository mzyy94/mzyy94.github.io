---
title: RockstorにChinachuを詰め込んで録画NAS作ろ
date: 2016-07-05T00:07:31+09:00
categories: ["NAS"]
tags: ["chinachu", "docker", "rockstor", "pt3", "nas", "linux"]
image: "/assets/images/2016/07/05/chinachu-rockon-installed.png"
---

[昨日紹介したRockstor](../2016/2016-07-04-do-you-know-rockstor.md)というNAS用OS、とても便利で快適に使っています。
今まで低消費電力で非力なマシンで動作させていたNASもCore i5で動作するようになり、
もっといろいろとやらせてみたくなりました。
余裕がありそうなので、録画サーバの役割も担ってもらい、録画NASとして我が家で働いてもらいます。

<!-- more -->
{% include toc %}


## Rockstor
昨日の記事でいろいろと紹介しましたが、見る気がない人・ちょっとだけ知っているから見ない人向けにRockstorとは何ぞやを説明すると、
CentOSベースのBtrfsを採用したDockerが載ったNAS用OSです。
Dockerが載ってるのはアプリケーションをコンテナの中で実行させることができるようにする仕組みであるRock-onsのためのものであり、
このRock-onsを利用することで標準でリストアップされてるRock-onであれば、
ボタン一つでアプリケーションをインストールすることが可能なのです。
ここで強調したいのは、*標準でリストアップされているものであればボタン一つでインストール*できるという話で、
標準でリストアップされていないものはボタン操作に加えて
**数行のコマンド操作をするだけでインストールができる**といった隠れた拡張性があるという点です。

## Chinachu
さて、話題を変えて録画といえばの話。録画といえば過去いろいろなところで何度も紹介しているLinux向けDVR（Digital Video Recorder)
アプリケーションである[Chinachu](https://github.com/kanreisa/Chinachu)が快適で使い勝手がよいと評判です。
動作させてからの操作は快適なのですが、動作させるまでがいろいろと面倒くさかったりします。
例えば地上デジタル放送・衛星放送キャプチャボードであるPT3のドライバの導入。
初回はもちろんのこと、OSのアップグレードごとにカーネルモジュールをビルドしてインストールしてなどと、
録画環境を構築する前段階で難しい処理が挟まるのが少々玉に瑕です。
しかし、ドライバなどの環境を整えた後のChinachu自体のセットアップはある程度簡単にできるようになっています。
それどころか、チューナー管理アプリケーションのMirakurun連携とB-CASカードの読み込みまで含めたChinachuの動作環境を、
**Dockerに押し込めてコマンド一発ですべて仕上がる**ようにしたリポジトリがあるくらいに簡単です。

[Chinachu/docker-mirakurun-chinachu: All in one Mirakurun & Chinachu](https://github.com/Chinachu/docker-mirakurun-chinachu)

## PT3 DVBドライバ
みなが苦労するPT3のドライバの導入作業あれこれに終止符を打つかのように、Linuxカーネルが標準でPT3のドライバを搭載してきました。
DVB(Digital Video Broadcasting)ドライバと呼ばれるそれは、チューナーからの信号をスペシャルファイル経由で簡易に取り出せる機能を
もったもので、このドライバが有効化されているディストリビューションでは先述のようなPT3ドライバの導入に苦戦しなくても放送波を取得
できるようになっているのです。なんとこのドライバ、**Rockstorでは標準で有効**になっており、PT3をマシンに搭載するだけで動作するのです！

## Chinachu Rock-on
セクションタイトルを見て気づいている人も多いと思いますが、これまでに挙げた3つの事柄が組み合わさって、数行のコマンド入力とクリックだけで動作させられるChinachu rock-onが出来上がってしまいます。

1. 新しいRock-onは実は自由に追加できる
2. ChinachuのDockerイメージがある
3. PT3のドライバは導入済み

これらをいい感じにまとめてRock-onを作成しました。

[**mzyy94/Chinachu-rockon**](https://github.com/mzyy94/Chinachu-rockon)

Rock-onはJSONで書かれたRock-onファイルの記述形式に沿った形で自作することで、新たなRock-onを作り上げることができるようになっています。
- Ref. https://github.com/rockstor/rockon-registry

ここのREADMEにあるように、決まった形で書くことでポートの転送や共有ディレクトリの設定、
Docker hubのイメージ取得を自動化し、アプリケーションを実行できます。

ChinachuのDockerfileがあるので、これをDVB版のPT3ドライバで動作するように書き換え、かつRock-onのファイル共有方法に適した方法で設定ファイルなどを管理できるように変更してDocker hubにプッシュしてRock-onを完成させました。


## Chinachu Rock-on のインストール

大前提として、RockstorをインストールしたマシンにPT3とSmartCardリーダーが接続されていることとして話を進めます。


冒頭でも述べたように、標準でリストアップされているRock-onであればボタン一つで起動できますが、リストアップされていないものに関してはコマンド入力が必要となります。
この点において、Rock-onsは超お手軽と手放しで喜べない部分ではありますが、普通にChinachuをセットアップするよりは数倍は楽になっていると思うので我慢してください。
Chinachu-rockonのリポジトリのREADMEにも書いてありますが、必要な作業は

1. chinachu.jsonをダウンロード
2. rock-ons metastoreディレクトリを作成
3. Rockstorにchinachu.jsonを転送
4. Rock-onサービスが起動してなかったら起動する
5. Rock-onsのUpdateをする
6. Chinachuとチューナ管理アプリケーションのMirakurunの設定場所と録画の保存先の共有ディレクトリを作成する
7. Chinachu Rock-onを起動する

となっています。
chinachu.jsonは[こちら](https://github.com/mzyy94/Chinachu-rockon/releases)にあるので適当にダウンロードしてもらって、
ダウンロードしたディレクトリで以下のコマンドを実行するとステップ3まで終了します。
your-rockstor-ipはRockstorに割り当てられたIPアドレスに変更して、
パスワードを求められたらRockstorのrootパスワードを入力して実行してください。

```
ssh root@your-rockstor-ip mkdir /opt/rockstor/rockons-metastore
scp chinachu.json root@your-rockstor-ip:/opt/rockstor/rockons-metastore
```

そしてRock-onsのサービスが起動してなかったら起動し、その後Updateボタンを押すと、Chinachuがリストアップされてきます。

![Listed up](/assets/images/2016/07/05/chinachu-rockon-listed.png)

Rock-onsの一覧にChinachuが現れてもあわててインストールせずに、
ChinachuとMirakurunの設定ファイルと録画を保存する共有ディレクトリを作成します。
ここで重要なのは、Chinachu関連のディレクトリとMirakurun関連のディレクトリは必ず別の共有ディレクトリを作成する必要があるというところです。
ChinachuのデータとMirakurunのデータが衝突してうまく動作しなくなります。
逆を言えば、Chinachuの設定とデータは同じディレクトリにしてもいいですし、Mirakurunの設定とデータベースも同じディレクトリにしてOKです。
また、録画ファイル保存ディレクトリは大容量必要ですが、それ以外は1GBもあれば十分でしょう。

![Created share](/assets/images/2016/07/05/created-shares.png)

共有ディレクトリの作成が済んだらChinachuのインストールをしましょう。
インストールといっても設定する項目はほとんどなく、設定する必要のあるのは以下の5つの共有ディレクトリの指定だけです。

- **[Chinachu Config Storage]** Chinachuの設定ファイル保存ディレクトリ
- **[Chinachu Data Storag]** Chinachuのデータ保存ディレクトリ
- **[Mirakurun Config Storage]** Mirakurunの設定ファイル保存ディレクトリ
- **[Mirakurun Database Storage]** Mirakurunのデータベース保存ディレクトリ
- **[Recording Storage]** 録画ファイル保存ディレクトリ

それぞれ先ほど作成した共有ディレクトリを指定し、ポート番号の設定はデフォルトのままでステップを進めていき、インストールは完了です。

![Install step 1](/assets/images/2016/07/05/install-step-1.png)
![Install step 2](/assets/images/2016/07/05/install-step-2.png)
![Install step 3](/assets/images/2016/07/05/install-step-3.png)

チャンネル設定などが適当なのでChinachuとMirakurunの設定ファイルを保存した共有ディレクトリにあるchannels.ymlやconfig.jsonを編集してChinachuを再起動させて完成です。
録画ファイル保存ディレクトリをAFPで共有したり、各々のChinachuライフを快適にお過ごしください。
