import { NextResponse } from "next/server";

export const revalidate = 3600;

type GitHubUser = {
  public_repos: number;
  followers: number;
  following: number;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
};

type GitHubRepo = {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  homepage: string | null;
  pushed_at: string;
  fork: boolean;
};

const USER = "Ankitbhalke137";

export async function GET() {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "ankit-portfolio",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${USER}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      return NextResponse.json(
        { live: false, error: "GitHub API unavailable" },
        { status: 200 },
      );
    }

    const user = (await userResponse.json()) as GitHubUser;
    const repos = (await reposResponse.json()) as GitHubRepo[];

    const languageCounts = new Map<string, number>();
    for (const repo of repos) {
      if (!repo.fork && repo.language) {
        languageCounts.set(
          repo.language,
          (languageCounts.get(repo.language) ?? 0) + 1,
        );
      }
    }

    const totalLangRepos = [...languageCounts.values()].reduce(
      (sum, count) => sum + count,
      0,
    );

    const languages = [...languageCounts.entries()]
      .map(([name, count]) => ({
        name,
        count,
        percent: Math.round((count / Math.max(totalLangRepos, 1)) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    return NextResponse.json({
      live: true,
      user: {
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
        name: user.name,
        bio: user.bio,
        avatar_url: user.avatar_url,
        html_url: user.html_url,
      },
      languages,
      repos: repos
        .filter((repo) => !repo.fork)
        .sort(
          (a, b) =>
            new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
        )
        .slice(0, 5)
        .map((repo) => ({
          name: repo.name,
          description: repo.description,
          language: repo.language,
          html_url: repo.html_url,
          homepage: repo.homepage,
          pushed_at: repo.pushed_at,
        })),
    });
  } catch (error) {
    console.error("GitHub API error", error);
    return NextResponse.json(
      { live: false, error: "GitHub API unavailable" },
      { status: 200 },
    );
  }
}
