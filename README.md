# Money Tracker — نسخة الموبايل (Capacitor)

ده نفس تطبيقك بالظبط (نفس الشاشات، نفس Firebase، نفس البيانات)، بس متقسّم لمشروع ينفع يتحوّل لتطبيق أندرويد / iOS.

## اللي اتغيّر (ومفيش غيره)
| الحاجة | قبل | بعد |
|---|---|---|
| استيراد Firebase | من CDN | من npm (بيشتغل أوفلاين ومش بيعتمد على النت لتحميل الكود) |
| الخطوط | Google Fonts | متحمّلة جوه التطبيق (@fontsource) |
| تسجيل الدخول بجوجل | Popup (مش بيشتغل في الموبايل) | شاشة جوجل الأصلية على الموبايل، والـ Popup زي ما هو على المتصفح |
| ثبات تسجيل الدخول | getAuth | initializeAuth + IndexedDB على الموبايل |
| تصدير CSV | تحميل ملف | شاشة المشاركة (Share) على الموبايل |
| الشاشة | — | دعم الـ notch / safe-area |

باقي الكود (الحسابات، الميزانية، المعاملات، Firestore، الواجهة) **متلمسش**.

## خطوات التشغيل
```bash
npm install
npm run dev            # تجربة على المتصفح

npx cap add android    # مرة واحدة
npm run android        # بيبني ويفتح Android Studio -> Run
# (لـ iPhone: npx cap add ios ثم npm run ios — محتاج Mac)
```
عشان تطلع ملف APK: من Android Studio → Build → Build APK(s).

## ⚠️ مهم: تسجيل الدخول بجوجل على أندرويد
1. افتح Firebase Console → Project settings → Your apps → **Add app → Android**.
2. اكتب Package name: `com.moneytracker.app` (نفس `appId` في capacitor.config.json).
3. ضيف **SHA-1** بتاع الـ keystore (الأمر: `cd android && ./gradlew signingReport`).
4. نزّل `google-services.json` وحطّه في `android/app/`.
5. في Authentication → Sign-in method تأكد إن Google متفعّل.

لو عايز تدخل بالإيميل والباسورد بس، مش محتاج الخطوات دي — شغّال على طول.

## ملاحظة أمان
`firebaseConfig` (الـ apiKey) مش سر في Firebase، لكن لازم **Firestore rules** تكون مقفولة بحيث كل يوزر يقرا ويكتب `users/{uid}` بتاعه بس.
