Ext.require('Ext.window.MessageBox');

Ext.define('IGExt.controller.menuRelatorioBar', {
	extend: 'Ext.app.Controller',
	views: [
		'Relatorio.RelatorioBar',
	],
	models: ['RelatorioPrecoProduto'],
	stores: ['RelatorioPrecoProdutos'],
// faz um get/set para as views
// ele pega alias
	refs: [ 
		{
			ref: 'RelatorioBar',
			selector: 'RelatorioBar'
		}
	],

	init: function(){
		this.control({
			'RelatorioBar' : {
			},
			'#cbeventoBar' : {
				change: this.changeCombo
			}
	
		});
	},
	changeCombo : function(combo,records){
		console.log('a');
		var gridRelatorioBar = combo.up('panel').down('#gridRelatorioBar');
		gridRelatorioBar.store.proxy.extraParams.id_evento = combo.getValue();
		gridRelatorioBar.store.load();

		//alert('eitalele');
	}
});