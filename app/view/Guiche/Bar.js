Ext.define('IGExt.view.Guiche.Bar',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.Bar',
	store: 'Ingressos',
	border: false,
	autoScroll:true,
	title: 'Ingresso',
	layout: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	items: [
		{
			xtype: 'form',
			url : './php/Produto/PrecoProduto.php?action=check',
			monitorValid : true, //evita que o form seja enviado sem estar corretamente preenchido
			bodyPadding: 10,
			border: false,
			plain: true,
			items: [
				{
					xtype: 'combo',
					fieldLabel: 'Evento',
					store: 'Eventos',
					queryMode: 'remote',
					displayField: 'nome',
					valueField: 'id',
					name: 'id_evento'
				},
				{
					xtype: 'textfield',
					name: 'codigo',
					width: 500,
					fieldLabel: 'Ficha',
					itemId: 'fieldCodIng',
					allowBlank: false,
					listeners: {
						specialkey : function(field,e){
							if(e.getKey() === e.ENTER){
								field.up('form').up('panel').fireEvent('mySubmitEvent',this);
                        	}
						}
					}
				},
				{
					xtype: 'displayfield',
					name: 'codigo',
					itemId: 'fieldUltCodIng',
					fieldLabel: 'Última Ficha'
				}
			],
			buttons: [
				{
					text: 'Verificar',
					action: 'check',
					iconCls: 'check'
				}
			]
		},
		{
			xtype: 'panel',
			layout: 'fit',
			title: 'Validação',
			itemId: 'panelValidacao',
			flex: 1,
//			html: '<div><h1>OK</h1></div>'
		}
	],
	initComponent: function(){
		this.callParent();
	}
});