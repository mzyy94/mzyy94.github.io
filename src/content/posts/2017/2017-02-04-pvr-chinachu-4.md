---
title: Harekaze for Kodi (pvr.chinachu) 4.0.0 リリース
date: 2017-02-04T11:15:00+09:00
categories: ["Multimedia"]
tags: ["chinachu", "dtv", "kodi", "osmc", "pvr"]
image: "/assets/images/2017/02/04/pvr.chinachu-fanart.png"
---

KodiとChinachuがシームレスに連携し、快適に地デジが視聴できるアドオン Harekaze for Kodi(pvr.chinachu) をKodi 17 Krypton
に対応したバージョン4.0.0としてリリースしました。

[**Harekaze/pvr.chinachu: Chinachu client for Kodi/XBMC**](https://github.com/Harekaze/pvr.chinachu)

今回から、KodiのPVR(Personal Video Recorder)機能が強化されたのに加え、Chinachuもgammaへとバージョンアップがあったため、
いろいろと追加機能があります。
対応プラットフォームはmacOS、Windows、Linux、OSMC on Raspberry Pi、Android ARM、iOSで動くKodi 17です。
今回から試験的にiOS版のビルドに対応しました。ただ、MPEG-2のハードウェアデコーディングとバッファリングがしょぼいようなので、
高性能なChinachuマシンでH.264エンコードさせる必要があります。
AndroidやAndroid TV、iOSへのインストール方法は、[Harekaze/pvr.chinachu Wiki](https://github.com/Harekaze/pvr.chinachu/wiki)
を参照してください。

新規に導入する方への説明や、バージョンアップに伴った機能の追加を含め、pvr.chinachuの操作について紹介します。
Kodi 17のインストールについては紹介しないので、知人に頼るか他ブログや公式サイトを参考にするなどしてください。
Add-onのインストールについては、[リポジトリのREADME](https://github.com/Harekaze/pvr.chinachu/blob/master/README.md)を読んだり、
[過去記事](../2015/2015-08-08-pvr-chinachu-addon.md)を参考にするか、
これまた他ブログをあたってみてください。
今回はrepository add-onの提供もあるので、そちらのご利用をお勧めします。

<!-- more -->
{% include toc %}


## インターフェース

Kodi 17になり、標準のスキンが変更になりました。
今までの光沢感の強いConfluenceから、モダンな感じのEstuaryに変わり、操作性も大きく変わりました。
特にPVRは、トップ画面にチャンネルや録画済みの項目が表示されるようになりました。

![top image](/assets/images/2017/02/04/pvr-window.png)

視聴方法などは標準的な操作から変更はないですが、インターフェースの変更に伴って新たな項目が増えました。
タイマールールです。こちらにはChinachuのルールが該当しますが、機能に関しての詳細は後述します。
また、これから紹介する画面は、すべてEstuaryを日本語に設定し、Harekaze for KodiとYouTube Add-onを導入している画面を例として示します。
他のスキンや他のAdd-onが導入されている環境では、表示される項目が異なることがあります。


### サブ画面

これから各ページの紹介をしていきますが、それぞれのページに共通して表示可能なサブ画面と設定画面についての説明を先にしておきます。

**オプション**
: 標準テーマでは左側から出現する各機能のオプションが表示される画面。左キーを押したり画面左端にカーソルを移動させるなどして表示させられます。

![option](/assets/images/2017/02/04/option-subwindow.png)

**メニュー**
: 標準テーマではダイアログのように操作項目一覧が表示される画面。決定キー長押しや、右クリックなどで表示させられます。

![menu](/assets/images/2017/02/04/menu-dialog.png)

**設定画面**
: Add-onの詳細ページにある設定ボタンを押したときに表示される画面。インストール済みAdd-onからHarekazeを選択することで設定ボタンを見つけられます。

![settings](/assets/images/2017/02/04/setting-dialog1.png)


## チャンネル一覧

![channel list](/assets/images/2017/02/04/channel-list.png)

チャンネル一覧には、これまでにはなかった各チャンネルのロゴが表示されるようになりました。
また、1つのチャンネルに複数サービスがある場合、番組が存在してもしなくてもチャンネルが選択肢として表示されていたところ、
番組が存在しないチャンネルが一覧に表れないように変更しました。
3.xから変わらない機能としては、チャンネルのグループ分けがそのまま残っています。
地デジやBSなど、オプションより表示したいチャンネルグループを絞り込むことができます。

### ライブ視聴

![hai-furi live watch](/assets/images/2017/02/04/live-watch.png)

視聴に関して、3.xでは設定画面にMirakurunからのダイレクト視聴オプションがありましたが、
チューナーの管理などをChinachu gammaに任せる方針に変更しました。
そのため、ダイレクト視聴オプションは廃止され、現在放映中の番組もChinachuを経由しての視聴となります。
視聴中に再生コントロールの録画ボタンを押すと、手動予約が登録されます(Estuaryでは上の画像左下から3つ目の●ボタン)。
このとき、録画のためにチューナーが別で確保されるため、複数のチューナーを搭載していない場合は、
録画が終了するまでライブ視聴が中断されます。

![hai-furi 2stream recording and live watch](/assets/images/2017/02/04/live-watch2.png)

## 番組表

![program guide](/assets/images/2017/02/04/program-guide.png)

Chinachu gammaになり、新たにジャンルコードが追加されたため、それに追従して番組表の色分けも追加しました。
また、チャンネル名の横にチャンネルロゴが表示されるようになりました。
番組を選択することで、番組詳細画面を開くことができます。


### 手動録画機能

![manual reserving](/assets/images/2017/02/04/program-detail.png)

番組表やチャンネル一覧から番組詳細を表示したりメニューを開くと、録画（_スキンによっては録音との誤訳あり_）ボタンが現れます。
このボタンより、Chinachuの手動予約リクエストが発生し、現在放映中の番組はその時点から録画、未来に放映される番組は手動録画予約が行われます。

## 録画一覧

![recording list](/assets/images/2017/02/04/recording-list.png)

録画一覧には、録画された番組が表示されます。
項目を選択することで再生ができ、メニューより削除ができます。

ベータ機能としてpvr.chinachu 3.xで設定画面で有効にできた録画中の番組の再生機能は、不安定なため削除しました。
また、オプションの録画番組のグループ化設定値が、Kodi 17から保持されるようになったため、
設定画面にあったグループ化強制OFFの項目は削除されました。
オプションよりON/OFFを切り替えてください。

### 一覧の更新

![client actino menu](/assets/images/2017/02/04/client-action.png)

メニューのクライアントのアクションに録画一覧・タイマー一覧の更新アクションとスケジューラーの実行アクションを搭載しました。
これにより、これまではKodiが一覧を更新するタイミングが来るまでChinachuの情報が取得できなかった問題が解決します。
番組の録画が終わっているのに一覧に表示されていない場合など、一覧の内容が古いと思われる場合にご活用ください。

## タイマー一覧

![timer list](/assets/images/2017/02/04/timer-list.png)

タイマー一覧には、Chinachuの録画予約が一覧として表示されます。
ルールによって一致した予約に関しては、スキップやスキップの取り消しができ、手動予約は予約の削除がメニューからできるようになっています。
また、録画中の番組の取り消しも、タイマー一覧から行うことができます。


## タイマールール一覧

![timer rule list](/assets/images/2017/02/04/timer-rule.png)

Kodi 17からの新機能で、タイマールール一覧が追加されました。
Chinachuのルールに相当するものです。
しかし、ルールにあるものがすべて表示されているというわけではありません。
Chinachuのルールにある項目のうち、Kodiのタイマールールとして表示可能な項目は以下の4つがあります。

- 対象チャンネル
- 部分一致タイトル文字列
- 部分一致番組詳細文字列
- 有効/無効状態

このうち部分一致文字列に関しては、Kodiのタイマールールではタイトルか番組詳細の いずれか の部分一致文字列しか値を保持しておくことができません。
そのため、このタイマールール一覧に表示されるルールは、以下の条件に合致するものに限定しました。

- 最大1つの対象チャンネル指定
- 0つの無視チャンネル指定
- 最大1つの対象ジャンル指定
- 部分一致タイトル文字列と不一致タイトル文字列（※いずれか片方）
- 部分一致番組詳細文字列と不一致番組詳細文字列（※いずれか片方）

これらの条件に合致するものは、タイマールール一覧に表示されます。
合致しないものは表示されません。
表示されているものに関しては、値の変更や削除はできませんが、ルールの有効/無効の切り替えができるようになっています。

### ルールの作成と管理

![rule creation](/assets/images/2017/02/04/rule-creation.png)

新しい予約形態として、番組からルールの作成ができるようになりました。
Chinachuのルール作成とほぼ同等の機能です。
番組詳細を表示し、録画予約を追加からルールの作成ができます。
作成できるルールはチャンネルと部分一致タイトル文字列のみの指定となり、Kodiからは削除ができない仕組みです。
ルールの編集や削除はChinachuのWUIにアクセスして行ってください。


## 設定画面

### 基本設定

![settings 1](/assets/images/2017/02/04/setting-dialog1.png)

設定画面の項目は不要なものが削除されたのみで、新しいものは追加されていません。
Add-onを有効にする前の初期設定としてChinachuのWUIのURLの入力をしておけば、とりあえず動作します。
ChinachuのWUIのURLの入力時に気を付けてほしいのが、ブラウザでアクセスできる有効なURLを入力するという点です。
たびたび、プロトコル指定子なしでIPアドレスとポート番号だけを入力していて動かなくなっている人を見かけます。
しっかりとhttp:やhttps:から始まるURLを入力してください。

初回インストール時に設定したURLが反映されずにエラーがでることがあります。
Kodiを再起動したり、Add-onを一度無効にして再度有効にしてみてください。

Mirakurunからのダイレクト視聴が無効となったため、MirakurunのTCPポートをこのために空けていた人は閉じておくと良いでしょう。

### ストリーミング設定

![settings 2](/assets/images/2017/02/04/setting-dialog2.png)

モバイルデバイスではなく、据え置きの機器にインストールしたKodiで視聴している方にはあまり縁がないかもしれませんが、
Chinachuによるトランスコードを有効にする設定をすることができます。

### 録画設定

![settings 3](/assets/images/2017/02/04/setting-dialog3.png)

録画済み番組に関する設定をまとめた画面ですが、現状はサムネイルの表示有無とサムネイルとして切り出す動画のフレームの位置を設定できます。


## まとめ

快適♪