#!/bin/zsh -l
cd "$(dirname "$0")"
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
echo "Starting site at http://localhost:3000 (close this window to stop)"
npm run dev
