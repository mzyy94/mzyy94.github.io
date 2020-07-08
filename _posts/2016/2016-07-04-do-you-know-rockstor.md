---
title: NAS用OSにRockstorという選択
date: 2016-07-04 20:12:14 +0900
category: NAS
tags: docker rockstor btrfs nas linux
image:
  path: /assets/images/2016/07/04/rockstor-disks.png
  thumbnail: /assets/images/2016/07/04/rockstor-disks.png
---

みなさんはNASのOSとして何を使っていますか？
FreeNAS、OpenMediaVault、巷にはいくつもOSSのNAS用OSがあります。
なにを選んだらいいのでしょう？

少し前までは非力なAtomサーバ機にNAS4Freeを入れて使っていましたが、PCでゲームをすることが
ほとんどなくなったので、GameStreamサーバ(旧メインサーバー)を解体してNASとして稼働させることにしました。

![図：古いマシン構成の図](/assets/images/2014/4/6/Servers.jpg)

NAS4Freeを使っていた理由はAtomサーバ機に搭載されている256MBフラッシュメモリにOSが焼き込め、
ある程度長期の運用に向いているだろうという直感で決めていました。

旧GameStreamサーバを解体したため、GPUは取り外したもののSandy世代のi5が載っており、
今までのAtom 330とは段違いの性能があります。
せっかくなのでココは冒険と、RockstorなるNAS用OSを導入してみました。

<!-- more -->

## Rockstorとは
![Dashboard](/assets/images/2016/07/04/rockstor-dashboard.png)

[Rockstor](http://rockstor.com/)とは、Rockstor, Inc.が開発・サポートをしているオープンソースの
NAS用OSです。多々あるNAS用OSと同じWebからの操作形態となっていますが、機能を盛り込みすぎて
ごたごたしている今どきのNAS用OSの操作画面とは真逆を行っていて、簡潔さと美しさで
UXの面では他を抜いて抜群に優れているインターフェースです。操作性のために情報量を犠牲にしていることは決してなく、
ダッシュボードに表示される情報は見ているだけでもうっとりくるような仕上がりとなっています。

![Services](/assets/images/2016/07/04/rockstor-services.png)

NAS用OSとうたっているだけあって、標準でSFTP・SMB・AFPなどのファイル共有プロトコル
のサービスがインストールされていて、共有するフォルダを選択するだけでNASと化すすぐれものです。

![Shares](/assets/images/2016/07/04/rockstor-shares.png)

![File sharing](/assets/images/2016/07/04/rockstor-file-sharing.png)

ベースとなるOSは、古くからNAS用OSのトップを走ってきたFreeNASを中心とした
FreeBSDベースとは違って、そこからフォークしたOpenMediaVaultと同じLinuxベースとなっています。
OpenMediaVaultがDebianディストリビューションをベースとしている中、このRockstorはCentOSをベースと
しています。個人的なLinuxディストリビューションの宗派はDebianなので、ベースOSの違いで
このRockstorを選んだわけではさらさらなく、Rockstorに搭載されている
FreeNASに負けず劣らずの強力な機能に惹かれてしまったのです。

## Btrfsの採用

![Pools](/assets/images/2016/07/04/rockstor-pools.png)

FreeNASはFreeBSDの血を色濃く残しており、ファイルシステムはZFSを標準としています。
FreeNASを使っていたころ、ZFSのRAID-Zに<del>親を殺されて</del>ディスクを抹消されてからいい印象がなかったため、
NAS4FreeではUFSで運用していました。

![Snap shot](/assets/images/2016/07/04/rockstor-snapshot.png)

UFSではスナップショットの作成がままならなかったり、冗長性の面で不安なこともあり、なにかそういった点で
特徴のあるファイルシステムが使いたいところでした。その希望にぴたりとあてはまっていたのがこのRockstor
が採用するBtrfs。詳しいことはよくわからないですが、とにかくすごいのです。どれくらいすごいのか
言葉で表すのは難しいのですが、ファイルを書き込むときにプラッタにしみこんでいく感覚が伝わってくると思います。
<del>くわしい情報は[こちら](https://twitter.com/naota344)から。</del>


### インストール時のハードディスク指定注意
Btrfsをベースとしていますが、標準のオートパーティション分割ではLVMを構成してしまってインストール後の起動でBtrfsにインストールしろと怒られるので、インストール時のストレージ選択でI will configure partitioning.を選ぶといいです。

![Install into btrfs](/assets/images/2016/07/04/install-manual-partitioning1.png)
![Install into btrfs](/assets/images/2016/07/04/install-manual-partitioning2.png)

## Rock-onsという名のDockerアプリケーション環境

Rockstorの旨みはBtrfs採用でファイル共有ができるNASというところにとどまりません。
アプリケーションの追加を手軽に行うRock-onsと呼ばれる機能があるのです。
Rock-onsは、アプリケーションをDockerコンテナで実行し、Rockstorの環境を汚すことなく
様々な機能を**ボタン一つで**追加する機能です。
FreeNASにもJailとしてアプリケーションをコンテナに押し込む方法がありますが、コマンド入力が多々必要だったり、
そもそも設定するためにメニューを探してはさまざまな情報を入力させられるなど、手軽とは言い難いものです。
対してRock-onsは、あらかじめRock-onsレジストリに登録されたアプリケーションしか標準では実行できないものの、
登録されているアプリケーションであればボタン一つでポチポチと進めていくだけでアプリケーションを動作
させることができるのです。

![Rock-ons](/assets/images/2016/07/04/rockstor-rockons.png)

例えばGitLab CE Rock-onでは、リポジトリの保存先などを設定していくだけで、
Rock-ons上、すなわちNASのDocker上で軽々とGitLab CEを動作させることができます。

![Rock-ons installed](/assets/images/2016/07/04/rockstor-rockons-installed.png)


## まとめ

Webからの操作では自由度に制限があるものの、これくらい手軽でないとせっかくNAS用OSとして登場
してきているのにCentOSを素手で触ったほうがマシと感じることもあるでしょう。Rockstor、めんどくさがり家のあなたにどうですか？
