import Link from "next/link";
import TableOfContents from "@/components/legal/TableOfContents";

const tableOfContents = [
  { href: "#introduction", label: "Introduction" },
  { href: "#information-we-collect", label: "Information We Collect" },
  { href: "#how-we-use-your-information", label: "How We Use Your Information" },
  { href: "#data-security", label: "Data Security" },
  { href: "#data-sharing", label: "Data Sharing" },
  { href: "#ccpa-compliance", label: "CCPA Compliance" },
  { href: "#gdpr-compliance", label: "GDPR Compliance" },
  { href: "#your-rights", label: "Your Rights" },
  { href: "#contact-us", label: "Contact Us" },
];

const PrivacyPolicyPage = () => {
  return (
    <div className="container flex py-20">
      <aside className="w-64 hidden md:block">
        <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
        <TableOfContents items={tableOfContents} />
      </aside>
      <div className="flex-1 ml-8">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <section id="introduction" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            This Privacy Policy describes how we collect, use, and share your information when you use our AI chat platform. We are committed to protecting your privacy and ensuring the security of your personal information.
          </p>
        </section>

        <section id="information-we-collect" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <p>
            We collect the following types of information:
          </p>
          <ul>
            <li>Account Information: Email address, username, and password (hashed).</li>
            <li>Conversation Data: Chat logs stored via our <Link href="/api/chat" className="text-primary">API routes</Link> and managed in our Prisma schema.</li>
            <li>Usage Data: Information about how you use our platform.</li>
          </ul>
        </section>

        <section id="how-we-use-your-information" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p>
            We use your information to:
          </p>
          <ul>
            <li>Provide and improve our platform.</li>
            <li>Personalize your experience.</li>
            <li>Communicate with you.</li>
          </ul>
        </section>

        <section id="data-security" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p>
            We implement security measures to protect your information, including encryption and access controls. Our authentication is handled by NextAuth.js via our <a href="auth/login" className="text-primary">API route</a>.
          </p>
        </section>

        <section id="data-sharing" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">5. Data Sharing</h2>
          <p>
            We do not share your personal information with third parties except as described in this policy (e.g., with service providers).
          </p>
        </section>

        <section id="ccpa-compliance" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">6. CCPA Compliance (For California Residents)</h2>
          <p>
            As a Canadian company, we strive to comply with the California Consumer Privacy Act (CCPA) to the extent applicable. California residents have specific rights regarding their personal information.
          </p>
          <ul>
            <li>Right to Know: You have the right to request information about the categories and specific pieces of personal information we have collected about you.</li>
            <li>Right to Delete: You have the right to request that we delete your personal information, subject to certain exceptions.</li>
            <li>Right to Opt-Out: You have the right to opt-out of the sale of your personal information. We do not sell your personal information.</li>
          </ul>
        </section>

        <section id="gdpr-compliance" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">7. GDPR Compliance (For European Residents)</h2>
          <p>
            As a Canadian company, we also strive to comply with the General Data Protection Regulation (GDPR) to the extent applicable. European residents have specific rights regarding their personal information.
          </p>
          <ul>
            <li>Right to Access: You have the right to access your personal data and receive information about how we are processing it.</li>
            <li>Right to Rectification: You have the right to correct inaccurate personal data that we hold about you.</li>
            <li>Right to Erasure: You have the right to have your personal data erased under certain circumstances.</li>
            <li>Right to Restrict Processing: You have the right to restrict the processing of your personal data under certain circumstances.</li>
            <li>Right to Data Portability: You have the right to receive your personal data in a structured, commonly used, and machine-readable format and have the right to transmit that data to another controller.</li>
            <li>Right to Object: You have the right to object to the processing of your personal data under certain circumstances.</li>
          </ul>
        </section>

        <section id="your-rights" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">8. Your Rights</h2>
          <p>
            You have the right to access, correct, and delete your information.
          </p>
        </section>

        <section id="contact-us" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
