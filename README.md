A easy ajax library

usage way : script, npm

browser support: ie8 +

##Usage

###script
```html
<script src="index.js"></script>
<script>
  Ajax({
    url: '/xxxx/xxx',
    type: 'post', //default get
    data: {
      name: 'xxxx'
    },
    success: function(result) {
      //write callback
    },
    fail: function(result) {

    }
  });
</script>

```

###npm

```js
//cli
npm i ajax-easy

//js

var ajax = require('ajax-easy');

ajax({
  url: '/xxxx/xxx',
  type: 'post', //default get
  data: {
    name: 'xxxx'
  },
  success: function(result) {
    //write callback
  },
  fail: function(result) {

  }
});


```


