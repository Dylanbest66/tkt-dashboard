import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

const EnhancedDashboard = () => {
  // Calculate section scores based on the actual data
  const sectionScores = [
    { name: 'Section 1\nLearner Knowledge', score: 65, questions: 19, trend: 'up', 
      details: 'Young learner principles & characteristics' },
    { name: 'Section 2\nPlanning', score: 58, questions: 20, trend: 'down',
      details: 'Lesson planning & resources' },
    { name: 'Section 3\nTeaching', score: 72, questions: 27, trend: 'up',
      details: 'Teaching strategies & management' },
    { name: 'Section 4\nAssessment', score: 61, questions: 14, trend: 'neutral',
      details: 'Assessment types & application' }
  ];

  const sectionDetails = [
    { name: 'Section 1', score: 65, avgScore: 62, benchmark: 70 },
    { name: 'Section 2', score: 58, avgScore: 55, benchmark: 70 },
    { name: 'Section 3', score: 72, avgScore: 68, benchmark: 70 },
    { name: 'Section 4', score: 61, avgScore: 58, benchmark: 70 }
  ];

  const groupPerformance = [
    { group: 'G1: Child Development', score: 75, color: '#6366f1' },
    { group: 'G2: Learning Strategies', score: 68, color: '#94a3b8' },
    { group: 'G3: Lesson Planning', score: 82, color: '#6366f1' },
    { group: 'G4: Resources', score: 71, color: '#94a3b8' },
    { group: 'G5: Material Adaptation', score: 65, color: '#94a3b8' },
    { group: 'G6: Teaching Methods', score: 79, color: '#6366f1' },
    { group: 'G7: Class Management', score: 73, color: '#6366f1' },
    { group: 'G8: Assessment Types', score: 77, color: '#6366f1' },
    { group: 'G9: Feedback Methods', score: 70, color: '#94a3b8' }
  ];

  const participantDistribution = [
    { range: '0-20%', count: 0 },
    { range: '21-40%', count: 1 },
    { range: '41-60%', count: 4 },
    { range: '61-80%', count: 4 },
    { range: '81-100%', count: 1 }
  ];

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up':
        return <ArrowUp className="text-green-500" size={16} />;
      case 'down':
        return <ArrowDown className="text-red-500" size={16} />;
      default:
        return <Minus className="text-gray-500" size={16} />;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border">
          <p className="font-semibold">{label}</p>
          <p className="text-sm">Score: {payload[0].value}%</p>
          <p className="text-xs text-gray-500">Click for details</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sectionScores.map((section, index) => (
          <Card key={index} className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{section.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{section.score}%</span>
                {getTrendIcon(section.trend)}
              </div>
              <p className="text-xs text-gray-500 mt-1">{section.questions} questions</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section Performance Overview */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Section Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={sectionDetails} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" name="Current Score" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="avgScore" name="Average Score" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="benchmark" name="Benchmark" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Group Performance */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Group Performance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={groupPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="group" angle={-45} textAnchor="end" height={100} />
                <YAxis domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {groupPerformance.map((entry, index) => (
                    <rect key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Radar Analysis */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Competency Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={groupPerformance}>
                <PolarGrid />
                <PolarAngleAxis dataKey="group" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Performance" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Score Distribution */}
        <Card className="md:col-span-2 bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Participant Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={participantDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg">Key Findings & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-sm mb-2">Strengths</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <ArrowUp className="text-green-500" size={14} />
                  Teaching Strategies (Section 3) shows highest proficiency at 72%
                </li>
                <li className="flex items-center gap-2">
                  <ArrowUp className="text-green-500" size={14} />
                  Lesson Planning (G3) demonstrates exceptional performance at 82%
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-2">Areas for Improvement</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <ArrowDown className="text-red-500" size={14} />
                  Planning (Section 2) needs attention at 58%
                </li>
                <li className="flex items-center gap-2">
                  <ArrowDown className="text-red-500" size={14} />
                  Material Adaptation (G5) shows room for improvement at 65%
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedDashboard;