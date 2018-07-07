define( ['qlik', './accordion_props'] ,
function (qlik, accordion) {
// This Qlik Sense extension can exchange a chart's main dimension with another MasterItem forth and back  	
  
	return {
		definition: accordion,
		support : {
			  snapshot: true,
			  export: true,
			  exportData : false
		},
		
		paint: function ($element) {
		
			var app = qlik.currApp(this);
			var ownId = this.options.id;  
			//'console.log('accordion', accordion);
			//console.log('app', app);
			$element.html('<button class="lui-button" data-cmd="cswExgDims' + ownId + '">Change Dims</button>')
			$element.find('button').on('qv-activate', function() {
				if ($(this).data('cmd') == ('cswExgDims' + ownId))  {

					// ApplyPatch() --> https://help.qlik.com/en-US/sense-developer/November2017/Subsystems/EngineAPI/Content/Classes/GenericObjectClass/GenericObject-class-ApplyPatches-method.htm
					// and https://extendingqlik.upper88.com/tag/applypatches/ 
				  	app.model.enigmaModel.getObject('jbQdb').then(obj => {

						//console.log('layout', obj.layout);
						var newVal = (obj.layout.qHyperCube.qDimensionInfo[0].qGroupFieldDefs[0] == 'CategoryName' ? 'aTDdm' : 'GGRrK');   
						var patch1 = {
							  qOp: 'replace',
							  qPath: '/qHyperCubeDef/qDimensions/0/qLibraryId',
							  qValue: JSON.stringify(newVal)
						};
						//console.log('patch', patch1);

						obj.applyPatches([patch1], true).then(ret => {  // true .. softpatch, not persisted
							  console.log('Done patching object property ' + patch1.qPath + ' to ' + patch1.qValue);
						}).catch(function (error) {
							  console.error('Error' + error);
						});
					});                           
				} 
			});         
			//needed for export
			return qlik.Promise.resolve();
		}
	};
});
