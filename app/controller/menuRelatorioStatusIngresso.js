Ext.require('Ext.window.MessageBox');

Ext.define('IGExt.controller.menuRelatorioStatusIngresso', {
	extend: 'Ext.app.Controller',
	views: [
		'Grafico.StatusIngresso',
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