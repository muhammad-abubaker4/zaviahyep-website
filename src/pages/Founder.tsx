import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { motion } from "framer-motion";
import hafsaKhalil from "@/assets/team/Hafsa_Khalil.jpeg";
import { breadcrumbSchema, personSchema } from "@/lib/schema";

const founderJsonLd = [
  personSchema({
    name: "Hafsa Khalil",
    jobTitle: "Founder & CEO",
    path: "/founder",
    description:
      "Founder & CEO of Zaviah — empowering youth across Pakistan through mentorship, leadership, and learning.",
    image: typeof hafsaKhalil === "string" ? hafsaKhalil : undefined,
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Founder", path: "/founder" },
  ]),
];

const Founder = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Hafsa Khalil — Founder"
        description="Meet Hafsa Khalil, Founder & CEO of Zaviah — empowering youth across Pakistan through mentorship, leadership, and learning."
        path="/founder"
        jsonLd={founderJsonLd}
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
              Hafsa Khalil
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
                    src={hafsaKhalil}
                    alt="Hafsa Khalil, Founder and CEO of Zaviah"
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
                  Founder & CEO
                </h2>
                <p className="text-2xl font-semibold text-foreground mb-6">
                Visionary leader committed to empowering youth through mentorship and learning.
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
                <p className="mb-4">
                  Hafsa Khalil is a strategic and results-driven leader who founded Zaviah as a nationwide initiative dedicated to empowering students across Pakistan through mentorship and awareness. She is a passionate advocate for leveraging scientific knowledge and innovative leadership to catalyze sustainable development and social impact. Hafsa brings a unique and powerful combination of expertise in biotechnology, proven success in entrepreneurship, and a robust record of youth empowerment to Zaviah's mission of building informed and empowered youth.
                </p>
              </div>
            </motion.div>

            {/* Academic Foundation Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <h3 className="text-3xl font-bold text-primary mb-6">Academic Foundation and Analytical Skills</h3>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                <p className="mb-4">
                  Hafsa's commitment to analytical excellence is rooted in her academic background. She is completing her Bachelor of Science in Biotechnology and Genetic Engineering from Kohat University of Science and Technology (KUST).
                </p>
                <p className="mb-4">
                  Her research focus, demonstrated through her thesis on "Transfection efficiency of cationic nanocarriers using different types of expression vectors", underscores her expertise in advanced scientific areas like Nanocarrier Formulation and Drug Delivery Systems.
                </p>
                <p>
                  Complementing her studies, she gained practical, hands-on experience as an Intern at the Pakistan Council of Scientific and Industrial Research (PCSIR) (Molecular Biology Lab). In this role, she applied good laboratory practices (GLP) and mastered core techniques, including DNA extraction, PCR, and gel electrophoresis.
                </p>
              </div>
            </motion.div>

            {/* Leadership Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <h3 className="text-3xl font-bold text-primary mb-6">Leadership, Impact, and Entrepreneurship</h3>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                <p className="mb-4">
                  Hafsa's professional trajectory is marked by her ability to found, lead, and scale impactful initiatives:
                </p>
                <p className="mb-4">
                  Under her leadership as Founder and CEO, Zaviah is establishing itself as a key force in youth development. She leads a dedicated 10-member team, managing strategy, outreach, and daily operations, and has successfully organized 5+ impactful sessions, directly engaging and empowering over 250 students. Her broader commitment to mentorship and leadership training is extensive; she has mentored over 300+ students nationwide and delivered 10+ workshops on leadership and entrepreneurship to more than 300+ participants. This experience has honed her skills in Public Speaking & Communication and Team Management.
                </p>
                <p className="mb-4">
                  Hafsa also has proven entrepreneurial success as the Founder & CEO of Glam by Hafsa, a clothing brand. In this venture, she led a team of 4, developed crucial business and marketing plans, and successfully boosted brand awareness by 50%, directly driving production and sales that targeted 60+ customers. Her leadership extends into the non-profit sector where she has led 12 team members as a Territory Leader for the THAAM - Aspire Leaders Program and empowered over 100+ students as Campus Head at KUST for Youth Organization Pakistan. Furthermore, she has contributed to policy discussions and youth advocacy through the Pakistan Youth Parliament and focused on sustainability during her NYCCC Fellowship, demonstrating her commitment to civic and climate action.
                </p>
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

export default Founder;
