import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
}

function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const variantClass =
    variant === 'secondary'
      ? 'button-secondary'
      : variant === 'danger'
        ? 'button-danger'
        : ''

  return (
    <button
      className={`button ${variantClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
