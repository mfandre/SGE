<?php

require_once('../Db/Base.php');

class Evento extends Base{
	private $nome = null;
	protected $table = "evento";

	public function insert() {
        $data = json_decode($_POST['data']);

        $db = $this->getDb();
        $stm = $db->prepare('Insert into ' . $this->getTable() . ' (nome, data_evento,data_cadastro) Values(:nome, :data, NOW())');
        $stm->bindValue(':nome', $data->nome);
        $stm->bindValue(':data', $data->data_evento);
        $stm->execute();


        $result = $stm->fetch(\PDO::FETCH_ASSOC);

        $insert = $db->lastInsertId();
        
        $msg = $insert ? 'Registro(s) inserido(s) com sucesso' : 'Erro ao inserir o registro, tente novamente.';
        
        $newData = $data;
        $newData->id = $insert;

        echo json_encode(array(
            "success" => $insert,
            "message" => $msg,
            "data" => $newData
        ));
    }

    public function update() {
        
        $data = json_decode($_POST['data']);
        
        $db = $this->getDb();
        $stm = $db->prepare('update ' . $this->getTable() . ' set nome=:nome, data_evento=:data where id=:id');
        $stm->bindValue(':id', $data->id);
        $stm->bindValue(':nome', $data->nome);
        $stm->bindValue(':data', $data->data_evento);
        $update = $stm->execute();
        
        $msg = $update ? 'Registro(s) atualizado(s) com sucesso' : 'Erro ao atualizar, tente novamente.';
        
        echo json_encode(array(
            "success" => $update,
            "message" => $msg,
            "data" => $data
        ));
    }

}

new Evento();