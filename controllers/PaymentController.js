const Client = require("../models/Client");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const createCheckout = async (req, res) => {
//   try {
//     const { civilId } = req.body;
//     const client = await Client.findOne(civilId);
//     console.log("from client", client);
//     if (!client) {
//       return res.status(404).json({ message: "Client not found" });
//     }
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: "Service Payment",
//               description: `Payment for ${client.fullName}`,
//             },
//             unit_amount: 5000, // $50.00 in cents
//           },
//           quantity: 1,
//         },
//       ],
//       metadata: {
//         clientId: client._id.toString(),
//         fullName: client.fullName,
//       },
//       success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `http://localhost:3000/cancel`,
//     });

//     res.status(201).json({ url: session.url });
//   } catch (error) {
//     console.error("Payment Error:", error.message);
//     res.status(500).json({ message: "Payment failed", error: error.message });
//   }
// };
const createPaymentIntent = async (req, res) => {
  try {
    console.log("params : ", req.params);
    const clientId = req.params.id;
    const client = await Client.findById(clientId);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000, // $50.00
      currency: "usd",
      metadata: {
        clientId: client._id.toString(),
        fullName: client.fullName,
      },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Payment Intent Error:", error.message);
    res.status(500).json({ message: "Payment failed", error: error.message });
  }
};

module.exports = { createPaymentIntent };
