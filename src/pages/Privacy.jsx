/* /privacy — Datenschutzerklärung / privacy notice. Describes exactly what the
   contact form collects and how it is processed (GDPR Art. 13 + Swiss FADP). */
import { Link } from 'react-router-dom';
import LegalLayout, { LegalSection } from '../components/LegalLayout.jsx';

export default function Privacy() {
  return (
    <LegalLayout
      index="05" path="/privacy" title="Privacy " accentWord="notice."
      lead="What data this site collects, why, and the rights you have over it."
      updated="30 June 2026"
    >
      <LegalSection heading="Who is responsible">
        <p>
          The controller for data processed on this site is Maurice Däppen, Bern, Switzerland.
          You can reach me through the <Link className="ul-link" to="/contact" style={{ color: 'var(--accent)' }}>contact form</Link>.
        </p>
      </LegalSection>

      <LegalSection heading="The contact form">
        <p>When you send a message through the contact form, the following data is processed:</p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <li>Your name, so I know who I am replying to.</li>
          <li>Your email address, so I can reply.</li>
          <li>An optional subject and your message text.</li>
          <li>A one-way, salted hash of your IP address, kept only to limit spam and abuse. The raw IP address is never stored.</li>
        </ul>
        <p>
          This data is sent to my email inbox and written to a backup record so no enquiry is lost.
          It is used solely to handle your enquiry and is not used for advertising or shared with
          third parties for their own purposes.
        </p>
      </LegalSection>

      <LegalSection heading="Legal basis and retention">
        <p>
          Processing is based on your consent (Art. 6(1)(a) GDPR) given via the checkbox, and on
          steps taken at your request prior to any agreement (Art. 6(1)(b) GDPR). For visitors in
          Switzerland the equivalent provisions of the revised Federal Act on Data Protection apply.
        </p>
        <p>
          Messages in my inbox are kept only as long as needed to handle your request and any
          follow up, then deleted. The automatic backup record is deleted after at most 180 days.
          You can ask me to delete your data sooner at any time.
        </p>
      </LegalSection>

      <LegalSection heading="Hosting and delivery">
        <p>
          The contact backend runs on infrastructure under my control and sends notifications over an
          encrypted connection to an email provider acting as a processor on my behalf. Data is
          transmitted over TLS.
        </p>
      </LegalSection>

      <LegalSection heading="Embedded map">
        <p>
          The about page shows a small map of Bern embedded from the Swiss Federal Geoportal
          (map.geo.admin.ch), operated by swisstopo. To keep the page responsive the map may be
          loaded in the background while you browse. When it loads, your browser connects directly to
          that federal service, which necessarily receives your IP address and may set its own
          technical cookies solely to display the map. This is used only to render the map; I receive
          no data from it, and swisstopo&rsquo;s own privacy terms apply to that connection.
        </p>
      </LegalSection>

      <LegalSection heading="No tracking">
        <p>
          This site sets no advertising or analytics cookies of its own and does not profile
          visitors. Apart from the embedded map described above, only the strictly necessary requests
          to load the page and submit the form are made.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          You have the right to access, rectify, and erase your data, to restrict or object to its
          processing, and to data portability. You may withdraw consent at any time with future
          effect. You also have the right to lodge a complaint with a supervisory authority. To
          exercise any of these, reach me through the <Link className="ul-link" to="/contact" style={{ color: 'var(--accent)' }}>contact form</Link>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
