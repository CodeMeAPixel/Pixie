import Link from "next/link";
import TableOfContents from "@/components/legal/TableOfContents";

const tableOfContents = [
  { href: "#introduction", label: "Introduction" },
  { href: "#what-are-cookies", label: "What Are Cookies?" },
  { href: "#how-we-use-cookies", label: "How We Use Cookies" },
  { href: "#types-of-cookies", label: "Types of Cookies We Use" },
  { href: "#managing-cookies", label: "Managing Cookies" },
  { href: "#changes-to-this-policy", label: "Changes to This Policy" },
  { href: "#contact-us", label: "Contact Us" },
];

const CookiePolicyPage = () => {
  return (
    <div className="container flex py-20">
      <aside className="w-64 hidden md:block">
        <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
        <TableOfContents items={tableOfContents} />
      </aside>
      <div className="flex-1 ml-8">
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>

        <section id="introduction" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            This Cookie Policy explains how we use cookies and similar tracking technologies when you visit our website.
          </p>
        </section>

        <section id="what-are-cookies" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website. They help us understand how you interact with our site and improve your experience.
          </p>
        </section>

        <section id="how-we-use-cookies" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Cookies</h2>
          <p>
            We use cookies to:
          </p>
          <ul>
            <li>Remember your preferences and settings.</li>
            <li>Analyze website traffic and performance.</li>
            <li>Enhance security and detect fraudulent activity.</li>
          </ul>
        </section>

        <section id="types-of-cookies" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">4. Types of Cookies We Use</h2>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for the website to function properly.</li>
          </ul>
        </section>

        <section id="managing-cookies" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">5. Managing Cookies</h2>
          <p>
            You can manage your cookie preferences through your browser settings. Most browsers allow you to delete or block cookies.
          </p>
        </section>

        <section id="changes-to-this-policy" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">6. Changes to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. Any changes will be posted on this page.
          </p>
        </section>

        <section id="contact-us" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p>
            If you have any questions, please contact us.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
