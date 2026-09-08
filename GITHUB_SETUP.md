# 🚀 راهنمای کامل انتقال به GitHub

این راهنما به شما کمک می‌کند پروژه Deutsch Chunks را به GitHub منتقل کنید.

---

## 📋 پیش‌نیازها

1. **حساب GitHub** — اگر ندارید، در [github.com](https://github.com) ثبت‌نام کنید
2. **Git نصب شده** — بررسی کنید:
   ```bash
   git --version
   ```
   اگر نصب نیست، از [git-scm.com](https://git-scm.com/downloads) دانلود کنید

3. **تنظیم Git** (اولین بار):
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

---

## 🎯 روش ۱: ایجاد مخزن جدید (توصیه شده)

### مرحله ۱: ایجاد مخزن در GitHub

1. به [github.com/new](https://github.com/new) بروید
2. اطلاعات را پر کنید:
   - **Repository name:** `deutsch-chunks`
   - **Description:** `Learn natural German phrases with native German audio`
   - **Public** یا **Private** را انتخاب کنید
   - ❌ **Initialize with README** را تیک نزنید (ما از قبل داریم)
   - ❌ **Add .gitignore** را تیک نزنید (ما از قبل داریم)
   - ❌ **Add a license** را تیک نزنید (ما از قبل داریم)

3. روی **Create repository** کلیک کنید

### مرحله ۲: اتصال پروژه محلی به GitHub

در ترمینال، در پوشه پروژه:

```bash
# مقداردهی اولیه Git (اگر قبلاً انجام نشده)
git init

# اضافه کردن تمام فایل‌ها
git add .

# اولین commit
git commit -m "Initial commit: Deutsch Chunks PWA"

# اضافه کردن مخزن GitHub به عنوان remote
# IMPORTANT: YOUR_USERNAME را با نام کاربری GitHub خود جایگزین کنید
git remote add origin https://github.com/YOUR_USERNAME/deutsch-chunks.git

# تغییر نام شاخه به main
git branch -M main

# push به GitHub
git push -u origin main
```

### مرحله ۳: تأیید

1. به صفحه مخزن GitHub خود بروید
2. رفرش کنید
3. باید تمام فایل‌های پروژه را ببینید

---

## 🎯 روش ۲: Import کردن از فایل ZIP

اگر پروژه را به صورت ZIP دارید:

### مرحله ۱: استخراج ZIP

```bash
unzip deutsch-chunks.zip
cd deutsch-chunks
```

### مرحله ۲: ادامه از مرحله ۱ روش بالا

از مرحله ۲ روش ۱ ادامه دهید.

---

## 🔐 احراز هویت GitHub

### روش ۱: HTTPS (ساده‌تر)

وقتی `git push` می‌زنید:
1. نام کاربری GitHub را وارد کنید
2. **Personal Access Token** را وارد کنید (نه رمز عبور)

**ایجاد Personal Access Token:**

1. به [GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens) بروید
2. **Generate new token (classic)** را کلیک کنید
3. تنظیمات:
   - **Note:** `deutsch-chunks-deploy`
   - **Expiration:** 90 days (یا Custom)
   - **Select scopes:** `repo` (کامل)
4. **Generate token** را کلیک کنید
5. **Token را کپی کنید** (فقط یک بار نمایش داده می‌شود!)

### روش ۲: SSH (پیشرفته‌تر)

```bash
# تولید SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# اضافه کردن key به ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# کپی public key
cat ~/.ssh/id_ed25519.pub

# اضافه کردن به GitHub:
# Settings → SSH and GPG keys → New SSH key
```

سپس از SSH URL استفاده کنید:
```bash
git remote add origin git@github.com:YOUR_USERNAME/deutsch-chunks.git
```

---

## 📝 دستورات Git مفید

### Commit کردن تغییرات

```bash
# بررسی وضعیت
git status

# اضافه کردن فایل‌های تغییر یافته
git add .

# یا فقط فایل‌های خاص
git add src/App.tsx

# commit با پیام
git commit -m "feat: add new practice mode"

# push به GitHub
git push
```

### ایجاد شاخه جدید

```bash
# ایجاد و تغییر به شاخه جدید
git checkout -b feature/new-feature

# کار روی شاخه...
git add .
git commit -m "feat: implement new feature"
git push -u origin feature/new-feature

# سپس در GitHub Pull Request ایجاد کنید
```

### همگام‌سازی با GitHub

```bash
# pull تغییرات از GitHub
git pull origin main

# یا اگر تغییرات محلی دارید
git pull --rebase origin main
```

### مشاهده تاریخچه

```bash
# مشاهده log
git log

# یا به صورت گرافیکی
git log --oneline --graph --all
```

---

## 🎨 قالب‌های Commit Message

از این قالب‌ها استفاده کنید:

```
feat: add new practice mode
fix: correct audio playback issue
docs: update README with deployment guide
style: format code with prettier
refactor: simplify audio service
test: add unit tests for SRS algorithm
chore: update dependencies
```

---

## 🚀 استقرار خودکار

### GitHub Actions (CI/CD)

فایل `.github/workflows/deploy.yml` را ایجاد کنید:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Vercel/Netlify

1. مخزن GitHub را به Vercel/Netlify متصل کنید
2. هر push به `main` به صورت خودکار استقرار می‌شود

---

## 📊 GitHub Features

### Issues

برای گزارش باگ‌ها و درخواست ویژگی‌ها:
- از قالب‌های موجود استفاده کنید
- برچسب‌های مناسب اضافه کنید
- به مسائل مرتبط لینک دهید

### Projects

برای مدیریت کارها:
- یک Project Board ایجاد کنید
- ستون‌ها: To Do, In Progress, Review, Done
- Issues را به Project اضافه کنید

### Discussions

برای گفتگوهای عمومی:
- سوالات
- ایده‌ها
- نمایش‌ها

### Wiki

برای مستندات اضافی:
- راهنماهای کاربر
- مستندات فنی
- سوالات متداول

---

## 🔒 امنیت

### .gitignore

فایل `.gitignore` از قبل تنظیم شده و شامل:
- `node_modules/`
- `dist/`
- `.env` files
- Audio files (بزرگ)
- Editor files

### Secrets

**هرگز این‌ها را commit نکنید:**
- API keys
- Passwords
- Database credentials
- Private keys

از environment variables استفاده کنید:
```javascript
const API_KEY = import.meta.env.VITE_API_KEY;
```

### Branch Protection

در GitHub Settings → Branches:
- **Branch protection rules** را فعال کنید
- **Require pull request reviews** را تنظیم کنید
- **Require status checks** را فعال کنید

---

## 🤝 همکاری با دیگران

### Fork و Pull Request

1. دیگران مخزن شما را Fork می‌کنند
2. تغییرات ایجاد می‌کنند
3. Pull Request ارسال می‌کنند
4. شما review و merge می‌کنید

### Inviting Collaborators

در GitHub:
1. Settings → Collaborators
2. **Add people** را کلیک کنید
3. نام کاربری یا ایمیل را وارد کنید
4. دسترسی را تنظیم کنید

---

## 📈 آمار و Insights

در GitHub Insights می‌توانید ببینید:
- **Pulse:** فعالیت‌های اخیر
- **Contributors:** مشارکت‌کنندگان
- **Traffic:** بازدیدها و clones
- **Commits:** تاریخچه commit‌ها

---

## 🆘 رفع مشکلات رایج

### مشکل: "Permission denied (publickey)"

**راه‌حل:**
```bash
# بررسی SSH key
ssh -T git@github.com

# اگر کار نکرد، SSH key را دوباره اضافه کنید
ssh-add ~/.ssh/id_ed25519
```

### مشکل: "Updates were rejected"

**راه‌حل:**
```bash
# pull تغییرات از GitHub
git pull origin main

# یا force push (با احتیاط!)
git push -f origin main
```

### مشکل: "fatal: remote origin already exists"

**راه‌حل:**
```bash
# حذف remote قدیمی
git remote remove origin

# اضافه کردن remote جدید
git remote add origin https://github.com/YOUR_USERNAME/deutsch-chunks.git
```

### مشکل: فایل‌های بزرگ

**راه‌حل:**
- از Git LFS استفاده کنید:
  ```bash
  git lfs install
  git lfs track "*.mp3"
  ```
- یا فایل‌های بزرگ را در `.gitignore` قرار دهید

---

## ✅ چک‌لیست نهایی

قبل از push نهایی:

- [ ] تمام فایل‌ها commit شده‌اند
- [ ] `.gitignore` به درستی تنظیم شده
- [ ] README.md کامل است
- [ ] LICENSE اضافه شده
- [ ] Build محلی موفق است
- [ ] مخزن GitHub ایجاد شده
- [ ] Remote به درستی تنظیم شده
- [ ] Push موفقیت‌آمیز بود

---

## 🎉 تبریک!

پروژه شما اکنون در GitHub است!

### قدم‌های بعدی:

1. **استقرار** — به DEPLOYMENT.md مراجعه کنید
2. **اشتراک‌گذاری** — لینک مخزن را به اشتراک بگذارید
3. **مشارکت** — CONTRIBUTING.md را به اشتراک بگذارید
4. **به‌روزرسانی** — مرتباً تغییرات را push کنید

---

## 📞 پشتیبانی

اگر مشکلی داشتید:
1. [GitHub Docs](https://docs.github.com) را بررسی کنید
2. در Google جستجو کنید
3. در Discussions سوال بپرسید

---

**موفق باشید! 🚀**
