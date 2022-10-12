const css = `
@import url("https://sindresorhus.com/github-markdown-css/github-markdown.css");

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  width: 100%;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 15px 0;
  transition-duration: 1s;
}

.container > div {
  border-bottom:1px solid black;
  padding-bottom: 15px;
}

.container > div {
  padding: 5px
}

.zoom1 {
  grid-template-columns: 2fr 1fr 1fr;
}

.zoom2 {
  grid-template-columns: 1fr 2fr 1fr;
}

.zoom3 {
  grid-template-columns: 1fr 1fr 2fr;
}
`;

module.exports = {
  css,
};
