Ext.define('IGExt.view.Viewport',{
	extend: 'Ext.container.Viewport',
	title: 'Gestor de Eventos',
	layout: 'border',
	itemId: 'viewPortPrincipal',
	items: [
		{
			xtype: 'toolbar',
			id: 'header',
			region: 'north',
			height: 30,
			items:[
				'Sistema Gestor de Eventos', 
				{xtype: 'tbspacer', flex:1 } ,
				{
					text:'Logout',iconCls:'logout',
					handler: function(){
						Ext.Ajax.request({
							url: './php/Login/Logout.php',
							success: function(response){
								var json = Ext.JSON.decode(response.responseText);
								if (json.errors.reason) {
									location.href = './';
								}
							}
						});
					}
				}


			]
		},
		{
			region: 'west',
			border: false,
			split: true,
			margins: '0 0 0 5',
			width: 275,
			minWidth: 150,
			maxWidth: 400,
			xtype: 'treepanel',
			title: 'Menu',
			rootVisible: false,
			autoScroll: true,
			collapsible: true,
			animate: true,
			useArrows: true,
			itemId: 'treePanelPrincipal',
			dockedItems: [
				{
					xtype: 'toolbar',
					items: [
						{
							text: 'Expandir todos',
							iconCls: 'expand',
							handler: function(){
								this.up('#treePanelPrincipal').expandAll();
							}
						},
						{
							text: 'Contrair todos',
							iconCls: 'collapse',
							handler: function(){
								this.up('#treePanelPrincipal').collapseAll();
							}
						}
					]
				}
			],
			listeners: {
				itemclick: function(view,record,item,index,evt,options){
					if(record.get('leaf')){
						//var controller = IGExt.app.getController(record.raw['controllername']);
						//controller.init();

						var abaAberta = this.ownerCt.down('#tabCenter').items.findBy(function(aba){
							return aba.title === record.get('text');
						});

						if(!abaAberta){
							this.ownerCt.down('#tabCenter').add({
								title: record.get('text') || 'Tela do Sistema',
								closable: true,
								layout: 'fit',
								autoDestroy: true,
								items: [{
									xtype: record.raw['xtypeClass']
								}]
							}).show();
						}else{
							this.ownerCt.down('#tabCenter').setActiveTab(abaAberta);
						}
					}
				}
			},
			store: Ext.create('Ext.data.TreeStore',{
				proxy: {
					type: 'ajax',
					url: 'php/Menu/Menu.php?action=getmenu',
					noCache: false,
					actionMethods: { read: 'POST' }
				}
			})
		},
		{
			xtype: 'tabpanel',
			region: 'center',
			margins: '0 5 5 0',
			border: false,
			itemId: 'tabCenter'
		}
	]

});