function OpenEmail() {
    var content = document.getElementById("name").value + "%0d%0a" + document.getElementById("link").value + "%0d%0a" + document.getElementById("comment").value + "%0d%0a" + document.getElementById("Logo").value;
    window.open("mailto:support@xn--fhq534awnm5on.top?subject=友情链接申请&body=" + content);
}