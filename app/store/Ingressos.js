Ext.define('IGExt.store.Ingressos',{
	extend: 'Ext.data.Store',
	model: 'IGExt.model.Ingresso',
	autoLoad: true,
	remoteSort: false,
	pageSize: 10,
	proxy: {
		simpleSortMode: true,
		type: 'ajax',
		api: {
			read: 'php/Ingresso/Ingresso.php?action=fetchall',
			create: 'php/Ingresso/Ingresso.php?action=insert',
			update: 'php/Ingresso/Ingresso.php?action=update',
			destroy: 'php/Ingresso/Ingresso.php?action=delete'
		},
		actionMethods: {
			read: 'POST',
			create: 'POST',
			update: 'POST',
			destroy: 'POST'
		},
		reader: {
			type: 'json',
			root: 'data',
			successProperty: 'success'
		},
		writer: {
			type: 'json',
			writeAllFields: true,
			encode: true,
			root: 'data',
		},
		extraParams: {
//			start: 'start',
//			limit: 'limit',
			sort: 'codigo',
			dir: 'ASC',
			total: 'total',
			id_lote: 'id_lote'
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
		write: function(proxy,operation){
			var obj = Ext.decode(operation.response.responseText);
			if(obj.success){
				Ext.Msg.show({
				     title:'Ok',
				     msg: obj.message,
				     buttons: Ext.Msg.OK,
				     icon: Ext.Msg.OK
				});
			}else{
				Ext.Msg.show({
				     title:'Erro',
				     msg: obj.message,
				     buttons: Ext.Msg.OK,
				     icon: Ext.Msg.ERROR
				});
			}
		},
		load: function(self,records,successful,operation,eOpts){
			myMask.hide();
		},
		// 'beforeload': function(store, options) {
  //           this.proxy.extraParams.limit=10;
  //           //this.proxy.extraParams.limit=;
  //       },
	}
});