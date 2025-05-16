import Link from "next/link";
import TableOfContents from "@/components/legal/TableOfContents";

const tableOfContents = [
  { href: "#introduction", label: "Introduction" },
  { href: "#grant-of-license", label: "Grant of License" },
  { href: "#restrictions", label: "Restrictions" },
  { href: "#ownership", label: "Ownership" },
  { href: "#termination", label: "Termination" },
  { href: "#disclaimer", label: "Disclaimer" },
];

const UseLicensePage = () => {
  return (
    <div className="container flex py-20">
      <aside className="w-64 hidden md:block">
        <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
        <TableOfContents items={tableOfContents} />
      </aside>
      <div className="flex-1 ml-8">
        <h1 className="text-4xl font-bold mb-8">Use License</h1>

        <section id="introduction" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            This Use License governs your use of our AI chat platform. By accessing or using our services, you agree to comply with this license.
          </p>
        </section>

        <section id="grant-of-license" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. Grant of License</h2>
          <p>
            We grant you a limited, non-exclusive, non-transferable license to use our AI chat platform for personal or internal business purposes, subject to these terms.
          </p>
        </section>

        <section id="restrictions" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">3. Restrictions</h2>
          <p>
            You may not:
          </p>
          <ul>
            <li>Reverse engineer or attempt to extract the source code of our platform.</li>
            <li>Use our platform for any illegal or unauthorized purpose.</li>
            <li>Violate our <Link href="/legal/terms" className="text-primary">Terms of Service</Link>.</li>
          </ul>
        </section>

        <section id="ownership" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">4. Ownership</h2>
          <p>
            We retain all rights, title, and interest in and to our platform.
          </p>
        </section>

        <section id="termination" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">5. Termination</h2>
          <p>
            This license will terminate automatically if you violate these terms.
          </p>
        </section>

        <section id="disclaimer" className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">6. Disclaimer</h2>
          <p>
            Our platform is provided "as is" without warranties of any kind.
          </p>
        </section>
      </div>
    </div>
  );
};

export default UseLicensePage;
