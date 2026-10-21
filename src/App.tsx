import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

export default function App() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-5xl font-semibold tracking-tight">
        Build fast, <span className="text-primary">ship clean.</span>
      </h1>
      <p className="mt-4 text-muted-foreground">실무용 디자인 시스템 베이스</p>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        <Card className="p-6 md:col-span-2">Bento A</Card>
        <Card className="p-6">Bento B</Card>
        <Card className="p-6">Bento C</Card>
        <Card className="p-6 md:col-span-2">
          <Button>
            시작하기 <ArrowRight className="ml-1 size-4" />
          </Button>
        </Card>
      </div>
    </main>
  )
}