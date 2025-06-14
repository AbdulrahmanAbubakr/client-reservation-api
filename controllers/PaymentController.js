const Client = require("../models/Client");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckout = async (req, res) => {
  try {
    const client = await Client.create(req.body);

    const session = await stripe.checkout.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Service Payment",
              description: `Payment for ${client.fullName}`,
            },
            unit_amount: 5000, // $50.00 in cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        clientId: client._id.toString(),
        fullName: client.fullName,
      },
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/cancel`,
    });

    res.status(201).json({ url: session.url });
  } catch (error) {
    console.error("Payment Error:", error.message);
    res.status(500).json({ message: "Payment failed", error: error.message });
  }
};

module.exports = { createCheckout };
