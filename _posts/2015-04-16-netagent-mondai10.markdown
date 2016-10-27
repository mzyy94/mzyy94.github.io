---
layout: post
title: "ネットエージェント最終面接問題 Write-up エクストリームCTF編"
date: 2015-04-16 00:13:43 +0900
comments: true
categories: ctf
tags: netagent
---

ネットエージェントのいきなり最終面接問題を解いたのでWrite-upです。

- [2016年度 新卒採用｜ネットエージェント株式会社](http://www.netagent.co.jp/recruit/newgraduates_2016.html)

これまでmondai1からmondai9までは、mondaiとOS XやLinux、Windowsマシンが手元にあれば解く事ができていました。
しかしmondai10はそうはいきません。mondaiが手元にないのです。mondaiを入手しなければいけないのです。
某所で10分で解けたと言っていた人は、きっと某せんせーみたいにマッハ20で移動できるのでしょう。


ところで、こんな楽しい体験をさせてくれたmondaiを少しでもたくさんの人に知ってもらおうと、学内のLT大会で以下のように発表してきました。

<iframe src="//www.slideshare.net/slideshow/embed_code/47019316" width="425" height="355" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/mzyy94/ctf-coinslt" title="CTFの話 - coinsLT #10" target="_blank">CTFの話 - coinsLT #10</a> </strong> from <strong><a href="//www.slideshare.net/mzyy94" target="_blank">Yuki Mizuno</a></strong> </div>

この発表では、この記事の内容から抜粋する形で、最後のmondai10を解く楽しさと、それによって得た経験を紹介してきました。
よろしければご覧になってみてください。

さて、一昨々日から始まったネットエージェント最終面接問題のWrite-upもこれで最終回です。
[昨日のmondai9のWrite-up](/blog/2015/04/15/netagent-mondai7-9/)に続き、最後のmondai10のWrite-upです。

<!-- more -->

# mondai10

mondai9でマウントしたmondai10.tcには9枚の写真とmondai10.txtがありました。mondai10.txtには以下のように記載がありました。

```
関東２ヶ所、関西２ヶ所のそれぞれの箇所にSDカードに最後の問題を隠した。今までのヒントと写真から位置を割り出せ。

各地先着１名
ヒント：石の下のミンティア
```

関東に住んでいるので、関東のSDカードをゲットしに行こうと思いました。
関東の2ヶ所はkanto1・kanto2と呼ばれ、どちらにしようか迷っていると、kanto2がゲットを狙われているとの情報を得たのでkanto1に行くことにしました。

## 今までのヒント

これまでの問題を解いていて、途中でhint[数字].txtといったファイルが幾つか一緒に出てきました。
このhintに書かれているkanto1のヒントは以下の6つでした。

- com.ruckygames.gunmaapps
- ひもかわうどん
- 百足
- ×Fe
- !△
- ヤマヒゲナガケンミジンコ

1つ目のヒントはアプリケーションBundle IDで、**ぐんまのやぼう**のものでした。2つ目のヒントのひもかわうどんは、群馬県の桐生名物とのことです。
この2つから群馬県のとある場所に隠されているということが想像つきます。

3つ目のヒントの百足と群馬県をセットにしてGoogle検索してみると、次のサイトが上位にヒットします。

[神戦「赤城と日光二荒山神戦」 \| 群馬県赤城山ポータルサイト](http://akagi-yama.jp/archives/358)

群馬県赤城山の神様が大ムカデとのことです。これによって群馬県赤城山に隠されている線が浮上します。

4つ目のヒントは×Fe（※エックスではなくバツ）ですが、さっぱりわかりません。そのまま見るに、鉄(Fe)ではない、ということでしょうか。

5つ目のヒントは!△で意味するところは、山頂にはない、もしくは、三角点付近ではない、ということでしょうか。これまたよくわかりません。

6つ目のヒントはヤマヒゲナガケンミジンコで、Google検索してみるとミジンコ画像サイトばかりヒットしてよくわかりませんでした。

これらのヒントを元にわかったことは、**群馬県の赤城山**に隠されているということです。
kanto1に関する画像がまだ確認してないので見てみます。
kanto1_1.jpgとkanto1_2.jpgのファイル情報に撮影場所の手がかりがあるかもと期待を込め、メタ情報を見てみます。

![exif-infos.png](/blog/resources/images/2015/04/16/exif-infos.png)

予想通り、SDカードを隠した場所のGPSの座標情報がEXIFに含まれているようです。OS Xのプレビュー.appで詳細情報を開いて、マップ.appにその地点を表示させてみました。

![apple-map.png](/blog/resources/images/2015/04/16/apple-map.png)

ヒントから導いた通り、隠されている場所は赤城山でまちがいないようです。

早速、赤城山への行き方を調べてみます。

[アクセス \| 群馬県赤城山ポータルサイト](http://akagi-yama.jp/access)

公共交通機関で行く方法として、電車に乗って前橋駅もしくは中央前橋駅へ行き、そこから赤城山行きのバスに乗ればよいと示されていました。
同じ関東だし翌日9時頃に家を出ればその日のうちに帰ってこれるだろ、と高を括り、お布団に入って熟睡し翌日に備えました。
今思えばこの時点で**エクストリームCTF**が始まっていました。

<blockquote class="twitter-tweet" lang="ja"><p>明日は10時頃大学行って11時ごろ電車乗って14時ごろ登山開始ってところかな（）</p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584723697740582913">2015, 4月 5</a></blockquote>

<blockquote class="twitter-tweet" lang="ja"><p>ヤマノススメするぞといった気持ち</p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584858646346989568">2015, 4月 5</a></blockquote>

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=mzyy-22&o=9&p=8&l=as4&m=amazon&f=ifr&ref=ss_til&asins=B00L3NPW7E" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>


## 当日

ぐっすりと睡眠をとり、目覚めのコーヒーと朝食の調理パンを食べて赤城山に向かう準備を始めます。

<blockquote class="twitter-tweet" lang="ja"><p>とりあえず登山グッズはこんなもんか <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a> <a href="http://t.co/pXQj4G5MdH">pic.twitter.com/pXQj4G5MdH</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584861432895811585">2015, 4月 5</a></blockquote>


MBA,パン,水分,チョコレート,革手袋,コンパクトダウンジャケット,モバイルバッテリーにSDカードリーダーを持っていざ出発です。



### 午前の部　電車乗り換え編

<blockquote class="twitter-tweet" lang="ja"><p>行くぜ関東 <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a> (@ つくば駅 (Tsukuba Sta.) in つくば市, 茨城県) <a href="https://t.co/DUWnj3m167">https://t.co/DUWnj3m167</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584874102009266176">2015, 4月 6</a></blockquote>


自宅の最寄駅のつくば駅からつくばエクスプレスに乗り、赤城山の最寄駅である前橋駅へ向かいます。
つくばエクスプレスの電車の中で検索したところ経路としては、流山おおたかの森駅乗り換えで東武鉄道を使う行き方と、
南流山乗り換えでJRを使って行く方法がありました。

![train-connections](/blog/resources/images/2015/04/16/train-connections.png)

JRでは移動距離100km以上だったので学割が使えますが、電車内での決断は以下のようになりました。

<blockquote class="twitter-tweet" lang="ja"><p>JRでSDカード発掘に行くつもりだったけど時間ずらすと東武の方が安いことに気づいて学割使わなんだ</p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584881057205395456">2015, 4月 6</a></blockquote>

この時は後にある過酷な乗り換えが待っていることも知らず、運賃の安さで流山おおたかの森駅での乗り換えを選択しました。

<blockquote class="twitter-tweet" lang="ja"><p>TX乗り換え <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a> (@ つくばエクスプレス 流山おおたかの森駅 in 流山市, 千葉県) <a href="https://t.co/PTvNeocyiw">https://t.co/PTvNeocyiw</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584879354540388352">2015, 4月 6</a></blockquote>


東武鉄道へと乗り換え、電車の中で前橋駅から赤城山へのバスの時刻表を調べ始めます。ここで衝撃の事実を知ることになります。

<blockquote class="twitter-tweet" lang="ja"><p>やべぇ登山口へのバスの本数少なすぎるw <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584885349471498242">2015, 4月 6</a></blockquote>

<blockquote class="twitter-tweet" lang="ja"><p>ちょっと！kanto1最寄り駅から1日5本しかバス出てないってどういうことおかしいでしょ！！ <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584885739130716160">2015, 4月 6</a></blockquote>

<blockquote class="twitter-tweet" lang="ja"><p>5本じゃない4本だし！！！ <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584885923290030082">2015, 4月 6</a></blockquote>

衝撃です。平日の前橋駅発赤城山行きのバスは4本しかなく、4本目が最終折り返し便という記載がバス時刻表にあることを初めて知りました。

![bus-table](/blog/resources/images/2015/04/16/bus-table.png)

平日の前橋駅発富士見温泉経由赤城山行きの出発時刻は7:32、10:35、13:27、15:28の4本しかなく、15:28の便が最終折り返し便なので、なんとしてでも13:27のバスに乗らなければならない状況に立たされていることを知ります。
悠長に電車旅を続けられる状態ではなくなりました。本数の少ない路線を乗り継いでいるため、一つでも乗り換えを間違えたり間に合わなかったりすると13:27のバスに間に合わず、そこでmondai10へのチャレンジ終了となります。


ギリギリの乗り換えを迫られているがため、春日部駅で10:26発の久喜行きの電車が目の前で去った時は、乗り換え失敗をしたと勘違いし、焦ってこんなツイートをしていました（乗り換え案内によると10:36発の久喜行きに乗ればよいとのことでした）。

<blockquote class="twitter-tweet" lang="ja"><p>あかん乗り換えミスったやばいぞ <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a> (@ 春日部駅 (Kasukabe Sta.) in 春日部市, 埼玉県) <a href="https://t.co/4d9tnWBHpQ">https://t.co/4d9tnWBHpQ</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584890215510192129">2015, 4月 6</a></blockquote>


なんとか春日部駅での乗り換えを成功し、電車の中でこんなことを考えていました。

<blockquote class="twitter-tweet" lang="ja"><p>新幹線乗ればよかった感</p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584891590436454400">2015, 4月 6</a></blockquote>

運賃をできるだけ安く済ませようと、有料特急を乗り換え案内の検索条件から外していたのですが、埼玉県の大宮駅で新幹線に乗って群馬県の高崎駅へ行く経路をとれば、乗り換えも少なく、時間に余裕を持って前橋駅まで行くことができたのです。


続く2駅も、途中2分という短い乗り換え時間でありながらも、乗り遅れることなく無事乗り換えることに成功しました。

<blockquote class="twitter-tweet" lang="ja"><p><a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a> (@ 久喜駅 (Kuki Sta.) in 久喜市, 埼玉県) <a href="https://t.co/Xm0SXXYVs7">https://t.co/Xm0SXXYVs7</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584895933697159168">2015, 4月 6</a></blockquote>

<blockquote class="twitter-tweet" lang="ja"><p>乗り換え可能時間2分しかないぞ</p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584903863565594624">2015, 4月 6</a></blockquote>

<blockquote class="twitter-tweet" lang="ja"><p>乗り換え成功 <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a> (@ 館林駅 (Tatebayashi Sta.) in 館林市, 群馬県) <a href="https://t.co/zCyWnEyjHF">https://t.co/zCyWnEyjHF</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584905684585750528">2015, 4月 6</a></blockquote>


さて、普通にプラットホームを移動して乗り換えするだけでよかったのはこの館林駅まで。次の乗り換え駅である足利市駅では時間との戦いが待っているのです。


![running-connection](/blog/resources/images/2015/04/16/running-connection.png)


足利市駅での乗り換えでは、違う路線の駅間を歩いて移動しなければならないのです。この乗り換えの最大の難関は移動時間。足利市駅に11:47に到着し足利駅の発車時刻は12:05で、その間の時間は18分しかありません。徒歩での経路をiOSのマップで調べてみると、予想所要時間は18分となっています。迷ったり道を間違えたりしていたら乗り損ねてしまい、mondai10チャレンジ終了となります。


<blockquote class="twitter-tweet" lang="ja"><p>東武鉄道遅延情報出てないのに遅延してるクズっぽい</p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584910433590517760">2015, 4月 6</a></blockquote>

追い討ちをかけるように、東武鉄道は2分ほど足利市駅への到着が遅れていました。


<blockquote class="twitter-tweet" lang="ja"><p>駅間ダッシュだっ！ <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a> (@ 足利市駅 (Ashikagashi Sta.) in 足利市, 栃木県) <a href="https://t.co/nvG8VXUlrI">https://t.co/nvG8VXUlrI</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584910796683157504">2015, 4月 6</a></blockquote>

11:49に駅に到着し、足利駅への移動を開始します。


<blockquote class="twitter-tweet" lang="ja"><p>いきなり迷ってる <a href="https://twitter.com/hashtag/%E3%82%A8%E3%82%AF%E3%82%B9%E3%83%88%E3%83%AA%E3%83%BC%E3%83%A0CTF?src=hash">#エクストリームCTF</a> <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584911355313917953">2015, 4月 6</a></blockquote>


駅の出口が2方向にあり、どちらに出ればいいかわからず、さらに出口から出たところで道らしき道が見当たらなかったため、2分ほど迷ってしまいました。

iPhoneの電子コンパスを使って方角を確かめ、正しい出口から出てマップを頼りに急いで移動を開始します。


![connection-map](/blog/resources/images/2015/04/16/connection-map.png)


駅間の移動中の風景はとてものどかで、ゆっくりとした時間が流れているようでした。ゆっくりと時間が流れて欲しいと思っていたからかもしれませんが。
橋を渡っている時に撮った渡良瀬川の風景は、特に面白みがなく自然な感じでした。

<blockquote class="twitter-tweet" lang="ja"><p><a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a> <a href="http://t.co/v9Jca4uFE4">pic.twitter.com/v9Jca4uFE4</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584911834458689536">2015, 4月 6</a></blockquote>


[![IMG_2374.JPG](/blog/resources/images/2015/04/16/IMG_2374.JPG)
[![IMG_2375.JPG](/blog/resources/images/2015/04/16/IMG_2375.JPG)

のんびりと写真を撮っていたからでしょうか、駅まで残り250mの地点ですでに電車出発まで残り2分を切ってしまいました。

![last_250m](/blog/resources/images/2015/04/16/last_250m.png)

猛ダッシュするしかありません。幸い、信号のある道ではなかったので歩道を存分に走って駅に向かうことができました。

<blockquote class="twitter-tweet" lang="ja"><p>ギリッギリw <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a> (@ 足利駅 (Ashikaga Sta.) in 足利市, 栃木県) <a href="https://t.co/tkic86CCmO">https://t.co/tkic86CCmO</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584914938298261504">2015, 4月 6</a></blockquote>


<blockquote class="twitter-tweet" lang="ja"><p>最後猛ダッシュだったわw <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584915058506870784">2015, 4月 6</a></blockquote>


<blockquote class="twitter-tweet" lang="ja"><p>あと30秒遅かったらリタイアだったわ <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584915558820225025">2015, 4月 6</a></blockquote>

駅の改札を通ると高崎行き方面のホームにはすでに電車が！ふくらはぎパンパンになりながらも階段を駆け上がり、なんとか電車に間に合い乗ることができました。


ちなみに足利駅には電車が飾ってありました。（こんなの撮影してないで急げというツッコミはなしで）

[![IMG_2379.JPG](/blog/resources/images/2015/04/16/IMG_2379.JPG)


最後の乗り換えを終え、あとは前橋駅で降りるだけとなりました。なんとか電車で赤城山最寄駅までこぎつけることができる状態となり、これにて過酷な電車乗り換え編はおしまいとなります。

<blockquote class="twitter-tweet" lang="ja"><p>とりあえず エクストリームCTF 午前の部 電車編 はクリアできたっぽいです</p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584918614555238401">2015, 4月 6</a></blockquote>



### 昼の部　バス乗り換え編

<blockquote class="twitter-tweet" lang="ja"><p>エクストリームCTF 昼の部 バス編開始です <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a> (@ 前橋駅 (Maebashi Sta.) in 前橋市, 群馬県) <a href="https://t.co/djgY3NCMZ9">https://t.co/djgY3NCMZ9</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584927608808288256">2015, 4月 6</a></blockquote>

へとへとになりながらも降りそびれることなく、前橋駅に到着しました。

バスターミナルを回り、富士見温泉経由で赤城山に向かうバスを探します。

<blockquote class="twitter-tweet" lang="ja"><p>この13:27で行けるはず… <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a> (@ 前橋駅バスターミナル in 前橋市, 群馬県) <a href="https://t.co/zRGB3P2gof">https://t.co/zRGB3P2gof</a> <a href="http://t.co/utCcwl1PVN">pic.twitter.com/utCcwl1PVN</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584928918194540544">2015, 4月 6</a></blockquote>


事前に（電車内で）調べてあった13:27発のバスがありました。しかし富士見温泉終点と書いてあるこのバスで本当に赤城山へ行けるか心配になり、バス案内所へ行きどの便でいけるのかを聞いてきました。


<blockquote class="twitter-tweet" lang="ja"><p>心配になってバス案内所で聞いてきたら13:27の便であってた <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a> <a href="http://t.co/s2Hfmuv4Jc">pic.twitter.com/s2Hfmuv4Jc</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584931886155239425">2015, 4月 6</a></blockquote>

この13:27発の電車であっていたようです。一度富士見温泉で赤城山ビジターセンター行きのバスに乗り換えをする必要があるとのことでした。

案内所にあったバス停の停車場所の地図から、SDカードがある場所に一番近いバス停を探します。Google Mapによると、赤城山ビジターセンターまで行ってしまうと大回りとなってしまうとのことで、その一つ前の赤城山大洞で降りると、山道を通って最短経路で行けるとのことでした。

![bus-stop-route](/blog/resources/images/2015/04/16/bus-stop-route.png)


時間になり、バスが来たので乗車しました。


<blockquote class="twitter-tweet" lang="ja"><p>バス乗った　<a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584934452813365248">2015, 4月 6</a></blockquote>


ここで想定していなかった事態が発生します。


<blockquote class="twitter-tweet" lang="ja"><p>雨降ってきたし！！！</p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584934838643195904">2015, 4月 6</a></blockquote>


<blockquote class="twitter-tweet" lang="ja"><p>雨降るなんて聞いてないよ！！！ <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584934887217500160">2015, 4月 6</a></blockquote>


天気予報では"晴れ"となっていたので雨具など用意していません。しかもバスに乗るまで20分ほど待ち時間があったので、乗車前に降りそうな予感がしていれば雨合羽を買うことすらできただけに、最悪のタイミングで雨が降ってきました。このままSDカードを見つけることができるのかと、とても不安になってきました。

<blockquote class="twitter-tweet" lang="ja"><p>まんがタイムきららのドキドキビジュアルコミックス以上にドキドキしてる</p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584937029898612736">2015, 4月 6</a></blockquote>

ぼーっと外を眺めていても、雨粒と曇天とでかい鳥居くらいしかなく、ぜんぜん落ち着きませんでした。

<blockquote class="twitter-tweet" lang="ja"><p>でかい鳥居だ <a href="http://t.co/9xRZJc8ODm">pic.twitter.com/9xRZJc8ODm</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584941636108451840">2015, 4月 6</a></blockquote>


そうこうしていると富士見温泉バス停に着き、乗り換えをしました。

<blockquote class="twitter-tweet" lang="ja"><p><a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a> (@ 富士見温泉バス停) <a href="https://t.co/NDft6XwqIr">https://t.co/NDft6XwqIr</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584943568017588224">2015, 4月 6</a></blockquote>

赤城山ビジターセンター行きのバスに乗ると、風景に大きな山が見えてきました。たぶん赤城山です。たぶん。


[![IMG_2388.JPG](/blog/resources/images/2015/04/16/IMG_2388.JPG)
[![IMG_2391.JPG](/blog/resources/images/2015/04/16/IMG_2391.JPG)


バスで揺られて眠くなる中、標高1000mを越えたあたりから車窓から覗く景色が明るくなっていることに気づきます。

<blockquote class="twitter-tweet" lang="ja"><p>標高1000m超えた</p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584950108011110400">2015, 4月 6</a></blockquote>

<blockquote class="twitter-tweet" lang="ja"><p>残雪があるぞ…</p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584951262354939905">2015, 4月 6</a></blockquote>

そう、残雪が景色を明るくしていたのです。また、赤城山大沼という湖は湖面が凍っていました。

[![IMG_2395.JPG](/blog/resources/images/2015/04/16/IMG_2395.JPG)
[![IMG_2398.JPG](/blog/resources/images/2015/04/16/IMG_2398.JPG)

赤城山大洞バス停に到着し、降車します。降りるとき、バスの運転手にこう告げられました。

> バス停が雪に埋まってるから帰りは降りた位置辺りにいれば止まるよ

嫌な予感しかしません。

ここから想像をはるかに超える過酷な登山が始まります。

### 午後1　登山編

<blockquote class="twitter-tweet" lang="ja"><p>さぁ、登山開始だ <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a> (@ 赤城山第1スキー場 in 前橋市, 群馬県) <a href="https://t.co/tHRXadHe4S">https://t.co/tHRXadHe4S</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584954825294684160">2015, 4月 6</a></blockquote>

バス停を降りてすぐのところで登山者向けの案内看板を見つけました。

[![IMG_2399.JPG](/blog/resources/images/2015/04/16/IMG_2399.JPG)

この看板の略図にある地蔵岳を越えてゆくコースを通ってSDカードの場所へと向かいます。看板の凡例にあるように、通る道は**歩道**となっているので比較的楽に登ることができると思いまいした。その歩道とやらはどこにあるのかとあたりを見渡すと、アスファルトで舗装された道がみつかりました。

<blockquote class="twitter-tweet" lang="ja"><p>どうすんだよこれ <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a> <a href="http://t.co/3DeQWYKK8V">pic.twitter.com/3DeQWYKK8V</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584955092714950656">2015, 4月 6</a></blockquote>

かろうじてアスファルトの道であるとわかる雪に覆われた登山道を見つけます。100mほど先を見ると、アスファルトはすべて雪に覆われ見えなくなっています。
完全に想像していなかった事態です。春になり暖かくなってきていたので、こんなにも雪が積もっているなんて考えていませんでした。
出発前の甘い考えがここで思い出されます。

<blockquote class="twitter-tweet" lang="ja"><p>ヤマノススメするぞといった気持ち</p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584858646346989568">2015, 4月 5</a></blockquote>

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=mzyy-22&o=9&p=8&l=as4&m=amazon&f=ifr&ref=ss_til&asins=B00L3NPW7E" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>



何も下調べせずに来てしまったことを強く後悔しました。
事前にしっかりと下調べしていれば、1800m超級の山にはまだ雪が残っているというのは安易に想像がつきます。小爪アイゼン装備のブーツを持ってくることもできたのです。

よく滑る雪道を数十メートル進み、湖の方を眺めると大きな山がこちらを見守ってくれていました。

[![IMG_2403.JPG](/blog/resources/images/2015/04/16/IMG_2403.JPG)


刻々と帰りのバスの時間が迫ってきているので、後悔はほどほどに先に進みます。

<blockquote class="twitter-tweet" lang="ja"><p>やばい(確信) <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a> <a href="http://t.co/NsTmOr6ZL2">pic.twitter.com/NsTmOr6ZL2</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584956357419241472">2015, 4月 6</a></blockquote>


<blockquote class="twitter-tweet" lang="ja"><p>なんで沢登りせにゃならんのだw <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a> <a href="http://t.co/5c72fEWBQc">pic.twitter.com/5c72fEWBQc</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584958094637015040">2015, 4月 6</a></blockquote>

膝上まで沈む深い雪があるところや、雪解け水で小川ができているところを水浸しになりながらかけ進んでいきます。

[![IMG_2405.JPG](/blog/resources/images/2015/04/16/IMG_2405.JPG)
[![IMG_2410.JPG](/blog/resources/images/2015/04/16/IMG_2410.JPG)
[![IMG_2412.JPG](/blog/resources/images/2015/04/16/IMG_2412.JPG)
[![IMG_2413.JPG](/blog/resources/images/2015/04/16/IMG_2413.JPG)
[![IMG_2414.JPG](/blog/resources/images/2015/04/16/IMG_2414.JPG)

<blockquote class="twitter-tweet" lang="ja"><p>Googleさんの案内相当険しかったですね。。これマップの地点の画像です <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a> <a href="http://t.co/OthdUPcczu">pic.twitter.com/OthdUPcczu</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584976426962530305">2015, 4月 6</a></blockquote>

20分ほど登ったでしょうか、地蔵岳の登山道を抜け、車道に出てきました。

[![IMG_2415.JPG](/blog/resources/images/2015/04/16/IMG_2415.JPG)

やっと雪道から解放されました。

少し進むと小沼という湖がでてきました。

[![IMG_2416.JPG](/blog/resources/images/2015/04/16/IMG_2416.JPG)
[![IMG_2417.JPG](/blog/resources/images/2015/04/16/IMG_2417.JPG)
[![IMG_2418.JPG](/blog/resources/images/2015/04/16/IMG_2418.JPG)
[![IMG_2419.JPG](/blog/resources/images/2015/04/16/IMG_2419.JPG)
[![IMG_2420.JPG](/blog/resources/images/2015/04/16/IMG_2420.JPG)

標高1450m地点とのことです。あと一息で目的地周辺です。
凍った湖を左手に眺めながら車道脇をてくてくと歩き進んでいきます。

[![IMG_2422.JPG](/blog/resources/images/2015/04/16/IMG_2422.JPG)
[![IMG_2424.JPG](/blog/resources/images/2015/04/16/IMG_2424.JPG)
[![IMG_2425.JPG](/blog/resources/images/2015/04/16/IMG_2425.JPG)
![route-to-dest.png](/blog/resources/images/2015/04/16/route-to-dest.png)

目的地周辺まで来ました。このときiPhoneの電波は圏外となっていました。

ここからは車道を外れて森の中へと捜索しに行きます。

### 午後2　捜索編

登山道が60cm超の雪まみれだったのにもかかわらず、SDカードが隠されている森は数cmの雪しかありませんでした。
不幸中の幸いというものですね。

[![IMG_2428.JPG](/blog/resources/images/2015/04/16/IMG_2428.JPG)
[![IMG_2429.JPG](/blog/resources/images/2015/04/16/IMG_2429.JPG)
[![IMG_2431.JPG](/blog/resources/images/2015/04/16/IMG_2431.JPG)
[![IMG_2433.JPG](/blog/resources/images/2015/04/16/IMG_2433.JPG)

道無き道を突き進んでいたのですが、途中で道らしきものを見つけそちらを歩き始めました。
すると、看板とともに分岐点があらわれました。

GPSによると、血の池方面に行けばよさそうなので、そちらへ進んでいきます。

[![IMG_2435.JPG](/blog/resources/images/2015/04/16/IMG_2435.JPG)
[![IMG_2437.JPG](/blog/resources/images/2015/04/16/IMG_2437.JPG)

血の池に着くと、血の池にまつわる伝説と池の由来が書かれた看板がありました。
この看板を読んでいると、すこし前に目にした単語を見つけました。
そう、hint7.txtに記載のあった**ヤマヒゲナガケンミジンコ**です。
なるほどがってん、あれはこの血の池を指していたんですね。

血の池の中心に来て辺りを見回すと、そこは静かな森でした。まぁ森に入って来たからあたりまえなのですが。

[![IMG_2441.JPG](/blog/resources/images/2015/04/16/IMG_2441.JPG)


地図を拡大し、GPSだけを頼りにSDカードの位置まで行くと、kanto1_1.jpgに写っているのと同じような岩がたくさんある場所へと来ました。

[![IMG_2445.JPG](/blog/resources/images/2015/04/16/IMG_2445.JPG)


よーくkanto1_1.jpgと目の前の岩岩を見比べ、それらしき岩を特定しました。

[![IMG_2446.JPG](/blog/resources/images/2015/04/16/IMG_2446.JPG)

mondai10.txtによると、*ヒント：石の下のミンティア*とのことなので、石をめくってみます。

[![IMG_2447.JPG](/blog/resources/images/2015/04/16/IMG_2447.JPG)
[![IMG_2449.JPG](/blog/resources/images/2015/04/16/IMG_2449.JPG)

ありました！ミンティアアップルフィズ味です！

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=mzyy-22&o=9&p=8&l=as4&m=amazon&f=ifr&ref=ss_til&asins=B00MQE4MG6" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>

気になる中身は...

[![IMG_2451.JPG](/blog/resources/images/2015/04/16/IMG_2451.JPG)

**待望のSDカードでした！やっとみつかりました！**
9:24につくば駅から電車に乗り、15:24に発見したのでかれこれ6時間の旅でした。
ものすごい達成感とSDカードの中身への興味から、岩場に腰を下ろしSDカードをマウントしてみてみました。

[![IMG_2452.JPG](/blog/resources/images/2015/04/16/IMG_2452.JPG)

<pre style="border:none; color:inherit; background-color:inherit;">
＿人人人人人人人＿
＞ mondai10.tc ＜
￣Y^Y^Y^Y^Y^Y￣
</pre>

またこの形式か！mondai9で解いたのと同じ、パスワード付きTrueCryptファイルです。
パスワードのヒントはSDカード内にあることは容易に想像がつくので解析しようと思いましたが、
帰りのバスが1本しかない上に、ここからバス停まで何分かかるか不明なため、解析は後回しにしてとりあえず森を抜けることにします。
岩場のすぐ近くに県道へ抜ける道の案内看板があったので、それに従って車道へと出ます。


### 午後3　帰宅編

[![IMG_2454.JPG](/blog/resources/images/2015/04/16/IMG_2454.JPG)
[![IMG_2455.JPG](/blog/resources/images/2015/04/16/IMG_2455.JPG)
[![IMG_2457.JPG](/blog/resources/images/2015/04/16/IMG_2457.JPG)
[![IMG_2458.JPG](/blog/resources/images/2015/04/16/IMG_2458.JPG)

看板の指示通りに歩いていたら、あっさりと県道へと抜けることができ、さらに県道から血の池までの最短ルートとなる登山道の入り口の案内板がありました。
hint7.txtのヤマヒゲナガケンミジンコから血の池が導けていれば、道無き道を進む必要もなく、この看板から血の池へ向かうことができていたかもしれません。

車道へと出たのであとは道なりにバス停へと向かうことにします。
行きに降車した赤城山大洞バス停へは、あの**険しい登山道**を再度通らないといけないため、少し遠回りになりますが、赤城山ビジターセンターへと向かいます。
行きとは逆で、右手に小沼を眺めながら下っていきます。

[![IMG_2461.JPG](/blog/resources/images/2015/04/16/IMG_2461.JPG)
[![IMG_2462.JPG](/blog/resources/images/2015/04/16/IMG_2462.JPG)
[![IMG_2465.JPG](/blog/resources/images/2015/04/16/IMG_2465.JPG)
[![IMG_2466.JPG](/blog/resources/images/2015/04/16/IMG_2466.JPG)
[![IMG_2469.JPG](/blog/resources/images/2015/04/16/IMG_2469.JPG)

ただただ歩き進むだけだったので、何事もなく赤城山ビジターセンターに到着することができました。

<blockquote class="twitter-tweet" lang="ja"><p><a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a> (@ 赤城公園ビジターセンター in 前橋市, 群馬県) <a href="https://t.co/UE7XCVkwDv">https://t.co/UE7XCVkwDv</a> <a href="http://t.co/9EkxDzo5hO">pic.twitter.com/9EkxDzo5hO</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584974440947183616">2015, 4月 6</a></blockquote>

赤城山ビジターセンターは閉まっていたので外のベンチに腰掛けました。

ビジターセンター横に、赤城山公園に関するお得な掲示板がありました。

[![IMG_2477.JPG](/blog/resources/images/2015/04/16/IMG_2477.JPG)

急いで降りてきた甲斐があってか、バスが来るまで1時間も余裕があったので、持って来たコーヒーと板チョコレートで休憩しました。

<blockquote class="twitter-tweet" lang="ja"><p>バスが来るまで1時間あるのでチョコとコーヒーで休憩 <a href="http://t.co/RfTO5ZNJA8">pic.twitter.com/RfTO5ZNJA8</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584980254445305856">2015, 4月 6</a></blockquote>


ここ赤城山ビジターセンターの標高は1365mなため、16:00を過ぎたこの時期は寒く、ダウンジャケットを準備しておいて正解でした。

<blockquote class="twitter-tweet" lang="ja"><p>標高1400mはやっぱり寒い&#10;ダウンジャケット持ってきて正解だったわ</p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584977161729093632">2015, 4月 6</a></blockquote>

チョコレートを食べ終わり、辺りを見回すと霞がかかってきました。

<blockquote class="twitter-tweet" lang="ja"><p>あっやばい霞ががってきた <a href="http://t.co/BK7zs4m0L1">pic.twitter.com/BK7zs4m0L1</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584976787811119105">2015, 4月 6</a></blockquote>

<blockquote class="twitter-tweet" lang="ja"><p>雲のなかにいる <a href="http://t.co/5KVkzmPEp8">pic.twitter.com/5KVkzmPEp8</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584980779408556033">2015, 4月 6</a></blockquote>

<blockquote class="twitter-tweet" lang="ja"><p>雨も降ってきたし10m先見えないし怖い <a href="http://t.co/9mq61pmxK3">pic.twitter.com/9mq61pmxK3</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584987757157617664">2015, 4月 6</a></blockquote>

雨も降ってきて、このままバスが来なかったらどうしようといった不安から、すこし怖くなりました。

バス到着予定時刻になり、赤城山ビジターセンターバス停で待っていると定刻通りにバスがきました。

<blockquote class="twitter-tweet" lang="ja"><p>帰りのバス乗った！！！ これで少なくとも下山できる！！！ <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/584993731985551360">2015, 4月 6</a></blockquote>

帰りのバスにも乗れ、あとは電車に乗って終電までに帰ることができれば、SDカードの捜索は無事終了となります。

しかしわざわざ群馬県まで来たからには、なにか群馬らしいことをして帰りたいなと思いました。

<blockquote class="twitter-tweet" lang="ja"><p>なぜかグンマーにいるのでGunmaっぽい夕食食べて帰ろうかな</p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/585002417697099777">2015, 4月 6</a></blockquote>

群馬の名産が何があるか知らなかったので有識者に聞いてみたところ、luminさんからアドバイスをいただきました。

<blockquote class="twitter-tweet" lang="ja"><p><a href="https://twitter.com/mzyy94">@mzyy94</a> 焼きまんじゅう、ひもかわうどん（桐生）</p>&mdash; lumin (@lumin) <a href="https://twitter.com/lumin/status/585006039528972288">2015, 4月 6</a></blockquote>

**あっ！！！**
hint3.txtに記載のあったひもかわうどんをすっかり忘れてました！

前橋駅に着き、帰路の途中の駅である高崎駅付近のうどん屋さんへと向かうことを決めました。

<blockquote class="twitter-tweet" lang="ja"><p>駅ついたー 命があるぞー <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a> (@ 前橋駅 (Maebashi Sta.) in 前橋市, 群馬県) <a href="https://t.co/8530G2c0RA">https://t.co/8530G2c0RA</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/585014590695669760">2015, 4月 6</a></blockquote>

<blockquote class="twitter-tweet" lang="ja"><p>mondai解いた時にあったひもかわうどんを食しに行かねば <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/585015639519006720">2015, 4月 6</a></blockquote>

<blockquote class="twitter-tweet" lang="ja"><p>よし、高崎のひもかわうどん屋へGo <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/585017858687545344">2015, 4月 6</a></blockquote>

<blockquote class="twitter-tweet" lang="ja"><p>食うぜひもかわうどん <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a> (@ 高崎駅 (Takasaki Sta.) in 高崎市, 群馬県) <a href="https://t.co/tygSOrl8kj">https://t.co/tygSOrl8kj</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/585022094821457920">2015, 4月 6</a></blockquote>

高崎駅に到着した直後にまたも雨に降られてしまいましたが、20分ほどかけてひもかわうどんを扱ううどん屋さんへと歩きました。

<blockquote class="twitter-tweet" lang="ja"><p>ひもかわうどん！！ (@ めんいち in 高崎市, 群馬県) <a href="https://t.co/0C5suZrS3F">https://t.co/0C5suZrS3F</a> <a href="http://t.co/4D65OYc4G3">pic.twitter.com/4D65OYc4G3</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/585027483772289026">2015, 4月 6</a></blockquote>

<blockquote class="twitter-tweet" lang="ja"><p>hint3.txt kanto1 <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a> <a href="http://t.co/ATgu9JllWm">pic.twitter.com/ATgu9JllWm</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/585029832964091904">2015, 4月 6</a></blockquote>

名古屋県民の舌にはきしめんを思い出させる食感で、とてもなつかしい気分になりました。

さあ、これで群馬県に思い残すことはありません。
行きで使わなかった学割証を使って高崎駅からJRで南流山まで行き、そこからつくばエクスプレスに乗ってつくば駅に向かって、SDカードの捜索は終了となります。

<blockquote class="twitter-tweet" lang="ja"><p>さらば群馬県 <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a> (@ 高崎駅 (Takasaki Sta.) in 高崎市, 群馬県) <a href="https://t.co/gWMQTyhwoC">https://t.co/gWMQTyhwoC</a> <a href="http://t.co/zZ4UY6GnbL">pic.twitter.com/zZ4UY6GnbL</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/585037725440565248">2015, 4月 6</a></blockquote>

<blockquote class="twitter-tweet" lang="ja"><p>帰路のJR乗った <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/585040578011762688">2015, 4月 6</a></blockquote>

<blockquote class="twitter-tweet" lang="ja"><p>帰路の電車で原因不明の停止信号受信でパンダグラフ下ろしたそうで電車内真っ暗とかもう、もう <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/585043902886846464">2015, 4月 6</a></blockquote>

<blockquote class="twitter-tweet" lang="ja"><p>我が家に帰ってきたような安心感 <a href="https://twitter.com/hashtag/SDcardFindingBattle?src=hash">#SDcardFindingBattle</a> (@ つくば駅 (Tsukuba Sta.) in つくば市, 茨城県) <a href="https://t.co/1RrtayjBUG">https://t.co/1RrtayjBUG</a></p>&mdash; えびと犬と柚子胡椒みっきー (@mzyy94) <a href="https://twitter.com/mzyy94/status/585085754847719425">2015, 4月 6</a></blockquote>

## 費用

SDカードがあった現地まで出向きたいという方のために、参考までにつくば駅から血の池までの往復でかかった運賃を記しておきます。

区間          | 種別  | 運賃
:------------------:|:-----:|-----:
つくば→流山おおたかの森 | つくばエクスプレス | 720
流山おおたかの森→足利市 | 東武鉄道 | 885
足利市→足利 | 徒歩 | 0
足利→前橋 | JR | 756
前橋駅→富士見温泉 | 関越交通バス | 600
富士見温泉→赤城山大洞| 関越交通バス | 1200
赤城山ビジターセンター→富士見温泉 | 関越交通バス | 1200
富士見温泉→前橋駅 | 関越交通バス | 600
前橋→高崎 | JR | 195
高崎→南流山 | JR(学割) | 1550
南流山→つくば| つくばエクスプレス | 822

計8,528円でした。所要時間は、9:24につくば駅発の電車に乗って23:24につくば駅に戻ってくることから、
ギリギリの行程で行く場合は、14時間ほどかかる（＝ほぼ丸一日）ということになります。


## SDカードのmondai

SDカードを手に入れておしまいではありません。SDカードの中にあるmondai10.tcを開かないことには最終面接へ挑むことができません。
とりあえずAutopsyにSDカードを読ませてみます。


![autopsy-mondai10](/blog/resources/images/2015/04/16/autopsy-mondai10.png)

意外と簡単に問題ファイルが浮上してきました。
削除された0バイトのファイルがあり、そのファイル名は「山名＋最高点の標高を英数字で９文字.txt」となっていました。

登山した赤城山は標高1828mなので、**akagi1828**がmondai10.tcのパスワードだと思われます。

TrueCryptでmondai10.tcを**akagi1828**をパスワードとしてマウントすると、見事イメージをマウントすることができました。


![mount-mondai10](/blog/resources/images/2015/04/16/mount-mondai10.png)


マウントしたイメージには何があったでしょうか。

![final-mondai](/blog/resources/images/2015/04/16/final-mondai.png)

<pre style="border:none; color:inherit; background-color:inherit;">
＿人人人人人人人＿
＞　答え.txt　＜
￣Y^Y^Y^Y^Y^Y￣
</pre>

# 感想

mondai9までは日々の隙間時間を使い、少々躓きながらもなんとか時間をかけて解くことができました。
しかし、mondai10がここまで大変であるとは思っていませんでした。
同じ関東だからと舐めてかかっていたために、ギリギリの乗り換えや予想外の雪道に遭遇してつらい思いをしました。
しかし、マイナビに登録してエントリーするなどの就職活動をし、一次選考と二次選考を通過して最終面接に挑む方々と比べると、
雪道を這い上がるなど、苦労の量は比較的少ないようにも思えます。
このようなmondaiを通して就職の機会を与えてくれたネットエージェントさんに感謝するばかりです。

いろいろなmondaiに挑むことで、いろいろな答えを見つけるセンスを身につけられたかと思います。
このような問題を見つけることがあれば、みなさん是非とも挑戦して技量を高めてみてください。

<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
<script>
var a = document.querySelectorAll('a[href$=".JPG"]')
for(var i = 0; i < a.length; i++){a[i].target = "_blank"}
</script>
