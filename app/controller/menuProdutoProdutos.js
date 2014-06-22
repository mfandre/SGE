Ext.require('Ext.window.MessageBox');

Ext.define('IGExt.controller.menuProdutoProdutos', {
	extend: 'Ext.app.Controller',
	views: [
		'Produto.List',
		'Produto.Edit',
		'Produto.CadProduto',
	],
	models: ['Produto'],
	stores: ['Produtos'],

// faz um get/set para as views
// ele pega alias
	refs: [ 
		{
			ref: 'produtoEdit',
			selector: 'produtoEdit'
		},
		{
			ref: 'produtoList',
			selector: 'produtoList'
		}
	],

	init: function(){
		this.control({
			'produtoList' : {
				itemdblclick: this.edit,
			},

			// 'eventoList' : {
			// 	meuevento: this.disparandoNossoEvento
			// },

			'produtoList button[action=insert]' : {
				click: this.insert
			},

			'produtoList button[action=edit]' : {
				click: this.edit
			},

			'produtoList button[action=destroy]' : {
				click: this.destroy
			},

			'produtoList button[action=refresh]' : {
				click: this.refresh
			},

			'produtoEdit button[action=save]' : {
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
		this.getProdutoList().store.load();
	},

	insert: function(btn,evt,opt){
		var view = Ext.widget('produtoEdit');
		view.setTitle('Inserindo produto');
	},

	destroy: function(){
		var grid = this.getProdutoList();
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
						var store = this.getProdutoList().store;
						store.remove(records);
						this.getProdutoList().store.sync();
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
				var record = Ext.create('IGExt.model.Produto');
				record.set(values);
				this.getProdutoList().store.add(record);
			}
			win.close();
			this.getProdutoList().store.sync();
		}else{
			Ext.Msg.alert('Atenção','Preencha os campos corretamente.');
		}
	},

	edit: function(){
		var records = this.getProdutoList().getSelectionModel().getSelection();

		if(records.length === 1){
			var editwind = Ext.widget('produtoEdit');
			var editForm = editwind.down('form');
			var record = records[0];
			editForm.loadRecord(record);
		}else{
			return;
		}
	}
});