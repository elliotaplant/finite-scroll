# Finite Scroll

Finite Scroll is a Next.js application that allows you to view Reddit and Twitter/X content without infinite scroll distractions or excessive media.

## Features

- **Reddit Viewer**: View Reddit posts and all comments at once, without infinite scroll.
- **Twitter/X Viewer**: Coming soon.
- **No distractions**: Focus on the content without ads, infinite scroll, or excessive media.
- **Server Components**: Built with Next.js App Router and React Server Components for fast initial loading.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/finite-scroll.git
cd finite-scroll
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. Paste a Reddit or Twitter/X URL into the input field on the home page.
2. The app detects whether it's a Reddit or Twitter URL and redirects to the appropriate viewer.
3. For Reddit, the server fetches the post and comments from the Reddit JSON API.
4. The content is rendered on the server and sent to the client as HTML, minimizing client-side JavaScript.

## Tech Stack

- **Next.js**: React framework with App Router and Server Components
- **TypeScript**: For type-safe code
- **TailwindCSS**: For styling
- **Zod**: For validation

## Roadmap

- [x] Reddit post and comment viewing
- [ ] Twitter/X tweet and reply viewing
- [ ] Media rendering options (toggle images, videos, etc.)
- [ ] Dark/light mode toggle
- [ ] Custom view settings (font size, comment collapsing, etc.)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
