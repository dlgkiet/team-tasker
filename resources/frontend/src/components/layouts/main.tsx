import { PropsWithChildren } from "react";

interface LayoutMainProps extends PropsWithChildren {}

const MainLayout = ({ children }: LayoutMainProps) => {
  return <main id="site-content" className="min-h-screen bg-background">{children}</main>;
};

export default MainLayout;