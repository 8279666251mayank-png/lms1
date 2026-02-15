import Clerk from "@clerk/clerk-sdk-node";
import User from "../models/User.js";

//Initialize Clerk SDK with your secret key
const clerk = new Clerk({ apiKey: process.env.CLERK_SECRET_KEY });

export const syncUsers = async () => {
  try {
    console.log("Fetching users from Clerk...");

    // Get all users from Clerk
    const users = await clerk.users.getUserList({ limit: 1000 });
    console.log(`Fetched ${users.length} users`);

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

    console.log("Users created/updated ✅");

    //  Delete users in DB who are no longer in Clerk
    const clerkUserIds = users.map((u) => u.id); // IDs of current Clerk users
    const dbUsers = await User.find(); // all users in MongoDB

    for (const dbUser of dbUsers) {
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
