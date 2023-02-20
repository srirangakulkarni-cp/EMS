/**
    * @author Mukesh Rawat
    * @date 30/01/2023
    * @description  ConvertButton to Change the Status Approved to Converted on Onboarding Records 
    *
    *               Test code coverage provided by the following test class:
    *               - CP_ConvertButtonOnOnboardingTest
    *
    * CHANGE HISTORY
    * ====================================================================================================
    * DATE          NAME                    DESCRIPTION
    * N/A           N/A                     N/A
    * ====================================================================================================
    **/
public without sharing class CP_ConvertButtonOnOnboarding {
    @AuraEnabled
    public static void ConvertButton(String recordId){
        List<Contact>conlist=new List<Contact>();
        EMS_EM_Onboarding_Request__c onlist =[Select Id,
                                              Name,
                                              Status__c
                                              from EMS_EM_Onboarding_Request__c
                                              where Id=:recordId ];
        
        EMS_EM_Onboarding_Request__c onboard =new EMS_EM_Onboarding_Request__c();
        onboard.Id=recordId;
        onboard.Status__c='Converted';
        update onboard;         
    }
}