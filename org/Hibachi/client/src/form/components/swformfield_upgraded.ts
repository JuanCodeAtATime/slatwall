

import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { $Hibachi } from '../../core/services/hibachiservice'
import { UtilityService } from '../../core/services/utilityservice';

@Component({
    selector : 'sw-form-field-upgraded' ,
    templateUrl : '/org/Hibachi/client/src/form/components/formfield_upgraded.html'    
})
export class SwFormField implements OnInit {
   
    @Input() public labelText: string;
    @Input() public form;
    @Input() public propertyidentifier;
    @Input() public fieldType;
    @Input() public object;
    @Input() public context;
    @Input() public name: string;
    @Input() public optionsArguments;
    public selectType :string;
    public options;
    public selectedRadioFormName;
    public radioOptions;
    public selected;
    
    public fieldTypes: string[] = ['email','text','password','number','time','date','datetime','json'];
    
    constructor(
        private $hibachi: $Hibachi,
        private utilityService: UtilityService
    ) {
        
    }
    
    ngOnInit() {
   
        if(this.labelText !== undefined) {
            this.labelText = this.labelText.replace(':','');
        }
        
        if(this.fieldType === 'yesno'){
            this.yesnoStrategy();
        }        
        
        if(this.fieldType === 'select'){
            this.selectStrategy();
        }
                
    }

    public formFieldChanged = (option)=>{

        if(this.fieldType === 'yesno'){
            this.object.data[this.propertyidentifier] = option.value;
            console.log(this.form);
            this.form.controls[this.propertyidentifier].markAsDirty();// = true;
            console.log('selected'+this.object.metaData.className+this.propertyidentifier+this.selectedRadioFormName);
            this.form.controls['selected'+this.object.metaData.className+this.propertyidentifier+this.selectedRadioFormName].dirty = false;
            
//        }else if(this.fieldType == 'checkbox'){
//            this.object.data[this.propertyidentifier] = option.value;
//            this.form[this.propertyidentifier].$dirty = true;
//        }else if(this.fieldType === 'select'){
//            this.$log.debug('formfieldchanged');
//            this.$log.debug(option);
//            if(this.selectType === 'object' && typeof this.object.data[this.propertyidentifier].$$getIDName == "function" ){
//                this.object.data[this.propertyidentifier]['data'][this.object.data[this.propertyidentifier].$$getIDName()] = option.value;
//                if(angular.isDefined(this.form[this.object.data[this.propertyidentifier].$$getIDName()])){
//                    this.form[this.object.data[this.propertyidentifier].$$getIDName()].$dirty = true;
//                }
//            }else if(this.selectType === 'string' && option && option.value != null){
//
//                this.object.data[this.propertyidentifier] = option.value;
//                this.form[this.propertyidentifier].$dirty = true;
//            }
//
//            this.observerService.notify(this.object.metaData.className+this.propertyidentifier.charAt(0).toUpperCase()+this.propertyidentifier.slice(1)+'OnChange', option);
//        }else{
//            this.object.data[this.propertyidentifier] = option.value;
//
//            this.form[this.propertyidentifier].$dirty = true;
//            this.form['selected'+this.object.metaData.className+this.propertyidentifier+this.selectedRadioFormName].$dirty = false;
        }

    };    
    
    public selectStrategy = ()=>{
        //this is specific to the admin because it implies loading of options via api
        if(angular.isDefined(this.object.metaData) && angular.isDefined(this.object.metaData[this.propertyidentifier]) && angular.isDefined(this.object.metaData[this.propertyidentifier].fieldtype)){
            this.selectType = 'object';
        }else{
            this.selectType = 'string';
        }
        this.getOptions();
    }

    public getOptions = ()=>{
        if(this.options === undefined){
            
            if(!this.optionsArguments || !this.optionsArguments.hasOwnProperty('propertyidentifier')){
                this.optionsArguments={
                    'propertyIdentifier':this.propertyidentifier
                };
            }

            var optionsPromise = this.$hibachi.getPropertyDisplayOptions(this.object.metaData.className,
                this.optionsArguments
            );
            optionsPromise.then((value)=>{
                this.options = value.data;
                
                if(this.selectType === 'object'
                ){

                    if(angular.isUndefined(this.object.data[this.propertyidentifier])){
                        this.object.data[this.propertyidentifier] = this.$hibachi['new'+this.object.metaData[this.propertyidentifier].cfc]();
                    }

                    if(this.object.data[this.propertyidentifier].$$getID() === ''){
                        this.object.data['selected'+this.propertyidentifier] = this.options[0];
                        this.object.data[this.propertyidentifier] = this.$hibachi['new'+this.object.metaData[this.propertyidentifier].cfc]();
                        this.object.data[this.propertyidentifier]['data'][this.object.data[this.propertyidentifier].$$getIDName()] = this.options[0].value;
                    }else{
                        var found = false;
                        for(var i in this.options){
                            if(angular.isObject(this.options[i].value)){
                                if(this.options[i].value === this.object.data[this.propertyidentifier]){
                                    this.object.data['selected'+this.propertyidentifier] = this.options[i];
                                    this.object.data[this.propertyidentifier] = this.options[i].value;
                                    found = true;
                                    break;
                                }
                            }else{
                                if(this.options[i].value === this.object.data[this.propertyidentifier].$$getID()){
                                    this.object.data['selected'+this.propertyidentifier] = this.options[i];
                                    this.object.data[this.propertyidentifier]['data'][this.object.data[this.propertyidentifier].$$getIDName()] = this.options[i].value;
                                    found = true;
                                    break;
                                }
                            }
                            if(!found){
                                this.object.data['selected'+this.propertyidentifier] = this.options[0];
                            }
                        }

                    }
                } else if(this.selectType === 'string'){
                    if(this.object.data[this.propertyidentifier] !== null){
                        for(var i in this.options){
                            if(this.options[i].value === this.object.data[this.propertyidentifier]){
                                this.object.data['selected'+this.propertyidentifier] = this.options[i];
                                this.object.data[this.propertyidentifier] = this.options[i].value;
                                
                            }
                        }

                    } else{

                        this.object.data['selected'+this.propertyidentifier] = this.options[0];
                        this.object.data[this.propertyidentifier] = this.options[0].value;
                    }

                }

            });
        }

    }    
    
    public yesnoStrategy = ()=>{
        //format value

        this.selectedRadioFormName = this.utilityService.createID(26);
//        this.object.data[this.propertyidentifier] = (
//            this.object.data[this.propertyidentifier]
//            && this.object.data[this.propertyidentifier].length
//            && this.object.data[this.propertyidentifier].toLowerCase().trim() === 'yes'
//        ) || this.object.data[this.propertyidentifier] == 1 ? 1 : 0;

        
        this.object.data['activeFlag'] = (
            this.object.data['activeFlag']
            && this.object.data['activeFlag'].length
            && this.object.data['activeFlag'].toLowerCase().trim() === 'yes'
        ) || this.object.data['activeFlag'] == 1 ? 1 : 0;
        this.radioOptions = [
            {
                name:'Yes',
                value:1
            },
            {
                name:'No',
                value:0
            }
        ];

        if(angular.isDefined(this.object.data['activeFlag'])){

            for(var i in this.radioOptions){
                if(this.radioOptions[i].value === this.object.data['activeFlag']){
                    this.selected = this.radioOptions[i];
                    this.object.data['activeFlag'] = this.radioOptions[i].value;
                }
            }
        }else{
            this.selected = this.radioOptions[0];
            this.object.data['activeFlag'] = this.radioOptions[0].value;
        }

  
//        setTimeout(()=>{
//            this.form[this.propertyidentifier].$dirty = this.isDirty;
//        });
    }    
}