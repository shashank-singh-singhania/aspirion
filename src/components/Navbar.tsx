'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Brain, Moon, Sun } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
  const [theme, setTheme] = useState('dark') // Set default theme to dark

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark' // Default to dark if no theme is saved
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 dark:border-gray-800">
      <Link className="flex items-center justify-center" href="/">
        <Brain className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Aspirion</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium text-gray-900 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400" href="#">
          Features
        </Link>
        <Link className="text-sm font-medium text-gray-900 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400" href="#">
          About
        </Link>
        <Link className="text-sm font-medium text-gray-900 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400" href="#">
          Contact
        </Link>
      </nav>
      <Button variant="ghost" size="icon" className="ml-4" onClick={toggleTheme}>
        {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </header>
  )
}