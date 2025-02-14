import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const TeamOverview: React.FC = () => {
  const teamMetrics = [
    { name: 'Hamza Sohail', bugsResolved: 15, efficiency: 85, requirements: 12 },
    { name: 'Farah Al-Haj Ahmad', bugsResolved: 18, efficiency: 90, requirements: 8 },
    { name: 'Moath Abusall', bugsResolved: 20, efficiency: 88, requirements: 10 },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Team Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={teamMetrics}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bugsResolved" fill="#4f46e5" name="Bugs Resolved" />
              <Bar dataKey="efficiency" fill="#10b981" name="Efficiency %" />
              <Bar dataKey="requirements" fill="#f59e0b" name="Requirements Reviewed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
