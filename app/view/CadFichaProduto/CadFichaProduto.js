Ext.define('IGExt.view.CadFichaProduto.CadFichaProduto',{
	extend: 'Ext.panel.Panel',
	itemId: 'fichaProduto',
	alias: 'widget.CadFichaProduto',
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
			itemId: 'panelProdutoEvento',
			layout: {
				type: 'hbox',
				align: 'stretchmax'
			},
			items: [
				{
					flex: 1,items:[
						{
							xtype: 'produtoList',
							disabled:true,height:350,
						}
					]
				}
,				{
					flex: 1,items:[
						{
							xtype: 'precoProdutoList',
							disabled: true,height:350
						}
					]}
			]
		}
	],
	initComponent: function(){
		this.callParent();
	},
});