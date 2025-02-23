import { Input } from "./input"
import { Textarea } from "./textarea"
import { Button } from "./button"

export const FormInput = ({ ...props }) => (
  <Input 
    className="w-full bg-secondary/50 backdrop-blur border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 transition-all duration-300 focus:ring-2 focus:ring-accent/50 hover:border-accent/50 transform-gpu"
    {...props}
  />
)

export const FormTextarea = ({ ...props }) => (
  <Textarea 
    className="w-full bg-secondary/50 backdrop-blur border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 transition-all duration-300 focus:ring-2 focus:ring-accent/50 hover:border-accent/50 transform-gpu resize-none min-h-[120px]"
    {...props}
  />
)

export const FormButton = ({ children, ...props }) => (
  <Button 
    className="w-full bg-accent text-primary py-3 rounded-lg transition-all duration-300 hover:bg-accent/90 transform-gpu hover:scale-[1.02] focus:ring-2 focus:ring-accent/50"
    {...props}
  >
    {children}
  </Button>
)

export const FormSelect = ({ children, ...props }) => (
  <select 
    className="w-full bg-secondary/50 backdrop-blur border border-white/10 rounded-lg px-4 py-3 text-white transition-all duration-300 focus:ring-2 focus:ring-accent/50 hover:border-accent/50 transform-gpu appearance-none cursor-pointer"
    {...props}
  >
    {children}
  </select>
)

export const FormCheckbox = ({ label, ...props }) => (
  <label className="flex items-center gap-2 cursor-pointer group">
    <input 
      type="checkbox"
      className="w-5 h-5 border border-white/10 rounded transition-all duration-300 focus:ring-2 focus:ring-accent/50 hover:border-accent/50 checked:bg-accent checked:border-accent cursor-pointer"
      {...props}
    />
    <span className="text-white transition-colors duration-300 group-hover:text-accent">{label}</span>
  </label>
)
