<?php

require_once('../Db/Base.php');

class PrecoProduto extends Base{
	private $nome = null;
	protected $table = "preco_produto_evento";

	public function insert() {
        $data = json_decode($_POST['data']);

        $db = $this->getDb();
        $stm = $db->prepare('Insert into ' . $this->getTable() . ' (id_evento,id_produto, preco, codigo,data_cadastro) Values(:idevento, :idproduto, :preco, :codigo, NOW())');
        $stm->bindValue(':idevento', $data->id_evento);
        $stm->bindValue(':idproduto', $data->id_produto);
        $stm->bindValue(':preco', $data->preco);
        $stm->bindValue(':codigo', $data->codigo);
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
    
    public function check(){
        $codigo = $_POST['codigo'];
        $id_evento = $_POST['id_evento'];
        
        $db = $this->getDb();
        $sql = 'Select A.*, B.nome nome_produto from ' . $this->getTable() . ' A left join produto B on (A.id_produto = B.id) where codigo = :codigo and id_evento = :id_evento';
        
        $stm = $db->prepare($sql);
        $stm->bindValue(":codigo", $codigo);
        $stm->bindValue(":id_evento", $id_evento);
        $stm->execute();
        $arr = $stm->fetchAll(\PDO::FETCH_ASSOC);
        
        //print_r($arr);
        
        if(count($arr) == 0){
            $result['success'] = false;
            $result['errors']['reason'] = 'Ficha inexistente.';
            echo json_encode($result);
            return;
        }else if($arr[0]['duplicado'] > 0){
            $stm = $db->prepare('update ' . $this->getTable() . ' set duplicado=duplicado+1 where codigo=:codigo and id_evento=:id_evento');
            $stm->bindValue(':codigo', $codigo);
            $stm->bindValue(':id_evento', $id_evento);
            $update = $stm->execute();
            
            $result['success'] = false;
            $result['errors']['reason'] = 'Ficha duplicada '.$arr[0]['duplicado'].' vezes.';
            echo json_encode($result);
            return;
        }else if($arr[0]['status'] == 0){
            // status == 0 nao comprado
            // status == 1 comprado
            // status == 2 entrado
            // status == 3 cancelado
            $result['success'] = false;
            $result['errors']['reason'] = 'Ficha não comprada.';
            echo json_encode($result);
            return;
        }
        
        $stm = $db->prepare('update ' . $this->getTable() . ' set duplicado=duplicado+1 , status=2 where codigo=:codigo and id_evento=:id_evento');
        $stm->bindValue(':codigo', $codigo);
        $stm->bindValue(':id_evento', $id_evento);
        $update = $stm->execute();
        
        //print_r($update);
        
        if(!$update){
            $result['success'] = false;
            $result['errors']['reason'] = 'Erro ao atualizar ficha. Passe-a novamente.';
            echo json_encode($result);
            return;
        }
        
        $result['success'] = true;
        $result['msg'] = $arr[0]["nome_produto"];
        echo json_encode($result);
    }
    
    public function insertVarios() {
        $codigoInit = $_POST['codigoInit'];
        $codigoFim = $_POST['codigoFim'];
        $numCaracteres = $_POST['numCaracteres'];
        $id_evento = $_POST['id_evento'];
        $id_produto = $_POST['id_produto'];
        $preco = $_POST['preco'];
        
        $db = $this->getDb();
        
        // Inserindo os ingressos
        $valuesInsert = "";
        for($i=intval($codigoInit);$i<=intval($codigoFim);$i++){
            $code = $i;
            $code = str_pad($code, $numCaracteres, "0", STR_PAD_LEFT);
            
            $stm = $db->prepare('select count(*) as count from (select codigo from preco_produto_evento where id_evento in (select id from evento where id = :id_evento)) as t1 where t1.codigo=:codigo');
            $stm->bindValue(':id_evento', $id_evento);
            $stm->bindValue(':codigo', $code);
            $stm->execute();
            $arr = $stm->fetch(\PDO::FETCH_ASSOC);
            if($arr['count']>0)
            {
                $result['success'] = false;
                $result['errors']['reason'] = 'Erro ao inserir fichas. A ficha '.$code.' já está cadastrada. Essa operação foi abortada';
                echo json_encode($result);
                return;
            }
            
            if($i==intval($codigoFim))
                $valuesInsert .= "('".$code."',".$id_evento.",".$id_produto.",NOW(),".$preco.")";
            else
                $valuesInsert .= "('".$code."',".$id_evento.",".$id_produto.",NOW(),".$preco."),";
        }
        
        $stm = $db->prepare('Insert into ' . $this->getTable() . ' (codigo, id_evento,id_produto,data_cadastro, preco) Values '.$valuesInsert);
        $stm->execute();
        $arr = $stm->fetch(\PDO::FETCH_ASSOC);
        
        $result['success'] = true;
        echo json_encode($result);
    }

    public function update() {
        
        $data = json_decode($_POST['data']);
        
        $db = $this->getDb();
        $stm = $db->prepare('update ' . $this->getTable() . ' set preco=:preco, id_evento=:idevento, codigo=:codigo where id=:id');
        $stm->bindValue(':id', $data->id);
        $stm->bindValue(':preco', $data->preco);
        $stm->bindValue(':codigo', $data->codigo);
        $stm->bindValue(':idevento', $data->id_evento);

        $update = $stm->execute();
        
        $msg = $update ? 'Registro(s) atualizado(s) com sucesso' : 'Erro ao atualizar, tente novamente.';
        
        echo json_encode(array(
            "success" => $update,
            "message" => $msg,
            "data" => $data
        ));
    }

    public function fetchall(){
        $id_evento = trim($_POST['id_evento']) == "" ? 0 : $_POST['id_evento'];
        $id_produto = trim($_POST['id_produto']) == ""? 0 : $_POST['id_produto'];
        
        $start = $_POST['start'];
        $limit = $_POST['limit'];
        
        $sort = $_POST['sort'] ? $_POST['sort'] : 'nome';
        $dir = $_POST['dir']? $_POST['dir'] : 'ASC';
        $order = $sort . ' ' . $dir;
        
        $db = $this->getDb();
        
        $sql = "select * from " . $this->getTable() . " where id_evento = :id_evento and id_produto = :id_produto order by :order";
        
        //if($start !== null && $start !== '' && $limit !== null && $limit !== ''){
        if($start !== null && $start !== '' && $limit !== null && $limit !== '' && $start !== 'start' && $limit !=='limit'){
            $sql .= " LIMIT " . $start . " , " . $limit;
        }
        
        $stm = $db->prepare($sql);
        $stm->bindValue(":order", $order);
        $stm->bindValue(":id_evento", $id_evento);
        $stm->bindValue(":id_produto", $id_produto);
        $stm->execute();
        
        $sql = "SELECT COUNT(*) AS total FROM " . $this->getTable() . " where id_evento = ".$id_evento." and id_produto = ".$id_produto;
        
        $total = $db->query($sql)->fetch();
        
        echo json_encode(array(
                               "data" => $stm->fetchAll(\PDO::FETCH_ASSOC),
                               "success" => true,
                               "total" => $total['total']
                               ));
    }
    
    public function relatorioPorEvento(){
        $id_evento = trim($_POST['id_evento']) == "" ? 0 : $_POST['id_evento'];
        $sql = "SELECT B.nome produto,sum(preco) total,count(B.id) qtde FROM " . $this->getTable() . " A left join produto B on (A.id_produto = B.id) WHERE id_evento = :id_evento and status = 2 group by id_produto";
        
        $db = $this->getDb();
        $stm = $db->prepare($sql);
        $stm->bindValue(":id_evento", $id_evento);
        $stm->execute();
        
        echo json_encode(array(
                               "data" => $stm->fetchAll(\PDO::FETCH_ASSOC),
                               "success" => true,
                               "total" => $total['total']
                               ));
    }

}

new PrecoProduto();