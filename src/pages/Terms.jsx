/* /terms — light terms of use for a personal portfolio site. */
import LegalLayout, { LegalSection } from '../components/LegalLayout.jsx';

export default function Terms() {
  return (
    <LegalLayout
      index="07" path="/terms" title="Terms of " accentWord="use."
      lead="The ground rules for using this site."
      updated="30 June 2026"
    >
      <LegalSection heading="Scope">
        <p>
          These terms govern your use of this personal portfolio site. By using the site you accept
          them. If you do not agree, please do not use the site.
        </p>
      </LegalSection>

      <LegalSection heading="Use of the site">
        <p>
          The site is provided for information and to let you get in touch. You agree not to misuse
          it, including attempting to disrupt it, probe it for vulnerabilities without permission, or
          submit unlawful, abusive, or spam content through the contact form.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual property">
        <p>
          The content, design, and code are owned by Maurice Däppen unless stated otherwise. You may
          view and share links to the site, but you may not copy or reuse substantial parts without
          permission.
        </p>
      </LegalSection>

      <LegalSection heading="No warranty">
        <p>
          The site is provided as is, without warranty of any kind. Availability and accuracy are not
          guaranteed, and the site may change or be taken offline at any time.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          Swiss law applies, to the extent permitted. Mandatory consumer protection rules of your
          place of residence remain unaffected.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
