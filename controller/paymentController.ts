import { Request, Response } from "express";
import { PaymentService } from "../service/paymentService";

const stripe = require('stripe')('sk_test_51PIidhDdEVvEGUkxnioFgWXwphLAPJKjUcREvNIXxjKkgHO9Ws2ei1o6Qdirx9rgytMuFAb0ki3gQr39COHji8m300dWDkK8rs');


const YOUR_DOMAIN = 'http://localhost:8080';
const endpointSecret = "whsec_b6d7a426a69b1aec08fe16ff53836d0811ca6156f9397db85b1d6a426880eec1";

export class PaymentController {

    constructor(private service: PaymentService) { }

    payment = async (req: Request, res: Response) => {
        try {
            const userId = req.session.userId
            await this.service.createPayment(userId as string)
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price: 'price_1PIjLaDdEVvEGUkxColgFoyV',
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${YOUR_DOMAIN}/main/index.html`,
                cancel_url: `${YOUR_DOMAIN}/cancel.html`,
                payment_intent_data: {
                    metadata: { userId },
                },
            });

            res.redirect(303, session.url);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Interrnal Server Error" })
        }

    }

    webhook = async (req: Request, res: Response) => {
        const sig = req.headers['stripe-signature'];
        let event;

        try {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        } catch (err: any) {
            console.log(err);

            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntentSucceeded = event.data.object;
                const stripeId = paymentIntentSucceeded.id
                const userId = paymentIntentSucceeded.metadata.userId
                const result = await this.service.checkUserPayment(userId as string)
                
                if (!result[0]) {
                    await this.service.updatePayment(userId, stripeId)
                }

                break;
            // ... handle other event types
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        // Return a 200 response to acknowledge receipt of the event
    }

    checkUserPayment = async (req: Request, res: Response) => {

        try {
            const userId = req.session.userId
            const data = await this.service.checkUserPayment(userId as string)
            res.json({ data })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Interrnal Server Error" })
        }
    }
}

