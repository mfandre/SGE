Ext.define('IGExt.view.Ingresso.Edit',{
	extend: 'Ext.window.Window',
	alias: 'widget.ingressoEdit',
	title: 'Edição ingresso',
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
						name: 'codigo',
						fieldLabel: 'Código',
						allowBlank: false
					},
					{
						xtype: 'checkboxfield',
						name: 'cortesia',
						fieldLabel: 'Cortesia',
						allowBlank: false
					},
					{
						xtype: 'hiddenfield',
						name: 'id_lote',
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