---
title: "TDUCTF 2015の運営をした話"
date: 2015-09-18 01:33:16 +0900
categories: ctf
tags: tductf electron react lepusctf
image: /blog/resources/images/2015/09/18/tductf-frontend.png
---
みなさんご参加ありがとうございます。
存じ上げている方もたくさんいらっしゃると思いますが、先月末の日曜日にTDUCTF 2015なるものが開催されました。

[**TDUCTF 2015 - connpass**](http://connpass.com/event/17306/)

前回開催が3月末にあったのですが、所要で参加できないことがわかり、悔しさからネットワーク系のCTF問題を作って提供しました。


<iframe src="//www.slideshare.net/slideshow/embed_code/key/FxTJmR5D9IePUk?startSlide=14" width="425" height="355" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/nomuken/ss-46568790" title="メインスライド" target="_blank">メインスライド</a> </strong> from <strong><a href="//www.slideshare.net/nomuken" target="_blank">nomuken</a></strong> </div>

そのとき運営陣の@nomuken氏からの「次回は問題作成だけではなく運営陣に加わっていっしょに盛り上げよう」との提案を受け、
今回TDUCTF 2015にて運営側に立つこととなりました。

さて、具体的に運営として何をしてきたかの記録を以下に述べますが、後半には問題のネタバレなどを含んでおります。ご注意ください。


<!-- more -->


# フロントエンドアプリケーションの作成

TDU CTF 2014 Satellite in ConoHaが無事終了し、次回開催に向けての話が始まりだした時に運営の方々の仲間に入り、どのようにして準備していくかなどの議論をはじめました。
その議論の最初の議題は毎度フルスクラッチなスコアサーバーをどうしようかというものでした。
常設CTFや有志で行われてるオンサイトCTFで*イケてるスコアサーバー*を見かけないのを悲しく思い、Web開発全然得意じゃないのにも関わらず、

**「俺がイケてるCTFスコアサーバー作るよ」**

などと言ってしまいました。

すんなりと「お、じゃあお願いするね」と言われて開発することになったのですが、イケてるスコアサーバーはWebフロントエンド部分のことを指しており、
サーバーサイドは別で他のメンバーが開発する、分業となりました。

さて、困った。作ると言い出したものの最近のWebのトレンド知らないしTwitter Bootstrap・jQueryアレルギーだしどうしたものか、と。

まだ開催まで時間あるしとりあえずトレンド調査だけしておこうと思い、いろいろ調べるだけ調べて放置していました。

時は流れ、TDUCTF 2015開催２週間前。

Slackに流れる「フロントエンドの進捗どうですか？」の文字列。
手元のソースコードリポジトリで`git log`をしてみたところ、

```
fatal: bad default revision 'HEAD'
```

アカン。


その日から睡眠時間を削り、圧倒的進捗率を叩き出すべく腱鞘炎になりながらもコードを書き続けました。

コミットはゼロでも頭の中に構想は練ってあったので、あとはキーボードを叩きまくるだけという状態になっていたものの、
時間が足りない上に睡眠不足でタイポするわで結構大変でした。

トレンド調査で、[React](https://facebook.github.io/react/)+[Flux](https://facebook.github.io/flux/)の構造を軸に、見た目は[Semantic UI 2](http://semantic-ui.com/)で整え、[Electron](http://electron.atom.io/)で単一アプリケーション化するのがモダンでイケてる感じであるとわかったので、これらを用いて組み立てていくことにしました。
Electronでアプリケーション化したのは、「今までにないイケてるCTFスコアサーバー」の形を実現する目的に加えて、「マルチブラウザ対応に追われる時間をゼロにする」目的もありました。結果として、Internet Explorer（CTF参加者に利用者はいるのだろうか？）などのへの対応のためにバッドノウハウを使わなくて済みました。

途中Flux部分にしっくりくるものがなく、[Redux](http://rackt.github.io/redux/)に変更するまでに時間を要したものの、2週間ぶっ通しの突貫工事でなんとか、開催までに"形にする"ことができ、参加者に楽しんでいたくことができたと思います。

開催までは非公開で管理していたのですが、オープンソースで公開するとの話があったので、現在はGitHubにて公開しています。

[lepus-ctf/lepus-frontend · GitHub](https://github.com/lepus-ctf/lepus-frontend/)

詳しい開発秘話はしないので、苦労は上記リポジトリのコミットログから察してください。

# 問題作成

CTFの主軸となる問題作成に関しての話です。
ネタバレが含まれるので問題を解きたい人はお気をつけを。

CTFの運営として参加しているので、問題の作成はほぼ必須なのですが、なにせフロントエンドアプリケーションの作成に追われていて、
「案はあるけど作ってる暇がない」ということとなってしまい、少ししか用意できませんでした。
問題案などはストックできてるので次回開催時に登場する予定です。

用意した問題は一部を除いて以下のサイトで公開しています。

[ctf.mzyy94.com](http://ctf.mzyy94.com)

問題の作成意図と簡単な想定解法を紹介します。
あと、TDUCTF 2015は初心者歓迎を掲げて開催してたので、プロ向けの問題はあまりありません。

## Keygenerator

[http://ctf.mzyy94.com/q/TDUCTF2015-BIN200/](http://ctf.mzyy94.com/q/TDUCTF2015-BIN200/)

問題文: 実行してフラッグをゲットせよ！


この問題は、与えられた実行ファイルを実行しろというものです。
libprintkey.soという自作共有ライブラリとkey_generatorという実行アプリケーションが渡されるのですが、
普通にアプリケーションを実行したりデバッグしてもフラグは得られません。

作成意図としては、「共有ライブラリも単体実行可能」という点に気づいて、
問題文の「実行して」のとおりに共有ライブラリに実行可能フラグを立てて、
`./libprintkey.so`とすれば、フラグが出力されるようになっていました。

gdbなどでkey_generatorをデバッグしてた方から、「あるべきところにフラグがないがどういうことなのか？」という質問がありましたが、
すいません、そっちじゃなかったんです。

単純に実行してフラグを得られるため初期の想定では100点問題になるとしていたのですが、
配点会議でライブラリの単体実行するポイントに気づかない人も多いかもしれないとのことで、200点に引き上げられました。

## devnull

[http://ctf.mzyy94.com/q/TDUCTF2015-BIN250/](http://ctf.mzyy94.com/q/TDUCTF2015-BIN250/)

問題文: Usage: ./devnull > /dev/null

実行すると、標準出力を/dev/nullにリダイレクトしてくれとUsageが出てきて、
そのとおりに実行すると、/dev/nullにフラグが出力されるというものです。

リダイレクト先をパスで判定しているので、/dev/nullを適当なブロックファイルに差し替えるか、
gdbでブレイクポイントを仕掛けたり、ltraceとかで処理を追って、出力される部分を覗き見できればフラグが得られます。

gdbの使い方に慣れてほしいという願いを込めて作っていたので、想定していた解法は以下のとおりです。

```
$ gdb ./devnull
(gdb) b printf
(gdb) r > /dev/null
(gdb) i r
(gdb) x/s $rsi
```


## 「名前が変えられいるってことで間違いないな」

[http://ctf.mzyy94.com/q/TDUCTF2015-MISC200/](http://ctf.mzyy94.com/q/TDUCTF2015-MISC200/)

問題文: password:password

問題には拡張子がjpgのファイルが付属しています(JPEGファイルとは言っていない)。

CTFに必要なググり力を問うための問題で、問題タイトルを検索ワードにググると、
ほこ×たてのハッキング対決に関する記事がいくつかヒットします。
ほこ×たて内では 「名前が変えられいるってことで間違いないな」は「TrueCryptで暗号化されている」のことを指しているという記事が見つかるので、
添付のファイルをTrueCryptを用いてパスワードにpasswordを指定してマウントすると、フラグが出てきます。

## Portscan

[http://ctf.mzyy94.com/q/TDUCTF2015-NW500/](http://ctf.mzyy94.com/q/TDUCTF2015-NW500/)

問題文: ポートスキャンが仕掛けられた！ん？何かメッセージがついてきているぞ？

UDPポートスキャンを観測したpcapファイルが渡されます。
UDPのペイロードに1バイトずつメッセージがついてきてるのでそれを抽出してあげるとフラグが取得できる問題です。

この問題は、WiresharkのFollow UDP Streamですぐに答えが出るようではひねりがないと思い、
tcpdumpやtsharkのオプションを覗いたり他のパケット解析ツールを使ってほしいという想いを込めて作成しました。
なので、Wiresharkで解くことはほとんど不可能です。

想定していた解答方法は以下のとおりです。
最初は100点くらいの配点にしようとしていたのですが、配点会議で「これはわからん」と言われ急遽500点まで引き上げられました。

```bash
printf $(tcpdump -r secretmsg.pcap -x 'udp' | grep 0x0010 | perl -pe's/^.*(..)00 0000\n$/\\x\1/')
```

## Lucky 7

この問題はサーバーにアクセスするタイプのネットワーク問題なのでオンサイトでしか用意しておらず、現在は公開していません。
問題内容は、netcatでアクセスすると以下のような表示が返ってくるものです。

```
Challenge!
2187123 != 77777777
```

左辺にある数字が77777777と等しくなるようにアクセスするとフラグが降ってくるのではないかとピンとくる人もいれば、
ランダムに変化するからBruteforceで解こうする人もいたりと、サーバーを監視していてなるほどと感じることが多かったです。
この左辺の数字は、サーバー側が`Challenge!`を返す際のAcknowledge Numberになっており、ここが77777777になっていないためにエラーが返されているのです。
Wiresharkなどで監視しながらアクセスしていたひとは、この関連性がわかったとおもいます。

Sequential Numberをいじれるhping3やScapyに触れてもらおうという願いを込めて作成しました。
解法としてはそれらを用いて、3-way handshakeが終了した時点のSequential Number(= サーバーがChallenge!を返す際のAcknowledge Number)が77777777になるようにコネクションを張り始めるようにすれば、フラグが返ってくるというものでした。


## moneyscript

[http://ctf.mzyy94.com/q/TDUCTF2015-MISC400/](http://ctf.mzyy94.com/q/TDUCTF2015-MISC400/)

問題文: 6a29585444557b426974636f696e21426974636f696e21426974636f696e217d

moneyscriptシリーズの1問目です。こちらは簡単な方です。
moneyscriptのmoneyが指すのはBitcoinで、このシリーズの問題はBitcoin Scriptを実行して答えを得る問題となっています。
1問目は優しめに作ってあり、適当にデコードすればフラグが得られるよになっていますが、Bitcoin Scriptとは何かを理解してほしく作成しました。

Googleで検索するとBitcoin ScriptのWikiがヒットします。

[Script - Bitcoin Wiki](https://en.bitcoin.it/wiki/Script)

このWikiにしたがって問題文のBitcoin Scriptが意味するところを先頭から照らしていくと、

- 0x6a = OP_RETURN
- 0x29 = 41バイト確保

それ以降は文字コードの16新表記となっています。

なので、適当にデコードするだけでフラグが出てきてしまいますが、Bitcoin Scriptの仕組みを知ってもらえたらとおもい、作成しました。

## moneyscript!!!

[http://ctf.mzyy94.com/q/TDUCTF2015-MISC600/](http://ctf.mzyy94.com/q/TDUCTF2015-MISC600/)

問題文は上記リンクから閲覧ください。


こちらは難しい方のBitcoin Script問題です。
先ほどのWikiにアクセスできていれば、照らしあわせて脳内で実行すればいいのですが、
少々骨の折れるものなので、Bitcoin Scriptを扱えるアプリケーションを使う必要が出てきます。

任意のアプリケーションを使って解いてもらえればいいのですが、
Node.jsのモジュールに、[bitcore](http://bitcore.io/)というモジュールがあるので、それを用いて以下のように実行するなどして、フラグを取得できます。

```javascript
var bitcore = require('bitcore');
var Script = bitcore.Script;
var code = '4c0155828f635e76937367595294687b736b7c6c938f618fa76b4c0222ea6c';

var buffer = new Buffer(code, 'hex');
var interpreter = Script.Interpreter();

interpreter.script = new Script(buffer);
interpreter.evaluate();

var first_stack = interpreter.stack.pop();
var hex_string = first_stack.toJSON().data.map(function(x) {
	return x.toString(16);
})

var flag = 'TDU{' + hex_string.join('') + '}';

console.log(flag);
```

# 開催について


フロントエンドアプリケーションの作成がギリギリだったがために、RESTサーバーのテストが十分にできず、運営陣には多くの迷惑をかけてしまいました。
また、フロントエンドアプリケーション側もテストが追いつかず、バグだらけで配布してしまったがために、当日は問題の添付ファイルが破損していたり、
カウントダウンが正常に機能しないなどのバグを発生させてしまい、参加者各位にも大変に迷惑をかけてしまいました。
その節は申し訳ありませんでした。

TDUCTF 2015終了後、反省会をオンラインで開催していた頃に「TDUCTF」という名称を変更しようという話が立ち上がり、
よくわらかないテンションでドメインから何から整え新名称に改称しました。

<blockquote class="twitter-tweet" lang="ja"><p lang="ja" dir="ltr">TDUCTFからLepusCTFの移行で面白いのは4&#10;・新名称考案&#10;・サーバー確保&#10;・ドメイン取得&#10;・GitHub移行&#10;・Webサイト作成&#10;・アイコン作成&#10;・Twitter移行&#10;を4時間以内でやったというところ <a href="https://twitter.com/hashtag/lepusctf?src=hash">#lepusctf</a></p>&mdash; 友利奈緒 (@mzyy94) <a href="https://twitter.com/mzyy94/status/638606548818726912">2015, 9月 1</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

ということなので、今後はTDUCTFあらため、[LepusCTF](http://lepus-ctf.org/)をよろしくお願いします。

