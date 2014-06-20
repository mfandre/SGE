Ext.define('IGExt.model.Ingresso',{
	extend: 'Ext.data.Model',
	fields: [
		{
			name: 'id'
		},
		{
			name: 'codigo',
			type: 'string'
		},
		{
			name: 'id_lote'
		},
		{
			name: 'cortesia'
		},
		{
			name: 'status'
		},
		{
			name: 'duplicado'
		}
	]

});