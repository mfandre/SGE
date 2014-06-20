Ext.require('Ext.window.MessageBox');

Ext.define('IGExt.controller.menuUsuarioUsuarios', {
	extend: 'Ext.app.Controller',
	views: [
		'Usuario.List',
		'Usuario.Edit',
	],
	models: ['Usuario'],
	stores: ['Usuarios','Permissoes'],

// faz um get/set para as views
// ele pega alias
	refs: [ 
		{
			ref: 'usuarioEdit',
			selector: 'usuarioEdit'
		},
		{
			ref: 'usuarioList',
			selector: 'usuarioList'
		}
	],

	init: function(){
		this.control({
			'usuarioList' : {
				itemdblclick: this.edit,
				itemclick: function(self,model, html_element, index, event,opts){}
			},

			'usuarioList button[action=insert]' : {
				click: this.insert
			},

			'usuarioList button[action=edit]' : {
				click: this.edit
			},

			'usuarioList button[action=destroy]' : {
				click: this.destroy
			},

			'usuarioList button[action=refresh]' : {
				click: this.refresh
			},

			'usuarioEdit button[action=save]' : {
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
		myMask.show();
		this.getUsuarioList().store.load();
	},

	insert: function(btn,evt,opt){
		var view = Ext.widget('usuarioEdit');
		view.setTitle('Inserindo usuário');
	},

	destroy: function(){
		var grid = this.getUsuarioList();
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
						var store = this.getUsuarioList().store;
						store.remove(records);
						this.getUsuarioList().store.sync();
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
				var record = Ext.create('IGExt.model.Usuario');
				record.set(values);
				this.getUsuarioList().store.add(record);
			}
			win.close();
			this.getUsuarioList().store.sync();
		}else{
			Ext.Msg.alert('Atenção','Preencha os campos corretamente.');
		}
	},

	edit: function(){
		var records = this.getUsuarioList().getSelectionModel().getSelection();

		if(records.length === 1){
			var editwind = Ext.widget('usuarioEdit');
			var editForm = editwind.down('form');
			var record = records[0];
			editForm.loadRecord(record);
		}else{
			return;
		}
	}
});