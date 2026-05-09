import { Link } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl text-muted-foreground">Page not found</p>
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/" className={buttonVariants({ variant: 'outline' })}>
          Browse Stores
        </Link>
      </div>
    </div>
  )
}
