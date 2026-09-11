"use client";

import Link from "next/link";
import { useStudents } from "@/hooks/useApi";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  enrolledAt: string;
  status: "active" | "inactive";
}

const StudentsPage = () => {
  const { data: students = [], isLoading, error } = useStudents();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading students</p>;

  return (
    <main className="shell">
      <Link className="back-link" href="/">
        Back to Academy Hub
      </Link>

      <section className="students-header">
        <p className="eyebrow">Student directory</p>
        <h1>People learning with us.</h1>
        <p className="lede">A live view of learner records exposed through the API gateway.</p>
      </section>

      {students.length > 0 ? (
        <section className="student-list" aria-label="Students">
          {students.map((student: Student) => (
            <article className="student-card" key={student.id}>
              <div className="student-avatar" aria-hidden="true">
                {student.firstName.charAt(0)}
                {student.lastName.charAt(0)}
              </div>
              <div>
                <h2>
                  {student.firstName} {student.lastName}
                </h2>
                <a href={`mailto:${student.email}`}>{student.email}</a>
                <p>Enrolled {new Date(student.enrolledAt).toLocaleDateString()}</p>
              </div>
              <span className={`status ${student.status}`}>{student.status}</span>
            </article>
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <h2>Students are currently unavailable.</h2>
          <p>Check that the API gateway and student service are running.</p>
        </section>
      )}
    </main>
  );
};

export default StudentsPage;
