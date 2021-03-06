# AWS-SES-simple-mail-forward

If you are starting a new project in AWS it is sometimes necessary to have a working email (to validate certificates from ACM for example). You can set your MX records to one of external mail hosting services but the option for custom domains is usually not free or with limited features. 

Other option is to set AWS SES Email receiving rule. 

## How to 
* Set up custom domain through Route53 (beyond the scope of this document)
* Add an MX record in Route53 to point to an AWS mailserver. Region (e.g. us-east-1) must match region used in each step below.
* Verify the email address you will be forwarding to in SES (Identity Management > Email Addresses)
* Set up SNS
  * SNS > Create topic > Enter "email-forwarding" or name of your choice for topic name
  
* Set up SES
 * SES > Email receiving > Rule Sets > Create rule set (or "View Active Rule Set" if you already have one in place)
 * Enter name for your rule set > "Create a Rule Set"
 * Click on your rule set > Create Rule 
 * Enter your email address or string that matches many addresses (instructions are on that page) > Add recipient email
 * Click on "Verify domain" > AWS will ask you to make changes in Route53 > Next Step
 * Add action > Select SNS > select your SNS topic that you created earlier
 * Encoding > UTF-8
 * Next step
 * Rule name "forward-email" or name of your choice
 * Next step > Create Rule
 
* Make your lambda function
  * Lambda > Create Lambda Function > "Author from scratch"
  * Name it SES_Email_Forward or name of your choice
  * Runtime Node 6.10
  * Role: create custom role > new page will open
    * IAM Role > Create a new IAM Role
    * Role name > lambda_email_forward or enter name of your choice
    * View Policy Document > Edit
    * Copy and replace existing JSON with JSON from mail_forward_policy.json
    * Allow
  * Create function
  * On the Configuration page for your new function:
    * Select SNS trigger (click on dashed square left of the root Lambda function tree) > select SNS
      * SNS topic > select your SNS topic that you created earlier
      * Check Enable trigger
    * Click on the root Lambda function, scroll down to Function code
      * Copy the code from mail_forward.js to lambda function code
      * Set environment variable to_address to email address that you want your emails forwarded to
      * Handler should be index.handler
  
