Ext.define('IGExt.view.Produto.Edit',{
	extend: 'Ext.window.Window',
	alias: 'widget.produtoEdit',
	title: 'Edição produto',
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
						name: 'nome',
						fieldLabel: 'Nome',
						allowBlank: false
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