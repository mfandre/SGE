Ext.define('IGExt.view.PrecoProduto.List',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.precoProdutoList',
	store: 'PrecoProdutos',
	title: 'Lista dos preços por evento',
	border: false,
	autoScroll:true,
	itemId: 'panelPrecoProduto',
//	selModel: Ext.create('Ext.selection.CheckboxModel'),
	columnLines: true,
	tbar: [
		{
			text: 'Incluir',
			action: 'insert',
			iconCls: 'add',
			itemId: 'insert'
		},
		{
			text: 'Incluir vários',
			action: 'insertVarios',
			iconCls: 'add',
			itemId: 'insertVarios'
		},
		{
			text: 'Editar',
			action: 'edit',
			iconCls: 'edit',
			itemId: 'edit',
			disabled: true
		},
		{
			text: 'Excluir',
			action: 'destroy',
			iconCls: 'delete',
			itemId: 'delete',
			disabled: true
		},
		{
			text: 'Recarregar',
			action: 'refresh',
			iconCls: 'refresh',
			itemId: 'refresh'
		}
	],
	dockedItems: [
		{
			xtype: 'pagingtoolbar',
			store: 'PrecoProdutos',
			dock: 'bottom',
			displayInfo: true
		}
	],
	initComponent: function(){
		this.columns = [
			Ext.create('Ext.grid.RowNumberer'),
			{header: 'ID',dataIndex: 'id',flex: 1},
			//{header: 'ID Evento',dataIndex: 'nome_evento',flex: 2},
			//{header: 'ID Produto',dataIndex: 'nome_produto',flex: 2},
			{header: 'Código',dataIndex: 'codigo',flex: 2},
			{header: 'Preco',dataIndex: 'preco',flex: 2},
			{
				header: 'Status',dataIndex: 'status',flex: 2,renderer:function renderIcon(val) {
				// status == 0 nao comprado
				// status == 1 comprado
				// status == 2 entrado
				// status == 3 cancelado

				if(val=='')
					val = 0;
				if(val==0)
	    			return '<img src="./resources/images/no_comprado.png" data-qtip="Não comprado">';
	    		if(val==1)
	    			return '<img src="./resources/images/comprado.png" data-qtip="Comprado">';
	    		if(val==2)
	    			return '<img src="./resources/images/entrado.png" data-qtip="Entrado">';
	    		return '<img src="./resources/images/cancelado.png" data-qtip="Cancelado">';
				}
			},
			{header: 'Data',dataIndex: 'data_cadastro',flex: 2}
		];

		Ext.apply(this, {
			selModel: Ext.create('Ext.selection.CheckboxModel')
		});
		this.callParent();
		this.getSelectionModel().on('selectionchange',this.onSelectChange,this);
	},
	onRender: function(){
		this.store.load();
		this.callParent(arguments);
	},
	onSelectChange: function(selModel,selections){
		this.down('#delete').setDisabled(selections.length === 0);
		this.down('#edit').setDisabled(selections.length !== 1);
	},
	listeners:{
		afterrender:function(component) {
			component.getDockedItems()[3].items.items[10].hide(); //tirando o refresh
		}
	}
});