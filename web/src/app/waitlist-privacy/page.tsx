import { Footer } from "@/components/Footer";
export default function WaitlistPrivacy() {
  return (
    <>
      <main id="main" className="section" style={{ paddingTop: 140 }}>
        <article className="wrap" style={{ maxWidth: 800 }}>
          <p className="section-kicker">EXÉGEOMAI · LAUNCH NOTIFICATIONS</p>
          <h1 style={{ fontSize: 42, lineHeight: 1.2, marginBottom: 24 }}>
            Your email. Your choice.
          </h1>
          <p>
            The waiting list is separate from exégeomai app accounts. This
            notice describes only the launch-notification list. For the app and
            other services, see our{" "}
            <a href="/privacy" style={{ textDecoration: "underline" }}>
              Privacy Policy
            </a>
            .
          </p>
          <h2 style={{ marginTop: 36 }}>What we collect</h2>
          <p>
            We store your email address, the time you consented, the version of
            the consent wording, and the signup source. We normalise emails to
            prevent duplicate subscriptions. You do not need an app account.
          </p>
          <h2 style={{ marginTop: 36 }}>Why and where we store it</h2>
          <p>
            With your consent, we use your address to notify you about the
            exégeomai launch. Records are stored in our existing Supabase
            project, with the live hosting region and transfer arrangements available from the team and access restricted to
            authorised server operations and administrators. Your address is not
            publicly readable and is not sold or used to sign you up for
            unrelated marketing.
          </p>
          <h2 style={{ marginTop: 36 }}>Abuse prevention</h2>
          <p>
            Our server processes your IP address to limit repeated requests. The
            waitlist database stores a keyed hash of that address in short-lived
            rate-limit buckets, not the raw IP address. Expired buckets are
            cleared during subsequent submissions. The hosting provider may also
            process standard security and access logs under its own retention
            settings.
          </p>
          <h2 style={{ marginTop: 36 }}>Unsubscribe or request deletion</h2>
          <p>
            Email{" "}
            <a
              href="mailto:joinus@exegeomai.co.za?subject=Unsubscribe%20from%20waitlist"
              style={{ textDecoration: "underline" }}
            >
              joinus@exegeomai.co.za
            </a>{" "}
            from the address you registered, with the subject “Unsubscribe from
            waitlist”. The team will remove your waiting-list record. You can
            also contact this address to request access to or correction of your
            data. Unsubscribing from launch notifications does not delete an app
            account.
          </p>
          <h2 style={{ marginTop: 36 }}>Retention and notifications</h2>
          <p>
            We keep your record while the launch-notification list is active,
            unless you ask us to remove it sooner. The team will delete the list
            within 90 days after the final launch notification, or if the
            launch-notification programme is cancelled. When email delivery is configured, Resend can send a confirmation to you and a signup notification to the authorised team. Email delivery can fail independently of registration. Notification messages provide an unsubscribe route.
          </p>
          <p style={{ marginTop: 32 }}>
            Notice and consent version: launch-v1 · 13 October 2026
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
