var AWS = require('aws-sdk');
var ses = new AWS.SES();

exports.handler = (event, context, callback) => {
  var content = JSON.parse(event.Records[0].Sns.Message).content;

  content = content.replace(/^reply-to:.*\r\n/igm, '');
  content = content.replace(/^return-path:.*\r\n/igm, '');
  content = content.replace(/^DKIM-Signature: .*\r?\n(\s+.*\r?\n)*/mg, '');

  ses.sendRawEmail({
    RawMessage: {
      Data: content
    },
    Source: process.env.from_address,
    Destinations: [process.env.to_address],
  }, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
  });
}
