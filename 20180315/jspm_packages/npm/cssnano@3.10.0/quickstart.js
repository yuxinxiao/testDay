/* */ 
const cssnano = require('./dist/index');
const css = `
h1 {
    color: #ff0000;
    font-weight: bold;
}
`;
const opts = {};
cssnano.process(css, opts).then((result) => {
  console.log(result.css);
});
