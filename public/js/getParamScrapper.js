function getRequestParams(name) {
    const parts = window.location.search.substring(1).split("&");
    var $_GET = {};
    for (var i = 0; i < parts.length; i++) {
        var temp = parts[i].split("=");
        $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
    }
    if (name === undefined) {
        return $_GET;
    } else {
        return $_GET[name];
    }
}   