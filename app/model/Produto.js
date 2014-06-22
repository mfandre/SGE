Ext.define('IGExt.model.Produto',{
	extend: 'Ext.data.Model',
	fields: [
		{
			name: 'id'
		},
		{
			name: 'nome',
			type: 'string'
		},
		{
			name: 'data_cadastro',
			type: 'date'
		}
	]

});