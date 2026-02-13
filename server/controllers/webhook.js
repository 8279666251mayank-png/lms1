import Svix from "svix";
const { Webhook } = Svix;

import User from "../models/User.js";

export const ClerkWebhook = async (req, res) => {
    console.log("webclearkmayank")
  try {
    //  Create webhook verifier
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    //  Verify request (security check)
    const payload = webhook.verify(req.body.toString(), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    //  Get event type and data
    const { type, data } = JSON.parse(req.body.toString());
    console.log("type",type);


    //  If new user created
    if (type === "user.created") {
      await User.create({
        _id: data.id,
        email: data.email_addresses[0].email_address,
        name: data.first_name + " " + data.last_name,
        imageUrl: data.image_url,
      });

      console.log("User Created");
    }

    //  If user updated
    if (type === "user.updated") {
      await User.findByIdAndUpdate(data.id, {
        email: data.email_addresses[0].email_address,
        name: data.first_name + " " + data.last_name,
        imageUrl: data.image_url,
      });

      console.log("User Updated");
    }

    // If user deleted
    if (type === "user.deleted") {
      await User.findByIdAndDelete(data.id);
      console.log("User Deleted");
    }

    res.status(200).send("Webhook received");

  } catch (error) {
    console.log("Error:", error.message);
    res.status(400).send("Webhook Error");
  }
};


