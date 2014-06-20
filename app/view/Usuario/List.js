Ext.define('IGExt.view.Usuario.List',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.usuarioList',
	store: 'Usuarios',
	title: 'Lista dos usuários',
	border: false,
	autoScroll:true,
	itemId: 'panelUsuario',
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
			text: 'Recarregar dados',
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
			{header: 'Nome',dataIndex: 'nome',flex: 1},
			{header: 'Login',dataIndex: 'login',flex: 2},
			{header: 'Permissão',dataIndex: 'permissao',flex: 2},
			{header: 'Data Cadastro',dataIndex: 'data_cadastro',flex: 2},
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