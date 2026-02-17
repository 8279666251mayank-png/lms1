import Svix from "svix";
const { Webhook } = Svix;
import User from "../models/User.js";

export const ClerkWebhook = async (req, res) => {
  console.log("Webhook hit!");

  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const event = wh.verify(req.body,{
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
   
    console.log("event type",event.type)

    const { type, data } = event;
    console.log("data",data)

    if(type == "session.created" || type == "session.updated") {
        console.log("jgdcshkjgvhg")
        const user = data.user
      await User.findByIdAndUpdate(
        data.user_id,
        {
          email: user.email_addresses?.[0]?.email_address,
          name: `${user.first_name || ""} ${user.last_name || ""}`,
          imageUrl: user.image_url,
        },
        { upsert: true }
      );
    }

    if (type == "user.deleted"){
      await User.findByIdAndDelete(data.id);
    }

    res.status(200).send("Webhook received");

  } catch (err) {
    console.log("Webhook Error:", err.message);
    res.status(400).send("Webhook Error");
  }
};
