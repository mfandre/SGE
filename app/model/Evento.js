Ext.define('IGExt.model.Evento',{
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
			name: 'data_evento',
			type: 'date'
		}
	]

});