export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card p-6 rounded-lg shadow-md border border-custom">
                    <h2 className="text-xl font-semibold mb-2 text-foreground">Total Skills</h2>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">...</p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-md border border-custom">
                    <h2 className="text-xl font-semibold mb-2 text-foreground">Projects</h2>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">...</p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-md border border-custom">
                    <h2 className="text-xl font-semibold mb-2 text-foreground">New Messages</h2>
                    <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">...</p>
                </div>
            </div>
        </div>
    );
}
