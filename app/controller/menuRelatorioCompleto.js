Ext.require('Ext.window.MessageBox');

Ext.define('IGExt.controller.menuRelatorioCompleto', {
	extend: 'Ext.app.Controller',
	views: [
		'Relatorio.Relatorio',
		'Grafico.LucroIngresso',
		'Grafico.StatusIngresso'
	],
// faz um get/set para as views
// ele pega alias
	refs: [ 
		{
			ref: 'RelatorioCompleto',
			selector: 'RelatorioCompleto'
		}
	],

	init: function(){
		this.control({
			'RelatorioCompleto' : {
			},
			'#cbevento' : {
				change: this.changeCombo
			}
	
		});
	},
	changeCombo : function(combo,records){
		var graficoLucroIngresso = combo.up('panel').down('#graficoLucroIngresso');
		graficoLucroIngresso.store.proxy.extraParams.id = combo.getValue();
		graficoLucroIngresso.store.load(function(){graficoLucroIngresso.redraw();});

		

		var graficoStatusIngresso = combo.up('panel').down('#graficoStatusIngresso');
		graficoStatusIngresso.store.proxy.extraParams.id = combo.getValue();
		graficoStatusIngresso.store.load(function(){graficoStatusIngresso.redraw();});
		

		console.log('a');
		//alert('eitalele');
	}
});