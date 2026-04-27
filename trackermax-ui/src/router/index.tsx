import { createBrowserRouter } from "react-router-dom";
import { requireAuth, redirectIfAuthed } from "./loaders";
import RootLayout from "../components/layouts/RootLayout";
import AuthLayout from "../components/layouts/AuthLayout";
import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";
import Dashboard from "../features/dashboard/Dashboard";
import TicketsPage from "../features/tickets/TicketsPage";
import ProjectsPage from "../features/projects/ProjectsPage";
import TeamsPage from "../features/teams/TeamsPage";
import UserProfile from "../features/auth/UserProfile";
import Settings from "../features/settings/Settings";
import LandingPage from "../features/landing/LandingPage";
import NotFound from "../components/NotFound";

export const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        { index: true, element: <LandingPage /> },

        // auth routes — redirect away if already logged in
        {
          element: <AuthLayout />,
          loader: redirectIfAuthed,
          children: [
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
          ],
        },

        // protected routes
        {
          loader: requireAuth,
          children: [
            { path: "dashboard", element: <Dashboard /> },
            { path: "tickets", element: <TicketsPage /> },
            { path: "projects", element: <ProjectsPage /> },
            { path: "teams", element: <TeamsPage /> },
            { path: "profile", element: <UserProfile /> },
            { path: "settings", element: <Settings /> },
          ],
        },

        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  { basename: "/trackermax/" },
);
