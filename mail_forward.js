var AWS = require('aws-sdk');
var ses = new AWS.SES();

exports.handler = (event, context, callback) => {
    ses.sendRawEmail({
      RawMessage: {
        Data: JSON.parse(event.Records[0].Sns.Message).content
      },
      Destinations: [process.env.fwd_address],
    }, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
    });
}