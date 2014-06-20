Ext.require('Ext.window.MessageBox');

Ext.define('IGExt.controller.menuRelatorioLucroIngresso', {
	extend: 'Ext.app.Controller',
	views: [
		'Grafico.LucroIngresso',
	],

// faz um get/set para as views
// ele pega alias
	refs: [ 
		{
			ref: 'StatusIngresso',
			selector: 'StatusIngresso'
		}
	],

	init: function(){
		this.control({
			'StatusIngresso' : {
			},

		});
	},

});