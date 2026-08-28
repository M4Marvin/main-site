export function PageMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "page-mark-clip page-mark-clip-compact" : "page-mark-clip"} aria-hidden="true">
      <div className="page-mark">
        <div className="page-mark-axis page-mark-axis-x" />
        <div className="page-mark-axis page-mark-axis-y" />
        <div className="page-mark-ring page-mark-ring-x" />
        <div className="page-mark-ring page-mark-ring-y" />
        <div className="page-mark-outer" />
      </div>
    </div>
  )
}
