---
title: 実践イカパケット解析のスライドテーマ
date: 2015-12-08 02:06:35 +0900
category: misc
tags: splatoon packetoon ika
image: /blog/resources/images/2015/12/08/slidoon.png
---



この記事は[Splatoon Advent Calendar](http://www.adventar.org/calendars/801)の8日目の記事です。


こんにちは、ウデマエA+のボーイです。昨日の[mzsmさんの記事](http://mzsm.me/2015/12/07/splatoon-advent-calendar-2015-ikadenwa-webrtc/)末尾にこんなことが書いてありました。

>  明日のSplatoon Advent Calendarは、Wii Uを柚子胡椒まみれにして故障させてしまうという不運にもめげずにイカパケット解析をした話をみっきー氏が書いてくれるようです。


大変にハードルを上げるバトンタッチを受けて少々困惑気味です。
というのも、イカパケット解析の話をするという内容で<del>煽りイカ</del>紹介していただいたのですが、いろいろあって今回イカパケット解析の話は出てこないからです。
期待していたみなさま、ごめんなさい。

実践イカパケット解析が何かわからない方々へ、詳しくはイカのスライドをご覧になってください。

<iframe src="//www.slideshare.net/slideshow/embed_code/key/41a5AKyCSyVAid" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/mzyy94/packetoon" title="実践イカパケット解析" target="_blank">実践イカパケット解析</a> </strong> from <strong><a href="//www.slideshare.net/mzyy94" target="_blank">Yuki Mizuno</a></strong> </div>

このスライドを公開したところ、各所にていろいろな反響がありました。
技術的な批評がたくさんあるなか、非技術的な反応もありました。
その中でも多かったのがイカのような反応です。

> 恐ろしくスライドのデザインクオリティが高いw

> このスライドテンプレートほしい。

是非ともこの期待に応えたいと思ったので、Splatoonっぽいスライドテーマを作成し、公開しました。


<!-- more -->

## Splatoonっぽいスライドテーマ

イカのリポジトリにて公開しています。

[**mzyy94/Slidoon**](https://github.com/mzyy94/Slidoon)

主にOS XでKeynoteを使ってスライドを作っているため、Advent Calendar 8日目までにはKeynote向けのテーマしか作成できていませんが、
みなさんの反応によってはPowerPoint用のものも作成しようかと思っております。

### Slidoonテーマの作成について

「スライドテーマ公開しました。」だけではAdvent Calendarの記事としてあまりにも内容が無さすぎるため、Splatoonっぽいスライドテーマ作成についていろいろと述べていきいます。

#### Splatoonっぽい色

##### 背景色

Splatoonはあの鮮やかなインクの色が楽しさを引き立てている重要な役割を担っています。
だからと言って、スライド全体をSplatoonのゲームパッケージのようなオレンジと青のようなビビッドな色で染めるのも聴講者の目を痛める原因となるだけなので、落ち着いた色をベースに使う必要があります。
どこかにSplatoonっぽいけど落ち着いた色を使って見せるよい参考資料はないかと探していたところ、任天堂のSplatoon公式サイトに行き当たりました。

[Splatoon（スプラトゥーン） \| ナワバリバトル](https://www.nintendo.co.jp/wiiu/agmj/battle/index.html)

トップページはパッケージと同じオレンジと青の鮮やかな色使いで注目させるようになっていましたが、説明の多いナワバリバトルの紹介ページでは、グレーの落ち着いた背景を用いていました。
一目見て、彩度の高い色を使っているわけではないのに、ものすごくSplatoonをイメージするのにしっくりくると感じました。
それもそのはず、インクを塗る前のステージの地面は大抵暗い色であるからです(マヒマヒを除く)。

これは使えるぞ！と思い、カラーピッカーを取り出し、採色しました。
RGBで、ベースのグレーは #2A2A2A、水玉模様のグレーは #212121であることがわかりました。

手作業で楕円の図形を追加してはサイズを調整し、カラーを #212121 にすることでなんとか背景を作り上げることができました。
一見スライドの背景は一枚のイラストに見えますが、実はグループ化した楕円の集まりなんです。

![楕円の集まり](/blog/resources/images/2015/12/08/slidoon-background.png)


##### インクの色

ベースが落ち着いた色であるからには、強調すべきところに鮮やかインクカラーを用いたいところです。
そして、どんな色が使われているか知るるために、実際のゲーム画面から採色してみたいと思いました。
そんなときに役立ったのが、[一昨日のSplatoon Advent Calendarの記事](https://blog.fetus.jp/201512/30.html)で紹介のあった、[stat.ink](https://stat.ink/)です。
Splatoonの戦績を集計するのに加えて、最終結果の画面のキャプチャ画像も一緒に登録できているため、[自分の結果](https://stat.ink/u/mzyy94)をひとつずつチェックしがてらカラーピッカー片手に色を集めていきます。
随分とたくさんの色があつまったのですが、Keynoteのカラーテーマの登録数はベース6色バリエーション4パターンの24色を登録するようにできていたので、似た色を排除、足りないバリエーションの色を自分で考えて24色揃えました。
また、グラデーションも扱えるようになっていたので、24色からハイカラになるようなグラデーションの組み合わせを6種作成しました。

![カラーテーマ](/blog/resources/images/2015/12/08/slidoon-colortheme.png)

どうやってカラーテーマの色を変更するのかがわからず長い時間躓いていましたが、現在の塗りつぶしの部分から下のカラーパレットにドラッグアンドドロップすると変えることができました。

#### イラスト

##### イカのイラスト

Splatoon = イカ なので、スライドに刺激を加えるためにイカのイラストが使いたい欲がでてきました。
しかしながらデザインセンスが皆無なため、最初に作成したイラストは散々な出来でした。（Slidoonのika4フォルダに†闇†が潜んでる)

ひとまず公式サイトなどで大体のイカの形を把握し、デザインセンスがなくても誤魔化せるようベクター形式で作成することにしました。
といってもドローイングソフトウェアを持っていなかったので、[Autodesk Graphic](https://geo.itunes.apple.com/jp/app/graphic/id404705039?mt=12&at=1l3v4mQ)を購入しました(3,600円)。

高価なソフトウェアを買ったおかげか、いくらかましなイラストができたので、実践イカパケット解析のスライドに散りばめる形で利用しました。
使いたい人がいるかどうかはわかりませんが、Slidoonのsquid8フォルダにPNG画像があります。


##### インクの飛び散り

インクの飛び散りイラストは絶対にどこかで使いたい！と思っていたのでスライド作成に必須のイラストでした。
実践イカパケット解析のスライドの箇条書き部分に登場しています。

デザインセンスがないため最初はCCライセンスのものを探してきて利用していたのですが、せっかくテーマを作成するのだからライセンスが混ざるのは管理しにくいと思ったので、この記事を執筆開始する前に3時間かけて自作しました。
3時間かけて出来上がったのがイカのイラストです。

![3時間の成果](/blog/resources/images/2015/12/08/splatter.png)

「は？こんなイラスト作るのに3時間もかかったの？」　とお思いもしれませんが、すいません、デザインセンスが皆無なのでほんとに3時間かかりました。

出来上がったこのインク飛び散りイラストは、Slidoonの箇条書き部分に適用しています。


##### Finishの帯

実践イカパケット解析の発表の際は、最後のスライドを説明し終えたらゲームさながらの左右からFinish帯が張られるアニメーションで終了する凝ったギミックを導入していました。
このFinishのイラストも作成したものです。
といっても「Finish!」の文字デザインまで含めてではなく、文字はProject Paintballのフォントを利用しました。

[プロジェクト・ペイントボール スプラトゥーン風アルファベットフォント](http://fizzystack.web.fc2.com/paintball-ja.html)

この利用規約にもあるように、Inkscapeでの描き起しであるものの、Project Paintballのフォントは任天堂の著作物のコピーに該当する可能性があるため、非営利目的のライセンスとなっており、同フォントを利用して作成したFinishの帯に関しても非営利での利用を強制させられます。
なのでSlidoonのライセンスも[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja)になっていますが、このバナーを削除いただければ[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.ja)としてお使いいただけます。


#### フォント

実践イカパケット解析のスライドでは英数字記号のフォントに[Project Paintball](http://fizzystack.web.fc2.com/paintball-ja.html)、ひらがなとかたかなに[イカモドキ](http://aramugi.com/?page_id=807)、漢字に[Noto Sans CJK JP](https://www.google.com/get/noto/)の極太字を利用しています。
ライセンスの都合でこれらのフォントを同梱できないため、SlidoonではフォントをNoto Sans CJK JPを導入してある環境向けにテーマのベースフォントを指定しています。

実際に実践イカパケット解析のスライドもNoto Sans CJK JPをベースとしたフォントテーマで文字を入力し、ひらがなかたかなの部分を手動でイカモドキに変更、英数字記号を手動でProject Paintballに変更する形で作成してきました。
そのため、文字にこだわる方はそのようにして作成していただくか、Fontforge等で上記3フォントを合成したフォントを用いるなりで対処してください。

また、Splatoonで実際に使われているフォントは取扱説明書によると、フォントワークス株式会社のフォントを利用しているようで、探してみたところロウディEBを利用しているようでした。

[ロウディ EB \| キャッチ \| 書体を選ぶ \| FONTWORKS](http://fontworks.co.jp/font/catch/rowdy/EB.html)

<blockquote class="twitter-tweet" lang="ja"><p lang="ja" dir="ltr">SplatoonのフォントはフォントワークスのロウディEBか&#10;<a href="https://t.co/KjnMGhtsm6">https://t.co/KjnMGhtsm6</a> <a href="https://t.co/2MYBNp1CVm">pic.twitter.com/2MYBNp1CVm</a></p>&mdash; 【ピュア】友利奈緒 (@mzyy94) <a href="https://twitter.com/mzyy94/status/662520841326845952">2015, 11月 6</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

すでにこのフォントを持っている方は、お手数ですがSlidoonのNoto Sans CJK JPのフォント指定を全てそちらに変更いただくと、よりSplatoonっぽいスライドが作成できるかと思います。

また、学生の方はフォントワークス社のフォントが非商用利用で4年間利用できるライセンスが5000円+税で契約できるので、イカしたスライドが作りたいならば契約をお勧めします。

[SBT LETSストア 学生向け｜トップページ](http://store.sbtlets.jp/sbtletsst/)


### まとめ

実践イカパケット解析のスライドを作成する時間のほうがパケットを解析する時間より長くなってしまったので、ぜひともこの努力を無駄にしないためにもSlidoonテーマをみんな使って欲しいです。。。

-----

さて、以上がSplatoon Advent Calendar 8日目の記事でした。
前日・前々日と技術的な話が続いていましたが箸休めになったでしょうか。

明日は[HoryGrail](https://twitter.com/holygrail)さんのウデマエS+を目指す話です。
煽りイカは好きじゃないのでハードルは上げず、このままバトンタッチします。

それでは、マンメンミ！
