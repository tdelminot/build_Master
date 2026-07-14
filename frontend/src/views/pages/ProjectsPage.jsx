import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
 
import ProjectViewModel from '../../viewmodels/ProjectViewModel'

import ProjectCard from '../components/ProjectCard';

const projectViewModel = new ProjectViewModel();

const ProjectsPage = observer(() => {
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    projectViewModel.loadProjects();
  }, []);

  const categories = ['all', 'résidentiel', 'hôtelier', 'commercial', 'rénovation'];
  const filteredProjects = filter === 'all' 
    ? projectViewModel.projects 
    : projectViewModel.projects.filter(p => p.category === filter);

  return (
    <div className="projects-page">
      <div className="page-header">
        <h1>Nos Réalisations</h1>
        <p>Découvrez nos projets les plus récents</p>
      </div>

      <div className="project-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat === 'all' ? 'Tous' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
});

export default ProjectsPage;