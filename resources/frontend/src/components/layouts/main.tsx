import { PropsWithChildren } from "react";

interface LayoutMainProps extends PropsWithChildren {}

const MainLayout = ({ children }: LayoutMainProps) => {
  return <main id="site-content" className="min-h-screen bg-white dark:bg-[#020817]">{children}</main>;
};

export default MainLayout;