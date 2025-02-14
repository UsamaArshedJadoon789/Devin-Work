import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';

interface TeamMemberStats {
  name: string;
  bugsAdded: number;
  bugsClosed: number;
  bugsReopened: number;
  requirementsReviewed: number;
}

interface TeamPerformanceProps {
  members: TeamMemberStats[];
}

export const TeamPerformance: React.FC<TeamPerformanceProps> = ({ members }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => {
        const efficiency = member.bugsClosed / (member.bugsAdded || 1) * 100;
        const productivity = member.bugsClosed + member.requirementsReviewed;
        
        return (
          <Card key={member.name}>
            <CardHeader>
              <CardTitle className="text-lg">{member.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Efficiency</span>
                  <span>{Math.round(efficiency)}%</span>
                </div>
                <Progress value={efficiency} />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Bugs Added</p>
                  <p className="text-2xl font-bold">{member.bugsAdded}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Bugs Closed</p>
                  <p className="text-2xl font-bold">{member.bugsClosed}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Bugs Reopened</p>
                  <p className="text-2xl font-bold">{member.bugsReopened}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Requirements</p>
                  <p className="text-2xl font-bold">{member.requirementsReviewed}</p>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Productivity Score</span>
                  <span>{productivity}</span>
                </div>
                <Progress value={(productivity / 20) * 100} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
