<?php

require_once('../Db/Base.php');

class Menu extends Base{
	private $nome = null;
	protected $table = "menu";

	public function getMenu(){
                session_start();
                if(!isset($_SESSION['permissao']))
                        return;
                
                $db = $this->getDb();
                //pegando os filhos pertencentes a raiz
                $stm = $db->prepare('select id,text,leaf,expanded,controllername,xtypeClass from ' . $this->getTable() . ' where id in (select id from '. $this->getTable() .' where parent = :id) and permissao = :permissao');
                $stm->bindValue(':id', 0);
                $stm->bindValue(':permissao', $_SESSION['permissao']);
                $stm->execute();

                $result['children'] = $stm->fetchAll(\PDO::FETCH_ASSOC);

                for($i=0;$i<count($result['children']);$i++){
                	$stm->bindValue(':id', $result['children'][$i]['id']);
                	$stm->execute();

                	$result['children'][$i]['children'] = $stm->fetchAll(\PDO::FETCH_ASSOC);

                	for($j=0;$j<count($result['children'][$i]['children']);$j++){
        	        	$stm->bindValue(':id', $result['children'][$i]['children'][$j]['id']);
        	        	$stm->execute();

        	        	$result['children'][$i]['children'][$j]['children'] = $stm->fetchAll(\PDO::FETCH_ASSOC);
                	}
                }

                echo json_encode($result);
	}
}

new Menu();




// $menu = "
// 	{
// 		children: [
// 			{
// 				text: 'Guiche',
// 				expanded: true,
// 				children: [
// 					{
// 						text: 'Entrada',
// 						leaf: true,
// 						xtypeClass: 'entrada',
// 						controllerName: 'menuGuicheEntrada'
// 					},
// 					{
// 						text: 'Relatórios',
// 						leaf: true,
// 						xtypeClass: 'eventoRelatorio',
// 						controllerName: 'menuGuicheRelatorio'
// 					}
// 				]
// 			},
// 			{
// 				text: 'Eventos',
// 				expanded: true,
// 				children: [
// 					{
// 						text: 'Eventos',
// 						leaf: true,
// 						xtypeClass: 'eventoList',
// 						controllerName: 'menuEventoEventos'
// 					},
// 					{
// 						text: 'Relatórios',
// 						leaf: true,
// 						xtypeClass: 'eventoRelatorio',
// 						controllerName: 'menuEventoRelatorio'
// 					}
// 				]
// 			},
// 			{
// 				text: 'Bar',
// 				expanded: true,
// 				children: [
// 					{
// 						text: 'Estoque',
// 						leaf: true,
// 						xtypeClass: 'estoqueList',
// 						controllerName: 'menuBarEstoque'
// 					},
// 					{
// 						text: 'Vendas',
// 						leaf: true,
// 						xtypeClass: 'vendaList',
// 						controllerName: 'menuBarVenda'
// 					},
// 					{
// 						text: 'Relatórios',
// 						leaf: true,
// 						xtypeClass: 'barRelatorio',
// 						controllerName: 'menuBarRelatorio'
// 					},
// 				]
// 			},
// 		]
// 	}
// ";

// echo $menu;