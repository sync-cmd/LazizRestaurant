const contactDetails = [
  {
    title: "Call us",
    value: "+91 82351 12934",
    icon: "fa-phone",
    href: "tel:+918235112934",
  },
  {
    title: "Email us",
    value: "1998aadityaraj2007@gmail.com",
    icon: "fa-envelope",
    href: "mailto:1998aadityaraj2007@gmail.com",
  },
  {
    title: "Visit us",
    value: "28A, Patliputra Colony Road, Patna",
    icon: "fa-location-dot",
    href: "https://maps.app.goo.gl/sh1WXxujP6ppdAeVA",
  },
  {
    title: "Hours",
    value: "Mon - Sat • 10:00 AM - 10:00 PM",
    icon: "fa-clock",
    href: "#hours",
  },
];

const quickActions = [
  {
    label: "Order Online",
    href: "/menu",
  },
  {
    label: "Leave Suggestion",
    href: "mailto:1998aadityaraj2007@gmail.com",
  },
];

const formFields = [
  { label: "Full name", type: "text", placeholder: "Aaditya Raj" },
  { label: "Email address", type: "email", placeholder: "you@example.com" },
  { label: "Phone number", type: "tel", placeholder: "+91 98765 43210" },
];

export default function Contact() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="mx-auto flex max-w-7xl flex-col gap-6 rounded-4xl border border-[#f4d8b3] bg-[rgba(255,248,239,0.82)] p-6 shadow-[0_20px_60px_rgba(122,61,22,0.08)] backdrop-blur md:p-8 lg:flex-row lg:gap-8 lg:p-10">
        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#f97316]">
              Contact us
            </p>
            <h1 className="text-3xl font-semibold text-[#7a3d16] sm:text-4xl">
              We would love to hear from you.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[#7a3d16]/80">
              Whether you are planning a cozy dinner, a celebration, or a quick bite,
              our team is ready to welcome you with warm hospitality and your favorite
              flavors.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {contactDetails.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="rounded-2xl border border-[#f3d7b0] bg-[#fffaf2] p-4 transition hover:-translate-y-0.5 hover:border-[#f97316] hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff2e6] text-[#f97316]">
                    <i className={`fa-solid ${item.icon}`} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#7a3d16]">{item.title}</p>
                    <p className="text-sm text-[#7a3d16]/75">{item.value}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="rounded-3xl border border-[#f4d8b3] bg-[#fff7eb] p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-semibold text-[#7a3d16]">Send us a message</h2>
            <p className="mt-2 text-sm leading-6 text-[#7a3d16]/75">
              Share your details and we will reach out as soon as possible.
            </p>

            <form className="mt-5 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {formFields.map((field) => (
                  <label key={field.label} className="block text-sm font-medium text-[#7a3d16]">
                    <span className="mb-2 block">{field.label}</span>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full rounded-xl border border-[#f0d3ae] bg-[#fffaf2] px-4 py-3 text-sm text-[#7a3d16] outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
                    />
                  </label>
                ))}
              </div>

              <label className="block text-sm font-medium text-[#7a3d16]">
                <span className="mb-2 block">Your message</span>
                <textarea
                  rows={4}
                  placeholder="Tell us about your visit, order, or special request..."
                  className="w-full rounded-xl border border-[#f0d3ae] bg-[#fffaf2] px-4 py-3 text-sm text-[#7a3d16] outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
                />
              </label>

              <button
                type="button"
                className="rounded-full bg-[#f97316] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#ea580c]"
              >
                Send request
              </button>
            </form>
          </div>
        </div>

        <aside className="w-full max-w-md rounded-[1.75rem] border border-[#f4d8b3] bg-[#fff7eb] p-6 shadow-sm">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f97316]">
              Visit us
            </p>
            <h2 className="text-2xl font-semibold text-[#7a3d16]">Come by for a warm meal.</h2>
            <p className="text-sm leading-7 text-[#7a3d16]/75">
              We are tucked away on Patliputra Colony Road, just behind Atal Park, and
              always ready to serve comforting food with great hospitality.
            </p>
          </div>

          <div id="hours" className="mt-6 rounded-2xl border border-[#f3d7b0] bg-[#fff2e6] p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f97316]">
              Opening hours
            </h3>
            <div className="mt-3 space-y-2 text-sm text-[#7a3d16]">
              <div className="flex items-center justify-between">
                <span>Monday - Saturday</span>
                <span className="font-semibold">10:00 AM - 10:00 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Sunday</span>
                <span className="font-semibold">Closed</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            {quickActions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="rounded-full border border-[#f4d8b3] bg-[#fffaf2] px-4 py-3 text-center text-sm font-semibold text-[#7a3d16] transition hover:border-[#f97316] hover:text-[#f97316]"
              >
                {action.label}
              </a>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
