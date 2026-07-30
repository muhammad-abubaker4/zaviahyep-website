import { useCallback, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import SectionHeader from "@/components/SectionHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mentorImages } from "@/data/mentors";
import { cn } from "@/lib/utils";
import rajaZeeshan from "@/assets/testimonials/raja-zeeshan.jpeg";
import abubakerSadiq from "@/assets/testimonials/abubaker-sadiq.jpeg";
import hibaSyedTestimonial from "@/assets/testimonials/hiba-syed.jpg";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  image?: string;
  imageClass?: string;
};

const facePhotoClass = "h-full w-full rounded-full object-cover object-center scale-110";

const testimonials: Testimonial[] = [
  {
    quote:
      "Zaviah is a wonderful platform where anyone can freely ask questions and receive insightful guidance. The weekend sessions with experienced mentors have been a truly valuable learning opportunity for me.",
    name: "Yasmeen Zehra",
    role: "Member, Gilgit Baltistan",
    initials: "YZ",
  },
  {
    quote:
      "Zaviah's dedication to inspiring and uplifting youth is making a deeply meaningful difference. Their commitment to developing young leaders and driving positive change is truly commendable.",
    name: "Raja Zeeshan",
    role: "Member, Attock",
    initials: "RZ",
    image: rajaZeeshan,
    imageClass: facePhotoClass,
  },
  {
    quote:
      "Zaviah has become my favorite organization and the platform I consistently rely on. The level of expertise they bring to their sessions is outstanding.",
    name: "Abubaker Sadiq",
    role: "Member, Swat",
    initials: "AS",
    image: abubakerSadiq,
    imageClass: facePhotoClass,
  },
  {
    quote:
      "Zaviah is an excellent online platform that strongly encourages youth and women's participation. As a mentor, I love how it allows us to seamlessly deliver lectures and connect with new minds.",
    name: "Hiba Syed",
    role: "Mentor, Karachi",
    initials: "HS",
    image: hibaSyedTestimonial,
    imageClass: `${facePhotoClass} object-[center_18%]`,
  },
  {
    quote:
      "Zaviah is a phenomenal platform filled with highly talented, capable, and respectful youth. I highly commend this initiative and wish the team continued success.",
    name: "Amna Sardar",
    role: "MPA & Guest Speaker",
    initials: "Am",
    image: mentorImages.amnaSardar,
    imageClass: `${facePhotoClass} object-[center_12%]`,
  },
  {
    quote:
      "You guys are doing a great job, and I am very happy to be a part of it. Zaviah is a fantastic initiative, and I want to thank the team for inviting me.",
    name: "Dr. Sassi Sher Malik",
    role: "CSS Officer & Guest Speaker",
    initials: "SM",
    image: mentorImages.drSassiMalikSher,
    imageClass: `${facePhotoClass} object-[center_22%]`,
  },
  {
    quote:
      "Words have always been my greatest strength, and Zaviah gave me the platform to turn them into a voice that could inspire others. I am forever grateful to be part of this journey.",
    name: "Arbeeha Zahid",
    role: "Member, Kashmir",
    initials: "AZ",
    image: mentorImages.arbeehaZahid,
    imageClass: `${facePhotoClass} object-[center_18%]`,
  },
];

const TestimonialCard = ({ item, isActive }: { item: Testimonial; isActive: boolean }) => (
  <blockquote
    className={cn(
      "testimonial-card-modern flex h-full flex-col transition-all duration-500",
      isActive ? "scale-100 opacity-100" : "scale-[0.94] opacity-60",
    )}
  >
    <Quote className="mb-4 h-6 w-6 text-primary/25" aria-hidden />
    <p className="flex-1 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
      &ldquo;{item.quote}&rdquo;
    </p>
    <footer className="mt-6 flex items-center gap-3 border-t border-primary/10 pt-5">
      <Avatar className="h-11 w-11 shrink-0 rounded-full ring-2 ring-primary/15 ring-offset-2 ring-offset-card">
        {item.image && (
          <AvatarImage
            src={item.image}
            alt={`${item.name}, ${item.role}`}
            className={item.imageClass ?? facePhotoClass}
            loading="lazy"
            width={44}
            height={44}
          />
        )}
        <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
          {item.initials}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <cite className="block font-bold not-italic tracking-tight text-foreground">{item.name}</cite>
        <p className="mt-0.5 text-xs leading-snug text-muted-foreground sm:text-sm">{item.role}</p>
      </div>
    </footer>
  </blockquote>
);

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => window.clearInterval(timer);
  }, [emblaApi, prefersReducedMotion]);

  return (
    <section id="testimonials" className="section-light overflow-hidden" ref={ref}>
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div className="container relative px-4">
        <SectionHeader
          eyebrow="Testimonials"
          title="Voices from Our"
          highlight="Community"
          description="Real stories from members, mentors, and guest speakers in the Zaviah network."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5 }}
          className="relative -mx-4 w-[calc(100%+2rem)] max-w-none px-4 sm:-mx-6 sm:w-[calc(100%+3rem)] sm:px-6 lg:mx-0 lg:w-full lg:px-0"
        >
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-primary/15 bg-card/95 text-primary shadow-soft backdrop-blur-sm transition-colors hover:bg-primary/5"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-primary/15 bg-card/95 text-primary shadow-soft backdrop-blur-sm transition-colors hover:bg-primary/5"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div ref={emblaRef} className="overflow-hidden" aria-label="Community testimonials carousel">
            <div className="flex touch-pan-y">
              {testimonials.map((item, index) => (
                <div
                  key={item.name}
                  className="min-w-0 shrink-0 grow-0 basis-[88%] px-2 sm:basis-[50%] md:basis-[25%] lg:basis-[20%]"
                >
                  <TestimonialCard item={item} isActive={index === selectedIndex} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Go to ${item.name}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === selectedIndex ? "w-8 bg-primary" : "w-1.5 bg-primary/25 hover:bg-primary/40",
                )}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
