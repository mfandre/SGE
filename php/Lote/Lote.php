<?php

require_once('../Db/Base.php');

class Lote extends Base{
	private $nome = null;
	protected $table = "lote";

	public function insert() {
        $data = json_decode($_POST['data']);

        $db = $this->getDb();
        $stm = $db->prepare('Insert into ' . $this->getTable() . ' (nome, preco,id_evento) Values(:nome, :preco, :id_evento)');
        $stm->bindValue(':nome', $data->nome);
        $stm->bindValue(':preco', $data->preco);
        $stm->bindValue(':id_evento', $data->id_evento);
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
        $stm = $db->prepare('update ' . $this->getTable() . ' set nome=:nome, preco=:preco where id=:id');
        $stm->bindValue(':id', $data->id);
        $stm->bindValue(':nome', $data->nome);
        $stm->bindValue(':preco', $data->preco);
        $update = $stm->execute();
        
        $msg = $update ? 'Registro(s) atualizado(s) com sucesso' : 'Erro ao atualizar, tente novamente.';
        
        echo json_encode(array(
            "success" => $update,
            "message" => $msg,
            "data" => $data
        ));
    }

    public function fetchall(){
        $id_evento = $_POST['id_evento'];

        $start = $_POST['start'];
        $limit = $_POST['limit'];

        $sort = $_POST['sort'] ? $_POST['sort'] : 'nome';
        $dir = $_POST['dir']? $_POST['dir'] : 'ASC';
        $order = $sort . ' ' . $dir;
        
        $db = $this->getDb();
        
        $sql = "select * from " . $this->getTable() . " where id_evento = :id_evento order by :order";
        
        if($start !== null && $start !== '' && $limit !== null && $limit !== '' && $start !== 'start' && $limit !=='limit'){
            $sql .= " LIMIT " . $start . " , " . $limit;
        }

        $stm = $db->prepare($sql);
        $stm->bindValue(":order", $order);
        $stm->bindValue(":id_evento", $id_evento);
        $stm->execute();
        
        $sql = "SELECT COUNT(*) AS total FROM " . $this->getTable();
        $total = $db->query($sql)->fetch();

        echo json_encode(array(
            "data" => $stm->fetchAll(\PDO::FETCH_ASSOC),
            "success" => true,
            "total" => $total['total']
        ));
    }

}

new Lote();