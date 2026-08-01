import LeaderProfile from "@/components/LeaderProfile";
import { profiles } from "@/data/profiles";
import { breadcrumbSchema, personSchema } from "@/lib/schema";

const profile = profiles.coFounder;

const coFounderJsonLd = [
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
    { name: "Co-Founder", path: profile.path },
  ]),
];

const CoFounder = () => <LeaderProfile profile={profile} jsonLd={coFounderJsonLd} />;

export default CoFounder;
