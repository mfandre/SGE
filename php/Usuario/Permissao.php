<?php

require_once('../Db/Base.php');

class permissao extends Base{
	private $nome = null;
	protected $table = "permissao";

}


new permissao();