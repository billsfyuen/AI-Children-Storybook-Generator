import { Request, Response } from "express";
const stripe = require('stripe')('sk_test_51PIidhDdEVvEGUkxnioFgWXwphLAPJKjUcREvNIXxjKkgHO9Ws2ei1o6Qdirx9rgytMuFAb0ki3gQr39COHji8m300dWDkK8rs');


const YOUR_DOMAIN = 'http://localhost:8080';
const endpointSecret = "whsec_b6d7a426a69b1aec08fe16ff53836d0811ca6156f9397db85b1d6a426880eec1";



export const payment = async (req: Request, res: Response) => {
    try {
        
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: 'price_1PIjLaDdEVvEGUkxColgFoyV',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success.html`,
            cancel_url: `${YOUR_DOMAIN}/cancel.html`,
            payment_intent_data: {
                metadata: {userid:"1"},
              },
        });

        res.redirect(303, session.url);
    } catch (error) {
        console.log(error);

    }

}

export const webhook = (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        //   res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            console.log("stripe id",paymentIntentSucceeded.id)
            console.log("metadata",paymentIntentSucceeded.metadata);

            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send();
}