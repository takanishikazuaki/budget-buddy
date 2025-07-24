# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

やること
・報告スケジュール・内容の擦り合わせ
・作るプロダクトの詳細設計（モック）
・段取りの確認
・エラー修正
・二段埋め込んだ後に自動で別の入力欄に移動する
・プルダウン絞り込み

いいですね！
機能面・UI面での要望が具体的で整理されているので、これをもとに進めやすいと思います。以下のように分解・整理してみました。

---

## 1. 入力画面の項目の並び替え

* 順番：日付 → 金額 → カテゴリ → カード → メモ
* UIをNaive UIのフォームコンポーネントで見やすくレイアウトする

---

## 2. 取引一覧の編集・削除機能追加

* 直近取引一覧を表示（カレンダー画面の下など）
* 取引クリックで編集用モーダルを表示（編集・削除ボタン含む）
* 編集・削除操作後、画面を再描画して最新状態に反映

---

## 3. カレンダー画面の機能

* カレンダーの日付押下でその日の取引集計を一覧表示
* 取引選択で編集モーダル表示

---

## 4. 検索機能

* ヘッダー左端に検索アイコン設置
* クリックで検索モーダルを表示
* 検索対象：メモ、カテゴリ名、金額
* 検索結果一覧を表示し、結果クリックで編集モーダル表示
* 編集後は画面再描画で更新

---

## 5. 画面再描画について

* 編集や削除を行った後は、状態管理（Pinia等）を更新し、再描画をトリガーして最新状態をUIに反映させる
* 可能ならローカル状態の同期を工夫し、無駄な再描画は避ける

---

### 次のステップ案

* まずは入力画面のレイアウト変更（項目の順序入れ替え）から対応
* 取引一覧のモーダル編集機能を作成し、Piniaの状態更新を適切に行う
* カレンダー画面から該当日の取引表示を作成
* 検索モーダルのUIと機能実装
* 全体の状態管理・画面更新の整合性を確認・調整

---

もし具体的にどのパーツから着手したいか教えてもらえれば、コード例や設計のポイントもサポートします！
また、状態管理やモーダルの実装で迷うところがあれば気軽に相談してくださいね。
