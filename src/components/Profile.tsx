import { useMemo } from "react";

function parseJwtPayload(token: string): Record<string, unknown> | null {
    try {
        const base64Url = token.split(".")[1];
        if (!base64Url) return null;
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(base64)) as Record<string, unknown>;
    } catch {
        return null;
    }
}

export function Profile() {
    const email = useMemo(() => {
        const token = localStorage.getItem("jwt");
        if (!token) return null;
        const payload = parseJwtPayload(token);
        if (!payload) return null;
        return (payload.email ?? payload.sub ?? "—") as string;
    }, []);

    function handleLogout() {
        localStorage.removeItem("jwt");
        window.location.href = "/login";
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl p-8">
                <h1 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Profile</h1>

                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-2">Email</label>
                        <p className="px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-800">
                            {email ?? "—"}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full py-3 rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-700 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
