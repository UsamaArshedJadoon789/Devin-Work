import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { cn } from './lib/utils'
import { Project } from './types'
import { projects } from './data/projects'

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const categories = ['all', 'AI & ML', 'Blockchain', 'IoT', 'Management Systems', 'Real-time', 'E-commerce']

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => getProjectCategories(project).includes(selectedCategory))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Project Portfolio
          </h1>
          <button
            onClick={() => document.documentElement.classList.toggle('dark')}
            className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6 text-slate-700 dark:text-slate-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
              />
            </svg>
          </button>
        </div>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
          <TabsList className="flex flex-wrap gap-3 mb-8 p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300">
            {categories.map(category => (
              <TabsTrigger
                key={category}
                value={category}
                className={cn(
                  "px-5 py-2.5 rounded-lg transition-all duration-300 font-medium relative overflow-hidden",
                  "before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/0 before:to-indigo-600/0 before:transition-colors before:duration-300",
                  "data-[state=active]:before:from-blue-500 data-[state=active]:before:to-indigo-600",
                  "data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105",
                  "data-[state=inactive]:text-slate-700 dark:data-[state=inactive]:text-slate-300",
                  "hover:shadow-md hover:scale-105 hover:before:from-blue-500/10 hover:before:to-indigo-600/10"
                )}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
              >
                <div className="relative group">
                  <img
                    src={getProjectImage(project)}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-sm rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-slate-900 dark:text-white">Features</h4>
                      <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-slate-900 dark:text-white">Implementation</h4>
                      <div className="space-y-1 text-slate-600 dark:text-slate-400">
                        <p><span className="font-medium">Frontend:</span> {project.implementation.frontend}</p>
                        <p><span className="font-medium">Backend:</span> {project.implementation.backend}</p>
                        <p><span className="font-medium">Deployment:</span> {project.implementation.deployment}</p>
                        {project.implementation.ml && (
                          <p><span className="font-medium">ML:</span> {project.implementation.ml}</p>
                        )}
                        {project.implementation.blockchain && (
                          <p><span className="font-medium">Blockchain:</span> {project.implementation.blockchain}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 hover:scale-105"
                      >
                        Live Demo
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 hover:scale-105"
                      >
                        View Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  )
}

function getProjectCategories(project: Project): string[] {
  const categories: string[] = []
  
  if (project.implementation.ml) categories.push('AI & ML')
  if (project.implementation.blockchain) categories.push('Blockchain')
  if (project.tech.some(t => t.toLowerCase().includes('iot'))) categories.push('IoT')
  if (project.title.toLowerCase().includes('management')) categories.push('Management Systems')
  if (project.features.some(f => f.toLowerCase().includes('real-time'))) categories.push('Real-time')
  if (project.title.toLowerCase().includes('e-commerce')) categories.push('E-commerce')
  
  return categories
}

function getProjectImage(project: Project): string {
  const categories = getProjectCategories(project)
  
  if (categories.includes('AI & ML')) return '/assets/placeholders/ai.jpg'
  if (categories.includes('Blockchain')) return '/assets/placeholders/blockchain.jpg'
  if (categories.includes('IoT')) return '/assets/placeholders/iot.jpg'
  if (categories.includes('Management Systems')) return '/assets/placeholders/management.jpg'
  if (categories.includes('E-commerce')) return '/assets/placeholders/ecommerce.jpg'
  
  return '/assets/placeholders/default.jpg'
}
