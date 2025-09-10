#!/usr/bin/env node

import axios from 'axios'
import { execSync } from 'child_process'

console.log('🚀 Starting deployment process...')

try {
  console.log('📦 Running lint check...')
  execSync('npm run lint', { stdio: 'inherit' })

  console.log('🧪 Running tests...')
  execSync('npm run test', { stdio: 'inherit' })

  console.log('🏗️ Building project...')
  execSync('npm run build', { stdio: 'inherit' })

  console.log('✅ Deployment process completed successfully!')
} catch (error) {
  console.error('❌ Deployment failed:', error.message)
  process.exit(1)
}
