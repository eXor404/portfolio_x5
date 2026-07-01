/* /imprint — Impressum / legal disclosure for a non-commercial portfolio. No
   postal address is listed: the Swiss disclosure duty (UWG Art. 3(1)(s)) covers
   e-commerce, and identity + a contact route is enough here. */
import { Link } from 'react-router-dom';
import LegalLayout, { LegalSection } from '../components/LegalLayout.jsx';

export default function Imprint() {
  return (
    <LegalLayout
      index="06" path="/imprint" title="Legal " accentWord="notice."
      lead="Who runs this site and how to reach them."
    >
      <LegalSection heading="Operator and responsible for content">
        <p>
          Maurice Däppen<br />
          Bern, Switzerland
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Please reach me through the <Link className="ul-link" to="/contact" style={{ color: 'var(--accent)' }}>contact form</Link>.
        </p>
      </LegalSection>

      <LegalSection heading="Liability">
        <p>
          The content of this site is provided with care but without guarantee of accuracy or
          completeness. Links to external sites lead to content for which their respective operators
          are responsible. No liability is accepted for external content.
        </p>
      </LegalSection>

      <LegalSection heading="Copyright">
        <p>
          Unless stated otherwise, the content, design, and code of this site are the property of
          Maurice Däppen. Reuse beyond what the law permits requires prior written consent.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
