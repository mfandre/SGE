Ext.require('Ext.window.MessageBox');

Ext.define('IGExt.controller.menuEventoEventos', {
	extend: 'Ext.app.Controller',
	views: [
		'CadEvento.CadEvento',
		'Evento.List',
		'Evento.Edit'
	],
	models: ['Evento'],
	stores: ['Eventos'],

// faz um get/set para as views
// ele pega alias
	refs: [ 
		{
			ref: 'eventoEdit',
			selector: 'eventoEdit'
		},
		{
			ref: 'eventoList',
			selector: 'eventoList'
		}
	],

	init: function(){
		this.control({
			'eventoList' : {
				itemdblclick: this.edit,
				itemclick: function(self,model, html_element, index, event,opts){
					myMask.show();
					var panelLote = self.ownerCt.up('panel').up('panel').down('#panelLoteIngresso').down('#panelLote');
					var panelIngresso= self.ownerCt.up('panel').up('panel').down('#panelLoteIngresso').down('#panelIngresso');
					if(self.up('#panelEvento').getSelectionModel().getCount()==0 || self.up('#panelEvento').getSelectionModel().getCount()>1){
						myMask.hide();
						panelLote.disable();
						panelIngresso.disable();
						return;
					}

					panelLote.store.proxy.extraParams.id_evento = model.getId();
					panelLote.store.loadPage(1);
					panelLote.enable();
					panelIngresso.disable();
				}
			},

			// 'eventoList' : {
			// 	meuevento: this.disparandoNossoEvento
			// },

			'eventoList button[action=insert]' : {
				click: this.insert
			},

			'eventoList button[action=edit]' : {
				click: this.edit
			},

			'eventoList button[action=destroy]' : {
				click: this.destroy
			},

			'eventoList button[action=refresh]' : {
				click: this.refresh
			},

			'eventoEdit button[action=save]' : {
				click: this.save
			}
		});
	},
	afterrender: function(component) {
		component.getBottomToolbar().refresh.hideParent = true;
		component.getBottomToolbar().refresh.hide();
	},
	disparandoNossoEvento: function(){
		console.log('Evento customizado');
	},

	refresh: function(btn){
		var panelLote = btn.up('panel').up('panel').up('panel').down('#panelLoteIngresso').down('#panelLote');
		var panelIngresso= btn.up('panel').up('panel').up('panel').down('#panelLoteIngresso').down('#panelIngresso');
		panelLote.disable();
		panelIngresso.disable();
		myMask.show();
		this.getEventoList().store.load();
	},

	insert: function(btn,evt,opt){
		var view = Ext.widget('eventoEdit');
		view.setTitle('Inserindo evento');
	},

	destroy: function(){
		var grid = this.getEventoList();
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
						var store = this.getEventoList().store;
						store.remove(records);
						this.getEventoList().store.sync();
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
				var record = Ext.create('IGExt.model.Evento');
				record.set(values);
				this.getEventoList().store.add(record);
			}
			win.close();
			this.getEventoList().store.sync();
		}else{
			Ext.Msg.alert('Atenção','Preencha os campos corretamente.');
		}
	},

	edit: function(){
		var records = this.getEventoList().getSelectionModel().getSelection();

		if(records.length === 1){
			var editwind = Ext.widget('eventoEdit');
			var editForm = editwind.down('form');
			var record = records[0];
			editForm.loadRecord(record);
		}else{
			return;
		}
	}
});