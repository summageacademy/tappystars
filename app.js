import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
    getFirestore, doc, onSnapshot, setDoc, updateDoc, increment,
    collection, addDoc, query, where, getDocs, orderBy, limit, getDoc
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// 1. FIREBASE
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

// 2. TELEGRAM
const tg = window.Telegram?.WebApp || {};
if (tg.expand) tg.expand();
const user = tg.initDataUnsafe?.user || { id: "test_dev_user_789", first_name: "Explorer" };

// 3. I18N
const TRANSLATIONS = {
    en: {
        tap_to_mine: "Tap to mine coins",
        mining_power: "Mining Power",
        energy_label: "Energy",
        active_boosters: "Active Boosters",
        no_boosters: "No active boosters running.",
        your_league: "Your League",
        league_tip: "Reach each league to unlock big coin rewards in the Tasks section!",
        power_boosters: "Power Boosters",
        auto_tap: "Auto Tap",
        auto_tap_desc: "+1 Coin / sec (30 mins)",
        multitap: "Multi-Tap",
        multitap_desc: "+2 Coins / tap (30 mins)",
        energy_boost: "Restore Energy",
        energy_boost_desc: "Refill energy to full instantly",
        cooldown_note: "Boosters active for 30 mins. 15-minute buying cooldown per booster.",
        watch_ad: "Watch Ad",
        claim: "Claim",
        hello_miner: "Hello, Miner!",
        currency_exchange: "Turn Coins into Stars",
        exchange_rate: "Exchange every 1000 coins for 1 Telegram Star",
        exchange_btn: "Exchange",
        no_energy: "Not enough energy!",
        energy_restored: "Energy fully restored!",
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
        you_won: "You Won!",
        congrats: "Congratulations! You received:",
        thanks: "Thanks!",
        top_miners: "Top Miners",
        see_all: "See All",
        my_purchases: "My Purchases",
        no_purchases: "No purchases yet.",
        exchange_title: "Turn Coins into Stars",
        exchange_subtitle: "Convert coins into Stars",
        you_pay: "You pay",
        you_receive: "You receive",
        max: "MAX",
        coins: "Coins",
        stars: "Stars",
        rate_info: "Exchange every 1000 coins for 1 Telegram Star",
        confirm_exchange: "Confirm Exchange",
        not_enough_coins: "Not enough coins",
        enter_amount: "Enter amount",
        privacy_policy: "Privacy Policy",
        terms_of_service: "Terms of Service",
        gift_confirm_title: "Confirm Gift Purchase",
        gift_confirm_subtitle: "The gift will be sent to the Telegram account you enter below",
        enter_username: "Telegram Username",
        gift_delivery_note: "Gifts are usually delivered within 7–10 days to the account you specify.",
        confirm_purchase: "Confirm & Buy",
        cancel: "Cancel",
        username_required: "Please enter a valid Telegram username",
        gift_success: "Order placed! Gift will be sent in 7–10 days.",
        back: "Close",
        nav_earn: "Earn",
        nav_tasks: "Tasks",
        nav_boosts: "Boosts",
        nav_boxes: "Boxes",
        nav_account: "Account",
        tab_daily: "Daily",
        tab_leagues: "Leagues",
        tab_referrals: "Referrals",
        tab_general: "General",
        tab_gifts: "Gifts",
        tab_history: "History",
        task_watch_1: "Watch 1 Ad",
        task_watch_3: "Watch 3 Ads",
        task_tap_500: "Mine 500 Coins Today",
        task_reward_1star: "+1 Star",
        task_reward_3stars: "+3 Stars",
        task_reward_2stars: "+2 Stars",
        ref_title: "Invite Friends",
        ref_desc: "Invite 10 friends and claim a free Bear Gift for every 10 referrals.",
        ref_count: "Your referrals",
        ref_share: "Share Invite Link",
        ref_ready: "Bear Gift Ready!",
        stat_coins: "Coins",
        stat_stars: "Stars",
        stat_clicks: "Total Clicks",
        stat_tgid: "Telegram ID",
        stat_league: "League",
        gifts_subtitle: "Exchange Stars for real Telegram Gifts",
        onboarding_slide1_title: "Welcome to TappyStars",
        onboarding_slide1_desc: "Mine coins daily, complete tasks, and redeem Telegram Gifts.",
        onboarding_slide2_title: "Climb the Leagues",
        onboarding_slide2_desc: "Tap more to reach higher leagues and claim big coin rewards.",
        onboarding_slide3_title: "The Marketplace",
        onboarding_slide3_desc: "Spend your Stars on real Telegram Gifts sent to your account.",
        onboarding_next: "Next",
        onboarding_start: "Start Playing",
        league_bear_desc: "Starting league. Keep tapping to climb!",
        league_giftbox_desc: "You're getting serious. Gift Box league unlocked!",
        league_bouquet_desc: "High achiever! Bouquet league is yours.",
        league_diamond_desc: "Elite miner. Diamond league — almost legendary!",
        claimed: "Claimed",
        done_today: "Done today",
        share_text: "Join me on TappyStars and mine coins together!",
    },
    ru: {
        tap_to_mine: "Нажимайте для добычи монет",
        mining_power: "Сила майнинга",
        energy_label: "Энергия",
        active_boosters: "Активные бустеры",
        no_boosters: "Нет активных бустеров.",
        your_league: "Ваша лига",
        league_tip: "Достигайте лиг и получайте крупные награды в разделе Задания!",
        power_boosters: "Бустеры силы",
        auto_tap: "Авто-тапер",
        auto_tap_desc: "+1 Монета / сек (30 мин)",
        multitap: "Мульти-тап",
        multitap_desc: "+2 Монеты / клик (30 мин)",
        energy_boost: "Восстановить энергию",
        energy_boost_desc: "Мгновенно заполнить энергию",
        cooldown_note: "Бустеры работают 30 мин. Перезарядка 15 мин.",
        watch_ad: "Смотреть рекламу",
        claim: "Забрать",
        hello_miner: "Привет, Майнер!",
        currency_exchange: "Монеты в Звёзды",
        exchange_rate: "Обменяйте каждые 1000 монет на 1 Telegram Star",
        exchange_btn: "Обменять",
        no_energy: "Недостаточно энергии!",
        energy_restored: "Энергия полностью восстановлена!",
        mystery_chests: "Секретные сундуки",
        chests_subtitle: "Открывайте сундуки и получайте монеты и звёзды!",
        small_box: "Малый ящик",
        medium_box: "Средний ящик",
        mega_box: "Мега ящик",
        watch_1_ad: "Смотреть 1 рекламу",
        watch_2_ads: "Смотреть 2 рекламы",
        watch_3_ads: "Смотреть 3 рекламы",
        daily_rewards: "Ежедневные награды",
        free_coins_200: "200 Бесплатных монет",
        you_won: "Вы выиграли!",
        congrats: "Поздравляем! Вы получили:",
        thanks: "Спасибо!",
        top_miners: "Топ майнеры",
        see_all: "Смотреть все",
        my_purchases: "Мои покупки",
        no_purchases: "Пока нет покупок.",
        exchange_title: "Монеты в Звёзды",
        exchange_subtitle: "Конвертируйте монеты в Звёзды",
        you_pay: "Вы отдаёте",
        you_receive: "Вы получаете",
        max: "МАКС",
        coins: "Монеты",
        stars: "Звёзды",
        rate_info: "Обменяйте каждые 1000 монет на 1 Telegram Star",
        confirm_exchange: "Подтвердить обмен",
        not_enough_coins: "Недостаточно монет",
        enter_amount: "Введите сумму",
        privacy_policy: "Политика конфиденциальности",
        terms_of_service: "Условия использования",
        gift_confirm_title: "Подтверждение покупки подарка",
        gift_confirm_subtitle: "Подарок будет отправлен на указанный Telegram-аккаунт",
        enter_username: "Имя пользователя Telegram",
        gift_delivery_note: "Подарки обычно доставляются в течение 7–10 дней.",
        confirm_purchase: "Подтвердить и купить",
        cancel: "Отмена",
        username_required: "Введите корректное имя пользователя",
        gift_success: "Заказ оформлен! Подарок будет отправлен через 7–10 дней.",
        back: "Закрыть",
        nav_earn: "Добыча",
        nav_tasks: "Задания",
        nav_boosts: "Бусты",
        nav_boxes: "Ящики",
        nav_account: "Аккаунт",
        tab_daily: "Ежедневные",
        tab_leagues: "Лиги",
        tab_referrals: "Рефералы",
        tab_general: "Общее",
        tab_gifts: "Подарки",
        tab_history: "История",
        task_watch_1: "Смотреть 1 рекламу",
        task_watch_3: "Смотреть 3 рекламы",
        task_tap_500: "Добыть 500 монет сегодня",
        task_reward_1star: "+1 Звезда",
        task_reward_3stars: "+3 Звезды",
        task_reward_2stars: "+2 Звезды",
        ref_title: "Пригласите друзей",
        ref_desc: "Пригласите 10 друзей и получите бесплатный подарок Медведь за каждые 10.",
        ref_count: "Ваши рефералы",
        ref_share: "Поделиться ссылкой",
        ref_ready: "Медведь готов!",
        stat_coins: "Монеты",
        stat_stars: "Звёзды",
        stat_clicks: "Всего кликов",
        stat_tgid: "Telegram ID",
        stat_league: "Лига",
        gifts_subtitle: "Обменивайте Звёзды на реальные подарки Telegram",
        onboarding_slide1_title: "Добро пожаловать в TappyStars",
        onboarding_slide1_desc: "Добывайте монеты, выполняйте задания и обменивайте на подарки.",
        onboarding_slide2_title: "Поднимайтесь по лигам",
        onboarding_slide2_desc: "Тапайте больше, чтобы открыть лиги и крупные награды.",
        onboarding_slide3_title: "Маркетплейс",
        onboarding_slide3_desc: "Тратьте Звёзды на реальные подарки Telegram.",
        onboarding_next: "Далее",
        onboarding_start: "Начать играть!",
        league_bear_desc: "Стартовая лига. Продолжайте тапать!",
        league_giftbox_desc: "Вы серьёзно настроены. Лига Gift Box!",
        league_bouquet_desc: "Высокий результат! Лига Bouquet ваша.",
        league_diamond_desc: "Элита. Алмазная лига — почти легенда!",
        claimed: "Получено",
        done_today: "Сделано сегодня",
        share_text: "Присоединяйся ко мне в TappyStars!",
    },
    uz: {
        tap_to_mine: "Tanga olish uchun bosing",
        mining_power: "Tapning kuchi",
        energy_label: "Energiya",
        active_boosters: "Faol busterlar",
        no_boosters: "Faol busterlar yo'q.",
        your_league: "Sizning ligangiz",
        league_tip: "Har bir ligaga yetib, Tasks bo'limida katta mukofotlar oling!",
        power_boosters: "Kuch busterlari",
        auto_tap: "Avto-klik",
        auto_tap_desc: "+1 Tanga / sek (30 daq)",
        multitap: "Ko'p klik",
        multitap_desc: "+2 Tanga / bosish (30 daq)",
        energy_boost: "Energiyani tiklash",
        energy_boost_desc: "Energiyani to'liq to'ldirish",
        cooldown_note: "Busterlar 30 daqiqa ishlaydi. 15 daqiqa kutiladi.",
        watch_ad: "Reklama ko'rish",
        claim: "Olish",
        hello_miner: "Salom, Konchi!",
        currency_exchange: "Tangani Yulduzga aylantirish",
        exchange_rate: "Har 1000 tangani 1 Telegram Star ga almashtiring",
        exchange_btn: "Ayirboshlash",
        no_energy: "Energiya yetarli emas!",
        energy_restored: "Energiya to'liq tiklandi!",
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
        you_won: "Siz yutdingiz!",
        congrats: "Tabriklaymiz! Siz qabul qildingiz:",
        thanks: "Rahmat!",
        top_miners: "Eng yaxshilar",
        see_all: "Barchasini ko'rish",
        my_purchases: "Xaridlarim",
        no_purchases: "Hali xaridlar yo'q.",
        exchange_title: "Tangani Yulduzga aylantirish",
        exchange_subtitle: "Tangalarni Yulduzlarga aylantiring",
        you_pay: "Siz berasiz",
        you_receive: "Siz olasiz",
        max: "MAX",
        coins: "Tangalar",
        stars: "Yulduzlar",
        rate_info: "Har 1000 tangani 1 Telegram Star ga almashtiring",
        confirm_exchange: "Almashtirishni tasdiqlash",
        not_enough_coins: "Yetarli tanga yo'q",
        enter_amount: "Miqdorni kiriting",
        privacy_policy: "Maxfiylik siyosati",
        terms_of_service: "Foydalanish shartlari",
        gift_confirm_title: "Sovg'a sotib olishni tasdiqlash",
        gift_confirm_subtitle: "Sovg'a kiritilgan Telegram hisobiga yuboriladi",
        enter_username: "Telegram foydalanuvchi nomi",
        gift_delivery_note: "Sovg'alar odatda 7–10 kun ichida yuboriladi.",
        confirm_purchase: "Tasdiqlash va sotib olish",
        cancel: "Bekor qilish",
        username_required: "To'g'ri Telegram username kiriting",
        gift_success: "Buyurtma qabul qilindi! Sovg'a 7–10 kun ichida yuboriladi.",
        back: "Yopish",
        nav_earn: "Ishlash",
        nav_tasks: "Vazifa",
        nav_boosts: "Busters",
        nav_boxes: "Qutilar",
        nav_account: "Akkaunt",
        tab_daily: "Kunlik",
        tab_leagues: "Ligalar",
        tab_referrals: "Referallar",
        tab_general: "Umumiy",
        tab_gifts: "Sovg'alar",
        tab_history: "Tarix",
        task_watch_1: "1 reklama ko'rish",
        task_watch_3: "3 reklama ko'rish",
        task_tap_500: "Bugun 500 tanga qazish",
        task_reward_1star: "+1 Yulduz",
        task_reward_3stars: "+3 Yulduz",
        task_reward_2stars: "+2 Yulduz",
        ref_title: "Do'stlarni taklif qiling",
        ref_desc: "10 do'st taklif qiling va har 10 ta uchun bepul Ayiq sovg'asi oling.",
        ref_count: "Sizning referallaringiz",
        ref_share: "Havolani ulashish",
        ref_ready: "Ayiq sovg'asi tayyor!",
        stat_coins: "Tangalar",
        stat_stars: "Yulduzlar",
        stat_clicks: "Jami kliklar",
        stat_tgid: "Telegram ID",
        stat_league: "Liga",
        gifts_subtitle: "Yulduzlarni haqiqiy Telegram sovg'alariga almashtiring",
        onboarding_slide1_title: "TappyStars ga xush kelibsiz",
        onboarding_slide1_desc: "Har kuni tanga qazing, vazifalarni bajaring va sovg'alar oling.",
        onboarding_slide2_title: "Ligalarga chiqing",
        onboarding_slide2_desc: "Ko'proq bosing — ligalar va katta mukofotlar ochiladi.",
        onboarding_slide3_title: "Bozor",
        onboarding_slide3_desc: "Yulduzlarni haqiqiy Telegram sovg'alariga sarflang.",
        onboarding_next: "Keyingi",
        onboarding_start: "O'ynashni boshlash!",
        league_bear_desc: "Boshlang'ich liga. Davom eting!",
        league_giftbox_desc: "Jiddiy o'yinchi. Gift Box ligasi!",
        league_bouquet_desc: "Yuqori natija! Bouquet ligasi sizniki.",
        league_diamond_desc: "Elita. Olmos ligasi — deyarli afsona!",
        claimed: "Olingan",
        done_today: "Bugun bajarildi",
        share_text: "TappyStars da menga qo'shiling!",
    }
};

function detectUserLanguage() {
    const saved = localStorage.getItem('tappy_lang');
    if (saved && ['en', 'ru', 'uz'].includes(saved)) return saved;
    const code = (tg.initDataUnsafe?.user?.language_code || navigator.language || 'en').toLowerCase();
    if (code.startsWith('ru')) return 'ru';
    if (code.startsWith('uz')) return 'uz';
    return 'en';
}
let currentLang = detectUserLanguage();
function t(key) {
    return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.en?.[key] || key;
}
window.changeLanguage = (lang) => {
    if (!['en', 'ru', 'uz'].includes(lang)) return;
    currentLang = lang;
    localStorage.setItem('tappy_lang', lang);
    applyLanguage();
    safeHaptic('selection');
};
window.selectLanguage = (code, label) => {
    changeLanguage(code);
    const el = document.getElementById('selected-lang');
    if (el) el.innerText = label;
    const dd = document.getElementById('langDropdown');
    if (dd) dd.classList.remove('open');
};
window.toggleLangMenu = (e) => {
    e.stopPropagation();
    document.getElementById('langDropdown')?.classList.toggle('open');
};
document.addEventListener('click', () => {
    document.getElementById('langDropdown')?.classList.remove('open');
});

function applyLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key) el.innerText = t(key);
    });
    const labels = { en: 'English', ru: 'Русский', uz: "O'zbekcha" };
    const sel = document.getElementById('selected-lang');
    if (sel) sel.innerText = labels[currentLang] || 'English';
    updateLeagueCards();
    renderLeagueRewards();
    updateDailyTasksUI();
    updateReferralUI();
}

function safeHaptic(type, style) {
    if (tg.isVersionAtLeast && tg.isVersionAtLeast('6.1') && tg.HapticFeedback) {
        try {
            if (type === 'impact') tg.HapticFeedback.impactOccurred(style || 'light');
            else if (type === 'selection') tg.HapticFeedback.selectionChanged();
            else if (type === 'notification') tg.HapticFeedback.notificationOccurred(style || 'success');
        } catch (e) {}
    }
}

// Custom modal
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
            modal.style.background = 'rgba(0,0,0,0.35)';
            if (btn) btn.style.display = 'block';
        } else {
            modal.style.pointerEvents = 'none';
            modal.style.background = 'transparent';
            if (btn) btn.style.display = 'none';
            alertTimeout = setTimeout(closeModal, 2800);
        }
    } else alert(message);
}
window.closeModal = () => {
    const modal = document.getElementById('custom-modal');
    if (modal) modal.style.display = 'none';
    if (alertTimeout) clearTimeout(alertTimeout);
};

window.showChestRewardModal = (prizeType, amount) => {
    const modal = document.getElementById('chest-reward-modal');
    if (!modal) return;
    const titleEl = document.getElementById('chest-reward-title');
    const subEl = document.getElementById('chest-reward-sub');
    const iconEl = document.getElementById('chest-reward-icon');
    const amountEl = document.getElementById('chest-reward-amount');
    const thanksBtn = document.getElementById('chest-reward-thanks-btn');
    if (titleEl) titleEl.innerText = t('you_won');
    if (subEl) subEl.innerText = t('congrats');
    if (thanksBtn) thanksBtn.innerText = t('thanks');
    if (prizeType === 'stars') {
        if (iconEl) iconEl.innerText = '⭐';
        if (amountEl) amountEl.innerText = `+${amount} ${amount === 1 ? 'Star' : 'Stars'}`;
    } else {
        if (iconEl) iconEl.innerText = '🪙';
        if (amountEl) amountEl.innerText = `+${formatCompact(amount)} Coins`;
    }
    modal.style.display = 'flex';
    safeHaptic('notification', 'success');
};
window.closeChestRewardModal = () => {
    const m = document.getElementById('chest-reward-modal');
    if (m) m.style.display = 'none';
};
window.handleChestModalBackdropClick = (e) => {
    if (e.target.id === 'chest-reward-modal') closeChestRewardModal();
};

function formatCompact(n) {
    n = Math.floor(n || 0);
    if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
    return String(n);
}

// ========== LEAGUES ==========
const LEAGUES = [
    { id: 'bear', name: 'Bear', min: 0, max: 999, image: 'images/bear.webp', reward: 500, descKey: 'league_bear_desc' },
    { id: 'giftbox', name: 'Gift Box', min: 1000, max: 9999, image: 'images/box.webp', reward: 2500, descKey: 'league_giftbox_desc' },
    { id: 'bouquet', name: 'Bouquet', min: 10000, max: 99999, image: 'images/bouquette.webp', reward: 15000, descKey: 'league_bouquet_desc' },
    { id: 'diamond', name: 'Diamond', min: 100000, max: 499999, image: 'images/diamond.webp', reward: 75000, descKey: 'league_diamond_desc' },
];

function getLeagueForClicks(clicks) {
    let current = LEAGUES[0];
    for (const L of LEAGUES) {
        if (clicks >= L.min) current = L;
    }
    return current;
}

let leagueModalIndex = 0;

function updateLeagueCards() {
    if (!userData) return;
    const clicks = userData.totalClicks || 0;
    const L = getLeagueForClicks(clicks);
    ['earn', 'tasks'].forEach(suffix => {
        const img = document.getElementById(`league-img-${suffix}`);
        const name = document.getElementById(`league-name-${suffix}`);
        if (img) img.src = L.image;
        if (name) name.innerText = L.name;
    });
    const statLeague = document.getElementById('stat-league');
    if (statLeague) statLeague.innerText = L.name;
}

window.openLeagueModal = () => {
    if (!userData) return;
    const clicks = userData.totalClicks || 0;
    const L = getLeagueForClicks(clicks);
    leagueModalIndex = LEAGUES.findIndex(x => x.id === L.id);
    if (leagueModalIndex < 0) leagueModalIndex = 0;
    renderLeagueModal();
    const modal = document.getElementById('league-modal');
    if (modal) modal.style.display = 'flex';
    safeHaptic('selection');
};

window.closeLeagueModal = () => {
    const modal = document.getElementById('league-modal');
    if (modal) modal.style.display = 'none';
};

window.shiftLeague = (dir) => {
    leagueModalIndex = Math.max(0, Math.min(LEAGUES.length - 1, leagueModalIndex + dir));
    renderLeagueModal();
    safeHaptic('selection');
};

function renderLeagueModal() {
    const L = LEAGUES[leagueModalIndex];
    if (!L) return;
    const img = document.getElementById('league-modal-img');
    const name = document.getElementById('league-modal-name');
    const range = document.getElementById('league-modal-range');
    const desc = document.getElementById('league-modal-desc');
    const reward = document.getElementById('league-modal-reward');
    if (img) img.src = L.image;
    if (name) name.innerText = L.name;
    if (range) range.innerText = `${L.min.toLocaleString()} – ${L.max.toLocaleString()} clicks`;
    if (desc) desc.innerText = t(L.descKey);
    const rewardAmt = document.getElementById('league-modal-reward-amount');
    if (rewardAmt) rewardAmt.innerText = `${formatCompact(L.reward)} Coins`;
    const prev = document.getElementById('league-prev');
    const next = document.getElementById('league-next');
    if (prev) prev.disabled = leagueModalIndex === 0;
    if (next) next.disabled = leagueModalIndex === LEAGUES.length - 1;
}

function renderLeagueRewards() {
    const list = document.getElementById('league-rewards-list');
    if (!list || !userData) return;
    const clicks = userData.totalClicks || 0;
    const claimed = userData.claimedLeagues || {};
    let html = '';
    for (const L of LEAGUES) {
        if (claimed[L.id]) continue; // disappear after claim
        const reached = clicks >= L.min;
        const pct = Math.min(100, Math.floor((clicks / Math.max(L.min, 1)) * 100));
        html += `
        <div class="glass-card league-reward-card">
            <div class="league-reward-top">
                <img src="${L.image}" alt="${L.name}">
                <div class="league-reward-info">
                    <h3>${L.name}</h3>
                    <p>${formatCompact(L.reward)} Coins · ${L.min.toLocaleString()}+ clicks</p>
                </div>
            </div>
            <div class="progress-bg">
                <div class="progress-fill" style="width:${reached ? 100 : pct}%"></div>
                <div class="progress-text">${formatCompact(clicks)} / ${formatCompact(L.min)}</div>
            </div>
            <button class="action-btn ${reached ? 'primary-btn' : ''}" 
                ${reached ? '' : 'disabled'} 
                onclick="claimLeagueReward('${L.id}')"
                style="width:100%;">${reached ? t('claim') : t('claim')}</button>
        </div>`;
    }
    list.innerHTML = html || `<p class="empty-state">${t('claimed')}</p>`;
}

window.claimLeagueReward = async (leagueId) => {
    if (!userData) return;
    const L = LEAGUES.find(x => x.id === leagueId);
    if (!L) return;
    if ((userData.totalClicks || 0) < L.min) {
        safeAlert('Not reached yet.', true);
        return;
    }
    const claimed = userData.claimedLeagues || {};
    if (claimed[L.id]) return;
    claimed[L.id] = true;
    userData.claimedLeagues = claimed;
    userData.coins = (userData.coins || 0) + L.reward;
    try {
        await updateDoc(userRef, {
            coins: increment(L.reward),
            claimedLeagues: claimed
        });
    } catch (e) { console.warn(e); }
    updateUI();
    renderLeagueRewards();
    showChestRewardModal('coins', L.reward);
    safeHaptic('notification', 'success');
};

// ========== DAILY TASKS (Tashkent UTC+5) ==========
function getTashkentDate() {
    const now = new Date();
    // UTC+5
    const tash = new Date(now.getTime() + (5 * 60 + now.getTimezoneOffset()) * 60000);
    return tash.toISOString().split('T')[0];
}

function ensureDailyFields() {
    if (!userData) return;
    const today = getTashkentDate();
    if (userData.dailyTasksDate !== today) {
        userData.dailyTasksDate = today;
        userData.dailyTasks = { ad1: false, ad3: 0, ad3Claimed: false, tap500Claimed: false };
        userData.todayTapCoins = 0;
        try {
            if (userRef) {
                updateDoc(userRef, {
                    dailyTasksDate: today,
                    dailyTasks: userData.dailyTasks,
                    todayTapCoins: 0
                }).catch(() => {});
            }
        } catch (e) {}
    }
    if (!userData.dailyTasks) userData.dailyTasks = { ad1: false, ad3: 0, ad3Claimed: false, tap500Claimed: false };
}

function updateDailyTasksUI() {
    if (!userData) return;
    ensureDailyFields();
    const dt = userData.dailyTasks || {};

    // ad1
    const btn1 = document.getElementById('btn-task-ad1');
    if (btn1) {
        if (dt.ad1) {
            btn1.disabled = true;
            btn1.innerText = t('done_today');
            btn1.style.background = '#CFD8DC';
        } else {
            btn1.disabled = false;
            btn1.innerText = t('watch_ad');
            btn1.style.background = '#FF9800';
            btn1.style.color = '#1C1C1C';
        }
    }

    // ad3
    const ad3Count = dt.ad3 || 0;
    const fill3 = document.getElementById('prog-task-ad3');
    const txt3 = document.getElementById('prog-task-ad3-txt');
    if (fill3) fill3.style.width = `${Math.min(100, (ad3Count / 3) * 100)}%`;
    if (txt3) txt3.innerText = `${ad3Count} / 3`;
    const btn3 = document.getElementById('btn-task-ad3');
    if (btn3) {
        if (dt.ad3Claimed) {
            btn3.disabled = true;
            btn3.innerText = t('done_today');
            btn3.style.background = '#CFD8DC';
        } else if (ad3Count >= 3) {
            btn3.disabled = false;
            btn3.innerText = t('claim');
            btn3.style.background = '#2ECC71';
            btn3.style.color = '#fff';
            btn3.onclick = () => claimDailyTask('ad3');
        } else {
            btn3.disabled = false;
            btn3.innerText = t('watch_ad');
            btn3.style.background = '#FF9800';
            btn3.style.color = '#1C1C1C';
            btn3.onclick = () => doDailyTask('ad3');
        }
    }

    // tap500
    const todayTaps = userData.todayTapCoins || 0;
    const fillT = document.getElementById('prog-task-tap500');
    const txtT = document.getElementById('prog-task-tap500-txt');
    if (fillT) fillT.style.width = `${Math.min(100, (todayTaps / 500) * 100)}%`;
    if (txtT) txtT.innerText = `${Math.min(500, todayTaps)} / 500`;
    const btnT = document.getElementById('btn-task-tap500');
    if (btnT) {
        if (dt.tap500Claimed) {
            btnT.disabled = true;
            btnT.innerText = t('done_today');
            btnT.style.background = '#CFD8DC';
        } else if (todayTaps >= 500) {
            btnT.disabled = false;
            btnT.innerText = t('claim');
            btnT.style.background = '#2ECC71';
            btnT.style.color = '#fff';
        } else {
            btnT.disabled = true;
            btnT.innerText = t('claim');
            btnT.style.background = '';
        }
    }
}

window.doDailyTask = async (taskId) => {
    if (!userData) return;
    ensureDailyFields();
    const dt = userData.dailyTasks;

    if (taskId === 'ad1') {
        if (dt.ad1) return;
        const ok = await showAd();
        if (!ok) return;
        dt.ad1 = true;
        userData.stars = (userData.stars || 0) + 1;
        try {
            await updateDoc(userRef, {
                stars: increment(1),
                dailyTasks: dt
            });
        } catch (e) {}
        updateUI();
        updateDailyTasksUI();
        safeHaptic('notification', 'success');
        safeAlert('+1 Star!', false);
    } else if (taskId === 'ad3') {
        if (dt.ad3Claimed || (dt.ad3 || 0) >= 3) return;
        const ok = await showAd();
        if (!ok) return;
        dt.ad3 = (dt.ad3 || 0) + 1;
        try {
            await updateDoc(userRef, { dailyTasks: dt });
        } catch (e) {}
        updateDailyTasksUI();
        if (dt.ad3 >= 3) safeAlert('Ready to claim +3 Stars!', false);
    }
};

window.claimDailyTask = async (taskId) => {
    if (!userData) return;
    ensureDailyFields();
    const dt = userData.dailyTasks;

    if (taskId === 'ad3') {
        if (dt.ad3Claimed || (dt.ad3 || 0) < 3) return;
        dt.ad3Claimed = true;
        userData.stars = (userData.stars || 0) + 3;
        try {
            await updateDoc(userRef, { stars: increment(3), dailyTasks: dt });
        } catch (e) {}
        updateUI();
        updateDailyTasksUI();
        safeHaptic('notification', 'success');
        safeAlert('+3 Stars!', false);
    } else if (taskId === 'tap500') {
        if (dt.tap500Claimed || (userData.todayTapCoins || 0) < 500) return;
        dt.tap500Claimed = true;
        userData.stars = (userData.stars || 0) + 2;
        try {
            await updateDoc(userRef, { stars: increment(2), dailyTasks: dt });
        } catch (e) {}
        updateUI();
        updateDailyTasksUI();
        safeHaptic('notification', 'success');
        safeAlert('+2 Stars!', false);
    }
};

async function showAd() {
    if (!window.Adsgram) {
        safeAlert('Ads unavailable.', true);
        return false;
    }
    try {
        const AdController = window.Adsgram.init({ blockId: '44503', debug: false });
        await AdController.show();
        return true;
    } catch (e) {
        safeAlert('Ad not completed.', true);
        return false;
    }
}

// ========== REFERRALS ==========
function updateReferralUI() {
    if (!userData) return;
    const count = userData.referralCount || 0;
    const pending = userData.pendingBearClaims || 0;
    const el = document.getElementById('ref-count-val');
    if (el) el.innerText = count;
    const fill = document.getElementById('prog-ref');
    const txt = document.getElementById('prog-ref-txt');
    const progressInCycle = count % 10;
    if (fill) fill.style.width = `${(progressInCycle / 10) * 100}%`;
    if (txt) txt.innerText = `${progressInCycle} / 10`;

    const area = document.getElementById('ref-claim-area');
    if (area) {
        if (pending > 0) {
            area.style.display = 'block';
        } else {
            area.style.display = 'none';
        }
    }
}

window.shareReferral = () => {
    const botUsername = 'TappyStarsBot'; // change if different
    const link = `https://t.me/${botUsername}?start=ref_${user.id}`;
    const text = t('share_text');
    if (tg.openTelegramLink) {
        tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`);
    } else if (navigator.share) {
        navigator.share({ title: 'TappyStars', text, url: link }).catch(() => {});
    } else {
        navigator.clipboard?.writeText(link);
        safeAlert('Invite link copied!', false);
    }
};

window.claimReferralBear = () => {
    if (!userData || (userData.pendingBearClaims || 0) <= 0) return;
    // open gift flow free
    pendingGift = { name: 'Bear Gift', cost: 0, isReferral: true };
    openGiftConfirmModal();
};

async function processReferralOnStart() {
    try {
        const startParam = tg.initDataUnsafe?.start_param || '';
        if (!startParam.startsWith('ref_')) return;
        const referrerId = startParam.replace('ref_', '');
        if (!referrerId || referrerId === user.id.toString()) return;
        if (userData?.referredBy) return; // already set

        // mark this user
        await updateDoc(userRef, { referredBy: referrerId });
        userData.referredBy = referrerId;

        // increment referrer
        const refRef = doc(db, 'users', referrerId);
        const refSnap = await getDoc(refRef);
        if (refSnap.exists()) {
            const refData = refSnap.data();
            const newCount = (refData.referralCount || 0) + 1;
            const pending = (refData.pendingBearClaims || 0) + (newCount % 10 === 0 ? 1 : 0);
            // actually: every time count hits multiple of 10
            const prevPending = refData.pendingBearClaims || 0;
            const earned = Math.floor(newCount / 10) - Math.floor((newCount - 1) / 10);
            await updateDoc(refRef, {
                referralCount: increment(1),
                pendingBearClaims: increment(earned)
            });
        }
    } catch (e) {
        console.warn('Referral process error', e);
    }
}

// ========== STATE ==========
const userRef = doc(db, 'users', user.id.toString());
let userData = null;
let isAppInitialized = false;
let unsyncedCoins = 0;
let syncTimer = null;
let isSyncing = false;

const getTodayDate = () => new Date().toISOString().split('T')[0];

onSnapshot(userRef, async (docSnap) => {
    if (docSnap.exists()) {
        userData = docSnap.data();
    } else {
        userData = {
            telegramId: user.id.toString(),
            name: user.first_name || 'Miner',
            coins: 0,
            stars: 0,
            totalClicks: 0,
            energy: 1000,
            todayTapCoins: 0,
            lastTapDate: getTodayDate(),
            boosts: {},
            boostCooldowns: {},
            claimedLeagues: {},
            dailyTasksDate: getTashkentDate(),
            dailyTasks: { ad1: false, ad3: 0, ad3Claimed: false, tap500Claimed: false },
            referralCount: 0,
            pendingBearClaims: 0,
            freeSpinAvailable: true,
            lastSpinAdTime: 0,
            freeBearGift: false,
            chestProgress: { medium: 0, mega: 0, news: 0 },
            purchases: [],
            onboardingDone: false
        };
        await setDoc(userRef, userData);
    }
    // defaults
    if (typeof userData.totalClicks !== 'number') userData.totalClicks = 0;
    if (typeof userData.coins !== 'number') userData.coins = 0;
    if (typeof userData.stars !== 'number') userData.stars = 0;
    if (typeof userData.energy !== 'number') userData.energy = 1000;
    if (!userData.claimedLeagues) userData.claimedLeagues = {};
    if (!userData.boosts) userData.boosts = {};
    if (!userData.chestProgress) userData.chestProgress = { medium: 0, mega: 0, news: 0 };

    ensureDailyFields();
    if (!isAppInitialized) {
        isAppInitialized = true;
        initApp();
        processReferralOnStart();
    }
    updateUI();
});

function initApp() {
    // show UI
    document.getElementById('top-bar').style.display = 'flex';
    document.getElementById('app-content').style.display = 'block';
    document.getElementById('bottom-nav').style.display = 'flex';

    if (!userData.onboardingDone) {
        document.getElementById('onboarding-modal').style.display = 'flex';
    } else {
        document.getElementById('onboarding-modal').style.display = 'none';
    }

    applyLanguage();
    setupMining();
    updateLeagueCards();
    renderLeagueRewards();
    updateDailyTasksUI();
    updateReferralUI();
    updateBoostUI();
    updateChestUI();
    updateSpinUI();
    loadLeaderboardPreview();
    loadPurchases();
    startAutoTapLoop();
}

// ========== TABS ==========
window.switchTab = (tab) => {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const section = document.getElementById(tab);
    if (section) section.classList.add('active');
    const nav = document.querySelector(`.nav-item[data-tab="${tab}"]`);
    if (nav) nav.classList.add('active');
    safeHaptic('selection');

    if (tab === 'tasks') {
        updateDailyTasksUI();
        renderLeagueRewards();
        updateReferralUI();
    }
    if (tab === 'account') {
        updateAccountStats();
        loadPurchases();
    }
    if (tab === 'boxes') updateSpinUI();
};

window.switchTasksTab = (sub) => {
    document.querySelectorAll('#tasks-tabs .sub-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tasks-panel').forEach(p => { p.classList.remove('active'); p.style.display = 'none'; });
    const btn = document.querySelector(`#tasks-tabs .sub-tab-btn[data-tab="${sub}"]`);
    if (btn) btn.classList.add('active');
    const panel = document.getElementById(`tasks-${sub}`);
    if (panel) { panel.classList.add('active'); panel.style.display = 'block'; }
    if (sub === 'leagues') renderLeagueRewards();
    if (sub === 'referrals') updateReferralUI();
    if (sub === 'daily') updateDailyTasksUI();
    safeHaptic('selection');
};

window.switchAccountTab = (sub) => {
    document.querySelectorAll('#account-tabs .sub-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.account-panel').forEach(p => { p.classList.remove('active'); p.style.display = 'none'; });
    const btn = document.querySelector(`#account-tabs .sub-tab-btn[data-tab="${sub}"]`);
    if (btn) btn.classList.add('active');
    const panel = document.getElementById(`account-${sub}`);
    if (panel) { panel.classList.add('active'); panel.style.display = 'block'; }
    if (sub === 'general') updateAccountStats();
    if (sub === 'history') loadPurchases();
    if (sub === 'gifts') updateBearGiftButton();
    safeHaptic('selection');
};

function updateAccountStats() {
    if (!userData) return;
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.innerText = v; };
    set('stat-coins', formatCompact(userData.coins || 0));
    set('stat-stars', formatCompact(userData.stars || 0));
    set('stat-clicks', formatCompact(userData.totalClicks || 0));
    set('stat-tgid', user.id.toString());
    set('stat-league', getLeagueForClicks(userData.totalClicks || 0).name);
}

// ========== MINING ==========
const ENERGY_MAX = 1000;
const ENERGY_COST = 3;
const ENERGY_REGEN = 2;
const ENERGY_REGEN_MS = 5000;

function getMineRate() {
    let rate = 1;
    if (userData?.boosts?.multitap && userData.boosts.multitap > Date.now()) rate += 2;
    return rate;
}

function ensureEnergy() {
    if (!userData) return;
    if (typeof userData.energy !== 'number') userData.energy = ENERGY_MAX;
    if (userData.energy > ENERGY_MAX) userData.energy = ENERGY_MAX;
}

function setupMining() {
    const btn = document.getElementById('mine-btn');
    if (!btn) return;
    btn.onclick = () => {
        if (!userData) return;
        ensureEnergy();
        ensureDailyFields();
        if ((userData.energy || 0) < ENERGY_COST) {
            safeAlert(t('no_energy'), true);
            return;
        }
        const rate = getMineRate();
        userData.energy = Math.max(0, (userData.energy || 0) - ENERGY_COST);
        userData.coins = (userData.coins || 0) + rate;
        userData.todayTapCoins = (userData.todayTapCoins || 0) + rate;
        userData.totalClicks = (userData.totalClicks || 0) + 1;
        unsyncedCoins += rate;
        updateUI();
        updateLeagueCards();
        safeHaptic('impact', 'light');
        scheduleSync();
    };
}

function scheduleSync() {
    if (syncTimer) return;
    syncTimer = setTimeout(async () => {
        syncTimer = null;
        if (isSyncing || !userData) return;
        isSyncing = true;
        const toSync = unsyncedCoins;
        unsyncedCoins = 0;
        try {
            const payload = {
                totalClicks: userData.totalClicks,
                energy: userData.energy,
                todayTapCoins: userData.todayTapCoins || 0
            };
            if (toSync > 0) payload.coins = increment(toSync);
            await updateDoc(userRef, payload);
        } catch (e) {
            if (toSync > 0) unsyncedCoins += toSync;
        }
        isSyncing = false;
    }, 800);
}

function updateUI() {
    if (!userData) return;
    ensureEnergy();
    const coinEl = document.getElementById('coin-bal');
    const starEl = document.getElementById('star-bal');
    if (coinEl) coinEl.innerText = formatCompact(userData.coins || 0);
    if (starEl) starEl.innerText = formatCompact(userData.stars || 0);
    const rateEl = document.getElementById('mine-rate');
    if (rateEl) rateEl.innerText = getMineRate();
    const energyEl = document.getElementById('energy-val');
    if (energyEl) energyEl.innerText = Math.floor(userData.energy || 0);
    updateLeagueCards();
    updateDailyTasksUI();
    updateActiveBoosts();
    updateAccountStats();
}

// Energy regen: +2 every 5 seconds
setInterval(() => {
    if (!userData || !isAppInitialized) return;
    ensureEnergy();
    if (userData.energy < ENERGY_MAX) {
        userData.energy = Math.min(ENERGY_MAX, (userData.energy || 0) + ENERGY_REGEN);
        const energyEl = document.getElementById('energy-val');
        if (energyEl) energyEl.innerText = Math.floor(userData.energy);
    }
}, ENERGY_REGEN_MS);

// ========== BOOSTERS ==========
const BOOST_DURATION = 30 * 60 * 1000;
const BOOST_COOLDOWN = 15 * 60 * 1000;

function updateBoostUI() {
    // visual state of buttons can be extended
}

function updateActiveBoosts() {
    const list = document.getElementById('active-boosts-list');
    if (!list || !userData) return;
    const now = Date.now();
    const boosts = userData.boosts || {};
    const active = [];
    if (boosts.auto && boosts.auto > now) active.push(`Auto Tap (${Math.ceil((boosts.auto - now) / 60000)}m)`);
    if (boosts.multitap && boosts.multitap > now) active.push(`Multi-Tap (${Math.ceil((boosts.multitap - now) / 60000)}m)`);
    list.innerHTML = active.length
        ? active.map(a => `<div style="font-weight:700;padding:6px 0;border-bottom:1px dashed #ddd;">${a}</div>`).join('')
        : `<p class="no-boosts">${t('no_boosters')}</p>`;
}

window.buyEnergyRestoreAd = async () => {
    if (!userData) return;
    const ok = await showAd();
    if (!ok) return;
    ensureEnergy();
    userData.energy = ENERGY_MAX;
    try {
        await updateDoc(userRef, { energy: ENERGY_MAX });
    } catch (e) {}
    updateUI();
    safeHaptic('notification', 'success');
    safeAlert(t('energy_restored'), false);
};

window.buyBoosterAd = async (type) => {
    if (!userData) return;
    const cds = userData.boostCooldowns || {};
    if (cds[type] && cds[type] > Date.now()) {
        const m = Math.ceil((cds[type] - Date.now()) / 60000);
        safeAlert(`Cooldown: ${m} min`, true);
        return;
    }
    const ok = await showAd();
    if (!ok) return;
    const until = Date.now() + BOOST_DURATION;
    if (!userData.boosts) userData.boosts = {};
    userData.boosts[type] = until;
    if (!userData.boostCooldowns) userData.boostCooldowns = {};
    userData.boostCooldowns[type] = Date.now() + BOOST_COOLDOWN;
    try {
        await updateDoc(userRef, {
            boosts: userData.boosts,
            boostCooldowns: userData.boostCooldowns
        });
    } catch (e) {}
    updateUI();
    safeHaptic('notification', 'success');
    safeAlert(`${type} activated!`, false);
};

window.buyBooster = async (type, cost) => {
    if (!userData) return;
    if ((userData.coins || 0) < cost) {
        safeAlert(t('not_enough_coins'), true);
        return;
    }
    const cds = userData.boostCooldowns || {};
    if (cds[type] && cds[type] > Date.now()) {
        safeAlert('Cooldown active.', true);
        return;
    }
    userData.coins -= cost;
    const until = Date.now() + BOOST_DURATION;
    if (!userData.boosts) userData.boosts = {};
    userData.boosts[type] = until;
    if (!userData.boostCooldowns) userData.boostCooldowns = {};
    userData.boostCooldowns[type] = Date.now() + BOOST_COOLDOWN;
    try {
        await updateDoc(userRef, {
            coins: increment(-cost),
            boosts: userData.boosts,
            boostCooldowns: userData.boostCooldowns
        });
    } catch (e) {}
    updateUI();
    safeHaptic('notification', 'success');
};

function startAutoTapLoop() {
    setInterval(() => {
        if (!userData) return;
        const boosts = userData.boosts || {};
        if (boosts.auto && boosts.auto > Date.now()) {
            ensureEnergy();
            if ((userData.energy || 0) < ENERGY_COST) return;
            userData.energy = Math.max(0, (userData.energy || 0) - ENERGY_COST);
            userData.coins = (userData.coins || 0) + 1;
            userData.todayTapCoins = (userData.todayTapCoins || 0) + 1;
            userData.totalClicks = (userData.totalClicks || 0) + 1;
            unsyncedCoins += 1;
            updateUI();
            scheduleSync();
        }
        updateActiveBoosts();
    }, 1000);
}

// ========== CHESTS ==========
function updateChestUI() {
    if (!userData) return;
    const cp = userData.chestProgress || { medium: 0, mega: 0, news: 0 };
    const setProg = (fillId, txtId, val, max) => {
        const f = document.getElementById(fillId);
        const t = document.getElementById(txtId);
        if (f) f.style.width = `${(val / max) * 100}%`;
        if (t) t.innerText = `${val} / ${max}`;
    };
    setProg('prog-med-fill', 'prog-med-txt', cp.medium || 0, 2);
    setProg('prog-mega-fill', 'prog-mega-txt', cp.mega || 0, 3);
    setProg('prog-news-fill', 'prog-news-txt', cp.news || 0, 2);
}

window.handleChest = async (type, needed) => {
    if (!userData) return;
    if (!userData.chestProgress) userData.chestProgress = { medium: 0, mega: 0, news: 0 };
    const cp = userData.chestProgress;

    if (type === 'small') {
        const ok = await showAd();
        if (!ok) return;
        grantChestPrize('small');
        return;
    }
    const key = type === 'medium' ? 'medium' : 'mega';
    if ((cp[key] || 0) >= needed) {
        grantChestPrize(type);
        cp[key] = 0;
        try { await updateDoc(userRef, { chestProgress: cp }); } catch (e) {}
        updateChestUI();
        return;
    }
    const ok = await showAd();
    if (!ok) return;
    cp[key] = (cp[key] || 0) + 1;
    try { await updateDoc(userRef, { chestProgress: cp }); } catch (e) {}
    updateChestUI();
    if (cp[key] >= needed) {
        grantChestPrize(type);
        cp[key] = 0;
        try { await updateDoc(userRef, { chestProgress: cp }); } catch (e) {}
        updateChestUI();
    }
};

window.handleNewsReward = async () => {
    if (!userData) return;
    if (!userData.chestProgress) userData.chestProgress = { medium: 0, mega: 0, news: 0 };
    const cp = userData.chestProgress;
    if ((cp.news || 0) >= 2) {
        userData.coins = (userData.coins || 0) + 200;
        try {
            await updateDoc(userRef, { coins: increment(200), 'chestProgress.news': 0 });
        } catch (e) {}
        cp.news = 0;
        updateUI();
        updateChestUI();
        showChestRewardModal('coins', 200);
        return;
    }
    const ok = await showAd();
    if (!ok) return;
    cp.news = (cp.news || 0) + 1;
    try { await updateDoc(userRef, { chestProgress: cp }); } catch (e) {}
    updateChestUI();
    if (cp.news >= 2) {
        userData.coins = (userData.coins || 0) + 200;
        try {
            await updateDoc(userRef, { coins: increment(200), 'chestProgress.news': 0 });
        } catch (e) {}
        cp.news = 0;
        updateUI();
        updateChestUI();
        showChestRewardModal('coins', 200);
    }
};

function grantChestPrize(type) {
    const roll = Math.random();
    let prizeType = 'coins', amount = 100;
    if (type === 'small') {
        amount = 50 + Math.floor(Math.random() * 150);
    } else if (type === 'medium') {
        if (roll < 0.15) { prizeType = 'stars'; amount = 1; }
        else amount = 200 + Math.floor(Math.random() * 300);
    } else {
        if (roll < 0.2) { prizeType = 'stars'; amount = 1 + Math.floor(Math.random() * 3); }
        else amount = 400 + Math.floor(Math.random() * 600);
    }
    if (prizeType === 'stars') {
        userData.stars = (userData.stars || 0) + amount;
        updateDoc(userRef, { stars: increment(amount) }).catch(() => {});
    } else {
        userData.coins = (userData.coins || 0) + amount;
        updateDoc(userRef, { coins: increment(amount) }).catch(() => {});
    }
    updateUI();
    showChestRewardModal(prizeType, amount);
}

// ========== SPIN ==========
// Icons: coin SVG / star SVG (no emoji). Pool: coins + stars (incl. 15⭐). No bear.
const ICON_COIN = `<svg class="spin-card-icon-img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M8.5 10.5h7M8.5 13.5h7"/></svg>`;
const ICON_STAR = `<svg class="spin-card-icon-img" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

const SPIN_POOL = [
    { type: 'coins', amount: 200, label: '+200', weight: 22, cls: '' },
    { type: 'coins', amount: 250, label: '+250', weight: 18, cls: '' },
    { type: 'coins', amount: 300, label: '+300', weight: 16, cls: '' },
    { type: 'coins', amount: 400, label: '+400', weight: 12, cls: '' },
    { type: 'coins', amount: 500, label: '+500', weight: 10, cls: '' },
    { type: 'stars', amount: 1,  label: '1', weight: 12, cls: 'star' },
    { type: 'stars', amount: 5,  label: '5', weight: 6,  cls: 'star' },
    { type: 'stars', amount: 10, label: '10', weight: 3,  cls: 'star' },
    { type: 'stars', amount: 15, label: '15', weight: 1,  cls: 'star' }
];

const SPIN_COOLDOWN_SHORT = 2 * 60 * 1000;  // first 3 spins / day
const SPIN_COOLDOWN_LONG  = 10 * 60 * 1000; // after 3 spins
const SPIN_FAST_LIMIT = 3;
let isSpinning = false;

function pickSpinPrize() {
    const total = SPIN_POOL.reduce((s, p) => s + p.weight, 0);
    let r = Math.random() * total;
    for (const p of SPIN_POOL) {
        r -= p.weight;
        if (r <= 0) return p;
    }
    return SPIN_POOL[0];
}

function ensureSpinFields() {
    if (!userData) return;
    const today = getTashkentDate();
    if (userData.spinDate !== today) {
        userData.spinDate = today;
        userData.spinsToday = 0;
        userData.lastSpinAdTime = 0;
        try {
            updateDoc(userRef, { spinDate: today, spinsToday: 0, lastSpinAdTime: 0 }).catch(() => {});
        } catch (e) {}
    }
    if (typeof userData.spinsToday !== 'number') userData.spinsToday = 0;
    if (typeof userData.lastSpinAdTime !== 'number') userData.lastSpinAdTime = 0;
}

function getSpinCooldownMs() {
    ensureSpinFields();
    return (userData.spinsToday || 0) < SPIN_FAST_LIMIT ? SPIN_COOLDOWN_SHORT : SPIN_COOLDOWN_LONG;
}

function remainingSpinAdCooldown() {
    ensureSpinFields();
    const need = getSpinCooldownMs();
    return Math.max(0, need - (Date.now() - (userData?.lastSpinAdTime || 0)));
}

function processDailyLogin() {
    if (!userData) return;
    ensureSpinFields();
    updateSpinUI();
}

function spinIconHtml(p) {
    return p.type === 'stars' ? ICON_STAR : ICON_COIN;
}

function buildSpinReel(forcePrize) {
    const track = document.getElementById('spin-reel-track');
    if (!track) return null;
    const cards = [];
    for (let i = 0; i < 12; i++) cards.push(SPIN_POOL[Math.floor(Math.random() * SPIN_POOL.length)]);
    const win = forcePrize || pickSpinPrize();
    cards.push(win);
    for (let i = 0; i < 8; i++) cards.push(SPIN_POOL[Math.floor(Math.random() * SPIN_POOL.length)]);
    track.innerHTML = cards.map(p => `
        <div class="spin-card ${p.cls}" data-type="${p.type}" data-amount="${p.amount}">
            <span class="spin-card-icon">${spinIconHtml(p)}</span>
            <span class="spin-card-label">${p.label}${p.type === 'stars' ? ' ★' : ''}</span>
        </div>`).join('');
    track.style.transition = 'none';
    track.style.transform = 'translateX(0)';
    return { cards, winIndex: 12, win };
}

function openSpinReel() {
    const wrap = document.getElementById('spin-reel-wrap');
    if (!wrap) return;
    wrap.hidden = false;
    // force reflow then open
    void wrap.offsetHeight;
    wrap.classList.add('open');
}

function closeSpinReel() {
    const wrap = document.getElementById('spin-reel-wrap');
    if (!wrap) return;
    wrap.classList.remove('open');
    setTimeout(() => { wrap.hidden = true; }, 400);
}

function updateSpinUI() {
    ensureSpinFields();
    const btn = document.getElementById('btn-spin-main');
    if (!btn) return;
    if (isSpinning) {
        btn.disabled = true;
        btn.innerText = 'SPINNING...';
        return;
    }
    const remain = remainingSpinAdCooldown();
    // Always need ad; cooldown after last spin
    if (remain > 0 && (userData.lastSpinAdTime || 0) > 0) {
        const sec = Math.ceil(remain / 1000);
        btn.disabled = true;
        btn.innerText = `WAIT ${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
        btn.style.background = '#CFD8DC';
        btn.style.color = '#1C1C1C';
        btn.onclick = null;
    } else {
        btn.disabled = false;
        btn.innerText = 'SPIN';
        btn.style.background = '';
        btn.style.color = '';
        btn.onclick = () => startSpinFlow();
    }
}

setInterval(() => {
    if (userData && !isSpinning) updateSpinUI();
}, 1000);

window.startSpinFlow = async () => {
    if (!userData || isSpinning) return;
    ensureSpinFields();
    const remain = remainingSpinAdCooldown();
    if (remain > 0 && (userData.lastSpinAdTime || 0) > 0) {
        updateSpinUI();
        return;
    }
    // Watch ad first, then spin
    const btn = document.getElementById('btn-spin-main');
    if (btn) { btn.disabled = true; btn.innerText = 'Loading ad...'; }
    const ok = await showAd();
    if (!ok) {
        updateSpinUI();
        return;
    }
    userData.lastSpinAdTime = Date.now();
    userData.spinsToday = (userData.spinsToday || 0) + 1;
    try {
        await updateDoc(userRef, {
            lastSpinAdTime: userData.lastSpinAdTime,
            spinsToday: userData.spinsToday,
            spinDate: userData.spinDate || getTashkentDate()
        });
    } catch (e) {}
    doSpinAnimation();
};

async function doSpinAnimation() {
    if (isSpinning || !userData) return;
    isSpinning = true;
    updateSpinUI();

    const resEl = document.getElementById('spin-result-inline');
    if (resEl) {
        resEl.style.display = 'none';
        resEl.classList.remove('win-pop');
    }

    openSpinReel();
    await new Promise(r => setTimeout(r, 280)); // let reel expand

    const built = buildSpinReel();
    const track = document.getElementById('spin-reel-track');
    const viewport = track?.parentElement;
    if (!track || !viewport || !built) {
        isSpinning = false;
        updateSpinUI();
        return;
    }

    const cardW = viewport.clientWidth / 3;
    const targetX = -((built.winIndex - 1) * cardW);
    void track.offsetWidth;
    track.style.transition = 'transform 3.6s cubic-bezier(0.12, 0.75, 0.15, 1)';
    track.style.transform = `translateX(${targetX}px)`;

    setTimeout(async () => {
        const prize = built.win;
        try {
            if (prize.type === 'coins') {
                userData.coins = (userData.coins || 0) + prize.amount;
                await updateDoc(userRef, { coins: increment(prize.amount) });
            } else if (prize.type === 'stars') {
                userData.stars = (userData.stars || 0) + prize.amount;
                await updateDoc(userRef, { stars: increment(prize.amount) });
            }
        } catch (e) {}
        updateUI();
        if (resEl) {
            resEl.style.display = 'block';
            resEl.classList.add('win-pop');
            if (prize.type === 'stars') resEl.innerText = `You won: ${prize.amount} Star${prize.amount > 1 ? 's' : ''}`;
            else resEl.innerText = `You won: ${prize.amount} Coins`;
        }
        // Also show chest-style modal for stronger feedback
        showChestRewardModal(prize.type, prize.amount);
        safeHaptic('notification', 'success');
        isSpinning = false;
        updateSpinUI();
        // collapse reel after a moment
        setTimeout(() => closeSpinReel(), 2200);
    }, 3800);
}

// keep processDailyLogin on interval
setInterval(() => {
    if (userData && isAppInitialized) processDailyLogin();
}, 2000);

// ========== GIFTS / EXCHANGE / LEGAL / LEADERBOARD ==========
let pendingGift = null;

function updateBearGiftButton() {
    const btn = document.getElementById('btn-gift-bear');
    if (!btn) return;
    if (userData?.freeBearGift) {
        btn.innerText = 'FREE';
        btn.style.background = '#2ECC71';
        btn.style.color = '#fff';
        btn.onclick = () => buyGift('Bear Gift', 0);
    } else {
        btn.innerText = '25 ⭐';
        btn.style.background = '';
        btn.style.color = '';
        btn.onclick = () => buyGift('Bear Gift', 25);
    }
}

window.buyGift = (name, cost) => {
    if (!userData) return;
    if (cost > 0 && (userData.stars || 0) < cost) {
        safeAlert('Not enough Stars.', true);
        return;
    }
    pendingGift = { name, cost, isReferral: false };
    openGiftConfirmModal();
};

function openGiftConfirmModal() {
    const modal = document.getElementById('gift-confirm-modal');
    const summary = document.getElementById('gift-confirm-summary');
    if (summary && pendingGift) {
        summary.innerHTML = `<strong>${pendingGift.name}</strong><br>${pendingGift.cost === 0 ? 'FREE' : pendingGift.cost + ' ⭐'}`;
    }
    if (modal) modal.style.display = 'flex';
}

window.closeGiftConfirmModal = () => {
    document.getElementById('gift-confirm-modal').style.display = 'none';
    pendingGift = null;
};

window.confirmGiftPurchase = async () => {
    if (!pendingGift || !userData) return;
    const input = document.getElementById('gift-username-input');
    const username = (input?.value || '').trim();
    if (!username || username.length < 2) {
        safeAlert(t('username_required'), true);
        return;
    }
    const cost = pendingGift.cost;
    if (cost > 0) {
        if ((userData.stars || 0) < cost) {
            safeAlert('Not enough Stars.', true);
            return;
        }
        userData.stars -= cost;
    }
    if (pendingGift.isReferral) {
        userData.pendingBearClaims = Math.max(0, (userData.pendingBearClaims || 0) - 1);
    }
    if (pendingGift.name === 'Bear Gift' && userData.freeBearGift) {
        userData.freeBearGift = false;
    }

    const purchase = {
        name: pendingGift.name,
        cost,
        username,
        status: 'pending',
        date: new Date().toISOString()
    };
    if (!userData.purchases) userData.purchases = [];
    userData.purchases.unshift(purchase);

    try {
        const updates = {
            purchases: userData.purchases,
            freeBearGift: userData.freeBearGift,
            pendingBearClaims: userData.pendingBearClaims || 0
        };
        if (cost > 0) updates.stars = increment(-cost);
        await updateDoc(userRef, updates);
        await addDoc(collection(db, 'gift_orders'), {
            userId: user.id.toString(),
            name: user.first_name || '',
            gift: pendingGift.name,
            cost,
            username,
            status: 'pending',
            createdAt: new Date().toISOString()
        });
    } catch (e) { console.warn(e); }

    updateUI();
    updateBearGiftButton();
    updateReferralUI();
    closeGiftConfirmModal();
    safeAlert(t('gift_success'), true);
    safeHaptic('notification', 'success');
};

window.openExchangeModal = () => {
    const modal = document.getElementById('exchange-modal');
    if (modal) modal.style.display = 'flex';
    const bal = document.getElementById('exchange-balance');
    if (bal) bal.innerText = formatCompact(userData?.coins || 0);
    updateExchangePreview();
};
window.closeExchangeModal = () => {
    document.getElementById('exchange-modal').style.display = 'none';
};
window.setMaxCoins = () => {
    const input = document.getElementById('exchange-input');
    if (input && userData) {
        const max = Math.floor((userData.coins || 0) / 1000) * 1000;
        input.value = max;
        updateExchangePreview();
    }
};
window.updateExchangePreview = () => {
    const input = document.getElementById('exchange-input');
    const preview = document.getElementById('exchange-stars-preview');
    const coins = parseInt(input?.value || '0', 10) || 0;
    if (preview) preview.innerText = Math.floor(coins / 1000);
};
window.confirmExchange = async () => {
    if (!userData) return;
    const input = document.getElementById('exchange-input');
    const coins = parseInt(input?.value || '0', 10) || 0;
    if (coins < 1000) {
        safeAlert(t('enter_amount'), true);
        return;
    }
    if ((userData.coins || 0) < coins) {
        safeAlert(t('not_enough_coins'), true);
        return;
    }
    const stars = Math.floor(coins / 1000);
    const spent = stars * 1000;
    userData.coins -= spent;
    userData.stars = (userData.stars || 0) + stars;
    try {
        await updateDoc(userRef, {
            coins: increment(-spent),
            stars: increment(stars)
        });
    } catch (e) {}
    updateUI();
    closeExchangeModal();
    safeAlert(`+${stars} Stars!`, false);
    safeHaptic('notification', 'success');
};

window.openLegalModal = (type) => {
    const modal = document.getElementById('legal-modal');
    const title = document.getElementById('legal-title');
    const content = document.getElementById('legal-content');
    if (type === 'privacy') {
        if (title) title.innerText = t('privacy_policy');
        if (content) content.innerHTML = `<p>We respect your privacy. TappyStars stores only your Telegram ID, username, game progress and purchase history needed to operate the service. We do not sell personal data. Ads are served by third-party providers.</p>`;
    } else {
        if (title) title.innerText = t('terms_of_service');
        if (content) content.innerHTML = `<p>By using TappyStars you agree to play fairly. Virtual coins and stars have no real-world cash value. Gifts are delivered to the Telegram account you specify within 7–10 days after order confirmation. Abuse, fraud or exploitation of the system may result in account restriction.</p>`;
    }
    if (modal) modal.style.display = 'flex';
};
window.closeLegalModal = () => {
    document.getElementById('legal-modal').style.display = 'none';
};

async function loadLeaderboardPreview() {
    const list = document.getElementById('leaderboard-preview-list');
    if (!list) return;
    try {
        const q = query(collection(db, 'users'), orderBy('coins', 'desc'), limit(5));
        const snap = await getDocs(q);
        let html = '';
        let rank = 1;
        snap.forEach(d => {
            const data = d.data();
            html += `<div style="display:flex;justify-content:space-between;font-weight:700;padding:6px 0;border-bottom:1px dashed #ddd;">
                <span>#${rank} ${data.name || 'Miner'}</span>
                <span>${formatCompact(data.coins || 0)} 🪙</span>
            </div>`;
            rank++;
        });
        list.innerHTML = html || '<p style="text-align:center;">—</p>';
    } catch (e) {
        list.innerHTML = '<p style="text-align:center;">Error</p>';
    }
}

window.openLeaderboard = async () => {
    const modal = document.getElementById('leaderboard-modal');
    if (modal) modal.style.display = 'flex';
    const list = document.getElementById('full-leaderboard-list');
    const sticky = document.getElementById('sticky-user-card');
    if (list) list.innerHTML = 'Loading...';
    try {
        const q = query(collection(db, 'users'), orderBy('coins', 'desc'), limit(30));
        const snap = await getDocs(q);
        let html = '';
        let rank = 1;
        let myRank = '—';
        snap.forEach(d => {
            const data = d.data();
            const isMe = d.id === user.id.toString();
            if (isMe) myRank = rank;
            html += `<div class="glass-card" style="padding:12px 14px;${isMe ? 'background:#FFD700;' : ''}">
                <span style="font-weight:900;">#${rank} ${data.name || 'Miner'}</span>
                <span style="font-weight:800;">${formatCompact(data.coins || 0)} 🪙</span>
            </div>`;
            rank++;
        });
        list.innerHTML = html;
        if (sticky) sticky.innerHTML = `<strong>You · Rank #${myRank}</strong> · ${formatCompact(userData?.coins || 0)} coins`;
    } catch (e) {
        if (list) list.innerHTML = 'Error loading.';
    }
};
window.closeLeaderboard = () => {
    document.getElementById('leaderboard-modal').style.display = 'none';
};

function loadPurchases() {
    const list = document.getElementById('purchases-list');
    if (!list || !userData) return;
    const purchases = userData.purchases || [];
    if (!purchases.length) {
        list.innerHTML = `<p class="empty-state">${t('no_purchases')}</p>`;
        return;
    }
    list.innerHTML = purchases.map(p => {
        const status = p.status || 'pending';
        return `<div class="glass-card purchase-item">
            <div>
                <strong>${p.name}</strong>
                <div style="font-size:0.8em;color:var(--text-muted);">${p.username || ''} · ${p.cost || 0}⭐</div>
            </div>
            <span class="status-badge status-${status}">${status}</span>
        </div>`;
    }).join('');
}

// ========== ONBOARDING ==========
window.nextSlide = (n) => {
    document.querySelectorAll('#onboarding-modal .slide').forEach(s => s.classList.remove('active'));
    const slide = document.getElementById(`slide-${n}`);
    if (slide) slide.classList.add('active');
};
window.skipOnboarding = window.finishOnboarding = async () => {
    document.getElementById('onboarding-modal').style.display = 'none';
    if (userData) {
        userData.onboardingDone = true;
        try { await updateDoc(userRef, { onboardingDone: true }); } catch (e) {}
    }
};

// greet
const greet = document.getElementById('profile-greeting');
if (greet && user.first_name) {
    // will be overwritten by i18n, keep simple
}
