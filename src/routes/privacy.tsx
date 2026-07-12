import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy, Clutch Score by ClutchFuel" },
      {
        name: "description",
        content: "How ClutchFuel collects, stores, and uses data from the Clutch Score assessment.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main id="main" className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-5 py-10 sm:py-16">
        <header className="mb-10 flex items-center justify-between gap-4">
          <Logo size="lg" />
          <span className="shrink-0 text-xs uppercase tracking-[0.22em] text-muted-foreground/70">
            Privacy Policy
          </span>
        </header>

        <section className="flex-1">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">Privacy Policy</h1>
          <p className="mt-3 text-sm text-muted-foreground/80">Last updated June 20, 2026</p>

          <div className="mt-8 flex flex-col gap-6 text-base leading-relaxed text-muted-foreground">
            <p>
              This page covers the Clutch Score assessment at this site. It does not cover other
              ClutchFuel products or sites.
            </p>

            <div>
              <h2 className="text-lg font-semibold text-foreground">What we collect</h2>
              <p className="mt-2">
                When you complete the assessment, we store your email address, your answers to the
                five hydration questions, your calculated Clutch Score and result, and any optional
                details you provide, first name and how you heard about Clutch Score. If you submit
                feedback on your result, we store that too.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Why we collect it</h2>
              <p className="mt-2">
                We use this information to show you your result, to understand how the assessment is
                performing during testing, and to follow up about your hydration strategy if you've
                opted in to hear from us. We do not sell this information.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Analytics cookies</h2>
              <p className="mt-2">
                If you accept analytics cookies in the banner shown on this site, we load Google
                Analytics to understand how people move through the assessment. This only happens
                after you accept, declining means no analytics script loads. Your choice is
                remembered on this device and you can change your mind by clearing your browser's
                local storage for this site.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">How we store it</h2>
              <p className="mt-2">
                Your responses are stored in a Supabase database. Submissions are write-once for
                feedback, once you submit a 👍/👎 or a note, that submission can't be modified
                again. We don't make your individual responses publicly readable.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Your choices</h2>
              <p className="mt-2">
                You can decline analytics cookies without affecting your ability to take the
                assessment or see your result. To request that your data be deleted, contact us and
                we'll remove it.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Questions</h2>
              <p className="mt-2">
                Reach out to ClutchFuel directly with any questions about this policy or your data.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-electric px-6 py-3 text-sm font-semibold text-black transition hover:bg-electric-dark"
            >
              Take the assessment
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
