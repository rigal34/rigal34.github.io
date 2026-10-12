import HomePage from "@views/HomePage";
import { getGitHubData } from "@lib/github";
import { identity } from "@data/profile";

export default async function Index() {
  const github = await getGitHubData(identity.githubUser);
  return <HomePage github={github} />;
}
