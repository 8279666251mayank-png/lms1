import Svix from "svix";
const { Webhook } = Svix;
import User from "../models/User.js"; // Your Mongoose model

export const ClerkWebhook = async (req, res) => {
  console.log("Webhook hit!"); // will appear in Render logs

  try {
    console.log("req.body type:", typeof req.body, Buffer.isBuffer(req.body));
    console.log("req.body length:", req.body.length);

    // Use raw body directly
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify request
    const event = wh.verify(req.body, req.headers); // DO NOT convert to string

    const { type, data } = event;
    console.log("Event type:", type);

    // Handle user created
    if (type === "user.created") {
      await User.create({
        _id: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.image_url,
      });
      console.log("User Created");
    }

    // Handle user updated
    if (type === "user.updated") {
      await User.findByIdAndUpdate(data.id, {
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.image_url,
      });
      console.log("User Updated");
    }

    // Handle user deleted
    if (type === "user.deleted") {
      await User.findByIdAndDelete(data.id);
      console.log("User Deleted");
    }

    res.status(200).send("Webhook received");
  } catch (err) {
    console.log("Webhook Error:", err.message);
    res.status(400).send("Webhook Error");
  }
};