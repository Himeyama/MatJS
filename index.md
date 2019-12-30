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

<span id="formula">
<script>
let a = Matrix.identity(4)
document.querySelector("#formula").innerHTML = `$${a.to_tex()}$`
</script>
</span>

# hoge
## hogehoge
### hogehogehoge