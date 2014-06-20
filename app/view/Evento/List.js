Ext.define('IGExt.view.Evento.List',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.eventoList',
	store: 'Eventos',
	title: 'Lista dos eventos',
	border: false,
	autoScroll:true,
	itemId: 'panelEvento',
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
			text: 'Recarregar',
			action: 'refresh',
			iconCls: 'refresh',
			itemId: 'refresh'
		}
	],
	dockedItems: [
		{
			xtype: 'pagingtoolbar',
			store: 'Eventos',
			dock: 'bottom',
			displayInfo: true
		}
	],
	initComponent: function(){
		this.columns = [
			Ext.create('Ext.grid.RowNumberer'),
			{header: 'ID',dataIndex: 'id',flex: 1},
			{header: 'Nome',dataIndex: 'nome',flex: 2},
			{header: 'Data',dataIndex: 'data_evento',flex: 2}
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