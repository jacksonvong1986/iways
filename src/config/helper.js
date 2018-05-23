function setCookie(cname, cvalue, seconds) {
    var d = new Date();
    d.setTime(d.getTime() + (seconds * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function delCookie(name) {  
    var exp = new Date();  
    exp.setTime(exp.getTime() - 1);  
    var cval = getCookie(name);
    if(cval!=null)  
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();  
}  

function inArray(value, arr) {
    if ( (typeof value != 'string' && typeof value != 'number') || typeof arr != 'object') return -1;
    for (var x in arr) {
        if (arr[x] == value) return x;
    }
    return -1;
}

function findInArray(key, value, arr, sub='sub', output = []) {
  if (typeof key != 'string' || !value || typeof arr != 'object') return {};
  for (var i in arr) {
    var item = arr[i];
    if (item[key] && item[key] == value) {
      output.push(item)
    } else if (item.hasOwnProperty(sub) && typeof item[sub] == 'object') {
      findInArray(key, value, item[sub], sub, output);
    }
  }
  return output.length > 0 ? output[0] : {};
}

function recurse(data, key = 'id', son = '_sub_', output = [{},{}]) {
  var nodes = {}
  , index = 1
  data.map(item => {
    index = item.path.split('-').length
    if (output[index] == undefined) {
      output[index] = {}
    }

    if (!!item[key]) {
      if (item.hasOwnProperty(son)) {
        nodes[item[key]] = []
        output[index] = Object.assign({}, output[index], nodes)
        recurse(item[son], key, son, output)
      }
    }
  })
  return output
}

function arr2table(_array_tree, id='id', pid='pid', son='sub') {
  let tree = []
  for (let i in _array_tree) {

    let _tree = {}
    let sub = []
    for (let key in _array_tree[i]) {
      if (key == son) {
        sub = _array_tree[i][son]
      } else {
        _tree[key] = _array_tree[i][key]
      }
    }
    tree.push(_tree)
    if (!!sub) {
      let sub_array = this.arr2table(sub, id, pid, son)
      tree = tree.concat(sub_array)
    }
  }
  return tree
}

function queryEncoded(params) {
  var queryStr = '';
  for (let key in params) {
    let value = encodeURIComponent(params[key])
    if (value == "" || value == undefined) continue
    queryStr += '&' + key + '=' + value;
  }
  return queryStr.substr(1);
}

var menu = function() {
  this.version = '1.0';
}
menu.prototype.getUri = function (uri) {
  uri = uri || window.location.href;
  uri = (uri.indexOf(window.location.host) !== -1 ? uri.split(window.location.host)[1] : uri).split('?')[0];
  return (uri.indexOf('#') !== -1 ? uri.split('#')[1] : uri);
}
/*! 通过URI查询最有可能的菜单NODE */
menu.prototype.getNode = function (menus, url) {
  var menu = menus.map((item) => {
    if (item.url.indexOf(url) >= 0) {
      return item
    }
  }).filter(item => item != undefined)
  if (menu.length > 0) {
    return menu[0].path ? 'm' + menu[0].path : ''
  }
  var node = location.href.replace(/.*spm=([\d\-m]+).*/ig, '$1')
  return /^m\-/.test(node) ? node : ''
}

export default {
  setCookie: setCookie,
  getCookie: getCookie,
  delCookie: delCookie,
  inArray: inArray,
  findInArray: findInArray,
  recurse: recurse,
  arr2table: arr2table,
  queryEncoded: queryEncoded,
  menu: new menu()
}