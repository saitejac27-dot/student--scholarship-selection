import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import LandingPage from './pages/LandingPage';
import ScholarshipsPage from './pages/ScholarshipsPage';
import ScholarshipDetailPage from './pages/ScholarshipDetailPage';

// Student Pages
import StudentAuthPage from './pages/StudentAuthPage';
import ApplicationFormPage from './pages/ApplicationFormPage';
import StudentDashboardPage from './pages/StudentDashboardPage';

// Admin Pages
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import OptimizationResultsPage from './pages/OptimizationResultsPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              {/* PUBLIC PAGES */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/scholarships" element={<ScholarshipsPage />} />
              <Route path="/scholarships/:id" element={<ScholarshipDetailPage />} />

              {/* STUDENT PAGES */}
              <Route path="/student/login" element={<StudentAuthPage />} />
              <Route path="/student/register" element={<StudentAuthPage />} />
              <Route
                path="/scholarships/:id/apply"
                element={
                  <ProtectedRoute requiredRole="student">
                    <ApplicationFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/apply"
                element={
                  <ProtectedRoute requiredRole="student">
                    <ApplicationFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/dashboard"
                element={
                  <ProtectedRoute requiredRole="student">
                    <StudentDashboardPage />
                  </ProtectedRoute>
                }
              />

              {/* ADMIN PAGES */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/optimization-results"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <OptimizationResultsPage />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
