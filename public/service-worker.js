// public/service-worker.js

self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "You have a new message.",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
  };

  event.waitUntil(
    self.registration.showNotification("Burushaski Audio Collector", options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  // Open the app when the notification is clicked
  event.waitUntil(clients.openWindow("/"));
});
