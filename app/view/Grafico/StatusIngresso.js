Ext.define('IGExt.view.Grafico.StatusIngresso',{
	extend: 'Ext.chart.Chart',
	alias: 'widget.graficoStatusIngresso',
	itemId: 'graficoStatusIngresso',
	layout: 'fit',
	store: Ext.create('Ext.data.Store',{ 
		proxy: {
			type: 'ajax',
			url: './php/Ingresso/Ingresso.php?action=relatorioIngressosVendidos',
			reader: {
				type: 'json',
				root: 'data',
				successProperty: 'success'
			},
			listeners: {
				exception: function (proxy,response,operation){
					Ext.MessageBox.show({
						title: 'REMOTE EXCEPTION',
						msg: operation.getError(),
						icon: Ext.MessageBox.ERROR,
						button: Ext.Msg.OK
					});
				}
			}
		},
		fields: [
			{name: 'count', type: 'int'},
			{name: 'status', type: 'string'}
		] 
	}),
	animate: true,
	theme: 'Base:gradients',
	legend: {
		position: 'right'
	},
	theme: 'Base:gradients',
	series: [
		{
			type: 'pie',
			field: 'count',
			showInLegend: true,
			tips: {
				trackMouse: true,
				width: 225,
				height: 20,
				renderer: function(storeItem, item) {
				//calculate percentage.
					var total = 0;
					storeItem.store.each(function(rec) {
						total += rec.get('count');
					});
					this.setTitle(storeItem.get('count') + ' ingressos que correspondem a ' + Math.round(storeItem.get('count') / total * 100) + '%');
				}
			},
			highlight: {
				segment: {
					margin: 20
				}
			},
			label: {
				field: 'status',
				display: 'rotate',
				contrast: true,
				font: '18px Arial'
			}
		}
	],
		
	initComponent: function(){
		this.callParent();
		this.store.load();
		// var store = Ext.create('Ext.data.Store',{ 
		// 	proxy: {
		// 		type: 'ajax',
		// 		url: './php/Ingresso/Ingresso.php?action=relatorioIngressosVendidos',
		// 		reader: {
		// 			type: 'json',
		// 			root: 'data',
		// 			successProperty: 'success'
		// 		},
		// 		listeners: {
		// 			exception: function (proxy,response,operation){
		// 				Ext.MessageBox.show({
		// 					title: 'REMOTE EXCEPTION',
		// 					msg: operation.getError(),
		// 					icon: Ext.MessageBox.ERROR,
		// 					button: Ext.Msg.OK
		// 				});
		// 			}
		// 		}
		// 	},
			
		// 	//baseParams: {'action': 'fetchChartData'}, 
		// 	fields: [
		// 		{name: 'count', type: 'int'},
		// 		{name: 'status', type: 'int'}
		// 	] 
		// });

		// store.load();

		// this.store = store;
	}
});