# AWS-SES-simple-mail-forward

If you are starting a new project in AWS it is sometimes necessary to have a working email (to validate certificates from ACM for example). You can set your MX records to one of external mail hosting services but the option for custom domains is usually not free or with limited features. 

Other option is to set AWS SES Email receiving rule. 

## How to
* Make your lambda function
 * Lambda > Create Lambda Function > Blank Function > Next
 * Name it SES_Email_Forward or name of your choice
 * Runtime Node 4.3
 * Copy the code from mail_forward.js to lambda function code
 * Set environment variable fwd_address to email address that you want your emails forwarded to
 * Handler should be index.handler
 * Role: create custom role > new page will open
  * IAM Role > Create a new IAM Role
  * Role name > lambda_email_forward or enter name of your choice
  * View Policy Document > Edit
  * Copy and replace existing JSON with JSON from mail_forward_policy.json
  * Allow
 * Memory 512 MB, timeout 10s
 * Next > Create function
  
* Set up SES
 * Go to: SES > Email receiving > Rule Sets > Create rule set (or "View Active Rule Set" if you already have one in place)
 * Enter name for your rule set > "Create a Rule Set"
 * Click on your rule set > Create Rule 
 * Enter your email address or string that matches many addresses (instructions are on that page) > Add recipient email
 * Click on "Verify domain" > AWS will ask you to make changes in Route53 > Next Step
 * Add action > Select Lambda > Lambda function > select your lambda function
 * Invocation type > Event
 * SNS topic > Leave as None
 * Next step
 * Rule name "forward-email" or name of your choice
 * Next step > Create Rule > Add permissions if the popup shows up
 
