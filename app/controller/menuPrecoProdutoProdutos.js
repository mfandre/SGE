Ext.require('Ext.window.MessageBox');

Ext.define('IGExt.controller.menuPrecoProdutoProdutos', {
	extend: 'Ext.app.Controller',
	views: [
		'Evento.List',
		'Produto.List',
		'PrecoProduto.List',
		'PrecoProduto.Edit',
		'PrecoProduto.EditVarios',
		'CadFichaProduto.CadFichaProduto',
	],
	models: ['PrecoProduto'],
	stores: ['PrecoProdutos'],

// faz um get/set para as views
// ele pega alias
	refs: [ 
		{
			ref: 'eventoList',
			selector: 'CadFichaProduto eventoList'
		},
		{
			ref: 'produtoList',
			selector: 'CadFichaProduto produtoList'
		},
		{
			ref: 'precoProdutoEdit',
			selector: 'precoProdutoEdit'
		},
		{
			ref: 'precoProdutoEditVarios',
			selector: 'precoProdutoEditVarios'
		},
		{
			ref: 'precoProdutoList',
			selector: 'CadFichaProduto precoProdutoList'
		}
	],

	init: function(){
		
		//this.getEventoList().dockedItems.items = [];
		

		this.control({
			'CadFichaProduto eventoList':{
				afterrender: function(){
					
					console.log('Render customizado');
		var docked = this.getEventoList().getDockedItems();
		//removendo toolbar com os botões
		docked[1].setVisible(false);

				},
				itemclick: function(self,model, html_element, index, event,opts){
					myMask.show();
					if(this.getEventoList().getSelectionModel().getCount()==0 || this.getEventoList().getSelectionModel().getCount()>1){
						myMask.hide();
						this.getProdutoList().disable();
						this.getPrecoProdutoList().disable();
						return;
					}
					this.getPrecoProdutoList().store.proxy.extraParams.id_evento = 0;
					this.getPrecoProdutoList().store.proxy.extraParams.id_produto = 0;
					this.getPrecoProdutoList().store.load();
					this.getProdutoList().store.load();
					this.getProdutoList().enable();
					myMask.hide();
				}
			},
			'CadFichaProduto produtoList':{
				itemclick: function(self,model, html_element, index, event,opts){
					myMask.show();
					if(this.getProdutoList().getSelectionModel().getCount()==0 || this.getProdutoList().getSelectionModel().getCount()>1){
						myMask.hide();
						this.getPrecoProdutoList().disable();
						return;
					}
					var modelEvento = this.getEventoList().getSelectionModel().getSelection()[0];
					this.getPrecoProdutoList().store.proxy.extraParams.id_evento = modelEvento.getId();
					this.getPrecoProdutoList().store.proxy.extraParams.id_produto = model.getId();
					this.getPrecoProdutoList().store.loadPage(1);
					this.getPrecoProdutoList().enable();
					myMask.hide();
				}
			},
			'CadFichaProduto precoProdutoList' : {
				itemdblclick: this.edit,
			},


			'CadFichaProduto precoProdutoList button[action=insert]' : {
				click: this.insert
			},

			'CadFichaProduto precoProdutoList button[action=edit]' : {
				click: this.edit
			},

			'CadFichaProduto precoProdutoList button[action=destroy]' : {
				click: this.destroy
			},

			'CadFichaProduto precoProdutoList button[action=refresh]' : {
				click: this.refresh
			},

			'CadFichaProduto precoProdutoList button[action=insertVarios]' : {
				click: this.insertVarios
			},

			'precoProdutoEdit button[action=save]' : {
				click: this.save
			},

			'precoProdutoEditVarios button[action=save]' : {
				click: this.saveVarios
			},
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
		this.getPrecoProdutoList().store.load();
	},

	insert: function(btn,evt,opt){
		var view = Ext.widget('precoProdutoEdit');
		view.setTitle('Inserindo produto');

		var idEvento = this.getPrecoProdutoList().store.proxy.extraParams.id_evento;
		var idProduto = this.getPrecoProdutoList().store.proxy.extraParams.id_produto;

		view.down('form').query('hiddenfield')[0].setValue(idEvento);
		view.down('form').query('hiddenfield')[1].setValue(idProduto);
	},

	insertVarios: function(btn,evt,opt){
		var view = Ext.widget('precoProdutoEditVarios');
		view.setTitle('Inserindo fichas');

		var idEvento = this.getPrecoProdutoList().store.proxy.extraParams.id_evento;
		var idProduto = this.getPrecoProdutoList().store.proxy.extraParams.id_produto;

		view.down('form').query('hiddenfield')[0].setValue(idEvento);
		view.down('form').query('hiddenfield')[1].setValue(idProduto);
	},

	destroy: function(){
		var grid = this.getPrecoProdutoList();
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
						var store = this.getPrecoProdutoList().store;
						store.remove(records);
						this.getPrecoProdutoList().store.sync();
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
				var record = Ext.create('IGExt.model.PrecoProduto');
				record.set(values);
				this.getPrecoProdutoList().store.add(record);
			}
			win.close();
			this.getPrecoProdutoList().store.sync();
			this.getPrecoProdutoList().store.load(this.getPrecoProdutoList().store.lastOptions);
		}else{
			Ext.Msg.alert('Atenção','Preencha os campos corretamente.');
		}
		
	},

	saveVarios: function(button){
		var win = button.up('window');
		var form = win.down('form').getForm();
		var id = form.getRecord() ? form.getRecord().get('id') : 0;
		var store = this.getPrecoProdutoList().store;

		if(form.isValid()){
			form.submit({
				method: 'POST',
				waitTitle: 'Inserindo ingressos na base de dados...',
				waitMsg: 'Aguarde...',
				success: function(form){
					win.hide();
					Ext.Msg.show({
						title: 'Sucesso', 
						msg: 'Fichas inseridas com sucesso.',
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
		var records = this.getPrecoProdutoList().getSelectionModel().getSelection();

		if(records.length === 1){
			var editwind = Ext.widget('precoProdutoEdit');
			var editForm = editwind.down('form');
			var record = records[0];
			editForm.loadRecord(record);
		}else{
			return;
		}
	}
});