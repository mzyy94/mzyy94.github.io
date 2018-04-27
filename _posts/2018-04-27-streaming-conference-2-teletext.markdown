---
title: "Streaming Conference #2 -TELETEXT-"
date: 2018-04-27 20:00:00 +0900
published: true
categories: web
tags: streaming teletext
---

こんにちは、Feneecエバンジェリストです。
最近暇で暇でしょうがないので何かアウトプットしようと、先日[Streaming Conference #2](https://streaming-lab.connpass.com/event/79586/)にてLTをしてきました。
表題は**# TELETEXT**で、字幕放送についてご紹介しました。

動画のストリーミングサービスはインターネットでは常に注目され続けている技術の中心に位置するものです。
動画というとビデオとオーディオの二つのみを指すことがほとんどですが、動画配信においては忘れてはいけないのがテレテキスト、字幕放送です。
地上デジタル放送でも字幕放送によって演者の話し声を文字情報として伝えるものがいくつかありますが、インターネット動画ストリーミングにおいては忘れられている存在にも思える2018年。
そんなテレテキストについて少しでも興味を持ってもらおうと、いくつがWebにおける字幕放送の表現の例をご紹介してきました。

<!-- more -->

<iframe src="//www.slideshare.net/slideshow/embed_code/key/pEWSFoKd193PBq" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/mzyy94/teletext-95201437" title="# TELETEXT" target="_blank"># TELETEXT</a> </strong> from <strong><a href="https://www.slideshare.net/mzyy94" target="_blank">Yuki Mizuno</a></strong> </div>

発表スライドはこちらになりますが、当日発表したものとは若干異なります。
というのも、発表スライドには&lt;video&gt;タグが使え、背景に動画のライブストリーミングを流しながら行うため、[Spectacle](https://github.com/FormidableLabs/spectacle/)というWebプレゼンテーションフレームワークを使いました。
Reactコンポーネントで記述でき、後から気づいたのですがPDFでの出力もきれいなのでおすすめです。
そのPDF出力で書き出したスライドをSlideshareにあげました。

この発表時にご紹介したWebVTTによるテレテキストのデモについて解説します。


## EXAMPLE 1 -字幕放送-

<iframe src="//www.slideshare.net/slideshow/embed_code/key/pEWSFoKd193PBq?startSlide=6" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/mzyy94/teletext-95201437" title="# TELETEXT" target="_blank"># TELETEXT</a> </strong> from <strong><a href="//www.slideshare.net/mzyy94" target="_blank">Yuki Mizuno</a></strong> </div>

はじめに例としてあげた字幕放送はスライド6ページ目で、一般的なWebメディアにおける黒背景白文字の音声字幕と地上デジタル放送のような演者ごとに色分けされた字幕放送の表現についての紹介をしました。
前途の通りSpectacleを用いてWebページとして行なったのはこの例を見せるためでもあり、WebページにYouTubeの動画を埋め込みたかったからです。
このデモでは動画に流れる音声の文字起こしをし、タイミングを合わせてクローズドキャプショントラックとして表示していました。
デモのために用意した字幕は以下の通りです。ちなみにSafariでしか動作確認してません。

```html
WEBVTT

00:00:00.500 --> 00:00:02.500 line:90%
<c>けものフレンズ</c>

00:00:04.000 --> 00:00:06.500 line:90% align:start position:30%
<c>♪ 〜</c>

00:00:08.500 --> 00:00:11.500 line:90%
<v bag>(かばん) どこ　ここ？　うわ〜！

00:00:11.500 --> 00:00:13.500 line:90%
<v serval>(ｻｰﾊﾞﾙ) そこだ〜！

00:00:13.500 --> 00:00:14.800 position:80% line:90%
<v bag><ruby>食<rt>た</rt></ruby>べないでくださ〜い！

00:00:14.800 --> 00:00:16.500 position:30% line:90%
<v serval>た　<ruby>食<rt>た</rt></ruby>べないよ！

00:00:16.000 --> 00:00:17.900 line:60%
<v bag>サーバル…さん。

00:00:17.900 --> 00:00:21.000 position:60% line:80% align:end
<v serval>ここは ｼﾞｬﾊﾟﾘﾊﾟｰｸ だよ！
<ruby>私<rt>わたし</rt></ruby>はｻｰﾊﾞﾙ！

00:00:21.000 --> 00:00:24.000 position:60% line:80% align:end
<v serval>この<ruby>辺<rt>へん</rt></ruby>は　<ruby>私<rt>わたし</rt></ruby>のﾅﾜﾊﾞﾘなの
```

このファイルを.vttファイルに保存し、HTML5ビデオの&lt;track&gt;タグにて指定してあげると、動画に文字を表示することができます。
WebVTTの`<v>`タグで、演者の指定を行っています。
このままだと位置はWebVTTの`position`<wbr/>や`line`、<wbr/>`align`<wbr/>属性で指定したとおりとなりますが、文字色は演者によって変わらず同じ色なので、指定してあげる必要があります。
WebVTTの特徴にあげたCSSのサポート（一部）によって、&lt;v&gt;タグで指定した演者属性で色分けすることができます。

```css
@font-face {
    font-family: '和田研中丸ゴシック2004絵文字';
    src: url(wlcmaru2004emoji.ttf);
}
video::cue {
    font: 1.1em/1.4 '和田研中丸ゴシック2004絵文字';
}
video::cue(c) {
    font-family: 'Hiragino Kaku Gothic ProN';
    background: -webkit-linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5));
}
video::cue(v[voice="bag"]) {
    color: cyan;
}
video::cue(v[voice="serval"]) {
    color: yellow;
}
```

WebVTTの策定は紹介した通りまだドラフト段階であることから、ブラウザ実装は不安定で、例えば背景の色指定はrgba()単体では指定できず、グラデーションやテクスチャなどに変えてからじゃないとダメだったり、ルビがおかしかったりします。
現状でもルビの使用や背景色にこだわったりしなければ、十分実用できるでしょう。正式版になるころには地上デジタル放送と同様の字幕放送が楽に実装できるようになると思うと、今後が楽しみになること請け合いです。

## EXAMPLE 2 -KARAOKE-

<iframe src="//www.slideshare.net/slideshow/embed_code/key/pEWSFoKd193PBq?startSlide=11" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/mzyy94/teletext-95201437" title="# TELETEXT" target="_blank"># TELETEXT</a> </strong> from <strong><a href="//www.slideshare.net/mzyy94" target="_blank">Yuki Mizuno</a></strong> </div>

スライド11ページ目で紹介したWebVTTによるカラオケデモです。__JavaScriptを一切用いずに__、動画上にカラオケのように歌詞を表示することができます。ちなみにSafariでしか動作確認してません。

```html
WEBVTT

0 - Title 
00:00:00.000 --> 00:00:01.800 line:50%
<c.title>ようこそジャパリパークへ</c>

0 - Info
00:00:00.000 --> 00:00:01.800 line:90% align:right
作詞　大石昌良
作曲　大石昌良

00:00:01.800 --> 00:00:08.000 line:6 position:5% align:left
<00:00:03.200><c>Wel</c><00:00:03.300><c>come</c><00:00:03.600><c> to</c><00:00:03.800><c> よ</c><00:00:04.000><c>う</c><00:00:04.300><c>こそ</c><00:00:04.500><c>ジャ</c><00:00:04.800><c>パリ</c><00:00:05.000><c>パーク！</c>

00:00:03.600 --> 00:00:13.000 line:8 position:25% align:left
<00:00:05.600><c>今日</c><00:00:05.800><c>も</c><00:00:06.200><c>ドッ</c><00:00:06.500><c>タン</c><00:00:06.800><c>バッ</c><00:00:07.100><c>タン</c><00:00:07.500><c>大</c><00:00:08.200><c>騒</c><00:00:08.800><c>ぎ</c>

00:00:11.000 --> 00:00:15.500 line:6 position:15% align:left
<00:00:13.200><c>うー!</c><00:00:13.900><c>がぉー!</c>

00:00:13.200 --> 00:00:19.000 line:8 position:25% align:left
<00:00:14.700><c>高</c><00:00:15.000><c>ら</c><00:00:15.200><c>か</c><00:00:15.500><c>に</c><00:00:15.900><c>笑</c><00:00:16.100><c>い</c><00:00:16.300><c>笑</c><00:00:16.700><c>え</c><00:00:16.900><c>ば</c><00:00:17.300><c> フ</c><00:00:17.500><c>レ</c><00:00:17.700><c>ン</c><00:00:17.900><c>ズ</c>

00:00:16.000 --> 00:00:22.000 line:6 position:15% align:left
<00:00:18.600><c>(フ</c><00:00:18.800><c>レ</c><00:00:19.000><c>ン</c><00:00:19.200><c>ズ)</c>

00:00:19.800 --> 00:00:26.000 line:9 position:15% align:left
<00:00:23.800><c>喧嘩して すっちゃかめっちゃかしても</c>
```

今回は[ようこそジャパリパークへ](https://www.youtube.com/watch?v=xkMdLcB_vNU)の歌詞を引用してご紹介します。ノリのよい曲調でテンポの良い歌詞で気に入ってます。上記歌詞に引用した*高らかに笑い笑えばフレンズ*の部分は特に現代社会を生きる日本人に足りない精神だとも言えます。

<iframe src="//tools.applemusic.com/embed/v1/song/1198924324?country=jp&amp;at=1l3v4mQ" height="110px" width="100%" frameborder="0"></iframe>

WebVTTには、テキストにタイムスタンプタグを打ち込むことによって、動画の時間と同期してタグの前後に属性の変化が起こります。それを用いて、CSSで色付けをおこなうことで、カラオケのように時間に沿った文字の変更をJavaScriptなしで実現しています。

```css
video::cue {
    font-family: 'Hiragino Kaku Gothic ProN';
}
video::cue(.title), video::cue(:past), video::cue(:future) {
    font-family: 'Hiragino Mincho ProN';
}
video::cue(.title) {
    color: lightblue;    
    font-size: 1.6em;
}
video::cue(:past) {
    color: red;
}
video::cue(:future) {
    color: white;
}
```

タイムスタンプタグのある`::cue`擬似要素には`:future`擬似クラスが当てられ、指定した時刻をすぎるとそれ以前の部分には`:past`に変化します。それぞれの擬似クラスに対して文字色を指定することで、このようにカラオケ風な表示をしています。
ドラフト仕様のためか、タイムスタンプタグの擬似クラスを適用するには要素で囲む必要があるようで、`<c>`スパンタグで囲んでますが、これのせいもあって作るのに半日かかりました。
しかしJavaScriptなしでこのような面白い表現ができるのは、Webメディアにおけるテレテキストの未来を感じさせてくれること間違いなしですね。

<!--
> メモ：歌詞の著作権と著作権協会について
> 
> 今回引用した歌詞は主の分量に対して従としての関係が成り立つ程度であり、かつ権利者の記載もしております。
> また、楽曲に関するとある著作権協会が世には存在しますが、この歌詞の権利者は当該協会に著作権管理を委託していないこと記しておきます。
-->

## EXAMPLE 3 -LIVE comment-

<iframe src="//www.slideshare.net/slideshow/embed_code/key/pEWSFoKd193PBq?startSlide=16" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/mzyy94/teletext-95201437" title="# TELETEXT" target="_blank"># TELETEXT</a> </strong> from <strong><a href="//www.slideshare.net/mzyy94" target="_blank">Yuki Mizuno</a></strong> </div>

最後に紹介したのは背景に流した動画にテレテキストを取得させ、スライド上にライブコメントを流すというもの。プレゼンテーション中に[#streamingconf](https://twitter.com/hashtag/streamingconf)で呟かれたものを取得して流していましたが、ツイ廃のせいか、Twitter APIを叩くと頻繁に**420 Exceeded connection limit for user**エラーが出て取得がうまくいかなかったりしていました。
ストリーミング勉強会での発表なので上記2つのようなオンデマンド配信に対するテレテキストのデモだけではなく、ストリーミング動画に対してもテレテキストは面白い使い方ができるということをご紹介した形となります。
このデモでは前途の通り動画中にテレテキストを表示するのではなく、動画からとりだしてJavaScriptでHTML要素としてスライド中に表示しました。
Slideshareにあげたスライド15ページ目で紹介したのですが、残念ながらライブであるという都合に加え背景動画のPDF化ができなかったため、実際の表示は想像で補ってください。

Webでの動画ストリーミングの形式はいろいろあるのはご存知の通りですが、今回はSafariでプレゼンテーションを行ったため、[HLS](https://tools.ietf.org/html/rfc8216)を用いてコメントを流しました。
HLSではビデオやオーディオだけではなく、テレテキストもストリーミングできるというのは意外と知られていなかったりします。しかもライブで。

配信方法はHLSの動画をセグメント単位で切り出して行うのと同様に、メディアプレイリストを作成してテレテキストもセグメント単位で送り出してあげることでできます。

![Diagram](/blog/resources/images/2018/04/27/diagram.svg)

HLSの仕様でも[WebVTTが扱えることが記されて](https://tools.ietf.org/html/rfc8216#section-3.5)おり、動画とタイミングを同期するため、`X-TIMESTAMP-MAP`メタデータをWebVTTに追記することなどが書かれています。
いろいろ試行錯誤した結果、このメタデータの指定にはMPEG-2 timeを記載する必要があるのと、ライブで字幕を取得するためには動画セグメントが等間隔でないとうまくいかなかったりしたので、今回はfMP4ではなくMPEG-TSでの配信をしました。
ほんとはHEVC使いたかったんだけどね。
動画は事前に撮影したものをエンコードし、[mediafilesegmenter](https://developer.apple.com/streaming/)でちょうど4秒ごとにTSに切り出したものを、Liveでプレイリストに入れて読み込むようにしておきました。

各プレイリストとWebVTTは以下のような感じで配信していました。バックエンドはGoで、[mux](https://github.com/gorilla/mux)と[anaconda](https://github.com/ChimeraCoder/anaconda)と[m3u8](https://github.com/grafov/m3u8)を用いています。

### master.m3u8
```yaml
#EXTM3U
#EXT-X-VERSION:6
#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="tweet",NAME="Tweet",DEFAULT=YES,AUTOSELECT=YES,LANGUAGE="ja",URI="subtitle.m3u8"
#EXT-X-STREAM-INF:PROGRAM-ID=0,BANDWIDTH=1024000,SUBTITLES="tweet"
media.m3u8
```

### media.m3u8
```yaml
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-MEDIA-SEQUENCE:28
#EXT-X-TARGETDURATION:4
#EXTINF:4.000,
ts/segment28.ts
#EXTINF:4.000,
ts/segment29.ts
#EXTINF:4.000,
ts/segment20.ts
```

### subtitle.m3u8
```yaml
#EXTM3U
#EXT-X-VERSION:7
#EXT-X-MEDIA-SEQUENCE:28
#EXT-X-TARGETDURATION:4
#EXTINF:4.000,
sub/segment28.vtt
```

### segment28.vtt
```r
WEBVTT
X-TIMESTAMP-MAP=MPEGTS:900000,LOCAL:00:00:00.000

NOTE start 1m52s -> 1m56s

00:01:53.686 --> 00:01:54.686
エンジニア引退しよ...

00:01:53.796 --> 00:01:54.796
退職しました

00:01:54.922 --> 00:01:54.922
あ〜水素の音〜〜

00:01:55.078 --> 00:01:56.078
アイドル相手の示談金いくらだろう
億とかもらえるのかな

```

HTMLで`<video src="live/master.m3u8" playsinline muted autoplay></video>`と書くだけで、HLSが勝手に動画とテレテキストを4秒間隔で取得してきてくれます(Safariでのみ確認済み)。
そう、JavaScriptでコメントを逐一読み込みに行かなくても、ブラウザ側が勝手に読み込んでくれるのです。WebSocketもXHRも使わずに（ただし完全なリアルタイムではなく、今回は4秒の遅延が生じている）。

スライド9ページ目で紹介した通り、WebVTTはVideo要素で扱えるDOM APIが提供されています。それを叩いて動画で表示されるテレテキストをDOMに引っ張ってきて、スライドの上にコメントを流すようにしていました。

```javascript
document.querySelector('video#bg').addEventListener('play', function() {
    const {textTracks} = this // WebVTT track
    if (textTracks.length != 1) {
        console.error("Error: %s", "WebVTT track loading failed.")
        return
    }
    const textTrack = textTracks[0]
    // Set visibility to hidden on video.
    textTrack.mode = 'hidden'
    // WebVTT DOM API event 'cuechange'
    textTrack.addEventListener('cuechange', function() {
        // textTrack.activeCues includes current active subtitle text and more.
        [...this.activeCues].forEach(cue => {
            const {text} = cue
            // Duplication check
            if ([...document.querySelectorAll('.comment')].filter(c => c.innerText == text).length) {
                // Duplicated comment will not be shown.
                return
            }
            document.querySelectorAll('.comment').forEach(c => {
                const rect = c.getBoundingClientRect()
                if (rect.left + rect.width < 0) {
                    // Clear invisible comment from DOM.
                    c.parentElement.removeChild(c)
                }
            })
            // Get all comment lines of visible comments.
            const commentLines = [...document.querySelectorAll('.comment')].map(c => c.style.animationName)
            // Find available comment line on view.
            const available = [...Array(12)].map((_,i) => `line${i}`).filter(l => !commentLines.includes(l))
            if (!available[0]) {
                // No placeable comment line available; skip this comment
                return
            }
            const s = document.createElement('span')
            s.className = 'comment'
            s.innerText = text
            s.style.animationName = available[0]
            document.querySelector('#screen').append(s)     
        })
    }, false)
})
```

<!--
> メモ: 動画にコメントを流す知的財産とかで突っ込まれた話
>
> プレゼンテーションスライドにコメントを流しています。
-->

## まとめ

いかがでしょうか。テレテキストの可能性や重要性に気づいてもらえたら嬉しいです。
もっと字幕放送を使ったWebストリーミングサービスが増えたらいいな。
