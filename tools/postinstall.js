// Creates husky hooks if repo already initialized, otherwise no-op.
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

try {
  // Ensure .husky folder and pre-commit hook are present
  const huskyDir = join(process.cwd(), '.husky');
  if (!existsSync(huskyDir)) {
    mkdirSync(huskyDir, { recursive: true });
  }
  const preCommit = join(huskyDir, 'pre-commit');
  if (!existsSync(preCommit)) {
    writeFileSync(
      preCommit,
      `#!/usr/bin/env sh\n. \\\"$(dirname -- "$0")/_/husky.sh\\"\n\npnpm exec lint-staged\n`,
      { encoding: 'utf8' }
    );
  }
  // Ensure executable (git bash / posix shells)
  try {
    execSync(`git update-index --chmod=+x .husky/pre-commit`, { stdio: 'ignore' });
  } catch {}
} catch (e) {
  // best-effort, do not fail install
}
