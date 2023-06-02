---
title: "JOYINGのAndroidカーナビをRoot化する(?)[SC9853i搭載向け]"
date: 2020-09-11T05:00:00+09:00
author: mzyy94
categories: ["Automobile"]
tags: [car-audio", "中華ナビ", "navigation", "joying", "android", "magisk", "root"]
image: "/assets/images/2020/09/11/magisk-installed.png"
---

[前回軽くレビュー](../2020/2020-09-07-joying-car-navigation-prius-zvw30.md)したJOYINGのカーナビ。
[前々回の調査](/2020/2020-09-03-high-res-720p-car-navigation.md)の通り購入を迷う中華ナビは他にも候補があったが、SC9853iを搭載したJOYINGのカーナビにした理由はいくつかある。
そのうちの一つとして、ファームウェアアップデートファイルの配布があることが理由として一番大きい。
アップデートの方法が用意されているということは、カスタマイズの口が開けるということを意味すると言っても過言ではない。
そう、みんな大好きroot化への光が差すのだ。

ということで、root化できるかどうかの調査と試行を重ねた挑戦の記録をここに残す。


## 目次

## JOYING カーナビのバージョン確認

はじめに、現在動作しているJOYINGカーナビのバージョンを確認する。

![current-version.png](/assets/images/2020/09/11/current-version.png)


JOYINGのファームウェアにはバージョン番号というものはなく、日付で管理されている。
この場合はバージョン2020.6.22のようだ。

## JOYINGファームウェアの入手

以下のJOYING公式サイトのブログ記事からダウンロードできる。

[Joying Android 8.1 Intel Airmont SC9853i 2GB+16GB/4GB+32GB Car Stereo Latest Update](https://www.joyingauto.com/blog/post/joying-android-8-1-intel-airmont-sc9853i-2gb-16gb-4gb-32gb-car-stereo-latest-update/)

執筆時にダウンロードできるファームウェアアップデートファイル（以下、アップデートファイル）の最新版は「9853i OS 1024X600 800X480 1280X720 2020.4.7.zip」である。
ファイル名から見てわかるように、バージョン2020.4.7だ。

ファームウェアアップデートの方法は、解凍して中身をUSBメモリに展開し、JOYINGカーナビに差し込めば良いようだ。

![detect-firmware.png](/assets/images/2020/09/11/detect-firmware.png)

アップデートファイルの入ったUSBメモリを検知すると、ダイアログが出てカウントダウンが進む。
ゼロになるかそれまでにCANCELを選択しない場合、システムが再起動してファームウェアアップデートが開始される。

## アップデートファイルの解析

手に入れたら解析したくなるのが人のさがだ。早速中身を見てみる。

### 構造

アップデートファイルのzipファイルの構造は、以下のようになっていた

![firmware-structure.png](/assets/images/2020/09/11/firmware-structure.png)

さらにzipファイルが含まれているので、この**6521_1.zip**も見てみる。

![ota-package.png](/assets/images/2020/09/11/ota-package.png)

ファイル構造から、**6521_1.zip**はOTAパッケージであることがわかる。

### OTAパッケージの署名

まずはOTAパッケージの**6521_1.zip**から解析してみる。

AndroidのOTAパッケージは署名がされている。Androidシステム内に保持している公開鍵と照合し、正しい発行元の鍵で署名されているかを検証して不正なアップデートの書き込みを防ぐことが目的だ。

[リリース用のビルドへの署名  \|  Android オープンソース プロジェクト  \|  Android Open Source Project](https://source.android.com/devices/tech/ota/sign_builds?hl=ja)

署名に用いられた公開鍵は、**/META-INF/com/android/otacert**にPEM形式で保管されている。中身を見てみると、次のようになっていた。

![otacert.png](/assets/images/2020/09/11/otacert.png)

よく見たことのある公開鍵だ。
この公開鍵は、AOSP (Android Open Source Project) に含まれる[テスト用の公開鍵](https://android.googlesource.com/platform/build/+/refs/heads/oreo-release/target/product/security/testkey.x509.pem)であることがパッと見でわかる。
そしてそのテスト用公開鍵は、対になる[秘密鍵も公開](https://android.googlesource.com/platform/build/+/refs/heads/oreo-release/target/product/security/testkey.pk8)されている。
秘密鍵が手に入るということは、秘密鍵を使って署名したOTAパッケージが作成できることを意味する。

すなわち、**JOYINGのOTAパッケージは好きに改造できる**のである。

### OTAアップデートスクリプト

**6521_1.zip**の中身も解析してみる。

OTAパッケージを用いたファームウェアアップデートは、デバイスがリカバリモードで再起動し、OTAパッケージに含まれる**/META-INF/com/google/android/updater-script**を実行してシステムの更新を行う。

参考: [OTA アップデートのライフサイクル  非 A/B システム アップデート  \|  Android オープンソース プロジェクト](https://source.android.com/devices/tech/ota/nonab?hl=ja#life-ota-update)

> アップデータはパッケージの .zip ファイル内で `META-INF/com/google/android/updater-script` ファイルにあるスクリプトを探します。

引用元: [OTA パッケージの詳細  \|  Android オープンソース プロジェクト  \|  Android Open Source Project](https://source.android.com/devices/tech/ota/nonab/inside_packages?hl=ja)

このスクリプトの中身をみると、**/dev/block/platform/soc/soc:ap-ahb/c0c00000.sdio/by-name/**以下にあるブロックファイルへのシンボリックリンクを介し、いくつかのパーティションにOTAパッケージに含まれるイメージファイルを書き込んでいることがわかる。
各パーティションのブロックファイルの位置が分かったので、有効なOTAパッケージに自作のイメージファイルを格納すれば、**JOYINGのパーティションは自由に書き換えられる**と言える。

### システムアプリケーションアーカイブ

**Allapp.pkg**は、さらっと目を通すとシステムアプリケーションのAPKと、ライブラリや設定ファイルなどが固められたアーカイブファイルだということが見て取れる。
このファイルは有名なアーカイブフォーマットではないようで、おそらく独自のフォーマットで作られている。
適当に構造を推測しながら解析を進めていくと、次のスクリプトで中身を展開できた。独自フォーマットの解析は朝飯前だ。

<script src="https://gist.github.com/mzyy94/eadad9fc3fd66c91c15dfe874e955f8c.js?file=extract-allapppkg.py"></script>

SystemUI.apkやSettings.apkなど、システムの要となるアプリケーションが含まれていた。

### アップデート実行ファイル

アップデートファイルには正体不明の **lsec6521update** なるファイルが含まれている。
ちょろっと中身を見て、良い感じに切り出したら実行ファイルであることがわかった。

![trim-lsec6521update.png](/assets/images/2020/09/11/trim-lsec6521update.png)

どのような実装になっているのかを[Binary Ninja](https://binary.ninja/)で解析してみた。
すると興味深い処理が含まれていることがわかった。

![analyze-lsec6521update.png](/assets/images/2020/09/11/analyze-lsec6521update.png)

main関数からいくつかの処理を経て、終盤に **lsec_updatesh/lsec.sh** というファイルが見つかればそれを実行しようとするのだ。
このようなファイルはアップデートファイルには含まれていないが、勘でShellScriptを用意すれば良いことはわかる。
物は試しということで、以下のようなスクリプトをUSBメモリの**lsec_updatesh/lsec.sh**に配置し、**lsec6521update**と共に格納してJOYING カーナビに差し込んでみた。

<script src="https://gist.github.com/mzyy94/18580f051415ea45a3f69aee0805109c.js?file=lsec.sh"></script>

ビンゴ〜〜！通常のファームウェアアップデートと同様にダイアログが出たのち、自動でリカバリモードで再起動され、スクリプトが実行された。
log.txtの中身は次のようになっていた。

<script src="https://gist.github.com/mzyy94/18580f051415ea45a3f69aee0805109c.js?file=log.txt"></script>

この結果より、**任意のコマンドをroot権限で実行できる**ことがわかった。

## Magiskによるroot化

アップデートファイルの解析でわかった「**JOYINGのOTAパッケージは好きに改造できる**」「**JOYINGのパーティションは自由に書き換えられる**」「**任意のコマンドをroot権限で実行できる**」の3つの事実から、次のようなroot化シナリオを立てられる。

- boot.imgの吸い出しをroot権限で行う
- Magisk Managerでboot.imgにパッチを充てる
- パッチを当てたboot.imgを書き込むOTAパッケージを作る
- ファームウェアアップデートでBOOTパーティションに書き込む

Androidをroot化する方法はいくつか存在するが、ここではリカバリパーティションの上書きを行わない[Magisk Manager](https://magiskmanager.com/)によるBOOTロムパッチを選択する。

### boot.img吸い出し

Magisk ManagerでBOOTロムパッチを充てるには、BOOTロムイメージ (boot.img) が必要だ。
配布されているアップデートファイルのOTAパッケージにもboot.imgが含まれているが、手元のJOYINGカーナビとはバージョンが一致せず使えない。
無ければ作ってしまえの精神で、実機のBOOTパーティションから吸い出してBOOTロムイメージを作ってしまえばいい。
たとえ同じバージョンのものが配布されていたとしても、リビジョン違いなどのわずかな差異があるだけで動作不能に陥ることもあるので、吸い出した方が確実である。
root化に伴う作業はどれも慎重を期して行わなければならない。

**lsec_updatesh/lsec.sh**がroot権限で動作することから、ブロックファイルに直接アクセスでき、BOOTパーティションからBOOTロムイメージを吸い出すことができるはずだ。
以下のスクリプトをUSBメモリの**lsec_updatesh/lsec.sh**に作成し、**lsec6521update**をUSBメモリのトップに配置してJOYINGカーナビに差し込む。
リカバリモードからの再起動を終え、取り外したUSBメモリを確認すると期待通りBOOTロムイメージの吸い出しができていた。

```sh
#!/system/bin/sh

dd if=/dev/block/platform/soc/soc:ap-ahb/c0c00000.sdio/by-name/boot of=/storage/sdcard1/boot.img
```

吸い出したあとはPCで**lsec6521update**と**lsec_updatesh**ディレクトリを削除し、USBメモリをJOYINGカーナビに差し込んでおく。

### BOOTロムパッチ充て

準備としてJOYINGカーナビでファイルマネージャを起動し、USBメモリにある**boot.img**を内蔵ストレージのユーザーディレクトリ最上位 (/mnt/sdcard/) に配置する。
これをやっておかないとMagisk Managerから**boot.img**を選択できなかったからだ。

配置できたら好きな手段でJOYINGカーナビにMagisk Managerをインストールする。
今回はJOYINGカーナビでGoogle Chromeを開き、Magisk Managerの配布ページにアクセスしてダウンロード・インストールした。

![magiskmanager.png](/assets/images/2020/09/11/magiskmanager.png)

Magisk Managerを起動するとｲﾝｽﾄｰﾙという項目が2つあるので、上のを選んだら「Select and Patch a File」を選び、先ほどの**boot.img**を選択して待つ。

![install-magisk.png](/assets/images/2020/09/11/install-magisk.png)

![select-and-patch-a-file.png](/assets/images/2020/09/11/select-and-patch-a-file.png)

![select-image.png](/assets/images/2020/09/11/select-image.png)

![magisk-done.png](/assets/images/2020/09/11/magisk-done.png)

無事パッチがあたると/mnt/sdcard/Downloads/に**magisk_patched.img**が出来上がるので、それをUSBメモリに転送しておく。

![magisk-patched.png](/assets/images/2020/09/11/magisk-patched.png)

### OTAパッケージの作成

**magisk_patched.img**をBOOTパーティションに書き込むOTAパッケージを作る。
作り方は簡単で、正しい構造のzipファイルとパーティション操作をするupdater-scriptを作るだけだ。

ゼロから作るのは骨が折れるため、JOYINGアップデートファイルを元にして作る。
手順を説明するよりコードで語った方が早いので、次のスクリプトの引数にJOYINGアップデートファイルと**magisk_patched.img**のパスを渡してあげると./outに必要なファイルが出力されるようにしておいた。

例: `sh ./createpatchedboot.sh ~/Downloads/9853i\ OS\ 1024X600\ 800X480\ 1280X720\ 2020.4.7.zip ../magisk_patched.img && ls ./out`

<script src="https://gist.github.com/mzyy94/fc1e5cbed5c6814777e5938351a5bed1.js?file=createpatchedboot.sh"></script>

署名の方法については以下のサイトに詳しく解説されているが、今はAOSPプロジェクトに含まれる[SignApk.java](https://android.googlesource.com/platform/build/+/refs/heads/nougat-release/tools/signapk/src/com/android/signapk/SignApk.java)で簡単にできるようになっている。

[APK ファイルの署名の仕様 - urandroid’s blog](https://urandroid.hatenablog.com/entry/20110818/1313656536)

Java環境のセットアップがとてつもなく面倒くさかったので、Dockerファイルで環境を閉じ込めておいた。

[Docker-signapk \| GitHub Gist](https://gist.github.com/mzyy94/e76fb3445e14b9af92dd99340b8403fb)

このgistをcloneして、そのディレクトリの中で`docker build -t signapk:latest .`すれば準備完了。
先ほどのOTAパッケージが出力された./outディレクトリに移動し、次のように実行すれば署名された**6521_1.zip**の出来上がり。

```sh
mv 6521_1.zip 6521_1_plain.zip
docker run --rm -e OPTION="-w" -v $PWD:/data signapk:latest 6521_1_plain.zip 6521_1.zip
rm 6521_1_plain.zip
```

### boot上書きファームウェアアップデート

出来上がった**6521\_1.zip**と**lsec6521update**をUSBメモリに配置して、**_自己責任で_**JOYINGカーナビに差し込んで、あとは勝手に再起動するのを祈って見届けてあげればroot化の完了。
root化は手順が合っていたとしても壊れる可能性があるので自己責任で（大事なことなので2回）。

![magisk-installed.png](/assets/images/2020/09/11/magisk-installed.png)

[Root Checker](https://play.google.com/store/apps/details?id=com.joeykrim.rootcheck&hl=ja)でも確認したところ、しっかりとrootが取れていることがわかった。

![root-checker.png](/assets/images/2020/09/11/root-checker.png)


## まとめ

いかがでしたか？特に目的はないけどroot化してみました！
同様にして**OTAパッケージがtestkeyで署名されている**端末もroot化できるかもしれないので、今後の参考に頭の隅に留めておくと良いかもしれません。
