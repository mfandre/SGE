Ext.define('IGExt.view.Lote.List',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.loteList',
	store: 'Lotes',
	title: 'Lista dos lotes',
	border: false,
	autoScroll:true,
	itemId: 'panelLote',
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
	initComponent: function(){
		this.columns = [
			Ext.create('Ext.grid.RowNumberer'),
			{header: 'ID',dataIndex: 'id',flex: 1},
			{header: 'Nome',dataIndex: 'nome',flex: 2},
			{header: 'Preco',dataIndex: 'preco',flex: 2}
		];

		Ext.apply(this, {
			selModel: Ext.create('Ext.selection.CheckboxModel')
		});
		this.callParent();
		this.getSelectionModel().on('selectionchange',this.onSelectChange,this);

	},
	onRender: function(){
		this.callParent(arguments);
	},
	onSelectChange: function(selModel,selections){
		//this.fireEvent('meuevento',this);
		this.down('#delete').setDisabled(selections.length === 0);
		this.down('#edit').setDisabled(selections.length !== 1);
	}
});