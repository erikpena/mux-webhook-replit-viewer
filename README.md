# Summary

If you are using Mux and are utilizing the Webhook functionality, you can confirm that the message indeed came from mux.  This example shows how to verify a webhook signature coming from Mux by comparing the signature that is sent along.

For information on how to setup Webhooks within Mux Dashboard review the docs @ https://docs.mux.com/docs/webhooks.

For information regarding the Webhooks security, take a look at the docs @ https://docs.mux.com/docs/webhook-security.

To access the Webhooks settings in Mux Dashboard, go to https://dashboard.mux.com/settings/webhooks.

## Deployment

The easiest way to validate is to deploy this onto [Repl.it](https://repl.it) and set the webhook url in Mux Dashboard.  Be sure to update the secret.

## How to use

Once you've launched your [Repl.it](https://repl.it) instance, grab the base url to your instance (the url in the Web View pane).  With this url, go to the Webhooks settings in Mux Dashboard and create a new Webhook and use the url in the following format—

```
{BASE_URL}/mux/webhook-handler
```

With your (https://repl.it) instance running, go into Mux Dashboard and _do things_ (you can find a list of Webhook events @ https://docs.mux.com/docs/webhooks#types-of-events).  In (https://repl.it), review the console to see results.

| Property | Description |
| - | - |
| `muxSigHeader` | The `Mux-Signature` HTTP request header value that was sent from Mux. |
| `payload` | The the unsigned payload that was computed based on the [docs](https://docs.mux.com/docs/webhook-security). |
| `expected` | This is the `v1` value of the signature that Mux expects the signature to be calculated as. |
| `actual` | This is the signature as it was calculated and based on the signed `payload` value. |
