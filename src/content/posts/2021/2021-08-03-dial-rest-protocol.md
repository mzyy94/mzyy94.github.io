---
title: "DIALというネットワークプロトコル"
date: 2021-08-03T09:30:00+09:00
categories: ["Network"]
tags: ["upnp", "dial", "ssdp", "chromecast"]
image: "/assets/images/2021/08/03/dial-launch-demo.png"
---


家庭のネットワークの監視システムからDIALなるプロトコルが暴れていてアラートが飛んできたので調査しました。

<!-- more -->
{% include toc %}

## 日頃の監視と増えた謎のリクエスト

自宅のシステムを管理する上で、ネットワーク監視は重要なものと言えます。
そんな監視システムが異常を検知したと言うのでパケットを見てみると、ある日を境に自宅ネットワークに何やら見慣れないものが大量に流れ始めていました。

![Network Monitoring](/assets/images/2021/08/03/monitoring-multicast.png)

`M-SEARCH * HTTP/1.1`で始まるUDPパケットから見慣れたUPnP(Universal Plug and Play)の探索リクエストというのはわかるのですが、これが今まで以上に飛び交うようになっていたのです。
リクエストの中身には、`urn:dial-multiscreen-org:service:dial:1`というリソース名（URN）を持っていることがわかります。

[Universal Plug and Play - Wikipedia](https://ja.m.wikipedia.org/wiki/Universal_Plug_and_Play)

## オープンDIALプロトコル

このURNが示すものとは一体何なのか、日本語での解説は唯一、Amazonの開発者向けサイトに記載がありました。


> ### DIALについて
> Amazon Fire TVデバイスは、Whisperplayサービスを介してDIAL（Discovery-and-Launch）プロトコルをサポートします。DIALは、別のデバイスからセカンドスクリーンアプリを使用してFire TV対応アプリを検出し起動できるようにするオープンプロトコルです。そのためには、Fire TVとセカンドスクリーンデバイスが同じネットワークに存在する必要があります。
>
> DIALは、キャスティングやミラーリングの機能を提供するAPIではありません。セカンドスクリーンデバイスのアプリがFire TVでアプリを見つけて起動できるようにするだけです。通常は、セカンドスクリーンアプリ（起動メッセージの送信側）と、対応するファーストスクリーンアプリであるFire TV対応アプリ（メッセージの受信側）の両方を実装します。

引用元: [DIALの統合 \| Amazon Fire TV](https://developer.amazon.com/ja/docs/fire-tv/dial-integration.html#about-dial)


なるほど、Fire TVなどのスマートテレビデバイスにあるアプリケーションを検出して起動するためのオープンなプロトコルであるとのことです。
DIAL公式サイトでプロトコル仕様のPDFが提供されていました。

[DIAL —DIscovery And Launch— \| www.dial-multiscreen.org](http://www.dial-multiscreen.org/) 

## DIALを喋る相手を突き止める

しかしながら、我が家にはFire TVはありません。一体どのデバイスがこのDIALを喋るようになってしまったのでしょうか。
仕様書を読みながら簡単に検出スクリプトを書いて実行してみます。

{% gist aa25615639fd3466d37bac7da204778e discover-dial.py %}

これを実行すると、標準出力には次のような内容が出力されました。

```
HTTP/1.1 200 OK
LOCATION: http://192.168.181.222:56790/dd.xml
CACHE-CONTROL: max-age=1800
EXT:
BOOTID.UPNP.ORG: 1
SERVER: Linux/2.6 UPnP/1.0 quick_ssdp/1.0
ST: urn:dial-multiscreen-org:service:dial:1
USN: uuid:82152303-4d0c-4cba-92e8-9614ee8aff70::urn:dial-multiscreen-org:service:dial:1
WAKEUP: MAC=96:14:ee:8a:ff:70;Timeout=120
```

仕様書と照らし合わせて読むと、HTTPプロトコルで `http://192.168.181.222:56790/dd.xml` に DIALの Device Description があるとわかります。

このURLを開いてみると、次のようになっていました。

![Device Description](/assets/images/2021/08/03/dd-xml.png)

DIALを喋っている子は先日買い替えた75インチテレビのHISENSE-75A6Gでした！
振り返ってみると、ちょうどテレビを買い替えた日からUPnPのマルチキャストパケットが大量発生していました！
インターネットテレビに対応したスマートTVを導入したのが今回が初めてなので、それによって急増したマルチキャストパケットが異常としてアラートに引っかかってしまったのです。

[インターネットテレビ - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%8D%E3%83%83%E3%83%88%E3%83%86%E3%83%AC%E3%83%93)

<a href="https://www.amazon.co.jp/%E3%83%8F%E3%82%A4%E3%82%BB%E3%83%B3%E3%82%B9-4K%E3%83%81%E3%83%A5%E3%83%BC%E3%83%8A%E3%83%BC%E5%86%85%E8%94%B5-75A6G-%E3%83%8D%E3%83%83%E3%83%88%E5%8B%95%E7%94%BB%E5%AF%BE%E5%BF%9C-2021%E5%B9%B4%E3%83%A2%E3%83%87%E3%83%AB/dp/B098JV7JC8?&linkCode=li3&tag=mzyy-22&linkId=6cad0fdb4c7fae0a98487e2a098f2043&language=ja_JP&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B098JV7JC8&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a>

[Amazon \| ハイセンス 75V型 4Kチューナー内蔵 液晶 テレビ 75A6G ネット動画対応 ADSパネル 3年保証 2021年モデル \| テレビ 通販](https://www.amazon.co.jp/%E3%83%8F%E3%82%A4%E3%82%BB%E3%83%B3%E3%82%B9-4K%E3%83%81%E3%83%A5%E3%83%BC%E3%83%8A%E3%83%BC%E5%86%85%E8%94%B5-75A6G-%E3%83%8D%E3%83%83%E3%83%88%E5%8B%95%E7%94%BB%E5%AF%BE%E5%BF%9C-2021%E5%B9%B4%E3%83%A2%E3%83%87%E3%83%AB/dp/B098JV7JC8?&linkCode=ll1&tag=mzyy-22&linkId=a90e349597c856927668ba8438365d19&language=ja_JP&ref_=as_li_ss_tl)

## DIALでNetflixを操作する

DIALプロトコルはNetflixが策定しています。そしてHISENSE-75A6GにはNetflixアプリが搭載されています。
このNetflixがリファレンス実装をしていると想定し、仕様書に書かれている手順を用いてDIALでNetflixを起動してみるとします。

DIALでは先ほどのDevice Descriptionのレスポンスヘッダーにあった**Application-URL:**をベースとして、末尾にアプリケーション名を追加したエンドポイントを**Application Resource URL**と呼び、そこに対してリクエストを行います。
ここで用いるアプリケーション名は、DIAL Registryに登録されていると仕様書に書かれています。

[Application Name/Prefix Registry - DIAL](http://www.dial-multiscreen.org/dial-registry/namespace-database)

早速Netflixのアプリケーション名をDIAL Registryで探したところ、`Netflix`でした。
この`Netflix`とApplication-URLの`http://192.168.181.222:56789/apps/`を合わせた`http://192.168.181.222:56789/apps/Netflix`がエンドポイントとなります。

このエンドポイントを例にとると、Netflixアプリに対して次のような操作が可能となっています。

- `GET /apps/Netflix`: Netflixの情報の取得
- `POST /apps/Netflix`: Netflixの起動
- `POST /apps/Netflix/run/hide`: Netflixの非表示
- `DELETE /apps/Netflix/run`: Netflixの終了

これを踏まえて、DIALでアプリケーションを起動するためのフローは次のようになっています。

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" contentScriptType="application/ecmascript" contentStyleType="text/css" preserveAspectRatio="none" style="background:#0B58A8;" version="1.1" viewBox="0 0 704 398">
<g>
<rect fill="#0B58A8" height="35.6094" style="stroke:#0B58A8;stroke-width:0.0;" width="500" x="106" y="10"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="22" font-weight="bold" lengthAdjust="spacing" textLength="490" x="111" y="35.4209">DIAL REST Service: Application Launch</text>
<rect fill="#0B58A8" height="110.5313" style="stroke:#FFFFFF;stroke-width:1.0;" width="683" x="15" y="99.9063"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;stroke-dasharray:5.0,5.0;" x1="107" x2="107" y1="82.9063" y2="362.9688"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;stroke-dasharray:5.0,5.0;" x1="484.5" x2="484.5" y1="82.9063" y2="362.9688"/>
<rect fill="#0B58A8" height="30.2969" style="stroke:#FFFFFF;stroke-width:1.0;" width="145" x="35" y="51.6094"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="14" lengthAdjust="spacing" textLength="131" x="42" y="71.6045">DIAL REST Service</text>
<rect fill="#0B58A8" height="30.2969" style="stroke:#FFFFFF;stroke-width:1.0;" width="145" x="35" y="361.9688"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="14" lengthAdjust="spacing" textLength="131" x="42" y="381.9639">DIAL REST Service</text>
<rect fill="#0B58A8" height="30.2969" style="stroke:#FFFFFF;stroke-width:1.0;" width="94" x="437.5" y="51.6094"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="14" lengthAdjust="spacing" textLength="80" x="444.5" y="71.6045">DIAL Client</text>
<rect fill="#0B58A8" height="30.2969" style="stroke:#FFFFFF;stroke-width:1.0;" width="94" x="437.5" y="361.9688"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="14" lengthAdjust="spacing" textLength="80" x="444.5" y="381.9639">DIAL Client</text>
<path d="M15,99.9063 L87,99.9063 L87,106.9063 L77,116.9063 L15,116.9063 L15,99.9063 " fill="#FFFFFF" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<rect fill="none" height="110.5313" style="stroke:#FFFFFF;stroke-width:1.0;" width="683" x="15" y="99.9063"/>
<text fill="#0B58A8" font-family="Verdana" font-size="13" font-weight="bold" lengthAdjust="spacing" textLength="27" x="30" y="112.9731">opt</text>
<path d="M489,122.0391 L489,147.0391 L688,147.0391 L688,132.0391 L678,122.0391 L489,122.0391 " fill="#0B58A8" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<path d="M678,122.0391 L678,132.0391 L688,132.0391 L678,122.0391 " fill="#0B58A8" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="13" lengthAdjust="spacing" textLength="178" x="495" y="139.106">Find out if Netflix app exists</text>
<polygon fill="#FFFFFF" points="118.5,169.3047,108.5,173.3047,118.5,177.3047,114.5,173.3047" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;" x1="112.5" x2="483.5" y1="173.3047" y2="173.3047"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="13" lengthAdjust="spacing" textLength="213" x="124.5" y="168.2388">(1) GET &lt;Application-URL&gt;Netflix</text>
<polygon fill="#FFFFFF" points="472.5,198.4375,482.5,202.4375,472.5,206.4375,476.5,202.4375" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;stroke-dasharray:2.0,2.0;" x1="107.5" x2="478.5" y1="202.4375" y2="202.4375"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="13" lengthAdjust="spacing" textLength="68" x="114.5" y="197.3716">(2) 200 OK</text>
<path d="M489,222.4375 L489,247.4375 L629,247.4375 L629,232.4375 L619,222.4375 L489,222.4375 " fill="#0B58A8" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<path d="M619,222.4375 L619,232.4375 L629,232.4375 L619,222.4375 " fill="#0B58A8" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="13" lengthAdjust="spacing" textLength="119" x="495" y="239.5044">Launch Netflix app</text>
<polygon fill="#FFFFFF" points="118.5,269.7031,108.5,273.7031,118.5,277.7031,114.5,273.7031" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;" x1="112.5" x2="483.5" y1="273.7031" y2="273.7031"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="13" lengthAdjust="spacing" textLength="353" x="124.5" y="268.6372">(3) POST &lt;Application-URL&gt;Netflix (optional argument)</text>
<line style="stroke:#FFFFFF;stroke-width:1.0;" x1="107.5" x2="149.5" y1="302.8359" y2="302.8359"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;" x1="149.5" x2="149.5" y1="302.8359" y2="315.8359"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;" x1="108.5" x2="149.5" y1="315.8359" y2="315.8359"/>
<polygon fill="#FFFFFF" points="118.5,311.8359,108.5,315.8359,118.5,319.8359,114.5,315.8359" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="13" lengthAdjust="spacing" textLength="256" x="114.5" y="297.77">Launch Netflix app w/optional argument</text>
<polygon fill="#FFFFFF" points="472.5,340.9688,482.5,344.9688,472.5,348.9688,476.5,344.9688" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;stroke-dasharray:2.0,2.0;" x1="107.5" x2="478.5" y1="344.9688" y2="344.9688"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="13" lengthAdjust="spacing" textLength="244" x="114.5" y="339.9028">(4) 201 CREATED w/LOCATION header</text>
</g>
</svg>


### DIALでNetflixの状態を確認する

まず状態を確認するため、GETリクエストを送ってみます。

```
$ curl -s 'http://192.168.181.222:56789/apps/Netflix'
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<service xmlns="urn:dial-multiscreen-org:schemas:dial" dialVer="2.2">
  <name>Netflix</name>
  <options allowStop="true"/>
  <state>stopped</state>
  <additionalData>

  </additionalData>
</service>
```

おお、ちゃんとそれらしきレスポンスが返っててきました。

### DIALでNetflixを起動してみる

同じエンドポイントに対してPOSTリクエストを送ることで、テレビにはNetflixの画面が映し出され、起動することができました。

```
$ curl -XPOST -s -D - 'http://192.168.181.222:56789/apps/Netflix'
```

```
HTTP/1.1 201 Created
Content-Type: text/plain
Location: http://192.168.181.222:56789/apps/Netflix/run
Access-Control-Allow-Origin: (null)
```

レスポンスヘッダーに含まれるLocationが示すURLが、現在起動中のインスタンスに対するREST操作を受け付けるエンドポイントとなります。

### DIALでNetflixを非表示にする

インスタンスのエンドポイントに`/hide`を加えたURLに対してPOSTリクエストを行うと、現在起動中のDIALアプリケーションを非表示にしてバックグラウンド動作に切り替えられます。

```
$ curl -XPOST -s -D - 'http://192.168.181.222:56789/apps/Netflix/run/hide'
```

```
HTTP/1.1 503 Service Unavailable
Content-Type: text/plain
Content-Length: 50
Connection: close

Error 503: Service Unavailable
Service Unavailable
```

なぜか503エラーが返ってきますが、テレビで起動しているNetflixは非表示になり、起動する前の画面に戻りました。

### DIALでNetflixを終了する

インスタンスのエンドポイントに対してDELETEリクエストを行うと、現在起動中のDIALアプリケーションを終了できます。

```
$ curl -XDELETE -D - 'http://192.168.181.222:56789/apps/Netflix/run'
```

```
HTTP/1.1 200 OK
Content-Type: text/plain
Access-Control-Allow-Origin: (null)
```

テレビで起動しているNetflixは終了し、成功レスポンスが返ってきました。

## 他のアプリも操作してみる

HISENSE-75A6GにはいくつかVODサービスが登録されているので、DIAL Registryに登録されているものを探してみました。

VODサービス名 | DIAL対応 | DIALアプリケーション名
:----|:---:|:---
Netflix | ○ | `Netflix`
YouTube | ○ | `YouTube`
Prime Video | ○ | `AmazonInstantVideo`
Hulu | × | n/a
ABEMA | × | n/a
U-NEXT | × | n/a
dTV | × | n/a
Paravi | × | n/a
スカパー | × | n/a
TSUTAYA TV | × | n/a
DMM.com | × | n/a
Rakuten TV | × | n/a


DIAL RegistryにはHuluの名前はあるものの、日本のHuluは本家Huluとは別物の"名ばかりHulu"[^1]なので、DIALには対応していないようです。

[^1]: [happyonとは結局何だったのか……huluがドメイン名を元の「hulu.jp」へと再変更【やじうまWatch】 - INTERNET Watch](https://internet.watch.impress.co.jp/docs/yajiuma/1205378.html)

Netflixの例では特にリクエストヘッダーをつけなくても`curl`でDIALリクエストを送ることができていました。
しかしYouTubeは、Netflixの例で示したようなシンプルなリクエストでは403エラーで弾かれてしまいます。
これを解決するにはDIALプロトコル仕様の**6.6 CORS Requirements and CORS Access Control Policy**を読み込み、開発者の意図を汲み取る必要があります。

6.6には次のように記されています。

<style>
.second-lower-alpha ol ol {
  list-style-type: lower-alpha;
}
</style>

> Whenever an HTTP request is made against an Application Resource, the DIAL server should run the following checks:
> 1. If the `ORIGIN` header is absent in the request, the CORS check is not applicable and the request is allowed.
> 2. If the `ORIGIN` header is present in the request:
>     1. The `ORIGIN` header may indicate the https scheme. The full hostname of the `ORIGIN` header must match one of the domains authorized for the https scheme. Alternatively, all single-level subdomains within a specific authorized domain may be accepted if explicitly authorized by a DIAL application. The set of authorized domains is specific to each DIAL application.
>     2. Additional `ORIGIN` header schemes that are considered secure resources may also be accepted, such as the `package` scheme.
{: .second-lower-alpha }

リクエストにOriginヘッダーなければリクエストが許可され、Originヘッダーがある場合は、そのドメインでCORS判定を行うよう書かれています。
この仕様に従うと、Netflixのようにリクエストヘッダーをつけなくても、すなわちOriginヘッダーが無くてもリクエストは許可されるはずですが、YouTubeは403エラーが出ます。

ここからが肝心なところなのですが、この節は**should**で書かれています。
開発者の意図を汲み取り、きっとYouTubeの開発者はOriginヘッダーが無い場合にリクエストを許可する実装を**あえてしなかった**と推測する必要があります。
それができればあとは簡単で、`Origin: https://www.youtube.com`をリクエストヘッダーにつけてあげればNetflixと同様のDIAL操作ができるようになります。

挙動を調べてみたところ、今回見つかったDIALアプリが許容するOriginヘッダーの値は次の通りでした。後に判明したことですが、後述するホワイトリストにいくつかのアプリの許容オリジンが書かれています。

- Netflix: `https://www.netflix.com`, `package:`スキーマで始まる任意のURI
- YouTube: `https://www.youtube.com`, `package:`スキーマで始まる任意のURI
- Amazon: `https://www.amazon.com`, `package:`スキーマで始まる任意のURI


## DIAL対応アプリと挙動

冒頭で紹介したAmazon開発者サイトの説明にあった通り、DIALは対応アプリの探索と起動をするプロトコルで、_キャスティングやミラーリングの機能を提供するAPIではありません_。
仕様を見ても挙動を確認しても、**探索と起動しか**できないことがわかりました。

そんなDIALの使いどころとは、いったいどこにあるんでしょうか。

単純な起動をするだけのこのプロトコルはどういった目的で使われるのか、その答えも単純で、スマホアプリなどが同じネットワークに存在する対応アプリを探索し起動までをするためです。
起動までできれば、あとはアプリの範囲内で自由にネットワーク通信を確立できるので、相互にTCP/IPで接続しあったりサービスのAPIを用いてクラウドを経由したりと思い思いの手段を用い、動画の再生をコントロールするようになります。

手持ちのデバイスでは、NetflixのiOSアプリとYouTubeのiOSアプリ、そして[youtube.com](https://www.youtube.com)にアクセスしているChromeやVivaldiなどのChromiumベースのブラウザが、このDIALによってDIAL対応アプリを探索し起動していました。

<style>
img[alt$="on iOS"] {
  width: 40%;
  max-width: 40%;
}
</style>

![YouTube DIAL connection menu on Vivaldi](/assets/images/2021/08/03/dial-youtube.png)

![YouTube DIAL connection menu on iOS](/assets/images/2021/08/03/dial-youtubeapp.png)
![Netflix DIAL connection menu on iOS](/assets/images/2021/08/03/dial-netflix.png)


### ChromeのDIALによる起動API

[youtube.com](https://www.youtube.com)にアクセスしているChromeでDIAL操作ができるということは、JavaScriptでDIALによって対応アプリの起動ができるということを意味しています。
調べてみると、Chromiumの実装は以下の箇所にDIAL関連のソースコードがありました。

[media/router/discovery/dial/chromium/README.md at 94.0.4595.1 · chromium/chromium](https://github.com/chromium/chromium/blob/94.0.4595.1/chrome/browser/media/router/discovery/dial/README.md)

このmedia/router下の階層のソースコードは[Chrome Media Router](https://chromium.googlesource.com/chromium/src.git/+/refs/heads/main/docs/media/media_router.md)というコンポーネントの実装で、Chromecastなどのデバイスとコンテンツのコントロールを行うブラウザAPIを提供しています。
この低いレイヤーのAPIを拡張機能なしでJavaScriptから扱うために、Cast Chrome Sender SDKが使えるとあります。

[Web Sender API  \|  Cast  \|  Google Developers](https://developers.google.com/cast/docs/reference/web_sender)

早速Cast SDKリファレンスと[インテグレーションガイド](https://developers.google.com/cast/docs/web_sender/integrate)を読み、SDKの中身を紐解きながらDIALアプリの起動コードを実装してみました。DIALで起動させる肝となるのは、Cast Framework APIではなくBase APIを使い、[DialRequest](https://developers.google.com/cast/docs/reference/web_sender/chrome.cast.DialRequest)を正しくセットできるかという部分でした。

```js
const sessionRequest = new chrome.cast.SessionRequest(
  chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
);
sessionRequest.dialRequest = new chrome.cast.DialRequest(dialAppName);
```

数十行のコードでブラウザから簡単に起動ができるコードが完成したかと思いきや、うまく動きません。実装は絶対に間違っていないのに。。

そこでさらに探っていくと、[NetflixやYouTubeはホワイトリスト形式でドメイン判定](https://github.com/chromium/chromium/blob/94.0.4595.1/chrome/browser/media/router/providers/dial/dial_media_route_provider.cc#L692-L710)があり、特定のオリジンでしかDIALによる起動ができないようになっていました。
ただ、Amazon Prime VideoはChrome 94相当のソースコードには判定コードが含まれていなかったので、Amazon Prime Videoを起動するサンプルを以下に用意しました。
対応デバイスが同一ネットワークにあれば、Chrome 94前後でAmazon Prime VideoのDIALアプリの起動を試すことができるはずです。

<script src="https://gistcdn.githack.com/mzyy94/aa25615639fd3466d37bac7da204778e/raw/c2ae3a90df1824f3bb20a44d6338015e7317eeed/launch_dial.js"></script>
<script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js"></script>
<button class="btn btn--accent" onclick="window.chrome && chrome.cast ? launchApp('AmazonInstantVideo') : alert('Not supported.')">Launch Prime Video</button>
<button class="btn btn--danger" onclick="stopApp()">Stop</button>
<div class="notice notice--accent" id="dial-status">Waiting to connect.</div>

[Source Code](https://gist.github.com/mzyy94/aa25615639fd3466d37bac7da204778e#file-launch_dial-js)

![Demo preview](/assets/images/2021/08/03/dial-launch-demo.png)


### DIALによる起動後の操作連携

YouTubeは起動後、こちらはQUICでYouTubeのAPIサーバーと通信して操作があるたびにクラウドを経由して再生コントロールをする形になっていました。

Netflixはというと、TCP 9080ポートでHTTPサーバーをiOSアプリとテレビの両方で立ち上げ、立ち上がっていることをUPnPで確認しあい、次に示すフローで暗号化されたセッション情報を相互に送り合いながら動画の再生コントロールを行っていました。仕組みとしてはMDX(Multiple-Device Experience)[^mdx]を使っていて、CTicketのペイロードにはCBOR[^cbor]が使われるなど、なかなか面白い作りになっていました。

[^mdx]: [MDX User Authentication · Netflix/msl Wiki](https://github.com/Netflix/msl/wiki/MDX-User-Authentication)

[^cbor]: [RFC 8949: Concise Binary Object Representation (CBOR)](https://datatracker.ietf.org/doc/html/rfc8949)

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" contentScriptType="application/ecmascript" contentStyleType="text/css" preserveAspectRatio="none" style="background:#0B58A8;" version="1.1" viewBox="0 0 695 762">
<g>
<rect fill="#0B58A8" height="35.6094" style="stroke:#0B58A8;stroke-width:0.0;" width="361" x="165.75" y="10"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="22" font-weight="bold" lengthAdjust="spacing" textLength="351" x="170.75" y="35.4209">2nd Screen Control Session</text>
<rect fill="#0B58A8" height="468.7266" style="stroke:#FFFFFF;stroke-width:1.0;" width="664.5" x="14" y="241.4375"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;stroke-dasharray:5.0,5.0;" x1="183" x2="183" y1="82.9063" y2="717.1641"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;stroke-dasharray:1.0,4.0;" x1="183" x2="183" y1="717.1641" y2="745.1641"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;stroke-dasharray:5.0,5.0;" x1="183" x2="183" y1="745.1641" y2="755.1641"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;stroke-dasharray:5.0,5.0;" x1="444.5" x2="444.5" y1="82.9063" y2="717.1641"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;stroke-dasharray:1.0,4.0;" x1="444.5" x2="444.5" y1="717.1641" y2="745.1641"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;stroke-dasharray:5.0,5.0;" x1="444.5" x2="444.5" y1="745.1641" y2="755.1641"/>
<rect fill="#0B58A8" height="30.2969" style="stroke:#FFFFFF;stroke-width:1.0;" width="87" x="140" y="51.6094"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="14" lengthAdjust="spacing" textLength="73" x="147" y="71.6045">Controller</text>
<rect fill="#0B58A8" height="30.2969" style="stroke:#FFFFFF;stroke-width:1.0;" width="62" x="413.5" y="51.6094"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="14" lengthAdjust="spacing" textLength="48" x="420.5" y="71.6045">Target</text>
<polygon fill="#FFFFFF" points="432.5,110.0391,442.5,114.0391,432.5,118.0391,436.5,114.0391" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;" x1="183.5" x2="438.5" y1="114.0391" y2="114.0391"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="13" lengthAdjust="spacing" textLength="221" x="203.5" y="108.9731">POST /mdxping action=pingsearch</text>
<polygon fill="#FFFFFF" points="194.5,139.1719,184.5,143.1719,194.5,147.1719,190.5,143.1719" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;stroke-dasharray:2.0,2.0;" x1="188.5" x2="443.5" y1="143.1719" y2="143.1719"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="13" lengthAdjust="spacing" textLength="115" x="256.5" y="138.106">200 OK status=ok</text>
<polygon fill="#FFFFFF" points="194.5,193.3047,184.5,197.3047,194.5,201.3047,190.5,197.3047" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;" x1="188.5" x2="443.5" y1="197.3047" y2="197.3047"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="13" lengthAdjust="spacing" textLength="237" x="195.5" y="192.2388">POST /mdxping action=pingresponse</text>
<polygon fill="#FFFFFF" points="432.5,222.4375,442.5,226.4375,432.5,230.4375,436.5,226.4375" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;stroke-dasharray:2.0,2.0;" x1="183.5" x2="438.5" y1="226.4375" y2="226.4375"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="13" lengthAdjust="spacing" textLength="115" x="256.5" y="221.3716">200 OK status=ok</text>
<path d="M14,241.4375 L140,241.4375 L140,248.4375 L130,258.4375 L14,258.4375 L14,241.4375 " fill="#FFFFFF" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<rect fill="none" height="468.7266" style="stroke:#FFFFFF;stroke-width:1.0;" width="664.5" x="14" y="241.4375"/>
<text fill="#0B58A8" font-family="Verdana" font-size="13" font-weight="bold" lengthAdjust="spacing" textLength="76" x="29" y="254.5044">encrypted</text>
<text fill="#FFFFFF" font-family="Verdana" font-size="11" font-weight="bold" lengthAdjust="spacing" textLength="253" x="155" y="253.6479">[ AES-128-CBC w/ HMAC-SHA256 hash ]</text>
<rect fill="#FFFFFF" height="3" style="stroke:#FFFFFF;stroke-width:1.0;" width="683.5" x="5" y="279.1367"/>
<line style="stroke:#FFFFFF;stroke-width:0.5;" x1="5" x2="688.5" y1="279.1367" y2="279.1367"/>
<line style="stroke:#FFFFFF;stroke-width:0.5;" x1="5" x2="688.5" y1="282.1367" y2="282.1367"/>
<rect fill="#FFFFFF" height="23.1328" style="stroke:#FFFFFF;stroke-width:1.0;" width="71" x="311.25" y="268.5703"/>
<text fill="#0B58A8" font-family="Verdana" font-size="13" font-weight="bold" lengthAdjust="spacing" textLength="52" x="317.25" y="284.6372">Pairing</text>
<polygon fill="#FFFFFF" points="432.5,321.8359,442.5,325.8359,432.5,329.8359,436.5,325.8359" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;" x1="183.5" x2="438.5" y1="325.8359" y2="325.8359"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="13" lengthAdjust="spacing" textLength="134" x="247" y="320.77">POST /pairingrequest</text>
<path d="M24,306.7031 L24,331.7031 L178,331.7031 L178,316.7031 L168,306.7031 L24,306.7031 " fill="#0B58A8" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<path d="M168,306.7031 L168,316.7031 L178,316.7031 L168,306.7031 " fill="#0B58A8" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="13" lengthAdjust="spacing" textLength="133" x="30" y="323.77">Send CTicket (CBOR)</text>
<polygon fill="#FFFFFF" points="194.5,353.9688,184.5,357.9688,194.5,361.9688,190.5,357.9688" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;stroke-dasharray:2.0,2.0;" x1="188.5" x2="443.5" y1="357.9688" y2="357.9688"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="13" lengthAdjust="spacing" textLength="115" x="256.5" y="352.9028">200 OK status=ok</text>
<polygon fill="#FFFFFF" points="194.5,411.1016,184.5,415.1016,194.5,419.1016,190.5,415.1016" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;" x1="188.5" x2="443.5" y1="415.1016" y2="415.1016"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="13" lengthAdjust="spacing" textLength="144" x="242" y="410.0356">POST /pairingresponse</text>
<path d="M449,395.9688 L449,420.9688 L663,420.9688 L663,405.9688 L653,395.9688 L449,395.9688 " fill="#0B58A8" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<path d="M653,395.9688 L653,405.9688 L663,405.9688 L653,395.9688 " fill="#0B58A8" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="13" lengthAdjust="spacing" textLength="193" x="455" y="413.0356">Send encrypted shared secret</text>
<polygon fill="#FFFFFF" points="432.5,443.2344,442.5,447.2344,432.5,451.2344,436.5,447.2344" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;stroke-dasharray:2.0,2.0;" x1="183.5" x2="438.5" y1="447.2344" y2="447.2344"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="13" lengthAdjust="spacing" textLength="115" x="256.5" y="442.1685">200 OK status=ok</text>
<rect fill="#FFFFFF" height="3" style="stroke:#FFFFFF;stroke-width:1.0;" width="683.5" x="5" y="475.8008"/>
<line style="stroke:#FFFFFF;stroke-width:0.5;" x1="5" x2="688.5" y1="475.8008" y2="475.8008"/>
<line style="stroke:#FFFFFF;stroke-width:0.5;" x1="5" x2="688.5" y1="478.8008" y2="478.8008"/>
<rect fill="#FFFFFF" height="23.1328" style="stroke:#FFFFFF;stroke-width:1.0;" width="76" x="308.75" y="465.2344"/>
<text fill="#0B58A8" font-family="Verdana" font-size="13" font-weight="bold" lengthAdjust="spacing" textLength="57" x="314.75" y="481.3013">Session</text>
<path d="M56,503.3672 L56,528.3672 L178,528.3672 L178,513.3672 L168,503.3672 L56,503.3672 " fill="#0B58A8" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<path d="M168,503.3672 L168,513.3672 L178,513.3672 L168,503.3672 " fill="#0B58A8" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="13" lengthAdjust="spacing" textLength="101" x="62" y="520.4341">Play an episode</text>
<polygon fill="#FFFFFF" points="432.5,550.6328,442.5,554.6328,432.5,558.6328,436.5,554.6328" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;" x1="183.5" x2="438.5" y1="554.6328" y2="554.6328"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="13" lengthAdjust="spacing" textLength="90" x="269" y="549.5669">POST /session</text>
<polygon fill="#FFFFFF" points="194.5,579.7656,184.5,583.7656,194.5,587.7656,190.5,583.7656" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;stroke-dasharray:2.0,2.0;" x1="188.5" x2="443.5" y1="583.7656" y2="583.7656"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="13" lengthAdjust="spacing" textLength="115" x="256.5" y="578.6997">200 OK status=ok</text>
<path d="M449,621.7656 L449,646.7656 L600,646.7656 L600,631.7656 L590,621.7656 L449,621.7656 " fill="#0B58A8" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<path d="M590,621.7656 L590,631.7656 L600,631.7656 L590,621.7656 " fill="#0B58A8" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="13" lengthAdjust="spacing" textLength="130" x="455" y="638.8325">Report playing state</text>
<polygon fill="#FFFFFF" points="194.5,669.0313,184.5,673.0313,194.5,677.0313,190.5,673.0313" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;" x1="188.5" x2="443.5" y1="673.0313" y2="673.0313"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="13" lengthAdjust="spacing" textLength="90" x="269" y="667.9653">POST /session</text>
<polygon fill="#FFFFFF" points="432.5,698.1641,442.5,702.1641,432.5,706.1641,436.5,702.1641" style="stroke:#FFFFFF;stroke-width:1.0;"/>
<line style="stroke:#FFFFFF;stroke-width:1.0;stroke-dasharray:2.0,2.0;" x1="183.5" x2="438.5" y1="702.1641" y2="702.1641"/>
<text fill="#FFFFFF" font-family="Verdana" font-size="13" lengthAdjust="spacing" textLength="115" x="256.5" y="697.0981">200 OK status=ok</text>
</g>
</svg>

## まとめ

異常なほどにUDPマルチキャストが飛び交っていたのは、テレビをHISENSE-75A6Gに買い替えたことによって、VivaldiがHISENSE-75A6Gを見つけてしまったことに起因していました。
ご家庭のネットワークで異常検知アラートがなったら調査する習慣をつけておくと、こういった問題の解決に迅速に対応できるのでアラート設定をお勧めします。

DIALの挙動を一通り確認することもでき、また新たな技術を知る良いきっかけとなりましたとさ。おしまい。
