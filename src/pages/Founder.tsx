import LeaderProfile from "@/components/LeaderProfile";
import { profiles } from "@/data/profiles";
import { breadcrumbSchema, personSchema } from "@/lib/schema";

const profile = profiles.founder;

const founderJsonLd = [
  personSchema({
    name: profile.name,
    jobTitle: profile.role,
    path: profile.path,
    description: profile.metaDescription,
    image: typeof profile.image === "string" ? profile.image : undefined,
    email: profile.links.email,
    sameAs: [profile.links.linkedin, profile.links.instagram].filter(Boolean) as string[],
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Founder", path: profile.path },
  ]),
];

const Founder = () => <LeaderProfile profile={profile} jsonLd={founderJsonLd} />;

export default Founder;
