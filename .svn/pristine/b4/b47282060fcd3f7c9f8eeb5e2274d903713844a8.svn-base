var axios = require('axios')

function queryEncoded(params) {
    var queryStr = '';
    for (let key in params) {
        let value = encodeURIComponent(params[key])
        if (value == "" || value == undefined) continue
        queryStr += '&' + key + '=' + value;
    }
    return queryStr.substr(1);
}
function transformRequest(data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}
function request(method, url, params, success, failure) {
    method = method.toUpperCase();
    let headerInfo = {
        'token': '',
    }, responseType = '';
    if ((method === 'GET' && params) || (method == 'POST' && params) || (method == 'PUT' && params)) {
        if (params && params.header) {
            headerInfo = params.header;
            delete params.header;
        }
        if (params && params.responseType) {
            responseType = params.responseType;
            delete params.responseType;
        }
        let index = url.indexOf('?');
        if (method === 'GET') {
            url = (index == -1 ? url : url.substr(0, index)) + '?' + queryEncoded(params);
        }
    }
    if (!url) {
        alert('请求地址为空')
        return;
    }
    var root = url.indexOf('/ajax') > -1 ? process.env.AJAX_ROOT : process.env.API_ROOT;
    
    params = headerInfo.ContentType == 'application/x-www-form-urlencoded' ? transformRequest(params) : params
    axios({
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? params : null,
        headers: headerInfo ? headerInfo : null,
        responseType: responseType ? responseType : 'json',
        baseURL: root,
    }).then(function(res) {
        if ((res.data.result_code&&(res.data.result_code + '').indexOf('2') == 0) || res.data.code == 200) {
          if (typeof success == 'function') {
            success(res.data);
          }
        } else if (responseType == 'blob') {
          if (typeof success == 'function') {
            success(res);
          }
        } else {
          if (typeof failure == 'function') {
            failure(res.data)
          } else {
            window.alert('ERROR:' + JSON.stringify(res.data));
          }
        }

    }).catch(function(err) {
        if (err) {
            window.alert('API ERROR:' + err);
        }
    });
}

export default {
    get: function(url, params, success, failure) {
        return request('GET', url, params, success, failure);
    },
    post: function(url, params, success, failure) {
        return request('POST', url, params, success, failure);
    },
    put: function(url, params, success, failure) {
        return request('PUT', url, params, success, failure);
    },
    delete: function(url, params, success, failure) {
        return request('DELETE', url, params, success, failure);
    },
}
