Ext.define('IGExt.view.Usuario.Edit',{
	extend: 'Ext.window.Window',
	alias: 'widget.usuarioEdit',
	title: 'Edição usuário',
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
						xtype: 'textfield',
						name: 'cpf',
						fieldLabel: 'Cpf',
						allowBlank: true
					},
					{
						xtype: 'textfield',
						name: 'login',
						fieldLabel: 'Login',
						allowBlank: false
					},
					{
						xtype: 'combo',
						fieldLabel: 'Permissao',
						store: 'Permissoes',
						queryMode: 'remote',
						displayField: 'dcr',
						valueField: 'permissao',
						name: 'permissao'
					},
					// {
					// 	xtype: 'textfield',
					// 	name: 'permissao',
					// 	fieldLabel: 'Permissão',
					// 	allowBlank: false
					// },
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