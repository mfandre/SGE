Ext.define('IGExt.view.Relatorio.Relatorio',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.relatorio',
	border: false,
	layout: {type: 'vbox',pack: 'start', align: 'stretch'},
	items: [
		{
			xtype: 'combo',
			id: 'cbevento',
			fieldLabel: 'Evento',
			store: 'Eventos',
			queryMode: 'remote',
			displayField: 'nome',
			valueField: 'id',
			name: 'id_evento'
		},
		{xtype: 'graficoLucroIngresso',flex:1},
		{xtype: 'graficoStatusIngresso',flex:1}
	],
	initComponent: function(){
		this.callParent();
	}
});