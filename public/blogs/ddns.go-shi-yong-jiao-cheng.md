# ddns-go使用教程

## **目录 disc**

* [特性 characteristics](#characteristics) 
* [下载 download](#download)
* [配置 configuration](#configuration)

## <h2 id="characteristics">特性 Characteristics</h2>

- 支持Mac、Windows、Linux系统，支持ARM、x86架构
- 支持的域名服务商 Alidns(阿里云) Dnspod(腾讯云) Cloudflare 华为云 Callback 百度云 porkbun GoDaddy Google Domains
- 支持接口/网卡获取IP
- 支持以服务的方式运行
- 默认间隔5分钟同步一次
- 支持多个域名同时解析，公司必备
- 支持多级域名
- 网页中配置，简单又方便，可设置 登录用户名和密码禁止从公网访问
- 网页中方便快速查看最近50条日志，不需要跑docker中查看
- 支持webhook通知
- 支持TTL
- 支持部分dns服务商传递自定义参数，实现地域解析等功能

## <h2 id="download">下载 Download</h2>

作者Github：[https://github.com/jeessy2/ddns-go/releases/](https://github.com/jeessy2/ddns-go/releases/)

点击上方链接跳转至github

![最新版本](https://s1.ax1x.com/2023/09/08/pP6YUJS.png)

找到最新版本我这里是v5.6.1,选择你的系统；支持 Windows , macOS , linux

![版本选择](https://s1.ax1x.com/2023/09/08/pP6Yyd0.png)

自行选择对应架构
这里以 Windows x86_64 为例

下载后解压得到以下文件：

![文件目录](https://s1.ax1x.com/2023/01/05/pSkYiRg.png)

## <h2 id="configuration">配置 Configuration</h2>

双击`ddns-go.exe`


在浏览器中输入[localhost:9876](http://localhost:9876)


弹出如下界面

![](https://s1.ax1x.com/2023/01/05/pSkYryd.png)

选择任意一个DNS服务商，文章以Cloudflare为例

打开[Cloudflare仪表板](https://dash.cloudflare.com)

![pP6tG6J.png](https://s1.ax1x.com/2023/09/08/pP6tG6J.png)

点击右上角`我的个人资料`
![pP6t3pF.png](https://s1.ax1x.com/2023/09/08/pP6t3pF.png)
点击左侧`API令牌`
![pP6t8l4.png](https://s1.ax1x.com/2023/09/08/pP6t8l4.png)
创建令牌
![pP6ttmR.png](https://s1.ax1x.com/2023/09/08/pP6ttmR.png)
使用模板
![pP6tJX9.png](https://s1.ax1x.com/2023/09/08/pP6tJX9.png)
![pP6tUTx.png](https://s1.ax1x.com/2023/09/08/pP6tUTx.png)
选择域名并继续
![pP6tN01.png](https://s1.ax1x.com/2023/09/08/pP6tN01.png)
创建令牌
返回ddns-go页面填写令牌
![](https://s2.loli.net/2023/01/05/4YtOIU6EbeDQGch.png)
填写域名(支持二级域名，三级域名，四级域名等)
![](https://s2.loli.net/2023/01/05/TFQoB8Xch5dAn4w.png)
点击`Save`
![](https://s2.loli.net/2023/01/05/jowny8Bbe3lKTpi.png)
出现日志即为完成

官方文档：[https://github.com/jeessy2/ddns-go/blob/master/README.md](https://github.com/jeessy2/ddns-go/blob/master/README.md)