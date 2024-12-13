import './App.css';
import { Auth } from './components/auth/Auth';
import { Student } from './components/dashboard/Student';
import { Teacher } from './components/dashboard/Teacher';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Higher-Order Component for Role-Based Authorization
function ProtectedRoute({ element, allowedRoles }) {
  const userRole = localStorage.getItem("userRole");

  if (!userRole) {
    return <Navigate to="/account" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return element;
}

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={"Hello"} />
        <Route path="/account" element={<Auth />} />
        {/* Protected Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute element={<Student />} allowedRoles={["Student"]} />
          }
        />
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute element={<Teacher />} allowedRoles={["Teacher"]} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
