const fs = require('fs');
const path = require('path');
const url = require('url');
const express = require('express');
const proxy = require('http-proxy-middleware');
var app = express();
var port = 80;

app.use(express.static(path.resolve(__dirname, './dist')))

const apiPolicyProxy = proxy('/policy', { 
  target: '/api/policy',
  changeOrigin: true,
  pathRewrite: function (path, req) { 
   return /\/buildFile\//ig.test(path) ? `/policy/buildFile?${path.split('?')[1]}` : path
  } 
});
app.use('/policy/*', apiPolicyProxy);

const apiProxy = proxy('/api', { target: '',changeOrigin: true });
app.use('/api/*', apiProxy);

const ajaxProxy = proxy('/ajax', { target: '',changeOrigin: true });
app.use('/ajax/*', ajaxProxy);

app.get('*', function(req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
  res.send(html)
});

app.listen(port, () => {
  console.log('Listening on: http://127.0.0.1:' + port);
});
