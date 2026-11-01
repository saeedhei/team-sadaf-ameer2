import React, { useState } from 'react';
import { GALLERY_PROJECTS } from '../data/gardeningData';
import { GalleryProject } from '../types';
import { LightboxModal } from './LightboxModal';
import { Maximize2, MapPin } from 'lucide-react';

type FilterCategory = 'all' | 'lawns' | 'hedges' | 'makeovers' | 'pressure-washing' | 'planting';

export const ProjectGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);

  const filterTabs: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'lawns', label: 'Lawn Care' },
    { id: 'hedges', label: 'Hedges & Pruning' },
    { id: 'makeovers', label: 'Makeovers' },
    { id: 'pressure-washing', label: 'Jet Washing' },
    { id: 'planting', label: 'Planting' },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? GALLERY_PROJECTS
      : GALLERY_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#fafcf8] scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            Real Work in Greater Manchester
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4 [text-wrap:balance]">
            Our Recent Garden Projects
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Take a closer look at our standard of finish on lawns, hedges, patios, and clearances across Openshaw,
            Droylsden, Clayton, Gorton, and Manchester.
          </p>
        </div>

        {/* Functional Interactive Segmented Filter Controls */}
        <div className="flex items-center justify-center mb-12">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-200/60 rounded-xl max-w-full">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-emerald-800 ${
                  activeFilter === tab.id
                    ? 'bg-white text-emerald-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedProject(project);
                }
              }}
              aria-label={`View details for ${project.title}`}
            >
              <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />

                {/* Clean hover expand hint */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-medium mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg leading-snug line-clamp-1 text-white">
                    {project.title}
                  </h3>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Clean unboxed metadata with typographic separators */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium text-emerald-900">Click to expand</span>
                  <span>·</span>
                  <span>Turnaround: {project.completionTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
