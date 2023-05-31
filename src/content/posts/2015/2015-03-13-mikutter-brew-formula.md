---
title: OS X向けmikutterパッケージ(Homebrew)作ったよ
date: 2015-03-13T10:48:00+09:00
categories: ["misc"]
tags: ["brew", "mikutter"]
image: "/assets/images/2015/03/13/mikutter-brew.png"
---

3月13日ですがミクの日です。

mikutterをご存知ない方はいないと思いますが、簡単に説明すると、日本で一番有名なツイッタークライアントのことです。
このmikutter、Linuxの幾つかのメジャーなディストリビューションにはパッケージが用意されているのですが、
革新的なOSであるOS Xにはパッケージが存在せず、導入する際には各自ちまちまと依存関係をクリアしていかなければいけないのです。

新しいMacBookが発表されて世のOS Xユーザーも0.1‰ほど増えるだろうというこの時期に、mikutterがパッケージ管理されない状態が続いていていいのでしょうか。

そんな自問自答からOS X用パッケージマネージャーの[Homebrew](http://brew.sh/index_ja.html)向けにパッケージを作ったのでご報告です。


<!-- more -->
{% include toc %}


## Brew formulae
Homebrewでは、パッケージをformulaという形で管理しています。
このformulaは、パッケージの依存関係とソースコードやバイナリの場所、そしてインストール処理を行うスクリプトが書かれているRubyのコードでできています。
新しいパッケージを追加したい場合などはこのformulaを作成し、HomebrewのリポジトリにPull-Requestを行う事で大元のパッケージ群に追加してもらうことができます。
この新しいformulaの作成はbrewコマンドで行うことができます。
詳しくは[homebrew/Formula-Cookbook.md at master · Homebrew/homebrew](https://github.com/Homebrew/homebrew/blob/master/share/doc/homebrew/Formula-Cookbook.md)を参考にしてください。


## mikutter formula

<del>
前節のようにしてPull-Requestを行っている状態のBrewパッケージとして、mikutter formulaを作成しました。
mikutterを動作させる上で必要なライブラリ等の依存関係も解決してインストールするようにできています。
</del>

<del>
[mikutter 3.2.2 (new formula) by mzyy94 · Pull Request #37642 · Homebrew/homebrew](https://github.com/Homebrew/homebrew/pull/37642)
</del>

<del>
このformulaがHomebrewのリポジトリにマージされればコマンド1行打ち込むだけでmikutterのインストールが完了するのですが、
まだマージされていないので2行のコマンドを打つ必要があります。
</del>

<ins datetime="2015-05-29T19:02:42+09:00">訂正：homebrew側のビルドBotでMountain Lionにてエラーが出るためマージされませんでした。
そのため、mikutterのアップデートに追従できないため、別でリポジトリを作成したのでこちらのFormulaを利用してください。

- [mzyy94/homebrew-mikutter](https://github.com/mzyy94/homebrew-mikutter)

こちらでも2行のコマンドでインストールできます。
</ins>


今までは、 tar-ballをダウンロードしてGTK+インストールしてgemインストールして... と、10行近くコマンドを打ち込まなければいけなかったので2行でも大きな進歩と言えます。

## #mikutterInstallBattle

皆さん大好き#mikutterInstallBattleの時間です。

まず、最低限必要なものは以下の2つです。

- [Homebrew](http://brew.sh)
- [Xquartz.app](https://xquartz.macosforge.org)

パッケージマネージャーのHomebrewとX11アプリケーションのためのX Window SystemであるXquartzを導入しておくだけでいいです。

あとはHomebrewのコマンドを叩くだけ。
<del>
執筆時点(2015/3/13 10:24:33+JST)ではまだPull-Requestはマージされていないので、まずPull-Requestからformulaを引っ張ってきます。
</del>

<del>
$ brew pull 37642
</del>

<ins datetime="2015-05-29T19:02:42+09:00">別リポジトリからのtapとして導入するため、以下のコマンドでmikutterのFormulaを取得します。
```
$ brew tap mzyy94/mikutter
```
</ins>

無事formulaが取得できたらあとは、
```
$ brew install mikutter
```
でインストールができます。

そして、
```
$ mikutter
```
で起動します。
以上です。

## 日本語入力
日本語入力はインストールしたての状態ではできないので各自ぐぐってがんばってください。
