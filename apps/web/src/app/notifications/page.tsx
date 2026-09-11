"use client";

import Link from "next/link";
import { useNotifications } from "@/hooks/useApi";
import { Notification } from "@academy/interfaces";


const NotificationsPage = () => {
  const { data: notifications = [], isLoading, error } = useNotifications();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading notifications</p>;

  return (
    <main className="shell">
      <Link className="back-link" href="/">
        Back to Academy Hub
      </Link>

      <section className="notifications-header">
        <p className="eyebrow">Notifications</p>
        <h1>Recent updates and alerts</h1>
        <p className="lede">Stay informed about important events and deadlines.</p>
      </section>

      {notifications.length > 0 ? (
        <section className="notification-list" aria-label="Notifications">
          {notifications.map((notification:Notification) => (
            <article className="notification-card" key={notification.id}>
              <div className="notification-content">
                <h2>{notification.subject}</h2>
                <p>{notification.message}</p>
                <time dateTime={notification.createdAt}>
                  {new Date(notification.createdAt).toLocaleString()}
                </time>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <h2>No notifications at the moment.</h2>
          <p>Check that the API gateway and notification service are running.</p>
        </section>
      )}
    </main>
  );
};

export default NotificationsPage;