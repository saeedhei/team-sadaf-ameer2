'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  PlusCircle, 
  Users, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  ArrowRight,
  Layers
} from 'lucide-react';

export default function DashboardPage() {
  // Instructor dashboard ke key performance statistics
  const stats = [
    { 
      title: 'Total Quizzes', 
      value: '12', 
      trend: '+2 this week', 
      icon: BookOpen, 
      accentColor: 'text-indigo-600', 
      bgColor: 'bg-indigo-50' 
    },
    { 
      title: 'Active Students', 
      value: '348', 
      trend: '+15% active', 
      icon: Users, 
      accentColor: 'text-emerald-600', 
      bgColor: 'bg-emerald-50' 
    },
    { 
      title: 'Quiz Submissions', 
      value: '1,240', 
      trend: '88% pass rate', 
      icon: CheckCircle2, 
      accentColor: 'text-blue-600', 
      bgColor: 'bg-blue-50' 
    },
    { 
      title: 'Avg. Completion Time', 
      value: '24 mins', 
      trend: '-2 mins faster', 
      icon: Clock, 
      accentColor: 'text-amber-600', 
      bgColor: 'bg-amber-50' 
    },
  ];

  // Recently created quiz modules ki list
  const recentQuizzes = [
    { 
      id: '1', 
      title: 'JavaScript & React Fundamentals', 
      questionsCount: 15, 
      duration: '30 mins', 
      studentsEnrolled: 120, 
      status: 'Active', 
      category: 'Frontend' 
    },
    { 
      id: '2', 
      title: 'Mathematics & Linear Algebra Test', 
      questionsCount: 20, 
      duration: '45 mins', 
      studentsEnrolled: 95, 
      status: 'Active', 
      category: 'Mathematics' 
    },
    { 
      id: '3', 
      title: 'HTML & CSS Responsive Layouts', 
      questionsCount: 10, 
      duration: '20 mins', 
      studentsEnrolled: 50, 
      status: 'Draft', 
      category: 'Web Design' 
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 sm:space-y-8 p-4 sm:p-6 lg:p-8 pb-16">
      
      {/* Top Welcome Header Banner - Responsive Flex Layout */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1">
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight">
              Welcome back, Sadaf Ameer
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Overview of course assessments, active student engagement, and quiz performance metrics.
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <Link href="/quizzes/create" className="block sm:inline-block">
              <Button 
                type="button" 
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm h-10 px-5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create New Quiz</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Section - Responsive Grid (1 col on mobile, 2 on tablet, 4 on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index} className="bg-white border border-slate-200 shadow-xs rounded-2xl">
              <CardContent className="p-4 sm:p-5 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500">{item.title}</p>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{item.value}</h3>
                  <p className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 pt-0.5">
                    <TrendingUp className="w-3 h-3" />
                    <span>{item.trend}</span>
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${item.bgColor} ${item.accentColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Quizzes Directory Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Recent Quiz Modules</h2>
            <p className="text-xs text-slate-500">Overview of actively configured assessments in your course directory.</p>
          </div>
          <Link href="/quizzes">
            <Button variant="ghost" size="sm" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 gap-1.5 rounded-lg self-start sm:self-auto px-0 sm:px-3">
              <span>View All Quizzes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Recent Quizzes Grid - 1 col mobile, 2 tablet, 3 desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {recentQuizzes.map((quiz) => (
            <Card key={quiz.id} className="bg-white border border-slate-200 shadow-xs rounded-2xl hover:border-slate-300 transition-all">
              <CardContent className="p-4 sm:p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className={`px-2.5 py-0.5 text-[10px] font-semibold rounded-full ${
                    quiz.status === 'Active' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' 
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {quiz.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    <span>{quiz.category}</span>
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                    {quiz.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {quiz.questionsCount} Questions • {quiz.duration}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span>Enrolled: <strong className="text-slate-900">{quiz.studentsEnrolled}</strong></span>
                  <Link href="/quizzes" className="text-indigo-600 font-bold hover:underline flex items-center gap-1">
                    <span>Manage</span>
                    <span>→</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}