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

// Telegram CloudStorage Sync Helpers
function cloudSet(key, value) {
    if (tg.CloudStorage?.setItem) {
        tg.CloudStorage.setItem(key, String(value), () => {});
    }
}
function cloudGet(key, callback) {
    if (tg.CloudStorage?.getItem) {
        tg.CloudStorage.getItem(key, (err, val) => {
            if (!err && val !== undefined && val !== null) callback(val);
        });
    }
}

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
        nav_boxes: "NFT",
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
        task_reward_3stars: "+1500 Coins",
        task_reward_2stars: "+700 Coins",
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
        league_bear_desc: "Starting league — every great miner begins here. Keep tapping to climb higher. Reach this league and claim a 500 Coins reward in the Tasks section!",
        league_giftbox_desc: "You're getting serious! Gift Box league means real progress. Keep mining and claim a 2,500 Coins reward in Tasks once you unlock it.",
        league_bouquet_desc: "High achiever territory. Bouquet league shows dedication. Unlock it and claim a 10,000 Coins reward from the Tasks section!",
        league_diamond_desc: "Elite miner status. Diamond league is almost legendary — unlock it and claim a massive 40,000 Coins reward in Tasks!",
        claimed: "Claimed",
        done_today: "Done today",
        share_text: "Join me on TappyStars and mine coins together!",
        buy_boosters: "Buy Boosters",
        ads_limit_reached: "Daily ad limit reached",
        ads_reset_in: "Resets in",
        ref_step1: "Share your invite link with friends.",
        ref_step2: "Referrals count only after your friend watches an ad & does at least 1 spin.",
        ref_step3: "Claim a free Bear Gift for every 10 valid referrals.",
        buy_gifts: "Buy Gifts",
        free_nft: "WIN FREE NFT!",
        nft_comp_title: "NFT Competition",
        nft_prize_1st: "Exclusive NFT",
        nft_comp_desc: "Invite as many people as possible with your link and become first in the leaderboard to win this NFT.",
        your_invite_link: "Your invite link",
        nft_step3: "Climb the referral leaderboard — 1st wins the NFT, 2nd & 3rd win Stars.",
        ref_leaderboard: "Referral Leaderboard",
        referrals_label: "referrals",
        your_rank: "Your rank",
        status_pending: "Pending",
        status_approved: "Approved",
        status_sent: "Sent",
        status_denied: "Denied",
        status_declined: "Declined",
        status_processing: "Processing",
        no_internet: "No internet connection",
        something_went_wrong: "Something went wrong",
        retry_btn: "Retry",
        nav_clan: "Clan",
        clan_title: "Clan Battles",
        clan_subtitle: "Join or create a clan to battle for Telegram Stars!",
        join_clan_title: "Join a Clan",
        search: "Search",
        create_clan_btn: "Create Clan (2,000 Coins)",
        clan_chat: "Chat",
        clan_battle: "Battle",
        clan_members: "Members",
        clan_settings: "Settings",
        clan_back: "Back",
        clan_send: "Send",
        clan_type_msg: "Type message...",
        clan_enter_code: "ENTER CLAN CODE",
        clan_how_points: "How to Earn Points",
        clan_leaderboard: "Clan Leaderboard",
        clan_settings_title: "Clan Settings",
        clan_leave: "Leave Clan",
        clan_name_label: "Clan Name",
        clan_desc_label: "Description",
        clan_save: "Save Settings",
        clan_admin_only: "Only the clan Admin can edit clan settings.",
        clan_feature_1_title: "Earn together",
        clan_feature_1_desc: "Every 100 coins you mine adds 10 points to your clan.",
        clan_feature_2_title: "Climb the ranks",
        clan_feature_2_desc: "Battle other clans on the live leaderboard for glory.",
        clan_feature_3_title: "Chat & coordinate",
        clan_feature_3_desc: "Talk with members and plan your next push.",
        clan_or: "OR",
        clan_join_hint: "Enter a 6-digit clan code from a friend",
        clan_create_hint: "Start fresh and become the admin! Create your own clan for 2000 coins!",
        clan_rule_coins: "100 Coins",
        clan_rule_coins_pts: "+10 Points",
        clan_rule_referral: "Referral",
        clan_rule_referral_pts: "+100 Points",
        clan_rule_ad: "Watch Ad",
        clan_rule_ad_pts: "+50 Points",
        top_coins: "Top Coins",
        top_stars: "Top Stars",
        task_ref_1: "1 New Referral Today",
        task_adsgram_title: "Partner Daily Task",
        task_adsgram_reward: "+1,000 Coins"
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
        nav_boxes: "NFT",
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
        task_reward_3stars: "+1500 Монет",
        task_reward_2stars: "+700 Монет",
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
        league_bear_desc: "Стартовая лига — здесь начинается путь каждого майнера. Продолжайте тапать, чтобы подняться выше. Достигните этой лиги и получите 500 монет в разделе Задания!",
        league_giftbox_desc: "Вы серьёзно настроены! Лига Gift Box — признак прогресса. Продолжайте майнить и заберите 2500 монет в Заданиях после открытия.",
        league_bouquet_desc: "Территория высоких достижений. Лига Bouquet показывает вашу преданность. Откройте её и получите 10 000 монет в Заданиях!",
        league_diamond_desc: "Статус элиты. Алмазная лига — почти легенда. Откройте её и получите огромную награду 40 000 монет в Заданиях!",
        claimed: "Получено",
        done_today: "Сделано сегодня",
        share_text: "Присоединяйся ко мне в TappyStars!",
        buy_boosters: "Купить бустеры",
        ads_limit_reached: "Дневной лимит рекламы",
        ads_reset_in: "Сброс через",
        ref_step1: "Поделитесь ссылкой с друзьями.",
        ref_step2: "Реферал засчитывается, когда друг смотрит рекламу и делает хотя бы 1 спин.",
        ref_step3: "Получайте бесплатного Медведя за каждые 10 засчитанных рефералов.",
        buy_gifts: "Купить подарки",
        free_nft: "БЕСПЛАТНЫЙ NFT",
        nft_comp_title: "NFT-соревнование",
        nft_prize_1st: "Эксклюзивный NFT",
        nft_comp_desc: "Приглашайте как можно больше друзей по своей ссылке и займите первое место в таблице лидеров, чтобы выиграть этот NFT.",
        your_invite_link: "Ваша ссылка-приглашение",
        nft_step3: "Поднимайтесь в таблице рефералов — 1-е место получает NFT, 2-е и 3-е — Звёзды.",
        ref_leaderboard: "Таблица рефералов",
        referrals_label: "рефералов",
        your_rank: "Ваш ранг",
        status_pending: "Ожидание",
        status_approved: "Одобрено",
        status_sent: "Отправлено",
        status_denied: "Отклонено",
        status_declined: "Отклонено",
        status_processing: "В обработке",
        no_internet: "Нет подключения к интернету",
        something_went_wrong: "Что-то пошло не так",
        retry_btn: "Повторить",
        nav_clan: "Клан",
        clan_title: "Клановые Битвы",
        clan_subtitle: "Вступайте или создавайте клан для битвы за Звёзды!",
        join_clan_title: "Вступить в Клан",
        search: "Поиск",
        create_clan_btn: "Создать Клан (2,000 Монет)",
        clan_chat: "Чат",
        clan_battle: "Битва",
        clan_members: "Участники",
        clan_settings: "Настройки",
        clan_back: "Назад",
        clan_send: "Отпр.",
        clan_type_msg: "Сообщение...",
        clan_enter_code: "КОД КЛАНА",
        clan_how_points: "Как зарабатывать очки",
        clan_leaderboard: "Таблица кланов",
        clan_settings_title: "Настройки клана",
        clan_leave: "Покинуть клан",
        clan_name_label: "Название клана",
        clan_desc_label: "Описание",
        clan_save: "Сохранить",
        clan_admin_only: "Только админ может менять настройки клана.",
        clan_feature_1_title: "Зарабатывайте вместе",
        clan_feature_1_desc: "Каждые 100 монет добавляют 10 очков вашему клану.",
        clan_feature_2_title: "Поднимайтесь в рейтинге",
        clan_feature_2_desc: "Сражайтесь с другими кланами в таблице лидеров.",
        clan_feature_3_title: "Чат и координация",
        clan_feature_3_desc: "Общайтесь с участниками и планируйте атаки.",
        clan_or: "ИЛИ",
        clan_join_hint: "Введите 6-значный код клана от друга",
        clan_create_hint: "Создай свой и стань админом! Создай собственный клан за 2000 монет!",
        clan_rule_coins: "100 Монет",
        clan_rule_coins_pts: "+10 Очков",
        clan_rule_referral: "Реферал",
        clan_rule_referral_pts: "+100 Очков",
        clan_rule_ad: "Реклама",
        clan_rule_ad_pts: "+50 Очков",
        top_coins: "Топ монет",
        top_stars: "Топ звёзд",
        task_ref_1: "1 новый реферал сегодня",
        task_adsgram_title: "Партнерское задание",
        task_adsgram_reward: "+1000 Монет"
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
        top_miners: "Top",
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
        nav_boxes: "NFT",
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
        task_reward_3stars: "+1500 Tanga",
        task_reward_2stars: "+700 Tanga",
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
        league_bear_desc: "Boshlang'ich liga — har bir konchi shu yerdan boshlaydi. Yuqoriroq chiqish uchun davom eting. Ushbu ligaga yetib, Tasks bo'limida 500 tanga oling!",
        league_giftbox_desc: "Jiddiy o'yinchi! Gift Box ligasi — haqiqiy progress. Qazishni davom ettiring va ochilgach Tasks da 2500 tanga oling.",
        league_bouquet_desc: "Yuqori natijalar hududi. Bouquet ligasi sadoqatingizni ko'rsatadi. Ochib, Tasks da 10 000 tanga mukofotini oling!",
        league_diamond_desc: "Elita maqomi. Olmos ligasi — deyarli afsona. Ochib, Tasks da ulkan 40 000 tanga mukofotini oling!",
        claimed: "Olingan",
        done_today: "Bugun bajarildi",
        share_text: "TappyStars da menga qo'shiling!",
        buy_boosters: "Buster sotib olish",
        ads_limit_reached: "Kunlik reklama limiti",
        ads_reset_in: "Qayta ochiladi",
        ref_step1: "Do'stlaringiz bilan taklif havolasini ulashing.",
        ref_step2: "Referal hisoblanishi uchun do'stingiz reklama ko'rib, kamida 1 ta spin bajarishi shart.",
        ref_step3: "Har 10 ta tasdiqlangan referal uchun bepul Ayiq oling.",
        buy_gifts: "Sovg'alar sotib olish",
        free_nft: "BEPUL NFT OLING!",
        nft_comp_title: "NFT musobaqasi",
        nft_prize_1st: "Eksklyuziv NFT",
        nft_comp_desc: "Havolangiz orqali imkon qadar ko'p odamni taklif qiling va liderlar jadvalida birinchi bo'lib ushbu NFT ni yuting.",
        your_invite_link: "Sizning taklif havolangiz",
        nft_step3: "Referallar jadvalida yuqoriga chiqing — 1-o'rin NFT, 2 va 3-o'rin Yulduzlar oladi.",
        ref_leaderboard: "Referallar jadvali",
        referrals_label: "referal",
        your_rank: "Sizning o'rningiz",
        status_pending: "Kutilmoqda",
        status_approved: "Tasdiqlangan",
        status_sent: "Yuborilgan",
        status_denied: "Rad etilgan",
        status_declined: "Rad etilgan",
        status_processing: "Jarayonda",
        no_internet: "Internet aloqasi yo'q",
        something_went_wrong: "Xatolik yuz berdi",
        retry_btn: "Qayta urinish",
        nav_clan: "Klan",
        clan_title: "Klan Janglari",
        clan_subtitle: "Telegram Yulduzlari uchun klan yarating yoki qo'shiling!",
        join_clan_title: "Klanga qo'shilish",
        search: "Qidirish",
        create_clan_btn: "Klan yaratish (2,000 Tanga)",
        clan_chat: "Chat",
        clan_battle: "Jang",
        clan_members: "A'zolar",
        clan_settings: "Sozlamalar",
        clan_back: "Orqaga",
        clan_send: "Yuborish",
        clan_type_msg: "Xabar yozing...",
        clan_enter_code: "KLAN KODI",
        clan_how_points: "Ball qanday olinadi",
        clan_leaderboard: "Klan reytingi",
        clan_settings_title: "Klan sozlamalari",
        clan_leave: "Klandan chiqish",
        clan_name_label: "Klan nomi",
        clan_desc_label: "Tavsif",
        clan_save: "Saqlash",
        clan_admin_only: "Faqat admin klan sozlamalarini o'zgartira oladi.",
        clan_feature_1_title: "Birga ishlang",
        clan_feature_1_desc: "Har 100 tanga klaningizga 10 ball qo'shadi.",
        clan_feature_2_title: "Reytingda ko'tariling",
        clan_feature_2_desc: "Boshqa klanlar bilan reytingda bellashing.",
        clan_feature_3_title: "Chat va reja",
        clan_feature_3_desc: "A'zolar bilan gaplashing va reja tuzing.",
        clan_or: "YOKI",
        clan_join_hint: "Do'stdan 6 xonali klan kodini kiriting",
        clan_create_hint: "Yangi boshlang va admin bo'ling! 2000 tanga uchun o'z klaningizni oching!",
        clan_rule_coins: "100 Tanga",
        clan_rule_coins_pts: "+10 Ball",
        clan_rule_referral: "Referal",
        clan_rule_referral_pts: "+100 Ball",
        clan_rule_ad: "Reklama",
        clan_rule_ad_pts: "+50 Ball",
        top_coins: "Top tangalar",
        top_stars: "Top yulduzlar",
        task_ref_1: "Bugun 1 ta yangi referal",
        task_adsgram_title: "Hamkor kunlik vazifasi",
        task_adsgram_reward: "+1,000 Tanga"
    }
};

let langUserPicked = false; // prevents CloudStorage from overwriting a fresh UI pick

function detectUserLanguage() {
    const saved = localStorage.getItem('tappy_lang');
    if (saved && ['en', 'ru', 'uz'].includes(saved)) return saved;
    cloudGet('tappy_lang', (val) => {
        // Only apply cloud value if user hasn't explicitly chosen in this session
        if (langUserPicked) return;
        if (['en', 'ru', 'uz'].includes(val) && val !== currentLang) {
            currentLang = val;
            localStorage.setItem('tappy_lang', val);
            applyLanguage();
        }
    });
    const code = (tg.initDataUnsafe?.user?.language_code || navigator.language || 'en').toLowerCase();
    if (code.startsWith('ru')) return 'ru';
    if (code.startsWith('uz')) return 'uz';
    return 'en';
}

let currentLang = detectUserLanguage();
function t(key) {
    return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.en?.[key] || key;
}

window.selectLanguage = (code, label) => {
    langUserPicked = true;
    changeLanguage(code);
    const el = document.getElementById('selected-lang');
    if (el) el.innerText = label;
    const dd = document.getElementById('langDropdown');
    if (dd) dd.classList.remove('open');
};

window.changeLanguage = (lang) => {
    if (!['en', 'ru', 'uz'].includes(lang)) return;
    langUserPicked = true;
    currentLang = lang;
    localStorage.setItem('tappy_lang', lang);
    cloudSet('tappy_lang', lang);
    applyLanguage();
    safeHaptic('selection');
};
window.toggleLangMenu = (e) => {
    e.stopPropagation();
    document.getElementById('langDropdown')?.classList.toggle('open');
};
document.addEventListener('click', () => {
    document.getElementById('langDropdown')?.classList.remove('open');
});

function applyLanguage() {
    document.documentElement.lang = currentLang || 'en';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (!key) return;
        const val = t(key);
        // Prefer textContent so we don't fight nested markup; keep icons intact
        if (el.children.length === 0) {
            el.textContent = val;
        } else {
            // Replace only pure-text child nodes, leave SVGs etc.
            let replaced = false;
            el.childNodes.forEach(n => {
                if (n.nodeType === Node.TEXT_NODE && n.textContent.trim()) {
                    n.textContent = val;
                    replaced = true;
                }
            });
            if (!replaced) el.textContent = val;
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (key) el.placeholder = t(key);
    });
    const labels = { en: 'English', ru: 'Русский', uz: "O'zbekcha" };
    const sel = document.getElementById('selected-lang');
    if (sel) sel.innerText = labels[currentLang] || 'English';

    // Re-render dynamic surfaces that inject translated strings via JS
    try { updateLeagueCards(); } catch (e) {}
    try { renderLeagueRewards(); } catch (e) {}
    try { updateDailyTasksUI(); } catch (e) {}
    try { updateReferralUI(); } catch (e) {}
    try { updateNftCompUI(); } catch (e) {}
    try { updateBearGiftButton(); } catch (e) {}
    try { updateAllAdButtons(); } catch (e) {}
    try { updateActiveBoosts(); } catch (e) {}
    try { updateAccountStats(); } catch (e) {}
    const lbPanel = document.getElementById('account-leaderboard');
    if (lbPanel && lbPanel.classList.contains('active')) {
        try { loadAccountLeaderboard(typeof currentLeaderboardMetric !== 'undefined' ? currentLeaderboardMetric : 'coins'); } catch (e) {}
    }
    // Clan dynamic bits
    try {
        if (currentClanData) {
            if (document.getElementById('clan-panel-members')?.classList.contains('active')) renderClanMembers();
            if (document.getElementById('clan-panel-settings')?.classList.contains('active')) renderClanSettings();
        }
    } catch (e) {}
}
window.applyLanguage = applyLanguage;

function safeHaptic(type, style) {
    if (tg.isVersionAtLeast && tg.isVersionAtLeast('6.1') && tg.HapticFeedback) {
        try {
            if (type === 'impact') tg.HapticFeedback.impactOccurred(style || 'light');
            else if (type === 'selection') tg.HapticFeedback.selectionChanged();
            else if (type === 'notification') tg.HapticFeedback.notificationOccurred(style || 'success');
        } catch (e) {}
    }
}

async function updateAutomaticClanPoints() {
    if (!userData || !userData.clanId) return;
    
    const coins = userData.coins || 0;
    const adsWatched = userData.totalAdsWatched || userData.adsToday || 0;
    const referrals = userData.referralCount || 0;
    
    // Automatic weighted point formula (Coins + Ads + Referrals)
    const calculatedPoints = Math.floor(coins + (adsWatched * 50) + (referrals * 100));

    try {
        const clanRef = doc(db, 'clans', userData.clanId);
        await updateDoc(clanRef, {
            [`memberPoints.${user.id}`]: calculatedPoints
        });
        
        // Recalculate total clan points from all members if needed, or update user contribution
    } catch (e) {
        console.warn('Error updating automatic clan points:', e);
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

const LB_COIN_ICON = `<svg class="lb-icon coin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>`;
const LB_STAR_ICON = `<svg class="lb-icon star-icon" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;

// ========== LEAGUES ==========
const LEAGUES = [
    { id: 'bear', name: 'Bear', min: 0, max: 999, image: 'images/bear.webp', reward: 500, descKey: 'league_bear_desc', color: '#4A90E2', light: '#E3F0FB' },
    { id: 'giftbox', name: 'Gift Box', min: 1000, max: 9999, image: 'images/box.webp', reward: 2500, descKey: 'league_giftbox_desc', color: '#2ECC71', light: '#E6F9EE' },
    { id: 'bouquet', name: 'Bouquet', min: 10000, max: 99999, image: 'images/bouquette.webp', reward: 10000, descKey: 'league_bouquet_desc', color: '#E91E63', light: '#FCE4EC' },
    { id: 'diamond', name: 'Diamond', min: 100000, max: 499999, image: 'images/diamond.webp', reward: 40000, descKey: 'league_diamond_desc', color: '#9B59B6', light: '#F3E5F5' },
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
        const card = document.getElementById(`league-card-${suffix}`);
        if (img) img.src = L.image;
        if (name) name.innerText = L.name;
        if (card) {
            card.style.background = L.color;
            card.style.borderColor = '';
            card.style.boxShadow = '';
            const label = card.querySelector('.league-card-label');
            const chev = card.querySelector('.league-chevron');
            if (label) label.style.color = 'rgba(255,255,255,0.85)';
            if (name) name.style.color = '#FFFFFF';
            if (chev) chev.style.color = '#FFFFFF';
        }
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
    const content = document.querySelector('#league-modal .marketplace-content');
    if (img) img.src = L.image;
    if (name) name.innerText = L.name;
    if (range) range.innerText = `${L.min.toLocaleString()} – ${L.max.toLocaleString()} clicks`;
    if (desc) desc.innerText = t(L.descKey);
    if (content) content.style.background = L.light;
    const modalRoot = document.getElementById('league-modal');
    if (modalRoot) modalRoot.style.background = L.light;
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
        if (claimed[L.id]) continue;
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
    updateNotificationDots();
    showChestRewardModal('coins', L.reward);
    safeHaptic('notification', 'success');
};

// ========== DAILY TASKS (Tashkent UTC+5) ==========
function getTashkentDate() {
    const now = new Date();
    const tash = new Date(now.getTime() + (5 * 60 + now.getTimezoneOffset()) * 60000);
    return tash.toISOString().split('T')[0];
}

function ensureDailyFields() {
    if (!userData) return;
    const today = getTashkentDate();
    if (userData.dailyTasksDate !== today) {
        userData.dailyTasksDate = today;
        userData.dailyTasks = { ad1: false, ad3: 0, ad3Claimed: false, ref1Claimed: false, tap500Claimed: false, adsgramTaskDone: false, startReferralCount: userData.referralCount || 0 };
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
    if (!userData.dailyTasks) userData.dailyTasks = { ad1: false, ad3: 0, ad3Claimed: false, ref1Claimed: false, tap500Claimed: false, adsgramTaskDone: false, startReferralCount: userData.referralCount || 0 };
    if (userData.dailyTasks.adsgramTaskDone === undefined) userData.dailyTasks.adsgramTaskDone = false;
    if (userData.dailyTasks.startReferralCount === undefined) {
        userData.dailyTasks.startReferralCount = userData.referralCount || 0;
    }
}

async function doAdsgramRewardTask() {
    if (!userData) return;
    ensureDailyFields();
    if (userData.dailyTasks.adsgramTaskDone) return;

    if (!window.Adsgram) {
        safeAlert('Ads unavailable.', true);
        return;
    }

    try {
        // Initialize with your Reward block ID
        const AdController = window.Adsgram.init({ blockId: "44503", debug: false });
        const result = await AdController.show();
        
        // User watched the ad completely
        userData.dailyTasks.adsgramTaskDone = true;
        userData.coins = (userData.coins || 0) + 1000;
        
        try {
            await updateDoc(userRef, {
                coins: increment(1000),
                dailyTasks: userData.dailyTasks
            });
        } catch (e) {}
        
        updateUI();
        updateDailyTasksUI();
        safeHaptic('notification', 'success');
        safeAlert('Task completed! +1,000 Coins earned!', false);
    } catch (e) {
        console.warn('Adsgram reward task error:', e);
        safeAlert('Ad not completed.', true);
    }
}

function setTaskBtnDot(btn, show) {
    if (!btn) return;
    let dot = btn.querySelector('.task-btn-dot');
    if (show) {
        if (!dot) {
            dot = document.createElement('span');
            dot.className = 'task-btn-dot';
            btn.style.position = 'relative';
            btn.appendChild(dot);
        }
        dot.style.display = 'block';
    } else if (dot) {
        dot.style.display = 'none';
    }
}

function hasUnclaimedTaskOrReward() {
    if (!userData) return false;
    ensureDailyFields();
    const dt = userData.dailyTasks || {};
    if (!dt.ad1) return true;
    if (!dt.ad3Claimed) return true;
    if (!dt.tap500Claimed) return true;
    const clicks = userData.totalClicks || 0;
    const claimed = userData.claimedLeagues || {};
    for (const L of LEAGUES) {
        if (clicks >= L.min && !claimed[L.id]) return true;
    }
    if ((userData.pendingBearClaims || 0) > 0) return true;
    return false;
}

function updateNotificationDots() {
    const tasksDot = document.getElementById('nav-dot-tasks');
    const boxesDot = document.getElementById('nav-dot-boxes');
    if (tasksDot) {
        tasksDot.style.display = hasUnclaimedTaskOrReward() ? 'block' : 'none';
    }
    if (boxesDot) {
        boxesDot.style.display = 'block';
    }
}

function updateDailyTasksUI() {
    if (!userData) return;
    ensureDailyFields();
    const dt = userData.dailyTasks || {};

    const btn1 = document.getElementById('btn-task-ad1');
    if (btn1) {
        if (dt.ad1) {
            btn1.disabled = true;
            btn1.innerText = t('done_today');
            btn1.style.background = '#CFD8DC';
            setTaskBtnDot(btn1, false);
        } else {
            btn1.disabled = false;
            btn1.innerText = t('watch_ad');
            btn1.style.background = '#FF9800';
            btn1.style.color = '#1C1C1C';
            setTaskBtnDot(btn1, true);
        }
    }

    const todayRefs = Math.max(0, (userData.referralCount || 0) - (dt.startReferralCount || 0));
    const fillRef = document.getElementById('prog-task-ref1');
    const txtRef = document.getElementById('prog-task-ref1-txt');
    if (fillRef) fillRef.style.width = `${Math.min(100, (todayRefs / 1) * 100)}%`;
    if (txtRef) txtRef.innerText = `${Math.min(1, todayRefs)} / 1`;
    const btnRef = document.getElementById('btn-task-ref1');
    if (btnRef) {
        if (dt.ref1Claimed) {
            btnRef.disabled = true;
            btnRef.innerText = t('done_today');
            btnRef.style.background = '#CFD8DC';
            setTaskBtnDot(btnRef, false);
        } else if (todayRefs >= 1) {
            btnRef.disabled = false;
            btnRef.innerText = t('claim');
            btnRef.style.background = '#2ECC71';
            btnRef.style.color = '#fff';
            btnRef.onclick = () => claimDailyTask('ref1');
            setTaskBtnDot(btnRef, true);
        } else {
            btnRef.disabled = true;
            btnRef.innerText = t('claim');
            btnRef.style.background = '';
            setTaskBtnDot(btnRef, false);
        }
    }

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
            setTaskBtnDot(btnT, false);
        } else if (todayTaps >= 500) {
            btnT.disabled = false;
            btnT.innerText = t('claim');
            btnT.style.background = '#2ECC71';
            btnT.style.color = '#fff';
            setTaskBtnDot(btnT, true);
        } else {
            btnT.disabled = true;
            btnT.innerText = t('claim');
            btnT.style.background = '';
            setTaskBtnDot(btnT, false);
        }
    }
    updateAllAdButtons();
    updateNotificationDots();
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
        userData.coins = (userData.coins || 0) + 1500;
        try {
            await updateDoc(userRef, { coins: increment(1500), dailyTasks: dt });
        } catch (e) {}
        updateUI();
        updateDailyTasksUI();
        safeHaptic('notification', 'success');
        safeAlert('+1500 Coins!', false);
    } else if (taskId === 'tap500') {
        if (dt.tap500Claimed || (userData.todayTapCoins || 0) < 500) return;
        dt.tap500Claimed = true;
        userData.coins = (userData.coins || 0) + 700;
        try {
            await updateDoc(userRef, { coins: increment(700), dailyTasks: dt });
        } catch (e) {}
        updateUI();
        updateDailyTasksUI();
        safeHaptic('notification', 'success');
        safeAlert('+700 Coins!', false);
    } else if (taskId === 'ref1') {
        if (dt.ref1Claimed || Math.max(0, (userData.referralCount || 0) - (dt.startReferralCount || 0)) < 1) return;
        dt.ref1Claimed = true;
        userData.coins = (userData.coins || 0) + 1500;
        try {
            await updateDoc(userRef, { coins: increment(1500), dailyTasks: dt });
        } catch (e) {}
        updateUI();
        updateDailyTasksUI();
        safeHaptic('notification', 'success');
        safeAlert('+1500 Coins!', false);
    }
};

// ========== ADS DAILY LIMIT ==========
const ADS_DAILY_LIMIT = 3;

function ensureAdsFields() {
    if (!userData) return;
    const today = getTashkentDate();
    if (userData.adsDate !== today) {
        userData.adsDate = today;
        userData.adsToday = 0;
        try {
            if (userRef) {
                updateDoc(userRef, { adsDate: today, adsToday: 0 }).catch(() => {});
            }
        } catch (e) {}
    }
    if (typeof userData.adsToday !== 'number') userData.adsToday = 0;
}

function canWatchAd() {
    ensureAdsFields();
    return (userData?.adsToday || 0) < ADS_DAILY_LIMIT;
}

function msUntilTashkentMidnight() {
    const now = new Date();
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    const tashMs = utcMs + 5 * 60 * 60000;
    const tash = new Date(tashMs);
    const nextMidnight = new Date(tash);
    nextMidnight.setHours(24, 0, 0, 0);
    return Math.max(0, nextMidnight.getTime() - tashMs);
}

function formatAdsCooldown() {
    const ms = msUntilTashkentMidnight();
    const totalSec = Math.ceil(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

async function recordAdWatch() {
    if (!userData) return;
    ensureAdsFields();
    userData.adsToday = (userData.adsToday || 0) + 1;

    const updates = {
        adsToday: userData.adsToday,
        adsDate: userData.adsDate || getTashkentDate(),
        totalAdsWatched: increment(1)
    };

    try {
        await updateDoc(userRef, updates);
    } catch (e) {}

    updateAllAdButtons();
    touchActivity();
}

function updateAllAdButtons() {
    if (!userData) return;
    ensureAdsFields();
    const limited = !canWatchAd();
    const cooldownLabel = limited
        ? `${t('ads_reset_in')} ${formatAdsCooldown()}`
        : null;

    const btn1 = document.getElementById('btn-task-ad1');
    if (btn1) {
        const dt = userData.dailyTasks || {};
        if (dt.ad1) {
            btn1.disabled = true;
            btn1.innerText = t('done_today');
            btn1.style.background = '#CFD8DC';
            btn1.style.color = '#1C1C1C';
        } else if (limited) {
            btn1.disabled = true;
            btn1.innerText = cooldownLabel;
            btn1.style.background = '#CFD8DC';
            btn1.style.color = '#1C1C1C';
            btn1.onclick = null;
        } else {
            btn1.disabled = false;
            btn1.innerText = t('watch_ad');
            btn1.style.background = '#FF9800';
            btn1.style.color = '#1C1C1C';
            btn1.onclick = () => doDailyTask('ad1');
        }
    }

    const btn3 = document.getElementById('btn-task-ad3');
    if (btn3) {
        const dt = userData.dailyTasks || {};
        const ad3Count = dt.ad3 || 0;
        if (!dt.ad3Claimed && ad3Count < 3 && limited) {
            btn3.disabled = true;
            btn3.innerText = cooldownLabel;
            btn3.style.background = '#CFD8DC';
            btn3.style.color = '#1C1C1C';
            btn3.onclick = null;
        }
    }

    ['btn-boost-auto', 'btn-boost-multitap', 'btn-boost-energy'].forEach(id => {
        const btn = document.getElementById(id);
        if (!btn) return;
        if (limited) {
            btn.disabled = true;
            btn.innerText = cooldownLabel;
            btn.style.background = '#CFD8DC';
            btn.style.color = '#1C1C1C';
        } else {
            btn.disabled = false;
            btn.innerText = t('watch_ad');
            btn.style.background = '#FF9800';
            btn.style.color = '#1C1C1C';
        }
    });

    const spinBtn = document.getElementById('btn-spin-main');
    if (spinBtn && !isSpinning) {
        const remain = remainingSpinAdCooldown();
        if (limited) {
            spinBtn.disabled = true;
            spinBtn.innerText = cooldownLabel;
            spinBtn.style.background = '#CFD8DC';
            spinBtn.style.color = '#1C1C1C';
            spinBtn.onclick = null;
        }
    }
}

async function showAd() {
    if (!canWatchAd()) {
        safeAlert(`${t('ads_limit_reached')}. ${t('ads_reset_in')} ${formatAdsCooldown()}`, true);
        updateAllAdButtons();
        return false;
    }
    if (!window.Adsgram) {
        safeAlert('Ads unavailable.', true);
        return false;
    }
    try {
        const AdController = window.Adsgram.init({ blockId: '44503', debug: false });
        await AdController.show();
        await recordAdWatch();
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
        area.style.display = pending > 0 ? 'block' : 'none';
    }
    updateNotificationDots();
}

window.shareReferral = () => {
    const botUsername = 'tappystars_bot';
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
    pendingGift = { name: 'Bear Gift', cost: 0, isReferral: true };
    openGiftConfirmModal();
};

function getReferralInviteLink() {
    const botUsername = 'tappystars_bot';
    return `https://t.me/${botUsername}?start=ref_${user.id}`;
}

window.openNftCompetition = () => {
    switchTab('tasks');
    switchTasksTab('daily');
};

function updateNftCompUI() {
    const input = document.getElementById('nft-ref-link');
    if (input) input.value = getReferralInviteLink();
}

async function processReferralOnStart() {
    try {
        const startParam = tg.initDataUnsafe?.start_param || '';
        if (!startParam.startsWith('ref_')) return;
        const referrerId = startParam.replace('ref_', '');
        if (!referrerId || referrerId === user.id.toString()) return;
        if (userData?.referredBy || userData?.referralCredited) return;

        await updateDoc(userRef, { referredBy: referrerId });
        userData.referredBy = referrerId;
    } catch (e) {
        console.warn('Referral setup error', e);
    }
}

// ========== STATE & FIREBASE LISTENERS ==========
const userRef = doc(db, 'users', user.id.toString());
let userData = null;
let isAppInitialized = false;
let unsyncedCoins = 0;
let unsyncedClanCoinPts = 0; // 100 coins → 10 pts
let syncTimer = null;
let isSyncing = false;
let lastTouchActivityMs = 0;

const getTodayDate = () => new Date().toISOString().split('T')[0];

async function touchActivity() {
    if (!userData || !userRef) return;
    const now = Date.now();
    if (now - lastTouchActivityMs < 2 * 60 * 1000 && userData.lastActiveAt) return;
    lastTouchActivityMs = now;

    const today = getTashkentDate();
    const monthKey = today.slice(0, 7);
    const updates = { lastActiveAt: now };

    if (userData.dauDate !== today) {
        updates.dauDate = today;
        userData.dauDate = today;
        try {
            const dauRef = doc(db, 'analytics', `dau_${today}`);
            await setDoc(dauRef, { count: increment(1), date: today, updatedAt: now }, { merge: true });
        } catch (e) {}
    }

    if (userData.mauMonth !== monthKey) {
        updates.mauMonth = monthKey;
        userData.mauMonth = monthKey;
        try {
            const mauRef = doc(db, 'analytics', `mau_${monthKey}`);
            await setDoc(mauRef, { count: increment(1), month: monthKey, updatedAt: now }, { merge: true });
        } catch (e) {}
    }

    updates.isDau = true;
    updates.isMau = true;
    userData.lastActiveAt = now;
    userData.isDau = true;
    userData.isMau = true;

    try {
        await updateDoc(userRef, updates);
    } catch (e) {
        try { await setDoc(userRef, updates, { merge: true }); } catch (e2) {}
    }
}

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
            lastEnergyUpdate: Date.now(),
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
            onboardingDone: false,
            adsToday: 0,
            adsDate: getTashkentDate(),
            totalAdsWatched: 0,
            lastActiveAt: Date.now(),
            currentAvatar: 'av_1',
            currentFrame: 'fr_1',
            unlockedAvatars: ['av_1'],
            unlockedFrames: ['fr_1'],
        };
        await setDoc(userRef, userData);
    }

    if (typeof userData.totalClicks !== 'number') userData.totalClicks = 0;
    if (typeof userData.coins !== 'number') userData.coins = 0;
    if (typeof userData.stars !== 'number') userData.stars = 0;
    if (typeof userData.energy !== 'number') userData.energy = 1000;
    if (!userData.claimedLeagues) userData.claimedLeagues = {};
    if (!userData.boosts) userData.boosts = {};
    if (!userData.chestProgress) userData.chestProgress = { medium: 0, mega: 0, news: 0 };
    if (typeof userData.adsToday !== 'number') userData.adsToday = 0;
    if (!userData.adsDate) userData.adsDate = getTashkentDate();
    if (!userData.lastEnergyUpdate) userData.lastEnergyUpdate = Date.now();

    applyOfflineEnergyRegen();
    ensureDailyFields();
    ensureAdsFields();

    if (!isAppInitialized) {
        isAppInitialized = true;
        initApp();
        processReferralOnStart();
        touchActivity();
    }
    updateUI();
});

function initApp() {
    document.getElementById('top-bar').style.display = 'flex';
    document.getElementById('app-content').style.display = 'block';
    document.getElementById('bottom-nav').style.display = 'flex';
    updateNftStickyVisibility('earn');

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
    updateNftCompUI();
    updateBoostUI();
    updateChestUI();
    updateSpinUI();
    updateAllAdButtons();
    updateNotificationDots();
    loadLeaderboardPreview();
    loadPurchases();
    startAutoTapLoop();

    window.__tappyAppReady = true;
    if (typeof window.__tappyHideLoader === 'function') window.__tappyHideLoader();
}

function updateNftStickyVisibility(tab) {
    const nftSticky = document.getElementById('nft-comp-sticky');
    if (!nftSticky) return;
    nftSticky.style.display = (tab === 'earn') ? 'flex' : 'none';
}

// ========== DYNAMIC TABS & POPUP SUB-NAVBAR SYSTEM ==========
window.switchTab = (tab) => {
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.remove('active', 'tab-enter');
    });
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    
    const section = document.getElementById(tab);
    if (section) {
        section.classList.add('active');
        // Smooth enter animation without lag (CSS only)
        requestAnimationFrame(() => {
            section.classList.add('tab-enter');
        });
    }
    const nav = document.querySelector(`.nav-item[data-tab="${tab}"]`);
    if (nav) nav.classList.add('active');

    const mainNav = document.getElementById('bottom-nav');
    const clanSubNav = document.getElementById('popup-subnav-clan');
    const accountSubNav = document.getElementById('popup-subnav-account');

    // Handle pitch-black popup subnav transitions
    if (tab === 'clan') {
        if (accountSubNav) accountSubNav.classList.remove('active');
        // Paint shell first — decides whether main nav or clan subnav shows
        paintClanShell();
        initClanView();
    } else if (tab === 'account') {
        if (mainNav) mainNav.classList.add('nav-hidden');
        if (clanSubNav) clanSubNav.classList.remove('active');
        requestAnimationFrame(() => {
            if (accountSubNav) accountSubNav.classList.add('active');
        });
        updateAccountStats();
        loadPurchases();
    } else {
        if (mainNav) mainNav.classList.remove('nav-hidden');
        if (clanSubNav) clanSubNav.classList.remove('active');
        if (accountSubNav) accountSubNav.classList.remove('active');
    }

    safeHaptic('selection');
    touchActivity();
    updateNftStickyVisibility(tab);

    if (tab === 'tasks') {
        updateDailyTasksUI();
        renderLeagueRewards();
        updateReferralUI();
    }
    if (tab === 'boosts') updateAllAdButtons();
};

window.exitSubSectionToEarn = () => {
    switchTab('earn');
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
    document.querySelectorAll('#popup-subnav-account .subnav-item').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.account-panel').forEach(p => { p.classList.remove('active'); p.style.display = 'none'; });
    const btn = document.querySelector(`#popup-subnav-account .subnav-item[data-tab="${sub}"]`);
    if (btn) btn.classList.add('active');
    const panel = document.getElementById(`account-${sub}`);
    if (panel) { panel.classList.add('active'); panel.style.display = 'block'; }
    
    if (sub === 'general') updateAccountStats();
    if (sub === 'leaderboard') loadAccountLeaderboard('coins'); // default to coins
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
    set('stat-refs', formatCompact(userData.referralCount || 0));
    set('stat-tgid', user.id.toString());
    set('stat-league', getLeagueForClicks(userData.totalClicks || 0).name);
}

// ========== MINING ==========
const ENERGY_MAX = 1000;
const ENERGY_COST = 3;
const ENERGY_REGEN = 2;
const ENERGY_REGEN_MS = 5000;
const ENERGY_REGEN_OFFLINE = 1;

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

function applyOfflineEnergyRegen() {
    if (!userData) return;
    ensureEnergy();
    const now = Date.now();
    const last = userData.lastEnergyUpdate || now;
    if (last >= now) {
        userData.lastEnergyUpdate = now;
        return;
    }
    const elapsed = now - last;
    const ticks = Math.floor(elapsed / ENERGY_REGEN_MS);
    if (ticks > 0 && userData.energy < ENERGY_MAX) {
        userData.energy = Math.min(ENERGY_MAX, (userData.energy || 0) + ticks * ENERGY_REGEN_OFFLINE);
    }
    userData.lastEnergyUpdate = now;
}

function persistEnergyUpdate() {
    if (!userData || !userRef) return;
    userData.lastEnergyUpdate = Date.now();
    updateDoc(userRef, {
        energy: userData.energy,
        lastEnergyUpdate: userData.lastEnergyUpdate
    }).catch(() => {});
}

function spawnFloatText(btn, amount) {
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const el = document.createElement('div');
    el.className = 'float-tap-text';
    el.textContent = `+${amount}`;
    const offsetX = (Math.random() - 0.5) * 60;
    el.style.left = `${rect.left + rect.width / 2 + offsetX}px`;
    el.style.top = `${rect.top + rect.height / 2 - 10}px`;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('float-tap-go'));
    setTimeout(() => el.remove(), 900);
}

function setupMining() {
    const btn = document.getElementById('mine-btn');
    if (!btn) return;
    btn.onclick = (e) => {
        if (!userData) return;
        applyOfflineEnergyRegen();
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
        userData.lastEnergyUpdate = Date.now();
        unsyncedCoins += rate;
        // Clan points: every 100 coins → 10 points (pro-rata per rate)
        if (userData.clanId) {
            unsyncedClanCoinPts += rate;
        }
        spawnFloatText(btn, rate);
        updateUI();
        updateLeagueCards();
        safeHaptic('impact', 'light');
        scheduleSync();
        touchActivity();
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
                todayTapCoins: userData.todayTapCoins || 0,
                lastEnergyUpdate: userData.lastEnergyUpdate || Date.now()
            };
            if (toSync > 0) payload.coins = increment(toSync);
            await updateDoc(userRef, payload);
            // Flush clan points: floor(coins/100)*10
            const ptsCoins = unsyncedClanCoinPts;
            unsyncedClanCoinPts = 0;
            const pts = Math.floor(ptsCoins / 100) * 10;
            const remainder = ptsCoins % 100;
            if (pts > 0) {
                try { await addClanPoints(pts); unsyncedClanCoinPts += remainder; }
                catch (_) { unsyncedClanCoinPts += ptsCoins; }
            } else {
                unsyncedClanCoinPts += remainder;
            }
        } catch (e) {
            if (toSync > 0) unsyncedCoins += toSync;
        }
        isSyncing = false;
    }, 800);
}

function updateUI() {
    if (!userData) return;
    ensureEnergy();
    updateProfileDisplay();
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

setInterval(() => {
    if (!userData || !isAppInitialized) return;
    ensureEnergy();
    if (userData.energy < ENERGY_MAX) {
        userData.energy = Math.min(ENERGY_MAX, (userData.energy || 0) + ENERGY_REGEN);
        userData.lastEnergyUpdate = Date.now();
        const energyEl = document.getElementById('energy-val');
        if (energyEl) energyEl.innerText = Math.floor(userData.energy);
    } else {
        userData.lastEnergyUpdate = Date.now();
    }
}, ENERGY_REGEN_MS);

setInterval(() => {
    if (!userData || !isAppInitialized) return;
    persistEnergyUpdate();
}, 30000);

// ========== BOOSTERS ==========
const BOOST_DURATION = 30 * 60 * 1000;
const BOOST_COOLDOWN = 15 * 60 * 1000;

function updateBoostUI() {}

function updateActiveBoosts() {
    const list = document.getElementById('active-boosts-list');
    if (!list || !userData) return;
    const now = Date.now();
    const boosts = userData.boosts || {};
    const active = [];
    if (boosts.auto && boosts.auto > now) active.push(`Auto Tap (${Math.ceil((boosts.auto - now) / 60000)}m)`);
    if (boosts.multitap && boosts.multitap > now) active.push(`Multi-Tap (${Math.ceil((boosts.multitap - now) / 60000)}m)`);
    if (active.length) {
        list.innerHTML = active.map(a => `<div style="font-weight:700;padding:6px 0;border-bottom:1px dashed #ddd;">${a}</div>`).join('');
    } else {
        list.innerHTML = `
            <button type="button" class="action-btn primary-btn buy-boosters-btn" onclick="switchTab('boosts')">
                <svg class="buy-boosters-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span data-i18n="buy_boosters">${t('buy_boosters')}</span>
            </button>`;
    }
}

window.buyEnergyRestoreAd = async () => {
    if (!userData) return;
    const ok = await showAd();
    if (!ok) return;
    ensureEnergy();
    userData.energy = ENERGY_MAX;
    userData.lastEnergyUpdate = Date.now();
    try {
        await updateDoc(userRef, { energy: ENERGY_MAX, lastEnergyUpdate: userData.lastEnergyUpdate });
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
            userData.lastEnergyUpdate = Date.now();
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

// ========== SPIN ==========
const ICON_COIN = `<svg class="spin-card-icon-img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M8.5 10.5h7M8.5 13.5h7"/></svg>`;
const ICON_STAR = `<svg class="spin-card-icon-img" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

const SPIN_POOL = [
    { type: 'coins', amount: 150, label: '+150', weight: 30, cls: '' },
    { type: 'coins', amount: 200, label: '+200', weight: 25, cls: '' },
    { type: 'coins', amount: 250, label: '+250', weight: 20, cls: '' },
    { type: 'coins', amount: 300, label: '+300', weight: 15, cls: '' },
    { type: 'coins', amount: 400, label: '+400', weight: 10, cls: '' },
    { type: 'stars', amount: 1,  label: '1', weight: 0.4, cls: 'star' },
    { type: 'stars', amount: 3,  label: '3', weight: 0.12, cls: 'star' },
    { type: 'stars', amount: 5,  label: '5', weight: 0.05, cls: 'star' }
];

const SPIN_COOLDOWN_SHORT = 2 * 60 * 1000;
const SPIN_COOLDOWN_LONG  = 10 * 60 * 1000;
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
    ensureAdsFields();
    if (!canWatchAd()) {
        btn.disabled = true;
        btn.innerText = `${t('ads_reset_in')} ${formatAdsCooldown()}`;
        btn.style.background = '#CFD8DC';
        btn.style.color = '#1C1C1C';
        btn.onclick = null;
        return;
    }
    const remain = remainingSpinAdCooldown();
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
    if (userData && !isSpinning) {
        updateSpinUI();
        if (!canWatchAd()) updateAllAdButtons();
    }
}, 1000);

window.startSpinFlow = async () => {
    if (!userData || isSpinning) return;
    ensureSpinFields();
    const remain = remainingSpinAdCooldown();
    if (remain > 0 && (userData.lastSpinAdTime || 0) > 0) {
        updateSpinUI();
        return;
    }

    const btn = document.getElementById('btn-spin-main');
    if (btn) { btn.disabled = true; btn.innerText = 'Loading ad...'; }

    const ok = await showAd();
    if (!ok) {
        updateSpinUI();
        return;
    }

    if (userData.referredBy && !userData.referralCredited) {
        try {
            const refRef = doc(db, 'users', userData.referredBy);
            const refSnap = await getDoc(refRef);

            if (refSnap.exists()) {
                const refData = refSnap.data();
                const currentCount = refData.referralCount || 0;
                const newCount = currentCount + 1;
                const earned = Math.floor(newCount / 10) - Math.floor(currentCount / 10);

                await updateDoc(refRef, {
                    referralCount: increment(1),
                    pendingBearClaims: increment(earned)
                });

                userData.referralCredited = true;
                await updateDoc(userRef, { referralCredited: true });
            }
        } catch (e) {
            console.warn('Referrer credit error on spin:', e);
        }
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
    await new Promise(r => setTimeout(r, 280));

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
        showChestRewardModal(prize.type, prize.amount);
        safeHaptic('notification', 'success');
        isSpinning = false;
        updateSpinUI();
        setTimeout(() => closeSpinReel(), 2200);
    }, 3800);
}

// ========== AVATAR & FRAME SHOP ==========
const AVATARS = [
    { id: 'av_1', name: 'Black', image: 'images/avatars/black.webp', cost: 0, currency: 'free' },
    { id: 'av_2', name: 'Red', image: 'images/avatars/red.webp', cost: 100, currency: 'coins' },
    { id: 'av_3', name: 'Golden', image: 'images/avatars/golden.webp', cost: 500, currency: 'coins' },
    { id: 'av_4', name: 'Farmer', image: 'images/avatars/farm.webp', cost: 1000, currency: 'coins' },
    { id: 'av_5', name: 'Map Guy', image: 'images/avatars/map.webp', cost: 5000, currency: 'coins' },
    { id: 'av_6', name: 'Cosmic', image: 'images/avatars/cosmos.webp', cost: 10, currency: 'stars' }
];

const FRAMES = [
    { id: 'fr_1', name: 'Default', cssClass: '', cost: 0, currency: 'free' },
    { id: 'fr_2', name: 'Glassy Black', cssClass: 'frame-glass-black', cost: 500, currency: 'coins' },
    { id: 'fr_3', name: 'Glassy Red', cssClass: 'frame-glass-red', cost: 1000, currency: 'coins' },
    { id: 'fr_4', name: 'Glassy Gold', cssClass: 'frame-glass-gold', cost: 5000, currency: 'coins' },
    { id: 'fr_5', name: 'Royal Wood', cssClass: 'frame-wood', cost: 10, currency: 'stars' },
    { id: 'fr_6', name: 'Dark Chaos', cssClass: 'frame-chaos', cost: 30, currency: 'stars' }
];

let currentShopTab = 'avatars';

window.openAvatarShop = () => {
    const modal = document.getElementById('avatar-shop-modal');
    if (modal) modal.style.display = 'flex';
    renderAvatarShop();
    safeHaptic('selection');
};

window.closeAvatarShop = () => {
    const modal = document.getElementById('avatar-shop-modal');
    if (modal) modal.style.display = 'none';
};

window.switchAvatarShopTab = (tab) => {
    currentShopTab = tab;
    document.querySelectorAll('#avatar-shop-tabs .sub-tab-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-shop') === tab);
    });
    renderAvatarShop();
    safeHaptic('selection');
};

function renderAvatarShop() {
    const grid = document.getElementById('avatar-shop-grid');
    if (!grid || !userData) return;

    let html = '';
    if (currentShopTab === 'avatars') {
        AVATARS.forEach(av => {
            const unlocked = (userData.unlockedAvatars || ['av_1']).includes(av.id);
            const equipped = userData.currentAvatar === av.id;
            let btnText = 'Equip';
            let btnClass = 'action-btn primary-btn';
            let disabled = false;

            if (equipped) {
                btnText = 'Equipped';
                btnClass = 'action-btn';
                disabled = true;
            } else if (!unlocked) {
                btnText = av.currency === 'stars' ? `${av.cost} ⭐` : `${formatCompact(av.cost)} 🪙`;
                btnClass = 'action-btn';
            }

            html += `
            <div class="avatar-shop-card ${equipped ? 'equipped' : ''}">
                <div class="avatar-shop-preview">
                    <img src="${av.image}" alt="${av.name}">
                </div>
                <strong style="font-size:0.9em;">${av.name}</strong>
                <button type="button" class="${btnClass}" ${disabled ? 'disabled' : ''} style="width:100%;padding:8px;font-size:0.85em;" onclick="buyOrEquipAvatar('${av.id}')">${btnText}</button>
            </div>`;
        });
    } else {
        FRAMES.forEach(fr => {
            const unlocked = (userData.unlockedFrames || ['fr_1']).includes(fr.id);
            const equipped = userData.currentFrame === fr.id;
            let btnText = 'Equip';
            let btnClass = 'action-btn primary-btn';
            let disabled = false;

            if (equipped) {
                btnText = 'Equipped';
                btnClass = 'action-btn';
                disabled = true;
            } else if (!unlocked) {
                btnText = fr.currency === 'stars' ? `${fr.cost} ⭐` : `${formatCompact(fr.cost)} 🪙`;
                btnClass = 'action-btn';
            }

            html += `
            <div class="avatar-shop-card ${equipped ? 'equipped' : ''}">
                <div class="avatar-shop-preview ${fr.cssClass}">
                    <img src="images/avatars/default.webp" alt="Frame Preview">
                </div>
                <strong style="font-size:0.9em;">${fr.name}</strong>
                <button type="button" class="${btnClass}" ${disabled ? 'disabled' : ''} style="width:100%;padding:8px;font-size:0.85em;" onclick="buyOrEquipFrame('${fr.id}')">${btnText}</button>
            </div>`;
        });
    }
    grid.innerHTML = html;
}

window.buyOrEquipAvatar = async (id) => {
    if (!userData) return;
    const av = AVATARS.find(x => x.id === id);
    if (!av) return;

    let unlocked = userData.unlockedAvatars || ['av_1'];
    if (!unlocked.includes(id)) {
        if (av.currency === 'stars') {
            if ((userData.stars || 0) < av.cost) {
                safeAlert('Not enough Stars.', true);
                return;
            }
            userData.stars -= av.cost;
        } else {
            if ((userData.coins || 0) < av.cost) {
                safeAlert('Not enough Coins.', true);
                return;
            }
            userData.coins -= av.cost;
        }
        unlocked.push(id);
        userData.unlockedAvatars = unlocked;
    }

    userData.currentAvatar = id;
    try {
        const payload = {
            currentAvatar: id,
            unlockedAvatars: unlocked
        };
        if (av.cost > 0) {
            if (av.currency === 'stars') payload.stars = increment(-av.cost);
            else payload.coins = increment(-av.cost);
        }
        await updateDoc(userRef, payload);
    } catch (e) {
        console.warn('Avatar equip error', e);
    }

    updateUI();
    renderAvatarShop();
    safeHaptic('notification', 'success');
};

window.buyOrEquipFrame = async (id) => {
    if (!userData) return;
    const fr = FRAMES.find(x => x.id === id);
    if (!fr) return;

    let unlocked = userData.unlockedFrames || ['fr_1'];
    if (!unlocked.includes(id)) {
        if (fr.currency === 'stars') {
            if ((userData.stars || 0) < fr.cost) {
                safeAlert('Not enough Stars.', true);
                return;
            }
            userData.stars -= fr.cost;
        } else {
            if ((userData.coins || 0) < fr.cost) {
                safeAlert('Not enough Coins.', true);
                return;
            }
            userData.coins -= fr.cost;
        }
        unlocked.push(id);
        userData.unlockedFrames = unlocked;
    }

    userData.currentFrame = id;
    try {
        const payload = {
            currentFrame: id,
            unlockedFrames: unlocked
        };
        if (fr.cost > 0) {
            if (fr.currency === 'stars') payload.stars = increment(-fr.cost);
            else payload.coins = increment(-fr.cost);
        }
        await updateDoc(userRef, payload);
    } catch (e) {
        console.warn('Frame equip error', e);
    }

    updateUI();
    renderAvatarShop();
    safeHaptic('notification', 'success');
};

function updateProfileDisplay() {
    if (!userData) return;
    const wrapper = document.getElementById('profile-avatar-wrapper');
    const img = document.getElementById('user-profile-avatar-img');

    const av = AVATARS.find(x => x.id === (userData.currentAvatar || 'av_1')) || AVATARS[0];
    const fr = FRAMES.find(x => x.id === (userData.currentFrame || 'fr_1')) || FRAMES[0];

    if (img) img.src = av.image;
    if (wrapper) {
        wrapper.className = `profile-avatar-wrapper ${fr.cssClass}`;
    }
}

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
    let username = (input?.value || '').trim();
    if (username.startsWith('@')) username = username.slice(1);
    if (!username || username.length < 2 || username.length > 64) {
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

    const createdAt = new Date().toISOString();
    const orderPayload = {
        userId: user.id.toString(),
        telegramId: user.id.toString(),
        name: (user.first_name || 'Miner').toString().slice(0, 64),
        gift: pendingGift.name,
        giftName: pendingGift.name,
        cost: Number(cost) || 0,
        starCost: Number(cost) || 0,
        username: username,
        status: 'pending',
        state: 'Pending',
        createdAt,
        timestamp: createdAt
    };

    try {
        const updates = {
            freeBearGift: !!userData.freeBearGift,
            pendingBearClaims: userData.pendingBearClaims || 0
        };
        if (cost > 0) updates.stars = increment(-cost);
        await updateDoc(userRef, updates);
        await addDoc(collection(db, 'purchases'), orderPayload);
    } catch (e) {
        console.warn('Gift order failed', e);
        if (cost > 0) userData.stars = (userData.stars || 0) + cost;
        safeAlert('Order failed. Please try again.', true);
        return;
    }

    updateUI();
    updateBearGiftButton();
    updateReferralUI();
    loadPurchases();
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
    
    // Clamp at 0 minimum
    userData.coins = Math.max(0, (userData.coins || 0) - spent);
    userData.stars = (userData.stars || 0) + stars;
    
    try {
        await updateDoc(userRef, {
            coins: Math.max(0, (userData.coins || 0)), // Ensure Firestore also receives non-negative value
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
    list.innerHTML = `
        <div class="skeleton-card" style="height: 44px; margin-bottom: 8px;"></div>
        <div class="skeleton-card" style="height: 44px; margin-bottom: 8px;"></div>
    `;
    try {
        const q = query(collection(db, 'users'), orderBy('coins', 'desc'), limit(5));
        const snap = await getDocs(q);
        let html = '';
        let rank = 1;
        snap.forEach(d => {
            const data = d.data();
            html += `<div style="display:flex;justify-content:space-between;font-weight:700;padding:6px 0;border-bottom:1px dashed #ddd;">
                <span>#${rank} ${data.name || 'Miner'}</span>
                <span class="lb-val">${formatCompact(data.coins || 0)}${LB_COIN_ICON}</span>
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
    if (list) {
        list.innerHTML = `
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>
        `;
    }
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
            html += `<div class="glass-card lb-row" style="padding:12px 14px;${isMe ? 'background:#FFD700;' : ''}">
                <span style="font-weight:900;">#${rank} ${data.name || 'Miner'}</span>
                <span style="font-weight:800;" class="lb-val">${formatCompact(data.coins || 0)}${LB_COIN_ICON}</span>
            </div>`;
            rank++;
        });
        list.innerHTML = html;
        if (sticky) sticky.innerHTML = `<strong>You · Rank #${myRank}</strong> · <span class="lb-val">${formatCompact(userData?.coins || 0)}${LB_COIN_ICON}</span>`;
    } catch (e) {
        if (list) list.innerHTML = 'Error loading.';
    }
};
window.closeLeaderboard = () => {
    document.getElementById('leaderboard-modal').style.display = 'none';
};

async function loadPurchases() {
    const list = document.getElementById('purchases-list');
    if (!list) return;
    list.innerHTML = `
        <div class="skeleton-card"></div>
        <div class="skeleton-card"></div>
    `;
    try {
        const q = query(
            collection(db, 'purchases'),
            where('userId', '==', user.id.toString()),
            orderBy('createdAt', 'desc'),
            limit(50)
        );
        const snap = await getDocs(q);
        if (snap.empty) {
            list.innerHTML = `
                <div style="text-align: center; padding: 20px 0;">
                    <p class="empty-state" style="margin-bottom: 12px;">${t('no_purchases')}</p>
                    <button type="button" class="action-btn primary-btn buy-boosters-btn" onclick="switchAccountTab('gifts')">
                        <svg class="buy-boosters-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        <span data-i18n="buy_gifts">${t('buy_gifts')}</span>
                    </button>
                </div>
            `;
            return;
        }
        const rows = [];
        snap.forEach(d => {
            const p = d.data();
            const status = (p.status || p.state || 'pending').toString().toLowerCase();
            const statusLabel = t(`status_${status}`) || status;
            const giftName = p.gift || p.giftName || p.name || 'Gift';
            const cost = p.cost ?? p.starCost ?? 0;
            const uname = p.username || '';
            rows.push(`<div class="glass-card purchase-item">
                <div>
                    <strong>${giftName}</strong>
                    <div style="font-size:0.8em;color:var(--text-muted);">${uname ? '@' + uname : ''} · ${cost}⭐</div>
                </div>
                <span class="status-badge status-${status}">${statusLabel}</span>
            </div>`);
        });
        list.innerHTML = rows.join('');
    } catch (e) {
        console.warn('loadPurchases', e);
        list.innerHTML = `<p class="empty-state">${t('no_purchases')}</p>`;
    }
}

// ========== ERROR & OFFLINE OVERLAY HANDLER ==========
const WIFI_OFF_ICON = `
<svg class="error-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="1" y1="1" x2="23" y2="23"></line>
    <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
    <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
    <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
    <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
    <line x1="12" y1="20" x2="12.01" y2="20"></line>
</svg>`;

const ALERT_TRIANGLE_ICON = `
<svg class="error-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg>`;

let currentErrorType = null;

window.showErrorWindow = (type = 'network') => {
    currentErrorType = type;
    const overlay = document.getElementById('error-overlay');
    const iconWrapper = document.getElementById('error-icon-wrapper');
    const titleEl = document.getElementById('error-title');
    if (!overlay) return;

    if (type === 'network') {
        if (iconWrapper) iconWrapper.innerHTML = WIFI_OFF_ICON;
        if (titleEl) titleEl.innerText = t('no_internet');
    } else {
        if (iconWrapper) iconWrapper.innerHTML = ALERT_TRIANGLE_ICON;
        if (titleEl) titleEl.innerText = t('something_went_wrong');
    }
    
    applyLanguage();
    overlay.style.display = 'flex';
};

window.hideErrorWindow = () => {
    currentErrorType = null;
    const overlay = document.getElementById('error-overlay');
    if (overlay) overlay.style.display = 'none';
};

window.retryConnection = () => {
    safeHaptic('selection');
    if (navigator.onLine) {
        hideErrorWindow();
        if (userRef && userData) {
            touchActivity();
            updateUI();
        } else {
            window.location.reload();
        }
    } else {
        showErrorWindow('network');
        safeAlert(t('no_internet'), true);
    }
};

window.addEventListener('offline', () => showErrorWindow('network'));
window.addEventListener('online', () => hideErrorWindow());
if (!navigator.onLine) showErrorWindow('network');

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

// ========== CLAN STATE & LOGIC ==========
let currentClanData = null;
let currentClanId = null;
let clanChatUnsub = null;
let foundClanToJoin = null;
let lastClanChatTime = 0;

async function addClanPoints(points) {
    if (!userData || !userData.clanId) return;
    try {
        const clanRef = doc(db, 'clans', userData.clanId);
        await updateDoc(clanRef, { points: increment(points) });
    } catch (e) {
        console.warn('Failed to add clan points:', e);
    }
}

window.switchClanTab = (tab) => {
    document.querySelectorAll('#popup-subnav-clan .subnav-item').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.clan-panel').forEach(p => { p.classList.remove('active'); p.style.display = 'none'; });
    const btn = document.querySelector(`#popup-subnav-clan .subnav-item[data-clantab="${tab}"]`);
    if (btn) btn.classList.add('active');
    const panel = document.getElementById(`clan-panel-${tab}`);
    if (panel) {
        panel.classList.add('active');
        panel.style.display = (tab === 'chat') ? 'flex' : 'block';
    }
    safeHaptic('selection');

    if (tab === 'chat') listenClanChat();
    if (tab === 'battle') loadClanLeaderboard();
    if (tab === 'members') renderClanMembers();
    if (tab === 'settings') renderClanSettings();
};

function generateClanCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

window.openCreateClanModal = () => {
    if ((userData?.coins || 0) < 2000) {
        safeAlert(t('not_enough_coins'), true);
        return;
    }
    const modal = document.getElementById('clan-create-modal');
    if (modal) modal.style.display = 'flex';
};

window.closeCreateClanModal = () => {
    const modal = document.getElementById('clan-create-modal');
    if (modal) modal.style.display = 'none';
};

window.confirmCreateClan = async () => {
    if ((userData?.coins || 0) < 2000) {
        safeAlert(t('not_enough_coins'), true);
        return;
    }
    const nameInput = document.getElementById('create-clan-name');
    const descInput = document.getElementById('create-clan-desc');
    const name = (nameInput?.value || '').trim();
    const desc = (descInput?.value || '').trim();

    if (!name) {
        safeAlert('Please enter a clan name', true);
        return;
    }

    const code = generateClanCode();
    const clanId = `clan_${Date.now()}`;
    const newClan = {
        id: clanId,
        code: code,
        name: name,
        description: desc,
        adminId: user.id.toString(),
        members: [{ id: user.id.toString(), name: user.first_name || 'Miner' }],
        points: 0,
        createdAt: Date.now()
    };

    try {
        userData.coins -= 2000;
        userData.clanId = clanId;
        await updateDoc(userRef, {
            coins: increment(-2000),
            clanId: clanId
        });
        await setDoc(doc(db, 'clans', clanId), newClan);
        closeCreateClanModal();
        initClanView();
        safeAlert('Clan created successfully!', false);
        safeHaptic('notification', 'success');
    } catch (e) {
        console.warn('Clan create error:', e);
        safeAlert('Failed to create clan.', true);
    }
};

window.searchClanByCode = async () => {
    const input = document.getElementById('clan-code-input');
    const code = (input?.value || '').trim();
    if (!code) return;

    try {
        const q = query(collection(db, 'clans'), where('code', '==', code), limit(1));
        const snap = await getDocs(q);
        if (snap.empty) {
            safeAlert('Clan not found. Invalid code.', true);
            return;
        }
        snap.forEach(d => {
            foundClanToJoin = d.data();
            foundClanToJoin.docId = d.id;
        });

        document.getElementById('modal-clan-title').innerText = foundClanToJoin.name;
        document.getElementById('modal-clan-desc').innerText = foundClanToJoin.description || 'No description.';
        document.getElementById('modal-clan-count').innerText = foundClanToJoin.members?.length || 1;
        document.getElementById('clan-join-modal').style.display = 'flex';
    } catch (e) {
        safeAlert('Error finding clan.', true);
    }
};

window.closeClanJoinModal = () => {
    document.getElementById('clan-join-modal').style.display = 'none';
    foundClanToJoin = null;
};

window.confirmJoinClan = async () => {
    if (!foundClanToJoin || !userData) return;
    try {
        const clanRef = doc(db, 'clans', foundClanToJoin.docId);
        const members = foundClanToJoin.members || [];
        if (!members.some(m => m.id === user.id.toString())) {
            members.push({ id: user.id.toString(), name: user.first_name || 'Miner' });
        }
        await updateDoc(clanRef, { members: members });
        await updateDoc(userRef, { clanId: foundClanToJoin.docId });
        userData.clanId = foundClanToJoin.docId;
        closeClanJoinModal();
        initClanView();
        safeAlert('Joined clan successfully!', false);
        safeHaptic('notification', 'success');
    } catch (e) {
        safeAlert('Failed to join clan.', true);
    }
};

function paintClanShell() {
    const unjoined = document.getElementById('clan-unjoined-view');
    const joined = document.getElementById('clan-joined-view');
    const mainNav = document.getElementById('bottom-nav');
    const clanSubNav = document.getElementById('popup-subnav-clan');
    const clanSection = document.getElementById('clan');
    const onClanTab = !!(clanSection && clanSection.classList.contains('active'));
    const hasClan = !!(userData && userData.clanId);

    if (unjoined) {
        unjoined.style.display = hasClan ? 'none' : 'block';
        unjoined.style.opacity = hasClan ? '0' : '1';
    }
    if (joined) {
        if (hasClan) {
            joined.style.display = 'flex';
            joined.style.flexDirection = 'column';
            joined.style.flex = '1';
            joined.style.minHeight = '0';
            joined.style.opacity = '1';
        } else {
            joined.style.display = 'none';
            joined.style.opacity = '0';
        }
    }

    // Clan black subnav ONLY when user is in a clan AND on the clan tab.
    // Otherwise keep the normal bottom navbar (does not affect Account subnav).
    if (onClanTab) {
        if (hasClan) {
            if (mainNav) mainNav.classList.add('nav-hidden');
            if (clanSubNav) {
                requestAnimationFrame(() => clanSubNav.classList.add('active'));
            }
        } else {
            if (clanSubNav) clanSubNav.classList.remove('active');
            if (mainNav) mainNav.classList.remove('nav-hidden');
            // Keep Clan tab highlighted on main nav
            document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
            const clanNav = document.querySelector('.nav-item[data-tab="clan"]');
            if (clanNav) clanNav.classList.add('active');
        }
    }
}

async function initClanView() {
    paintClanShell();

    if (!userData?.clanId) {
        currentClanData = null;
        currentClanId = null;
        return;
    }

    try {
        const clanSnap = await getDoc(doc(db, 'clans', userData.clanId));
        if (!clanSnap.exists()) {
            userData.clanId = null;
            try { await updateDoc(userRef, { clanId: null }); } catch (_) {}
            currentClanData = null;
            currentClanId = null;
            paintClanShell();
            return;
        }

        currentClanData = clanSnap.data();
        currentClanId = clanSnap.id;
        paintClanShell();

        const nameEl = document.getElementById('clan-header-name');
        const descEl = document.getElementById('clan-header-desc');
        const codeEl = document.getElementById('clan-header-code');
        if (nameEl) nameEl.innerText = currentClanData.name;
        if (descEl) descEl.innerText = currentClanData.description || 'No description';
        if (codeEl) codeEl.innerText = currentClanData.code || '------';

        // Keep current panel if already on a clan tab; otherwise open chat
        const activePanel = document.querySelector('.clan-panel.active');
        if (!activePanel) switchClanTab('chat');
        else if (activePanel.id === 'clan-panel-chat') listenClanChat();
    } catch (e) {
        console.warn('initClanView error:', e);
        paintClanShell();
    }
}

function listenClanChat() {
    if (!currentClanId) return;
    if (clanChatUnsub) clanChatUnsub();

    const messagesEl = document.getElementById('clan-chat-messages');
    const q = query(collection(db, 'clans', currentClanId, 'messages'), orderBy('createdAt', 'asc'), limit(50));
    clanChatUnsub = onSnapshot(q, (snap) => {
        let html = '';
        snap.forEach(d => {
            const m = d.data();
            const isMe = m.senderId === user.id.toString();
            html += `<div class="clan-msg ${isMe ? 'me' : 'other'}">
                <span class="clan-msg-sender">${m.senderName}</span>
                <p class="clan-msg-text">${m.text}</p>
            </div>`;
        });
        if (messagesEl) {
            messagesEl.innerHTML = html || '<p class="empty-state">No messages yet.</p>';
            messagesEl.scrollTop = messagesEl.scrollHeight;
        }
    });
}

window.sendClanMessage = async () => {
    const input = document.getElementById('clan-chat-input');
    const text = (input?.value || '').trim();
    if (!text || !currentClanId) return;

    const now = Date.now();
    if (now - lastClanChatTime < 60000) {
        const cd = Math.ceil((60000 - (now - lastClanChatTime)) / 1000);
        safeAlert(`Cooldown: Wait ${cd}s before sending another message.`, true);
        return;
    }

    try {
        await addDoc(collection(db, 'clans', currentClanId, 'messages'), {
            senderId: user.id.toString(),
            senderName: user.first_name || 'Miner',
            text: text,
            createdAt: Date.now()
        });
        lastClanChatTime = now;
        input.value = '';
    } catch (e) {
        safeAlert('Failed to send message.', true);
    }
};

async function loadClanLeaderboard() {
    const list = document.getElementById('clan-leaderboard-list');
    if (!list) return;
    list.innerHTML = `<div class="skeleton-card"></div><div class="skeleton-card"></div>`;

    try {
        const q = query(collection(db, 'clans'), orderBy('points', 'desc'), limit(30));
        const snap = await getDocs(q);
        let html = '';
        let rank = 1;
        snap.forEach(d => {
            const data = d.data();
            const isMyClan = d.id === currentClanId;
            html += `<div class="glass-card clan-lb-row ${isMyClan ? 'my-clan' : ''}">
                <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-weight:900;">#${rank}</span>
                    <span style="font-weight:800;">${data.name}</span>
                </div>
                <span style="font-weight:900;">${formatCompact(data.points || 0)} PTS</span>
            </div>`;
            rank++;
        });
        list.innerHTML = html || '<p class="empty-state">No clans active.</p>';
    } catch (e) {
        list.innerHTML = '<p class="empty-state">Failed to load leaderboard.</p>';
    }
}

function renderClanMembers() {
    const list = document.getElementById('clan-members-list');
    if (!list || !currentClanData) return;

    const isAdmin = currentClanData.adminId === user.id.toString();
    const members = currentClanData.members || [];

    let html = '';

    members.forEach(m => {
        const isMemAdmin = m.id === currentClanData.adminId;
        html += `<div class="glass-card clan-member-row ${isMemAdmin ? 'admin-highlight' : ''}">
            <div class="clan-member-left">
                <span class="clan-member-name">${m.name}</span>
            </div>
            <div class="clan-member-right">
                ${isMemAdmin ? '<span class="admin-tag">ADMIN</span>' : ''}
                ${isAdmin && !isMemAdmin ? `<button type="button" class="action-btn clan-remove-btn" onclick="removeClanMember('${m.id}')">Remove</button>` : ''}
            </div>
        </div>`;
    });

    // Single invite button right after the users list if members < 5
    if (members.length < 5) {
        const botUsername = 'tappystars_bot';
        const inviteLink = `https://t.me/${botUsername}?start=clan_${currentClanData.code}`;
        const shareText = `${t('share_text')} Join our clan "${currentClanData.name}" using code: ${currentClanData.code}\n${inviteLink}`;
        
        html += `
        <button type="button" class="action-btn primary-btn" style="width:100%; margin-top:10px;" onclick="shareClanInvite('${inviteLink}', '${encodeURIComponent(shareText)}')">
            ${t('ref_share')} (${members.length}/5)
        </button>`;
    }
    
    list.innerHTML = html;
}

window.shareClanInvite = (link, textEncoded) => {
    const text = decodeURIComponent(textEncoded);
    if (tg.openTelegramLink) {
        tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`);
    } else if (navigator.share) {
        navigator.share({ title: 'TappyStars Clan', text, url: link }).catch(() => {});
    } else {
        navigator.clipboard?.writeText(link);
        safeAlert('Clan invite link copied!', false);
    }
};

window.removeClanMember = async (memberId) => {
    if (!currentClanData || currentClanData.adminId !== user.id.toString()) return;
    try {
        const newMembers = (currentClanData.members || []).filter(m => m.id !== memberId);
        await updateDoc(doc(db, 'clans', currentClanId), { members: newMembers });
        await updateDoc(doc(db, 'users', memberId), { clanId: null });
        currentClanData.members = newMembers;
        renderClanMembers();
        safeAlert('Member removed.', false);
    } catch (e) {
        safeAlert('Failed to remove member.', true);
    }
};

function renderClanSettings() {
    const isAdmin = currentClanData?.adminId === user.id.toString();
    const adminView = document.getElementById('clan-settings-admin-view');
    const memberView = document.getElementById('clan-settings-member-view');

    if (isAdmin) {
        if (adminView) adminView.style.display = 'flex';
        if (memberView) memberView.style.display = 'none';
        document.getElementById('clan-edit-name-input').value = currentClanData.name;
        document.getElementById('clan-edit-desc-input').value = currentClanData.description || '';
    } else {
        if (adminView) adminView.style.display = 'none';
        if (memberView) memberView.style.display = 'flex';
    }
}

window.saveClanSettings = async () => {
    if (!currentClanData || currentClanData.adminId !== user.id.toString()) return;
    const name = document.getElementById('clan-edit-name-input').value.trim();
    const desc = document.getElementById('clan-edit-desc-input').value.trim();
    if (!name) return;

    try {
        await updateDoc(doc(db, 'clans', currentClanId), {
            name: name,
            description: desc
        });
        currentClanData.name = name;
        currentClanData.description = desc;
        document.getElementById('clan-header-name').innerText = name;
        document.getElementById('clan-header-desc').innerText = desc;
        safeAlert('Settings saved!', false);
    } catch (e) {
        safeAlert('Failed to save settings.', true);
    }
};

window.leaveClan = async () => {
    if (!userData?.clanId) return;
    try {
        const newMembers = (currentClanData?.members || []).filter(m => m.id !== user.id.toString());
        await updateDoc(doc(db, 'clans', currentClanId), { members: newMembers });
        await updateDoc(userRef, { clanId: null });
        userData.clanId = null;
        if (clanChatUnsub) clanChatUnsub();
        initClanView();
        safeAlert('Left clan.', false);
    } catch (e) {
        safeAlert('Failed to leave clan.', true);
    }
};

let currentLeaderboardMetric = 'coins';

window.switchLeaderboardType = (type) => {
    if (type === currentLeaderboardMetric) return;
    currentLeaderboardMetric = type;
    document.querySelectorAll('#leaderboard-type-switcher .sub-tab-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-lbtype') === type);
    });
    loadAccountLeaderboard(type, true);
    safeHaptic('selection');
};

function rankBadge(rank) {
    if (rank === 1) return '<span class="lb-rank lb-rank-1">1</span>';
    if (rank === 2) return '<span class="lb-rank lb-rank-2">2</span>';
    if (rank === 3) return '<span class="lb-rank lb-rank-3">3</span>';
    return `<span class="lb-rank">${rank}</span>`;
}

async function loadAccountLeaderboard(metric = 'coins', animate = false) {
    const list = document.getElementById('account-full-leaderboard-list');
    const sticky = document.getElementById('account-sticky-user-card');
    if (!list) return;

    if (animate) {
        list.classList.add('lb-list-fading');
        await new Promise(r => setTimeout(r, 140));
    }

    list.innerHTML = `
        <div class="skeleton-card lb-skel"></div>
        <div class="skeleton-card lb-skel"></div>
        <div class="skeleton-card lb-skel"></div>
    `;
    list.classList.remove('lb-list-fading');
    
    try {
        const q = query(collection(db, 'users'), orderBy(metric, 'desc'), limit(30));
        const snap = await getDocs(q);
        let html = '';
        let rank = 1;
        let myRank = '—';
        
        snap.forEach(d => {
            const data = d.data();
            const isMe = d.id === user.id.toString();
            if (isMe) myRank = rank;
            const icon = metric === 'stars' ? LB_STAR_ICON : LB_COIN_ICON;
            const num = metric === 'stars' ? (data.stars || 0) : formatCompact(data.coins || 0);
            const topClass = rank <= 3 ? ` lb-top-${rank}` : '';
            const meClass = isMe ? ' lb-me' : '';
            
            html += `<div class="lb-row glass-card${topClass}${meClass}" style="--i:${rank}">
                <div class="lb-left">
                    ${rankBadge(rank)}
                    <span class="lb-name">${data.name || 'Miner'}</span>
                </div>
                <span class="lb-val">${num}${icon}</span>
            </div>`;
            rank++;
        });
        
        list.innerHTML = html || '<p class="empty-state">No entries yet.</p>';
        // Force reflow then animate in (CSS handles stagger via --i)
        list.classList.remove('lb-list-ready');
        void list.offsetWidth;
        list.classList.add('lb-list-ready');

        if (sticky) {
            const icon = metric === 'stars' ? LB_STAR_ICON : LB_COIN_ICON;
            const num = metric === 'stars' ? formatCompact(userData?.stars || 0) : formatCompact(userData?.coins || 0);
            sticky.innerHTML = `
                <div class="lb-sticky-inner">
                    <span class="lb-sticky-rank">You · #${myRank}</span>
                    <span class="lb-val">${num}${icon}</span>
                </div>`;
            sticky.classList.add('lb-sticky-pop');
        }
    } catch (e) {
        if (list) list.innerHTML = '<p class="empty-state">Error loading leaderboard.</p>';
    }
}