import Svix from "svix";
const { Webhook } = Svix;
import User from "../models/User.js";

export const ClerkWebhook = async (req, res) => {
  console.log("Webhook hit!");

  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const event = wh.verify(req.body, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
   
    console.log("event",event)
    console.log("event type",event.type)

    const { type, data } = event;


    if (type === "user.created" || type === "user.updated") {
      await User.findByIdAndUpdate(
        data.id,
        {
          email: data.email_addresses?.[0]?.email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`,
          imageUrl: data.image_url,
        },
        { upsert: true }
      );
    }

    if (type === "user.deleted") {
      await User.findByIdAndDelete(data.id);
    }

    res.status(200).send("Webhook received");

  } catch (err) {
    console.log("Webhook Error:", err.message);
    res.status(400).send("Webhook Error");
  }
};
