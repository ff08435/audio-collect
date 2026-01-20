import { supabase } from './supabase'; // Ensure you import your supabase client

// Request notification permission from the user
export async function requestNotificationPermission() {
  if (!("Notification" in window)) return false;

  const permission = await Notification.requestPermission();
  return permission === "granted";
}

// Save subscription to Supabase
const saveSubscription = async (userId, subscription) => {
  const { data, error } = await supabase
    .from('push_subscriptions')
    .insert([
      {
        participant_id: userId,  // Store userId in Supabase
        subscription: subscription,  // Store subscription object in Supabase
      }
    ]);

  if (error) {
    console.error("Error saving subscription:", error);
  } else {
    console.log("Subscription saved:", data);
  }
};

// Subscribe the user to push notifications
export const subscribeUserToPush = async (userId) => {
  // Log the userId for debugging
  console.log("User ID for subscription:", userId);

  if (!userId) {
    console.error("No userId provided, cannot subscribe to push notifications");
    return;
  }

  // Ensure service worker is ready
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: import.meta.env.VITE_PUBLIC_VAPID_KEY  // Your VAPID key from environment variables
  });

  // Log the subscription for debugging
  console.log("User subscribed:", subscription);

  // Save the subscription to Supabase
  await saveSubscription(userId, subscription);
  
  // If needed, you can now send this subscription to your backend (Supabase) to store and use for sending notifications.
};
