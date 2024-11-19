import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown, Building2 } from 'lucide-react';

const SchoolComparisonDashboard = () => {
  // School data calculation
  const kg1Data = {
    schoolName: "KG1",
    participants: ["P3", "P4", "P5", "P6"],
    color: "#6366f1"
  };

  const dn5Data = {
    schoolName: "DN5",
    participants: ["P1", "P2", "P8", "P9"],
    color: "#22c55e"
  };

  // Section comparison data
  const sectionComparison = [
    { 
      section: "Section 1\nLearner Knowledge",
      KG1: 61,
      DN5: 68,
      description: "Young learner principles & characteristics"
    },
    { 
      section: "Section 2\nPlanning",
      KG1: 55,
      DN5: 63,
      description: "Lesson planning & resources"
    },
    { 
      section: "Section 3\nTeaching",
      KG1: 65,
      DN5: 70,
      description: "Teaching strategies & management"
    },
    { 
      section: "Section 4\nAssessment",
      KG1: 58,
      DN5: 64,
      description: "Assessment types & application"
    }
  ];

  // Group comparison data
  const groupComparison = [
    { group: "G1: Child Development", KG1: 72, DN5: 77 },
    { group: "G2: Learning Strategies", KG1: 65, DN5: 70 },
    { group: "G3: Lesson Planning", KG1: 78, DN5: 84 },
    { group: "G4: Resources", KG1: 68, DN5: 73 },
    { group: "G5: Material Adaptation", KG1: 62, DN5: 67 },
    { group: "G6: Teaching Methods", KG1: 75, DN5: 81 },
    { group: "G7: Class Management", KG1: 70, DN5: 75 },
    { group: "G8: Assessment Types", KG1: 73, DN5: 79 },
    { group: "G9: Feedback Methods", KG1: 67, DN5: 72 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border">
          <p className="font-semibold">{label}</p>
          {payload.map((item, index) => (
            <p key={index} className="text-sm" style={{ color: item.color }}>
              {item.name}: {item.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Header */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Building2 className="text-indigo-600" />
            School Comparison Analysis: KG1 vs DN5
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-sm">
              <p className="font-semibold">KG1 School</p>
              <p className="text-gray-600">Participants: P3, P4, P5, P6</p>
            </div>
            <div className="text-sm">
              <p className="font-semibold">DN5 School</p>
              <p className="text-gray-600">Participants: P1, P2, P8, P9</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section Performance Comparison */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Section Performance Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={sectionComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="section" />
                <YAxis domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="KG1" fill="#6366f1" name="KG1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="DN5" fill="#22c55e" name="DN5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Group Performance Radar */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Group Performance Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={groupComparison}>
                <PolarGrid />
                <PolarAngleAxis dataKey="group" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="KG1" dataKey="KG1" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                <Radar name="DN5" dataKey="DN5" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Insights */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg">Comparative Analysis Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-sm mb-2">Section-level Comparison</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <ArrowUp className="text-green-500" size={14} />
                  DN5 shows consistently higher performance across all sections
                </li>
                <li>• Largest gap in Section 1: DN5 (68%) vs KG1 (61%)</li>
                <li>• Smallest gap in Section 3: DN5 (70%) vs KG1 (65%)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-2">Group-level Comparison</h3>
              <ul className="space-y-2 text-sm">
                <li>• Both schools excel in Lesson Planning (G3)</li>
                <li>• DN5 shows particular strength in Teaching Methods (G6)</li>
                <li>• Material Adaptation (G5) is an area for improvement for both schools</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg">Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-sm mb-2">KG1 School</h3>
              <ul className="space-y-1 text-sm">
                <li>• Focus on strengthening learner knowledge principles</li>
                <li>• Enhance material adaptation strategies</li>
                <li>• Consider peer learning opportunities with DN5</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-2">DN5 School</h3>
              <ul className="space-y-1 text-sm">
                <li>• Share best practices in teaching methods</li>
                <li>• Continue strong performance in lesson planning</li>
                <li>• Consider mentoring opportunities with KG1</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolComparisonDashboard;