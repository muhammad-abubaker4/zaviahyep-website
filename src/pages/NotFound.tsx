import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <PageMeta title="Page Not Found" noIndex path={location.pathname} />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
          <p className="text-6xl font-bold text-primary/20">404</p>
          <h1 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">Page not found</h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            The page you are looking for does not exist or may have been moved.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button asChild className="rounded-full" size="lg">
              <Link to="/">Back to home</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full" size="lg">
              <Link to="/#contact">Contact us</Link>
            </Button>
            <Button asChild variant="secondary" className="rounded-full" size="lg">
              <Link to="/#apply">Join Zaviah</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
