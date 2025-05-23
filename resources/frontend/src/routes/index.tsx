import React, { PropsWithChildren, useLayoutEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Projects from "../pages/projects/projects";
import Register from "../pages/auth/register";
import Login from "../pages/auth/login";
import ProjectDetail from "../pages/projects/project-detail";
import Profile from "../pages/settings/profile";

const Wrapper = ({ children }: PropsWithChildren) => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return <>{children}</>;
};

/** Define Routes HERE */
const routes = [
    {
        path: "/",
        element: <Dashboard />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/projects",
        element: <Projects />,
    },
    {
        path: "/projects/:projectId",
        element: <ProjectDetail />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
];

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Wrapper>
                <Routes>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Routes>
            </Wrapper>
        </Router>
    );
};

export default AppRoutes;
