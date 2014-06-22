Ext.define('IGExt.view.PrecoProduto.CadPrecoProduto',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.CadPrecoProduto',
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
			items:[{xtype: 'precoProdutoList'}]
		}
	],
	initComponent: function(){
		this.callParent();
	},
});