Ext.define('IGExt.model.PrecoProduto',{
	extend: 'Ext.data.Model',
	fields: [
		{
			name: 'id'
		},
		{
			name: 'id_evento',
		},
		{
			name: 'id_produto',
		},
		{
			name: 'codigo',
		},
		{
			name: 'status',
		},
		{
			name: 'preco',
			type: 'float'
		},
		{
			name: 'data_cadastro',
			type: 'date'
		}
	]

});