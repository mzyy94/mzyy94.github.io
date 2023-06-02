---
title: GitHubで絵文字コミットを続けてみて有用だったEmojiまとめ
date: 2015-10-14T19:39:47+09:00
author: mzyy94
categories: ["misc"]
tags: ["emoji", "git", "github"]
image: "/assets/images/2015/10/14/emoji-commit-log.png"
---


みなさんは絵文字コミットというものをご存知でしょうか？
プロ生い人のサイトでも以下のように紹介されており、知っている人も多いと思いますが、GitHubで絵文字に置換される特定のワードをコミットメッセージに追加し、
ぱっと見でどういった種類の変更があったのかに気づきやすいようにするものです。

[GitHub で絵文字入りコミットメッセージを活用しているプロジェクトを調べてみた \| プログラミング生放送](http://pronama.azurewebsites.net/2015/06/20/github-emoji-commit-message/)

少し前から興味があったのですが、GitLabやBitBucketでプライベートなリポジトリで開発してるものでは絵文字として表示されないため、なかなか導入する機会がありませんでした。
先々月にブログで記事にしたKodi用Chinachu PVRクライアントadd-onの作成をパブリックなリポジトリで開発しようと思い立ったとき、
いい機会だと感じたので初期コミットから絵文字コミットメッセージを導入し始めました。

[mzyy94/pvr.chinachu - GitHub](https://github.com/mzyy94/pvr.chinachu/)

コミットを続けていたら開発版ブランチが100コミットに近づいてきたので、いままで使ってきた絵文字コミットをまとめてみました。

## 目次


## 絵文字コミット

### 導入

まず、GitHubでどのような文字列が絵文字に置換されるかですが、インターネット上の対応表を掲載しているサイトを見て対応付けしていました。
そのなかでも以下のサイトが特に見やすく、選択するとクリップボードにコピーされるので愛用していました。

[Emoji cheat sheet for GitHub, Basecamp and other services](http://www.emoji-cheat-sheet.com/)

GitHubでは、コロンで挟む形で記述した文字列が対応する絵文字に変換されるようになっています。
絵文字コミットはパッと見て何を指しているかがわかるようにする目的で導入したため、コロンの間の文字列とミスマッチなものもあります。
反義語になるようなことは避けていますが、理解しがたいものも混ざってしまう点を導入時には覚悟しておかなければなりません。


### 一覧

以下のようにして、用いた絵文字を列挙して、どのような用途で使用したかを一覧にまとめました。

```sh
$ git log --oneline | grep -o ':\w\+:' | sort -u
```

今回のプロジェクトはPVR(Personal Video Recorder：ビデオレコーダー)を中心とするものなので、予約録画や番組視聴に関する絵文字コミットメッセージも多く導入しました。
それらに関しては一般的なプロジェクトにはそのままでは利用できないものであるため、末尾にまとめておきます。

#### 一般的な用途

##### バグ関連

| 絵文字|   絵文字置換文字列         | 用途                                                      |
|:-----:|:--------------------------:|:----------------------------------------------------------|
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/bug.png" alt="🐛" width="24" height="24" /> | :bug:                      | バグFixの時に用いる                                       |
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/bangbang.png" alt="‼️" width="24" height="24" /> | :bangbang:                 | バグとは言い切れないけど何か悪いものを正しく修正した時    |

##### コメントしづらい変更

| 絵文字|   絵文字置換文字列         | 用途                                                      |
|:-----:|:--------------------------:|:----------------------------------------------------------|
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/ok.png" alt="🆗" width="24" height="24" /> | :ok:                       | なにかokな変更                                            |
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/cool.png" alt="🆒" width="24" height="24" /> | :cool:                     | なにかcoolな変更                                          |


##### ファイル追加・削除・新規作成・移動

| 絵文字|   絵文字置換文字列         | 用途                                                      |
|:-----:|:--------------------------:|:----------------------------------------------------------|
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/new.png" alt="🆕" width="24" height="24" /> | :new:                      | ファイルの追加。主に新規作成したタイミングで。            |
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/fire.png" alt="🔥" width="24" height="24" /> | :fire:                     | ファイルの削除。ソースコードの大半を削除した場合もこれ。  |
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/inbox_tray.png" alt="📥" width="24" height="24" /> | :inbox_tray:               | ファイルの移動。他プロジェクトのファイルを持ってきた時とか|



##### ドキュメントやライセンス関連

| 絵文字|   絵文字置換文字列         | 用途                                                      |
|:-----:|:--------------------------:|:----------------------------------------------------------|
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/copyright.png" alt="©" width="24" height="24" /> | :copyright:                | ライセンスの変更や追加。ライセンスファイルに関して。      |
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/globe_with_meridians.png" alt="🌐" width="24" height="24" /> | :globe_with_meridians:     | 多言語対応ツールの設定や言語リソースの変更                |
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/pencil.png" alt="✏️" width="24" height="24" /> | :pencil:                   | ドキュメントの変更。主にREADME                            |

##### ビルドやデプロイ関係

| 絵文字|   絵文字置換文字列         | 用途                                                      |
|:-----:|:--------------------------:|:----------------------------------------------------------|
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/wrench.png" alt="🔧" width="24" height="24" /> | :wrench:                   | ビルドやデプロイの全般的な変更                            |
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/package.png" alt="📦" width="24" height="24" /> | :package:                  | パッケージングに関する変更                                |
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/apple.png" alt="🍎" width="24" height="24" /> | :apple:                    | OS XやiOSなどApple製品を対象とするのビルド関連変更        |
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/computer.png" alt="💻" width="24" height="24" /> | :computer:                         | Deploy tagert system. Some processor              |
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/space_invader.png" alt="👾" width="24" height="24" /> | :space_invader:            | Android向けのビルド関連変更                               |


##### Gitバージョン管理

| 絵文字|   絵文字置換文字列         | 用途                                                      |
|:-----:|:--------------------------:|:----------------------------------------------------------|
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/arrow_right_hook.png" alt="↪️" width="24" height="24" /> | :arrow_right_hook:         | ブランチをマージしたり、Pull-Requestを取り込んだ時        |
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/up.png" alt="🆙" width="24" height="24" /> | :up:                       | プロダクトのバージョンアップ。git tagとする時             |
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/no_entry_sign.png" alt="🚫" width="24" height="24" /> | :no_entry_sign:            | トラッキングしない時に。.gitignoreの変更時                |

##### 依存関係

| 絵文字|   絵文字置換文字列         | 用途                                                      |
|:-----:|:--------------------------:|:----------------------------------------------------------|
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/arrow_heading_up.png" alt="⤴️" width="24" height="24" /> | :arrow_heading_up:         | 依存ライブラリや依存ツールのバージョンをあげる時。        |
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/arrow_down.png" alt="⤵️" width="24" height="24" /> | :arrow_down:               | 依存ライブラリや依存ツールのバージョンを下げた時。        |


##### 数回使用したものの、ボツになったやつ

| 絵文字|   絵文字置換文字列         | 用途                                                      |
|:-----:|:--------------------------:|:----------------------------------------------------------|
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/arrows_counterclockwise.png" alt="🔄" width="24" height="24" /> | :arrows_counterclockwise:  |  データのリロードに関する時など。長くて使いづらい。       |
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/arrow_upper_left.png" alt="↖️" width="24" height="24" /> | :arrow_upper_left:         | バージョニングに関する変更とか。出番がもうない。          |
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/arrow_upper_right.png" alt="↗️" width="24" height="24" /> | :arrow_upper_right:        | なにかイケてる修正した時に使った。今は:ok:とか:cool:が担当|
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/warning.png" alt="⚠️" width="24" height="24" /> | :warning:                  | Includeガード関連。こんないい絵文字をこう使ったのは痛いミス|
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/point_left.png" alt="👈" width="24" height="24" /> | :point_left:               | コメント関連に使用した。再度登場する機会がない。          |
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/bomb.png" alt="💣" width="24" height="24" /> | :bomb:                     | リモートのファイル削除に関して。たぶん疲れてたんだと思う。|



##### Chinachu PVR クライアント向けの独自記号

| 絵文字|   絵文字置換文字列         | 用途                                                      |
|:-----:|:--------------------------:|:----------------------------------------------------------|
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/1234.png" alt="🔢" width="24" height="24" /> | :1234:                     | テレビのチャンネルに関する変更                            |
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/city_sunrise.png" alt="🌇" width="24" height="24" /> | :city_sunrise:             | 録画データのサムネイルに関する変更                        |
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/hourglass.png" alt="⌛️" width="24" height="24" /> | :hourglass:                | 録画予約に関する変更                                      |
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/vhs.png" alt="📼" width="24" height="24" /> | :vhs:                      | 録画済み番組に関する変更                                  |
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/red_circle.png" alt="🔴" width="24" height="24" /> | :red_circle:               | テレビ番組の録画に関する変更                              |
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/tv.png" alt="📺" width="24" height="24" /> | :tv:                       | リアルタイム視聴に関する変更                              |
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/page_facing_up.png" alt="📄" width="24" height="24" /> | :page_facing_up:           | ログ出力に関する変更                                      |
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/repeat.png" alt="🔁" width="24" height="24" /> | :repeat:                   | サーバーのデータを定期的に取得する部分の変更              |
|<img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/clock1.png" alt="🕐" width="24" height="24" /> | :clock1:                   | 録画予約に関する変更のコミットで間違えて使った。          |


### まとめ

視認性は向上するも、絵文字一文字に対して多いと20文字以上もコミットメッセージを消費してしまうのが難点。
また、「窓」の絵文字がないため、Windows向けバイナリを作成する機運が高まらないのも問題だと感じました（要出典）。

しかし視認性が向上した利点は大きく、GitHubでのコミットログ一覧を流し見するだけで目的のコミットを見つけることができる点はとても良いことであると感ます。
