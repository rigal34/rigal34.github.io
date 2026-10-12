/*
 * Données GitHub récupérées AU MOMENT DE LA CONSTRUCTION du site (npm run build).
 * Aucun service externe : on lit directement GitHub.
 * Si GitHub ne répond pas, le site affiche les valeurs de secours ci-dessous.
 */

export type ContributionDay = { date: string; level: number };

export type GitHubData = {
    publicRepos: number;
    sinceYear: number;
    contributionsLastYear: number;
    contributionsTotal: number;
    activeDaysLastYear: number;
    languages: { name: string; count: number }[];
    recentRepos: { name: string; pushedAt: string }[];
    calendar: ContributionDay[];
    live: boolean;
};

// Sur GitHub Actions, le jeton fourni évite la limite de requêtes de l'API
const UA: Record<string, string> = { "User-Agent": "portfolio-build" };
if (process.env.GITHUB_TOKEN) UA.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function getText(url: string): Promise<string> {
    const headers = url.startsWith("https://api.github.com") ? UA : { "User-Agent": UA["User-Agent"] };
    const res = await fetch(url, { headers, cache: "force-cache" });
    if (!res.ok) throw new Error(`${url} → ${res.status}`);
    return res.text();
}

async function getJson<T>(url: string): Promise<T> {
    return JSON.parse(await getText(url)) as T;
}

function parseCalendar(html: string): ContributionDay[] {
    const days = [...html.matchAll(/data-date="(\d{4}-\d{2}-\d{2})"[^>]*?data-level="(\d)"/g)].map((m) => ({
        date: m[1],
        level: Number(m[2]),
    }));
    return days.sort((a, b) => a.date.localeCompare(b.date));
}

function parseTotal(html: string): number {
    const m = html.match(/([\d,]+)\s+contributions?\s+in\s+(?:the last year|\d{4})/);
    return m ? Number(m[1].replace(/,/g, "")) : 0;
}

type Repo = { name: string; language: string | null; fork: boolean; pushed_at: string };
type User = { public_repos: number; created_at: string };

export async function getGitHubData(user: string): Promise<GitHubData> {
    try {
        const [profile, repos, lastYearHtml] = await Promise.all([
            getJson<User>(`https://api.github.com/users/${user}`),
            getJson<Repo[]>(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`),
            getText(`https://github.com/users/${user}/contributions`),
        ]);

        const sinceYear = new Date(profile.created_at).getFullYear();
        const thisYear = new Date().getFullYear();
        let contributionsTotal = 0;
        for (let y = sinceYear; y <= thisYear; y++) {
            const html = await getText(`https://github.com/users/${user}/contributions?from=${y}-01-01&to=${y}-12-31`);
            contributionsTotal += parseTotal(html);
        }

        const counts: Record<string, number> = {};
        repos.filter((r) => !r.fork && r.language).forEach((r) => {
            counts[r.language as string] = (counts[r.language as string] || 0) + 1;
        });
        const languages = Object.entries(counts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        const calendar = parseCalendar(lastYearHtml);

        return {
            publicRepos: profile.public_repos,
            sinceYear,
            contributionsLastYear: parseTotal(lastYearHtml),
            contributionsTotal,
            activeDaysLastYear: calendar.filter((d) => d.level > 0).length,
            languages,
            recentRepos: repos.slice(0, 3).map((r) => ({ name: r.name, pushedAt: r.pushed_at.slice(0, 10) })),
            calendar,
            live: true,
        };
    } catch (err) {
        console.warn("GitHub indisponible pendant la construction, valeurs de secours utilisées.", err);
        return fallback();
    }
}

/* Valeurs relevées le 12/10/2026, utilisées seulement si GitHub ne répond pas. */
function fallback(): GitHubData {
    const active: Record<string, number> = {
        "2025-10-17": 1, "2025-11-02": 3, "2025-11-12": 2, "2025-11-13": 2, "2025-11-15": 1, "2025-11-19": 1,
        "2025-11-20": 2, "2025-11-22": 2, "2025-11-26": 2, "2025-11-27": 2, "2025-11-28": 1, "2025-12-01": 1,
        "2025-12-13": 1, "2026-01-16": 3, "2026-01-17": 4, "2026-04-16": 1, "2026-04-18": 2, "2026-05-11": 4,
        "2026-08-02": 2, "2026-08-03": 1, "2026-08-04": 1, "2026-08-06": 1, "2026-08-08": 2, "2026-08-09": 1,
        "2026-09-03": 3, "2026-09-09": 2, "2026-09-10": 2, "2026-09-12": 1, "2026-09-13": 2, "2026-09-14": 1,
        "2026-09-16": 1, "2026-09-18": 2, "2026-09-19": 1, "2026-09-20": 1, "2026-09-22": 2, "2026-09-23": 1,
        "2026-09-27": 1, "2026-10-07": 1, "2026-10-08": 2, "2026-10-09": 2, "2026-10-10": 1, "2026-10-11": 3,
    };
    const calendar: ContributionDay[] = [];
    const start = new Date("2025-10-12T00:00:00Z");
    for (let i = 0; i < 366; i++) {
        const d = new Date(start.getTime() + i * 86400000).toISOString().slice(0, 10);
        calendar.push({ date: d, level: active[d] || 0 });
    }
    return {
        publicRepos: 89,
        sinceYear: 2021,
        contributionsLastYear: 91,
        contributionsTotal: 441,
        activeDaysLastYear: Object.keys(active).length,
        languages: [
            { name: "JavaScript", count: 34 },
            { name: "CSS", count: 19 },
            { name: "HTML", count: 16 },
            { name: "PHP", count: 5 },
            { name: "SCSS", count: 2 },
        ],
        recentRepos: [
            { name: "taskmanager", pushedAt: "2026-10-09" },
            { name: "dossier-jury-bruno", pushedAt: "2026-05-11" },
            { name: "Local-IA-Sovereign-Architecture", pushedAt: "2026-05-11" },
        ],
        calendar,
        live: false,
    };
}
