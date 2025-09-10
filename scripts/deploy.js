#!/usr/bin/env node

import axios from 'axios'
import { execSync } from 'child_process'

console.log('🚀 Starting deployment process...')

async function getGitDiff() {
  try {
    const diff = execSync('git diff HEAD~1 HEAD', { encoding: 'utf8' })
    return diff
  } catch (error) {
    console.error('❌ Failed to get git diff:', error.message)
    return null
  }
}

async function reviewCode(diff) {
  try {
    console.log('🔍 Running code review...')

    const response = await axios.post(
      'http://localhost:4111/api/agents/codeReviewAgent/generate-legacy',
      {
        messages: [
          {
            role: 'user',
            content: diff,
          },
        ],
        runId: 'codeReviewAgent',
        maxRetries: 2,
        maxSteps: 5,
        temperature: 0.5,
        topP: 1,
        runtimeContext: {},
      },
    )

    return response.data
  } catch (error) {
    console.error('❌ Code review API call failed:', error.message)
    return null
  }
}

async function main() {
  try {
    console.log('📦 Running lint check...')
    execSync('npm run lint', { stdio: 'inherit' })

    console.log('🧪 Running tests...')
    execSync('npm run test', { stdio: 'inherit' })

    // Get git diff and run code review
    const diff = await getGitDiff()
    if (diff && diff.trim()) {
      const reviewResult = await reviewCode(diff)

      console.log('----', typeof reviewResult, reviewResult)

      if (reviewResult) {
        // Check for fail/success in response
        const responseText = reviewResult.text

        if (responseText.includes('fail')) {
          console.error('❌ Code review failed. Stopping deployment.')
          process.exit(1)
        } else if (responseText.includes('success')) {
          console.log('✅ Code review passed. Continuing with build...')
        } else {
          console.log(
            '⚠️ Code review completed. No explicit success/fail status found. Continuing...',
          )
        }
      } else {
        console.log('⚠️ Code review unavailable. Continuing with build...')
      }
    } else {
      console.log('⚠️ No git diff available. Continuing with build...')
    }

    console.log('🏗️ Building project...')
    execSync('npm run build', { stdio: 'inherit' })

    console.log('✅ Deployment process completed successfully!')
  } catch (error) {
    console.error('❌ Deployment failed:', error.message)
    process.exit(1)
  }
}

main()
