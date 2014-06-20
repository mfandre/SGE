Ext.define('IGExt.view.CadEvento.CadEvento',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.CadEvento',
	border: false,
	autoScroll:true,
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items: [
		{
			xtype: 'panel',
			flex: 1,
			layout: 'fit',
			items:[{xtype: 'eventoList'}]
		},
		{
			xtype: 'panel',
			flex: 2,
			itemId: 'panelLoteIngresso',
			layout: {
				type: 'hbox',
				align: 'stretchmax'
			},
			items: [
				{flex: 1,items:[{xtype: 'loteList',disabled:true,height:350,}]},
				{flex: 1,items:[{xtype: 'ingressoList',disabled: true,height:350,}]}
			]
		}
	],
	initComponent: function(){
		this.callParent();
	},
});