---
title: Team TomoriNaoのサイトの秘密
date: 2016-12-17 17:00:00 +0900
category: web
tags: svg css3 html5 smil
header:
  image: /assets/images/2016/12/17/tomorinao.pro.png
---

こちらは[友利奈緒 Advent Calendar 2016 - Adventar](http://www.adventar.org/calendars/1379) 17日目の記事です。

## TomoriNao

昨年のこの時期、ふとした思いつきからTeam TomoriNaoというホワイトハッカー（死語？）チームが生まれました。
皆さんもご覧に入れたことがあると思いますが、トップの画像のようなチームロゴを掲げています。
このトップの画像はロゴとして用意した公式のものではなく、Team TomoriNaoのWebサイトのスクリーンキャプチャです。

[**Team TomoriNao**](https://tomorinao.pro)

Team TomoriNaoのWebサイトは、**JavaScript** を使用せずにいろいろなアニメーションやアクションを実装しているのをご存知ですか？
このちょっとした仕掛けを今回は紹介していきたいと思います。


<!-- more -->

### ロゴのアニメーション

#### 文字列の縁取り

まずサイトを開くと現れるロゴのアニメーション。
彗星の輝きが表現されていた今までに加え、1周年を記念してロゴの描画アニメーションが増えています。

ロゴの描画アニメーションはもちろんJavaScriptを用いず、CSS3の _keyframe_ によって実現されています。

[CSS アニメーション - CSS \| MDN](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Animations/Using_CSS_animations)

CSS3のSVGアニメーションで制御できるものは限られているものの[^1]、Pathのライン取りのアニメーションは容易に実現できます。
ロゴの縁取りを行うアニメーションは、`stroke-dasharray`と`stroke-dashoffset`属性によって実現できます。
`stroke-dasharray`はパスのストロークを破線として表示するときの間隔を指定し、`storke-dashoffset`は破線の開始位置を指定します。
ちょうどパスストロークの長さ分を`stroke-dasharray`として破線の間隔を指定し、
その破線の開始位置を`storke-dashoffset`で指定することで、縁取りのされていない透明な文字が表現できます。
そこから _keyframe_ によるアニメーションで`storke-dashoffset`を0に近づけていくと、文字列の縁取りが実現できます。

**TomoriNao** という文字列はそれぞれ独立したパスでできており、パスの大きさが違うが故にパスストロークの長さも違います。
一文字ずつパスの長さを測り、以下のように指定しました。

```css
svg #TomoriNao path {
	fill: none;
	stroke-linecap: round;
	animation: dash 1.6s ease-in 0.4s forwards/*, color 1s ease-in 2.2s forwards*/;
}
svg #TomoriNao path[name=T] {
	stroke-dasharray: 290;
	stroke-dashoffset: 290;
}
svg #TomoriNao path[name=o] {
	stroke-dasharray: 216;
	stroke-dashoffset: 216;
}
/* more */

@keyframes dash {
	100% { stroke-dashoffset: 0; }
}
@keyframes color {
	0% { fill: rgba(0, 0, 0, 0); }
	100% { fill: rgba(0, 0, 0, 1); }
}
```

これを適用すると、ページがロードされてから0.4秒後に1.6秒間かけてすべての文字が書き上がる表現ができます。
以下はデモのためにループやタイミング関数が調整されていますが、だいたい上記のコードでこのような表示になります。

<style>
svg #tomorinao-demo1 path {
	fill: none;
	stroke-linecap: round;
	animation: dash 2s ease-in-out infinite;
	-webkit-animation: dash 2s ease-in-out infinite;
}
svg #tomorinao-demo1 path[name=T] {
	stroke-dasharray: 290;
	stroke-dashoffset: 290;
}
svg #tomorinao-demo1 path[name=o] {
	stroke-dasharray: 216;
	stroke-dashoffset: 216;
}
svg #tomorinao-demo1 path[name=m] {
	stroke-dasharray: 478;
	stroke-dashoffset: 478;
}
svg #tomorinao-demo1 path[name=r] {
	stroke-dasharray: 186;
	stroke-dashoffset: 186;
}
svg #tomorinao-demo1 path[name=i] {
	stroke-dasharray: 136;
	stroke-dashoffset: 136;
}
svg #tomorinao-demo1 path[name=N] {
	stroke-dasharray: 476;
	stroke-dashoffset: 476;
}
svg #tomorinao-demo1 path[name=a] {
	stroke-dasharray: 442;
	stroke-dashoffset: 442;
}

@keyframes dash {
	100% { stroke-dashoffset: 0; }
}
@-webkit-keyframes dash {
	100% { stroke-dashoffset: 0; }
}
</style>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="100%" height="100%" viewBox="30, 130, 400, 200">
    <g id="tomorinao-demo1">
        <path stroke="#000" stroke-width="1" d="M55.91,137 L55.91,145.1 L87.91,145.1 L87.91,209 L96.01,209 L96.01,145.1 L127.91,145.1 L127.91,137 z" fill="#020204" name="T"/>
        <path stroke="#000" stroke-width="1" d="M134.71,151 C128.01,151 122.61,156.4 122.61,163.1 L122.61,196.9 C122.61,203.6 128.01,209 134.71,209 L169.51,209 C176.31,209 181.71,203.6 181.71,196.9 L181.71,163.1 C181.71,156.4 176.31,151 169.51,151 z M169.51,159.2 C171.71,159.2 173.41,161 173.41,163.1 L173.41,196.9 C173.41,199 171.71,200.8 169.51,200.8 L134.71,200.8 C132.61,200.8 130.81,199 130.81,196.9 L130.81,163.1 C130.81,161 132.61,159.2 134.71,159.2 z" fill="#020204" name="o"/>
        <path stroke="#000" stroke-width="1" d="M268.71,151 C268.71,151 210.347,151 204.172,151 C197.356,151 192.11,157.049 192.11,163.156 C192.11,169.5 192.11,209 192.11,209 L200.41,209 L200.41,163.1 C200.41,161 202.21,159.2 204.31,159.2 L228.51,159.2 C230.61,159.2 232.41,161 232.41,163.1 L232.41,209 L240.71,209 L240.71,163.1 C240.71,161 242.41,159.2 244.61,159.2 L268.71,159.2 C270.91,159.2 272.71,161 272.71,163.1 L272.71,209 L280.81,209 L280.81,163.1 C280.81,156.4 275.51,151 268.71,151 z" fill="#020204" name="m"/>
        <path stroke="#000" stroke-width="1" d="M301.71,151 C295.01,151 289.61,156.4 289.61,163.1 L289.61,196.9 C289.61,203.6 295.01,209 301.71,209 L336.51,209 C343.31,209 348.71,203.6 348.71,196.9 L348.71,163.1 C348.71,156.4 343.31,151 336.51,151 z M336.51,159.2 C338.71,159.2 340.41,161 340.41,163.1 L340.41,196.9 C340.41,199 338.71,200.8 336.51,200.8 L301.71,200.8 C299.61,200.8 297.81,199 297.81,196.9 L297.81,163.1 C297.81,161 299.61,159.2 301.71,159.2 z" fill="#020204" name="o"/>
        <path stroke="#000" stroke-width="1" d="M375.07,151 C363.612,151 357.91,155.731 357.91,169.532 L357.91,209 L366.11,209 L366.11,169.532 C366.11,161.841 368.9,159.2 375.07,159.2 L395.97,159.2 L395.97,151 z" fill="#020204" name="r"/>
        <path stroke="#000" stroke-width="1" d="M401.89,209 L410.09,209 L410.09,151 L401.89,151 z M401.89,132 L401.89,140.2 L410.09,140.2 L410.09,132 z" fill="#020204" name="i"/>
        <path stroke="#000" stroke-width="1" d="M123.41,319.8 L70.61,257 L59.51,257 L59.51,329 L67.61,329 L67.61,266.2 L120.41,329 L131.51,329 L131.51,257 L123.41,257 z" fill="#020204" name="N"/>
        <path stroke="#000" stroke-width="1" d="M142.31,271 L142.31,279.2 L189.21,279.2 C191.41,279.2 193.11,281 193.11,283.1 L193.11,295.9 L142.31,295.9 L142.31,316.9 C142.31,323.6 147.71,329 154.41,329 L184.7,329 L184.7,320.8 L154.41,320.8 C152.31,320.8 150.51,319 150.51,316.9 L150.51,304.1 L193.11,304.1 L193.106,329 L201.41,329 L201.41,283.1 C201.41,276.4 196.01,271 189.21,271 L142.31,271 z" fill="#020204" name="a"/>
        <path stroke="#000" stroke-width="1" d="M223.71,271 C217.01,271 211.61,276.4 211.61,283.1 L211.61,316.9 C211.61,323.6 217.01,329 223.71,329 L258.51,329 C265.31,329 270.71,323.6 270.71,316.9 L270.71,283.1 C270.71,276.4 265.31,271 258.51,271 z M258.51,279.2 C260.71,279.2 262.41,281 262.41,283.1 L262.41,316.9 C262.41,319 260.71,320.8 258.51,320.8 L223.71,320.8 C221.61,320.8 219.81,319 219.81,316.9 L219.81,283.1 C219.81,281 221.61,279.2 223.71,279.2 z" fill="#020204" name="o"/>
    </g>
</svg>


ちなみにTomoriNaoの文字は、Orbitronをベースに変更を加えたものです。

[Orbitron - Google Fonts](https://fonts.google.com/specimen/Orbitron)

#### 彗星の輝き

こちらはSVGアニメーションのSMILで書かれています。

[SVG animation with SMIL - SVG \| MDN](https://developer.mozilla.org/ja/docs/Web/SVG/SVG_animation_with_SMIL)

輝きを表現する中心が輝いた円形グラデーションを塗りつぶしとして用意し、それを移動させたりグラデーション半径を拡大縮小して彗星が輝いているように見せています。
まず、SVGの`<radialGradient>`要素で円形グラデーションを定義し、中心を輝きとして#DDDDEEの色で、外側に向かってチームカラーの#14A6C8を指定します。
そして、`<radialGradient>`要素内で、`<animate>`要素によってグラデーションの中心位置とグラデーション半径を、アニメーションしています。

```xml
<radialGradient id="comet" cx="0" cy="0" r="0.1">
    <stop offset="0%" stop-color="#DDDDEE"/>
    <stop offset="100%" stop-color="#14A6C8"/>
    <animate attributeName="cx" values="0; 0; 0.02; 0.28; 0.6; 0.70; 0.88; 0.92; 0.88; 0.82; 0.62; 0.50; 0.34" dur="5s" restart="always" repeatCount="indefinite" calcMode="linear" keyTimes="0;0.9;0.9;0.926;0.933;0.942;0.956;0.965;0.970;0.975;0.98;0.99;1"/>
    <animate attributeName="cy" values="0; 0; 0.20; 0.13; 0.1; 0.11; 0.20; 0.30; 0.40; 0.50; 0.70; 0.80; 0.92" dur="5s" restart="always" repeatCount="indefinite" calcMode="linear" keyTimes="0;0.9;0.9;0.926;0.933;0.943;0.956;0.965;0.970;0.975;0.98;0.99;1"/>
    <animate attributeName="r" values="0.1; 0.1; 0.20; 0.30; 0.40;" dur="5" restart="always" repeatCount="indefinite" calcMode="linear" keyTimes="0;0.9;0.9;0.99;1"/>
</radialGradient>
```

ロゴでは見えない部分をわかりやすく表したデモが以下のようになっています。

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="60%" height="auto" viewBox="85, 17, 396, 467">
    <radialGradient id="comet" cx="0" cy="0" r="0.1">
        <stop offset="0%" stop-color="#DDDDEE"/>
        <stop offset="100%" stop-color="#14A6C8"/>
        <animate attributeName="cx" values="0; 0; 0.02; 0.28; 0.6; 0.70; 0.88; 0.92; 0.88; 0.82; 0.62; 0.50; 0.34" dur="5s" restart="always" repeatCount="indefinite" calcMode="linear" keyTimes="0;0.9;0.9;0.926;0.933;0.942;0.956;0.965;0.970;0.975;0.98;0.99;1"/>
        <animate attributeName="cy" values="0; 0; 0.20; 0.13; 0.1; 0.11; 0.20; 0.30; 0.40; 0.50; 0.70; 0.80; 0.92" dur="5s" restart="always" repeatCount="indefinite" calcMode="linear" keyTimes="0;0.9;0.9;0.926;0.933;0.943;0.956;0.965;0.970;0.975;0.98;0.99;1"/>
        <animate attributeName="r" values="0.1; 0.1; 0.20; 0.30; 0.40;" dur="5" restart="always" repeatCount="indefinite" calcMode="linear" keyTimes="0;0.9;0.9;0.99;1"/>
    </radialGradient>
    <g id="tomorinao-demo2">
        <rect x="85" y="17" width="396" height="467" fill="url(#comet)" />
        <path stroke="#000" stroke-width="1" d="M324.803,54.442 C371.743,54.332 423.559,63.888 452.117,104.701 C480.968,149.082 453.815,203.597 427.841,242.23 C396.369,289.041 355.831,329.811 314.132,367.499 L316,369.367 L410.345,375.311 L315.999,381.251 L378.509,452.167 L307.596,389.654 L301.652,484 L295.712,389.654 L292.619,386.561 C268.526,407.088 244.158,427.396 218.563,446.049 C242.585,425.662 265.898,404.4 288.245,382.187 L287.309,381.251 L192.963,375.306 L287.309,369.367 L224.8,298.451 L295.713,360.963 L301.657,266.618 L307.597,360.964 L308.446,361.814 C352.21,314.206 400.346,263.843 424.228,202.557 C435.284,174.184 439.88,141.825 420.677,115.929 C343.878,17.118 84.943,109.192 84.943,109.192 C161.44,79.191 242.282,56.64 324.803,54.442 z" fill="none"/>
    </g>
</svg>


なぜCSS3ではなくSMILを使ったかというと、このグラデーションのパラメータがCSS3では変更できなかったからという理由があります。

### サイトのフェードイン

これもCSS3 keyframeアニメーションで実現されています。
ロゴが表示される最初のセクション意外に対して、最初は透明にしておき、ロゴ表示のタイミングで不透明度を変更するという形でフェードインをしています。

```css
body > section:not(:first-of-type) {
	opacity: 0;
	animation: visible 1s ease-in 2s forwards;
}

@keyframes visible {
	100% { opacity: 1; }
}
```

### More... ボタン

NEWSセクションにMoreボタンがありますが、このボタンによって追加の項目を表示する部分も、JavaScriptなしで実現しています。
More...ボタンの正体は、実は **チェックボックス** で、チェックされた状態を示すCSS3の擬似セレクタである`:checked`で表示を切り替えています。

`<input type="checkbox" name="show_more">`として用意したチェックボックスを非表示にし、その隣に`<label>`要素をfor属性で関連付けして表示してあります。
`<label>`は、クリックが可能であることを示すよう、`cursor: pointer;`が指定されています。
チェックされいないチェックボックスの後に続く要素を非表示にするため、`:not`擬似セレクタと後続を示すセレクタ` ~ `を組み合わせています。
その`<label>`をクリックすると、チェックボックスがチェックされ、非表示が解除されると同時に、CSS3 transitionとtransformの組み合わせによって、
横から要素がスライドして表示されるようになっています。

```css
[name=show_more] {
	visibility: hidden;
}
[for=show_more] {
	cursor: pointer;
}
[name=show_more]:checked, [name=show_more]:checked ~ label {
	display: none;
}
[name=show_more]:not(:checked) ~ div {
	visibility: hidden;
	height: 0;
	width: 0;
}
[name=show_more]:checked ~ div {
	visibility: visible;
	height: auto;
	width: auto;
	overflow: hidden;
}
[name=show_more]:not(:checked) ~ div * {
	transform: translateX(300px);
	opacity: 0;
}
[name=show_more]:checked ~ div * {
	transform: translateX(0px);
	opacity: 1;
	transition-property: transform, opacity;
	transition-duration: 0.5s;
	transition-timing-function: ease;
}
```

## まとめ

悪意のある広告にJavaScriptが利用されていたり、JavaScriptが複雑化しページの表示が重くなる一方の2016年。
2017年はNo-JSが叫ばれ、JavaScriptなしで如何にきれいにサイトを表現するかを考えさせられるかもしれません。
また、きれいな表示にかかせないアニメーションにJavaScriptを用いる時代ではなくなっています。
みなさんの管理するWebサイトでまさかjQueryをつかったアニメーションなどは利用していないと思いますが、
一度、CSS3やSMILでNo-JSなアニメーションを真剣に考えてみてはいかがでしょうか。

---

[^1]: [プレゼンテーション属性 SVG 属性リファレンス - SVG \| MDN](https://developer.mozilla.org/ja/docs/Web/SVG/Attribute#Presentation_attributes)
