---
layout: post
title: "blogを建ててみた"
date: 2013-12-07 18:22:11 +0900
comments: true
categories: html
tags: html5 css3 gh-pages
image: /blog/resources/images/2013/12/07/create-new-blog.png
---

いままで情報を発信する場として、確かなものが周りになかったので新年に向けて新しくブログを作成しました。
よろしくお願いします。

今回はサイトのホスティングとして、Github pagesを用いることにしました。Github pagesでブログを制作する方法に関しては、
[こちら][1]とかで確認して下さい。

ブログのスタイリングのために、今回はBootstrapをベースに構成しました。BootstrapはOOCSSを謳っているものの、
オブジェクト指向特有のごちゃごちゃしたプロパティ名が好みではなかったので利用を控えていました。
ではなぜBootstrapを選んだかというと、単純にスタイルテンプレートがBootstrap向けだったためです。

<!-- more -->

サイトデザインを模索しているときに出会ったとても気に入ったテーマがありました。[PixelKit][2]で公開されている[Modern Touch][3]というものです。
最近の流行であるフラットデザインをシンプルな配色で実装し、中途半端さが無く、とても清潔感あふれている点に惹かれました。
しかしここで気になったのがデザインの配布形式です。

過去から現在にかけてWeb UIデザインは各所で提案され公開されてきていますが、公開形式として大半を占めているのがPSD形式のものです。
HTML5やCSS3が主要となりつつある現代WebデザインにおいてはUIに多くの画像を用いることはあまり好まれません。
汎用性が高いという理由でしょうが、Web UIやUIデザインが提供されている形式はPSD形式ばかりです。
そんなサイトがたくさんある中、少数派であるHTML5とCSS3を用いてサイトデザインを提供公開しているサイトにもれず、[Pixelkit][2]もHTML5/CSS3でデザインを提供していたのです。

このサイトにあるデザインはすべてが無料で提供されているわけではありません。公開されているデザインをすべて利用するには年間Subscriptionが必要です。
しかし、今回使用したテーマのModern touchを始め、いくつかのデザインは[GitHubにて公開](https://github.com/Pixelkit/PixelKit-Bootstrap-UI-Kits)されています。ライセンスは[CC BY 3.0][CCBY3.0]と[MIT][MIT]です。

「せっかくよいデザインを見つけたのだから使いたい」と思ったので使うことにしました。
サイトデザインのために、好みでなかったTwitter Bootstrapを利用しはじめ、Octopressのテーマをいじっていきました。
時々出力されたサイトのソースをみるとこんなかんじになっていました。

<figure>
<img src="/blog/resources/images/2013/12/07/blog-html-sourcecode.png" alt="blog html sourcecode" />
<figcaption class="boxed-green">blogのソースコード</figcaption>
</figure>

OOCSSの影響でclassが溢れて可読性が下がると思っていましたが、この程度の組み方であればあまり影響はないようです。

GitHub pagesとOctopressによってブログを書き始めました。というお話でした。
まだまだ未熟者ですが今後とも宜しくお願いします。


[1]: http://morizyun.github.io/blog/octopress-gitpage-minimum-install-guide/ "OctopressでGitHub無料ブログ構築。sourceをBitbucket管理。簡単ガイド！ - 酒と泪とRubyとRailsと"
[2]: http://pixelkit.com/ "Premium Web UI Kits & Design Resources | PixelKit"
[3]: http://pixelkit.com/kits/flat-ui-kit "Flat UI Kit | Modern Touch"
[CCBY3.0]: http://creativecommons.org/licenses/by/3.0/ "Creative Commons — Attribution 3.0 Unported — CC BY 3.0"
[MIT]: http://opensource.org/licenses/mit-license.html "The MIT License (MIT) | Open Source Initiative"
