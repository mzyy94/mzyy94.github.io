---
title: "リモートワークでバ美肉ビデオ会議"
date: 2020-02-25 22:30:00 +0900
published: true
toc: true
category: oss 
tags: oss ios arkit live2d
header:
  image: /assets/images/2020/02/25/babiniku.png
---


みなさん体調は大丈夫ですか？私は咳が止まらない毎日を送っています。医師の診断によるとただの風邪らしいです。
巷では新型肺炎が流行しているようで、情勢を鑑み出社を禁止する会社もちらほら出てきている現状です。
弊社も例に漏れず、状況によってリモートワークが推奨されることとなりました。

処方された薬を飲み続けていて身体はすこぶる元気なものの、咳がまだ止まらないので最近はリモートワークの毎日です。
ズボラな私は、家から出ないと決めた日は寝起きのまま、髪はボサボサ、目は半開き、家庭用の微妙なデザインのメガネ。
リモートワークなのだからソレくらいがちょうどいいんですが、社会はそんなに甘くありませんでした。

ビデオ会議の存在です。

<!-- more -->

## ビデオ会議

ビデオ会議ではカメラを通して自分自身をメンバーに晒す必要があります。
ボサボサの髪・開ききらない目・クソダサメガネを備えた姿を、たとえ低画質のカメラを通したとしても人に見せるわけにはいきません。
そのためには、現代のテクノロジーでなんとかできる方法を探るしかありません。

バーチャル美少女受肉、通称 **バ美肉** です。

## バ美肉

[https://ja.wikipedia.org/wiki/バ美肉](https://ja.wikipedia.org/wiki/%E3%83%90%E7%BE%8E%E8%82%89)

バ美肉がなんたるかはWikipediaで確認してもらうとして、バ美肉をどのようにするかを考えなければなりません。
リモートワークでバ美肉の必要性を感じる人はちらほらいるようで、以下の記事でも実践していました。

[これからのリモートワークの話をしよう｜schemelisp｜note](https://note.com/garbageable/n/nd50b9abdcb28)

### FaceRig

- [Steam：FaceRig](https://store.steampowered.com/app/274920/FaceRig/?l=japanese)
- [Steam：FaceRig Live2D Module](https://store.steampowered.com/app/420680/FaceRig_Live2D_Module/?l=japanese)

先ほどの記事にはFaceRigとLive2D Moduleを用いているとの記載があります。
これで受肉できる！と、考えたのも束の間、利用環境が全くもって合致しませんでした。

業務で用いているのはMacBook Proで動かしているOSはmacOS Catalina。そもそもWindows向けに作られているFaceRigの起動すらできない環境です。
そしてそこそこの計算資源が必要とあり、障壁はなかなかに高いものでした。

さて、この解決策は使えないと知り、振り出しに戻ったかと思ったものの、FaceRig Live2D Moduleの説明に既視感のある文字列を見つけました。

**Live2D Cubism**です。

## ARKit-Live2D 2.0

iOS 11でARKitのAPIが提供され始めた時のこと、Face Trackingして[Live2D Cubism](https://www.live2d.com/)のパラメーターを操作するデモアプリを作った過去があります。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">iPhone X+ARKit+Live2Dがどんな感じに動くかのサンプル<br>(音声はPCで再生してるやつを録音したもの)<br>まだ表情のパラメーターは弄りがいがある感じ <a href="https://t.co/xNQZcQhsTY">pic.twitter.com/xNQZcQhsTY</a></p>&mdash; 劇場版ハイスクール・フリート4DX (@mzyy94) <a href="https://twitter.com/mzyy94/status/931228533166260225?ref_src=twsrc%5Etfw">November 16, 2017</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

そうだこれを使えばいいんだ。FaceRigから遠回りしたものの、一つの解決策にたどり着きました。

これが今でもそのまま動けばよかったものの、最後の更新から2年以上の月日が経っていたり、利用しているLive2D Cubism 2.0の配布が終了していたりで今のiPhoneで動かすことはできませんでした。

この三連休は咳が酷くてずっと家にいたため、これを手直し、最新のLive2D Cubism 4.0への対応と新しいEye Trackingにも対応しました。バージョン2.0です。

[mzyy94/ARKit-Live2D - GitHub](https://github.com/mzyy94/ARKit-Live2D)

誰でも簡単に使えるようになっているので、READMEを読んで動かしてみてください。

こんな感じで動きます

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ビデオ会議風景 <a href="https://t.co/9jIyNgwBki">pic.twitter.com/9jIyNgwBki</a></p>&mdash; 劇場版ハイスクール・フリート4DX (@mzyy94) <a href="https://twitter.com/mzyy94/status/1232523165131108354?ref_src=twsrc%5Etfw">February 26, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## macOSでiPhoneの画面表示

さて、これでiPhoneでのバ美肉はできるようになりました。しかし、これだけではビデオ会議にこの映像を使うことはできません。
MacでiPhoneに表示されてる映像を使えるようにする必要があります。
ここで考えられる方法は、以下の２つがあります。

### QuickTimeでビデオ録画


USBで接続したiPhoneの画面をQuickTime Playerでプレビューする方法が、最も手軽にiPhoneの画面をmacOSに表示する手段です。これを画面共有するなどして、ビデオ会議に用いる方法がまず浮かびました。

[QuickTime Player を使う方法 - Apple サポート](https://support.apple.com/ja-jp/HT201066#record)

ただ、遅延が大きいのと、計算資源を大きく消費することが気になります。

### CoreMediaIO DAL

macOSに備わるフレームワークを用いてメディアデバイスを仮想的に作り上げる方法があります。CoreMediaIOです。
QuickTimeの画面録画もこれを用いています。

- [CoreMediaIO - Apple Developer Documentation Archive](https://developer.apple.com/library/archive/samplecode/CoreMediaIO/Introduction/Intro.html)
- [508_camera_capture_manual_controls.pdf](http://devstreaming.apple.com/videos/wwdc/2014/508xxfvaehrll14/508/508_camera_capture_manual_controls.pdf)

まず、このCoreMediaIOのDevice Abstraction Layer (DAL) を通して、仮想カメラをmacOSに作成し、iOSからの映像を受け取る算段を思いつきました。
ARKit-Live2Dは[ReplayKit](https://developer.apple.com/documentation/replaykit)に対応しているため、RTMP配信対応アプリを通して、以下のような流れが実現できるはずでした。

```
iOS -> ReplayKit - RTMP -> macOS -> CoreMediaIO DAL -> Camera
```

ただ、CoreMediaIO DALのサンプルコードが古いのと、Kernel Extensionのデバッグに難航してしまったので、仮想カメラを作るのは諦めました。

あとはビデオ会議アプリがこのCoreMediaIO DALを用いた画面共有ができることを祈るばかりです。

## Zoomビデオ会議

弊社では、ビデオ会議には[Zoom](https://zoom.us/)を用いています。
このZoomには画面共有機能があり、その項目になんとCoreMediaIO DALを用いたiPhoneの画面共有がありました。

![zoom-input-selection](/assets/images/2020/02/25/zoom-input-selection.png)

USB接続したiPhone 11 ProでARKit-Live2Dを起動し、画面をプレビューしてみると、とてもきれいに写るではないですか！

![zoom-ios-input](/assets/images/2020/02/25/zoom-ios-input.png)

あとはこれでミーティングに参加すれば、バ美肉ビデオ会議が叶うこととなりました☺️

![zoom-babiniku-meeting](/assets/images/2020/02/25/zoom-babiniku-meeting.png)

声がおじさんのまま？よしなに頑張ってください。

## まとめ

WindowsでFaceRig+Live2D Module+OBSを用いてやるよりも、低負荷で実現できていそうな気がします。

リモートワークでLet'sバ美肉。
