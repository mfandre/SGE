Ext.define('IGExt.view.Ingresso.List',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.ingressoList',
	store: 'Ingressos',
	title: 'Lista dos ingressos',
	border: false,
	autoScroll:true,
	itemId: 'panelIngresso',
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
			text: 'Comprar',
			action: 'comprarTodos',
			iconCls: 'comprar',
			itemId: 'comprarTodos'
		},
		{
			text: 'Excluir',
			action: 'destroy',
			iconCls: 'delete',
			itemId: 'delete',
			disabled: true
		},
		{
			text: 'Excluir todos',
			action: 'destroyVarios',
			iconCls: 'delete'
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
			store: 'Ingressos',
			dock: 'bottom',
			displayInfo: true
		}
	],

	initComponent: function(){
		this.columns = [
			Ext.create('Ext.grid.RowNumberer'),
			//{header: 'ID',dataIndex: 'id',flex: 1},
			{header: 'Codigo',dataIndex: 'codigo',flex: 2},
			{
				header: 'Cortesia',dataIndex: 'cortesia',flex: 2,renderer:function renderIcon(val) {
				if(val=='on')
					val = 1;
				else if(val=='')
					val = 0;
				if(val==1)
	    			return '<img src="./resources/images/ok.png" data-qtip="Cortesia">';
	    		return '<img src="./resources/images/nook.png" data-qtip="À Comprar">';
			}},
			{
				header: 'Status',dataIndex: 'status',flex: 2,renderer:function renderIcon(val) {
				// status == 0 nao comprado
				// status == 1 comprado
				// status == 2 entrado
				// status == 3 cancelado

				// if(val=='on')
				// 	val = 1;
				if(val=='')
					val = 0;
				if(val==0)
	    			return '<img src="./resources/images/no_comprado.png" data-qtip="Não comprado">';
	    		if(val==1)
	    			return '<img src="./resources/images/comprado.png" data-qtip="Comprado">';
	    		if(val==2)
	    			return '<img src="./resources/images/entrado.png" data-qtip="Entrado">';
	    		return '<img src="./resources/images/cancelado.png" data-qtip="Cancelado">';
			}}
		];

		Ext.apply(this, {
			selModel: Ext.create('Ext.selection.CheckboxModel')
		});
		this.callParent();
		this.getSelectionModel().on('selectionchange',this.onSelectChange,this);
		this.store.load();

	},
	onRender: function(){
		this.store.load();
		this.callParent(arguments);
	},
	onSelectChange: function(selModel,selections){
		//this.fireEvent('meuevento',this);
		this.down('#delete').setDisabled(selections.length === 0);
		this.down('#edit').setDisabled(selections.length !== 1);
	},
	listeners:{
		afterrender:function(component) {
			component.getDockedItems()[3].items.items[10].hide(); //tirando o refresh
		}
	}
});