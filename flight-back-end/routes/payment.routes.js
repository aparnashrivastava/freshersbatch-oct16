const braintree = require('braintree');

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  // Use your own credentials from the sandbox Control Panel here
  merchantId: "cpcs9yjycydjw3cz",
  publicKey: "4k2xgybxp7wdpt5s",
  privateKey: "5f342065fcaa01616c89c43e1daaea23"
});

module.exports = function(app) {
  app.get('/braintree', function(req, res) {
    res.send('Braintree route is healthy');
  });

  app.get('/api/braintree/v1/getToken', async function(req, res) {
    try {
      gateway.clientToken.generate({}, function(err, response) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(response);
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.post('/api/braintree/v1/sandbox', async function(req, res) {
    try {
      // Use the payment method nonce here
      var nonceFromTheClient = req.body.paymentMethodNonce;
      // Create a new transaction for $10
      var newTransaction = gateway.transaction.sale(
        {
          amount: '10.00',
          paymentMethodNonce: nonceFromTheClient,
          options: {
            // This option requests the funds from the transaction once it has been
            // authorized successfully
            submitForSettlement: true
          }
        },
        function(error, result) {
          if (result) {
            res.send(result);
          } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (err) {
      // Deal with an error
      console.log(err);
      res.send(err);
    }
  });
};