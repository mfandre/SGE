Ext.define('IGExt.model.Lote',{
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
			name: 'preco',
			type: 'float'
		},
		{
			name: 'id_evento'
		}
	]

});