
// Language utility functions
import { create } from 'zustand';

export type Language = 'th' | 'en';

interface LanguageState {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': {
    en: 'Home',
    th: 'หน้าแรก',
  },
  'nav.restaurants': {
    en: 'Restaurants',
    th: 'ร้านอาหาร',
  },
  'nav.orders': {
    en: 'My Orders',
    th: 'คำสั่งซื้อของฉัน',
  },
  'nav.profile': {
    en: 'Profile',
    th: 'โปรไฟล์',
  },
  'nav.login': {
    en: 'Login',
    th: 'เข้าสู่ระบบ',
  },
  'nav.signup': {
    en: 'Sign Up',
    th: 'ลงทะเบียน',
  },
  'nav.logout': {
    en: 'Logout',
    th: 'ออกจากระบบ',
  },
  
  // Home Page
  'home.title': {
    en: 'Food delivery from your favorite restaurants',
    th: 'บริการส่งอาหารจากร้านอาหารที่คุณชื่นชอบ',
  },
  'home.subtitle': {
    en: 'Order food for yourself or your loved ones back home',
    th: 'สั่งอาหารสำหรับคุณหรือคนที่คุณรักที่บ้าน',
  },
  'home.search': {
    en: 'Search restaurants or dishes',
    th: 'ค้นหาร้านอาหารหรืออาหาร',
  },
  'home.delivery': {
    en: 'Delivery',
    th: 'จัดส่ง',
  },
  'home.pickup': {
    en: 'Pickup',
    th: 'รับเอง',
  },

  // Restaurant List
  'restaurant.featured': {
    en: 'Featured Restaurants',
    th: 'ร้านอาหารแนะนำ',
  },
  'restaurant.all': {
    en: 'All Restaurants',
    th: 'ร้านอาหารทั้งหมด',
  },
  'restaurant.nearby': {
    en: 'Nearby',
    th: 'ใกล้เคียง',
  },
  'restaurant.delivery.time': {
    en: 'Delivery Time',
    th: 'เวลาจัดส่ง',
  },
  'restaurant.min': {
    en: 'min',
    th: 'นาที',
  },

  // Common Actions
  'action.order': {
    en: 'Order Now',
    th: 'สั่งเลย',
  },
  'action.viewMenu': {
    en: 'View Menu',
    th: 'ดูเมนู',
  },
  'action.addToCart': {
    en: 'Add to Cart',
    th: 'เพิ่มลงตะกร้า',
  },
  'action.checkout': {
    en: 'Checkout',
    th: 'ชำระเงิน',
  },
  'action.track': {
    en: 'Track Order',
    th: 'ติดตามคำสั่งซื้อ',
  },
  'action.seeAll': {
    en: 'See All',
    th: 'ดูทั้งหมด',
  },

  // Cart
  'cart.title': {
    en: 'Your Cart',
    th: 'ตะกร้าของคุณ',
  },
  'cart.empty': {
    en: 'Your cart is empty',
    th: 'ตะกร้าของคุณว่างเปล่า',
  },
  'cart.total': {
    en: 'Total',
    th: 'รวม',
  },
  'cart.deliveryFee': {
    en: 'Delivery Fee',
    th: 'ค่าจัดส่ง',
  },
  'cart.subtotal': {
    en: 'Subtotal',
    th: 'ยอดรวม',
  },
  
  // User Profile
  'profile.title': {
    en: 'My Profile',
    th: 'โปรไฟล์ของฉัน',
  },
  'profile.addresses': {
    en: 'Delivery Addresses',
    th: 'ที่อยู่จัดส่ง',
  },
  'profile.paymentMethods': {
    en: 'Payment Methods',
    th: 'วิธีการชำระเงิน',
  },
  'profile.orderHistory': {
    en: 'Order History',
    th: 'ประวัติการสั่งซื้อ',
  },
  'profile.preferences': {
    en: 'Preferences',
    th: 'การตั้งค่า',
  },

  // Order Tracking
  'order.tracking': {
    en: 'Track Your Order',
    th: 'ติดตามคำสั่งซื้อของคุณ',
  },
  'order.status.pending': {
    en: 'Order Pending',
    th: 'รอการยืนยัน',
  },
  'order.status.confirmed': {
    en: 'Order Confirmed',
    th: 'ยืนยันคำสั่งซื้อแล้ว',
  },
  'order.status.preparing': {
    en: 'Preparing',
    th: 'กำลังเตรียมอาหาร',
  },
  'order.status.ready': {
    en: 'Ready for Pickup/Delivery',
    th: 'พร้อมส่ง/รับ',
  },
  'order.status.delivering': {
    en: 'Out for Delivery',
    th: 'กำลังจัดส่ง',
  },
  'order.status.delivered': {
    en: 'Delivered',
    th: 'จัดส่งแล้ว',
  },
  'order.status.completed': {
    en: 'Order Completed',
    th: 'สำเร็จ',
  },
};

// Create language store
export const useLanguage = create<LanguageState>((set, get) => ({
  currentLanguage: 'en', // Default language
  setLanguage: (lang: Language) => set({ currentLanguage: lang }),
  t: (key: string) => {
    const { currentLanguage } = get();
    return translations[key]?.[currentLanguage] || key;
  },
}));
