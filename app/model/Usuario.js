Ext.define('IGExt.model.Usuario',{
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
			name: 'login',
			type: 'string'
		},
		{
			name: 'senha',
			type: 'string'
		},
		{
			name: 'cpf',
			type: 'string'
		},
		{
			name: 'data_cadastro',
			type: 'date'
		},
		{
			name: 'permissao',
			type: 'number'
		}
	]

});