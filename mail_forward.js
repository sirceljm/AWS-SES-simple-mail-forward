
var AWS = require("aws-sdk");
var ses = new AWS.SES();

exports.handler = (event, context, callback) => {
    let data = JSON.parse(event.Records[0].Sns.Message);
    let source = data.content;

    source = source.replace(/^DKIM-Signature/im, "X-Original-DKIM-Signature");
    source = source.replace(/^From/im, "X-Original-From");
    source = source.replace(/^Source/im, "X-Original-Source");
    source = source.replace(/^Sender/im, "X-Original-Sender");
    source = source.replace(/^Return-Path/im, "X-Original-Return-Path");
    source = source.replace(/^Domainkey-Signature/im, "X-Original-Domainkey-Signature");
    source = `From: AWS SES Mail Forwarding <${data.mail.destination}>\n` + source;

    if(!process.env.to_address) {
        console.log("You need to supply to_address enviromnent variable");
    } else if(data.mail.destination == process.env.to_address) {
        console.log("MAIL SEND ABORTED! - Forwarded mail address and to_address are the same - THIS CAN CAUSE AN INFINITE LOOP!");
    } else {
        ses.sendRawEmail({
            RawMessage: {
                Data: source,
            },
            Destinations: [process.env.to_address],
        }, function (err, data) {
            if (err) {
                console.error(err, err.stack);
            }
        });
    }
};
