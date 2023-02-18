function OpenEmail() {
    var content = document.getElementById("name").value + "%0d%0a" + document.getElementById("link").value + "%0d%0a" + document.getElementById("comment").value + "%0d%0a" + document.getElementById("Logo").value;
    window.open("mailto:Sgss<support@xn--fhq534awnm5on.top>?" + "&subject=友情链接申请&body=" + content + "%0d%0a" + "回信地址：mailto:" + document.getElementById("person").value);
}