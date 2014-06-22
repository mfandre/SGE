Ext.Loader.setPath('Ext','./extjs/src');
Ext.Loader.setPath('IGExt', './app');

Ext.Loader.setConfig({
	enabled: true,
	disableCaching: true
});

Ext.require([
	'Ext.tree.*',
	'Ext.data.*',
	'Ext.tip.*',
	'Ext.chart.*',
	'Ext.Window',
	'Ext.fx.target.Sprite',
	'Ext.grid.RowNumberer',
	'Ext.selection.CheckboxModel',
	'Ext.tab.Panel',
	'Ext.toolbar.Paging',
	'Ext.toolbar.Spacer',
	'Ext.toolbar.TextItem',
	'Ext.layout.container.Fit',
	'Ext.layout.container.Border',
	'Ext.layout.container.Table',
	'IGExt.controller.menuEventoEventos',
	'IGExt.controller.menuLoteLotes',
	'IGExt.controller.menuIngressoIngressos',
	'IGExt.controller.menuGuicheEntrada',
	'IGExt.controller.menuRelatorioCompleto',
	'IGExt.controller.menuProdutoProdutos',
	'IGExt.controller.menuPrecoProdutoProdutos',
	'IGExt.controller.menuGuicheBar',
	'Ext.form.Panel',
	'Ext.form.field.*',
	'Ext.chart.*'
	]);




Ext.application({
	name: 'IGExt',
	appFolder: 'app',
	controllers: ['menuEventoEventos','menuLoteLotes','menuIngressoIngressos','menuGuicheEntrada','menuRelatorioStatusIngresso','menuRelatorioLucroIngresso','menuUsuarioUsuarios','menuVendaVendaIngresso','menuRelatorioCompleto','menuProdutoProdutos','menuPrecoProdutoProdutos','menuGuicheBar'],
	autoCreateViewport: true,
	launch: function(){
		Ext.util.CSS.swapStyleSheet("theme","extjs/resources/css/ext-all-gray.css")
		Ext.tip.QuickTipManager.init();
		IGExt.app = this;
		myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});
	}
});

