Ext.define('IGExt.view.PrecoProduto.EditVarios',{
	extend: 'Ext.window.Window',
	alias: 'widget.precoProdutoEditVarios',
	title: 'Inserção de fichas',
	layout: 'fit',
	autoShow: true,
	modal: true,
	plain: true,
	initComponent: function(){
		this.items = [
			{
				xtype: 'form',
				url : './php/Produto/PrecoProduto.php?action=insertVarios',
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
						name: 'codigoInit',
						fieldLabel: 'Código Inicial',
						allowBlank: false
					},
					{
						xtype: 'textfield',
						name: 'codigoFim',
						fieldLabel: 'Código Final',
						allowBlank: false
					},
					{
						xtype: 'numberfield',
						name: 'numCaracteres',
						fieldLabel: 'Número de caracteres',
						allowBlank: false
					},
					{
						xtype: 'numberfield',
						name: 'preco',
						fieldLabel: 'Preço',
						allowBlank: false
					},
					{
						xtype: 'hiddenfield',
						name: 'id_evento',
						value: 0
					},
					{
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