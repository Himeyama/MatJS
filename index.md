---
layout: default
title: matrix.js
---

<!-- <script src="jquery-3.4.1.min.js"></script> -->
<script type="text/x-mathjax-config">
MathJax.Hub.Config({ 
  TeX: {  extensions: ["cancel.js"] },
  tex2jax: { inlineMath: [ ['$','$'], ['\\(','\\)'] ], processEscapes: true }
});
</script>
<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-MML-AM_CHTML&locale=ja">
</script>
<script src="./matrix.js"></script>


ベクトルや行列のライブラリー(開発中)

# ダウンロード
- [最新版 - matrix.js](matrix.js)

# プロパティ

## Matrix.rowSize
行数
```js
mat = Matrix.rows([[1, 2, 3], [4, 5, 6]])
console.log(mat.rowSize)
```
```
2
```

## Matrix.colSize
列数
```js
mat = Matrix.rows([[1, 2, 3], [4, 5, 6]])
console.log(mat.colSize)
```
```
3
```

# メソッド
説明ではわかりやすくするために、オブジェクトを数式で表しています。

## Matrix.rows()
行列を生成します。
```js
mat = Matrix.rows([[1, 2, 3], [4, 5, 6]])
```
<span id="rows">
<script>
let mat = Matrix.rows([[1, 2, 3], [4, 5, 6]])
document.querySelector("#rows").innerHTML = `$mat = ${mat.to_tex()}$`
</script>
</span>

## Matrix.column_vector()
列ベクトルを生成します。
```js
vec = Matrix.column_vector([1, 2, 3])
```
<span id="column-vector">
<script>
mat = Matrix.column_vector([1, 2, 3])
document.querySelector("#column-vector").innerHTML = `$vec = ${mat.to_tex()}$`
</script>
</span>

## Matrix.ones()
要素が1の行列を生成します。
引数はベクトルや配列の大きさです。
```js
vec = Matrix.ones(3)
mat = Matrix.ones([5, 6])
```
<span id="ones">
<script>
let vec = Matrix.ones(3)
mat = Matrix.ones([5, 6])
document.querySelector("#ones").innerHTML = `$vec = ${vec.to_tex()}\\\\ mat = ${mat.to_tex()}$`
</script>
</span>

## Matrix.zeros()
要素が0の行列を生成します。
引数はベクトルや配列の大きさです。
```js
vec = Matrix.zeros(3)
mat = Matrix.zeros([5, 6])
```
<span id="zeros">
<script>
vec = Matrix.zeros(3)
mat = Matrix.zeros([5, 6])
document.querySelector("#zeros").innerHTML = `$vec = ${vec.to_tex()}\\\\ mat = ${mat.to_tex()}$`
</script>
</span>

## Matrix.identity()
単位行列を生成します。`Matrix.unit()`と同じメソッドです。
```js
e = Matrix.identity(5)
```
<span id="identity">
<script>
mat = Matrix.identity(5)
document.querySelector("#identity").innerHTML = `$e = ${mat.to_tex()}$`
</script>
</span>

## Matrix.empty()
空の行列を生成します。
```js
mat = Matrix.empty(3, 0)
console.log(mat)
mat = Matrix.empty(0, 3)
console.log(mat)
```
```
[[], [], []]
[]
```

## Matrix.prototype.product()
行列の積を計算します。
```js
mat = Matrix.rows([[1, 2, 3], [4, 5, 6]])
console.log(mat.product(2))
mat = Matrix.rows([[1, 2, 3], [4, 5, 6]]).product(Matrix.rows([[1, 2], [3, 4], [5, 6]]))
console.log(mat)
```
```
[[2, 4, 6], [8, 10, 12]]
[[22, 28], [49, 64]]
```

## Matrix.prototype.transpose()
転置行列。`Matrix.prototype.t()`と同じです。
```js
mat = Matrix.rows([[1, 2, 3], [4, 5, 6]])
console.log(mat.transpose())
```
```
[[1, 4], [2, 5], [3, 6]]
```