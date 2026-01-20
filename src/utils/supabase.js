//supbase.js
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
console.log("SUPABASE URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("SUPABASE ANON KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY);
// On your backend (e.g., in Supabase Functions or Node.js server)

const webPush = require("web-push");

webPush.setVapidDetails(
  "faisalfatima248@gmail.com", // Your email
  import.meta.env.VITE_PUBLIC_VAPID_KEY,          // Public VAPID Key
  import.meta.env.VITE_PRIVATE_VAPID_KEY          // Private VAPID Key
);

const pushSubscription = data[0].subscription; // Retrieved from your database

const payload = "Time to record 5 more sentences!";
webPush
  .sendNotification(pushSubscription, payload)
  .then((response) => {
    console.log("Notification sent", response);
  })
  .catch((error) => {
    console.error("Error sending notification", error);
  });
// Example of saving subscription in Supabase

const saveSubscription = async (subscription) => {
  const { data, error } = await supabase
    .from("push_subscriptions") // Create this table in your Supabase database
    .insert([{
      participantId: userId,
      subscription: subscription,
    }]);

  if (error) {
    console.error("Error saving subscription", error);
  } else {
    console.log("Subscription saved", data);
  }
};
