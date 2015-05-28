(function(global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {

    module.exports = factory(global, true);

  } else {

    factory(global);
  }

})( typeof window !== 'undefined' ? window : this, function( window, noGlobal) {

  function Ajax(opts) {

    opts.type = opts.type || 'GET';

    if (opts.type.toUpperCase() == 'POST') {

      opts.data = typeof opts.data == 'string' ? opts.data : Ajax.param(opts.data);

    } else {

      if (opts.data) {

        var url = opts.url.split('?')[0] + '?';

        var params = Ajax.param(opts.data);

        opts.url = url + params;

      }

      opts.data = null;
    }

    if (opts.success && typeof opts.success !== 'function') {

      console.error('param [success] must be a funciton.');

      return false;

    }

    if (opts.fail && typeof opts.fail !== 'function') {

      console.error('param [fail] must be a funciton.');

      return false;

    }

    Ajax.opts = opts;

    Ajax.create().send();

  }

  Ajax.create = Ajax.prototype.create = function() {

    var xhr = null;

    xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    xhr.open(Ajax.opts.type, Ajax.opts.url);

    xhr.setRequestHeader("Content-Type", Ajax.opts.contentType || "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {

      if (xhr.readyState !== 4) return ;

      if (xhr.status == 200 || xhr.status == 1223) {

        Ajax.success();

      } else {

        Ajax.fail();

      }
    };

    Ajax.xhr = xhr;

    return Ajax;

  };

  Ajax.send = Ajax.prototype.send = function() {

    Ajax.xhr.send(Ajax.opts.data);

    return Ajax;

  };

  Ajax.success = Ajax.prototype.success = function() {

    if (!Ajax.opts.success) return;

    var res = window.JSON ? JSON.parse(Ajax.xhr.responseText) :  window.eval('(' + Ajax.xhr.responseText + ')');

    Ajax.opts.success(res);

    return Ajax;

  };

  Ajax.fail = Ajax.prototype.fail = function() {

    if (!Ajax.opts.fail) return;

    Ajax.opts.fail({status: Ajax.xhr.status});

    return Ajax;

  };

  Ajax.param = Ajax.prototype.param = function(obj) {

    var _string= [];

    for (var i in obj) {

      if (obj.hasOwnProperty(i)) {

        _string.push(i + '=' + obj[i]);

      }

    }

    return _string.join('&');

  };

  if (noGlobal) {
    return Ajax;
  }

  if (window.Ajax) {

    console.Error('Ajax is existed in window!');

  } else {

    window.Ajax = Ajax;

  }

});

