# 🚀 انتقال سریع به GitHub

## دستورالعمل‌های گام به گام

### ۱. ایجاد مخزن در GitHub

1. به https://github.com/new بروید
2. نام مخزن: `deutsch-chunks`
3. توضیحات: `Learn natural German phrases with native German audio`
4. **Public** یا **Private** را انتخاب کنید
5. ❌ تیک‌های Initialize را نزنید
6. **Create repository** را کلیک کنید

### ۲. Push کردن کد

در ترمینال، در پوشه پروژه:

```bash
# مقداردهی Git
git init

# اضافه کردن فایل‌ها
git add .

# اولین commit
git commit -m "Initial commit: Deutsch Chunks PWA"

# تغییر نام شاخه به main
git branch -M main

# اضافه کردن remote (YOUR_USERNAME را جایگزین کنید)
git remote add origin https://github.com/YOUR_USERNAME/deutsch-chunks.git

# push به GitHub
git push -u origin main
```

### ۳. تمام! 🎉

مخزن شما اکنون در GitHub است.

---

## 📝 دستورات مفید

### بررسی وضعیت
```bash
git status
```

### اضافه کردن تغییرات جدید
```bash
git add .
git commit -m "feat: add new feature"
git push
```

### pull تغییرات از GitHub
```bash
git pull origin main
```

### مشاهده تاریخچه
```bash
git log --oneline
```

---

## 🔐 احراز هویت

### اگر از HTTPS استفاده می‌کنید:

وقتی `git push` می‌زنید، از شما:
- **Username:** نام کاربری GitHub
- **Password:** Personal Access Token (نه رمز عبور!)

**ایجاد Token:**
1. https://github.com/settings/tokens
2. Generate new token (classic)
3. Scope: `repo`
4. Token را کپی و استفاده کنید

### اگر از SSH استفاده می‌کنید:

```bash
# تولید SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# اضافه کردن به ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# کپی public key
cat ~/.ssh/id_ed25519.pub

# اضافه کردن به GitHub:
# Settings → SSH and GPG keys → New SSH key
```

سپس:
```bash
git remote set-url origin git@github.com:YOUR_USERNAME/deutsch-chunks.git
```

---

## ✅ چک‌لیست قبل از push

- [ ] مخزن GitHub ایجاد شده
- [ ] `.gitignore` وجود دارد
- [ ] `README.md` کامل است
- [ ] `LICENSE` اضافه شده
- [ ] Build محلی موفق است (`npm run build`)
- [ ] Git init شده
- [ ] Remote اضافه شده
- [ ] Push موفقیت‌آمیز

---

## 🆘 رفع مشکلات

### "Permission denied"
```bash
# بررسی SSH key
ssh -T git@github.com

# یا از HTTPS استفاده کنید
git remote set-url origin https://github.com/YOUR_USERNAME/deutsch-chunks.git
```

### "Updates were rejected"
```bash
git pull origin main
# یا
git push -f origin main  # با احتیاط!
```

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/deutsch-chunks.git
```

---

## 📚 اطلاعات بیشتر

- **راهنمای کامل:** `GITHUB_SETUP.md`
- **استقرار:** `DEPLOYMENT.md`
- **مشارکت:** `CONTRIBUTING.md`
- **خلاصه پروژه:** `PROJECT_SUMMARY.md`

---

## 🎯 قدم‌های بعدی

1. ✅ پروژه در GitHub است
2. 🚀 استقرار در Vercel/Netlify (به `DEPLOYMENT.md` مراجعه کنید)
3. 🤝 اشتراک‌گذاری با دیگران
4. 📝 شروع توسعه بیشتر

---

**موفق باشید! 🚀**
