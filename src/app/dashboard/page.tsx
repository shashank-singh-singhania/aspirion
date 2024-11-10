'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { BarChart3, BookOpen, FileCheck, MessageSquare, ArrowRight, Loader2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation'

interface QuickLink {
  title: string;
  icon: React.ElementType;
  path: string;
  description: string;
}

const quickLinks: QuickLink[] = [
  { title: 'AI Career Assessment', icon: BarChart3, path: '/assessment', description: 'Take our comprehensive career assessment and get your personalized career roadmap in minutes.' },
  { title: 'AI Career Chat', icon: MessageSquare, path: '/chat', description: 'Get instant career guidance from our AI assistant' },
  { title: 'AI Resume Checker', icon: FileCheck, path: '/resume-checker', description: 'Check and improve your resume with AI feedback' },
  { title: 'Learning Path', icon: BookOpen, path: '/learning', description: 'Access personalized learning resources' }
];

interface PastResult {
  _id: string;
  createdAt: string;
  response: {
    careerPath: {
      recommendedIndustry: string;
    };
  };
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [pastResults, setPastResults] = useState<PastResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/signup');
        } else {
          const userData = localStorage.getItem('userData');
          const parsedUserData = userData ? JSON.parse(userData) : null;
          setUserName(parsedUserData?.name || null);

          try {
            const response = await fetch('https://brainwaveapi.techpi.me/model', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });

            if (!response.ok) {
              throw new Error('Failed to fetch past results');
            }

            const data = await response.json();
            if (data.success) {
              setPastResults(data.data);
            } else {
              throw new Error('API returned unsuccessful response');
            }
          } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
          } finally {
            setIsLoading(false);
          }
        }
      }
    };

    fetchData();
  }, [router]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-200">
      <Navbar />
      <main className="container mx-auto px-4 py-8 pt-20">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Welcome, {userName}!</h1>
        
        <div className="gap-8 mb-8">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Career Tools</CardTitle>
              <CardDescription>Access your personalized career resources</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <Link key={index} href={link.path}>
                    <Card className="bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-shadow cursor-pointer h-full">
                      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                        <Icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mr-2" />
                        <CardTitle className="text-lg font-semibold">{link.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{link.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Past Results</CardTitle>
            <Link href="/result" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600 dark:text-emerald-400" />
              </div>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <div className="space-y-4">
                {pastResults.slice(0, 3).map((result) => (
                  <Link key={result._id} href={`/result/${result._id}`}>
                    <Card className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer my-4">
                      <CardContent className="flex items-center justify-between p-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{result.response.careerPath.recommendedIndustry}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(result.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default Dashboard