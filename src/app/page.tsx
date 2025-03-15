import URLForm from "@/components/URLForm";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="max-w-4xl w-full mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Finite Scroll</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            View Reddit and Twitter content without infinite scroll
          </p>
        </div>

        <URLForm />

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            What is Finite Scroll?
          </h2>
          <p className="mb-3">
            Finite Scroll is a simple way to view Reddit and Twitter/X content
            without the distractions of infinite scroll or excessive media.
          </p>
          <p className="mb-3">
            Just paste a Reddit or Twitter link above, and we'll show you the
            content in a clean, readable format - including all comments in one
            page.
          </p>
          <p>
            <strong>Currently supported:</strong> Reddit posts and comments.
            <br />
            <strong>Coming soon:</strong> Twitter/X tweets and replies.
          </p>
        </div>
      </main>

      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>
          Finite Scroll is an open-source project. No tracking, no ads, no
          distractions.
        </p>
      </footer>
    </div>
  );
}
