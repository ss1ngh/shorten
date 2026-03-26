#!/bin/bash
cd "$(dirname "$0")"
export DATABASE_URL="postgresql://ss1ngh:shorten@localhost:5432/ss1ngh?schema=public"
npx tsx src/index.ts