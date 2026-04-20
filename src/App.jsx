import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Study from "./components/views/Study.jsx";
import SignUp from "./components/views/SignUp.jsx";
import Login from "./components/views/Login.jsx";
import Collections from "./components/views/Collections.jsx";
import Progress from "./components/views/Progress.jsx";
import { AuthProvider } from "./auth/AuthProvider.jsx";
import { useAuth } from "./auth/useAuth.jsx";

function DefaultRoute() {
  const { loggedInUser, authLoading } = useAuth();

  if (authLoading) return <p>Loading...</p>;

  return loggedInUser ? (
    <Navigate to="/collections" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<DefaultRoute />} />
            <Route path="/study" element={<Study />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
