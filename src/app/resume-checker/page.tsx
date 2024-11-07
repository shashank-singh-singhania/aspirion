'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, Upload } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ModelResponse {
  feedback: {
    formatIssues: string[];
    contentSuggestions: string[];
    grammarIssues: string[];
    effectivenessTips: string[];
  };
  sampleCorrections: {
    [key: string]: string;
  };
}

interface ApiResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    userId: string;
    resumeLink: string;
    modelResponse: ModelResponse;
    _id: string;
    __v: number;
  };
}

const ResumeChecker: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!file) {
      setError('Please select a file to upload')
      return
    }

    setIsUploading(true)
    setError(null)

    const formData = new FormData()
    formData.append('resume', file)

    try {
      // Replace with your actual API endpoint
    //   const response = await fetch('https://api.example.com/resume-check', {
    //     method: 'POST',
    //     body: formData,
    //   })

    const data: ApiResponse = {
      success: true,
      status: 200,
      message: 'Resume processed successfully',
      data: {
        userId: '12345',
        resumeLink: 'https://example.com/resume.pdf',
        modelResponse: {
          feedback: {
            formatIssues: [
              "Inconsistent headings and section titles; ensure uniformity in font size and style.",
              "Uneven spacing between sections; maintain consistent margins and spacing."
            ],
            contentSuggestions: [
              "Include an 'Objective' or 'Summary' section at the beginning to provide a quick overview of career goals and key qualifications.",
              "Consider adding a 'Skills' section to highlight technical skills separately for better visibility."
            ],
            grammarIssues: [
              "Ensure consistent use of tense, e.g., past tense for completed projects and present tense for ongoing roles.",
              "Correct minor typos such as 'A CHIEVEMENTS' to 'ACHIEVEMENTS'."
            ],
            effectivenessTips: [
              "Align projects and experiences more closely with the job description or industry standards by emphasizing impact and results.",
              "Use bullet points for easier readability and to highlight key achievements and responsibilities succinctly."
            ]
          },
          sampleCorrections: {
            Education: "Netaji Subhas University of Technology, New Delhi | B. Tech. in Instrumentation and Control Engineering, Expected 2028",
            Objective: "Aspiring data scientist with a strong foundation in machine learning and data analysis, seeking to leverage skills in a challenging role within the tech industry."
          }
        },
        _id: 'abc123',
        __v: 0
      }
    }

    //   if (!response.ok) {
    //     throw new Error('Failed to upload resume')
    //   }

    //   const data: ApiResponse = await response.json()
      setApiResponse(data)
    } catch (err) {
      setError('An error occurred while processing your resume. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-200">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Resume Checker</h1>
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Upload Your Resume</CardTitle>
            <CardDescription className='text-emerald-600 dark:text-emerald-400'>Our AI will analyze your resume and provide feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="resume">Resume</Label>
                <Input id="resume" type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
              </div>
              <Button type="submit" disabled={isUploading} className="w-full">
                {isUploading ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  'Upload and Analyze'
                )}
              </Button>
            </form>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {apiResponse && (
          <Card className="w-full max-w-4xl mx-auto mt-8">
            <CardHeader>
              <CardTitle>Resume Analysis Results</CardTitle>
              <CardDescription className='text-emerald-600 dark:text-emerald-400'>Here's what our AI found in your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="feedback" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="feedback">Feedback</TabsTrigger>
                  <TabsTrigger value="corrections">Sample Corrections</TabsTrigger>
                </TabsList>
                <TabsContent value="feedback">
                  <div className="space-y-4">
                    {Object.entries(apiResponse.data.modelResponse.feedback).map(([key, issues]) => (
                      <div key={key}>
                        <h3 className="text-lg font-semibold capitalize mb-2">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {issues.map((issue, index) => (
                            <li key={index}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="corrections">
                  <div className="space-y-4">
                    {Object.entries(apiResponse.data.modelResponse.sampleCorrections).map(([key, correction]) => (
                      <div key={key}>
                        <h3 className="text-lg font-semibold mb-1">{key}</h3>
                        <p>{correction}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

export default ResumeChecker