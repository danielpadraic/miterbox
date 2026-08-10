import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How MITERBOX collects, uses, and protects information submitted through our website contact form.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-36">
        <article className="mx-auto max-w-2xl">
          <SectionHeading title="Privacy Policy" />
          <p className="type-meta mt-4 text-charcoal/45">
            Last updated: August 10, 2026
          </p>

          <div className="type-prose mt-10 space-y-10 text-[0.95rem] text-charcoal/70 sm:mt-12 sm:space-y-12 sm:text-lg">
            <p>
              This Privacy Policy describes how we collect, use, and protect
              your information when you visit our website and submit a contact
              form.
            </p>

            <section aria-labelledby="privacy-collect">
              <h2
                id="privacy-collect"
                className="font-serif text-xl tracking-tight text-charcoal sm:text-2xl"
              >
                Information We Collect
              </h2>
              <p className="mt-3 sm:mt-4">
                When you submit a contact form on our website, we may collect
                the following information:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 sm:mt-4">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Project details or message</li>
                <li>Location (city)</li>
              </ul>
            </section>

            <section aria-labelledby="privacy-use">
              <h2
                id="privacy-use"
                className="font-serif text-xl tracking-tight text-charcoal sm:text-2xl"
              >
                How We Use Your Information
              </h2>
              <p className="mt-3 sm:mt-4">
                We use the information you provide solely to:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 sm:mt-4">
                <li>Respond to your inquiry</li>
                <li>Communicate with you about your project</li>
                <li>Provide the services you requested</li>
              </ul>
              <p className="mt-3 sm:mt-4">
                We do not sell, rent, or share your personal information with
                third parties for marketing purposes.
              </p>
            </section>

            <section aria-labelledby="privacy-sms">
              <h2
                id="privacy-sms"
                className="font-serif text-xl tracking-tight text-charcoal sm:text-2xl"
              >
                SMS / Text Messaging
              </h2>
              <p className="mt-3 sm:mt-4">
                If you provide a phone number on our contact form, it may be
                used to send internal notification messages to our team
                regarding your inquiry. We do not send marketing text messages
                to website visitors.
              </p>
            </section>

            <section aria-labelledby="privacy-security">
              <h2
                id="privacy-security"
                className="font-serif text-xl tracking-tight text-charcoal sm:text-2xl"
              >
                Data Storage &amp; Security
              </h2>
              <p className="mt-3 sm:mt-4">
                We take reasonable measures to protect the information you
                submit. Form submissions are processed securely and are only
                accessible to authorized team members.
              </p>
            </section>

            <section aria-labelledby="privacy-choices">
              <h2
                id="privacy-choices"
                className="font-serif text-xl tracking-tight text-charcoal sm:text-2xl"
              >
                Your Choices
              </h2>
              <p className="mt-3 sm:mt-4">
                You may contact us at any time to request that we update or
                delete the information you have provided.
              </p>
            </section>

            <section aria-labelledby="privacy-contact">
              <h2
                id="privacy-contact"
                className="font-serif text-xl tracking-tight text-charcoal sm:text-2xl"
              >
                Contact Us
              </h2>
              <p className="mt-3 sm:mt-4">
                If you have any questions about this Privacy Policy, please
                email us at the address listed on our website.
              </p>
            </section>

            <section aria-labelledby="privacy-changes">
              <h2
                id="privacy-changes"
                className="font-serif text-xl tracking-tight text-charcoal sm:text-2xl"
              >
                Changes to This Policy
              </h2>
              <p className="mt-3 sm:mt-4">
                We may update this Privacy Policy from time to time. The updated
                version will be posted on this page.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
