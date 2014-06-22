Ext.define('IGExt.view.Relatorio.RelatorioBar',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.relatorioBar',
	border: false,
	layout: {type: 'vbox',pack: 'start', align: 'stretch'},
	items: [
		{
			xtype: 'combo',
			id: 'cbeventoBar',
			fieldLabel: 'Evento',
			store: 'Eventos',
			queryMode: 'remote',
			displayField: 'nome',
			valueField: 'id',
			name: 'id_evento'
		},
		{
			xtype: 'gridpanel',
			itemId: 'gridRelatorioBar',
			title: 'Relatório',
			features: [{
			        ftype: 'summary'
			}],
			store: 'RelatorioPrecoProdutos',
			columns: [
            			{
			                text     : 'Produto',
        	        		flex     : 1,
			                sortable : false,
		                	dataIndex: 'produto'
            			},
				{
			                text     : 'Quantidade',
			                flex     : 1,
			                sortable : false,
					summaryType: 'sum',
					summaryRenderer: function(value, summaryData, dataIndex) {
            					return Ext.String.format('Quantidade Total: {0}', value); 
        				},
			                dataIndex: 'qtde'
				},
				{
			                text     : 'Total',
			                flex     : 1,
			                sortable : false,
					summaryType: 'sum',
					summaryRenderer: function(value, summaryData, dataIndex) {
            					return Ext.String.format('Total: R$ {0} ', value); 
        				},
			                dataIndex: 'total'
				}
			],
			viewConfig: {
            			stripeRows: true,
			        enableTextSelection: true
		        },
			flex:1
		},
	],
	initComponent: function(){
		this.callParent();
	}
});