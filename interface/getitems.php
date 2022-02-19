<?php
    // include('./library/conn.php');

    // $sql = "select * form mi";

    // $res = $mysql->query($sql);

    // $arr = array();

    // while($row = $res->fetch_assoc()){
    //     array_push($arr,$row);
    // }
    // echo json_encode($arr);



include('./library/conn.php');

$sql = "select * from mi"; // 数据查询语句

$res = $mysql->query($sql);

$arr = array();

while($row = $res->fetch_assoc()){
array_push($arr,$row);
}

echo json_encode($arr);

?>