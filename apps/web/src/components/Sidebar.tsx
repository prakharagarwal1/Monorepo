"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  useStudents,
  useTeachers,
  useCourses,
  useEnrollments,
  useNotifications,
} from "@/hooks/useApi";
import { Student, Teacher, Course, Enrollment, Notification } from "@academy/interfaces";
import styles from "./Sidebar.module.css";

type NavItem = {
  href: string;
  label: string;
  count: number;
  description: string;
};

const Sidebar = () => {
  const studentsQuery = useStudents();
  const teachersQuery = useTeachers();
  const coursesQuery = useCourses();
  const enrollmentsQuery = useEnrollments();
  const notificationsQuery = useNotifications();

  const items: NavItem[] = useMemo(
    () => [
      {
        href: "/students",
        label: "Students",
        count: studentsQuery.data?.length ?? 0,
        description: "Learner directory",
      },
      {
        href: "/teachers",
        label: "Teachers",
        count: teachersQuery.data?.length ?? 0,
        description: "Faculty and staff",
      },
      {
        href: "/courses",
        label: "Courses",
        count: coursesQuery.data?.length ?? 0,
        description: "Course catalog",
      },
      {
        href: "/enrollments",
        label: "Enrollments",
        count: enrollmentsQuery.data?.length ?? 0,
        description: "Student enrollments",
      },
      {
        href: "/notifications",
        label: "Notifications",
        count: notificationsQuery.data?.length ?? 0,
        description: "Recent alerts",
      },
    ],
    [
      studentsQuery.data?.length,
      teachersQuery.data?.length,
      coursesQuery.data?.length,
      enrollmentsQuery.data?.length,
      notificationsQuery.data?.length,
    ],
  );

  const previewFor = (href: string) => {
    switch (href) {
      case "/students":
        return (studentsQuery.data ?? []).slice(0, 4) as Student[];
      case "/teachers":
        return (teachersQuery.data ?? []).slice(0, 4) as Teacher[];
      case "/courses":
        return (coursesQuery.data ?? []).slice(0, 4) as Course[];
      case "/enrollments":
        return (enrollmentsQuery.data ?? []).slice(0, 4) as Enrollment[];
      case "/notifications":
        return (notificationsQuery.data ?? []).slice(0, 4) as Notification[];
      default:
        return [];
    }
  };

  const renderPreview = (href: string) => {
    const items = previewFor(href);
    if (items.length === 0) {
      return <p className={styles.previewEmpty}>No data yet.</p>;
    }
    return (
      <ul className={styles.previewList}>
        {items.map((item) => (
          <li className={styles.previewItem} key={item.id}>
            {renderItemLabel(item)}
          </li>
        ))}
      </ul>
    );
  };

  const renderItemLabel = (item: Student | Teacher | Course | Enrollment | Notification) => {
    if ("firstName" in item) {
      return `${item.firstName} ${item.lastName}`;
    }
    if ("title" in item) {
      return item.title;
    }
    if ("subject" in item) {
      return item.subject;
    }
    if ("studentId" in item) {
      return `Student ${item.studentId} → Course ${item.courseId}`;
    }
    return "Unknown record";
  };

  return (
    <aside className={styles.sidebar}>
      <nav aria-label="Primary">
        <ul className={styles.navList}>
          <li>
            <Link href="/" className={styles.homeLink}>
              Academy Hub
            </Link>
          </li>
          {items.map((item) => (
            <li key={item.href} className={styles.navItem}>
              <Link href={item.href} className={styles.navLink}>
                <span className={styles.navLabel}>{item.label}</span>
                <span className={styles.navCount}>{item.count}</span>
              </Link>
              <div className={styles.preview}>
                {renderPreview(item.href)}
                <Link href={item.href} className={styles.viewAll}>
                  View all {item.label.toLowerCase()} →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;