"use client";

import Link from "next/link";
import { useCourses } from "@/hooks/useApi";
import {Course} from "@academy/interfaces";

const CoursesPage = () => {
  const { data: courses = [], isLoading, error } = useCourses();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading courses</p>;

  return (
    <main className="shell">
      <Link className="back-link" href="/">
        Back to Academy Hub
      </Link>

      <section className="courses-header">
        <p className="eyebrow">Course catalog</p>
        <h1>Available courses</h1>
        <p className="lede">Browse the academic offerings and learning pathways.</p>
      </section>

      {courses.length > 0 ? (
        <section className="course-list" aria-label="Courses">
          {courses.map((course: Course) => (
            <article className="course-card" key={course.id}>
              <div className="course-content">
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <div className="course-meta">
                  <span>{course.credits} credits</span>
                  <span>{course.department}</span>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <h2>Course data is currently unavailable.</h2>
          <p>Check that the API gateway and course service are running.</p>
        </section>
      )}
    </main>
  );
};

export default CoursesPage;