import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { cn } from './lib/utils'
import { Project } from './types'
import { allProjects } from './data/todo'

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
    if (category === 'all') return allProjects
    return allProjects.filter((project: Project) => {
      const title = project.title.toLowerCase()
      const desc = project.description.toLowerCase()
      const tech = project.tech.join(' ').toLowerCase()
      const text = `${title} ${desc} ${tech}`
      
      switch(category) {
        case 'AI & ML': return text.includes('ai') || text.includes('ml') || text.includes('intelligence') || text.includes('recognition') || text.includes('chat') || text.includes('tensorflow') || text.includes('pytorch')
        case 'Blockchain': return text.includes('blockchain') || text.includes('crypto') || text.includes('smart contract') || text.includes('ethereum') || text.includes('web3')
        case 'IoT': return text.includes('iot') || text.includes('smart') || text.includes('device') || text.includes('sensor')
        case 'Management Systems': return text.includes('management system') || text.includes('management platform') || text.includes('tracking system') || text.includes('inventory') || text.includes('hrms') || text.includes('asset management')
        case 'Real-time': return text.includes('real-time') || text.includes('live') || text.includes('streaming') || text.includes('socket.io') || text.includes('websocket')
        case 'E-commerce': return text.includes('ecommerce') || text.includes('shop') || text.includes('store') || text.includes('marketplace') || text.includes('payment')
        case 'Social Media': return text.includes('social') || text.includes('community') || text.includes('chat') || text.includes('sharing')
        case 'AR/VR': return text.includes('ar') || text.includes('vr') || text.includes('reality') || text.includes('navigation') || text.includes('arkit')
        case 'Dev Tools': return text.includes('ide') || text.includes('development') || text.includes('cloud') || text.includes('code')
        case 'Health & Fitness': return text.includes('health') || text.includes('fitness') || text.includes('medical') || text.includes('workout')
        case 'Career & Jobs': return text.includes('job') || text.includes('career') || text.includes('recruitment') || text.includes('hr')
        case 'Event Management': return text.includes('event') || text.includes('scheduling') || text.includes('booking')
        case 'Entertainment': return text.includes('music') || text.includes('stream') || text.includes('media') || text.includes('video')
        case 'Education': return text.includes('learning') || text.includes('classroom') || text.includes('education') || text.includes('course')
        default: return true
      }
    })
  }

  const filteredProjects = getProjectsByCategory(selectedCategory)

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-900 dark:via-blue-900/10 dark:to-slate-800 transition-colors duration-500">
      <div className="container mx-auto px-4 py-12">
        <header className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 p-8 bg-gradient-to-br from-white/95 via-slate-50/95 to-white/95 dark:from-slate-800/95 dark:via-slate-900/95 dark:to-slate-800/95 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl">
          <div className="text-center md:text-left space-y-5">
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-400 animate-gradient-x">
              Project Portfolio
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl font-medium">
              Explore a diverse collection of innovative projects showcasing modern technologies and real-time solutions
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => document.documentElement.classList.toggle('dark')}
              className="p-4 rounded-full bg-gradient-to-br from-white/95 to-slate-50/95 dark:from-slate-800/95 dark:to-slate-900/95 hover:from-white hover:to-white dark:hover:from-slate-700 dark:hover:to-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 group"
              aria-label="Toggle dark mode"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-6 h-6 text-amber-500 dark:text-amber-300 transform transition-transform duration-500 rotate-0 dark:rotate-180 group-hover:scale-110"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                  className="transform transition-all duration-500 origin-center"
                />
              </svg>
            </button>
          </div>
        </header>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
          <TabsList className="flex flex-wrap gap-4 mb-12 p-6 bg-gradient-to-br from-white/95 to-slate-50/95 dark:from-slate-800/95 dark:to-slate-900/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:shadow-2xl hover:from-white hover:to-slate-50 dark:hover:from-slate-800 dark:hover:to-slate-900">
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
                className="bg-gradient-to-br from-white/95 via-slate-50/95 to-white/95 dark:from-slate-800/95 dark:via-slate-900/95 dark:to-slate-800/95 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group overflow-hidden border border-slate-200/50 dark:border-slate-700/50 relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/0 before:to-indigo-600/0 before:transition-all before:duration-500 hover:before:from-blue-500/5 hover:before:to-indigo-600/5"
              >
                <div className="relative group">
                  <img
                    src={getProjectImage(project)}
                    alt={project.title}
                    className="w-full h-56 object-cover rounded-t-xl transition-all duration-500 group-hover:scale-105 group-hover:brightness-105 group-hover:saturate-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-t-xl backdrop-blur-sm group-hover:backdrop-blur-[1px]" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 scale-95 group-hover:scale-100">
                      <div className="flex gap-4 backdrop-blur-sm bg-black/20 p-3 rounded-xl">
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2.5 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105 font-medium ring-1 ring-white/20 hover:ring-white/30 backdrop-blur-sm"
                        >
                          Live Demo
                        </a>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2.5 bg-gradient-to-r from-slate-800 via-slate-900 to-black hover:from-slate-900 hover:via-black hover:to-black text-white rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105 font-medium backdrop-blur-sm ring-1 ring-white/20 hover:ring-white/30"
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
                            className="px-4 py-1.5 bg-gradient-to-r from-slate-100 via-white to-slate-50 dark:from-slate-700/50 dark:via-slate-800/50 dark:to-slate-700/50 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 hover:from-blue-50 hover:via-indigo-50/50 hover:to-blue-50 dark:hover:from-blue-900/20 dark:hover:via-indigo-900/20 dark:hover:to-blue-900/20 transition-all duration-500 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm hover:backdrop-blur-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">Features</h4>
                      <ul className="grid grid-cols-1 gap-2.5 text-slate-600 dark:text-slate-400">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-3 bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-slate-800/30 dark:via-slate-700/30 dark:to-slate-800/30 rounded-lg py-2.5 px-4 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-500 hover:from-blue-50 hover:via-indigo-50/50 hover:to-blue-50 dark:hover:from-blue-900/10 dark:hover:via-indigo-900/10 dark:hover:to-blue-900/10 hover:-translate-y-0.5 group">
                            <svg className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0 transition-transform duration-500 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">Implementation</h4>
                      <div className="grid gap-3">
                        <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-slate-800/30 dark:via-slate-700/30 dark:to-slate-800/30 rounded-lg p-4 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-500 hover:from-blue-50 hover:via-indigo-50/50 hover:to-blue-50 dark:hover:from-blue-900/10 dark:hover:via-indigo-900/10 dark:hover:to-blue-900/10 hover:-translate-y-0.5 group">
                          <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Frontend: </span>
                          <span className="text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">{project.implementation.frontend}</span>
                        </div>
                        <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-slate-800/30 dark:via-slate-700/30 dark:to-slate-800/30 rounded-lg p-4 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-500 hover:from-blue-50 hover:via-indigo-50/50 hover:to-blue-50 dark:hover:from-blue-900/10 dark:hover:via-indigo-900/10 dark:hover:to-blue-900/10 hover:-translate-y-0.5 group">
                          <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Backend: </span>
                          <span className="text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">{project.implementation.backend}</span>
                        </div>
                        <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-slate-800/30 dark:via-slate-700/30 dark:to-slate-800/30 rounded-lg p-4 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-500 hover:from-blue-50 hover:via-indigo-50/50 hover:to-blue-50 dark:hover:from-blue-900/10 dark:hover:via-indigo-900/10 dark:hover:to-blue-900/10 hover:-translate-y-0.5 group">
                          <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Deployment: </span>
                          <span className="text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">{project.implementation.deployment}</span>
                        </div>
                        {project.implementation.ml && (
                          <div className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-700/50 dark:to-slate-800/50 rounded-lg p-3.5 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-300">
                            <span className="font-medium text-slate-700 dark:text-slate-300">ML: </span>
                            <span className="text-slate-600 dark:text-slate-400">{project.implementation.ml}</span>
                          </div>
                        )}
                        {project.implementation.blockchain && (
                          <div className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-700/50 dark:to-slate-800/50 rounded-lg p-3.5 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-300">
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
  return project.imageUrl || `/images/${project.title.toLowerCase().replace(/ /g, '-')}.png`
}

// Initialize dark mode from localStorage
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}
