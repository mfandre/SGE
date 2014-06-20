Ext.require('Ext.window.MessageBox');

Ext.define('IGExt.controller.menuIngressoIngressos', {
	extend: 'Ext.app.Controller',
	views: [
		'CadEvento.CadEvento',
		'Ingresso.List',
		'Ingresso.Edit',
		'Ingresso.EditVarios'
	],
	models: ['Ingresso'],
	stores: ['Ingressos'],

// faz um get/set para as views
// ele pega alias
	refs: [ 
		{
			ref: 'ingressoEdit',
			selector: 'ingressoEdit'
		},
		{
			ref: 'ingressoList',
			selector: 'ingressoList'
		},
		{
			ref: 'ingressoEditVarios',
			selector: 'ingressoEditVarios'
		}
	],

	init: function(){
		this.control({
			'ingressoList' : {
				itemdblclick: this.edit,
				itemclick: function(self,model, html_element, index, event,opts){}
			},

			// 'eventoList' : {
			// 	meuevento: this.disparandoNossoEvento
			// },

			'ingressoList button[action=insert]' : {
				click: this.insert
			},

			'ingressoList button[action=insertVarios]' : {
				click: this.insertVarios
			},

			'ingressoList button[action=edit]' : {
				click: this.edit
			},

			'ingressoList button[action=comprarTodos]' : {
				click: this.comprarTodos
			},

			'ingressoList button[action=destroy]' : {
				click: this.destroy
			},

			'ingressoList button[action=destroyVarios]' : {
				click: this.destroyVarios
			},

			'ingressoList button[action=refresh]' : {
				click: this.refresh
			},

			'ingressoEdit button[action=save]' : {
				click: this.save
			},

			'ingressoEditVarios button[action=save]' : {
				click: this.saveVarios
			},

		});
	},

	disparandoNossoEvento: function(){
		console.log('Evento customizado');
	},

	refresh: function(){
		myMask.show();
		this.getIngressoList().store.load({
			params: {
				start: 0,
				limit: 10
			}
		});
	},

	insert: function(btn,evt,opt){

		var id_lot = btn.up('panel').down('gridview').store.proxy.extraParams.id_lote;
		// var gridEvento = btn.up('panel').up('panel').up('panel').down('#panelEvento');

		// var record = gridEvento.getSelectionModel().getSelected();

		var view = Ext.widget('ingressoEdit');
		view.setTitle('Inserindo ingresso');
		view.down('form').down('hiddenfield').setValue(id_lot);
	},

	insertVarios: function(btn,evt,opt){
		var id_lot = btn.up('panel').down('gridview').store.proxy.extraParams.id_lote;
		//var id_evento = btn.up('panel').up('panel').up('panel').up('panel').down('#panelEvento').selModel.lastSelected.getId();

		// var record = gridEvento.getSelectionModel().getSelected();

		var view = Ext.widget('ingressoEditVarios');
		view.setTitle('Inserindo ingresso');
		view.down('form').down('hiddenfield').setValue(id_lot);
	},

	comprarTodos: function(btn,evt,opt){
		var id_lot = btn.up('panel').down('gridview').store.proxy.extraParams.id_lote;
		//var id_evento = btn.up('panel').up('panel').up('panel').up('panel').down('#panelEvento').selModel.lastSelected.getId();
		var store = this.getIngressoList().store;
		// var record = gridEvento.getSelectionModel().getSelected();

		Ext.Msg.show({
			title: 'Confirmação',
			msg: 'Tem certeza que deseja marcar TODOS os ingressos como comprados? Esta operação não tem volta.',
			buttons: Ext.Msg.YESNO,
			icon: Ext.MessageBox.WARNING,
			scope: this,
			width: 450,
			fn: function(btn,ev){
				if(btn == 'yes'){
					Ext.Ajax.request({
						method: 'POST',
						params: {data: id_lot},
						waitTitle: 'Marcando ingressos na base de dados...',
						waitMsg: 'Aguarde...',
						url: './php/Ingresso/Ingresso.php?action=comprarTodos',
						success: function(response) {
							var obj = Ext.decode(response.responseText);
							Ext.Msg.alert("Sucesso",obj.message);
							store.load(store.lastOptions);
						},
						failure: function() {
							Ext.Msg.alert('ERROR', 'Erro ao marcar TODOS ingressos como comprados.');
						}
					});
				}
			}
		});
		store.load(store.lastOptions);
	},

	destroyVarios: function(btn,evt,opt){
		var id_lot = btn.up('panel').down('gridview').store.proxy.extraParams.id_lote;
		//var id_evento = btn.up('panel').up('panel').up('panel').up('panel').down('#panelEvento').selModel.lastSelected.getId();
		var store = this.getIngressoList().store;
		// var record = gridEvento.getSelectionModel().getSelected();

		Ext.Msg.show({
			title: 'Confirmação',
			msg: 'Tem certeza que deseja deletar TODOS os registros? Esta operação não tem volta.',
			buttons: Ext.Msg.YESNO,
			icon: Ext.MessageBox.WARNING,
			scope: this,
			width: 450,
			fn: function(btn,ev){
				if(btn == 'yes'){
					Ext.Ajax.request({
						method: 'POST',
						params: {data: id_lot},
						waitTitle: 'Deletando ingressos na base de dados...',
						waitMsg: 'Aguarde...',
						url: './php/Ingresso/Ingresso.php?action=destroyVarios',
						success: function(response) {
							var obj = Ext.decode(response.responseText);
							Ext.Msg.alert("Sucesso",obj.message);
							store.load(store.lastOptions);
						},
						failure: function() {
							Ext.Msg.alert('ERROR', 'Erro ao deletar TODOS ingressos.');
						}
					});
				}
			}
		});
		store.load(store.lastOptions);
	},

	destroy: function(){
		var grid = this.getIngressoList();
		var records = grid.getSelectionModel().getSelection();

		if(records.length === 0){
			Ext.Msg.alert('Atenção','Nenhum registro selecionado');
			return false;
		}else{
			Ext.Msg.show({
				title: 'Confirmação',
				msg: 'Tem certeza que deseja deletar o(s) registro(s) selecionado(s)?',
				buttons: Ext.Msg.YESNO,
				icon: Ext.MessageBox.WARNING,
				scope: this,
				width: 450,
				fn: function(btn,ev){
					if(btn == 'yes'){
						var store = this.getIngressoList().store;
						store.remove(records);
						this.getIngressoList().store.sync();
					}
				}
			});
		}
	},

	save: function(button){
		var win = button.up('window');
		var form = win.down('form').getForm();
		var id = form.getRecord() ? form.getRecord().get('id') : 0;

		if(form.isValid()){
			var record = form.getRecord();
			var values = form.getValues();

			if(record){
				if(record.data['id']){
					record.set(values);
				}
			}else{
				var record = Ext.create('IGExt.model.Ingresso');
				record.set(values);
				this.getIngressoList().store.add(record);
			}
			win.close();
			this.getIngressoList().store.sync();
			this.getIngressoList().store.load(this.getIngressoList().store.lastOptions);
		}else{
			Ext.Msg.alert('Atenção','Preencha os campos corretamente.');
		}
	},

	saveVarios: function(button){
		var win = button.up('window');
		var form = win.down('form').getForm();
		var id = form.getRecord() ? form.getRecord().get('id') : 0;
		var store = this.getIngressoList().store;

		if(form.isValid()){
			form.submit({
				method: 'POST',
				waitTitle: 'Inserindo ingressos na base de dados...',
				waitMsg: 'Aguarde...',
				success: function(form){
					win.hide();
					Ext.Msg.show({
						title: 'Sucesso', 
						msg: 'Ingressos inseridos com sucesso.',
						buttons: Ext.Msg.OK,
						icon: Ext.MessageBox.INFO,
						scope: this,
						width: 150,
						fn: function(){win.show();},
					});
					store.load(store.lastOptions);
				},
				failure: function(form,action){
					if(action.failureType == 'server'){
						win.hide();
						var obj = Ext.decode(action.response.responseText);
						Ext.Msg.show({
							title: 'Atenção', 
							msg: obj.errors.reason,
							buttons: Ext.Msg.OK,
							icon: Ext.MessageBox.ERROR,
							scope: this,
							width: 150,
							fn: function(){win.show();},
						});
					}else{
						win.hide();
						Ext.Msg.show({
							title: 'Atenção', 
							msg: 'Não foi possível inserir. Tente novamente.',
							buttons: Ext.Msg.OK,
							icon: Ext.MessageBox.ERROR,
							scope: this,
							width: 150,
							fn: function(){win.show();},
						});
					}
				}
			});
		}

		store.load(store.lastOptions);
		store.sync();
	},

	edit: function(){
		var records = this.getIngressoList().getSelectionModel().getSelection();

		if(records.length === 1){
			var editwind = Ext.widget('ingressoEdit');
			var editForm = editwind.down('form');
			var record = records[0];
			editForm.loadRecord(record);
		}else{
			return;
		}
	}
});