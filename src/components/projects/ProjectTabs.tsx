type Tab = 'personal' | 'bootcamp'

export default function ProjectTabs({
  activeTab,
  onChange,
}: {
  activeTab: Tab
  onChange: (tab: Tab) => void
}) {
  return (
    <div className="flex justify-center mb-20">
      <div className="flex border border-[var(--color-border)] rounded-full p-2 gap-2">
        {(['personal', 'bootcamp'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={[
              'font-mono text-sm tracking-[0.2em] uppercase rounded-full transition-all duration-200 cursor-pointer !px-8 !py-2.5',
              activeTab === tab
                ? 'bg-[var(--color-accent)] text-white'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-accent)]',
            ].join(' ')}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}
