export function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-10">
      <h2 className="bg-linear-to-b from-white to-neutral-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
        {title}
      </h2>
      <div className="mt-1 h-1 w-20 rounded-full bg-linear-to-r from-blue-500 to-violet-500" />
    </div>
  )
}