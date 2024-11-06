import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Brain, GraduationCap, BookOpen, Briefcase, ChevronRight } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"

export default function ResultPage() {
  // Normally, you'd fetch this data from an API or pass it as props
  const result = {
    modelResponse: "A suitable career path for this individual would be in event planning within the arts and media industry. The individual's intuitive and creative problem-solving approach, interest in designing creative projects, and preference for collaborating with others align well with the demands of event planning. Additionally, their role as a strategist and ability to thrive under pressure are beneficial for managing the dynamic and often complex nature of events. Their decision-making style, which balances logic and emotions, is ideal for making swift, yet thoughtful, decisions required in this field.",
    collegeSuggestion: [
      {
        degreeName: "Bachelor of Arts in Event Management",
        collegeName: "University of Nevada, Las Vegas",
        location: "Las Vegas, Nevada, USA",
        degreeDuration: "4 years",
        degreeDescription: "This program offers comprehensive training in organizing, planning, and executing events with a focus on creative and strategic skills, ideal for a career in event planning."
      },
      {
        degreeName: "Bachelor of Fine Arts in Arts Management",
        collegeName: "School of the Art Institute of Chicago",
        location: "Chicago, Illinois, USA",
        degreeDuration: "4 years",
        degreeDescription: "This degree combines arts and business education to prepare students for managing and planning artistic events and projects."
      },
      // ... other college suggestions
    ],
    courseSuggestion: [
      {
        courseName: "Event Planning Foundations",
        courseLink: "https://www.coursera.org/learn/event-planning",
        courseDuration: "6 weeks",
        courseDescription: "This course provides an introduction to the essentials of event planning, covering everything from budgeting to logistics, perfect for beginners in the event planning industry."
      },
      {
        courseName: "The Art of Creative Event Planning",
        courseLink: "https://www.udemy.com/course/creative-event-planning/",
        courseDuration: "4 hours",
        courseDescription: "Focuses on innovative and creative methods for planning events, with practical tips and strategies to enhance creativity in the process."
      },
      // ... other course suggestions
    ],
    careerPath: {
      recommendedIndustry: "Arts and Media",
      keypoints: [
        {
          attribute: "Problem Solving Approach",
          value: "Intuitive and creative",
          description: "The ability to solve problems through intuition and creativity.",
          industryValue: "Vital for developing unique and engaging event concepts in arts and media."
        },
        {
          attribute: "Stress Handling",
          value: "Thrive under pressure",
          description: "Performs well under stressful situations.",
          industryValue: "Crucial for handling the fast-paced and high-pressure nature of event planning."
        },
        // ... other keypoints
      ]
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-200">
      <Navbar />
      <div className="p-6">
        <header className="max-w-5xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Your Career Assessment Results</h1>
          <p className="text-gray-500 dark:text-gray-400">Based on your unique profile and preferences</p>
        </header>

        <main className="max-w-5xl mx-auto space-y-12">
          <section className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
              <Briefcase className="mr-2" />
              Recommended Career Path
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{result.modelResponse}</p>
            <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-800 p-4 rounded-md">
              <span className="text-gray-900 dark:text-white font-medium">Recommended Industry</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{result.careerPath.recommendedIndustry}</span>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-900 dark:text-white">
              <GraduationCap className="mr-2" />
              Educational Pathways
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {result.collegeSuggestion.map((college, index) => (
                <Card key={index} className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">{college.degreeName}</CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">{college.collegeName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{college.location} • {college.degreeDuration}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{college.degreeDescription}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-900 dark:text-white">
              <BookOpen className="mr-2" />
              Recommended Courses
            </h2>
            <div className="space-y-4">
              {result.courseSuggestion.map((course, index) => (
                <Card key={index} className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">{course.courseName}</CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">{course.courseDuration}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{course.courseDescription}</p>
                    <Button variant="link" className="text-emerald-600 dark:text-emerald-400 p-0 hover:text-emerald-700 dark:hover:text-emerald-300" asChild>
                      <Link href={course.courseLink} target="_blank" rel="noopener noreferrer">
                        Learn More <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-900 dark:text-white">
              <Brain className="mr-2" />
              Your Key Attributes
            </h2>
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6 shadow-lg">
              {result.careerPath.keypoints.map((keypoint, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{keypoint.attribute}</h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-semibold mb-1">{keypoint.value}</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{keypoint.description}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm italic">{keypoint.industryValue}</p>
                  {index < result.careerPath.keypoints.length - 1 && <Separator className="mt-4 bg-gray-300 dark:bg-gray-700" />}
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="max-w-5xl mx-auto mt-12 text-center">
          <Button className="bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors">
            Explore More Career Options
          </Button>
        </footer>
      </div>
    </div>
  )
}