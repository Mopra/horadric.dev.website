import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy: Horadric",
  description: "What Horadric does with your data, including the optional Google Drive backup.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <main className="privacy">
      <h1>Privacy</h1>
      <p className="dim">Last updated 16 October 2026</p>

      <h2>The app</h2>
      <p>
        Horadric is a desktop app that runs on your own computer. It has no servers of its own that receive your
        data. It has no telemetry, no analytics and no crash reporting.
      </p>
      <p>
        It checks for updates once a day by asking GitHub for the latest release, so GitHub sees your IP address.
        Nothing else about you is sent.
      </p>

      <h2>Backup to Google Drive</h2>
      <p>
        Backup is optional and off until you turn it on. If you do, you sign in with Google, and Horadric asks for
        two things only: the <code>drive.file</code> scope, which lets it see and change only the files it created
        itself, never your other Drive files, and your email address, to show which account is connected.
      </p>
      <p>
        Backups are encrypted on your machine with AES-256-GCM, using a passphrase you choose, before they are
        uploaded. Neither Google nor anyone else can read them. The sign in token is stored in Windows Credential
        Manager on your machine.
      </p>
      <p>
        You can sign out in Horadric&apos;s Settings, and revoke access at any time at{" "}
        <a href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</a>.
      </p>

      <h2>Google user data</h2>
      <p>
        Horadric&apos;s use and transfer of information received from Google APIs adheres to the{" "}
        <a href="https://developers.google.com/terms/api-services-user-data-policy">
          Google API Services User Data Policy
        </a>
        , including the Limited Use requirements.
      </p>
      <p>
        Data from Google is used only to store and restore your own backups. It is never sold, never used for ads
        and never read by people.
      </p>

      <h2>This website</h2>
      <p>horadric.dev uses Google Analytics to count visits. The app does not.</p>

      <h2>Contact</h2>
      <p>
        <a href="mailto:mortenprads@gmail.com">mortenprads@gmail.com</a>
      </p>
    </main>
  );
}
