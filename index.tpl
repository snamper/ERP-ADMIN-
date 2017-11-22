<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <script type='text/javascript'>
          var _vds = _vds || [];
          window._vds = _vds;
          (function(){
            _vds.push(['setAccountId', '8105afeaf4e1ef50']);
            (function() {
              var vds = document.createElement('script');
              vds.type='text/javascript';
              vds.async = true;
              vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
              var s = document.getElementsByTagName('script')[0];
              s.parentNode.insertBefore(vds, s);
            })();
          })();
    </script>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0, minimal-ui" />
     <title>@ViewBag.Title ERP</title>
    @{
        var ico = "favicon_" + @ViewBag.User + ".ico";
    }
    <link rel="shortcut icon" href="@ico">
    <link rel="Bookmark" href="@ico">
  </head>
  <body user ="@ViewBag.User">
    <div id="app"></div>
  </body>
</html>
