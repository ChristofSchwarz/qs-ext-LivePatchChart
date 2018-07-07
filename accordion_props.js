define([], function() {
    'use strict';
    return {
        type: 'items',
		component: 'accordion',
        items: {
			dimensions: {
				uses: "dimensions"
				,min: 0  // adjust this as needed
				//,max: 2
			},
			measures: {
				uses: "measures"
				,min: 0  // adjust this as needed
				//,max: 2
			},
			sorting: {
				uses: "sorting"
			},	  
			addons: {
				uses: "addons"
			},
			appearance: {
				uses: "settings",
				items: {
					section1: {
						type: "string",
						ref: "customprop1",
						label: "Custom Settings",
						expression: "optional",
						defaultValue: "Hello PicassoJS"
					}
				}
			},
			about: {
				component: "items",
				label: "About",
				type: "items",
				items: {
					authorText: {
						label: "by Christof Schwarz",
						component: "text"
					}
				}
			}
        }
    };
});
