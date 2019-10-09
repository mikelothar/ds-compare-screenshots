const css = `
@import url("https://sindresorhus.com/github-markdown-css/github-markdown.css");

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 1700px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}`

module.exports = {
  css,
}
