import React, { PropsWithChildren, useLayoutEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Projects from "../pages/projects";

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
        element: (
            <Dashboard />
        ),
    },
    {
        path: "/projects",
        element: (
            <Projects />
        ),
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
