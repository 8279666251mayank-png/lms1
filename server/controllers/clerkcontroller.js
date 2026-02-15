import User from "../models/User.js";
import { clerkClient } from "@clerk/clerk-sdk-node";

export const syncUsers = async () => {
  try {
    if (!process.env.CLERK_SECRET_KEY) {
      console.log(" Secret key missing in .env");
      return;
    }

    console.log(" Checking Clerk Secret Key...");

    const users = await clerkClient.users.getUserList({
      limit: 1,
    });

    console.log("Secret Key is VALID");
    console.log("user",users)

    //  Create or update users in MongoDB
    for (const u of users) {
      await User.findByIdAndUpdate(
        u.id,
        {
          email: u.emailAddresses[0].emailAddress,
          name: u.firstName + " " + u.lastName,
          imageUrl: u.imageUrl,
        },
        { upsert: true } // create if not exists
      );
    }

    console.log("Users created/updated");

    //  Delete users in DB who are no longer in Clerk
    const clerkUserIds = users.map((u) => u.id); // IDs of current Clerk users
    const dbUsers = await User.find(); // all users in MongoDB
   

    for (const dbUser of dbUsers){
      if (!clerkUserIds.includes(dbUser._id)) {
        await User.findByIdAndDelete(dbUser._id);
        console.log(`Deleted user: ${dbUser.name} (${dbUser._id})`);
      }
    }

    console.log("Users deleted if removed from Clerk ✅");

  } catch (err) {
    console.error("Error syncing users:", err.message);
  }
};
