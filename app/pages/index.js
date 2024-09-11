import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="My personal portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          <ul>
            <li><a href="#about">About Me</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="about">
          <h1>Welcome to My Portfolio</h1>
          <p>Hello! I'm [Your Name], a web developer...</p>
        </section>
        <section id="projects">
          <h2>Projects</h2>
          {/* Project cards or links here */}
        </section>
        <section id="contact">
          <h2>Contact</h2>
          {/* Contact form or email link here */}
        </section>
      </main>
    </div>
  );
}
