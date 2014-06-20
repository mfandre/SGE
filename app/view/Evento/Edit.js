Ext.define('IGExt.view.Evento.Edit',{
	extend: 'Ext.window.Window',
	alias: 'widget.eventoEdit',
	title: 'Edição evento',
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
					},
					{
						xtype: 'datefield',
						name: 'data_evento',
						fieldLabel: 'Data',
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