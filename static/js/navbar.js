var $nav = $('<nav>').html(`
<div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <a class="nav-link" href="/about">关于</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/contact">联系</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://blog.waterspo.top">博客</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="javascript:;" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    友情链接
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="http://sec.z5x.cn" rel="nofollow ugc"
                            onclick="window.open('WebRestrictions?d=http\:\/\/sec.z5x.cn');return false;">极语言</a>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item" href="mailto://support@waterspo.top">申请友链</a></li>
                </ul>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="javascript:;" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-windows"></use>
                    </svg>Windows快速工具
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="ms-settings://"><i class="iconfont icon-set"></i>设置</a>
                    </li>
                    <li><a class="dropdown-item" href="ms-windows-store://">微软商店</a></li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item" href="minecraft://">Minecraft(Windows 10)</a></li>
                </ul>
            </li>
        </ul>
        <!--<form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="在网页中搜索" aria-label="在网页中搜索">
            <button class="btn btn-outline-success" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
        </form>-->
    </div>
</div>
`);
$('#nav-placeholder').append($nav);