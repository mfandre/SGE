Ext.define('IGExt.controller.menuGuicheEntrada', {
	extend: 'Ext.app.Controller',
	views: [
		'Guiche.Entrada'
	],
	models: ['Ingresso'],
	stores: ['Ingressos'],
	refs: [ 
		{
			ref: 'Entrada',
			selector: 'Entrada'
		}
	],	
	init: function(){
		this.control({
			'Entrada' : {
				'mySubmitEvent': this.check
			},

			'Entrada button[action=check]' : {
				click: this.check
			},
		});
	},
	check: function(btn){
		var form = btn.up('form').getForm();
		var textFieldCodigo = btn.up('form').down('#fieldCodIng');
		var textFieldUltCodIng = btn.up('form').down('#fieldUltCodIng');

		var panelValidacao = btn.up('form').up('panel').down('#panelValidacao');

		if(form.isValid()){
			form.submit({
				method: 'POST',
				waitTitle: 'Verificando ingresso na base de dados...',
				waitMsg: 'Verificando informações...',
				success: function(){
					textFieldUltCodIng.setValue(textFieldCodigo.getValue());
					textFieldCodigo.setValue("");
					panelValidacao.setBodyStyle('backgroundColor','green');
					textFieldCodigo.focus();
					panelValidacao.update("<h2 class='clsLabelEntradaIngresso'>Liberado</h2>");
				},
				failure: function(form,action){
					if(action.failureType == 'server'){
						obj = Ext.decode(action.response.responseText);
						panelValidacao.update("<h2 class='clsLabelEntradaIngresso'>"+obj.errors.reason+"</h2>");
						textFieldUltCodIng.setValue(textFieldCodigo.getValue());
						textFieldCodigo.setValue('');
						textFieldCodigo.focus();
					}else{
						Ext.Msg.alert('Atenção','Não foi possível verificar. Tente novamente',function(){textFieldCodigo.focus();});
					}
					textFieldCodigo.setValue('');
					panelValidacao.setBodyStyle('backgroundColor','red');
					
					textFieldCodigo.focus();
				}
			});
		}


		// btn.up('form').down('#fieldUltIngresso').setValue('aaaa');
		// var store = this.getEntrada().store;
		// store.findBy(function(record, id){
		// 	if(record.get('codigo') === '89'){
		// 		alert('achouuuuuuu');
		// 		return true;  // a record with this data exists
		// 	}
		// 	return false;  // there is no record in the store with this data
		// });
		// this.getEntrada().store.sync();
	}
});