Ext.define('IGExt.view.PrecoProduto.Edit',{
	extend: 'Ext.window.Window',
	alias: 'widget.precoProdutoEdit',
	title: 'Edição preço produto',
	layout: 'fit',
	autoShow: true,
	modal: true,
	plain: true,
	initComponent: function(){
		this.items = [
			{
				xtype: 'form',
				bodyPadding: 10,
				style: 'background-color: #fff',
				fieldDefaults: {
					labelAlign: 'left',
					labelWidth: 150,
					allowBlank: false,
					combineErrors: false,
					msgTarget: 'side'
				},
				defaultType: 'textfield',
				defaults: {
				},
				items: [
					{
						xtype: 'textfield',
						name: 'codigo',
						fieldLabel: 'Código',
						allowBlank: false
					},{
						xtype: 'textfield',
						name: 'preco',
						fieldLabel: 'Preço',
						allowBlank: false
					},{
						xtype: 'hiddenfield',
						name: 'id_evento',
						value: 0
					},{
						xtype: 'hiddenfield',
						name: 'id_produto',
						value: 0
					}
				]
			}
		];

		this.buttons = [
			{
				text: 'Salvar',
				action: 'save',
				iconCls: 'save'
			},
			{
				text: 'Cancelar',
				scope: this,
				iconCls: 'cancel',
				handler: this.close
			},
		];

		this.callParent(arguments);
	}
});