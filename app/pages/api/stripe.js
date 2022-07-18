const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            shipping_options: [
                // packeta
                { shipping_rate: 'shr_1LLl4RLMo9ZkcRVKEiyM9ACd' },
                // dpd:
                { shipping_rate: 'shr_1LLkxyLMo9ZkcRVKsrm82PA7' },
                // sps:
                { shipping_rate: 'shr_1LLl01LMo9ZkcRVKO7ZgFc0u' },
                // postovy kurier:
                { shipping_rate: 'shr_1LLl0xLMo9ZkcRVKM4897HjF' },
                // slovenska posta - na postu
                { shipping_rate: 'shr_1LLl5QLMo9ZkcRVKb764wImY' },
            ],
            line_items: req.body.map((item) => {
                const img = item.image[0].asset._ref
                const newImage = img.replace('image-', 'https://cdn.sanity.io/images/osxyfyex/production/').replace('-webp', '.webp')

                return {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: item.name,
                            images: [newImage],
                        },
                        unit_amount: Math.round(item.price * 100),
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/?canceled`,
          }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}