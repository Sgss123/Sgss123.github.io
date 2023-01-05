function editHtml(hook) {
	var header = [
		'<link rel="stylesheet" type="text/css" href="../css/nav.css" \>',
		'<div id="header">',
		'<ul>',
		'<li><a href="/">主页</a></li>',
		'<li><a>友情链接</a>',
		'<ul>',
		'<li><a href="https://bigtao.xyz">Bigtao小破站</a></li>',
		'<li><a href="https://blog.maxwenyan23.top">Max的blog</a></li>',
		'</ul>',
		'</li>',
		'</ul>',
		'</div>',
	].join('');

	hook.afterEach(function(html) {
		return header + html;
	});
}]
