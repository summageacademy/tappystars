import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { 
    getFirestore, doc, onSnapshot, setDoc, updateDoc, increment, 
    collection, addDoc, query, where, getDocs, orderBy, limit 
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// 1. FIREBASE CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyARFZrw8zUknJPaCfQyLfqZVQZefKeSKDo",
    authDomain: "tappystars.firebaseapp.com",
    projectId: "tappystars",
    storageBucket: "tappystars.firebasestorage.app",
    messagingSenderId: "63927707932",
    appId: "1:63927707932:web:cab22697e0906412c0b2d9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 2. TELEGRAM SAFE API HELPERS
const tg = window.Telegram?.WebApp || {};
if (tg.expand) tg.expand();

const user = tg.initDataUnsafe?.user || { id: "test_dev_user_789", first_name: "Explorer" };

// ==========================================
// TRANSLATION & I18N SYSTEM
// ==========================================
const TRANSLATIONS = {
    en: {
        clicker: "Clicker",
        garage: "Garage",
        tap_to_mine: "Tap to mine coins",
        mining_power: "Mining Power",
        daily_limit: "Daily Limit",
        active_boosters: "Active Boosters",
        no_boosters: "No active boosters running.",
        top_miners: "Top Miners",
        see_all: "See All",
        street_runner: "Street Runner",
        change_car: "Change Car",
        vehicle_upgrades: "Vehicle Performance Upgrades",
        speed_level: "Speed Level",
        speed_desc: "Higher speed +10% coins",
        smooth_level: "Smoothy Level",
        smooth_desc: "Smoother lane switching",
        watch_ad: "Watch Ad",
        power_boosters: "Power Boosters",
        auto_tap: "Auto Tap",
        auto_tap_desc: "+1 Coin / sec (30 mins)",
        multitap: "Multi-Tap",
        multitap_desc: "+2 Coins / tap (30 mins)",
        coin_magnet: "Coin Magnet",
        magnet_desc: "Attracts nearby coins",
        highway_shield: "Highway Shield",
        shield_desc: "Survives 1 free crash",
        double_coins: "2x Minigame Coins",
        double_desc: "Doubles all reward",
        cooldown_note: "Boosters active for 30 mins. 15-minute buying cooldown per booster.",
        highway_rush: "Highway Rush",
        highway_desc: "Dodge heavy traffic and collect coins on the track!",
        play_now: "PLAY NOW",
        how_to_play: "How to Play",
        how_to_play_1: "Use Left and Right buttons to change lanes.",
        how_to_play_2: "Avoid oncoming traffic cars. Traffic density builds over time.",
        how_to_play_3: "Grab gold coins to boost your profile coin balance.",
        how_to_play_4: "Upgrade Speed & Smoothness in your Garage for better gameplay!",
        hello_miner: "Hello, Miner!",
        currency_exchange: "Currency Exchange",
        exchange_rate: "1500 Coins = 1 Star",
        exchange_btn: "Exchange",
        open_marketplace: "Open Marketplace",
        car_dealership: "Car Dealership",
        my_purchases: "My Purchases",
        no_purchases: "No purchases yet.",
        mystery_chests: "Mystery Chests",
        chests_subtitle: "Unlock chests for random Coin & Star prizes!",
        small_box: "Small Box",
        medium_box: "Medium Box",
        mega_box: "Mega Box",
        watch_1_ad: "Watch 1 Ad",
        watch_2_ads: "Watch 2 Ads",
        watch_3_ads: "Watch 3 Ads",
        daily_rewards: "Daily Rewards",
        free_coins_200: "200 Free Coins",
        open_btn: "Open!",
        thanks: "Thanks!",
        you_won: "You Won!",
        congrats: "Congratulations! You received:",
        selected: "Selected",
        equip: "Equip",
        back: "Back",
        your_rank: "Your Leaderboard Rank",
        game_over: "Game Over",
        final_score: "Final Score",
        restart_game: "Play Again",
        main_menu: "Main Menu",
        revive: "Revive (Watch Ad)",
        loading_miners: "Loading Top Miners...",
        error_leaderboard: "Error loading leaderboard.",
        exchange_title: "Exchange Coins",
        exchange_subtitle: "Convert coins into Stars",
        you_pay: "You pay",
        you_receive: "You receive",
        max: "MAX",
        coins: "Coins",
        stars: "Stars",
        rate_info: "1 500 Coins = 1 Star",
        confirm_exchange: "Confirm Exchange",
        not_enough_coins: "Not enough coins",
        enter_amount: "Enter amount",
        privacy_policy: "Privacy Policy",
        terms_of_service: "Terms of Service",
        privacy_title: "Privacy Policy",
        terms_title: "Terms of Service",
        gift_confirm_title: "Confirm Gift Purchase",
        gift_confirm_subtitle: "The gift will be sent to the Telegram account you enter below",
        enter_username: "Telegram Username",
        username_placeholder: "@username",
        gift_delivery_note: "Gifts are usually delivered within 7–10 days to the account you specify.",
        confirm_purchase: "Confirm & Buy",
        cancel: "Cancel",
        username_required: "Please enter a valid Telegram username",
        gift_success: "Order placed! Gift will be sent in 7–10 days.",
        guide_skip: "Skip",
        guide_next: "Next",
        guide_done: "Start playing!",
        guide_loc_home: "Bottom menu · Home",
        guide_loc_boosters: "Bottom menu · Boosters",
        guide_loc_earn: "Bottom menu · Race",
        guide_loc_news: "Bottom menu · Boxes",
        guide_loc_profile: "Bottom menu · Profile",
        guide_loc_done: "You're all set",
        guide_step1_title: "This is where you earn coins",
        guide_step1_desc: "You are on Home (first icon at the bottom). Tap the big blue coin to mine. Limit: 1,000 coins per day. This is your main income.",
        guide_step2_title: "Boosters make you earn faster",
        guide_step2_desc: "This is the Boosters tab (second icon). Watch an ad or spend coins to turn on Auto-Tap, Multi-Tap, Shield, and more. Each booster lasts 30 minutes.",
        guide_step3_title: "Race to earn extra coins",
        guide_step3_desc: "This is the Race tab (third icon). Press PLAY NOW, dodge cars, collect gold coins on the road. Upgrade your car in Home → Garage for better runs.",
        guide_step4_title: "Open boxes with ads",
        guide_step4_desc: "This is the Boxes tab (fourth icon). Watch the required ads on the card, then open it for random coins or Stars. Daily free coins are below.",
        guide_step5_title: "Spend Stars on gifts & cars",
        guide_step5_desc: "This is Profile (fifth icon). 1) Exchange coins for Stars. 2) Open Marketplace to buy real Telegram gifts. 3) Car Dealership to unlock new cars.",
        guide_step6_title: "Quick map of the app",
        guide_step6_desc: "1 Home = tap coins · 2 Boosters = power-ups · 3 Race = minigame · 4 Boxes = ad rewards · 5 Profile = exchange, gifts, cars. You're ready!",
        onboarding_slide1_title: "Welcome to TappyStars",
        onboarding_slide1_desc: "Mine coins daily, race on the highway, and redeem Telegram Gifts.",
        onboarding_slide2_title: "Earn & Upgrade",
        onboarding_slide2_desc: "Drive in the highway minigame, collect coins, and upgrade your garage!",
        onboarding_slide3_title: "The Marketplace",
        onboarding_slide3_desc: "Spend your Stars on real Telegram Gifts sent directly to your account.",
        onboarding_next: "Next",
        onboarding_start: "Start Playing"
    },
    ru: {
        clicker: "Кликер",
        garage: "Гараж",
        tap_to_mine: "Нажимайте для добычи монет",
        mining_power: "Сила майнинга",
        daily_limit: "Дневной лимит",
        active_boosters: "Активные бустеры",
        no_boosters: "Нет активных бустеров.",
        top_miners: "Топ майнеры",
        see_all: "Смотреть все",
        street_runner: "Уличный гонщик",
        change_car: "Сменить авто",
        vehicle_upgrades: "Улучшения автомобиля",
        speed_level: "Уровень скорости",
        speed_desc: "Выше скорость +10% монет",
        smooth_level: "Уровень плавности",
        smooth_desc: "Плавное перестроение",
        watch_ad: "Смотреть рекламу",
        power_boosters: "Бустеры силы",
        auto_tap: "Авто-тапер",
        auto_tap_desc: "+1 Монета / сек (30 мин)",
        multitap: "Мульти-тап",
        multitap_desc: "+2 Монеты / клик (30 мин)",
        coin_magnet: "Магнит монет",
        magnet_desc: "Притягивает близкие монеты",
        highway_shield: "Щит трассы",
        shield_desc: "Защита от 1 аварии",
        double_coins: "2x Монеты в игре",
        double_desc: "Удваивает награду",
        cooldown_note: "Бустеры работают 30 мин. Перезарядка 15 мин.",
        highway_rush: "Гонка на шоссе",
        highway_desc: "Уворачивайтесь от машин и собирайте монеты!",
        play_now: "ИГРАТЬ",
        how_to_play: "Как играть",
        how_to_play_1: "Используйте кнопки Влево и Вправо для смены полосы.",
        how_to_play_2: "Избегайте встречных машин. Плотность трафика растет со временем.",
        how_to_play_3: "Собирайте золотые монеты для пополнения баланса.",
        how_to_play_4: "Улучшайте скорость и плавность в Гараже для лучшей игры!",
        hello_miner: "Привет, Майнер!",
        currency_exchange: "Обмен валюты",
        exchange_rate: "1500 Монет = 1 Звезда",
        exchange_btn: "Обменять",
        open_marketplace: "Маркетплейс",
        car_dealership: "Автосалон",
        my_purchases: "Мои покупки",
        no_purchases: "Пока нет покупок.",
        mystery_chests: "Секретные сундуки",
        chests_subtitle: "Открывайте сундуки и получайте монеты и звезды!",
        small_box: "Малый ящик",
        medium_box: "Средний ящик",
        mega_box: "Мега ящик",
        watch_1_ad: "Смотреть 1 рекламу",
        watch_2_ads: "Смотреть 2 рекламы",
        watch_3_ads: "Смотреть 3 рекламы",
        daily_rewards: "Ежедневные награды",
        free_coins_200: "200 Бесплатных монет",
        open_btn: "Открыть!",
        thanks: "Спасибо!",
        you_won: "Вы выиграли!",
        congrats: "Поздравляем! Вы получили:",
        selected: "Выбрано",
        equip: "Выбрать",
        back: "Назад",
        your_rank: "Ваш ранг в таблице",
        game_over: "Игра окончена",
        final_score: "Итоговый счет",
        restart_game: "Заново",
        main_menu: "Главное меню",
        revive: "Возродиться (Реклама)",
        loading_miners: "Загрузка лучших майнеров...",
        error_leaderboard: "Ошибка загрузки таблицы.",
        exchange_title: "Обмен монет",
        exchange_subtitle: "Конвертируйте монеты в Звёзды",
        you_pay: "Вы отдаёте",
        you_receive: "Вы получаете",
        max: "МАКС",
        coins: "Монеты",
        stars: "Звёзды",
        rate_info: "1 500 Монет = 1 Звезда",
        confirm_exchange: "Подтвердить обмен",
        not_enough_coins: "Недостаточно монет",
        enter_amount: "Введите сумму",
        privacy_policy: "Политика конфиденциальности",
        terms_of_service: "Условия использования",
        privacy_title: "Политика конфиденциальности",
        terms_title: "Условия использования",
        gift_confirm_title: "Подтверждение покупки подарка",
        gift_confirm_subtitle: "Подарок будет отправлен на указанный Telegram-аккаунт",
        enter_username: "Имя пользователя Telegram",
        username_placeholder: "@username",
        gift_delivery_note: "Подарки обычно доставляются в течение 7–10 дней на указанный аккаунт.",
        confirm_purchase: "Подтвердить и купить",
        cancel: "Отмена",
        username_required: "Пожалуйста, введите корректное имя пользователя",
        gift_success: "Заказ оформлен! Подарок будет отправлен через 7–10 дней.",
        guide_skip: "Пропустить",
        guide_next: "Далее",
        guide_done: "Начать играть!",
        guide_loc_home: "Нижнее меню · Главная",
        guide_loc_boosters: "Нижнее меню · Бустеры",
        guide_loc_earn: "Нижнее меню · Гонка",
        guide_loc_news: "Нижнее меню · Ящики",
        guide_loc_profile: "Нижнее меню · Профиль",
        guide_loc_done: "Всё готово",
        guide_step1_title: "Здесь вы зарабатываете монеты",
        guide_step1_desc: "Вы на Главной (первая иконка внизу). Нажимайте на большую монету. Лимит: 1 000 монет в день. Это основной доход.",
        guide_step2_title: "Бустеры ускоряют заработок",
        guide_step2_desc: "Это вкладка Бустеры (вторая иконка). Смотрите рекламу или тратьте монеты: Авто-тап, Мульти-тап, Щит и др. Каждый бустер работает 30 минут.",
        guide_step3_title: "Гонка: доп. монеты",
        guide_step3_desc: "Это вкладка Гонка (третья иконка). Нажмите ИГРАТЬ, уворачивайтесь от машин, собирайте монеты. Улучшайте авто: Главная → Гараж.",
        guide_step4_title: "Открывайте ящики за рекламу",
        guide_step4_desc: "Это вкладка Ящики (четвёртая иконка). Смотрите нужное число реклам на карточке, затем открывайте. Ниже есть ежедневные монеты.",
        guide_step5_title: "Звёзды, подарки и машины",
        guide_step5_desc: "Это Профиль (пятая иконка). 1) Обмен монет → Звёзды. 2) Маркетплейс — реальные подарки Telegram. 3) Автосалон — новые машины.",
        guide_step6_title: "Карта приложения",
        guide_step6_desc: "1 Главная = тап · 2 Бустеры = усиления · 3 Гонка = мини-игра · 4 Ящики = награды за рекламу · 5 Профиль = обмен, подарки, авто. Готово!",
        onboarding_slide1_title: "Добро пожаловать в TappyStars",
        onboarding_slide1_desc: "Добывайте монеты каждый день, гоняйте по шоссе и обменивайте на подарки Telegram.",
        onboarding_slide2_title: "Зарабатывайте и улучшайте",
        onboarding_slide2_desc: "Играйте в гонку, собирайте монеты и улучшайте авто в гараже!",
        onboarding_slide3_title: "Маркетплейс",
        onboarding_slide3_desc: "Тратьте Звёзды на реальные подарки Telegram — они приходят на ваш аккаунт.",
        onboarding_next: "Далее",
        onboarding_start: "Начать играть!"
    },
    uz: {
        clicker: "Kliker",
        garage: "Garaj",
        tap_to_mine: "Tanga olish uchun bosing",
        mining_power: "Tapning kuchi",
        daily_limit: "Kunlik limit",
        active_boosters: "Faol busterlar",
        no_boosters: "Faol busterlar yo'q.",
        top_miners: "Eng yaxshilar",
        see_all: "Barchasini ko'rish",
        street_runner: "Poygachi",
        change_car: "Mashinani almashtirish",
        vehicle_upgrades: "Mashina takomillashtiruvi",
        speed_level: "Tezlik darajasi",
        speed_desc: "Yuqori tezlik +10% tanga",
        smooth_level: "Silliqlik darajasi",
        smooth_desc: "Qulay burilish",
        watch_ad: "Reklama ko'rish",
        power_boosters: "Kuch busterlari",
        auto_tap: "Avto-klik",
        auto_tap_desc: "+1 Tanga / sek (30 daq)",
        multitap: "Ko'p klik",
        multitap_desc: "+2 Tanga / bosish (30 daq)",
        coin_magnet: "Tanga magneti",
        magnet_desc: "Tangalarni tortadi",
        highway_shield: "Yo'l qalqoni",
        shield_desc: "1 marta toqnashuvdan saqlaydi",
        double_coins: "2x O'yin tangalari",
        double_desc: "Mukofotni 2 baravar oshiradi",
        cooldown_note: "Busterlar 30 daqiqa ishlaydi. 15 daqiqa kutiladi.",
        highway_rush: "Katta yo'l poygasi",
        highway_desc: "Mashinalardan qoching va tangalarni yiging!",
        play_now: "O'YNASH",
        how_to_play: "Qanday o'ynaladi",
        how_to_play_1: "Bo'lakni o'zgartirish uchun Chap va O'ng tugmalaridan foydalaning.",
        how_to_play_2: "Raqib mashinalardan qoching. Yo'l harakati vaqt o'tishi bilan zichlashadi.",
        how_to_play_3: "Tanga balansingizni oshirish uchun oltin tangalarni yig'ing.",
        how_to_play_4: "O'yinni yaxshilash uchun Garajda Tezlik va Silliqlikni oshiring!",
        hello_miner: "Salom, Konchi!",
        currency_exchange: "Valyuta ayirboshlash",
        exchange_rate: "1500 Tanga = 1 Yulduz",
        exchange_btn: "Ayirboshlash",
        open_marketplace: "Bozor",
        car_dealership: "Avtosalon",
        my_purchases: "Xaridlarim",
        no_purchases: "Hali xaridlar yo'q.",
        mystery_chests: "Sirli sandiqlar",
        chests_subtitle: "Sandiqlarni oching va Tanga hamda Yulduzlar yuting!",
        small_box: "Kichik quti",
        medium_box: "O'rtacha quti",
        mega_box: "Katta quti",
        watch_1_ad: "1 Reklama ko'rish",
        watch_2_ads: "2 Reklama ko'rish",
        watch_3_ads: "3 Reklama ko'rish",
        daily_rewards: "Kunlik mukofotlar",
        free_coins_200: "200 Bepul tanga",
        open_btn: "Ochish!",
        thanks: "Rahmat!",
        you_won: "Siz yutdingiz!",
        congrats: "Tabriklaymiz! Siz qabul qildingiz:",
        selected: "Tanlangan",
        equip: "Jihozlash",
        back: "Orqaga",
        your_rank: "Sizning reytingdagi o'rningiz",
        game_over: "O'yin tugadi",
        final_score: "Yakuniy hisob",
        restart_game: "Qaytadan",
        main_menu: "Asosiy menyu",
        revive: "Tiklanish (Reklama)",
        loading_miners: "Eng yaxshilar yuklanmoqda...",
        error_leaderboard: "Reytingni yuklashda xatolik.",
        exchange_title: "Tangalarni almashtirish",
        exchange_subtitle: "Tangalarni Yulduzlarga aylantiring",
        you_pay: "Siz berasiz",
        you_receive: "Siz olasiz",
        max: "MAX",
        coins: "Tangalar",
        stars: "Yulduzlar",
        rate_info: "1 500 Tanga = 1 Yulduz",
        confirm_exchange: "Almashtirishni tasdiqlash",
        not_enough_coins: "Yetarli tanga yo'q",
        enter_amount: "Miqdorni kiriting",
        privacy_policy: "Maxfiylik siyosati",
        terms_of_service: "Foydalanish shartlari",
        privacy_title: "Maxfiylik siyosati",
        terms_title: "Foydalanish shartlari",
        gift_confirm_title: "Sovg‘a sotib olishni tasdiqlash",
        gift_confirm_subtitle: "Sovg‘a kiritilgan Telegram hisobiga yuboriladi",
        enter_username: "Telegram foydalanuvchi nomi",
        username_placeholder: "@username",
        gift_delivery_note: "Sovg‘alar odatda 7–10 kun ichida kiritilgan hisobga yuboriladi.",
        confirm_purchase: "Tasdiqlash va sotib olish",
        cancel: "Bekor qilish",
        username_required: "Iltimos, to‘g‘ri Telegram foydalanuvchi nomini kiriting",
        gift_success: "Buyurtma qabul qilindi! Sovg‘a 7–10 kun ichida yuboriladi.",
        guide_skip: "O'tkazib yuborish",
        guide_next: "Keyingi",
        guide_done: "O'ynashni boshlash!",
        guide_loc_home: "Pastki menyu · Bosh sahifa",
        guide_loc_boosters: "Pastki menyu · Busterlar",
        guide_loc_earn: "Pastki menyu · Poyga",
        guide_loc_news: "Pastki menyu · Qutilar",
        guide_loc_profile: "Pastki menyu · Profil",
        guide_loc_done: "Hammasi tayyor",
        guide_step1_title: "Tanga shu yerda ishlanadi",
        guide_step1_desc: "Siz Bosh sahifadasiz (pastdagi 1-ikonka). Katta tangaga bosing. Kunlik limit: 1 000. Bu asosiy daromad.",
        guide_step2_title: "Busterlar daromadni oshiradi",
        guide_step2_desc: "Bu Busterlar bo'limi (2-ikonka). Reklama ko'ring yoki tanga sarflang: Avto-klik, Ko'p klik, Qalqon va boshqalar. Har biri 30 daqiqa ishlaydi.",
        guide_step3_title: "Poyga: qo'shimcha tanga",
        guide_step3_desc: "Bu Poyga bo'limi (3-ikonka). O'YNASH ni bosing, mashinalardan qoching, oltin tanga yig'ing. Mashinani Bosh sahifa → Garajda yaxshilang.",
        guide_step4_title: "Qutilar oching",
        guide_step4_desc: "Bu Qutilar bo'limi (4-ikonka). Sandiqlarni olish uchun reklama ko'ring, keyin oching. Pastda kunlik bepul tangalar ham bor.",
        guide_step5_title: "Yulduz, sovg'a va mashinalar",
        guide_step5_desc: "Bu Profil (5-ikonka). 1) Tangani Yulduzga almashtiring. 2) Bozordan haqiqiy Telegram sovg'alar oling 3) Avtosalondan yangi mashinalar sotib oling.",
        guide_step6_title: "Ilova xaritasi",
        guide_step6_desc: "1 Bosh = bosish · 2 Busterlar · 3 Poyga · 4 Qutilar = reklama mukofoti · 5 Profil = almashish, sovg'a va mashinalar. Tayyorsiz!",
        onboarding_slide1_title: "TappyStars ga xush kelibsiz",
        onboarding_slide1_desc: "Har kuni tanga qazing, yo‘lda poyga qiling va Telegram sovg‘alarini oling.",
        onboarding_slide2_title: "Daromad va yaxshilash",
        onboarding_slide2_desc: "Poyga o‘ynang, tanga yig‘ing va garajda mashinani yaxshilang!",
        onboarding_slide3_title: "Bozor",
        onboarding_slide3_desc: "Yulduzlarni haqiqiy Telegram sovg‘alariga sarflang — ular hisobingizga yuboriladi.",
        onboarding_next: "Keyingi",
        onboarding_start: "O'ynashni boshlash!"
    }
};

function detectUserLanguage() {
    const savedLang = localStorage.getItem('tappy_lang');
    if (savedLang && ['en', 'ru', 'uz'].includes(savedLang)) return savedLang;

    const tgCode = (tg.initDataUnsafe?.user?.language_code || navigator.language || 'en').toLowerCase();
    if (tgCode.startsWith('ru')) return 'ru';
    if (tgCode.startsWith('uz')) return 'uz';
    return 'en';
}

let currentLang = detectUserLanguage();

function t(key) {
    return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['en']?.[key] || key;
}

window.changeLanguage = (lang) => {
    if (!['en', 'ru', 'uz'].includes(lang)) return;
    currentLang = lang;
    localStorage.setItem('tappy_lang', lang);
    applyLanguage();
    safeHaptic('selection');
};


function safeHaptic(type, style) {
    if (tg.isVersionAtLeast && tg.isVersionAtLeast('6.1') && tg.HapticFeedback) {
        try {
            if (type === 'impact') tg.HapticFeedback.impactOccurred(style);
            else if (type === 'selection') tg.HapticFeedback.selectionChanged();
            else if (type === 'notification') tg.HapticFeedback.notificationOccurred(style);
        } catch (e) { console.warn("Haptic error:", e); }
    }
}

// Custom Modal Replacer
let alertTimeout;
function safeAlert(message, isCrucial = false) {
    const modal = document.getElementById('custom-modal');
    const text = document.getElementById('custom-modal-text');
    const btn = document.getElementById('custom-modal-btn');

    if (modal && text) {
        text.innerText = message;
        modal.style.display = 'flex';
        safeHaptic('selection');

        if (alertTimeout) clearTimeout(alertTimeout);

        if (isCrucial) {
            modal.style.pointerEvents = 'auto';
            modal.style.background = 'rgba(0, 0, 0, 0.4)';
            if (btn) btn.style.display = 'block'; 
        } else {
            modal.style.pointerEvents = 'none';
            modal.style.background = 'transparent';
            if (btn) btn.style.display = 'none';

            alertTimeout = setTimeout(() => {
                closeModal();
            }, 3000);
        }
    } else {
        alert(message);
    }
}

window.closeModal = () => {
    const modal = document.getElementById('custom-modal');
    if (modal) modal.style.display = 'none';
    safeHaptic('selection');
    if (alertTimeout) clearTimeout(alertTimeout);
};

// ==========================================
// CHEST REWARD MODAL LOGIC
// ==========================================
window.showChestRewardModal = (prizeType, amount) => {
    const modal = document.getElementById('chest-reward-modal');
    const titleEl = document.getElementById('chest-reward-title');
    const subEl = document.getElementById('chest-reward-sub');
    const iconEl = document.getElementById('chest-reward-icon');
    const amountEl = document.getElementById('chest-reward-amount');
    const thanksBtn = document.getElementById('chest-reward-thanks-btn');

    if (!modal) return;

    if (titleEl) titleEl.innerText = t('you_won');
    if (subEl) subEl.innerText = t('congrats');
    if (thanksBtn) thanksBtn.innerText = t('thanks');

    if (prizeType === 'stars') {
        if (iconEl) iconEl.innerText = '⭐';
        if (amountEl) amountEl.innerText = `+${amount} ${amount === 1 ? 'Star' : 'Stars'}`;
    } else {
        if (iconEl) iconEl.innerText = '🪙';
        if (amountEl) amountEl.innerText = `+${amount.toLocaleString()} Coins`;
    }

    modal.style.display = 'flex';
    safeHaptic('notification', 'success');
};

window.closeChestRewardModal = () => {
    const modal = document.getElementById('chest-reward-modal');
    if (modal) modal.style.display = 'none';
    safeHaptic('selection');
};

window.handleChestModalBackdropClick = (e) => {
    if (e.target.id === 'chest-reward-modal') {
        closeChestRewardModal();
    }
};

// 3. CAR CONFIGURATION DATA
const CAR_DATABASE = {
    car_runner: {
        id: "car_runner",
        name: "Steel Runner",
        desc: "Muted industrial hatchback",
        cost: 0,
        color: "#4A5568",
        accent: "#2D3748",
        baseSpeed: 1.0,
        baseSmoothness: 1.0
    },
    car_speedster: {
        id: "car_speedster",
        name: "Matte Crimson",
        desc: "Aerodynamic dark racer",
        cost: 800,
        color: "#7B2C2C",
        accent: "#4A1D1D",
        baseSpeed: 1.3,
        baseSmoothness: 1.2
    },
    car_phantom: {
        id: "car_phantom",
        name: "Shadow Phantom",
        desc: "Stealth highway interceptor",
        cost: 2000,
        color: "#3C3D52",
        accent: "#252636",
        baseSpeed: 1.6,
        baseSmoothness: 1.5
    },
    car_beast: {
        id: "car_beast",
        name: "Midnight Beast",
        desc: "Heavy industrial conqueror",
        cost: 5000,
        color: "#2C3E50",
        accent: "#1A252F",
        baseSpeed: 2.0,
        baseSmoothness: 1.8
    }
};

function renderCarSVG(carId, width = 60, height = 100) {
    const car = CAR_DATABASE[carId] || CAR_DATABASE.car_runner;
    return `
        <svg width="${width}" height="${height}" viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="12" width="7" height="18" rx="2" fill="#0D0D0D"/>
            <rect x="51" y="12" width="7" height="18" rx="2" fill="#0D0D0D"/>
            <rect x="2" y="70" width="7" height="18" rx="2" fill="#0D0D0D"/>
            <rect x="51" y="70" width="7" height="18" rx="2" fill="#0D0D0D"/>
            
            <rect x="8" y="5" width="44" height="90" rx="10" fill="${car.color}" stroke="#141414" stroke-width="2"/>
            <path d="M 10 32 L 10 18 C 10 10 18 6 30 6 C 42 6 50 10 50 18 L 50 32 Z" fill="#141414"/>
            <line x1="22" y1="10" x2="22" y2="28" stroke="#262626" stroke-width="1.5"/>
            <line x1="38" y1="10" x2="38" y2="28" stroke="#262626" stroke-width="1.5"/>

            <path d="M 14 34 L 46 34 L 42 46 L 18 46 Z" fill="#1A2530"/>
            <path d="M 16 36 L 44 36 L 42 40 L 18 40 Z" fill="#2C3E50" opacity="0.6"/>
            
            <rect x="16" y="47" width="28" height="22" rx="3" fill="${car.accent}"/>
            <path d="M 18 71 L 42 71 L 44 79 L 16 79 Z" fill="#1A2530"/>

            <rect x="11" y="6" width="8" height="3" rx="1" fill="#E2E8F0"/>
            <rect x="41" y="6" width="8" height="3" rx="1" fill="#E2E8F0"/>

            <rect x="12" y="92" width="10" height="3" rx="1" fill="#9B2C2C"/>
            <rect x="38" y="92" width="10" height="3" rx="1" fill="#9B2C2C"/>
        </svg>
    `;
}

function drawRealisticCar(ctx, x, y, width, height, bodyColor, accentColor, isPlayer = false, steerAngle = 0) {
    if (isNaN(x) || isNaN(y)) return;
    
    ctx.save();
    ctx.translate(x, y);

    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.beginPath();
    ctx.roundRect(-width / 2 + 4, -height / 2 + 6, width, height, 10);
    ctx.fill();

    const headlightGlow = ctx.createLinearGradient(0, -height / 2, 0, -height / 2 - 80);
    headlightGlow.addColorStop(0, "rgba(255, 255, 230, 0.35)");
    headlightGlow.addColorStop(1, "rgba(255, 255, 230, 0.0)");
    
    ctx.fillStyle = headlightGlow;
    ctx.beginPath();
    ctx.moveTo(-width / 2 + 4, -height / 2);
    ctx.lineTo(-width / 2 - 18, -height / 2 - 80);
    ctx.lineTo(width / 2 + 18, -height / 2 - 80);
    ctx.lineTo(width / 2 - 4, -height / 2);
    ctx.closePath();
    ctx.fill();

    const wheelW = 6, wheelH = 14;
    ctx.fillStyle = "#111111";
    
    ctx.save();
    ctx.translate(-width / 2 + 2, -height / 2 + 16);
    ctx.rotate((steerAngle || 0) * 0.3);
    ctx.fillRect(-wheelW / 2, -wheelH / 2, wheelW, wheelH);
    ctx.restore();

    ctx.save();
    ctx.translate(width / 2 - 2, -height / 2 + 16);
    ctx.rotate((steerAngle || 0) * 0.3);
    ctx.fillRect(-wheelW / 2, -wheelH / 2, wheelW, wheelH);
    ctx.restore();

    ctx.fillRect(-width / 2, height / 2 - 22, wheelW, wheelH);
    ctx.fillRect(width / 2 - wheelW, height / 2 - 22, wheelW, wheelH);

    ctx.fillStyle = bodyColor;
    ctx.strokeStyle = "#121212";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-width / 2, -height / 2, width, height, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#141414";
    ctx.beginPath();
    ctx.moveTo(-width / 2 + 3, -height / 2 + 30);
    ctx.lineTo(-width / 2 + 3, -height / 2 + 14);
    ctx.quadraticCurveTo(-width / 2 + 6, -height / 2 + 3, 0, -height / 2 + 3);
    ctx.quadraticCurveTo(width / 2 - 6, -height / 2 + 3, width / 2 - 3, -height / 2 + 14);
    ctx.lineTo(width / 2 - 3, -height / 2 + 30);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "#2A2A2A";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-width / 4, -height / 2 + 6);
    ctx.lineTo(-width / 4 + 2, -height / 2 + 28);
    ctx.moveTo(width / 4, -height / 2 + 6);
    ctx.lineTo(width / 4 - 2, -height / 2 + 28);
    ctx.stroke();

    ctx.fillStyle = "#1A232A";
    ctx.beginPath();
    ctx.moveTo(-width / 2 + 5, -height / 2 + 32);
    ctx.lineTo(width / 2 - 5, -height / 2 + 32);
    ctx.lineTo(width / 2 - 8, -height / 2 + 46);
    ctx.lineTo(-width / 2 + 8, -height / 2 + 46);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    ctx.beginPath();
    ctx.moveTo(-width / 2 + 8, -height / 2 + 34);
    ctx.lineTo(0, -height / 2 + 34);
    ctx.lineTo(-width / 4, -height / 2 + 44);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = accentColor || "#222222";
    ctx.beginPath();
    ctx.roundRect(-width / 2 + 7, -height / 2 + 47, width - 14, 22, 4);
    ctx.fill();

    ctx.fillStyle = "#1A232A";
    ctx.beginPath();
    ctx.moveTo(-width / 2 + 8, -height / 2 + 70);
    ctx.lineTo(width / 2 - 8, -height / 2 + 70);
    ctx.lineTo(width / 2 - 6, -height / 2 + 80);
    ctx.lineTo(-width / 2 + 6, -height / 2 + 80);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#141414";
    ctx.fillRect(-width / 2 - 4, -height / 2 + 33, 4, 7);
    ctx.fillRect(width / 2, -height / 2 + 33, 4, 7);

    ctx.fillStyle = "#E2E8F0";
    ctx.fillRect(-width / 2 + 4, -height / 2 + 1, 7, 3);
    ctx.fillRect(width / 2 - 11, -height / 2 + 1, 7, 3);

    ctx.fillStyle = "#A71D2A";
    ctx.fillRect(-width / 2 + 4, height / 2 - 3, 8, 3);
    ctx.fillRect(width / 2 - 12, height / 2 - 3, 8, 3);

    ctx.restore();
}

// 4. STATE & DATA SYNC
const userRef = doc(db, "users", user.id.toString());
let userData = null;
let isAppInitialized = false;

let lastTapTimestamp = 0;
let unsyncedCoins = 0;
let syncTimer = null;
let lastSyncTime = 0;
let isSyncing = false;

const getTodayDate = () => new Date().toISOString().split('T')[0];

onSnapshot(userRef, async (docSnap) => {
    const today = getTodayDate();
    // Always key by Telegram numeric ID — username changes never wipe progress
    const stableId = user.id.toString();
    const displayName = user.username ? `@${user.username}` : (user.first_name || "Unknown");
    const rawUsername = user.username || null;

    if (docSnap.exists()) {
        userData = docSnap.data();

        if (!userData.ownedCars) userData.ownedCars = ["car_runner"];
        if (!userData.currentCar) userData.currentCar = "car_runner";
        if (!userData.carStats) userData.carStats = { speed: 1, smoothness: 1 };

        // Sync identity only (never touches coins/stars/cars)
        const identityPatch = {};
        if (userData.telegramId !== stableId) identityPatch.telegramId = stableId;
        if (rawUsername && userData.username !== rawUsername) identityPatch.username = rawUsername;
        if (displayName !== "Unknown" && userData.name !== displayName) identityPatch.name = displayName;
        if (Object.keys(identityPatch).length > 0) {
            await updateDoc(userRef, identityPatch);
            Object.assign(userData, identityPatch);
        }
        
        if (userData.lastTapDate !== today) {
            userData.tapCoinsEarned = 0;
            userData.lastTapDate = today;
            await updateDoc(userRef, { tapCoinsEarned: 0, lastTapDate: today });
        }

        applyLanguage();
        if (!isAppInitialized) {
            isAppInitialized = true;
            routeUser();
            fetchPurchases();
            fetchLeaderboard();
            startLoopTimer();
            initPreviewHighwayAnimation();
        }
    } else {
        const initialPayload = { 
            telegramId: stableId,
            username: rawUsername,
            name: displayName, 
            stars: 0, 
            coins: 0, 
            tapCoinsEarned: 0,
            lastTapDate: today,
            activeBoosters: {}, 
            cooldowns: {},      
            hasOnboarded: false, 
            hasCompletedGuide: false,
            hasClaimedWelcome: false,
            lastAutoTapTime: 0,
            ownedCars: ["car_runner"],
            currentCar: "car_runner",
            carStats: { speed: 1, smoothness: 1 }
        };
        await setDoc(userRef, initialPayload);
    }
});

function getEffectiveMineRate() {
    let rate = 1;
    const now = Date.now();
    if (userData?.activeBoosters?.multitap && userData.activeBoosters.multitap > now) {
        rate += 2;
    }
    return rate;
}

function getTotalCoins() {
    return (userData?.coins || 0) + unsyncedCoins;
}

function updateUI() {
    if (!userData) return;
    const displayCoins = getTotalCoins();
    const displayTapCoins = (userData.tapCoinsEarned || 0) + unsyncedCoins;

    document.getElementById('star-bal').innerText = (userData.stars || 0).toLocaleString();
    document.getElementById('coin-bal').innerText = displayCoins.toLocaleString();
    document.getElementById('tap-coins-val').innerText = displayTapCoins.toLocaleString();
    document.getElementById('mine-rate').innerText = getEffectiveMineRate();

    const currentCarObj = CAR_DATABASE[userData.currentCar || "car_runner"];
    const renderEl = document.getElementById('garage-car-render');
    if (renderEl) renderEl.innerHTML = renderCarSVG(userData.currentCar, 80, 130);
    
    const titleEl = document.getElementById('garage-car-title');
    if (titleEl) titleEl.innerText = currentCarObj.name;
    const descEl = document.getElementById('garage-car-desc');
    if (descEl) descEl.innerText = currentCarObj.desc;

    const spdLvl = userData.carStats?.speed || 1;
    const smtLvl = userData.carStats?.smoothness || 1;
    document.getElementById('speed-lvl-val').innerText = spdLvl;
    document.getElementById('smooth-lvl-val').innerText = smtLvl;

    const spdBtn = document.getElementById('btn-upgrade-speed');
    const smtBtn = document.getElementById('btn-upgrade-smooth');
    if (spdBtn) spdBtn.innerText = `${spdLvl * 1000} C`;
    if (smtBtn) smtBtn.innerText = `${smtLvl * 1000} C`;

    renderActiveBoostersUI();
    renderBoosterButtonsUI();
    renderAdsUI();
}

async function syncCoinsToDatabase() {
    if (unsyncedCoins <= 0 || !userData || isSyncing) return;
    isSyncing = true;
    
    const coinsToSync = unsyncedCoins;
    unsyncedCoins = 0;

    const now = Date.now();
    const updatePayload = { 
        coins: increment(coinsToSync),
        tapCoinsEarned: increment(coinsToSync)
    };

    if (userData.activeBoosters?.auto && userData.activeBoosters.auto > now) {
        updatePayload.lastAutoTapTime = now;
    }

    try {
        await updateDoc(userRef, updatePayload);
    } catch (e) {
        console.error("Sync error:", e);
        unsyncedCoins += coinsToSync;
    } finally {
        isSyncing = false;
    }
}

function scheduleDatabaseSync() {
    const SYNC_INTERVAL = 5000;
    const now = Date.now();

    if (now - lastSyncTime >= SYNC_INTERVAL) {
        lastSyncTime = now;
        syncCoinsToDatabase();
    } else if (!syncTimer) {
        syncTimer = setTimeout(() => {
            syncTimer = null;
            lastSyncTime = Date.now();
            syncCoinsToDatabase();
        }, SYNC_INTERVAL - (now - lastSyncTime));
    }
}

function renderActiveBoostersUI() {
    const listEl = document.getElementById('active-boosts-list');
    if (!listEl || !userData) return;

    const now = Date.now();
    const active = userData.activeBoosters || {};
    let html = '';

    const boosterNames = {
        auto: `${t('auto_tap')} (+1/sec)`,
        multitap: `${t('multitap')} (+2/tap)`,
        magnet: t('coin_magnet'),
        shield: t('highway_shield'),
        double: t('double_coins')
    };

    Object.keys(active).forEach(key => {
        const expiresAt = active[key];
        if (expiresAt > now) {
            const remainingSec = Math.ceil((expiresAt - now) / 1000);
            const min = Math.max(1, Math.ceil(remainingSec / 60));

            html += `
                <div class="glass-card" style="padding: 12px 15px; margin-bottom: 10px; margin-top: 10px; box-shadow: 2px 2px 0px var(--border-hard); justify-content: space-between; align-items: center;">
                    <span style="font-weight: 700; color: var(--text-main); font-size: 0.95em;">${boosterNames[key] || key}</span>
                    <span style="background: var(--surface); color: var(--text-main); border: 2px solid var(--border-hard); box-shadow: 2px 2px 0px var(--border-hard); padding: 6px 14px; border-radius: 8px; font-weight: 700; font-size: 0.9em;">${min}m</span>
                </div>
            `;
        }
    });

    listEl.innerHTML = html || `<p class="no-boosts" style="margin-top: 20px; color: var(--text-muted); text-align: center; font-size: 0.9em; font-weight: 500;">${t('no_boosters')}</p>`;
}

function renderBoosterButtonsUI() {
    if (!userData) return;
    const now = Date.now();
    const cooldowns = userData.cooldowns || {};

    const coinCosts = { shield: 1500, double: 2000 };
    Object.keys(coinCosts).forEach(key => {
        const btn = document.getElementById(`btn-boost-${key}`);
        if (!btn) return;
        const readyAt = cooldowns[key] || 0;
        
        if (readyAt > now) {
            const remainingSec = Math.ceil((readyAt - now) / 1000);
            const min = Math.max(1, Math.ceil(remainingSec / 60));
            btn.innerText = `${min}m`;
            btn.disabled = true;
            btn.style.opacity = "0.5";
        } else {
            btn.innerText = `${coinCosts[key]} C`;
            btn.disabled = false;
            btn.style.opacity = "1";
        }
    });

    const adBoosters = ['auto', 'multitap', 'magnet'];
    adBoosters.forEach(key => {
        const btn = document.getElementById(`btn-boost-${key}`);
        if (!btn) return;
        const readyAt = cooldowns[key] || 0;
        
        if (readyAt > now) {
            const remainingSec = Math.ceil((readyAt - now) / 1000);
            const min = Math.max(1, Math.ceil(remainingSec / 60));
            btn.innerText = `${min}m wait`;
            btn.disabled = true;
            btn.style.opacity = "0.5";
        } else {
            btn.innerText = t('watch_ad');
            btn.disabled = false;
            btn.style.opacity = "1";
        }
    });
}

window.buyBoosterAd = async (boosterType) => {
    if (!userData) return;
    await syncCoinsToDatabase();
    
    const now = Date.now();
    const readyAt = userData.cooldowns?.[boosterType] || 0;

    if (now < readyAt) {
        const remainingMin = Math.ceil((readyAt - now) / 60000);
        safeAlert(`Cooldown active! Try again in ${remainingMin} minute(s).`);
        return;
    }

    if (!window.Adsgram) {
        safeAlert("Ad provider unavailable.");
        return;
    }

    try {
        const AdController = window.Adsgram.init({ blockId: '44503', debug: false });
        await AdController.show().then(async () => {
            const duration = 30 * 60 * 1000;  
            const cooldown = 15 * 60 * 1000;  

            await updateDoc(userRef, {
                [`activeBoosters.${boosterType}`]: now + duration,
                [`cooldowns.${boosterType}`]: now + cooldown
            });

            if (!userData.activeBoosters) userData.activeBoosters = {};
            if (!userData.cooldowns) userData.cooldowns = {};
            userData.activeBoosters[boosterType] = now + duration;
            userData.cooldowns[boosterType] = now + cooldown;

            safeHaptic('notification', 'success');
            safeAlert("Ad watched! Booster activated for 30 minutes!");
            updateUI();
        }).catch((err) => {
            console.warn("Ad skipped or failed:", err);
            safeAlert("Ad skipped or failed. Booster not activated.");
        });
    } catch(e) {
        console.error(e);
        safeAlert("Ads are currently unavailable.");
    }
};

function startLoopTimer() {
    setInterval(async () => {
        if (!userData) return;
        const now = Date.now();

        renderActiveBoostersUI();
        renderBoosterButtonsUI();
        renderAdsUI();

        if (userData.activeBoosters?.auto && userData.activeBoosters.auto > now) {
            const currentTapCoins = (userData.tapCoinsEarned || 0) + unsyncedCoins;
            if (currentTapCoins < 1000) {
                unsyncedCoins += 1;
                updateUI();
                scheduleDatabaseSync();
            }
        }
    }, 1000);
}

window.addEventListener('beforeunload', () => { syncCoinsToDatabase(); });
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        syncCoinsToDatabase();
    }
});

window.renderAdsUI = function() {
    if (!userData) return;
    const now = Date.now();
    const cooldowns = userData.cooldowns || {};

    const adTypes = { standard: 'btn-ad-standard', premium: 'btn-ad-premium' };

    Object.keys(adTypes).forEach(type => {
        const btn = document.getElementById(adTypes[type]);
        if (!btn) return;
        
        const readyAt = cooldowns[`ad_${type}`] || 0;
        
        if (readyAt > now) {
            const remainingSec = Math.ceil((readyAt - now) / 1000);
            const min = Math.max(1, Math.ceil(remainingSec / 60));
            btn.innerText = `${min}m`;
            btn.disabled = true;
            btn.style.opacity = "0.5";
        } else {
            btn.innerText = t('watch_ad');
            btn.disabled = false;
            btn.style.opacity = "1";
        }
    });
};

function renderAdsUI() {
    window.renderAdsUI();
}

window.watchAd = async (type, blockId, rewardAmount) => {
    if (!userData) return false;
    await syncCoinsToDatabase();

    const now = Date.now();
    const cooldownKey = `ad_${type}`;
    const readyAt = userData.cooldowns?.[cooldownKey] || 0;

    if (now < readyAt) {
        safeAlert("Ad is not ready yet! Please wait for the cooldown.");
        return false;
    }

    if (!window.Adsgram) {
        safeAlert("Ad provider unavailable.");
        return false;
    }

    try {
        const AdController = window.Adsgram.init({ blockId: blockId, debug: false });
        
        const success = await AdController.show().then(async () => {
            const cooldownDuration = 5 * 60 * 1000;
            
            await updateDoc(userRef, {
                coins: increment(rewardAmount),
                [`cooldowns.${cooldownKey}`]: now + cooldownDuration
            });
            
            userData.coins += rewardAmount;
            if (!userData.cooldowns) userData.cooldowns = {};
            userData.cooldowns[cooldownKey] = now + cooldownDuration;

            safeHaptic('notification', 'success');
            if (rewardAmount > 0) {
                safeAlert(`Ad watched successfully! +${rewardAmount} Coins`);
            }
            updateUI();
            return true;
        }).catch((err) => {
            console.warn("Ad skipped or failed:", err);
            safeAlert("Ad skipped or failed to load. No reward given.");
            return false;
        });

        return success;
    } catch (e) {
        console.error("Adsgram init error:", e);
        safeAlert("Ads are currently unavailable.");
        return false;
    }
};

function routeUser() {
    if (!userData.hasOnboarded) {
        document.getElementById('onboarding-modal').style.display = 'flex';
    } else {
        showMainApp();
        if (!userData.hasCompletedGuide) {
            setTimeout(() => startGuide(), 500);
        }
    }
}

function showMainApp() {
    document.getElementById('top-bar').style.display = 'flex';
    document.getElementById('app-content').style.display = 'block';
    document.getElementById('bottom-nav').style.display = 'flex';
}

window.switchHomeSubTab = (subTab) => {
    document.querySelectorAll('.subtab-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.sub-tab-btn').forEach(el => el.classList.remove('active'));

    if (subTab === 'clicker') {
        document.getElementById('home-subtab-clicker').style.display = 'block';
        document.getElementById('subtab-btn-clicker').classList.add('active');
    } else {
        document.getElementById('home-subtab-garage').style.display = 'block';
        document.getElementById('subtab-btn-garage').classList.add('active');
    }
    safeHaptic('selection');

    if (typeof guideActive !== 'undefined' && guideActive && !guideSwitchingTab) {
        return;
    }
};

window.switchGarageCar = async () => {
    if (!userData) return;
    const owned = userData.ownedCars || ["car_runner"];
    const currentIndex = owned.indexOf(userData.currentCar);
    const nextIndex = (currentIndex + 1) % owned.length;
    const nextCar = owned[nextIndex];

    await updateDoc(userRef, { currentCar: nextCar });
    userData.currentCar = nextCar;
    updateUI();
    safeHaptic('selection');
};

window.upgradeCarStat = async (stat) => {
    if (!userData) return;
    await syncCoinsToDatabase();

    const currentLvl = userData.carStats?.[stat] || 1;
    const cost = currentLvl * 1000;

    if (userData.coins >= cost) {
        const newLvl = currentLvl + 1;
        await updateDoc(userRef, {
            coins: increment(-cost),
            [`carStats.${stat}`]: newLvl
        });
        userData.coins -= cost;
        userData.carStats[stat] = newLvl;

        safeHaptic('notification', 'success');
        safeAlert(`Upgraded ${stat.toUpperCase()} to Level ${newLvl}!`);
        updateUI();
    } else {
        safeAlert(`Need ${cost} Coins for this upgrade!`);
    }
};

window.upgradeCarStatAd = async (stat) => {
    if (!userData) return;
    await syncCoinsToDatabase();

    const now = Date.now();
    const cooldownKey = `ad_upgrade_${stat}`;
    const readyAt = userData.cooldowns?.[cooldownKey] || 0;

    if (now < readyAt) {
        const remainingMin = Math.ceil((readyAt - now) / 60000);
        safeAlert(`Ad is not ready! Try again in ${remainingMin} minute(s).`);
        return;
    }

    if (!window.Adsgram) {
        safeAlert("Ad provider unavailable.");
        return;
    }

    try {
        const AdController = window.Adsgram.init({ blockId: '44503', debug: false });
        await AdController.show().then(async () => {
            const currentLvl = userData.carStats?.[stat] || 1;
            const newLvl = currentLvl + 1;
            const cooldownDuration = 5 * 60 * 1000;

            await updateDoc(userRef, {
                [`carStats.${stat}`]: newLvl,
                [`cooldowns.${cooldownKey}`]: now + cooldownDuration
            });

            userData.carStats[stat] = newLvl;
            if (!userData.cooldowns) userData.cooldowns = {};
            userData.cooldowns[cooldownKey] = now + cooldownDuration;

            safeHaptic('notification', 'success');
            safeAlert(`Successfully upgraded ${stat.toUpperCase()} to Level ${newLvl} via Ad!`);
            updateUI();
        }).catch((err) => {
            console.warn("Ad skipped or failed:", err);
            safeAlert("Ad skipped or failed to load. Upgrade cancelled.");
        });
    } catch(e) {
        console.error("Adsgram init error:", e);
        safeAlert("Ads are currently unavailable.");
    }
};

window.openDealership = () => {
    renderDealershipUI();
    document.getElementById('dealership-modal').style.display = 'flex';
    document.getElementById('bottom-nav').style.display = 'none';
};

window.closeDealership = () => {
    document.getElementById('dealership-modal').style.display = 'none';
    document.getElementById('bottom-nav').style.display = 'flex';
};

function renderDealershipUI() {
    const grid = document.getElementById('dealership-grid');
    if (!grid || !userData) return;

    const owned = userData.ownedCars || ["car_runner"];
    let html = '';

    Object.values(CAR_DATABASE).forEach(car => {
        const isOwned = owned.includes(car.id);
        const isSelected = userData.currentCar === car.id;

        html += `
            <div class="glass-card dealership-card">
                <div style="margin: 10px 0;">${renderCarSVG(car.id, 50, 80)}</div>
                <h4 style="font-size: 1.1em; font-weight: 800;">${car.name}</h4>
                <p style="font-size: 0.8em; color: var(--text-muted); margin-bottom: 10px;">${car.desc}</p>
                
                ${isSelected ? `
                    <button class="action-btn dealership-btn selected" disabled>${t('selected')}</button>
                ` : isOwned ? `
                    <button class="action-btn dealership-btn equip" onclick="selectCarFromDealership('${car.id}')">${t('equip')}</button>
                ` : `
                    <button class="action-btn dealership-btn buy" onclick="buyCarFromDealership('${car.id}', ${car.cost})">${car.cost} C</button>
                `}
            </div>
        `;
    });

    grid.innerHTML = html;
}

window.buyCarFromDealership = async (carId, cost) => {
    if (!userData) return;
    await syncCoinsToDatabase();

    if (userData.coins >= cost) {
        const owned = userData.ownedCars || ["car_runner"];
        owned.push(carId);

        await updateDoc(userRef, {
            coins: increment(-cost),
            ownedCars: owned,
            currentCar: carId
        });

        userData.coins -= cost;
        userData.ownedCars = owned;
        userData.currentCar = carId;

        safeHaptic('notification', 'success');
        safeAlert("Car purchased and equipped successfully!");
        renderDealershipUI();
        updateUI();
    } else {
        safeAlert("Not enough coins to buy this car!");
    }
};

window.selectCarFromDealership = async (carId) => {
    await updateDoc(userRef, { currentCar: carId });
    userData.currentCar = carId;
    safeHaptic('selection');
    renderDealershipUI();
    updateUI();
};

let previewCanvas, previewCtx, previewAnimId;
let previewLaneOffset = 0;
let previewTrafficLeftY = -60;
let previewTrafficRightY = -180;

function initPreviewHighwayAnimation() {
    previewCanvas = document.getElementById('preview-highway-canvas');
    if (!previewCanvas) return;
    previewCtx = previewCanvas.getContext('2d');

    const currentCarKey = userData?.currentCar || 'car_runner';
    const playerCar = CAR_DATABASE[currentCarKey] || CAR_DATABASE['car_runner'];

    const leftCarObj = CAR_DATABASE['car_sport'] || { color: "#319795", accent: "#234E52" };
    const rightCarObj = CAR_DATABASE['car_cyber'] || { color: "#DD6B20", accent: "#9C4221" };

    function animate() {
        previewCtx.fillStyle = "#ECE8E1";
        previewCtx.fillRect(0, 0, previewCanvas.width, previewCanvas.height);

        previewLaneOffset = (previewLaneOffset + 3) % 40;
        previewCtx.strokeStyle = "#1C1C1C";
        previewCtx.setLineDash([20, 20]);
        previewCtx.lineWidth = 3;
        previewCtx.lineDashOffset = -previewLaneOffset;

        previewCtx.beginPath();
        previewCtx.moveTo(previewCanvas.width / 3, 0);
        previewCtx.lineTo(previewCanvas.width / 3, previewCanvas.height);
        previewCtx.moveTo((previewCanvas.width / 3) * 2, 0);
        previewCtx.lineTo((previewCanvas.width / 3) * 2, previewCanvas.height);
        previewCtx.stroke();
        previewCtx.setLineDash([]);

        previewTrafficLeftY += 2.8;
        if (previewTrafficLeftY > previewCanvas.height + 70) {
            previewTrafficLeftY = -80;
        }
        
        previewCtx.save();
        previewCtx.translate(previewCanvas.width / 6, previewTrafficLeftY);
        previewCtx.scale(0.65, 0.65);
        drawRealisticCar(
            previewCtx, 0, 0, 44, 82, 
            leftCarObj.color, leftCarObj.accent, false, 0
        );
        previewCtx.restore();

        previewTrafficRightY += 2.2;
        if (previewTrafficRightY > previewCanvas.height + 70) {
            previewTrafficRightY = -100;
        }
        
        previewCtx.save();
        previewCtx.translate((previewCanvas.width / 6) * 5, previewTrafficRightY);
        previewCtx.scale(0.65, 0.65);
        drawRealisticCar(
            previewCtx, 0, 0, 44, 82, 
            rightCarObj.color, rightCarObj.accent, false, 0
        );
        previewCtx.restore();

        previewCtx.save();
        previewCtx.translate(previewCanvas.width / 2, 120);
        previewCtx.scale(0.65, 0.65);
        drawRealisticCar(
            previewCtx, 0, 0, 46, 86, 
            playerCar.color, playerCar.accent, true, 0
        );
        previewCtx.restore();

        previewAnimId = requestAnimationFrame(animate);
    }

    if (previewAnimId) cancelAnimationFrame(previewAnimId);
    animate();
}

// HIGHWAY RUSH MINIGAME ENGINE
let gameCanvas, gameCtx, gameLoopId;
let keys = { left: false, right: false };

let gameState = {
    active: false,
    playerX: 0,
    playerY: 0,
    velocityX: 0,
    targetLane: 1,
    coinsCollected: 0,
    traffic: [],
    coins: [],
    speed: 5,
    smoothness: 1,
    roadOffset: 0,
    lastSpawn: 0,
    hasShield: false,
    hasMagnet: false,
    isDouble: false
};

window.startHighwayGame = () => {
    const modal = document.getElementById('gameplay-modal');
    modal.style.display = 'flex';
    document.getElementById('bottom-nav').style.display = 'none';
    document.getElementById('top-bar').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'none';

    gameCanvas = document.getElementById('game-canvas');
    gameCanvas.width = window.innerWidth;
    gameCanvas.height = window.innerHeight;
    gameCtx = gameCanvas.getContext('2d');

    const now = Date.now();
    const carStats = userData?.carStats || { speed: 1, smoothness: 1 };
    const carObj = CAR_DATABASE[userData?.currentCar || 'car_runner'];

    const safeSpeedLvl = Number(carStats.speed) || 1;
    const safeSmoothLvl = Number(carStats.smoothness) || 1;

    gameState = {
        active: true,
        targetLane: 1,
        playerX: gameCanvas.width / 2,
        playerY: gameCanvas.height - 140,
        velocityX: 0,
        coinsCollected: 0,
        traffic: [],
        coins: [],
        speed: 5 * carObj.baseSpeed * (1 + safeSpeedLvl * 0.05),
        smoothness: safeSmoothLvl,
        roadOffset: 0,
        lastSpawn: Date.now(),
        hasShield: userData?.activeBoosters?.shield && userData.activeBoosters.shield > now,
        hasMagnet: userData?.activeBoosters?.magnet && userData.activeBoosters.magnet > now,
        isDouble: userData?.activeBoosters?.double && userData.activeBoosters.double > now
    };

    setupControls();
    if (gameLoopId) cancelAnimationFrame(gameLoopId);
    runGameLoop();
};

function setupControls() {
    const btnLeft = document.getElementById('ctrl-left');
    const btnRight = document.getElementById('ctrl-right');

    btnLeft.ontouchstart = (e) => { e.preventDefault(); keys.left = true; safeHaptic('impact', 'light'); };
    btnLeft.ontouchend = (e) => { e.preventDefault(); keys.left = false; };
    btnRight.ontouchstart = (e) => { e.preventDefault(); keys.right = true; safeHaptic('impact', 'light'); };
    btnRight.ontouchend = (e) => { e.preventDefault(); keys.right = false; };

    btnLeft.onmousedown = (e) => { e.preventDefault(); keys.left = true; };
    btnLeft.onmouseup = (e) => { e.preventDefault(); keys.left = false; };
    btnRight.onmousedown = (e) => { e.preventDefault(); keys.right = true; };
    btnRight.onmouseup = (e) => { e.preventDefault(); keys.right = false; };

    window.onkeydown = (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = true;
        if (e.key === 'ArrowRight' || e.key === 'd') keys.right = true;
    };
    window.onkeyup = (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = false;
        if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
    };
}

function runGameLoop() {
    if (!gameState.active) return;

    const laneWidth = gameCanvas.width / 3;

    gameCtx.fillStyle = "#1A1C20";
    gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    const stripHeight = 30;
    gameState.roadOffset = (gameState.roadOffset + gameState.speed) % (stripHeight * 2);

    for (let y = -stripHeight * 2; y < gameCanvas.height + stripHeight; y += stripHeight) {
        const isRed = Math.floor((y + gameState.roadOffset) / stripHeight) % 2 === 0;
        gameCtx.fillStyle = isRed ? "#8B0000" : "#E2E8F0";
        gameCtx.fillRect(0, y + gameState.roadOffset, 10, stripHeight);
        gameCtx.fillRect(gameCanvas.width - 10, y + gameState.roadOffset, 10, stripHeight);
    }

    gameCtx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    gameCtx.setLineDash([40, 40]);
    gameCtx.lineWidth = 4;
    gameCtx.lineDashOffset = -gameState.roadOffset * 2;

    gameCtx.beginPath();
    gameCtx.moveTo(laneWidth, 0);
    gameCtx.lineTo(laneWidth, gameCanvas.height);
    gameCtx.moveTo(laneWidth * 2, 0);
    gameCtx.lineTo(laneWidth * 2, gameCanvas.height);
    gameCtx.stroke();
    gameCtx.setLineDash([]);

    const smoothness = Number(gameState.smoothness) || 1;
    const accel = 0.8 * (1 + smoothness * 0.1);
    const friction = 0.86;

    if (keys.left) gameState.velocityX -= accel;
    if (keys.right) gameState.velocityX += accel;

    if (isNaN(gameState.velocityX)) gameState.velocityX = 0;
    gameState.velocityX *= friction;

    if (isNaN(gameState.playerX)) gameState.playerX = gameCanvas.width / 2;
    gameState.playerX += gameState.velocityX;

    const carRadius = 22;
    if (gameState.playerX < 15 + carRadius) {
        gameState.playerX = 15 + carRadius;
        gameState.velocityX = 0;
    }
    if (gameState.playerX > gameCanvas.width - 15 - carRadius) {
        gameState.playerX = gameCanvas.width - 15 - carRadius;
        gameState.velocityX = 0;
    }

    const now = Date.now();
    if (now - gameState.lastSpawn > Math.max(700, 1400 - gameState.speed * 40)) {
        gameState.lastSpawn = now;
        gameState.speed += 0.03;

        const safeLane = Math.floor(Math.random() * 3);
        const trafficColors = [
            { body: "#4A5568", accent: "#2D3748" },
            { body: "#2D3748", accent: "#1A202C" },
            { body: "#319795", accent: "#234E52" },
            { body: "#742A2A", accent: "#4A1D1D" }
        ];

        for (let i = 0; i < 3; i++) {
            if (i !== safeLane && Math.random() > 0.35) {
                const colorSet = trafficColors[Math.floor(Math.random() * trafficColors.length)];
                gameState.traffic.push({
                    x: laneWidth * i + laneWidth / 2,
                    y: -120,
                    speedOffset: (Math.random() - 0.5) * 1.5,
                    color: colorSet.body,
                    accent: colorSet.accent,
                    lane: i,
                    isChangingLane: false
                });
            }
        }

        gameState.coins.push({
            x: laneWidth * safeLane + laneWidth / 2,
            y: -60
        });
    }

    for (let i = gameState.traffic.length - 1; i >= 0; i--) {
        const t = gameState.traffic[i];
        t.y += gameState.speed + t.speedOffset;

        if (!t.isChangingLane && Math.random() < 0.003 && t.y > 100 && t.y < gameCanvas.height - 300) {
            let potentialTargetX = t.x + (Math.random() > 0.5 ? laneWidth : -laneWidth);
            potentialTargetX = Math.max(laneWidth / 2, Math.min(gameCanvas.width - laneWidth / 2, potentialTargetX));

            let isLaneClear = true;
            for (let j = 0; j < gameState.traffic.length; j++) {
                if (i === j) continue;
                
                const otherCar = gameState.traffic[j];
                const otherFutureX = otherCar.isChangingLane ? otherCar.targetX : otherCar.x;
                
                if (Math.abs(otherFutureX - potentialTargetX) < 10) {
                    if (Math.abs(otherCar.y - t.y) < 150) { 
                        isLaneClear = false;
                        break;
                    }
                }
            }

            if (isLaneClear) {
                t.isChangingLane = true;
                t.targetX = potentialTargetX;
            }
        }

        if (t.isChangingLane && t.targetX) {
            t.x += (t.targetX - t.x) * 0.05;
            if (Math.abs(t.x - t.targetX) < 2) t.isChangingLane = false;
        }

        drawRealisticCar(gameCtx, t.x, t.y, 44, 82, t.color, t.accent, false, 0);

        const hitX = Math.abs(t.x - gameState.playerX) < 32;
        const hitY = Math.abs(t.y - gameState.playerY) < 65;

        if (hitX && hitY) {
            if (gameState.hasShield) {
                gameState.hasShield = false;
                gameState.traffic.splice(i, 1);
                safeAlert("Shield Absorbed Collision!");
            } else {
                handleGameOver();
                return;
            }
        }

        if (t.y > gameCanvas.height + 120) gameState.traffic.splice(i, 1);
    }

    for (let i = gameState.coins.length - 1; i >= 0; i--) {
        const c = gameState.coins[i];
        c.y += gameState.speed;

        if (gameState.hasMagnet && Math.abs(c.y - gameState.playerY) < 220) {
            c.x += (gameState.playerX - c.x) * 0.18;
            c.y += (gameState.playerY - c.y) * 0.18;
        }

        gameCtx.fillStyle = "#D69E2E";
        gameCtx.beginPath();
        gameCtx.arc(c.x, c.y, 13, 0, Math.PI * 2);
        gameCtx.fill();
        gameCtx.strokeStyle = "#1A202C";
        gameCtx.lineWidth = 3;
        gameCtx.stroke();

        gameCtx.fillStyle = "#ECC94B";
        gameCtx.beginPath();
        gameCtx.arc(c.x, c.y, 6, 0, Math.PI * 2);
        gameCtx.fill();

        if (Math.abs(c.x - gameState.playerX) < 30 && Math.abs(c.y - gameState.playerY) < 35) {
            const reward = gameState.isDouble ? 2 : 1;
            gameState.coinsCollected += reward;
            gameState.coins.splice(i, 1);
            safeHaptic('impact', 'medium');
        }

        if (c.y > gameCanvas.height + 60) gameState.coins.splice(i, 1);
    }

    const currentCarObj = CAR_DATABASE[userData?.currentCar || 'car_runner'];
    drawRealisticCar(
        gameCtx, 
        gameState.playerX, 
        gameState.playerY, 
        46, 
        86, 
        currentCarObj.color, 
        currentCarObj.accent, 
        true, 
        gameState.velocityX
    );

    document.getElementById('game-score').innerText = gameState.coinsCollected;
    document.getElementById('game-speed-disp').innerText = `${(gameState.speed / 5).toFixed(1)}x`;

    gameLoopId = requestAnimationFrame(runGameLoop);
}

async function handleGameOver() {
    gameState.active = false;
    safeHaptic('notification', 'error');

    document.getElementById('final-coins-val').innerText = gameState.coinsCollected;
    document.getElementById('game-over-screen').style.display = 'flex';
}

window.saveGameCoins = async () => {
    const earned = gameState.coinsCollected;
    gameState.coinsCollected = 0;

    if (earned > 0 && userData) {
        try {
            await syncCoinsToDatabase();
            await updateDoc(userRef, { coins: increment(earned) });
            userData.coins += earned;
            updateUI();
        } catch (error) {
            console.error("Game coin save error:", error);
            gameState.coinsCollected = earned;
        }
    }
};

window.restartGame = async () => {
    await window.saveGameCoins();
    document.getElementById('game-over-screen').style.display = 'none';
    startHighwayGame();
};

window.showMainMenu = async () => {
    await window.saveGameCoins();
    document.getElementById('game-over-screen').style.display = 'none';
    exitGameToMenu();
};

window.reviveGameWithAd = async () => {
    const adSuccess = await window.watchAd('game_revive', '44503', 50);
    
    if (adSuccess) {
        document.getElementById('game-over-screen').style.display = 'none';
        gameState.active = true;
        gameState.playerY = gameCanvas.height - 120;
        gameState.traffic = [];
        runGameLoop();
    } else {
        exitGameToMenu();
        window.switchTab('earn');
        safeAlert("Ad incomplete or unavailable. Returned to Earn page.");
    }
};

window.exitGameToMenu = () => {
    gameState.active = false;
    document.getElementById('gameplay-modal').style.display = 'none';
    document.getElementById('bottom-nav').style.display = 'flex';
    document.getElementById('top-bar').style.display = 'flex';
};

window.nextSlide = (slideNumber) => {
    document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
    document.getElementById(`slide-${slideNumber}`).classList.add('active');
    safeHaptic('selection');
};

window.finishOnboarding = async () => {
    await updateDoc(userRef, { hasOnboarded: true });
    document.getElementById('onboarding-modal').style.display = 'none';
    showMainApp();
    setTimeout(() => {
        if (userData && !userData.hasCompletedGuide) {
            startGuide();
        }
    }, 400);
};

window.claimGift = async () => {
    await updateDoc(userRef, { hasClaimedWelcome: true, coins: increment(1000) });
    userData.coins = (userData.coins || 0) + 1000;
    updateUI();
    safeHaptic('notification', 'success');
    document.getElementById('gift-modal').style.display = 'none';
};

window.switchTab = (tabId) => {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    
    const target = document.getElementById(tabId);
    if (target) target.classList.add('active');
    
    const navItems = document.querySelectorAll('.nav-item');
    const tabIndexMap = { home: 0, boosters: 1, earn: 2, news: 3, profile: 4 };
    if (navItems[tabIndexMap[tabId]]) {
        navItems[tabIndexMap[tabId]].classList.add('active');
    }
    
    safeHaptic('selection');
    if (tabId === 'profile') fetchPurchases();

    if (typeof guideActive !== 'undefined' && guideActive && !guideSwitchingTab) {
        return;
    }
};

document.getElementById('mine-btn')?.addEventListener('click', (e) => {
    if (!userData || !e.isTrusted) return;
    const now = Date.now();
    if (now - lastTapTimestamp < 80) return;
    lastTapTimestamp = now;

    const currentTapCoins = (userData.tapCoinsEarned || 0) + unsyncedCoins;
    if (currentTapCoins >= 1000) {
        safeAlert("Daily tap limit reached (1,000 / 1,000 Coins)!", true);
        return;
    }

    const rate = getEffectiveMineRate();
    const coinsToAdd = Math.min(rate, 1000 - currentTapCoins);

    safeHaptic('impact', 'light');
    unsyncedCoins += coinsToAdd;
    updateUI();
    scheduleDatabaseSync();
});

window.buyBooster = async (boosterType, cost) => {
    if (!userData) return;
    
    await syncCoinsToDatabase();
    
    const now = Date.now();
    const readyAt = userData.cooldowns?.[boosterType] || 0;

    if (now < readyAt) {
        const remainingMin = Math.ceil((readyAt - now) / 60000);
        safeAlert(`Cooldown active! Try again in ${remainingMin} minute(s).`);
        return;
    }

    if (getTotalCoins() >= cost) {
        const duration = 30 * 60 * 1000;  
        const cooldown = 15 * 60 * 1000;  

        await updateDoc(userRef, {
            coins: increment(-cost),
            [`activeBoosters.${boosterType}`]: now + duration,
            [`cooldowns.${boosterType}`]: now + cooldown
        });

        if (!userData.activeBoosters) userData.activeBoosters = {};
        if (!userData.cooldowns) userData.cooldowns = {};
        userData.activeBoosters[boosterType] = now + duration;
        userData.cooldowns[boosterType] = now + cooldown;

        safeHaptic('notification', 'success');
        safeAlert("Booster activated for 30 minutes!");
        updateUI();
    } else {
        safeAlert("Not enough Coins!");
    }
};

// ========== LEGAL MODALS ==========
const LEGAL_CONTENT = {
    privacy: {
        en: `
            <div style="background:#FFF8E7;border:3px solid #1C1C1C;box-shadow:6px 6px 0 #1C1C1C;border-radius:12px;padding:18px;margin-bottom:18px;">
                <p style="font-weight:800;margin:0 0 6px;">Last updated: August 2026</p>
                <p style="margin:0;color:#555;font-size:0.95em;">TappyStars is a Telegram Mini App. This policy explains what data we collect and how we use it.</p>
            </div>
            <div class="glass-card" style="flex-direction:column;align-items:flex-start;gap:8px;margin-bottom:14px;">
                <h3 style="margin:0;font-size:1.1em;font-weight:900;">1. What we collect</h3>
                <ul style="margin:0;padding-left:18px;line-height:1.55;color:#333;font-size:0.92em;">
                    <li>Telegram user ID, username & first name</li>
                    <li>In-app progress (coins, stars, cars, boosters, chests)</li>
                    <li>Gift purchase history</li>
                    <li>Technical data for rewarded ads (Adsgram)</li>
                </ul>
            </div>
            <div class="glass-card" style="flex-direction:column;align-items:flex-start;gap:8px;margin-bottom:14px;">
                <h3 style="margin:0;font-size:1.1em;font-weight:900;">2. How we use it</h3>
                <ul style="margin:0;padding-left:18px;line-height:1.55;color:#333;font-size:0.92em;">
                    <li>To save progress and run the game</li>
                    <li>To process & deliver Telegram Gifts</li>
                    <li>To show rewarded advertisements</li>
                    <li>To prevent cheating and abuse</li>
                </ul>
            </div>
            <div class="glass-card" style="flex-direction:column;align-items:flex-start;gap:8px;margin-bottom:14px;">
                <h3 style="margin:0;font-size:1.1em;font-weight:900;">3. Storage & third parties</h3>
                <p style="margin:0;line-height:1.55;color:#333;font-size:0.92em;">Progress is stored in Firebase (Google). We never sell your data. Ads are served by Adsgram.</p>
            </div>
            <div class="glass-card" style="flex-direction:column;align-items:flex-start;gap:8px;">
                <h3 style="margin:0;font-size:1.1em;font-weight:900;">4. Your rights</h3>
                <p style="margin:0;line-height:1.55;color:#333;font-size:0.92em;">You can request deletion of your data by messaging the official TappyStars bot.</p>
            </div>
        `,
        ru: `
            <div style="background:#FFF8E7;border:3px solid #1C1C1C;box-shadow:6px 6px 0 #1C1C1C;border-radius:12px;padding:18px;margin-bottom:18px;">
                <p style="font-weight:800;margin:0 0 6px;">Обновлено: август 2026</p>
                <p style="margin:0;color:#555;font-size:0.95em;">TappyStars — это Telegram Mini App. Эта политика объясняет, какие данные мы собираем и как их используем.</p>
            </div>
            <div class="glass-card" style="flex-direction:column;align-items:flex-start;gap:8px;margin-bottom:14px;">
                <h3 style="margin:0;font-size:1.1em;font-weight:900;">1. Какие данные мы собираем</h3>
                <ul style="margin:0;padding-left:18px;line-height:1.55;color:#333;font-size:0.92em;">
                    <li>ID пользователя Telegram, имя пользователя и имя</li>
                    <li>Прогресс в игре (монеты, звёзды, машины, бустеры, сундуки)</li>
                    <li>История покупок подарков</li>
                    <li>Технические данные для рекламы (Adsgram)</li>
                </ul>
            </div>
            <div class="glass-card" style="flex-direction:column;align-items:flex-start;gap:8px;margin-bottom:14px;">
                <h3 style="margin:0;font-size:1.1em;font-weight:900;">2. Как мы используем данные</h3>
                <ul style="margin:0;padding-left:18px;line-height:1.55;color:#333;font-size:0.92em;">
                    <li>Для сохранения прогресса и работы игры</li>
                    <li>Для обработки и доставки Telegram-подарков</li>
                    <li>Для показа рекламы с вознаграждением</li>
                    <li>Для предотвращения читерства</li>
                </ul>
            </div>
            <div class="glass-card" style="flex-direction:column;align-items:flex-start;gap:8px;margin-bottom:14px;">
                <h3 style="margin:0;font-size:1.1em;font-weight:900;">3. Хранение и третьи стороны</h3>
                <p style="margin:0;line-height:1.55;color:#333;font-size:0.92em;">Прогресс хранится в Firebase (Google). Мы не продаём ваши данные. Реклама предоставляется Adsgram.</p>
            </div>
            <div class="glass-card" style="flex-direction:column;align-items:flex-start;gap:8px;">
                <h3 style="margin:0;font-size:1.1em;font-weight:900;">4. Ваши права</h3>
                <p style="margin:0;line-height:1.55;color:#333;font-size:0.92em;">Вы можете запросить удаление данных, написав официальному боту TappyStars.</p>
            </div>
        `,
        uz: `
            <div style="background:#FFF8E7;border:3px solid #1C1C1C;box-shadow:6px 6px 0 #1C1C1C;border-radius:12px;padding:18px;margin-bottom:18px;">
                <p style="font-weight:800;margin:0 0 6px;">Yangilangan: avgust 2026</p>
                <p style="margin:0;color:#555;font-size:0.95em;">TappyStars — Telegram Mini App. Ushbu siyosat qanday ma’lumotlarni yig‘ishimiz va qanday ishlatishimizni tushuntiradi.</p>
            </div>
            <div class="glass-card" style="flex-direction:column;align-items:flex-start;gap:8px;margin-bottom:14px;">
                <h3 style="margin:0;font-size:1.1em;font-weight:900;">1. Qanday ma’lumot yig‘amiz</h3>
                <ul style="margin:0;padding-left:18px;line-height:1.55;color:#333;font-size:0.92em;">
                    <li>Telegram foydalanuvchi ID, username va ism</li>
                    <li>O‘yin progressi (tangalar, yulduzlar, mashinalar, busterlar, sandiqlar)</li>
                    <li>Sovg‘a xarid tarixi</li>
                    <li>Reklama uchun texnik ma’lumotlar (Adsgram)</li>
                </ul>
            </div>
            <div class="glass-card" style="flex-direction:column;align-items:flex-start;gap:8px;margin-bottom:14px;">
                <h3 style="margin:0;font-size:1.1em;font-weight:900;">2. Qanday ishlatamiz</h3>
                <ul style="margin:0;padding-left:18px;line-height:1.55;color:#333;font-size:0.92em;">
                    <li>Progressni saqlash va o‘yinni ishlatish uchun</li>
                    <li>Telegram sovg‘alarini yetkazib berish uchun</li>
                    <li>Mukofotli reklama ko‘rsatish uchun</li>
                    <li>Firibgarlikning oldini olish uchun</li>
                </ul>
            </div>
            <div class="glass-card" style="flex-direction:column;align-items:flex-start;gap:8px;margin-bottom:14px;">
                <h3 style="margin:0;font-size:1.1em;font-weight:900;">3. Saqlash va uchinchi tomonlar</h3>
                <p style="margin:0;line-height:1.55;color:#333;font-size:0.92em;">Progress Firebase (Google) da saqlanadi. Biz ma’lumotlaringizni sotmaymiz. Reklama Adsgram orqali ko‘rsatiladi.</p>
            </div>
            <div class="glass-card" style="flex-direction:column;align-items:flex-start;gap:8px;">
                <h3 style="margin:0;font-size:1.1em;font-weight:900;">4. Sizning huquqlaringiz</h3>
                <p style="margin:0;line-height:1.55;color:#333;font-size:0.92em;">Ma’lumotlaringizni o‘chirishni so‘rash uchun rasmiy TappyStars botiga yozing.</p>
            </div>
        `
    },
    terms: {
        en: `
            <div style="background:#FFF8E7;border:3px solid #1C1C1C;box-shadow:6px 6px 0 #1C1C1C;border-radius:12px;padding:18px;margin-bottom:18px;">
                <p style="font-weight:800;margin:0 0 6px;">Last updated: August 2026</p>
                <p style="margin:0;color:#555;font-size:0.95em;">By using TappyStars you agree to these Terms of Service.</p>
            </div>
            <div class="glass-card" style="flex-direction:column;align-items:flex-start;gap:8px;margin-bottom:14px;">
                <h3 style="margin:0;font-size:1.1em;font-weight:900;">1. Virtual Currency</h3>
                <p style="margin:0;line-height:1.55;color:#333;font-size:0.92em;">Coins and Stars have no real-world cash value. They exist only inside the App.</p>
            </div>
            <div class="glass-card" style="flex-direction:column;align-items:flex-start;gap:8px;margin-bottom:14px;">
                <h3 style="margin:0;font-size:1.1em;font-weight:900;">2. Telegram Gifts</h3>
                <p style="margin:0;line-height:1.55;color:#333;font-size:0.92em;">You must enter a valid Telegram username. Gifts are sent manually within <strong>7–10 days</strong> to the account you specify. We are not responsible for wrong usernames.</p>
            </div>
            <div class="glass-card" style="flex-direction:column;align-items:flex-start;gap:8px;margin-bottom:14px;">
                <h3 style="margin:0;font-size:1.1em;font-weight:900;">3. Fair Play</h3>
                <p style="margin:0;line-height:1.55;color:#333;font-size:0.92em;">Any cheating, bots or exploits may result in a permanent ban and loss of all progress.</p>
            </div>
            <div class="glass-card" style="flex-direction:column;align-items:flex-start;gap:8px;">
                <h3 style="margin:0;font-size:1.1em;font-weight:900;">4. Liability</h3>
                <p style="margin:0;line-height:1.55;color:#333;font-size:0.92em;">The App is provided “as is”. We are not liable for delayed gifts caused by Telegram or third-party services.</p>
            </div>
        `,
        ru: `
            <div style="background:#FFF8E7;border:3px solid #1C1C1C;box-shadow:6px 6px 0 #1C1C1C;border-radius:12px;padding:18px;margin-bottom:18px;">
                <p style="font-weight:800;margin:0 0 6px;">Обновлено: август 2026</p>
                <p style="margin:0;color:#555;font-size:0.95em;">Используя TappyStars, вы соглашаетесь с этими Условиями.</p>
            </div>
            <div class="glass-card" style="flex-direction:column;align-items:flex-start;gap:8px;margin-bottom:14px;">
                <h3 style="margin:0;font-size:1.1em;font-weight:900;">1. Виртуальная валюта</h3>
                <p style="margin:0;line-height:1.55;color:#333;font-size:0.92em;">Монеты и Звёзды не имеют реальной денежной стоимости. Они существуют только внутри приложения.</p>
            </div>
            <div class="glass-card" style="flex-direction:column;align-items:flex-start;gap:8px;margin-bottom:14px;">
                <h3 style="margin:0;font-size:1.1em;font-weight:900;">2. Telegram-подарки</h3>
                <p style="margin:0;line-height:1.55;color:#333;font-size:0.92em;">Вы должны указать корректное имя пользователя Telegram. Подарки отправляются вручную в течение <strong>7–10 дней</strong> на указанный аккаунт. Мы не несём ответственности за неправильные имена.</p>
            </div>
            <div class="glass-card" style="flex-direction:column;align-items:flex-start;gap:8px;margin-bottom:14px;">
                <h3 style="margin:0;font-size:1.1em;font-weight:900;">3. Честная игра</h3>
                <p style="margin:0;line-height:1.55;color:#333;font-size:0.92em;">Любые читы, боты или эксплойты могут привести к постоянному бану и потере всего прогресса.</p>
            </div>
            <div class="glass-card" style="flex-direction:column;align-items:flex-start;gap:8px;">
                <h3 style="margin:0;font-size:1.1em;font-weight:900;">4. Ответственность</h3>
                <p style="margin:0;line-height:1.55;color:#333;font-size:0.92em;">Приложение предоставляется «как есть». Мы не несём ответственности за задержки подарков, вызванные Telegram или сторонними сервисами.</p>
            </div>
        `,
        uz: `
            <div style="background:#FFF8E7;border:3px solid #1C1C1C;box-shadow:6px 6px 0 #1C1C1C;border-radius:12px;padding:18px;margin-bottom:18px;">
                <p style="font-weight:800;margin:0 0 6px;">Yangilangan: avgust 2026</p>
                <p style="margin:0;color:#555;font-size:0.95em;">TappyStars’dan foydalanish orqali siz ushbu Shartlarga rozilik bildirasiz.</p>
            </div>
            <div class="glass-card" style="flex-direction:column;align-items:flex-start;gap:8px;margin-bottom:14px;">
                <h3 style="margin:0;font-size:1.1em;font-weight:900;">1. Virtual valyuta</h3>
                <p style="margin:0;line-height:1.55;color:#333;font-size:0.92em;">Tangalar va Yulduzlarning real pul qiymati yo‘q. Ular faqat ilova ichida mavjud.</p>
            </div>
            <div class="glass-card" style="flex-direction:column;align-items:flex-start;gap:8px;margin-bottom:14px;">
                <h3 style="margin:0;font-size:1.1em;font-weight:900;">2. Telegram sovg‘alari</h3>
                <p style="margin:0;line-height:1.55;color:#333;font-size:0.92em;">Siz to‘g‘ri Telegram username kiritishingiz shart. Sovg‘alar qo‘lda <strong>7–10 kun</strong> ichida kiritilgan hisobga yuboriladi. Noto‘g‘ri username uchun javobgar emasmiz.</p>
            </div>
            <div class="glass-card" style="flex-direction:column;align-items:flex-start;gap:8px;margin-bottom:14px;">
                <h3 style="margin:0;font-size:1.1em;font-weight:900;">3. Adolatli o‘yin</h3>
                <p style="margin:0;line-height:1.55;color:#333;font-size:0.92em;">Har qanday cheat, bot yoki exploit doimiy ban va barcha progressning yo‘qolishiga olib kelishi mumkin.</p>
            </div>
            <div class="glass-card" style="flex-direction:column;align-items:flex-start;gap:8px;">
                <h3 style="margin:0;font-size:1.1em;font-weight:900;">4. Javobgarlik</h3>
                <p style="margin:0;line-height:1.55;color:#333;font-size:0.92em;">Ilova “boricha” taqdim etiladi. Telegram yoki uchinchi tomon xizmatlari sababli kechikkan sovg‘alar uchun javobgar emasmiz.</p>
            </div>
        `
    }
};

window.openLegalModal = (type) => {
    const titleEl = document.getElementById('legal-title');
    const contentEl = document.getElementById('legal-content');
    if (!titleEl || !contentEl) return;

    titleEl.innerText = t(type === 'privacy' ? 'privacy_title' : 'terms_title');
    const langContent = LEGAL_CONTENT[type][currentLang] || LEGAL_CONTENT[type].en;
    contentEl.innerHTML = langContent;

    document.getElementById('legal-modal').style.display = 'flex';
    document.getElementById('bottom-nav').style.display = 'none';
    document.getElementById('top-bar').style.display = 'none';
};

window.closeLegalModal = () => {
    document.getElementById('legal-modal').style.display = 'none';
    document.getElementById('bottom-nav').style.display = 'flex';
    document.getElementById('top-bar').style.display = 'flex';
};

// ========== GIFT PURCHASE (WORKING) ==========
let pendingGift = null;

window.buyGift = function(giftName, cost) {
    if (!userData) {
        safeAlert("Please wait, loading...");
        return;
    }
    if ((userData.stars || 0) < cost) {
        safeAlert(t('not_enough_coins') || "Not enough Stars!");
        return;
    }

    pendingGift = { name: giftName, cost: cost };

    const summary = document.getElementById('gift-confirm-summary');
    if (summary) {
        summary.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;font-weight:800;font-size:1.1em;">
                <span style="margin-right: 15px;">${giftName}</span>
                <span">${cost} ⭐</span>
            </div>
        `;
    }

    const input = document.getElementById('gift-username-input');
    if (input) input.value = '';

    document.getElementById('gift-confirm-modal').style.display = 'flex';
    document.getElementById('bottom-nav').style.display = 'none';
    document.getElementById('top-bar').style.display = 'none';

    const mp = document.getElementById('marketplace-modal');
    if (mp) mp.style.display = 'none';
};

window.closeGiftConfirmModal = function() {
    document.getElementById('gift-confirm-modal').style.display = 'none';
    document.getElementById('bottom-nav').style.display = 'flex';
    document.getElementById('top-bar').style.display = 'flex';
    pendingGift = null;
};
window.confirmGiftPurchase = async function() {
    if (!pendingGift || !userData) return;

    let username = (document.getElementById('gift-username-input')?.value || '').trim();
    if (!username) {
        safeAlert(t('username_required'));
        return;
    }
    if (!username.startsWith('@')) username = '@' + username;

    if ((userData.stars || 0) < pendingGift.cost) {
        safeAlert(t('not_enough_coins') || "Not enough Stars!");
        return;
    }

    try {
        await updateDoc(userRef, {
            stars: increment(-pendingGift.cost)
        });
        userData.stars = (userData.stars || 0) - pendingGift.cost;

        // Fields match admin panel
        await addDoc(collection(db, "purchases"), {
            userId: user.id.toString(),
            telegramId: user.id.toString(),
            giftName: pendingGift.name,
            cost: pendingGift.cost,
            starCost: pendingGift.cost,
            targetUsername: username,
            state: "Pending",
            timestamp: new Date().toISOString()
        });

        updateUI();
        closeGiftConfirmModal();
        safeHaptic('notification', 'success');
        safeAlert(t('gift_success'));
        fetchPurchases(); // shows in My Purchases right away
    } catch (err) {
        console.error(err);
        safeAlert("Something went wrong. Please try again.");
    }
};


const EXCHANGE_RATE = 1500; // coins per star

window.openExchangeModal = () => {
  if (!userData) return;
  document.getElementById('exchange-balance').innerText = getTotalCoins().toLocaleString();
  document.getElementById('exchange-input').value = '';
  document.getElementById('exchange-stars-preview').innerText = '0';
  document.getElementById('exchange-modal').style.display = 'flex';
  document.getElementById('bottom-nav').style.display = 'none';
  document.getElementById('top-bar').style.display = 'none';
};

window.closeExchangeModal = () => {
  document.getElementById('exchange-modal').style.display = 'none';
  document.getElementById('bottom-nav').style.display = 'flex';
  document.getElementById('top-bar').style.display = 'flex';
};

window.setMaxCoins = () => {
  const max = getTotalCoins();
  document.getElementById('exchange-input').value = max;
  updateExchangePreview();
};

window.updateExchangePreview = () => {
  const val = parseInt(document.getElementById('exchange-input').value) || 0;
  const stars = Math.floor(val / EXCHANGE_RATE);
  document.getElementById('exchange-stars-preview').innerText = stars.toLocaleString();
};

window.confirmExchange = async () => {
  await syncCoinsToDatabase();
  const coins = parseInt(document.getElementById('exchange-input').value) || 0;
  if (coins < EXCHANGE_RATE) {
    safeAlert(t('not_enough_coins') || "Need at least 1500 coins");
    return;
  }
  if (getTotalCoins() < coins) {
    safeAlert(t('not_enough_coins'));
    return;
  }
  const stars = Math.floor(coins / EXCHANGE_RATE);
  const cost = stars * EXCHANGE_RATE;

  await updateDoc(userRef, {
    coins: increment(-cost),
    stars: increment(stars)
  });
  userData.coins = (userData.coins || 0) - cost;
  userData.stars = (userData.stars || 0) + stars;
  updateUI();
  closeExchangeModal();
  safeHaptic('notification', 'success');
  safeAlert(`+${stars} ⭐`);
};

// Change the Profile button
// In index.html change:
// onclick="exchangeCoins()"  →  onclick="openExchangeModal()"

window.openMarketplace = () => { 
    document.getElementById('marketplace-modal').style.display = 'flex'; 
    document.getElementById('bottom-nav').style.display = 'none'; 
};

window.closeMarketplace = () => { 
    document.getElementById('marketplace-modal').style.display = 'none'; 
    document.getElementById('bottom-nav').style.display = 'flex'; 
};
function getStatusClass(rawState) {
    const s = (rawState || 'Pending').toString().toLowerCase().trim();
    if (s === 'approved' || s === 'delivered' || s === 'completed' || s === 'success') return 'status-approved';
    if (s === 'sent') return 'status-processing';
    if (s === 'declined' || s === 'denied' || s === 'rejected' || s === 'cancelled' || s === 'canceled' || s === 'failed') return 'status-denied';
    return 'status-pending';
}

function formatStatusLabel(rawState) {
    const s = (rawState || 'Pending').toString().trim();
    if (!s) return 'Pending';
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

async function fetchPurchases() {
    const listEl = document.getElementById('purchases-list');
    if (!listEl) return;
    const q = query(collection(db, "purchases"), where("userId", "==", user.id.toString()));
    
    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            listEl.innerHTML = `<p class="empty-state">${t('no_purchases')}</p>`;
            return;
        }
        let docs = [];
        querySnapshot.forEach(docSnap => docs.push({ id: docSnap.id, ...docSnap.data() }));
        docs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        let html = '';
        docs.forEach(data => {
            const statusClass = getStatusClass(data.state);
            const statusLabel = formatStatusLabel(data.state);
            const cost = data.cost ?? data.starCost ?? 0;
            const target = data.targetUsername ? ` → ${data.targetUsername}` : '';
            html += `
                <div class="glass-card purchase-item">
                    <div style="flex:1; min-width:0;">
                        <div style="font-weight:700;">${data.giftName || 'Gift'}</div>
                        <span style="font-size:0.8em; color:var(--text-muted);">
                            ${new Date(data.timestamp).toLocaleDateString()} · ${cost} ⭐${target}
                        </span>
                    </div>
                    <div class="status-badge ${statusClass}">${statusLabel}</div>
                </div>
            `;
        });
        listEl.innerHTML = html;
    } catch (e) {
        console.error(e);
        listEl.innerHTML = `<p class="empty-state">Error loading purchases.</p>`;
    }
}

let topUsers = [];
async function fetchLeaderboard() {
    try {
        const q = query(collection(db, "users"), orderBy("stars", "desc"), limit(30));
        const querySnapshot = await getDocs(q);
        topUsers = [];
        querySnapshot.forEach(doc => topUsers.push({ id: doc.id, ...doc.data() }));
        renderLeaderboardPreview();
    } catch (e) { console.error(e); }
}

function renderLeaderboardPreview() {
    const previewList = document.getElementById('leaderboard-preview-list');
    if (!previewList) return;
    let html = '';
    
    const starSvg = `<svg viewBox="0 0 24 24" fill="#F5A623" stroke="#1C1C1C" stroke-width="2" style="width:16px;height:16px;vertical-align:middle;margin-left:4px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;

    topUsers.slice(0, 3).forEach((u, idx) => {
        html += `
            <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom: 2px solid var(--border-hard);">
                <span style="font-weight:900; width: 30px;">#${idx + 1}</span>
                <span style="flex:1; font-weight:700;">${u.name || 'Unknown'}</span>
                <span style="font-weight:900;">${u.stars || 0} ${starSvg}</span>
            </div>
        `;
    });
    previewList.innerHTML = html;
}

window.openLeaderboard = async () => {
    document.getElementById('leaderboard-modal').style.display = 'flex';
    document.getElementById('bottom-nav').style.display = 'none';

    const listEl = document.getElementById('full-leaderboard-list');
    const stickyEl = document.getElementById('sticky-user-card');
    listEl.innerHTML = `<p style="text-align:center; font-weight: 700; margin-top: 20px;">${t('loading_miners')}</p>`;

    const starSvg = `<svg viewBox="0 0 24 24" fill="#F5A623" stroke="#1C1C1C" stroke-width="2" style="width:18px;height:18px;vertical-align:middle;margin-left:4px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;

    try {
        const q = query(collection(db, "users"), orderBy("stars", "desc"), limit(30));
        const querySnapshot = await getDocs(q);
        let html = '';
        let rank = 1;
        let myRank = "30+";
        let myData = userData || { name: user.first_name, stars: 0 };

        querySnapshot.forEach(docSnap => {
            const u = docSnap.data();
            const isMe = docSnap.id === user.id.toString();
            if (isMe) {
                myRank = rank;
                myData = u;
            }
            html += `
                <div class="glass-card" style="${isMe ? 'background: #FFD700;' : ''} padding: 15px; margin-bottom: 10px; border-radius: 8px;">
                    <span style="font-weight:900; font-size:1.2em; width: 40px;">#${rank}</span>
                    <span style="flex:1; font-weight:700;">${u.name || 'Unknown'}</span>
                    <span style="font-weight:900;">${u.stars || 0} ${starSvg}</span>
                </div>
            `;
            rank++;
        });

        if (stickyEl) {
            stickyEl.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="font-weight: 900; font-size: 1.3em; background: #1C1C1C; color: #FFD700; padding: 4px 10px; border-radius: 6px;">#${myRank}</span>
                        <div>
                            <div style="font-weight: 900; font-size: 1.05em; color: #1C1C1C;">${myData.name || user.first_name || 'You'}</div>
                            <span style="font-size: 0.75em; font-weight: 700; color: #444; text-transform: uppercase;">${t('your_rank')}</span
                        </div>
                    </div>
                    <span style="font-weight: 900; font-size: 1.2em;">${myData.stars || 0} ${starSvg}</span>
                </div>
            `;
        }

        listEl.innerHTML = html;
    } catch (e) {
        console.error(e);
        listEl.innerHTML = `<p style="text-align:center;">${t('error_leaderboard')}</p>`;
    }
};

window.closeLeaderboard = () => {
    document.getElementById('leaderboard-modal').style.display = 'none';
    document.getElementById('bottom-nav').style.display = 'flex';
};

// ==========================================
// CHEST & REWARDS LOGIC
// ==========================================
function renderProgressUI() {
    if (!userData) return;
    
    if (!userData.chestProgress) userData.chestProgress = { small: 0, medium: 0, mega: 0, news: 0 };
    const progress = userData.chestProgress;
    const now = Date.now();
    const cooldowns = userData.cooldowns || {};

    const elements = [
        { id: 'small', req: 1, btn: 'btn-chest-small' },
        { id: 'medium', req: 2, btn: 'btn-chest-medium', fill: 'prog-med-fill', txt: 'prog-med-txt' },
        { id: 'mega', req: 3, btn: 'btn-chest-mega', fill: 'prog-mega-fill', txt: 'prog-mega-txt' },
        { id: 'news', req: 2, btn: 'btn-news-reward', fill: 'prog-news-fill', txt: 'prog-news-txt' }
    ];

    elements.forEach(item => {
        const currentP = progress[item.id] || 0;
        
        if (item.fill) {
            const fillPct = Math.min((currentP / item.req) * 100, 100);
            document.getElementById(item.fill).style.width = `${fillPct}%`;
            document.getElementById(item.txt).innerText = `${currentP} / ${item.req}`;
        }

        const btn = document.getElementById(item.btn);
        if (!btn) return;

        const openCooldown = cooldowns[`chest_open_${item.id}`] || 0;
        const intervalCooldown = cooldowns[`chest_interval_${item.id}`] || 0;

        if (openCooldown > now) {
            const min = Math.max(1, Math.ceil((openCooldown - now) / 60000));
            btn.innerText = `Wait ${min}m`;
            btn.disabled = true;
            btn.style.opacity = "0.5";
        } else if (intervalCooldown > now && currentP > 0) {
            const min = Math.max(1, Math.ceil((intervalCooldown - now) / 60000));
            btn.innerText = `Wait ${min}m`;
            btn.disabled = true;
            btn.style.opacity = "0.5";
        } else {
            btn.innerText = currentP >= item.req ? t('open_btn') : t('watch_ad');
            btn.disabled = false;
            btn.style.opacity = "1";
        }
    });
}

const originalLoop = startLoopTimer;
startLoopTimer = function() {
    originalLoop();
    setInterval(renderProgressUI, 1000);
};

window.handleChest = async (type, requiredAds) => {
    if (!userData) return;
    await syncCoinsToDatabase();
    
    if (!userData.chestProgress) userData.chestProgress = { small: 0, medium: 0, mega: 0 };
    const currentProgress = userData.chestProgress[type] || 0;
    
    if (currentProgress >= requiredAds) {
        openChestReward(type);
        return;
    }

    const success = await window.watchAd(`chest_${type}`, '44503', 0);
    
    if (success) {
        const now = Date.now();
        const newProgress = currentProgress + 1;
        
        let updates = {
            [`chestProgress.${type}`]: newProgress
        };
        
        if (newProgress < requiredAds) {
            const intervalTime = now + (4 * 60 * 1000);
            updates[`cooldowns.chest_interval_${type}`] = intervalTime;
            userData.cooldowns[`chest_interval_${type}`] = intervalTime;
            safeAlert(`Ad watched! ${newProgress}/${requiredAds} completed.`);
        } 
        
        userData.chestProgress[type] = newProgress;
        await updateDoc(userRef, updates);
        
        if (newProgress >= requiredAds) {
            openChestReward(type);
        }
        
        renderProgressUI();
    }
};

async function openChestReward(type) {
    const now = Date.now();
    let updates = {
        [`chestProgress.${type}`]: 0,
        [`cooldowns.chest_open_${type}`]: now + (10 * 60 * 1000)
    };

    let prize = { coins: 0, stars: 0 };
    const roll = Math.random();
    
    if (type === 'small') {
        prize.coins = roll > 0.01 ? Math.floor(Math.random() * 101) + 100 : 0;
        prize.stars = roll <= 0.01 ? 1 : 0; 
    } else if (type === 'medium') {
        prize.coins = roll > 0.02 ? Math.floor(Math.random() * 201) + 200 : 0;
        prize.stars = roll <= 0.02 ? 1 : 0;
    } else if (type === 'mega') {
        prize.coins = roll > 0.02 ? Math.floor(Math.random() * 501) + 500 : 0;
        prize.stars = roll <= 0.02 ? 2 : 0; 
    }

    if (prize.coins > 0) {
        updates.coins = increment(prize.coins);
        userData.coins += prize.coins;
        showChestRewardModal('coins', prize.coins);
    } else if (prize.stars > 0) {
        updates.stars = increment(prize.stars);
        userData.stars = (userData.stars || 0) + prize.stars;
        showChestRewardModal('stars', prize.stars);
    }

    userData.chestProgress[type] = 0;
    userData.cooldowns[`chest_open_${type}`] = updates[`cooldowns.chest_open_${type}`];
    
    safeHaptic('notification', 'success');
    await updateDoc(userRef, updates);
    updateUI();
    renderProgressUI();
}

window.handleNewsReward = async () => {
    if (!userData) return;
    await syncCoinsToDatabase();
    
    if (!userData.chestProgress) userData.chestProgress = { news: 0 };
    const currentProgress = userData.chestProgress.news || 0;
    const requiredAds = 2;

    const success = await window.watchAd('news_reward', '44503', 0);
    
    if (success) {
        const now = Date.now();
        const newProgress = currentProgress + 1;
        
        let updates = { [`chestProgress.news`]: newProgress };
        userData.chestProgress.news = newProgress;

        if (newProgress >= requiredAds) {
            updates.coins = increment(200);
            updates[`chestProgress.news`] = 0;
            updates[`cooldowns.chest_open_news`] = now + (10 * 60 * 1000); 
            
            userData.coins += 200;
            userData.chestProgress.news = 0;
            userData.cooldowns[`chest_open_news`] = updates[`cooldowns.chest_open_news`];
            
            showChestRewardModal('coins', 200);
        } else {
            const intervalTime = now + (4 * 60 * 1000);
            updates[`cooldowns.chest_interval_news`] = intervalTime;
            userData.cooldowns[`chest_interval_news`] = intervalTime;
            safeAlert("1st Ad Complete! Wait 4 mins to watch the final ad.");
        }
        
        await updateDoc(userRef, updates);
        updateUI();
        renderProgressUI();
    }
};

// 1. Initialize the dropdown to match the detected language when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const langSelectEl = document.getElementById('lang-select');
    if (langSelectEl) {
        langSelectEl.value = currentLang; // Sets to 'en', 'ru', or 'uz' automatically
    }
});

// 2. Protect the backdrop click. This logic ensures the modal ONLY closes if the dark overlay (id='chest-reward-modal') is clicked, not the inner card.
window.handleChestModalBackdropClick = (e) => {
    if (e.target.id === 'chest-reward-modal') {
        closeChestRewardModal();
    }
};

const LANG_LABELS = {
    en: "English",
    ru: "Русский",
    uz: "O'zbekcha"
};

function applyLanguage() {
    // Update trigger text to match active language
    const selectedEl = document.getElementById('selected-lang');
    if (selectedEl && LANG_LABELS[currentLang]) {
        selectedEl.innerText = LANG_LABELS[currentLang];
    }

    // Translate data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key && t(key)) {
            el.innerText = t(key);
        }
    });

    updateUI();
    renderProgressUI();
    if (typeof guideActive !== 'undefined' && guideActive && typeof renderGuideStep === 'function') {
        renderGuideStep();
    }
}

// Window-scoped dropdown controllers for ES module compatibility
window.toggleLangMenu = function(e) {
    if (e) e.stopPropagation();
    const dropdown = document.getElementById('langDropdown');
    if (dropdown) dropdown.classList.toggle('open');
};

window.selectLanguage = function(langCode, langLabel) {
    const selectedEl = document.getElementById('selected-lang');
    if (selectedEl) selectedEl.innerText = langLabel;

    const dropdown = document.getElementById('langDropdown');
    if (dropdown) dropdown.classList.remove('open');
    
    window.changeLanguage(langCode);
};

// Close dropdown when clicking anywhere outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('langDropdown');
    if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
    }
});

// ==========================================
// INTERACTIVE NEW-USER GUIDE (SPOTLIGHT)
// ==========================================
const GUIDE_STEPS = [
    {
        tab: 'home',
        subTab: 'clicker',
        navIndex: 0,
        target: '#mine-btn',
        circle: true,
        locationKey: 'guide_loc_home',
        titleKey: 'guide_step1_title',
        descKey: 'guide_step1_desc',
        pad: 14
    },
    {
        tab: 'boosters',
        navIndex: 1,
        target: '#boosters .glass-card',
        locationKey: 'guide_loc_boosters',
        titleKey: 'guide_step2_title',
        descKey: 'guide_step2_desc',
        pad: 10
    },
    {
        tab: 'earn',
        navIndex: 2,
        target: '#earn .earn-preview-container, #earn .glass-card',
        locationKey: 'guide_loc_earn',
        titleKey: 'guide_step3_title',
        descKey: 'guide_step3_desc',
        pad: 10
    },
    {
        tab: 'news',
        navIndex: 3,
        target: '#chest-card-small, #chests-container .chest-card',
        locationKey: 'guide_loc_news',
        titleKey: 'guide_step4_title',
        descKey: 'guide_step4_desc',
        pad: 10
    },
    {
        tab: 'profile',
        navIndex: 4,
        target: '#profile .exchange-card, .marketplace-btn',
        locationKey: 'guide_loc_profile',
        titleKey: 'guide_step5_title',
        descKey: 'guide_step5_desc',
        pad: 10
    },
    {
        tab: 'home',
        subTab: 'clicker',
        navIndex: 0,
        target: null,
        locationKey: 'guide_loc_done',
        titleKey: 'guide_step6_title',
        descKey: 'guide_step6_desc',
        pad: 0
    }
];

let guideIndex = 0;
let guideActive = false;
let guideHighlightedEl = null;
let guideResizeHandler = null;
let guideSwitchingTab = false;

function queryGuideTarget(selector) {
    if (!selector) return null;
    for (const sel of selector.split(',').map(s => s.trim())) {
        const el = document.querySelector(sel);
        if (el) return el;
    }
    return null;
}

function clearGuideHighlight() {
    if (guideHighlightedEl) {
        guideHighlightedEl.classList.remove('guide-highlight-target');
        guideHighlightedEl = null;
    }
    document.querySelectorAll('.nav-item.guide-nav-active').forEach(el => {
        el.classList.remove('guide-nav-active');
    });
}

function positionGuideUI(step) {
    const spotlight = document.getElementById('guide-spotlight');
    const tooltip = document.getElementById('guide-tooltip');
    if (!spotlight || !tooltip) return;

    const target = step.target ? queryGuideTarget(step.target) : null;
    clearGuideHighlight();

    if (typeof step.navIndex === 'number') {
        const navItems = document.querySelectorAll('.nav-item');
        if (navItems[step.navIndex]) {
            navItems[step.navIndex].classList.add('guide-nav-active');
        }
    }

    // Always keep card above bottom bar
    tooltip.style.left = '16px';
    tooltip.style.right = '16px';
    tooltip.style.bottom = '16px';   // was '100px'
    tooltip.style.top = 'auto';
    tooltip.style.transform = 'none';

    if (target) {
        try {
            target.scrollIntoView({ block: 'center', behavior: 'smooth' });
        } catch (e) {}

        const rect = target.getBoundingClientRect();
        const pad = step.pad ?? 10;
        const top = Math.max(8, rect.top - pad);
        const left = Math.max(8, rect.left - pad);
        const width = Math.min(window.innerWidth - 16, rect.width + pad * 2);
        const maxH = Math.max(60, window.innerHeight - 100 - 16 - top - 8);
        const height = Math.min(maxH, rect.height + pad * 2);

        spotlight.style.display = 'block';
        spotlight.style.top = `${top}px`;
        spotlight.style.left = `${left}px`;
        spotlight.style.width = `${width}px`;
        spotlight.style.height = `${height}px`;
        spotlight.classList.toggle('circle', !!step.circle);

        target.classList.add('guide-highlight-target');
        guideHighlightedEl = target;
    } else {
        spotlight.style.display = 'none';
    }
}

function renderGuideStep() {
    const step = GUIDE_STEPS[guideIndex];
    if (!step) {
        endGuide(true);
        return;
    }

    guideSwitchingTab = true;
    try {
        if (step.tab) window.switchTab(step.tab);
        if (step.subTab) window.switchHomeSubTab(step.subTab);
    } finally {
        guideSwitchingTab = false;
    }

    const titleEl = document.getElementById('guide-title');
    const descEl = document.getElementById('guide-desc');
    const stepEl = document.getElementById('guide-step-indicator');
    const locEl = document.getElementById('guide-location');
    const nextBtn = document.getElementById('guide-next-btn');
    const skipBtn = document.getElementById('guide-skip-btn');

    if (titleEl) titleEl.innerText = t(step.titleKey);
    if (descEl) descEl.innerText = t(step.descKey);
    if (stepEl) stepEl.innerText = `${guideIndex + 1} / ${GUIDE_STEPS.length}`;
    if (locEl) {
        locEl.innerText = step.locationKey ? t(step.locationKey) : '';
        locEl.style.display = step.locationKey ? 'inline-flex' : 'none';
    }
    if (nextBtn) nextBtn.innerText = guideIndex === GUIDE_STEPS.length - 1 ? t('guide_done') : t('guide_next');
    if (skipBtn) {
        skipBtn.innerText = t('guide_skip');
        skipBtn.style.display = guideIndex === GUIDE_STEPS.length - 1 ? 'none' : 'inline-block';
    }

    requestAnimationFrame(() => {
        setTimeout(() => positionGuideUI(step), 160);
    });
}

window.startGuide = function() {
    if (guideActive) return;
    if (!document.getElementById('guide-overlay')) return;

    guideActive = true;
    guideIndex = 0;
    document.body.classList.add('guide-running');

    const overlay = document.getElementById('guide-overlay');
    overlay.style.display = 'block';
    overlay.setAttribute('aria-hidden', 'false');

    // Reset any old broken styles on bottom bar
    const nav = document.getElementById('bottom-nav');
    if (nav) {
        nav.style.zIndex = '';
        nav.style.width = '';
        nav.style.left = '';
        nav.style.right = '';
        nav.classList.remove('guide-highlight-target');
    }

    guideResizeHandler = () => {
        if (guideActive) positionGuideUI(GUIDE_STEPS[guideIndex] || {});
    };
    window.addEventListener('resize', guideResizeHandler);
    window.addEventListener('orientationchange', guideResizeHandler);

    renderGuideStep();
    safeHaptic('selection');
};

window.nextGuideStep = function() {
    if (!guideActive) return;
    guideIndex += 1;
    if (guideIndex >= GUIDE_STEPS.length) {
        endGuide(true);
        return;
    }
    renderGuideStep();
    safeHaptic('selection');
};

window.skipGuide = function() {
    endGuide(true);
};

async function endGuide(markComplete) {
    if (!guideActive && !markComplete) return;
    guideActive = false;
    clearGuideHighlight();
    document.body.classList.remove('guide-running');

    const overlay = document.getElementById('guide-overlay');
    if (overlay) {
        overlay.style.display = 'none';
        overlay.setAttribute('aria-hidden', 'true');
    }

    const nav = document.getElementById('bottom-nav');
    if (nav) {
        nav.style.zIndex = '';
        nav.style.width = '';
        nav.style.left = '';
        nav.style.right = '';
        nav.classList.remove('guide-highlight-target');
    }

    if (guideResizeHandler) {
        window.removeEventListener('resize', guideResizeHandler);
        window.removeEventListener('orientationchange', guideResizeHandler);
        guideResizeHandler = null;
    }

    try {
        guideSwitchingTab = true;
        window.switchTab('home');
        window.switchHomeSubTab('clicker');
    } catch (e) {
    } finally {
        guideSwitchingTab = false;
    }

    if (markComplete && userData && userRef) {
        try {
            await updateDoc(userRef, { hasCompletedGuide: true });
            userData.hasCompletedGuide = true;
        } catch (e) {
            if (userData) userData.hasCompletedGuide = true;
        }
    }
    safeHaptic('notification', 'success');
}