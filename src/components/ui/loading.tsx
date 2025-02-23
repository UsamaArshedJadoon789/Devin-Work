export const Loading = () => {
  return (
    <div className="space-y-4">
      {/* Card Loading State */}
      <div className="animate-pulse bg-secondary/50 backdrop-blur border border-white/5 rounded-xl p-8 transform-gpu">
        <div className="h-8 w-1/3 bg-white/10 rounded mb-4 animate-fade-in animate-duration-700" />
        <div className="space-y-3">
          <div className="h-4 bg-white/10 rounded w-full animate-fade-in animate-duration-700" />
          <div className="h-4 bg-white/10 rounded w-5/6 animate-fade-in animate-duration-700" />
          <div className="h-4 bg-white/10 rounded w-4/6 animate-fade-in animate-duration-700" />
        </div>
      </div>

      {/* List Item Loading State */}
      <div className="animate-pulse bg-secondary/50 backdrop-blur border border-white/5 rounded-xl p-4 transform-gpu">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 bg-white/10 rounded-full animate-fade-in animate-duration-700" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-white/10 rounded w-1/2 animate-fade-in animate-duration-700" />
            <div className="h-3 bg-white/10 rounded w-4/6 animate-fade-in animate-duration-700" />
          </div>
        </div>
      </div>

      {/* Form Input Loading State */}
      <div className="animate-pulse bg-secondary/50 backdrop-blur border border-white/5 rounded-lg p-3 transform-gpu">
        <div className="h-6 bg-white/10 rounded animate-fade-in animate-duration-700" />
      </div>
    </div>
  )
}

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-accent border-t-transparent rounded-full transform-gpu" />
    </div>
  )
}

export const LoadingDots = () => {
  return (
    <div className="flex items-center space-x-1">
      <div className="w-2 h-2 bg-accent rounded-full animate-bounce transform-gpu" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-accent rounded-full animate-bounce transform-gpu" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-accent rounded-full animate-bounce transform-gpu" style={{ animationDelay: '300ms' }} />
    </div>
  )
}
