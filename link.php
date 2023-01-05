<meta http-equiv = "refresh"  content = "1;url=<?php $_GET['d'] ?>" >
<?php 
$url= $_GET['d'] ;
if ($url=="") {
    header("location:/404");
}
?>
<!doctype html>
<head>
<meta charset="utf-8">
<meta   http-equiv = "refresh"   content ="1;url = <?php echo $url;  ?> ">
</head>
<body>
<center><h1>即将为您跳转至<?php echo $url;  ?></h1></center>
</body>
</html>