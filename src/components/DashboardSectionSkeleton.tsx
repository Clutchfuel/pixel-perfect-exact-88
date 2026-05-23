export function DashboardSectionSkeleton() {
  return (
    <section className="bg-dark py-24 md:py-32" aria-hidden="true">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="h-12 max-w-xl animate-pulse rounded-xl bg-white/10" />
        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <div className="h-[420px] animate-pulse rounded-3xl bg-white/5 lg:col-span-5" />
          <div className="grid gap-5 lg:col-span-7">
            <div className="grid gap-5 sm:grid-cols-5">
              <div className="h-48 animate-pulse rounded-3xl bg-white/5 sm:col-span-2" />
              <div className="h-48 animate-pulse rounded-3xl bg-white/5 sm:col-span-3" />
            </div>
            <div className="h-52 animate-pulse rounded-3xl bg-white/5" />
          </div>
        </div>
      </div>
    </section>
  );
}
