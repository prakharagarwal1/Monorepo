"use client";

import Link from "next/link";
import { useTeachers } from "@/hooks/useApi";

interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  status: "active" | "inactive";
}

const TeachersPage = () => {
  const { data: teachers = [], isLoading, error } = useTeachers();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading teachers</p>;

  return (
    <main className="shell">
      <Link className="back-link" href="/">
        Back to Academy Hub
      </Link>

      <section className="teachers-header">
        <p className="eyebrow">Teacher directory</p>
        <h1>Faculty and staff</h1>
        <p className="lede">A directory of academic and administrative personnel.</p>
      </section>

      {teachers.length > 0 ? (
        <section className="teacher-list" aria-label="Teachers">
          {teachers.map((teacher: Teacher) => (
            <article className="teacher-card" key={teacher.id}>
              <div className="teacher-avatar" aria-hidden="true">
                {teacher.firstName.charAt(0)}
                {teacher.lastName.charAt(0)}
              </div>
              <div>
                <h2>
                  {teacher.firstName} {teacher.lastName}
                </h2>
                <a href={`mailto:${teacher.email}`}>{teacher.email}</a>
                <p>Department: {teacher.department}</p>
              </div>
              <span className={`status ${teacher.status}`}>{teacher.status}</span>
            </article>
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <h2>Teacher data is currently unavailable.</h2>
          <p>Check that the API gateway and teacher service are running.</p>
        </section>
      )}
    </main>
  );
};

export default TeachersPage;