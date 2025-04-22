
import { Layout } from "@/components/layout/Layout";
import { Book, Play, FileText, Award, CheckCircle, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Course {
  id: string;
  title: string;
  description: string;
  modules: number;
  completion: number;
  difficulty: "beginner" | "intermediate" | "advanced";
}

const courses: Course[] = [
  {
    id: "course-1",
    title: "SIEM Fundamentals",
    description: "Learn the basics of Security Information and Event Management",
    modules: 5,
    completion: 100,
    difficulty: "beginner"
  },
  {
    id: "course-2",
    title: "Log Analysis Techniques",
    description: "Master the art of analyzing security logs for threat detection",
    modules: 8,
    completion: 65,
    difficulty: "intermediate"
  },
  {
    id: "course-3",
    title: "Attack Detection and Response",
    description: "Identify common attack patterns and develop response strategies",
    modules: 12,
    completion: 25,
    difficulty: "intermediate"
  },
  {
    id: "course-4",
    title: "Advanced Threat Hunting",
    description: "Proactively search for security threats in your environment",
    modules: 6,
    completion: 0,
    difficulty: "advanced"
  }
];

const getDifficultyBadge = (difficulty: Course["difficulty"]) => {
  const classes = {
    beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    intermediate: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${classes[difficulty]}`}>
      {difficulty}
    </span>
  );
};

export default function Learn() {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Learning Center</h1>
        <p className="text-muted-foreground">
          Enhance your cybersecurity skills with interactive courses and tutorials
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="cyber-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{course.title}</CardTitle>
                    {getDifficultyBadge(course.difficulty)}
                  </div>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>{course.modules} modules</span>
                    <span>{course.completion}% complete</span>
                  </div>
                  <Progress value={course.completion} className="h-2" />
                </CardContent>
                <CardFooter>
                  <Button className="w-full gap-2">
                    {course.completion === 0 ? (
                      <>
                        <Play className="h-4 w-4" />
                        Start Course
                      </>
                    ) : course.completion === 100 ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Review Course
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Continue Learning
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium">SIEM Beginner</h3>
                  <p className="text-xs text-muted-foreground mt-1">Completed first course</p>
                </div>
                
                <div className="bg-muted rounded-lg p-4 text-center opacity-60">
                  <div className="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium">Threat Hunter</h3>
                  <p className="text-xs text-muted-foreground mt-1">Complete all courses</p>
                </div>
                
                <div className="bg-muted rounded-lg p-4 text-center opacity-60">
                  <div className="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium">Defender</h3>
                  <p className="text-xs text-muted-foreground mt-1">Stop 5 simulated attacks</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Learning Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {[
                  "SIEM Best Practices Guide",
                  "Log Analysis Cheat Sheet",
                  "MITRE ATT&CK Framework Overview",
                  "Incident Response Playbook",
                  "Threat Intelligence Integration"
                ].map((resource, i) => (
                  <Link key={i} to="#">
                    <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{resource}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                Interactive Tutorials
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {[
                  "Analyzing Brute Force Attacks",
                  "Detecting Data Exfiltration",
                  "Malware Infection Analysis",
                  "Network Intrusion Detection",
                  "Insider Threat Identification"
                ].map((tutorial, i) => (
                  <Link key={i} to="#">
                    <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Play className="h-4 w-4 text-primary" />
                        <span>{tutorial}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
