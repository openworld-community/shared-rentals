#!/bin/sh
#
# Copy pre-commit hook to .git/hooks folder
echo "Copy pre-commit hook to .git/hooks"
cp .githooks/pre-commit .git/hooks
echo "[DONE]"

