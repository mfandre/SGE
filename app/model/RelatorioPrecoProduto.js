Ext.define('IGExt.model.RelatorioPrecoProduto',{
	extend: 'Ext.data.Model',
	fields: [
		{
			name: 'produto',
		},
		{
			name: 'qtde',
			type: 'number'
		},
		{
			name: 'total',
			type: 'number'
		}
	]
});