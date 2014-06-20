Ext.define('IGExt.view.Venda.VendaIngresso',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.VendaIngresso',
	store: 'Ingressos',
	border: false,
	autoScroll:true,
	title: 'Venda de ingressos',
	layout: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	items: [
		{
			xtype: 'form',
			url : './php/Ingresso/Ingresso.php?action=vender',
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
					fieldLabel: 'Ingresso',
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
					fieldLabel: 'Último Ingresso'
				}
			],
			buttons: [
				{
					text: 'Vender',
					action: 'vender',
					iconCls: 'check'
				}
			]
		}
	],
	initComponent: function(){
		this.callParent();
	}
});