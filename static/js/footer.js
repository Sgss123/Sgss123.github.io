var $footer = $('footer').html(`
<div>
    <small>Copyright &COPY; 2022-<span id="date"></span> <span id="author">Sgss</span> All Rights
        Reserved.</small>
    <script>
        var d = new Date();
        var x = document.getElementById("date");
        x.innerHTML = d.getFullYear();
    </script>
    <a href="https://icp.gov.moe/?keyword=20229994" target="_blank" style="color: #f400a1;"
        id="icp"><b>萌ICP备20229994号</b>
    </a>
</div>
`);
$('#footer-placeholder').append($footer)