# 🔥 راهنمای کامل اتصال Firebase به Deutsch Chunks

## ✅ وضعیت فعلی

تمام کدهای لازم برای اتصال Firebase ایجاد شده‌اند:

- ✅ `src/services/firebase.ts` — پیکربندی Firebase
- ✅ `src/services/authService.ts` — سرویس احراز هویت
- ✅ `src/services/firebaseDataService.ts` — سرویس داده Firestore
- ✅ `src/hooks/useAuth.ts` — هوک احراز هویت
- ✅ `src/pages/LoginPage.tsx` — صفحه ورود
- ✅ `src/pages/RegisterPage.tsx` — صفحه ثبت‌نام
- ✅ `src/App.tsx` — به‌روزرسانی شده برای احراز هویت
- ✅ `.env.example` — نمونه متغیرهای محیطی
- ✅ `.env.local` — فایل متغیرهای محیطی (خالی)

---

## 🚀 مراحل تکمیل اتصال Firebase

### مرحله ۱: فعال‌سازی Authentication در Firebase Console

1. به [Firebase Console](https://console.firebase.google.com) بروید
2. پروژه خود را انتخاب کنید
3. از منوی سمت چپ → **Authentication**
4. **Get started** را کلیک کنید
5. روی تب **Sign-in method** کلیک کنید
6. روش‌های ورود را فعال کنید:
   - ✅ **Email/Password** — Enable را بزنید
   - ✅ **Google** — Enable را بزنید و email پشتیبانی را وارد کنید
7. **Save** را بزنید

---

### مرحله ۲: ایجاد Web App در Firebase

1. در Firebase Console → **Project Settings** (آیکون چرخ‌دنده)
2. به پایین اسکرول کنید → **Your apps**
3. روی آیکون **Web** (</>) کلیک کنید
4. نام app: `deutsch-chunks-web`
5. ❌ **Firebase Hosting** را تیک نزنید
6. **Register app** را بزنید
7. مقادیر `firebaseConfig` را کپی کنید:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

---

### مرحله ۳: تنظیم متغیرهای محیطی

فایل `.env.local` را باز کنید و مقادیر را وارد کنید:

```bash
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

**مهم:** 
- هر مقدار را در خط مربوطه وارد کنید
- هیچ فاصله‌ای قبل یا بعد از `=` نگذارید
- مقادیر را در `""` قرار ندهید

---

### مرحله ۴: اجرای پروژه

```bash
# نصب وابستگی‌ها (اگر قبلاً نصب نکرده‌اید)
npm install

# اجرای سرور توسعه
npm run dev
```

حالا باید صفحه Login را ببینید!

---

## 🧪 تست سیستم

### تست ثبت‌نام
1. روی **Sign up** کلیک کنید
2. با Google ثبت‌نام کنید یا ایمیل/رمز عبور وارد کنید
3. باید به داشبورد هدایت شوید

### تست ورود
1. از حساب خارج شوید (در Settings)
2. دوباره وارد شوید
3. داده‌های شما باید حفظ شده باشند

---

## 📊 ساختار دیتابیس Firestore

داده‌های هر کاربر در Firestore به این شکل ذخیره می‌شوند:

```
users/
  {userId}/
    progress/
      a1_001/
        phraseId: "a1_001"
        status: "learning"
        repetitions: 3
        ease: 2.5
        nextReviewAt: timestamp
        ...
    
    favorites/
      a1_001/
        phraseId: "a1_001"
        addedAt: timestamp
    
    settings/
      userSettings/
        theme: "light"
        language: "en"
        dailyGoal: 20
    
    reviewLog/
      {logId}/
        phraseId: "a1_001"
        rating: "good"
        timestamp: timestamp
```

---

## 🔒 قوانین امنیتی Firestore

برای امنیت داده‌ها، این قوانین را در Firebase Console → Firestore Database → Rules تنظیم کنید:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // کاربران فقط داده‌های خود را ببینند
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

**مهم:** این قوانین را قبل از رفتن به production تنظیم کنید!

---

## 🔄 مهاجرت داده‌ها از IndexedDB

اگر قبلاً از برنامه استفاده کرده‌اید و داده‌های محلی دارید، می‌توانید آن‌ها را به Firestore منتقل کنید:

```typescript
import { firebaseDataService } from './services/firebaseDataService';
import { getAllProgress, getAllFavorites, getSettings } from './services/storageService';

async function migrateData(userId: string) {
  const progress = await getAllProgress();
  const favorites = await getAllFavorites();
  const settings = await getSettings();
  
  await firebaseDataService.migrateFromIndexedDB(
    userId,
    progress,
    favorites,
    settings
  );
  
  console.log('Migration complete!');
}
```

---

## 🎯 مراحل بعدی

### فاز ۱: تکمیل اتصال (۱ روز)
- [ ] فعال‌سازی Authentication
- [ ] ایجاد Web App
- [ ] تنظیم `.env.local`
- [ ] تست Login/Register
- [ ] تست Google Sign-In

### فاز ۲: اتصال داده‌ها (۱ روز)
- [ ] تغییر `useProgress` برای استفاده از Firebase
- [ ] تغییر `useFavorites` برای استفاده از Firebase
- [ ] تغییر `SettingsPage` برای ذخیره در Firebase
- [ ] تست همگام‌سازی

### فاز ۳: ویژگی‌های اضافی (اختیاری)
- [ ] پروفایل کاربر
- [ ] Leaderboard
- [ ] اشتراک‌گذاری پیشرفت
- [ ] اعلان‌ها

---

## 🆘 رفع مشکلات

### مشکل: "Firebase: Error (auth/api-key-not-valid)"
**راه‌حل:** مقادیر `.env.local` را بررسی کنید

### مشکل: "Missing or insufficient permissions"
**راه‌حل:** قوانین Firestore را تنظیم کنید

### مشکل: صفحه Login نمایش داده نمی‌شود
**راه‌حل:** 
1. Console browser را بررسی کنید (F12)
2. مطمئن شوید `npm install` انجام شده
3. `npm run dev` را دوباره اجرا کنید

### مشکل: Google Sign-In کار نمی‌کند
**راه‌حل:**
1. در Firebase Console → Authentication → Sign-in method
2. Google را Enable کنید
3. Email پشتیبانی را تنظیم کنید
4. Authorized domains را بررسی کنید

---

## 📚 منابع مفید

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Firestore](https://firebase.google.com/docs/firestore)
- [Firebase React Tutorial](https://firebase.google.com/docs/auth/web/start)

---

## 💡 نکات مهم

### ✅ بهترین روش‌ها
- از Environment Variables استفاده کنید
- قوانین Firestore را قبل از production تنظیم کنید
- داده‌های حساس را در کد hardcode نکنید
- از HTTPS استفاده کنید

### ⚠️ هشدارها
- فایل `.env.local` را به Git commit نکنید
- API keys را公开 نکنید
- قوانین امنیتی را جدی بگیرید
- قبل از production تست کنید

---

## 🎉 نتیجه

پروژه شما اکنون آماده برای سیستم چند کاربره است!

**قدم‌های بعدی:**
1. مراحل بالا را تکمیل کنید
2. تست کنید
3. داده‌ها را مهاجرت دهید
4. به production بروید

**موفق باشید! 🚀**
