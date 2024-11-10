'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Briefcase, GraduationCap, BookOpen, Lightbulb } from 'lucide-react'
import Navbar from "@/components/Navbar"

const Loading = () => {
  const [progress, setProgress] = useState(0)
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [factIndex, setFactIndex] = useState(0)

  const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Choose a job you love, and you will never have to work a day in your life. - Confucius",
    "The future depends on what you do today. - Mahatma Gandhi",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. - Steve Jobs"
  ]

  const facts = [
    "The average person changes careers 5-7 times during their working life.",
    "75% of the fastest growing careers require STEM skills.",
    "Remote work opportunities have increased by 44% in the last 5 years.",
    "Emotional intelligence is becoming increasingly important in the workplace.",
    "The gig economy is expected to make up 43% of the workforce by 2028."
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        const newProgress = Math.min(oldProgress + 1, 100)
        if (newProgress === 100) {
          clearInterval(timer)
        }
        return newProgress
      })
    }, 150)

    const quoteTimer = setInterval(() => {
      setQuoteIndex(old => (old + 1) % quotes.length)
    }, 5000)

    const factTimer = setInterval(() => {
      setFactIndex(old => (old + 1) % facts.length)
    }, 7000)

    return () => {
      clearInterval(timer)
      clearInterval(quoteTimer)
      clearInterval(factTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mb-8"
          >
            <Brain className="w-24 h-24 mx-auto text-emerald-400" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-4">Analyzing Your Career Path</h1>
          <p className="text-xl mb-8">Our AI is processing your responses to provide personalized career insights.</p>
          
          <div className="relative pt-1 mb-8">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-200">
              <motion.div 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold inline-block text-emerald-200">
                {progress}%
              </span>
            </div>
          </div>

          <div className="flex justify-center space-x-8 mb-8">
            {[Briefcase, GraduationCap, BookOpen, Lightbulb].map((Icon, index) => (
              <motion.div
                key={index}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              >
                <Icon className="w-12 h-12 text-emerald-400" />
              </motion.div>
            ))}
          </div>

          <AnimatePresence mode='wait'>
            <motion.div
              key={quoteIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <p className="text-lg italic">"{quotes[quoteIndex]}"</p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode='wait'>
            <motion.div
              key={factIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-2">Did You Know?</h2>
              <p className="text-lg">{facts[factIndex]}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Loading