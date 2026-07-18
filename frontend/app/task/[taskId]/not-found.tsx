export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h1 className="text-3xl font-bold">Task Not Found</h1>
      <p className="mt-2 text-muted-foreground">
        The task you&apos;re looking for doesn&apos;t exist.
      </p>
    </div>
  );
}