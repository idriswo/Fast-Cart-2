export default function SectionHead({
  tag,
  title,
}: {
  tag: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-2" data-aos="fade-right">
      <div className="flex items-center gap-3">
        <span className="h-10 w-5 rounded-sm bg-brand" />
        <span className="text-sm font-semibold text-brand">{tag}</span>
      </div>
      <h2 className="text-3xl font-bold tracking-wide text-neutral-900 sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
