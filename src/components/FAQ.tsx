import { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { faqs } from "@/data/faqs";
import SectionHeader from "@/components/SectionHeader";

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-light" ref={ref}>
      <div className="container px-4">
        <SectionHeader
          eyebrow="Support"
          title="Frequently Asked"
          highlight="Questions"
          description="Everything you need to know about joining and participating in Zaviah."
        />

        <div className="mx-auto flex max-w-3xl flex-col gap-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className={cn("faq-item", isOpen && "faq-item-open")}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-6 py-5 text-left"
                >
                  <span className="flex-1 text-[15px] font-semibold leading-snug text-foreground sm:text-base">
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/15 transition-all duration-300",
                      isOpen ? "rotate-45 bg-primary text-primary-foreground" : "bg-primary/5 text-primary",
                    )}
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-primary/10 px-6 pb-6 pt-4">
                        <p className="text-sm leading-[1.75] text-muted-foreground sm:text-[15px]">{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
