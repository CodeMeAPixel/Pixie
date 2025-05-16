import Link from "next/link";
import TableOfContents from "@/components/legal/TableOfContents";

const tableOfContents = [
  { href: "#introduction", label: "Introduction" },
  { href: "#acceptance-of-terms", label: "Acceptance of Terms" },
  { href: "#description-of-service", label: "Description of Service" },
  { href: "#user-accounts", label: "User Accounts" },
  { href: "#acceptable-use", label: "Acceptable Use" },
  { href: "#termination", label: "Termination" },
  { href: "#disclaimer", label: "Disclaimer" },
  { href: "#governing-law", label: "Governing Law" },
];

const TermsOfServicePage = () => {
  return (
    <div className="container flex flex-col md:flex-row py-10 md:py-16">
      <aside className="w-full md:w-1/4 mb-8 md:mb-0 md:sticky md:top-10">
        <h3 className="text-xl font-semibold mb-4">Table of Contents</h3>
        <TableOfContents items={tableOfContents} />
      </aside>
      <div className="w-full md:w-3/4 md:ml-8">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

        <section id="introduction" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            Welcome to our AI chat platform. By accessing or using our services, you agree to comply with these Terms of Service. These terms govern your use of our platform and any related services.
          </p>
        </section>

        <section id="acceptance-of-terms" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. Acceptance of Terms</h2>
          <p>
            By accessing or using our AI chat platform, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use our platform.
          </p>
        </section>

        <section id="description-of-service" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">3. Description of Service</h2>
          <p>
            Our platform provides an AI chat service that allows users to engage in conversations with AI models. We offer various AI models with different capabilities.
          </p>
        </section>

        <section id="user-accounts" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">4. User Accounts</h2>
          <p>
            To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials.
          </p>
        </section>

        <section id="acceptable-use" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">5. Acceptable Use</h2>
          <p>
            You agree to use our platform in a manner that is lawful, respectful, and consistent with these Terms. Prohibited activities include:
          </p>
          <ul className="list-disc pl-6">
            <li>Engaging in any illegal or harmful activities.</li>
            <li>Attempting to disrupt the operation of our platform.</li>
            <li>Violating the privacy of other users.</li>
          </ul>
        </section>

        <section id="termination" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your account and access to the platform for violations of these Terms.
          </p>
        </section>

        <section id="disclaimer" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">7. Disclaimer</h2>
          <p>
            Our platform is provided "as is" without warranties of any kind.
          </p>
        </section>

        <section id="governing-law" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
          <p>
            These Terms are governed by the laws of Canada, specifically the laws of the Province of Alberta.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
