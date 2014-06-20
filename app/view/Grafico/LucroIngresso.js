Ext.define('IGExt.view.Grafico.LucroIngresso',{
	extend: 'Ext.chart.Chart',
	alias: 'widget.graficoLucroIngresso',
	layout: 'fit',
	itemId: 'graficoLucroIngresso',
	store: Ext.create('Ext.data.Store',{ 
		proxy: {
			type: 'ajax',
			url: './php/Ingresso/Ingresso.php?action=relatorioLucroIngresso',
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
			{name: 'valor_arrecadado', type: 'number'},
			{name: 'num_ingressos', type: 'number'},
			{name: 'lote', type: 'string'},
		] 
	}),
	animate: true,
	// legend: {
	// 	position: 'right'
	// },
	theme: 'Base:gradients',
	axes: [
		{
			type: 'Category',
			position: 'left',
			fields: ['lote'],
			title: 'Lote'
		},
		{
			type: 'Numeric',
			position: 'bottom',
			fields: ['valor_arrecadado'],
			label: {
				renderer: Ext.util.Format.numberRenderer('0,0')
			},
			title: 'Valor Arrecadado',
			grid: true,
			minimum: 0
		}
	],
	series: [
		{
			type: 'bar',
			axis: 'bottom',
			highlight: true,
			tips: {
				trackMouse: true,
				width: 200,
				height: 20,
				renderer: function(storeItem, item) {
					this.setTitle('O valor arrecado foi de R$' + storeItem.get('valor_arrecadado'));
				}
			},
			label: {
				display: 'insideEnd',
				field: 'num_ingressos',
				renderer: Ext.util.Format.numberRenderer('0,0'),
				orientation: 'horizontal',
				color: '#333',
				'text-anchor': 'middle',
				font: '40px Arial'
			},
			xField: 'lote',
			yField: 'valor_arrecadado',
			renderer: function(sprite, record, attr, index, store) {
				var fieldValue = Math.random() * 20 + 10;
				var value = (record.get('valor_arrecadado') >> 0) % 7;
				var color = ['rgb(213, 70, 121)', 
					'rgb(44, 153, 201)', 
					'rgb(146, 6, 157)', 
					'rgb(49, 149, 0)', 
					'rgb(249, 153, 0)'][value];
				return Ext.apply(attr, {
							fill: color
						});
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