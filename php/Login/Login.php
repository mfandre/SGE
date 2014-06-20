<?php

require_once('../Db/Base.php');

class Login extends Base{
	private $nome = null;
	protected $table = "usuario";

	function logar(){
		session_start();

		$usuario = $_POST['usuario'];	
		$senha = md5($_POST['senha']);

		$db = $this->getDb();
		$stm = $db->prepare("SELECT * FROM ".$this->table." WHERE login=:login AND senha=:senha");

		$stm->bindValue(':login',$usuario);
		$stm->bindValue(':senha',$senha);

		$stm->execute();
		$arr = $stm->fetch(\PDO::FETCH_ASSOC);

		$qtdUser = $stm->rowCount();

		if($qtdUser > 0){
			$result['success'] = true;

			$_SESSION["login"] = $arr['login'];
			$_SESSION["permissao"] = $arr['permissao'];
		}else{
			$result['success'] = false;
			$result['errors']['reason'] = 'Usuário ou senha inválido(s)';
			session_destroy();
		}

		echo json_encode($result);
	}

}

new Login();