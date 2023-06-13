<!-- UPDATE pokemon SET pok_name = 'rompebolas' WHERE pok_id=2; -->
<?php
    require "config.php";
    $conexion = connect();
    if(!$conexion)
    {
        echo "No se pudo conectar con la base";
    }else{
        $id_pokemon = (isset($_GET["id"]) && $_GET["id"] != "") ? $_GET["id"] : false;
        $nombre = (isset($_POST["nombre"]) && $_POST["nombre"] != "")? $_POST["nombre"] : false;
        $altura = (isset($_POST["altura"]) && $_POST["altura"] != "")? $_POST["altura"] : false;
        $peso = (isset($_POST["peso"]) && $_POST["peso"] != "")? $_POST["peso"] : false;
        $exp_base = (isset($_POST["exp_base"]) && $_POST["exp_base"] != "")? $_POST["exp_base"] : false;
       if($id_pokemon && $nombre && $altura && $peso && $exp_base)
       {
            $sql = "UPDATE pokemon SET pok_name = '$nombre', pok_height = '$altura', pok_weight = '$peso', pok_base_experience = '$exp_base' WHERE pok_id = '$id_pokemon';";
            $res = mysqli_query($conexion, $sql);
            if(!$res)
            {
                echo "No se pudo modificar el pokemon";
                $respuesta = array("ok"=>false, "mensaje" => "No se pudo modificar el pokemon");
            } else{
                $respuesta = array("ok"=>true, "mensaje" => "Pokemon modificado");
            }
       }else{
            if(!$id_pokemon)
            {
                $respuesta = array("ok"=>false, "mensaje" => "No se especificó el ID del pokemon");
            }else if(!$nombre)
            {
                $respuesta = array("ok"=>false, "mensaje" => "No se especificó el nombre");
            }else if(!$altura){
                $respuesta = array("ok"=>false, "mensaje" => "No se especificó la altura");
            }else if(!$peso){
                $respuesta = array("ok"=>false, "mensaje" => "No se especificó el peso gordo");
            }else if(!$exp_base){
                $respuesta = array("ok"=>false, "mensaje" => "No se especificó la experiencia base");
            }
       }
    }
    echo json_encode($respuesta);
?>
