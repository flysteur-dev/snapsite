# SnapSite ([website](http://snapsite.live/))

This extension / library provide a bridge between webpage and browser extension, to capture the current webpage.

Useful to add a bug tracking tool inside your webpage during your internal development, or to get customers feedbacks.

### Browsers compatibility:
- Chrome  >= 20
- Firefox >= 47
- Safari  >= 8
- Opera  (soon)
- Edge   (soon)

### Features:
- Capture webpage content to clipboard using browser action
- Useragent cannot be spoofed
- Send screenshot as base64 through snapsite lib

### Stores:
- Chrome  : [link](https://chrome.google.com/webstore/detail/snapsite/fkockbmpmgpelkjfnelaifdniigigmkp)
- Firefox : [link](https://addons.mozilla.org/fr/firefox/addon/snapsite/)
- Safari  : (packaged binary) [link](https://snapsite.live/build/safari/snapsite.safariextz#0.1)

### Example:
 - Start server
    - python -m SimpleHTTPServer
 - Go to 127.0.0.1:8080/example.html
 - Click on "Try me"
 - If the port is already used, try again with an extra parameter 
    - python -m SimpleHTTPServer 8180

### Documentation:
http://snapsite.live

