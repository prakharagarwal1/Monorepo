import Link from "next/link";

const HomePage = () => {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Academy Hub</p>
        <h1>One workspace for every part of your academy.</h1>
        <p className="lede">
          Manage students, teachers, courses, enrollments, and notifications through a reliable
          API gateway built with Turborepo, Next.js, and NestJS.
        </p>
        <div className="actions">
          <Link className="button primary" href="/students">
            Explore students
          </Link>
          <a className="button secondary" href="/api/health">
            Check gateway health
          </a>
        </div>
      </section>

      <section className="metrics" aria-label="Platform overview">
        <Metric label="Students" value="Grow with confidence" tone="blue" />
        <Metric label="Teachers" value="Teach with context" tone="purple" />
        <Metric label="Courses" value="Structure every journey" tone="amber" />
        <Metric label="Enrollments" value="Connect people to learning" tone="green" />
      </section>

      <section className="services">
        <div>
          <p className="eyebrow">Modular by design</p>
          <h2>Services that work together.</h2>
        </div>
        <div className="service-grid">
          <ServiceCard name="API Gateway" detail="Routes every request through one consistent entry point." />
          <ServiceCard name="Students" detail="Profiles and lifecycle data for every learner." />
          <ServiceCard name="Teachers" detail="Faculty records, expertise, and availability." />
          <ServiceCard name="Courses" detail="Catalog content and learning pathways." />
          <ServiceCard name="Enrollments" detail="Tracks the connection between learners and courses." />
          <ServiceCard name="Notifications" detail="Keeps every stakeholder informed." />
        </div>
      </section>
    </main>
  );
}

const Metric = ({ label, value, tone }: { label: string; value: string; tone: string }) => {
  return (
    <article className={`metric ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

const ServiceCard = ({ name, detail }: { name: string; detail: string }) => {
  return (
    <article className="service-card">
      <h3>{name}</h3>
      <p>{detail}</p>
    </article>
  );
}

export default HomePage;
