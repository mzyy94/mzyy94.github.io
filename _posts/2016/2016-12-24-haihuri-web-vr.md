---
title: はいふりWeb VRつくろうよ！
date: 2016-12-24 01:00:00 +0900
category: Web
tags: webgl webvr html5 three.js
image:
  path: /assets/images/2016/12/24/out-of-playarea.png
  thumbnail: /assets/images/2016/12/24/out-of-playarea.png
---


これは[はいふり Advent Calendar 2016 - Adventar](http://www.adventar.org/calendars/1382)の24日目の記事です。

こんにちは、艦長の岬です。
締め切りを伸ばしに伸ばした冬コミの各種原稿に押されてしまい、アドベントカレンダーのための時間がまったくとれませんでした。
〆切は本日の12：00なのでまだまだ脱稿前なのです。
ということで、はいふりアドベントカレンダー24日目の記事は、まったく時間がない状態で書かれていることを念頭に、続きを読み進めてください。

<!-- more -->
{% include toc %}


ハードルを下げに下げたところで記事の内容の話に移ります。
当初はThree.jsを用いたはいふりWeb VRを画策していました。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">はいふりWebVRやろうと思ったけどすごすぎて足元にも及べなさそうなのでネタチェンジ</p>&mdash; 原稿進捗49/50：3日目東v-14a (@mzyy94) <a href="https://twitter.com/mzyy94/status/807224354161364993">2016年12月9日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

はいふりアドベントカレンダーが進むにつれ、本格的なはいふりVRの記事が登場し、はいふりWeb VRは取り下げようと思いました。
ちがうネタを仕込み、期日までにかきあげようと思った今月頭。
そんな夢は悲しくも多くのタスクが降ってきて新しいネタを握ってる暇もありませんでした。
なので現在の制作途中の状態を24日目のアドベントカレンダーとしてまとめました。
間に合わなくてごめんなさい；；

## Web VR

Web VRとは名前そのまま、WebブラウザでVRを楽しむためのAPIや開発環境・実行環境の総称として近年登場したものです。

[WebVR API - Web API インターフェイス \| MDN](https://developer.mozilla.org/ja/docs/Web/API/WebVR_API)

ブラウザで3DCGゲームをバリバリ動かす[Web GL](https://www.khronos.org/webgl/)の沿線に語られ、
同様にして「ブラウザさえあれば、なにもいらない。」でVRを実現するためのものです。
スマホやタブレット、ヘッドセットの加速度・ジャイロセンサーを用いることで、Web空間をVRとして操作することができます。

Web VRの利用や実装にはJavaScriptベタ書きのほか、3Dライブラリを使う手があります。
ライブラリを用いることで、スマートフォーンなどを用いた本格的なVRヘッドセットを必要としない、簡易VRを楽しむことも可能となります。
そのうちの一つ、今回は[Three.js](https://threejs.org/)を用いてWeb VRを簡単に実現しようと企てました。

## Three.js

Three.jsは最近追加されたMMD Loaderによって、日本国内で多く用いられるMMDモデルを読み込んでWeb GL/Web VRで表示できるようになりました。
これができるということは、自由なライセンスで配布されている艦のモデルや艦長のモデルを読み込んで表示させることができるということです。

さっそく、[はいふり Advent Calendar 2016](http://www.adventar.org/calendars/1382)の6日目の記事に登場した
[岬明乃MMDモデル](http://www.nicovideo.jp/watch/sm29502246)
と
[夕雲型駆逐艦MMDモデル](http://seiga.nicovideo.jp/seiga/im3973377)
を読み込み、Three.jsのWeb GLレンダラで表示させてみることにしました。

### 艦モデル

艦を表示させるにおいて最適な背景として、Three.jsのサンプルにある海のシェーダを利用しました。

[three.js webgl - shaders - ocean](https://threejs.org/examples/webgl_shaders_ocean.html)

夕雲型駆逐艦MMDモデルを読み込み表示したところ、MMDモデルのカラー情報が適切に扱えてないようで、変なところに値がセットされてしまい、
テクスチャのないところは艦の色が黒くなっているところが多くあります。

![ship1](/assets/images/2016/12/24/ship1.png)

また、MMDモデルは日本で多く利用されていることもあり、日本語ファイル名が<del>クソ文字エンコード</del>Shift_JISで記されていることから、
内部のファイル読み込み処理をフックし、TextDecoder APIを用いて適切にファイル名を変換してあげる必要がありました。

[TextDecoder() - Web API インターフェイス \| MDN](https://developer.mozilla.org/ja/docs/Web/API/TextDecoder/TextDecoder)


![ship2](/assets/images/2016/12/24/ship2.png)

艦の色がおかしい点を除けば、さらさらと揺れる波の背景のおかげでそれらしく見えます。

![ship3](/assets/images/2016/12/24/ship3.png)

艦橋もしっかりとモデルが作り込まれていますね。

### 艦長

艦長においても、艦と同様にしてMMD LoaderによってWeb GLで表示させることができます。

![misakiakeno1](/assets/images/2016/12/24/misakiakeno1.png)

ボーンの位置が初期状態なので腕と足を広げたままですが、パラメタをいくつかいじったり、
MMDのモーションデータをセットすることで、動きをつけることができます。

![misakiakeno2](/assets/images/2016/12/24/misakiakeno2.png)

さきほどの艦に乗せてあげると、より海を往きている感じが表現できます。

---

と、ここまでで進捗が止まっています。
表面上はこれだけしか進んでいないのですが、
現時点でMMDファイルの内包されたZipファイルをブラウザにD&Dすることで新しい乗員を追加する機能や、
艦を前進させる機能などが実装されています。

時間があるときにちょこちょこと進めていき、はいふり1期再放送で晴風が沈む前には公開できるかたちにしたいです。

## まとめ

Done is better than perfect.
