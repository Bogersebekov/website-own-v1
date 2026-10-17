#!/bin/bash
# Облачная сессия Claude Code: ставим зависимости, чтобы сразу работали
# npm run build (проверка перед коммитом) и npm run dev / preview (превью).
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"
npm install --no-audit --no-fund
