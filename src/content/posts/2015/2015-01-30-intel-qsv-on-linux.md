---
title: Intel QSVのH.264エンコードをLinuxで！
date: 2015-01-30T22:22:03+09:00
author: mzyy94
categories: ["Multimedia"]
tags: ["qsv", "ffmpeg", "imss", "linux"]
---

[前回の記事](../2014/2014-12-12-kvm-intel-hd-graphics-passthrough.md)から1ヶ月以上空いてしまいました。遅ればせながらで申し訳ありません。続編です。
Intel QSVは高速にある程度の画質のエンコードできてよいです。とても。

今回はKVMでIntel HD Graphicsをパススルーした仮装マシン上に、SDKのインストールとカーネルモジュールのインストール、そしてffmpegでのQSVによるH.264エンコードができる環境づくりまでの手順をご紹介します。
~~これが意外と骨が折れる作業だったので同じような思いをせぬよう、ご熟読ください。~~（書き直す前の文章です。書き直した理由は後述。）

## 目次


## Intel Media Server Studio (Intel Media SDK)

前回の記事で紹介したIntel Media Server Studio(以下、IMSS。旧Intel Media SDK)のインストールをします。
IMSSはIntel Developer Zoneのメンバーになってから、[こちら](https://software.intel.com/en-us/intel-media-server-studio)へアクセスすることでダウンロードできます。
メンバー登録時と同じメールアドレスを指定するとダウンロードリンクが送られてくるので、アクセスしてfor Linuxの方をダウンロードします。

![IMSS donwload page](/assets/images/2015/01/30/IMSS-download.png)

執筆時点での最新版は2015 R3です。この2015 R3を対象にインストールを進めていきます。(12月中旬に2015 R2を対象にした記事を書き終わっていたのだけれど、公開し損ねてる間にバージョンアップがあったため最初から書き直してるなんて言えない。。)

IMSS 2015 R3から対応OSはCentOSとSLESの2種類のみとなったので、どちらか好きな方を選んでインストールしてください。以下にはCentOS 7での様子を載せます。

### Intel Media SDK Install
IMSSをダウンロードし回答すると、下図のように幾つかアーカイブの入ったディレクトリが展開されます。そこにあるSDKをインストールすることでQSVを利用することができるようになります。

![IMSS step 1](/assets/images/2015/01/30/IMSS-step-1.png)

このSDKのアーカイブを展開すると下図のように、インストール手順の書かれたPDFファイルとOSごとにディレクトリで分けられたドライバがでてきます。

![IMSS step 2](/assets/images/2015/01/30/IMSS-step-2.png)

今回はCentOS 7なので、CentOSディレクトリに移動し、PDFに記載のインストール手順を踏むだけでいいはずなんですが、幾つか依存関係にあるパッケージが必要になります。これがなくてインストールコケまくったので下表にまとめておきます。`yum install`などでインストールしてください。

   パッケージ名 | 簡易説明
:---------:|:-------
mesa-dri-drivers | グラフィックデバイスドライバ
redhat-lsb | lsb_releaseでOS情報取得したいらしい
wget | あのダウンロードするやつ
net-tools | ネットワーク設定するアレ

そしてあとは手順通りにインストールすればいいだけ。だと思ってたんですが、そのままインストールすると、ファイルやディレクトリが足りない（？）というエラーで怒られてしまいます。
見た感じインストールスクリプトのバグのようですが、一般環境向けのGeneric SDKが用意されているので、これを先にインストールしてからOS SpecificなSDKで上書きすることで、正常にインストールすることができるようです。

なので、SDKのディレクトリにあるGenericディレクトリに移動し、ぽつりと存在するアーカイブを展開します。

![IMSS step 3](/assets/images/2015/01/30/IMSS-step-3.png)

展開されたファイルの中にあるシェルスクリプトを管理者権限で実行し、Generic SDKをインストールします。

![IMSS step 4](/assets/images/2015/01/30/IMSS-step-4.png)

この作業で必要なディレクトリとファイルが作成されるので、次にOS固有のドライバとSDKをインストールします。

SDKのディレクトリに戻り、さらにCentOSのディレクトリに移動しファイルを確認すると、以下のようになっているはずです。

![IMSS step 5](/assets/images/2015/01/30/IMSS-step-5.png)

　
ここではファイルの展開等は行わず、PDF記載の通りにユーザーをvideoグループに追加して、`/MSS`ディレクトリを作成してそこにファイルをコピーしてカレントディレクトリも移動し、インストール関連ファイルの入ったアーカイブを展開してでてくるSDKのインストールスクリプトを実行します。下図のninnikuはカレントユーザー名なので適当に`$(whoami)`に置換してください。

![IMSS step 6](/assets/images/2015/01/30/IMSS-step-6.png)


SDKのインストールが成功すると、下図のようになり、再起動を促されるのでひとまず再起動します。

![IMSS step 7](/assets/images/2015/01/30/IMSS-step-7.png)


再起動後、再度`/MSS`へ移動して、下図のようにドライバの組み込まれたカーネルをビルドします。

![IMSS step 8](/assets/images/2015/01/30/IMSS-step-8.png)

正常に終了すると以下のようになります。

![IMSS step 9](/assets/images/2015/01/30/IMSS-step-9.png)

指定された場所`./rpmbuild/RPMS/`に移動すると`x86_64`ディレクトリがさらにあるのでそこに移動し、ここにあるQSVドライバが組み込まれたカーネルカーネルをインストールします。しかし今回使用しているCentOS 7では、QSVドライバが組み込まれたカーネルより新しいカーネルがインストールされていたため、QSVドライバ付きカーネルのインストールを拒否されてしまいました。
古いバージョンであることを重々承知した上でインストールするため、`--oldpackage`オプションを追加してインストールし、再起動してドライバのインストールは終了です。

![IMSS step 10](/assets/images/2015/01/30/IMSS-step-10.png)


再起動後、`lsmod | grep i915`として、以下のように幾つか該当があれば、ドライバが動作していることを確認できます。

![IMSS step 11](/assets/images/2015/01/30/IMSS-step-11.png)


これで終わりかと思いきや、インストールスクリプトのバグなのか、ライブラリのリンク先が間違っており、実際にSDKを利用するときにリンクできずにプログラムが起動しない、などが発生してしまいます。

なので、下記スクリプトを実行してライブラリのパスを再設定してください。

`sudo bash -c '(ldconfig -p -N | grep intel.mediasdk) || echo "/opt/intel/mediasdk/lib64" >> /etc/ld.so.conf.d/intel-mediasdk.conf && ldconfig'`


## H264_QSV codec for FFmpeg

さて、IMSSのインストールができたのでSDKを利用する代表的なプログラムとして、QSVによるH.264エンコードをしましょう。

前回の記事で紹介した[qsv_ffmpeg_codec](https://github.com/shenhailuanma/qsv-ffmpeg-codec)はIntel Media SDKの対応バージョンが古く、導入に手間がかかるのでIMSS 2014 R3対応版としてフォークしました。下記リポジトリに置いてあります。

*[mzyy94/h264_qsv-ffmpeg](https://github.com/mzyy94/qsv_h264-ffmpeg)*

ここからクローンし、ディレクトリ下にある`./setup.sh`を実行して、FFmpeg-2.2ディレクトリに移動して`make`して、インストールください。

このコーデック、QSVによるH.264へのエンコードはしっかりとできるのですが、**MPEG-TSファイルのエンコードはエラーになります**。原因は、TSの仕組みゆえの、ライブラリの関数`MFXVideoENCODE_EncodeFrameAsync`に渡される引数によるものというところまではわかったのですが、修正にはほぼ全ての処理を書き換えないといけない手間がかかるので、MPEG-TSから一度RAWファイルを抽出し、パイプ等を使ってQSVコーデックに渡してエンコードしてください。

実行方法の例としては、
`ffmpeg -i in.avi -acodec copy -vcodec h264_qsv -b:v 2000k -y -sar 16:9 -s 1280x720 -r 30000/1001 -bufsize 20000k -maxrate 25000k out.mp4`
のようにHDサイズにリサイズして変換することができます。

せっかくなのでベンチマークとして、[Big Buck Bunny](http://www.bigbuckbunny.org)をエンコードしようと思ったのですが、残念ながら執筆中にダウンロードが終わらなかったのでまたの機会に追記する形で公開しようと思います。


## まとめ

LinuxでもQSVできる。

 
