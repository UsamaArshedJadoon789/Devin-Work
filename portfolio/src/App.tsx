import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { cn } from './lib/utils'
import { Project } from './types'
import { 
  allProjects,
  aiProjects,
  blockchainProjects,
  iotProjects,
  managementProjects,
  realtimeProjects,
  ecommerceProjects,
  socialProjects,
  arProjects,
  devToolsProjects,
  healthProjects,
  careerProjects,
  eventProjects,
  entertainmentProjects,
  educationProjects
} from './data/projects'

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const categories = [
    'all',
    'AI & ML',
    'Blockchain',
    'IoT',
    'Management Systems',
    'Real-time',
    'E-commerce',
    'Social Media',
    'AR/VR',
    'Dev Tools',
    'Health & Fitness',
    'Career & Jobs',
    'Event Management',
    'Entertainment',
    'Education'
  ]

  const getProjectsByCategory = (category: string): Project[] => {
    switch (category) {
      case 'AI & ML': return aiProjects
      case 'Blockchain': return blockchainProjects
      case 'IoT': return iotProjects
      case 'Management Systems': return managementProjects
      case 'Real-time': return realtimeProjects
      case 'E-commerce': return ecommerceProjects
      case 'Social Media': return socialProjects
      case 'AR/VR': return arProjects
      case 'Dev Tools': return devToolsProjects
      case 'Health & Fitness': return healthProjects
      case 'Career & Jobs': return careerProjects
      case 'Event Management': return eventProjects
      case 'Entertainment': return entertainmentProjects
      case 'Education': return educationProjects
      default: return allProjects
    }
  }

  const filteredProjects = getProjectsByCategory(selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12">
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="text-center md:text-left space-y-4">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Project Portfolio
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Explore a diverse collection of innovative projects showcasing modern technologies and real-time solutions
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => document.documentElement.classList.toggle('dark')}
              className="p-4 rounded-full bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50"
              aria-label="Toggle dark mode"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-6 h-6 text-amber-500 dark:text-amber-300"
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
        </header>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
          <TabsList className="flex flex-wrap gap-4 mb-12 p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300">
            {categories.map(category => (
              <TabsTrigger
                key={category}
                value={category}
                className={cn(
                  "px-6 py-3 rounded-xl transition-all duration-300 font-medium relative overflow-hidden",
                  "before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/0 before:to-indigo-600/0 before:transition-colors before:duration-300",
                  "data-[state=active]:before:from-blue-500 data-[state=active]:before:to-indigo-600",
                  "data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105",
                  "data-[state=inactive]:text-slate-700 dark:data-[state=inactive]:text-slate-300",
                  "hover:shadow-lg hover:scale-105 hover:before:from-blue-500/10 hover:before:to-indigo-600/10",
                  "text-base tracking-wide"
                )}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden border border-slate-200/50 dark:border-slate-700/50"
              >
                <div className="relative group">
                  <img
                    src={getProjectImage(project)}
                    alt={project.title}
                    className="w-full h-56 object-cover rounded-t-xl transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-t-xl" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex gap-4">
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                          Live Demo
                        </a>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                          View Code
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    {project.description}
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-4 py-1.5 bg-slate-100 dark:bg-slate-700/50 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">Features</h4>
                      <ul className="grid grid-cols-1 gap-2 text-slate-600 dark:text-slate-400">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">Implementation</h4>
                      <div className="grid gap-3">
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                          <span className="font-medium text-slate-700 dark:text-slate-300">Frontend: </span>
                          <span className="text-slate-600 dark:text-slate-400">{project.implementation.frontend}</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                          <span className="font-medium text-slate-700 dark:text-slate-300">Backend: </span>
                          <span className="text-slate-600 dark:text-slate-400">{project.implementation.backend}</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                          <span className="font-medium text-slate-700 dark:text-slate-300">Deployment: </span>
                          <span className="text-slate-600 dark:text-slate-400">{project.implementation.deployment}</span>
                        </div>
                        {project.implementation.ml && (
                          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                            <span className="font-medium text-slate-700 dark:text-slate-300">ML: </span>
                            <span className="text-slate-600 dark:text-slate-400">{project.implementation.ml}</span>
                          </div>
                        )}
                        {project.implementation.blockchain && (
                          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                            <span className="font-medium text-slate-700 dark:text-slate-300">Blockchain: </span>
                            <span className="text-slate-600 dark:text-slate-400">{project.implementation.blockchain}</span>
                          </div>
                        )}
                      </div>
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

function getProjectImage(project: Project): string {
  return project.imageUrl
}
