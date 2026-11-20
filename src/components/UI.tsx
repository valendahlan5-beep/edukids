import { useEffect, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Check,
  ChevronRight,
  CircleAlert,
  Info,
  Loader2,
  Search,
  Sparkles,
  X,
  type LucideIcon,
} from 'lucide-react'
import { cx, starsLabel } from '../lib/utils'
import { frameChoices } from '../data/badges'
import { useStore } from '../lib/store'

type ButtonVariant = 'primary' | 'secondary' | 'sun' | 'mint' | 'soft' | 'ghost' | 'danger' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-[0_5px_0_0_#1e40af] active:shadow-[0_2px_0_0_#1e40af] active:translate-y-0.5',
  secondary: 'bg-violet-600 text-white hover:bg-violet-700 shadow-[0_5px_0_0_#5b21b6] active:shadow-[0_2px_0_0_#5b21b6] active:translate-y-0.5',
  sun: 'bg-sun-400 text-slate-900 hover:bg-sun-500 shadow-[0_5px_0_0_#b45309] active:shadow-[0_2px_0_0_#b45309] active:translate-y-0.5',
  mint: 'bg-mint-500 text-white hover:bg-mint-600 shadow-[0_5px_0_0_#047857] active:shadow-[0_2px_0_0_#047857] active:translate-y-0.5',
  soft: 'bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-100',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
  danger: 'bg-rose-500 text-white hover:bg-rose-600 shadow-[0_5px_0_0_#be123c] active:shadow-[0_2px_0_0_#be123c] active:translate-y-0.5',
  outline: 'bg-white text-slate-700 border-2 border-slate-200 hover:border-brand-300 hover:text-brand-700',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-2 text-sm rounded-xl gap-1.5',
  md: 'px-5 py-2.5 text-sm sm:text-base rounded-2xl gap-2',
  lg: 'px-6 py-3.5 text-base sm:text-lg rounded-2xl gap-2.5',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading,
  block,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: LucideIcon
  loading?: boolean
  block?: boolean
}) {
  return (
    <button
      className={cx(
        'inline-flex items-center justify-center font-extrabold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        sizes[size],
        block && 'w-full',
        className,
      )}
      {...props}
    >
      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : Icon ? <Icon className="h-5 w-5" /> : null}
      {children}
    </button>
  )
}

export function Card({
  children,
  className,
  hover,
  onClick,
}: {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={cx(
        'card hover:shadow-md hover:transition-shadow rounded-xl border border-slate-100/50',
        className,
      )}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') onClick()
            }
          : undefined
      }
    >
      {children}
    </div>
  )
}

export function ProgressBar({
  value,
  color = 'bg-brand-500',
  height = 'h-2.5',
  label,
  showPercent,
}: {
  value: number
  color?: string
  height?: string
  label?: string
  showPercent?: boolean
}) {
  const safe = Math.max(0, Math.min(100, Math.round(value)))
  return (
    <div>
      {(label || showPercent) && (
        <div className="mb-1 flex items-center justify-between text-xs font-bold text-slate-500">
          <span>{label}</span>
          {showPercent && <span>{safe}%</span>}
        </div>
      )}
      <div className={cx('w-full overflow-hidden rounded-full bg-slate-100', height)}>
        <div
          className={cx('h-full rounded-full transition-all duration-500', color)}
          style={{ width: `${safe}%` }}
        />
      </div>
    </div>
  )
}

export function Avatar({
  emoji,
  frame = 'none',
  size = 'md',
  className,
}: {
  emoji: string
  frame?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}) {
  const sizesMap = {
    xs: 'h-8 w-8 text-lg',
    sm: 'h-10 w-10 text-xl',
    md: 'h-12 w-12 text-2xl',
    lg: 'h-16 w-16 text-3xl',
    xl: 'h-24 w-24 text-5xl',
  }
  const frameDef = frameChoices.find((f) => f.id === frame) ?? frameChoices[0]
  return (
    <div
      className={cx(
        'flex flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-white to-slate-100 ring-4',
        sizesMap[size],
        frameDef.ring,
        className,
      )}
    >
      <span aria-hidden="true">{emoji}</span>
    </div>
  )
}

export function StatTile({
  icon: Icon,
  label,
  value,
  sub,
  color = 'bg-brand-50 text-brand-700',
  onClick,
  badge,
}: {
  icon: LucideIcon
  label: string
  value: ReactNode
  sub?: string
  color?: string
  onClick?: () => void
  badge?: { count: number; text?: string }
}) {
  return (
    <div
      onClick={onClick}
      className={cx('card flex items-center gap-3 p-4', onClick && 'card-hover cursor-pointer')}
    >
      <div className={cx('flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br', color)}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p>
        <div className="font-display text-xl font-bold leading-tight text-slate-900">{value}</div>
        {sub && <p className="truncate text-xs font-semibold text-slate-400">{sub}</p>}
      </div>
      {badge && (
        <div className="absolute top-1.5 right-1.5">
          <span className={cx('rounded-full bg-brand-600 text-white text-xs font-bold px-2 py-0.5', 'shadow-sm')}>
            {badge.count}
          </span>
        </div>
      )}
    </div>
  )
}

export function SectionHeader({
  title,
  subtitle,
  action,
  actionLabel,
  emoji,
}: {
  title: string
  subtitle?: string
  action?: () => void
  actionLabel?: string
  emoji?: string
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        <h2 className="section-title flex items-center gap-2">
          {emoji && <span className="text-2xl">{emoji}</span>}
          {title}
        </h2>
        {subtitle && <p className="mt-0.5 text-sm font-semibold text-slate-500">{subtitle}</p>}
      </div>
      {action && actionLabel && (
        <button
          onClick={action}
          className="flex flex-shrink-0 items-center gap-1 rounded-full px-2 py-1 text-sm font-extrabold text-brand-600 hover:bg-brand-50"
        >
          {actionLabel} <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export function PageHeader({
  title,
  subtitle,
  emoji,
  back,
  actions,
}: {
  title: string
  subtitle?: string
  emoji?: string
  back?: string | boolean
  actions?: ReactNode
}) {
  const navigate = useNavigate()
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        {back && (
          <button
            onClick={() => (typeof back === 'string' ? navigate(back) : navigate(-1))}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
            aria-label="Kembali"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            {emoji && <span className="mr-2">{emoji}</span>}
            {title}
          </h1>
          {subtitle && <p className="mt-1 max-w-2xl text-sm font-semibold text-slate-500">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}

export function Modal({
  open,
  onClose,
  title,
  children,
  wide,
  footer,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  wide?: boolean
  footer?: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div
        className={cx(
          'max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl animate-slideUp sm:rounded-3xl',
          wide ? 'sm:max-w-3xl' : 'sm:max-w-lg',
        )}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
          <h3 className="font-display text-lg font-bold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
        {footer && <div className="sticky bottom-0 border-t border-slate-100 bg-white px-5 py-4">{footer}</div>}
      </div>
    </div>
  )
}

export function Tabs({
  items,
  value,
  onChange,
  className,
}: {
  items: { id: string; label: string; icon?: LucideIcon; count?: number }[]
  value: string
  onChange: (id: string) => void
  className?: string
}) {
  return (
    <div className={cx('no-scrollbar flex gap-2 overflow-x-auto pb-1', className)}>
      {items.map((item) => {
        const Icon = item.icon
        const active = value === item.id
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={cx(
              'flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold transition',
              active ? 'bg-brand-600 text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-50',
            )}
          >
            {Icon && <Icon className="h-4 w-4" />}
            {item.label}
            {typeof item.count === 'number' && (
              <span className={cx('rounded-full px-1.5 text-[10px]', active ? 'bg-white/20' : 'bg-slate-100')}>
                {item.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Cari…',
  className,
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}) {
  return (
    <div className={cx('relative', className)}>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input py-2.5 pl-10 text-sm"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100"
          aria-label="Hapus pencarian"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}

export function Stars({ stars, size = 'md' }: { stars: number; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <span
      className={cx(
        'tracking-tight',
        size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-lg',
      )}
      aria-label={`${stars} dari 3 bintang`}
    >
      {starsLabel(Math.min(3, stars))}
    </span>
  )
}

export function Pill({
  children,
  tone = 'brand',
  className,
}: {
  children: ReactNode
  tone?: 'brand' | 'sun' | 'mint' | 'coral' | 'rose' | 'slate' | 'violet'
  className?: string
}) {
  const tones = {
    brand: 'bg-brand-50 text-brand-700',
    sun: 'bg-sun-50 text-sun-600',
    mint: 'bg-mint-50 text-mint-600',
    coral: 'bg-coral-50 text-coral-600',
    rose: 'bg-rose-50 text-rose-600',
    slate: 'bg-slate-100 text-slate-600',
    violet: 'bg-violet-50 text-violet-700',
  }
  return <span className={cx('chip', tones[tone], className)}>{children}</span>
}

export function EmptyState({
  emoji = '🌱',
  title,
  description,
  action,
  actionLabel,
}: {
  emoji?: string
  title: string
  description?: string
  action?: () => void
  actionLabel?: string
}) {
  return (
    <div className="card flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-3 text-5xl">{emoji}</div>
      <h3 className="font-display text-lg font-bold text-slate-800">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm font-semibold text-slate-500">{description}</p>}
      {action && actionLabel && (
        <Button onClick={action} className="mt-4" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export function ToastStack() {
  const { toasts, dismissToast } = useStore()
  if (!toasts.length) return null
  const icons = {
    success: Check,
    error: CircleAlert,
    info: Info,
    reward: Sparkles,
  }
  const styles = {
    success: 'bg-mint-500',
    error: 'bg-rose-500',
    info: 'bg-brand-500',
    reward: 'bg-sun-400',
  }
  return (
    <div className="pointer-events-none fixed bottom-24 left-1/2 z-[60] flex w-full max-w-md -translate-x-1/2 flex-col gap-2 px-4 sm:bottom-6">
      {toasts.map((toast) => {
        const Icon = icons[toast.type]
        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-slate-900/95 px-4 py-3 text-white shadow-xl animate-slideUp"
          >
            <span className={cx('flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-slate-900', styles[toast.type])}>
              <Icon className="h-4 w-4" />
            </span>
            <p className="flex-1 text-sm font-bold">{toast.message}</p>
            <button onClick={() => dismissToast(toast.id)} className="text-slate-400 hover:text-white" aria-label="Tutup notifikasi">
              <X className="h-4 w-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
