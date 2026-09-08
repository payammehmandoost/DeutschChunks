#!/usr/bin/env node

/**
 * Data Validation Script for Deutsch Chunks
 * Run: node scripts/validateData.js
 */

import { phrases, categories, levels } from '../src/data/phrases.ts';

let errors = 0;
let warnings = 0;

function error(msg) {
  console.error(`❌ ERROR: ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`⚠️  WARNING: ${msg}`);
  warnings++;
}

function info(msg) {
  console.log(`ℹ️  ${msg}`);
}

console.log('🔍 Validating Deutsch Chunks data...\n');

// Check for duplicate IDs
const ids = phrases.map(p => p.id);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicateIds.length > 0) {
  error(`Duplicate IDs found: ${duplicateIds.join(', ')}`);
}

// Check each phrase
const seenIds = new Set();
for (const phrase of phrases) {
  // Check for duplicate
  if (seenIds.has(phrase.id)) {
    error(`Duplicate ID: ${phrase.id}`);
  }
  seenIds.add(phrase.id);

  // Check required fields
  if (!phrase.german || phrase.german.trim() === '') {
    error(`${phrase.id}: Missing German text`);
  }
  if (!phrase.english || phrase.english.trim() === '') {
    error(`${phrase.id}: Missing English translation`);
  }
  if (!phrase.persian || phrase.persian.trim() === '') {
    error(`${phrase.id}: Missing Persian translation`);
  }

  // Check level
  if (!levels.includes(phrase.level)) {
    error(`${phrase.id}: Invalid level "${phrase.level}"`);
  }

  // Check category
  if (!categories.includes(phrase.category)) {
    warn(`${phrase.id}: Category "${phrase.category}" not in standard list`);
  }

  // Check register
  if (!['formal', 'informal', 'neutral'].includes(phrase.register)) {
    error(`${phrase.id}: Invalid register "${phrase.register}"`);
  }

  // Check audio paths
  if (!phrase.audio) {
    error(`${phrase.id}: Missing audio path`);
  }
  if (!phrase.audioSlow) {
    error(`${phrase.id}: Missing slow audio path`);
  }

  // Check difficulty
  if (phrase.difficulty < 1 || phrase.difficulty > 5) {
    error(`${phrase.id}: Invalid difficulty ${phrase.difficulty}`);
  }
}

// Summary
console.log('\n📊 Summary:');
console.log(`   Total phrases: ${phrases.length}`);
console.log(`   Levels: ${[...new Set(phrases.map(p => p.level))].join(', ')}`);
console.log(`   Categories: ${[...new Set(phrases.map(p => p.category))].join(', ')}`);
console.log(`   Errors: ${errors}`);
console.log(`   Warnings: ${warnings}`);

if (errors === 0) {
  console.log('\n✅ All validations passed!');
  process.exit(0);
} else {
  console.log(`\n❌ ${errors} error(s) found. Please fix before deploying.`);
  process.exit(1);
}
