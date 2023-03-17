import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class ServiceRequestResignationForm extends NavigationMixin(LightningElement){

    openModal = false;
    inputDisabled = true;
    @api recordId;
    empName;
    empId;
   // objectApiName = CASE_OBJECT;
    department;
    currentExp;
    noticePeriod;
    usercontactId;
    designationId;

    departmentId;
    resignationREason;
    lastworkingDate;
    reasonRealiving;
    @api contactRecord;
    @api requestType;
    @api reqSubTypeValues;

    connectedCallback() {
            this.usercontactId = this.contactRecord.Id;
            this.useraccountId = this.contactRecord.AccountId;    
    }
  
    handleCancel(){
  this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/Grid/s'
            }
        });

    }

     handleSuccess(event) {

        const even = new ShowToastEvent({
            title: 'Success!',
            message: 'Successfully created the service request!',
            variant: 'success'
        });
        this.dispatchEvent(even);
       this[NavigationMixin.Navigate]({
        type: "standard__recordPage",
        attributes: {
            objectApiName: "Account",
            actionName: "view",
            recordId:  event.detail.id
        }
        });
        this.openModal = false;
    }

    handleError(event) {
        console.log('====event.detail.detail======' + JSON.stringify(event.detail.detail));
        const evt = new ShowToastEvent({
            title: 'Error!',
            message: event.detail.detail,
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

    onSubmitHandler(event) {
        console.log(' In form ssubmit');
    event.stopPropagation();

    // This must also suppress default submit processing
    event.preventDefault();

    // Set default values of the new instance.
    let fields = event.detail.fields;
    
    fields.Type = this.requestType;
   
    fields.Request_Sub_Type__c = 'Offboarding';
    fields.Status = 'New';
    fields.Origin = 'Grid Portal';
    fields.Department__c = this.contactRecord.Department__c;
    fields.Designation__c = this.contactRecord.Resource_Role__c;
    fields.ContactId = this.contactRecord.Id;
    fields.AccountId = this.contactRecord.AccountId;
    fields.Subject = this.empId+'-'+this.contactRecord.FirstName+' '+this.contactRecord.LastName+'- Resignation Request';
   
   /* */

    // Push the updated fields though for the actual submission itself
    this.template.querySelector('lightning-record-edit-form').submit(fields);
}


}