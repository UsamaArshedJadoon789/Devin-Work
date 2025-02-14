import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardPage } from './pages/DashboardPage';
import { DailyTasksPage } from './pages/DailyTasksPage';
import { ReportsPage } from './pages/ReportsPage';

export const App: React.FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/daily-tasks" element={<DailyTasksPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/team/:memberId" element={<DailyTasksPage />} />
      </Routes>
    </MainLayout>
  );
};
