import { useState } from 'react'
import { SunDim, Moon } from 'phosphor-react'

export function ToggleThemeButton() {
  const [isDark, setIsDark] = useState(false)

  function handleToggleTheme() {
    document.documentElement.classList.contains('dark')
      ? document.documentElement.classList.remove('dark')
      : document.documentElement.classList.add('dark')

    setIsDark(!isDark)
  }

  return (
    <button
      onClick={handleToggleTheme}
      type="button"
      className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
    >
      {isDark ? (
        <SunDim weight="bold" className="w-5 h-5" />
      ) : (
        <Moon weight="bold" className="w-5 h-5" />
      )}
    </button>
  )
}
