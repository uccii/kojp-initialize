# kojp-initialize

## プロジェクト概要

ニッカオフィス合同会社（knicka office LLC）のコーポレートWebサイトのリソース生成プロジェクト。
横浜市のUI/UXデザインクリエイティブスタジオのサイトであり、日本語コンテンツが主体。

そのコーポレートWebサイトは、WordPressで構築されている。
このプロジェクトで生成したファイルは、そのWordPressに最終的に反映する。

### WordPress連携

- `dist/` のビルド出力を WordPress テーマに埋め込んで使用する
- WordPress テーマファイルは `../wp` に格納されている
- HTML 構造やCSS/JSの変更は WordPress テーマ側（`../wp`）にも影響するため、両方の整合性を確認すること

### WordPress テーマファイル構成（`../wp`）

| ファイル | 役割 | kojp-initialize との対応 |
|---|---|---|
| `head.php` | 共通`<head>` — TypeKit読み込み、ページ種別に応じたCSS切り替え | CSS出力パス `/css/<ページ名>/style.css` を参照 |
| `header.php` | 共通ヘッダー + PHP動的処理（最新投稿URL等） | `src/component/_header.ejs` と同じDOM構造 |
| `footer.php` | 共通フッター + PHP動的処理 | `src/component/_footer.ejs` と同じDOM構造 |
| `home.php` | トップページ | `src/index.ejs` に対応、`/js/top/script.js` を読み込み |
| `single.php` | ブログ個別記事（和暦タイトル変換、前後記事ナビ） | `src/blog/index.ejs` に対応、`/js/blog/script.js` を読み込み |
| `page.php` | 固定ページ（contact, faq等） | スラッグから `/css/<スラッグ>/style.css`, `/js/<スラッグ>/script.js` を動的生成 |
| `functions.php` | 画像パスヘルパー(`imdir`)、和暦タイトル変換、スラッグ管理等 | — |
| `style.css` | テーマ宣言のみ（実スタイルはdistから配信） | — |

### 連携時の注意事項

- **CSS/JSパス**: WordPress側は `/css/<ページ名>/style.css`, `/js/<ページ名>/script.js` のパスでdist出力を参照する。distのディレクトリ名とWordPress側のパスを一致させること
- **HTML構造**: `header.php`/`footer.php` のクラス名・DOM構造は `_header.ejs`/`_footer.ejs` と一致させる必要がある
- **固定ページ**: `page.php` は投稿スラッグ（`$post->post_name`）でCSS/JSパスを解決するため、ページスラッグとdistのディレクトリ名が一致している必要がある

### WordPressと連携するプロジェクト構成
| プロジェクト | 役割 | パス |
|---|---|---|
| kojp-initialize | knicka office Webサイトのリソース（このプロジェクト）（連携元） | ./ |
| knicka office WordPress テーマ | WordPressテーマ（連携先） | ../wp |

## 技術スタック

- **ビルド**: Webpack 4 + Babel
- **テンプレート**: EJS (`.ejs` → `.html`)
- **スタイル**: SCSS (node-sass) → CSS (MiniCssExtract + AutoPrefixer)
- **JavaScript**: ES modules + jQuery 3.x
- **Node.js**: v12.14.1 (Volta で固定)
- **開発サーバー**: webpack-dev-server (ポート 3000)

## コマンド

```bash
npm start        # 開発サーバー起動 (localhost:3000)
npm run dev      # development ビルド → dist/
npm run build    # production ビルド → dist/
```

## ディレクトリ構成

```
src/
├── index.ejs                  # トップページ
├── blog/index.ejs             # エッセイページ
├── contact/index.ejs          # お問い合わせページ
├── faq/index.ejs              # FAQページ
├── knickamincho/index.ejs     # ニッカ明朝ページ
├── pictures/index.ejs         # 絵を学んでみたページ
├── vr/index.ejs               # VRラボページ
├── component/
│   ├── _header.ejs            # 共通ヘッダー (partial)
│   └── _footer.ejs            # 共通フッター (partial)
├── js/
│   ├── script.js              # 共通エントリ (jQuery読み込み)
│   ├── common/                # 共通JS (init.js, lib.js)
│   ├── top/                   # トップページJS
│   ├── blog/                  # ブログページJS
│   ├── contact/               # コンタクトページJS
│   └── faq/                   # FAQページJS
├── sass/
│   ├── style.scss             # 共通エントリ (normalize + common/*.scss)
│   ├── normalize.scss         # リセットCSS
│   ├── common/style.scss      # 共通スタイル (レイアウト, ナビ, フッター等)
│   ├── top/                   # トップページ固有スタイル
│   ├── blog/                  # ブログ固有スタイル
│   ├── contact/               # コンタクト固有スタイル
│   ├── faq/                   # FAQ固有スタイル
│   ├── knickamincho/          # ニッカ明朝固有スタイル
│   ├── pictures/              # 絵ページ固有スタイル
│   └── vr/                    # VRページ固有スタイル
├── img/                       # 画像アセット
└── font/                      # カスタムフォント (knicka-mincho)
dist/                          # ビルド出力 (git管理外推奨)
```

## Webpack エントリポイント

各ページは独立したバンドルとしてビルドされる:

| エントリ名 | JS | SCSS |
|---|---|---|
| `common` | `js/script.js` | `sass/style.scss` |
| `top` | `js/top/script.js` | `sass/top/style.scss` |
| `blog` | `js/blog/script.js` | `sass/blog/style.scss` |
| `contact` | `js/contact/script.js` | `sass/contact/style.scss` |
| `faq` | `js/faq/script.js` | `sass/faq/style.scss` |
| `knickamincho` | *(なし)* | `sass/knickamincho/style.scss` |
| `vr` | *(なし)* | `sass/vr/style.scss` |

EJS ファイルは `src/` 直下・サブディレクトリから自動検出され、`_` 接頭辞のファイルは partial として除外される。

## コーディング規約

### EJS テンプレート
- 各ページ先頭で `pageData` オブジェクトを定義 (`pageTitle`, `pageGlobalNavActive`, `pageType`)
- 共通ヘッダー/フッターは `<%- include('component/_header', {page: pageData}) %>` で読み込み
- CSS/JS はページ固有のバンドルを `<link>` / `<script>` で直接指定 (`inject: false`)

### SCSS
- 共通スタイルは `sass/common/style.scss` に集約
- ページ固有スタイルは `sass/<ページ名>/style.scss`
- `rem` 単位を使用 (`html { font-size: 62.5% }` で 1rem = 10px)
- メディアクエリのブレークポイント: 600px (タブレット), 688px, 748px, 1024px (デスクトップ)
- BEM ライクな命名規則 (`block__element--modifier`)
- カスタムフォント `knicka-mincho` と TypeKit (`yu-mincho-pr6n`, `ten-mincho`) を使用
- テキストカラー: `#2B2B2B`, 背景: `#fff`, アクセント背景: `#F5F4EE`

### JavaScript
- `src/js/common/lib.js` にユーティリティ関数を集約
- `src/js/common/init.js` で共通初期化処理 (ナビゲーション, スムーススクロール, モーダル等)
- 各ページの `script.js` がエントリポイントとなり、common の init を呼び出す構成
- ESLint は Airbnb 設定を使用

### ブラウザ対応
- `last 2 versions`, `Android >= 4`, `> 3% in JP`
