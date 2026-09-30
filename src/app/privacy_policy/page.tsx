import React from 'react';
import { MdOutlinePrivacyTip } from 'react-icons/md';

const page = () => {
  return (
    <div className="min-h-screen bg-[#fffaf5] px-4 py-10 text-[#4a2d1c] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-[#f3c58f] bg-white/90 p-6 shadow-[0_12px_35px_rgba(122,46,14,0.08)] sm:p-8 lg:p-10">
        <h1 className="flex items-center gap-3 text-2xl font-bold leading-tight text-[#7a3d16] underline sm:text-3xl xl:text-4xl">
          <span className="rounded-full bg-[#fff0e6] p-3 text-2xl">
            <MdOutlinePrivacyTip />
          </span>
          Privacy and Policy
        </h1>

        <p className="mt-6 text-sm leading-7 text-[#6b4a32] sm:text-base">
          At our restaurant, we value your privacy and are committed to protecting your personal data.
          This Privacy Policy explains what information we collect, how we use it, and the choices
          you have regarding your information when you visit our website or place an order.
        </p>

        <div className="mt-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-[#7a3d16]">1. Information We Collect</h2>
            <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
              We may collect your name, email address, phone number, delivery address, order details,
              and payment information when you place an order or contact us. We may also collect
              usage information such as browser type and IP address for security and analytics.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#7a3d16]">2. How We Use Your Information</h2>
            <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
              Your information is used to process orders, provide customer support, improve our
              services, send order updates, and ensure a safe and secure experience on our website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#7a3d16]">3. Cookies and Tracking</h2>
            <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
              We use cookies to remember your preferences, keep your cart intact, and understand how
              visitors use our website. You can disable cookies in your browser settings, though some
              features may not work properly.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#7a3d16]">4. Data Security</h2>
            <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
              We take reasonable steps to protect your personal information from unauthorized access,
              disclosure, or misuse. However, no method of transmission over the internet is completely
              secure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#7a3d16]">5. Your Rights</h2>
            <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
              You may request access to, correction of, or deletion of your personal information by
              contacting us. We will respond to valid requests in accordance with applicable law.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#7a3d16]">6. Contact Us</h2>
            <p className="mt-2 text-sm leading-7 text-[#6b4a32] sm:text-base">
              If you have any questions about this Privacy Policy or how we handle your information,
              please contact us through our website contact page or customer support channel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;