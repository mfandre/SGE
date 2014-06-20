<?php

require_once('../Db/Base.php');

class Ingresso extends Base{
	private $nome = null;
	protected $table = "ingresso";

    public function vender(){
        // status == 0 nao comprado
        // status == 1 comprado
        // status == 2 entrado
        // status == 3 cancelado
        $codigo = $_POST['codigo'];
        $id_evento = $_POST['id_evento'];

        $db = $this->getDb();
        $sql = 'Select i.id,i.status from ingresso i
                left join lote l on (l.id = i.id_lote)
                left join evento e on (l.id_evento = e.id)
         where codigo = :codigo and e.id = :id_evento';

        $stm = $db->prepare($sql);
        $stm->bindValue(":codigo", $codigo);
        $stm->bindValue(":id_evento", $id_evento);
        $stm->execute();
        $arr = $stm->fetchAll(\PDO::FETCH_ASSOC);

        //print_r($arr);

        if(count($arr) == 0){
            $result['success'] = false;
            $result['errors']['reason'] = 'Ingresso inexistente.';
            echo json_encode($result);
            return;
        }else if($arr[0]['status']==3){
            $result['success'] = false;
            $result['errors']['reason'] = 'Ingresso cancelado.';
            echo json_encode($result);
            return;
        }else if($arr[0]['status']==1 || $arr[0]['status']==2){
            $result['success'] = false;
            $result['errors']['reason'] = 'Ingresso já foi comprado.';
            echo json_encode($result);
            return;
        }

        $id_ingresso = $arr[0]['id'];

        $stm = $db->prepare('update ' . $this->getTable() . ' set status=1 where id=:id_ingresso');
        $stm->bindValue(':id_ingresso', $id_ingresso);
        $update = $stm->execute();

        if(!$update){
            $result['success'] = false;
            $result['errors']['reason'] = 'Erro ao atualizar ingresso. Passe-o novamente.';
            echo json_encode($result);
            return;
        }

        $result['success'] = true;
        echo json_encode($result);
    }

    public function check(){
        $codigo = $_POST['codigo'];
        $id_evento = $_POST['id_evento'];

        $db = $this->getDb();
        $sql = 'Select codigo,duplicado,status,i.id,l.id as id_lote from ingresso i
                left join lote l on (l.id = i.id_lote)
                left join evento e on (l.id_evento = e.id)
         where codigo = :codigo and e.id = :id_evento';

        $stm = $db->prepare($sql);
        $stm->bindValue(":codigo", $codigo);
        $stm->bindValue(":id_evento", $id_evento);
        $stm->execute();
        $arr = $stm->fetchAll(\PDO::FETCH_ASSOC);

        //pegando o lote para fazer update no ingresso
        
        //print_r($arr);

        if(count($arr) == 0){
            $result['success'] = false;
            $result['errors']['reason'] = 'Ingresso inexistente.';
            echo json_encode($result);
            return;
        }else if($arr[0]['duplicado'] > 0){
            $id_lote = $arr[0]['id_lote'];
            $stm = $db->prepare('update ' . $this->getTable() . ' set duplicado=duplicado+1 where codigo=:codigo and id_lote=:id_lote');
            $stm->bindValue(':codigo', $codigo);
            $stm->bindValue(':id_lote', $id_lote);
            $update = $stm->execute();

            $result['success'] = false;
            $result['errors']['reason'] = 'Ingresso duplicado '.$arr[0]['duplicado'].' vezes.';
            echo json_encode($result);
            return;
        }else if($arr[0]['status'] == 0){
            // status == 0 nao comprado
            // status == 1 comprado
            // status == 2 entrado
            // status == 3 cancelado
            $result['success'] = false;
            $result['errors']['reason'] = 'Ingresso não comprado.';
            echo json_encode($result);
            return;
        }

        $id_lote = $arr[0]['id_lote'];
        $stm = $db->prepare('update ' . $this->getTable() . ' set duplicado=duplicado+1 , status=2 where codigo=:codigo and id_lote=:id_lote');
        $stm->bindValue(':codigo', $codigo);
        $stm->bindValue(':id_lote', $id_lote);
        $update = $stm->execute();

        //print_r($update);

        if(!$update){
            $result['success'] = false;
            $result['errors']['reason'] = 'Erro ao atualizar ingresso. Passe-o novamente.';
            echo json_encode($result);
            return;
        }

        $result['success'] = true;
        echo json_encode($result);
    }

	public function insert() {
        $data = json_decode($_POST['data']);

        $db = $this->getDb();
        $stm = $db->prepare('Insert into ' . $this->getTable() . ' (codigo, id_lote,cortesia,data_cadastro) Values(:codigo, :id_lote,:cortesia, NOW())');
        $stm->bindValue(':codigo', $data->codigo);
        $stm->bindValue(':id_lote', $data->id_lote);
        $stm->bindValue(':cortesia', $data->cortesia!='' ? 1 : 0);
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

    public function insertVarios() {
        $codigoInit = $_POST['codigoInit'];
        $codigoFim = $_POST['codigoFim'];
        $numCaracteres = $_POST['numCaracteres'];
        $id_lote = $_POST['id_lote'];
        if(!isset($_POST['cortesia']))
            $_POST['cortesia'] = '';
        $cortesia = $_POST['cortesia']!='' ? 1 : 0;

        $db = $this->getDb();

        //PEgando o id do evento
        $stm = $db->prepare('Select id_evento from lote where id=:id_lote');
        $stm->bindValue(':id_lote', $id_lote);
        $stm->execute();
        $arr = $stm->fetch(\PDO::FETCH_ASSOC);
        $id_evento = $arr['id_evento'];

        // Inserindo os ingressos
        $valuesInsert = "";
        for($i=intval($codigoInit);$i<=intval($codigoFim);$i++){
            $code = $i;
            $code = str_pad($code, $numCaracteres, "0", STR_PAD_LEFT); 

            $stm = $db->prepare('select count(*) as count from (select codigo from ingresso where id_lote in (select id from lote where id_evento = :id_evento)) as t1 where t1.codigo=:codigo');
            $stm->bindValue(':id_evento', $id_evento);
            $stm->bindValue(':codigo', $code);
            $stm->execute();
            $arr = $stm->fetch(\PDO::FETCH_ASSOC);
            if($arr['count']>0)
            {
                $result['success'] = false;
                $result['errors']['reason'] = 'Erro ao inserir ingressos. O ingresso '.$code.' já está cadastrado. Essa operação foi abortada';
                echo json_encode($result);
                return;
            }

            if($i==intval($codigoFim))
                $valuesInsert .= "('".$code."',".$id_lote.",".$cortesia.",NOW())";
            else
                $valuesInsert .= "('".$code."',".$id_lote.",".$cortesia.",NOW()),";
        }
        
        $stm = $db->prepare('Insert into ' . $this->getTable() . ' (codigo, id_lote,cortesia,data_cadastro) Values '.$valuesInsert);
        $stm->execute();
        $arr = $stm->fetch(\PDO::FETCH_ASSOC);

        $result['success'] = true;
        echo json_encode($result);
    }

    public function destroyVarios(){
        $data = json_decode($_POST['data']);
        $id_lote = $data;

        $db = $this->getDb();
        $stm = $db->prepare('delete from ' . $this->getTable() . ' where id_lote=:id_lote');
        $stm->bindValue(':id_lote', $id_lote);
        $delete = $stm->execute();

        $msg = $delete ? 'Registro(s) deletados(s) com sucesso' : 'Erro ao deletar, tente novamente.';
        
        echo json_encode(array(
            "success" => $delete,
            "message" => $msg,
            "data" => $data
        ));
    }

    public function comprarTodos(){
        $data = json_decode($_POST['data']);
        $id_lote = $data;

        // status == 0 nao comprado
        // status == 1 comprado
        // status == 2 entrado
        // status == 3 cancelado

        $db = $this->getDb();
        $stm = $db->prepare('update ' . $this->getTable() . ' set status=1 where id_lote=:id_lote and status<>2 and status<>3');
        $stm->bindValue(':id_lote', $id_lote);
        $update = $stm->execute();

        $msg = $update ? 'Registro(s) atualizados(s) com sucesso' : 'Erro ao atualizar, tente novamente.';
        
        echo json_encode(array(
            "success" => $update,
            "message" => $msg,
            "data" => $data
        ));
    }

    public function update() {
        
        $data = json_decode($_POST['data']);
        
        $db = $this->getDb();
        $stm = $db->prepare('update ' . $this->getTable() . ' set codigo=:codigo, id_lote=:id_lote where id=:id');
        $stm->bindValue(':id', $data->id);
        $stm->bindValue(':codigo', $data->codigo);
        $stm->bindValue(':id_lote', $data->id_lote);
        $update = $stm->execute();
        
        $msg = $update ? 'Registro(s) atualizado(s) com sucesso' : 'Erro ao atualizar, tente novamente.';
        
        echo json_encode(array(
            "success" => $update,
            "message" => $msg,
            "data" => $data
        ));
    }

    public function fetchall(){
        $id_lote = $_POST['id_lote'];

        $start = $_POST['start'];
        $limit = $_POST['limit'];

        $sort = $_POST['sort'] ? $_POST['sort'] : 'nome';
        $dir = $_POST['dir']? $_POST['dir'] : 'ASC';
        $order = $sort . ' ' . $dir;
        
        $db = $this->getDb();
        
        $sql = "select * from " . $this->getTable() . " where id_lote = :id_lote order by :order";
        
        //if($start !== null && $start !== '' && $limit !== null && $limit !== ''){
        if($start !== null && $start !== '' && $limit !== null && $limit !== '' && $start !== 'start' && $limit !=='limit'){
            $sql .= " LIMIT " . $start . " , " . $limit;
        }

        $stm = $db->prepare($sql);
        $stm->bindValue(":order", $order);
        $stm->bindValue(":id_lote", $id_lote);
        $stm->execute();
        
        $sql = "SELECT COUNT(*) AS total FROM " . $this->getTable() . " where id_lote = ".$id_lote;
        $total = $db->query($sql)->fetch();

        echo json_encode(array(
            "data" => $stm->fetchAll(\PDO::FETCH_ASSOC),
            "success" => true,
            "total" => $total['total']
        ));
    }

    public function relatorioIngressosVendidos(){
        //$id_evento = $_POST['id_evento'];
        $id_evento = $_GET['id'];
	if(!$id_evento)
		$id_evento = 0;
        $db = $this->getDb();
        
        $sql = "select status, count(codigo) as count from ingresso where id_lote in (select id from lote where id_evento = :id_evento) group by status";
        $stm = $db->prepare($sql);
        $stm->bindValue(":id_evento", $id_evento);
        $stm->execute();
        $arr = $stm->fetchAll(\PDO::FETCH_ASSOC);

        for($i=0;$i<count($arr);$i++){
            // status == 0 nao comprado
            // status == 1 comprado
            // status == 2 entrado
            // status == 3 cancelado
            if($arr[$i]['status']==0)
                $arr[$i]['status'] = 'Não comprados';
            if($arr[$i]['status']==1)
                $arr[$i]['status'] = 'Comprados';
            if($arr[$i]['status']==2)
                $arr[$i]['status'] = 'Utilizados';
            if($arr[$i]['status']==3)
                $arr[$i]['status'] = 'Cancelados';
        }

        echo json_encode(array(
            "data" => $arr,
            "success" => true
        ));
    }

    public function relatorioLucroIngresso(){
        //$id_evento = $_POST['id_evento'];
        $id_evento = $_GET['id'];
	if(!$id_evento)
		$id_evento = 0;
        $db = $this->getDb();
        
        $sql = "select count(i.codigo) num_ingressos, sum(l.preco) as valor_arrecadado, l.nome lote 
                FROM ingresso i
                left join lote l on (i.id_lote = l.id)
                left join evento e on (l.id_evento = e.id)
                where e.id = :id_evento and i.status <> 0 and i.status <> 3  and i.status = 2
                group by l.id ";

        $stm = $db->prepare($sql);
        $stm->bindValue(":id_evento", $id_evento);
        $stm->execute();
        $arr = $stm->fetchAll(\PDO::FETCH_ASSOC);

        echo json_encode(array(
            "data" => $arr,
            "success" => true
        ));
    }
}

new Ingresso();