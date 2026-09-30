import React from "react";
import {
  GiChefToque,
  GiFruitBowl,
  GiFlame,
  GiHeartBeats,
} from "react-icons/gi";

const features = [
  {
    icon: <GiFruitBowl />,
    title: "Fresh Ingredients",
    description:
      "We carefully select fresh, quality ingredients to bring natural flavor to every plate.",
  },
  {
    icon: <GiFlame />,
    title: "Bold Flavors",
    description:
      "Our signature spices and recipes create rich, memorable flavors in every bite.",
  },
  {
    icon: <GiChefToque />,
    title: "Expertly Prepared",
    description:
      "Every dish is crafted with skill, attention to detail, and genuine passion.",
  },
  {
    icon: <GiHeartBeats />,
    title: "You Come First",
    description:
      "From our kitchen to your table, your satisfaction is at the heart of everything we do.",
  },
];

const AboutUs = () => {
  return (
    <section className="relative overflow-hidden bg-[#fffaf4] py-10 sm:pb-12 lg:pb-16">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-10 h-64 w-64 rounded-full bg-[#f97316]/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#7a2e0e]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
        {/* Heading */}
        <div className="mb-6 text-center">
          <p className="mb-2 inline-flex w-fit items-center rounded-full border border-[#f3c58f] bg-[#fff1d8] px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#f97316] sm:text-sm">
            Our Story
          </p>

          <h2 className="text-3xl font-bold text-[#7a2e0e] sm:text-4xl md:text-5xl">
            About Us
          </h2>

          <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-[#f97316]" />
        </div>

        {/* MAIN SECTION */}
        <div className="grid overflow-hidden rounded-[1.75rem] border border-[#ead7c3] bg-white shadow-[0_20px_60px_rgba(95,36,13,0.07)] lg:grid-cols-[0.9fr_1.1fr]">
          {/* LEFT - IMAGE COLLAGE */}
          <div className="relative min-h-120 overflow-hidden bg-[#7a2e0e] p-5 sm:min-h-130 sm:p-7 lg:min-h-142.5">
            {/* Top Brand */}
            <div className="relative z-20 flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#f9c27d] sm:text-xs">
                  Welcome to
                </p>

                <h3 className="mt-1 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  LAZIZ
                </h3>

                <div className="mt-2 h-1 w-10 rounded-full bg-[#f97316]" />
              </div>
            </div>

            {/* Image Collage */}
            <div className="absolute inset-x-5 bottom-5 top-36 sm:inset-x-7 sm:bottom-7 sm:top-40">
              {/* Main Image */}
              <div className="absolute left-0 top-0 h-[62%] w-[64%] overflow-hidden rounded-3xl border-4 border-white/10 shadow-2xl">
                <img
                  src="/gallery/c1.jpg"
                  alt="Fresh food at LAZIZ"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Top Right */}
              <div className="absolute right-0 top-[5%] h-[38%] w-[32%] overflow-hidden rounded-3xl border-4 border-white/10 shadow-2xl">
                <img
                  src="/gallery/f4.jpg"
                  alt="Delicious restaurant dish"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>

              {/* Bottom Right */}
              <div className="absolute bottom-0 right-0 h-[48%] w-[45%] overflow-hidden rounded-3xl border-4 border-white/10 shadow-2xl">
                <img
                  src="/gallery/f1.jpg"
                  alt="Food served at LAZIZ"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute bottom-[8%] left-[42%] z-10 flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 border-[#7a2e0e] bg-[#fff1d8] text-center shadow-xl sm:h-24 sm:w-24">
                <span className="text-xl font-bold text-[#7a2e0e] sm:text-2xl">
                  100%
                </span>

                <span className="text-[8px] font-semibold uppercase tracking-widest text-[#9c5a0e]">
                  Made Fresh
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT - STORY */}
          <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-12">
            <span className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#f97316]">
              The LAZIZ Philosophy
            </span>

            <h3 className="max-w-xl font-serif text-3xl font-bold leading-tight text-[#5f240d] sm:text-4xl lg:text-5xl">
              Good food starts with{" "}
              <span className="text-[#f97316]">great ingredients.</span>
            </h3>

            <div className="mt-5 max-w-xl space-y-4 text-sm leading-7 text-[#6d5747] sm:text-base sm:leading-7">
              <p>
                LAZIZ was created with one simple idea: serve fresh, flavorful
                food that people genuinely love.
              </p>

              <p>
                From the ingredients we carefully select to the way every dish
                is prepared, we believe great food should be made with quality,
                passion, and attention to detail.
              </p>

              <p>
                Whether you're joining us for a quick meal or sharing a
                memorable moment with family and friends, we want every visit
                to feel special.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-6 flex items-center gap-3 border-t border-[#ead7c3] pt-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff1d8] text-[#9c5a0e]">
                <GiHeartBeats className="text-lg" />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#5f240d]">
                  Made with passion
                </p>

                <p className="text-xs text-[#8a7463]">
                  Served with care, every single day.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-[#ead7c3] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#f3c58f] hover:shadow-[0_15px_35px_rgba(95,36,13,0.08)]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff1d8] text-xl text-[#9c5a0e] transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>

              <h4 className="text-base font-bold text-[#5f240d] sm:text-lg">
                {feature.title}
              </h4>

              <p className="mt-2 text-sm leading-6 text-[#765f4e]">
                {feature.description}
              </p>

              <div className="mt-4 h-0.5 w-7 bg-[#f97316] transition-all duration-300 group-hover:w-12" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;