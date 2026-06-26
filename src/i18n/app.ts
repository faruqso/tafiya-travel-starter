import type { Locale } from '../config/locales';

export const appLabels = {
  en: {
    signOut: 'Sign out',
    loginTitle: 'Login',
    signupTitle: 'Sign up',
    bookingsTitle: 'My bookings',
    bookingsDescription: 'View upcoming trips, download invoices, and manage your tafiya bookings.',
    loginLead:
      'Welcome back. Sign in to view your trip dashboard, download documents, and manage bookings.',
    signupLead: 'Create a free account to save favourites, track bookings, and unlock member fares.',
    loginPrompt: "Don't have an account?",
    signupPrompt: 'Already have an account?',
    demoCredentials: 'Demo credentials',
  },
  fr: {
    signOut: 'Se déconnecter',
    loginTitle: 'Connexion',
    signupTitle: "S'inscrire",
    bookingsTitle: 'Mes réservations',
    bookingsDescription:
      'Consultez vos voyages à venir, téléchargez vos factures et gérez vos réservations tafiya.',
    loginLead:
      'Bon retour. Connectez-vous pour accéder à votre espace voyage, télécharger vos documents et gérer vos réservations.',
    signupLead:
      'Créez un compte gratuit pour enregistrer vos favoris, suivre vos réservations et débloquer les tarifs membres.',
    loginPrompt: 'Pas encore de compte ?',
    signupPrompt: 'Vous avez déjà un compte ?',
    demoCredentials: 'Identifiants de démonstration',
  },
  de: {
    signOut: 'Abmelden',
    loginTitle: 'Anmelden',
    signupTitle: 'Registrieren',
    bookingsTitle: 'Meine Buchungen',
    bookingsDescription:
      'Sehen Sie anstehende Reisen, laden Sie Rechnungen herunter und verwalten Sie Ihre tafiya-Buchungen.',
    loginLead:
      'Willkommen zurück. Melden Sie sich an, um Ihr Reise-Dashboard zu öffnen, Dokumente herunterzuladen und Buchungen zu verwalten.',
    signupLead:
      'Erstellen Sie ein kostenloses Konto, um Favoriten zu speichern, Buchungen zu verfolgen und Mitgliedstarife freizuschalten.',
    loginPrompt: 'Noch kein Konto?',
    signupPrompt: 'Sie haben bereits ein Konto?',
    demoCredentials: 'Demo-Zugangsdaten',
  },
  ar: {
    signOut: 'تسجيل الخروج',
    loginTitle: 'تسجيل الدخول',
    signupTitle: 'إنشاء حساب',
    bookingsTitle: 'حجوزاتي',
    bookingsDescription: 'اعرض رحلاتك القادمة، وحمّل الفواتير، وأدر حجوزات tafiya.',
    loginLead: 'مرحباً بعودتك. سجّل الدخول لعرض لوحة رحلاتك وتنزيل المستندات وإدارة الحجوزات.',
    signupLead: 'أنشئ حساباً مجانياً لحفظ المفضلة وتتبع الحجوزات والاستفادة من أسعار الأعضاء.',
    loginPrompt: 'ليس لديك حساب؟',
    signupPrompt: 'لديك حساب بالفعل؟',
    demoCredentials: 'بيانات تجريبية',
  },
} as const satisfies Record<
  Locale,
  {
    signOut: string;
    loginTitle: string;
    signupTitle: string;
    bookingsTitle: string;
    bookingsDescription: string;
    loginLead: string;
    signupLead: string;
    loginPrompt: string;
    signupPrompt: string;
    demoCredentials: string;
  }
>;

export function getAppLabels(locale: Locale) {
  return appLabels[locale] ?? appLabels.en;
}
