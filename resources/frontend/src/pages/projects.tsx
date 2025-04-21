import React from "react";
import Layout from "../components/layouts";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

const mockProjects = [
  {
    id: 1,
    name: "Marketing Website",
    description: "Landing page, contact form, SEO setup",
  },
  {
    id: 2,
    name: "Internal Dashboard",
    description: "Analytics, charts, and user management",
  },
  {
    id: 3,
    name: "E-commerce Platform",
    description: "Product catalog, shopping cart, payment gateway",
  },
];

const Projects = () => {
  return (
    <Layout>
      <div className="px-6 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Projects</h1>
          <Button asChild>
            <Link to="/projects/new" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Project
            </Link>
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mockProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-primary">
                  {project.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
                <Link
                  to={`/projects/${project.id}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  View Details →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
