import React from "react";

const CurrentProjects = () => {
  return (
    <section id="current-projects" className="py-16 bg-gray-50 dark:bg-dark-2">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-3xl font-bold text-dark dark:text-white text-center">Current Projects</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Example projects, replace with real data */}
          <a href="https://youthnotion.github.io/TERRA/" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white dark:bg-dark-3 p-6 shadow-md text-left transition hover:shadow-lg focus:outline-none block">
            <h3 className="mb-2 text-xl font-semibold text-dark dark:text-white">Project Terra</h3>
            <p className="text-gray-700 dark:text-gray-300">TRACKING AND ENVIRONMENTAL REAL-TIME RESPONSE APPARATUS</p>
          </a>
          <a href="https://youthnotion.github.io/sunagorik" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white dark:bg-dark-3 p-6 shadow-md text-left transition hover:shadow-lg focus:outline-none block">
            <h3 className="mb-2 text-xl font-semibold text-dark dark:text-white">Sunagorik</h3>
            <p className="text-gray-700 dark:text-gray-300">Promoting civic awareness and community engagement among youth.</p>
          </a>
          <button className="rounded-lg bg-white dark:bg-dark-3 p-6 shadow-md text-left transition hover:shadow-lg focus:outline-none" type="button">
            <h3 className="mb-2 text-xl font-semibold text-dark dark:text-white">Tech4Youth</h3>
            <p className="text-gray-700 dark:text-gray-300">Integrating technology for youth development and innovation.</p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CurrentProjects;
