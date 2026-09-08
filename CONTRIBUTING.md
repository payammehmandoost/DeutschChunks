# Contributing to Deutsch Chunks

Thank you for your interest in contributing to Deutsch Chunks! This document provides guidelines and information for contributors.

## 🎯 How to Contribute

### Reporting Bugs

1. Check if the issue already exists in [Issues](../../issues)
2. Use the bug report template
3. Include:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Browser/device information

### Suggesting Features

1. Check existing issues and discussions
2. Open a new issue with the feature request template
3. Explain:
   - The problem you're solving
   - Your proposed solution
   - Alternative solutions considered
   - Use cases

### Adding Content

#### Adding New Phrases

Edit `src/data/phrases.ts` and add phrases following this structure:

```typescript
{
  id: 'a1_XXX',           // Unique ID (level_number)
  level: 'A1',            // CEFR level (A1, A2, B1, B2, C1)
  category: 'Category',   // See existing categories
  german: 'German phrase',
  english: 'English translation',
  persian: 'Persian translation',
  register: 'informal',   // 'formal', 'informal', or 'neutral'
  difficulty: 1,          // 1-5
  audio: '/audio/a1/a1_XXX.mp3',
  audioSlow: '/audio/a1/a1_XXX_slow.mp3',
  example: 'Example sentence',
  exampleEnglish: 'Example in English',
  examplePersian: 'مثال فارسی',
  notes: 'Learning notes',
  tags: ['tag1', 'tag2'],
  lessonId: 1,            // Lesson number
}
```

**Content Guidelines:**
- Use natural, commonly-used German phrases
- Verify grammar and naturalness
- Provide accurate translations
- Include appropriate register (formal/informal)
- Add helpful learning notes
- Use stable, unique IDs

#### Adding Audio

1. Record native German audio (44.1kHz or 48kHz)
2. Save as MP3 in `public/audio/{level}/`
3. Filename: `{phrase_id}.mp3` and `{phrase_id}_slow.mp3`
4. Ensure clear pronunciation, no background noise
5. Update phrase data with correct paths

### Code Contributions

#### Development Setup

```bash
# Fork the repository
# Clone your fork
git clone https://github.com/YOUR_USERNAME/deutsch-chunks.git
cd deutsch-chunks

# Install dependencies
npm install

# Start development server
npm run dev
```

#### Development Workflow

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes:
   - Follow existing code style
   - Add comments for complex logic
   - Test thoroughly
   - Ensure responsive design works

3. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   **Commit Message Format:**
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting, etc.)
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a Pull Request

#### Code Style

- **TypeScript** — Use strict typing
- **React** — Functional components with hooks
- **Tailwind CSS** — Utility-first styling
- **Component naming** — PascalCase for components
- **File naming** — camelCase for utilities, PascalCase for components
- **Indentation** — 2 spaces
- **Quotes** — Single quotes for strings

#### Testing

Before submitting:
- [ ] Build succeeds (`npm run build`)
- [ ] No TypeScript errors
- [ ] Tested on mobile and desktop
- [ ] Tested dark mode
- [ ] Tested RTL support (if applicable)
- [ ] Added/updated tests (if applicable)

## 🎨 Design Guidelines

### Visual Design
- Modern, minimal, premium aesthetic
- Mobile-first approach
- Touch targets ≥ 44px
- Smooth, subtle animations
- Respect `prefers-reduced-motion`

### Accessibility
- Semantic HTML
- ARIA labels for interactive elements
- Keyboard navigation support
- Sufficient color contrast
- Screen reader compatibility

### RTL Support
- German/English always LTR
- Persian uses RTL
- Never mix directions incorrectly
- Test with both languages

## 📝 Pull Request Process

1. **Update documentation** — Update README.md if needed
2. **Add tests** — Add tests for new features
3. **Check build** — Ensure `npm run build` succeeds
4. **Describe changes** — Clear PR description
5. **Link issues** — Reference related issues
6. **Request review** — Tag maintainers

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Content addition
- [ ] Documentation update
- [ ] Refactoring

## Testing
- [ ] Tested on mobile
- [ ] Tested on desktop
- [ ] Tested dark mode
- [ ] Build succeeds

## Screenshots
(If applicable)

## Related Issues
Closes #123
```

## 🚫 What NOT to Do

- ❌ Don't call browser TTS "Native German audio"
- ❌ Don't show German answer before learner requests it in Practice
- ❌ Don't hardcode phrases in JSX
- ❌ Don't use array indexes as IDs
- ❌ Don't mix RTL/LTR incorrectly
- ❌ Don't expose API keys in frontend
- ❌ Don't autoplay audio unexpectedly
- ❌ Don't store all state only in React (use IndexedDB)

## 💡 Tips for Contributors

### Adding Phrases
- Focus on natural, practical German
- Avoid textbook-only phrases
- Include context and usage notes
- Verify translations are accurate
- Check CEFR level appropriateness

### UI/UX Changes
- Test on multiple screen sizes
- Consider both light and dark modes
- Ensure animations are smooth
- Check accessibility
- Test with keyboard navigation

### Performance
- Lazy load where possible
- Optimize images and audio
- Minimize bundle size
- Test on slow connections

## 🤔 Questions?

- Open a discussion on GitHub
- Check existing issues and discussions
- Read the README.md thoroughly

## 🙏 Recognition

All contributors will be recognized in:
- Contributors list
- Release notes
- Project documentation

Thank you for helping make Deutsch Chunks better! 🎉
