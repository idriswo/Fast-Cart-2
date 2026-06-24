export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="skeleton h-64 w-full rounded-md" />
      <div className="flex flex-col gap-2 pt-4">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-4 w-1/4" />
      </div>
    </div>
  );
}
