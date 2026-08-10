import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for the MITERBOX website and contact form submissions.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-36">
        <article className="mx-auto max-w-2xl">
          <SectionHeading title="Terms of Service" />
          <p className="type-meta mt-4 text-charcoal/45">
            Last updated: August 10, 2026
          </p>

          <div className="type-prose mt-10 space-y-10 text-[0.95rem] text-charcoal/70 sm:mt-12 sm:space-y-12 sm:text-lg">
            <p>
              By using this website and submitting a contact form, you agree to
              the following terms.
            </p>

            <section aria-labelledby="terms-use">
              <h2
                id="terms-use"
                className="font-serif text-xl tracking-tight text-charcoal sm:text-2xl"
              >
                1. Use of the Website
              </h2>
              <p className="mt-3 sm:mt-4">
                This website is provided for informational purposes and to allow
                visitors to inquire about our services. You agree to use the site
                only for lawful purposes.
              </p>
            </section>

            <section aria-labelledby="terms-contact-form">
              <h2
                id="terms-contact-form"
                className="font-serif text-xl tracking-tight text-charcoal sm:text-2xl"
              >
                2. Contact Form Submissions
              </h2>
              <p className="mt-3 sm:mt-4">
                When you submit a contact form, you agree that the information
                you provide is accurate to the best of your knowledge. We will
                use that information solely to respond to your inquiry and
                provide the services you requested.
              </p>
            </section>

            <section aria-labelledby="terms-availability">
              <h2
                id="terms-availability"
                className="font-serif text-xl tracking-tight text-charcoal sm:text-2xl"
              >
                3. No Guarantee of Availability
              </h2>
              <p className="mt-3 sm:mt-4">
                We accept a limited number of projects. Submitting a form does
                not guarantee that we will be able to take on your project.
              </p>
            </section>

            <section aria-labelledby="terms-ip">
              <h2
                id="terms-ip"
                className="font-serif text-xl tracking-tight text-charcoal sm:text-2xl"
              >
                4. Intellectual Property
              </h2>
              <p className="mt-3 sm:mt-4">
                All content on this website, including text, design, and images,
                is owned by us or used with permission. You may not copy or reuse
                content without written permission.
              </p>
            </section>

            <section aria-labelledby="terms-liability">
              <h2
                id="terms-liability"
                className="font-serif text-xl tracking-tight text-charcoal sm:text-2xl"
              >
                5. Limitation of Liability
              </h2>
              <p className="mt-3 sm:mt-4">
                We are not liable for any damages arising from your use of this
                website or from any communications that result from a form
                submission.
              </p>
            </section>

            <section aria-labelledby="terms-changes">
              <h2
                id="terms-changes"
                className="font-serif text-xl tracking-tight text-charcoal sm:text-2xl"
              >
                6. Changes to These Terms
              </h2>
              <p className="mt-3 sm:mt-4">
                We may update these Terms of Service from time to time. The
                updated version will be posted on this page.
              </p>
            </section>

            <section aria-labelledby="terms-contact">
              <h2
                id="terms-contact"
                className="font-serif text-xl tracking-tight text-charcoal sm:text-2xl"
              >
                7. Contact
              </h2>
              <p className="mt-3 sm:mt-4">
                If you have any questions about these Terms, please contact us
                using the information on our website.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
