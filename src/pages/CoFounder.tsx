import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { motion } from "framer-motion";
import muhammadAbubaker from "@/assets/team/Muhammad_Abubaker.jpeg";
import { breadcrumbSchema, personSchema } from "@/lib/schema";

const coFounderJsonLd = [
  personSchema({
    name: "Muhammad Abubaker",
    jobTitle: "Co-Founder",
    path: "/co-founder",
    description:
      "Co-Founder of Zaviah — leading operations, strategy, and digital direction for student communities nationwide.",
    image: typeof muhammadAbubaker === "string" ? muhammadAbubaker : undefined,
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Co-Founder", path: "/co-founder" },
  ]),
];

const CoFounder = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Muhammad Abubaker — Co-Founder"
        description="Meet Muhammad Abubaker, Co-Founder of Zaviah — leading operations, strategy, and digital direction for student communities nationwide."
        path="/co-founder"
        jsonLd={coFounderJsonLd}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
      {/* Banner Section */}
      <section className="relative py-32 bg-gradient-to-br from-primary via-accent to-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Muhammad Abubaker
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            {/* Profile Header */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center md:justify-start"
              >
                <div className="w-full max-w-md">
                  <img
                    src={muhammadAbubaker}
                    alt="Muhammad Abubaker, Co-Founder of Zaviah"
                    className="w-full h-auto rounded-lg shadow-lg object-cover"
                  />
                </div>
              </motion.div>

              {/* Title and Role */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col justify-center"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                  Co-Founder
                </h2>
                {/* <p className="text-2xl font-semibold text-foreground mb-6">
                  Muhammad Abubaker
                </p> */}
                <p className="mb-4">
                Leads operations, strategy, and digital direction for meaningful student communities.
                </p>
              </motion.div>
            </div>

            {/* Introduction Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h3 className="text-3xl font-bold text-primary mb-6">Introduction</h3>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                <p>
                  Muhammad Abubaker is a motivated leader and organizational specialist with a focus on cross-functional collaboration. As the Co-Founder of Zaviah, he is instrumental in transforming the organization's vision into executed projects. He is eager to apply his organizational skills and analytical background to ensure the timely execution of youth-led initiatives, demonstrating proficiency and team coordination within the non-profit sector.
                </p>
              </div>
            </motion.div>

            {/* Leadership Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <h3 className="text-3xl font-bold text-primary mb-6">Leadership and Operational Impact at Zaviah</h3>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                <p className="mb-4">
                  Muhammad Abubaker plays a pivotal role in the day-to-day operations and strategic execution of Zaviah. His experience highlights his strong abilities in team coordination, project delivery, and mentorship:
                </p>
                <ul className="list-disc list-inside space-y-3 ml-4">
                  <li>
                    <strong>Strategic Team Management:</strong> He has successfully recruited and managed a 10-member cross-functional team, establishing efficient onboarding and training plans.
                  </li>
                  <li>
                    <strong>Project and Workflow Coordination:</strong> Abubaker ensures operational effectiveness by coordinating project workflows and deliverables, a critical function in guaranteeing the timely execution of youth-led initiatives.
                  </li>
                  <li>
                    <strong>Mentorship and Training:</strong> Committed to empowering peers, he has conducted 5+ training sessions on leadership and teamwork for over 250+ participants.
                  </li>
                  <li>
                    <strong>Leadership Development:</strong> His dedication to community development and social innovation was further enhanced through his participation in the Virtual Youth Leadership Program with Wall of Hope, where he strengthened his communication, leadership, and coordination abilities.
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default CoFounder;

