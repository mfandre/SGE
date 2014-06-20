Ext.require('Ext.window.MessageBox');

Ext.define('IGExt.controller.menuLoteLotes', {
	extend: 'Ext.app.Controller',
	views: [
		'CadEvento.CadEvento',
		'Lote.List',
		'Lote.Edit'
	],
	models: ['Lote'],
	stores: ['Lotes'],

// faz um get/set para as views
// ele pega alias
	refs: [ 
		{
			ref: 'loteEdit',
			selector: 'loteEdit'
		},
		{
			ref: 'loteList',
			selector: 'loteList'
		}
	],

	init: function(){
		this.control({
			'loteList' : {
				itemdblclick: this.edit,
				itemclick: function(self,model, html_element, index, event,opts){
					myMask.show();
					var panelIngresso = self.ownerCt.up('panel').up('panel').down('#panelIngresso');
					if(self.up('#panelLote').getSelectionModel().getCount()==0 || self.up('#panelLote').getSelectionModel().getCount()>1){
						myMask.hide();
						panelIngresso.disable();
						return;
					}

					panelIngresso.store.proxy.extraParams.id_lote = model.getId();
					panelIngresso.store.loadPage(1);
					panelIngresso.enable();
				}
			},

			// 'eventoList' : {
			// 	meuevento: this.disparandoNossoEvento
			// },

			'loteList button[action=insert]' : {
				click: this.insert
			},

			'loteList button[action=edit]' : {
				click: this.edit
			},

			'loteList button[action=destroy]' : {
				click: this.destroy
			},

			'loteList button[action=refresh]' : {
				click: this.refresh
			},

			'loteEdit button[action=save]' : {
				click: this.save
			}
		});
	},

	disparandoNossoEvento: function(){
		console.log('Evento customizado');
	},

	refresh: function(btn){
		var panelIngresso= btn.up('panel').up('panel').up('panel').down('#panelIngresso');
		panelIngresso.disable();
		myMask.show();
		this.getLoteList().store.load();
	},

	insert: function(btn,evt,opt){
		var id_event = btn.up('panel').down('gridview').store.proxy.extraParams.id_evento;
		// var gridEvento = btn.up('panel').up('panel').up('panel').down('#panelEvento');

		// var record = gridEvento.getSelectionModel().getSelected();

		var view = Ext.widget('loteEdit');
		view.setTitle('Inserindo lote');
		view.down('form').down('hiddenfield').setValue(id_event);
	},

	destroy: function(){
		var grid = this.getLoteList();
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
						var store = this.getLoteList().store;
						store.remove(records);
						this.getLoteList().store.sync();
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
				var record = Ext.create('IGExt.model.Lote');
				record.set(values);
				this.getLoteList().store.add(record);
			}
			win.close();
			this.getLoteList().store.sync();
		}else{
			Ext.Msg.alert('Atenção','Preencha os campos corretamente.');
		}
	},

	edit: function(){
		var records = this.getLoteList().getSelectionModel().getSelection();

		if(records.length === 1){
			var editwind = Ext.widget('loteEdit');
			var editForm = editwind.down('form');
			var record = records[0];
			editForm.loadRecord(record);
		}else{
			return;
		}
	}
});