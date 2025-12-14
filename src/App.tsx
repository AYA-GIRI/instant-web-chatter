import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Methods from "./pages/Methods";
import Practicum from "./pages/Practicum";
import PromptPracticum from "./pages/PromptPracticum";
import About from "./pages/About";
import Login from "./pages/Login";
import AuthCallback from "./pages/AuthCallback";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { FloatingChat } from "@/components/FloatingChat";
import { CustomCursor } from "@/components/CustomCursor";
import { AuthProvider } from "@/contexts/AuthContext";
import { ChatProvider } from "@/contexts/ChatContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ChatProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          {/* Global Animated Background */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
            <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-teal-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/methods"
              element={
                <ProtectedRoute>
                  <Methods />
                </ProtectedRoute>
              }
            />
            <Route
              path="/practicum"
              element={
                <ProtectedRoute>
                  <Practicum />
                </ProtectedRoute>
              }
            />
            <Route
              path="/practicum/prompts"
              element={
                <ProtectedRoute>
                  <PromptPracticum />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<About />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CustomCursor />
          <FloatingChat />
        </BrowserRouter>
        </TooltipProvider>
      </ChatProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
