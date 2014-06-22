Ext.define('IGExt.view.Produto.CadProduto',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.CadProduto',
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
			items:[{xtype: 'produtoList'}]
		}
	],
	initComponent: function(){
		this.callParent();
	},
});