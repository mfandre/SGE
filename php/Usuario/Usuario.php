<?php

require_once('../Db/Base.php');

class Usuario extends Base{
	private $nome = null;
	protected $table = "usuario";

	public function insert() {
        $data = json_decode($_POST['data']);

        $db = $this->getDb();
        $stm = $db->prepare('Insert into ' . $this->getTable() . ' (nome, cpf,data_cadastro,login,senha,permissao) Values(:nome, :cpf, NOW(),:login,MD5(:senha),:permissao)');
        $stm->bindValue(':nome', $data->nome);
        $stm->bindValue(':cpf', $data->cpf);
        $stm->bindValue(':login', $data->login);
        $stm->bindValue(':senha', $data->senha);
        $stm->bindValue(':permissao', $data->permissao);
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
        $stm = $db->prepare('update ' . $this->getTable() . ' set nome=:nome,cpf=:cpf,login=:login,permissao=:permissao where id=:id');
        $stm->bindValue(':id', $data->id);
        $stm->bindValue(':nome', $data->nome);
        $stm->bindValue(':cpf', $data->cpf);
        $stm->bindValue(':login', $data->login);
        $stm->bindValue(':permissao', $data->permissao);
        $update = $stm->execute();
        
        $msg = $update ? 'Registro(s) atualizado(s) com sucesso' : 'Erro ao atualizar, tente novamente.';
        
        echo json_encode(array(
            "success" => $update,
            "message" => $msg,
            "data" => $data
        ));
    }

}


new Usuario();