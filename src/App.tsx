import { useTypeWriter } from "./hooks"

export function App() {
  const text = useTypeWriter({
    texts: ["Hello, world!", "Welcome to my site."],
    writeSpeed: 100,
    eraseSpeed: 50,
    loop: true
  })

  return (
    <main className="bg-zinc-900 w-full h-screen flex items-center justify-center">
      <span className="text-zinc-100 text-7xl">{text}</span>
    </main>
  )
}
