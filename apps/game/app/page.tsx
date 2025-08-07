import { UserProfile } from "@/components/auth/user-profile"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Game Stats Explorer</h1>
            <p className="text-muted-foreground">AI-powered game insights and statistics</p>
          </div>
          <UserProfile />
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <h2 className="text-4xl font-bold mb-4">
              Discover Game Statistics Like Never Before
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get AI-powered insights, trivia, and detailed statistics about any game you&apos;re curious about.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                <h3 className="text-lg font-semibold mb-2">AI-Powered Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Leverage advanced AI models to get comprehensive game analysis and insights.
                </p>
              </div>
              <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Comprehensive Database</h3>
                <p className="text-sm text-muted-foreground">
                  Access detailed statistics and metadata for thousands of games across all platforms.
                </p>
              </div>
              <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Personalized Experience</h3>
                <p className="text-sm text-muted-foreground">
                  Save your favorite games and track your query history for a tailored experience.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
