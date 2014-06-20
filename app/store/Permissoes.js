Ext.define('IGExt.store.Permissoes',{
	extend: 'Ext.data.Store',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		url: './php/Usuario/Permissao.php?action=fetchall',
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
	listeners: {
		load: function(self,records,successful,operation,eOpts){
			myMask.hide();
		},
	},
	fields: [
		{name: 'id', type: 'number'},
		{name: 'dcr', type: 'string'},
		{name: 'permissao', type: 'number'}
	] 
});