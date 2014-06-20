Ext.define('IGExt.view.Lote.Edit',{
	extend: 'Ext.window.Window',
	alias: 'widget.loteEdit',
	title: 'Edição lote',
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
				defaults: {
					maxLength: 64
				},
				items: [
					{
						xtype: 'textfield',
						name: 'nome',
						fieldLabel: 'Nome',
						allowBlank: false
					},
					{
						xtype: 'numberfield',
						name: 'preco',
						fieldLabel: 'Preco',
						allowBlank: false
					},
					{
						xtype: 'hiddenfield',
						name: 'id_evento',
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