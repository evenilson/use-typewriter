# 📝 useTypeWriter

Create smooth, customizable typing effects in React — without hacks like `setTimeout`.

This hook leverages `requestAnimationFrame` to deliver smooth, accurate, and efficient animations — perfect for landing pages, hero sections, and interfaces with personality.

---

## 📦 Installation

This hook is **not yet published on NPM**. You can:

1. Clone or copy the file directly from the repository:  
   [github.com/evenilson/use-typewriter](https://github.com/evenilson/use-typewriter)

2. Or import it directly from GitHub (if your environment supports it):

```ts
// Example (if using a bundler that supports remote imports):
import { useTypeWriter } from "https://raw.githubusercontent.com/evenilson/use-typewriter/main/src/useTypeWriter.ts";
```

> **Recommended:** copy the file locally for full control and stability.

---

## ⚙️ Basic Usage

```tsx
import { useTypeWriter } from "./hooks";

export function App() {
  const text = useTypeWriter({
    texts: ["Hello, world!", "Welcome to my site."],
    writeSpeed: 100,
    eraseSpeed: 50,
    loop: true,
  });

  return (
    <main className="bg-zinc-900 w-full h-screen flex items-center justify-center">
      <span className="text-zinc-100 text-7xl">{text}</span>
    </main>
  );
}
```

---

## 🔧 API

| Prop                   | Type         | Description                                                              | Default     |
|------------------------|--------------|--------------------------------------------------------------------------|-------------|
| `texts`                | `string[]`   | List of phrases to be typed and erased                                  | — *(required)* |
| `writeSpeed`           | `number`     | Delay (ms) between typing each character                                 | `100`       |
| `eraseSpeed`           | `number`     | Delay (ms) between erasing each character                                | `50`        |
| `pauseBeforeDelete`    | `number`     | Pause after finishing a phrase before starting to erase                  | `1000`      |
| `pauseBetweenPhrases`  | `number`     | Pause after erasing before starting the next phrase                      | `500`       |
| `loop`                 | `boolean`    | Whether to repeat the phrases endlessly                                  | `false`     |
| `onCycleComplete`      | `() => void` | Callback triggered when all phrases are done (if `loop` is false)        | `() => {}`  |

---

## 💡 Example with Tailwind

```tsx
<main className="bg-zinc-900 w-full h-screen flex items-center justify-center">
  <span className="text-zinc-100 text-7xl">{text}</span>
</main>
```

---

## 📚 Learn More

Curious why `requestAnimationFrame` is better than `setTimeout` for typing effects?

📖 Read the full article on Dev.to:  
[👉 Read the post](https://dev.to/evenilsonliandro/efeito-de-maquina-de-escrever-com-react-usando-requestanimationframe-2fep)

---

## 🧑‍💻 Author

**Evenilson Liandro**  
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077b5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/evenilsonliandro/)  
[![Dev.to](https://img.shields.io/badge/-Dev.to-0A0A0A?style=flat&logo=devdotto&logoColor=white)](https://dev.to/evenilsonliandro)

---

## ⭐ Like the project?

Leave a star on the repository and share it with other devs —  
it helps the project gain visibility ✨
