import { LightningElement ,track} from 'lwc';
//import testjs from './nestedNavigation';
 import { loadScript } from 'lightning/platformResourceLoader';
// import ConnectJs  from '@salesforce/resourceUrl/nestedNavigation';
import {test} from 'c/nestedNavigation';
// import jQuery from '@salesforce/resourceUrl/JQuery';
// import OrgChartTest from '@salesforce/resourceUrl/OrgChartJsType';

export default class NestedNavigationTree extends LightningElement {
   // spring20Logo = asme_img + '/images/1.png';
    connectedNodes = [{
        to:'1-B', from:'1-B1'
    }];
    @track items = [
        {
            label: 'Feeder Position',
            Id:'1-A',
            name: 'Equipment Inspector',
            expanded: true,
            items: [
                {
                    label: 'Intermediate Level',
                    name: 'Quality Engineer',
                    expanded: true,
                    Id:'1-B',
                    items: [
                        {
                            label: 'Advance Level',
                            name: 'Site Manager',
                            expanded: true,
                            Id:'1-BA',
                            items: [
                                {
                                    label: 'Assistant Manager 1',
                                    name: 'CTO-ASM-1',
                                    expanded: true,
                                    Id:'',
                                    items: [
                                        {
                                            label: 'Supervisor 1',
                                            name: 'CTO-MGR-1-ASM-1-SUP-1',
                                            expanded: true,
                                            Id:'',
                                            items: [
                                                {
                                                    label: 'Staff 1',
                                                    name:
                                                        'CTO-MGR-1-ASM-1-SUP-1-STA-1',
                                                },
                                                {
                                                    label: 'Staff 2',
                                                    name:
                                                        'CTO-MGR-1-ASM-1-SUP-1-STA-2',
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Assistant Manager 2',
                                    name: 'CTO-ASM-2',
                                    Id:'',
                                    expanded: true,
                                    items: [
                                        {
                                            label: 'Supervisor 1',
                                            name: 'CTO-MGR-1-ASM-2-SUP-1',
                                            expanded: true,
                                            Id:'',
                                            items: [
                                                {
                                                    label: 'Staff 1',
                                                    name:
                                                        'CTO-MGR-1-ASM-2-SUP-1-STA-1',
                                                },
                                                {
                                                    label: 'Staff 2',
                                                    name:
                                                        'CTO-MGR-1-ASM-2-SUP-1-STA-2',
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            label: 'Advance Level',
                            name: 'Project Manager',
                            Id:'1-BB',
                            expanded: true,
                            items: [],
                        },
                    ],
                },
                {
                    label: 'Intermediate Level',
                    name: 'Inter-Desciplinary Engineer',
                    expanded: true,  
                    Id:'1-B1',
                    items: [
                        {
                            label: 'Advance Level',
                            name: 'Assistant Manager',
                            expanded: true,
                            Id:'1-B1A',
                            items: [],
                        },
                    ],
                }
            ],
        },
        // {
        //     label: 'CFO',
        //     name: 'CFO',
        //     Id:'',
        //     expanded: false,
        //     items: [
        //         {
        //             label: 'Director',
        //             name: 'CFO-DIR',
        //             Id:'',
        //             expanded: false,
        //             items: [
        //                 {
        //                     label: 'Manager 1',
        //                     name: 'CFO-MGR-1',
        //                     Id:'',
        //                     expanded: false,
        //                     items: [
        //                         {
        //                             label: 'Assistant Manager 1',
        //                             name: 'CFO-ASM-1',
        //                         },
        //                     ],
        //                 },
        //                 {
        //                     label: 'Manager 2',
        //                     name: 'CFO-MGR-2',
        //                 },
        //             ],
        //         },
        //         {
        //             label: 'Director',
        //             name: 'CFO-DIR 2',
        //             Id:'',
        //             expanded: false
        //         }
        //     ],
        // },
    ];

    renderedCallback() {
        
        var div1 = this.template.querySelector(`[data-id="1-B"]`);
        var div2 = this.template.querySelector(`[data-id="1-B1"]`);
        var line = this.template.querySelector(`[data-id="line"]`);
        console.log('calling:  '+div2);
        //test(div1,div2,line);
        
    }
    
}