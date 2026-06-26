/**
 * Page copy translation overrides for fr, de, and ar locales.
 * Source: content/pages/en/*.yaml — deep-merged onto English by seed script.
 */

export const pageTranslationOverrides = {
  bookings: {
    fr: {
      title: 'Réservations',
      description:
        'Connectez-vous pour gérer vos voyages tafiya — consultez les itinéraires, les factures et demandez des modifications.',
      sections: [
        {
          value: {
            eyebrow: 'Votre compte',
            headline: 'Gérez vos réservations',
            subheadline:
              'Votre tableau de bord voyage — connectez-vous pour voir vos prochains départs, télécharger vos documents et demander des modifications.',
            buttons: [{ label: 'Se connecter' }],
          },
        },
        {
          value: {
            eyebrow: 'À quoi sert cette page',
            headline: 'Votre tableau de bord voyage — pas un nouveau formulaire de réservation',
            body: `Réservations est l’espace où les voyageurs de retour gèrent les voyages déjà achetés. Après connexion, vous pouvez :


### Consulter vos itinéraires à venir

Vols, hôtels et activités sur une seule frise chronologique avec mises à jour en direct.


### Télécharger factures et documents

Cartes d’embarquement, bons d’hôtel et reçus quand vous en avez besoin.


### Demander des modifications ou de l’aide

Modifier les dates, ajouter des bagages ou contacter notre équipe au sujet d’une réservation existante.


### Préparer un nouveau voyage ?

Pour demander une nouvelle destination, un hôtel ou un vol, utilisez notre <a href="/book">formulaire de réservation</a> — il préremplit le voyage choisi sur n’importe quelle page du catalogue.`,
          },
        },
        {
          value: {
            headline: 'Pas encore de compte ?',
            subheadline:
              'Créez-en un pour enregistrer vos favoris, suivre vos réservations et accéder aux tarifs membres — ou lancez une nouvelle demande de voyage sans vous connecter.',
            buttons: [{ label: 'Créer un compte' }, { label: 'Nouvelle réservation' }],
          },
        },
      ],
    },
    de: {
      title: 'Buchungen',
      description:
        'Melden Sie sich an, um Ihre tafiya-Reisen zu verwalten — Reisepläne, Rechnungen einsehen und Änderungen anfragen.',
      sections: [
        {
          value: {
            eyebrow: 'Ihr Konto',
            headline: 'Buchungen verwalten',
            subheadline:
              'Ihr Reise-Dashboard — melden Sie sich an, um kommende Reisen einzusehen, Dokumente herunterzuladen und Änderungen anzufragen.',
            buttons: [{ label: 'Anmelden' }],
          },
        },
        {
          value: {
            eyebrow: 'Wofür diese Seite da ist',
            headline: 'Ihr Reise-Dashboard — kein neues Buchungsformular',
            body: `Buchungen ist der Bereich, in dem wiederkehrende Reisende bereits gekaufte Reisen verwalten. Nach der Anmeldung können Sie:


### Kommende Reisepläne einsehen

Flüge, Hotels und Aktivitäten in einer Zeitleiste mit Live-Statusupdates.


### Rechnungen und Dokumente herunterladen

Bordkarten, Hotelgutscheine und Belege, wann immer Sie sie brauchen.


### Änderungen oder Support anfragen

Termine ändern, Gepäck hinzufügen oder unser Team zu einer bestehenden Buchung kontaktieren.


### Eine neue Reise planen?

Um eine neue Destination, ein Hotel oder einen Flug anzufragen, nutzen Sie unser <a href="/book">Buchungsformular</a> — es übernimmt die Auswahl von jeder Katalogseite.`,
          },
        },
        {
          value: {
            headline: 'Noch kein Konto?',
            subheadline:
              'Erstellen Sie eines, um Favoriten zu speichern, Buchungen zu verfolgen und Mitgliedertarife freizuschalten — oder starten Sie eine neue Reiseanfrage ohne Anmeldung.',
            buttons: [{ label: 'Konto erstellen' }, { label: 'Neue Buchung starten' }],
          },
        },
      ],
    },
    ar: {
      title: 'الحجوزات',
      description:
        'سجّل الدخول لإدارة رحلاتك على tafiya — اطّلع على خطط السفر والفواتير واطلب التعديلات.',
      sections: [
        {
          value: {
            eyebrow: 'حسابك',
            headline: 'إدارة حجوزاتك',
            subheadline:
              'لوحة رحلاتك — سجّل الدخول لعرض السفر القادم وتنزيل المستندات وطلب التعديلات.',
            buttons: [{ label: 'تسجيل الدخول' }],
          },
        },
        {
          value: {
            eyebrow: 'الغرض من هذه الصفحة',
            headline: 'لوحة رحلاتك — وليست نموذج حجز جديد',
            body: `الحجوزات هي المكان الذي يدير فيه المسافرون العائدون الرحلات التي اشتروها مسبقًا. بعد تسجيل الدخول يمكنك:


### عرض خطط السفر القادمة

رحلات الطيران والفنادق والأنشطة في جدول زمني واحد مع تحديثات مباشرة.


### تنزيل الفواتير والمستندات

بطاقات الصعود وقسائم الفنادق والإيصالات متى احتجت إليها.


### طلب تعديلات أو دعم

تغيير التواريخ أو إضافة أمتعة أو مراسلة فريقنا بشأن حجز قائم.


### تخطيط رحلة جديدة؟

لطلب وجهة أو فندق أو رحلة طيران جديدة، استخدم <a href="/book">نموذج الحجز</a> — يملأ تلقائيًا الرحلة التي اخترتها من أي صفحة في الكتالوج.`,
          },
        },
        {
          value: {
            headline: 'ليس لديك حساب بعد؟',
            subheadline:
              'أنشئ حسابًا لحفظ المفضلة وتتبع الحجوزات والوصول إلى أسعار الأعضاء — أو ابدأ طلب رحلة جديدة دون تسجيل الدخول.',
            buttons: [{ label: 'إنشاء حساب' }, { label: 'بدء حجز جديد' }],
          },
        },
      ],
    },
  },

  book: {
    fr: {
      title: 'Réserver un voyage',
      description: 'Demandez une réservation pour des destinations, hôtels ou vols sur tafiya.',
      sections: [
        {
          value: {
            eyebrow: 'Réserver',
            headline: 'Commencez votre réservation',
            subheadline:
              'Choisissez votre voyage, vos dates et envoyez une demande — notre équipe confirme la disponibilité sous un jour ouvré.',
          },
        },
        {
          value: {
            eyebrow: 'Demande de réservation',
            headline: 'Parlez-nous de votre voyage',
            subheadline:
              'Votre sélection depuis une page destination, hôtel ou vol est reprise automatiquement. Ajustez les dates et le nombre de voyageurs avant d’envoyer.',
            formNote:
              'Aucun paiement n’est effectué ici — un spécialiste tafiya vous enverra un devis confirmé et les prochaines étapes.',
          },
        },
      ],
    },
    de: {
      title: 'Reise buchen',
      description: 'Stellen Sie eine Buchungsanfrage für Destinationen, Hotels oder Flüge auf tafiya.',
      sections: [
        {
          value: {
            eyebrow: 'Buchen',
            headline: 'Buchung starten',
            subheadline:
              'Wählen Sie Ihre Reise, Daten und senden Sie eine Anfrage — unser Team bestätigt die Verfügbarkeit innerhalb eines Werktags.',
          },
        },
        {
          value: {
            eyebrow: 'Buchungsanfrage',
            headline: 'Erzählen Sie uns von Ihrer Reise',
            subheadline:
              'Ihre Auswahl von jeder Destination-, Hotel- oder Flugseite wird automatisch übernommen. Passen Sie Daten und Reisendenzahl vor dem Absenden an.',
            formNote:
              'Hier erfolgt keine Zahlung — ein tafiya-Spezialist meldet sich mit einem bestätigten Angebot und den nächsten Schritten.',
          },
        },
      ],
    },
    ar: {
      title: 'احجز رحلة',
      description: 'قدّم طلب حجز لوجهات أو فنادق أو رحلات طيران على tafiya.',
      sections: [
        {
          value: {
            eyebrow: 'الحجز',
            headline: 'ابدأ حجزك',
            subheadline:
              'اختر رحلتك وحدّد التواريخ وأرسل الطلب — يؤكد فريقنا التوفر خلال يوم عمل واحد.',
          },
        },
        {
          value: {
            eyebrow: 'طلب الحجز',
            headline: 'أخبرنا عن رحلتك',
            subheadline:
              'يُنقل اختيارك تلقائيًا من أي صفحة وجهة أو فندق أو رحلة. عدّل التواريخ وعدد المسافرين قبل الإرسال.',
            formNote:
              'لا يتم الدفع هنا — سيتواصل معك أخصائي tafiya بعرض مؤكد والخطوات التالية.',
          },
        },
      ],
    },
  },

  contact: {
    fr: {
      title: 'Contact',
      description:
        'Contactez l’équipe tafiya pour des réservations, des partenariats ou de l’aide pour planifier votre prochain voyage.',
      sections: [
        {
          value: {
            eyebrow: 'Nous contacter',
            headline: 'Nous sommes là pour vous aider à voyager',
            subheadline:
              'Dites-nous où vous voulez aller et quand — un spécialiste tafiya vous répond sous un jour ouvré.',
          },
        },
        {
          value: {
            eyebrow: 'Contactez-nous',
            headline: 'Commencez à planifier dès aujourd’hui',
            subheadline:
              'Partagez votre destination, vos dates et votre budget. Nous vous enverrons un itinéraire sur mesure avec des tarifs en direct.',
            formNote:
              'Les messages sont stockés de façon sécurisée à des fins de démonstration. Connectez Formspree ou votre CRM en production — voir docs/customization.md.',
          },
        },
        {
          value: {
            eyebrow: 'Pas de projet de voyage ?',
            headline: 'Trouvez le bon formulaire de contact',
            body: `Cette page est réservée aux demandes de planification de voyage. Pour tout le reste, utilisez le formulaire dédié sur chaque page :


### Carrières — candidatures

<a href="/careers#apply">Postulez avec votre portfolio et les détails du poste</a>.


### Presse — médias et interviews

<a href="/press#press">Demandez des visuels, citations ou interviews</a>.


### Affiliés — candidatures partenaires

<a href="/affiliates#partners">Postulez au programme d’affiliation</a>.


### Support — réservations et compte

<a href="/help-faq#support">Obtenez de l’aide pour un voyage existant</a>.`,
          },
        },
      ],
    },
    de: {
      title: 'Kontakt',
      description:
        'Erreichen Sie das tafiya-Team für Buchungen, Partnerschaften oder Hilfe bei der Planung Ihrer nächsten Reise.',
      sections: [
        {
          value: {
            eyebrow: 'Kontakt aufnehmen',
            headline: 'Wir helfen Ihnen beim Reisen',
            subheadline:
              'Sagen Sie uns, wohin und wann Sie reisen möchten — ein tafiya-Spezialist antwortet innerhalb eines Werktags.',
          },
        },
        {
          value: {
            eyebrow: 'Kontaktieren Sie uns',
            headline: 'Starten Sie noch heute mit der Planung',
            subheadline:
              'Teilen Sie Destination, Daten und Budget. Wir senden Ihnen einen maßgeschneiderten Reiseplan mit Live-Preisen.',
            formNote:
              'Nachrichten werden zu Demo-Zwecken sicher gespeichert. Verbinden Sie Formspree oder Ihr CRM in der Produktion — siehe docs/customization.md.',
          },
        },
        {
          value: {
            eyebrow: 'Keine Reiseplanung?',
            headline: 'Das richtige Kontaktformular finden',
            body: `Diese Seite ist nur für Reiseplanungsanfragen. Für alles andere nutzen Sie das jeweilige Formular auf jeder Seite:


### Karriere — Bewerbungen

<a href="/careers#apply">Bewerben Sie sich mit Portfolio und Rollendetails</a>.


### Presse — Medien und Interviews

<a href="/press#press">Assets, Zitate oder Interviews anfragen</a>.


### Partner — Partnerschaftsbewerbungen

<a href="/affiliates#partners">Für das Affiliate-Programm bewerben</a>.


### Support — Buchungen und Konto

<a href="/help-faq#support">Hilfe zu einer bestehenden Reise erhalten</a>.`,
          },
        },
      ],
    },
    ar: {
      title: 'اتصل بنا',
      description:
        'تواصل مع فريق tafiya للحجوزات أو الشراكات أو المساعدة في تخطيط رحلتك القادمة.',
      sections: [
        {
          value: {
            eyebrow: 'تواصل معنا',
            headline: 'نحن هنا لمساعدتك على السفر',
            subheadline:
              'أخبرنا أين تريد الذهاب ومتى — سيرد عليك أخصائي tafiya خلال يوم عمل واحد.',
          },
        },
        {
          value: {
            eyebrow: 'اتصل بنا',
            headline: 'ابدأ التخطيط اليوم',
            subheadline:
              'شارك وجهتك وتواريخك وميزانيتك. سنرسل لك خطة سفر مخصصة بأسعار مباشرة.',
            formNote:
              'تُخزَّن الرسائل بأمان لأغراض العرض التوضيحي. اربط Formspree أو نظام CRM في الإنتاج — راجع docs/customization.md.',
          },
        },
        {
          value: {
            eyebrow: 'لا تخطط لرحلة؟',
            headline: 'اعثر على نموذج الاتصال المناسب',
            body: `هذه الصفحة مخصصة لاستفسارات تخطيط السفر فقط. لكل شيء آخر، استخدم النموذج المخصص في كل صفحة:


### الوظائف — طلبات التوظيف

<a href="/careers#apply">قدّم طلبك مع ملف أعمالك وتفاصيل الدور</a>.


### الصحافة — إعلام ومقابلات

<a href="/press#press">اطلب مواد أو اقتباسات أو مقابلات</a>.


### الشركاء — طلبات الشراكة

<a href="/affiliates#partners">قدّم طلب الانضمام لبرنامج الشركاء</a>.


### الدعم — الحجوزات والحساب

<a href="/help-faq#support">احصل على مساعدة بشأن رحلة قائمة</a>.`,
          },
        },
      ],
    },
  },

  affiliates: {
    fr: {
      title: 'Affiliés',
      description:
        'Rejoignez le programme d’affiliation tafiya — commissions compétitives et reporting en temps réel.',
      sections: [
        {
          value: {
            eyebrow: 'Partenaires',
            headline: 'Gagnez avec tafiya',
            subheadline:
              'Partagez des voyages sélectionnés et des offres de vols avec votre audience et gagnez sur chaque réservation qualifiée.',
            buttons: [{ label: 'Postuler au programme partenaire' }],
          },
        },
        {
          value: {
            eyebrow: 'Avantages du programme',
            headline: 'Conçu pour les créateurs et sites voyage',
            items: [
              {
                title: 'Commissions compétitives',
                description:
                  'Gagnez sur les vols, hôtels et forfaits avec des paliers de paiement transparents.',
              },
              {
                title: 'Tableau de bord en temps réel',
                description:
                  'Suivez clics, conversions et revenus avec des rapports quotidiens et export CSV.',
              },
              {
                title: 'Support partenaire',
                description:
                  'Responsables affiliés dédiés, assets de campagne et liens profonds vers toute page destination.',
              },
            ],
          },
        },
        {
          value: {
            eyebrow: 'Comment ça marche',
            headline: 'Trois étapes pour commencer à gagner',
            body: `### Postulez en ligne

Présentez votre site, la taille de votre audience et vos marchés principaux. Nous examinons la plupart des candidatures sous trois jours ouvrés.


### Partagez vos liens

Utilisez des URL suivies dans vos articles, newsletters ou réseaux sociaux. Les liens profonds mènent les voyageurs vers l’itinéraire ou l’hôtel exact que vous recommandez.


### Recevez vos paiements chaque mois

Les commissions sont validées après les dates de voyage et versées par virement bancaire ou PayPal le 15 de chaque mois.


Des questions ? Écrivez à partners@tafiya.co — nous expliquons volontiers les taux de commission et les calendriers promotionnels.`,
          },
        },
        {
          value: {
            eyebrow: 'Candidature partenaire',
            headline: 'Postuler au programme d’affiliation',
            subheadline:
              'Parlez-nous de votre audience et de la façon dont vous comptez promouvoir tafiya. Nous examinons la plupart des candidatures sous trois jours ouvrés.',
            formNote:
              'Déjà approuvé ? Écrivez à partners@tafiya.co pour les assets de campagne et les liens profonds.',
          },
        },
      ],
    },
    de: {
      title: 'Partner',
      description:
        'Werden Sie tafiya-Partner — wettbewerbsfähige Provisionen und Echtzeit-Reporting.',
      sections: [
        {
          value: {
            eyebrow: 'Partner',
            headline: 'Mit tafiya verdienen',
            subheadline:
              'Teilen Sie kuratierte Reisen und Flugangebote mit Ihrer Zielgruppe und verdienen Sie bei jeder qualifizierten Buchung.',
            buttons: [{ label: 'Partnerprogramm beantragen' }],
          },
        },
        {
          value: {
            eyebrow: 'Programmvorteile',
            headline: 'Für Creator und Reiseseiten gemacht',
            items: [
              {
                title: 'Wettbewerbsfähige Provisionen',
                description:
                  'Verdienen Sie an Flügen, Hotels und Paketen mit transparenten Auszahlungsstufen.',
              },
              {
                title: 'Echtzeit-Dashboard',
                description:
                  'Klicks, Conversions und Einnahmen mit Tagesberichten und CSV-Export verfolgen.',
              },
              {
                title: 'Partner-Support',
                description:
                  'Dedizierte Affiliate-Manager, Kampagnen-Assets und Deep Links zu jeder Zielseite.',
              },
            ],
          },
        },
        {
          value: {
            eyebrow: 'So funktioniert es',
            headline: 'Drei Schritte zum Verdienen',
            body: `### Online bewerben

Erzählen Sie uns von Ihrer Website, Publikumsgröße und Hauptmärkten. Die meisten Bewerbungen prüfen wir innerhalb von drei Werktagen.


### Links teilen

Nutzen Sie getrackte URLs in Blogposts, Newslettern oder Social Media. Deep Links führen Reisende genau zu der Route oder dem Hotel, das Sie empfehlen.


### Monatlich ausgezahlt werden

Provisionen werden nach Reisedatum validiert und am 15. jedes Monats per Banküberweisung oder PayPal ausgezahlt.


Fragen? Schreiben Sie an partners@tafiya.co — wir erläutern gerne Provisionssätze und Aktionskalender.`,
          },
        },
        {
          value: {
            eyebrow: 'Partnerbewerbung',
            headline: 'Für das Affiliate-Programm bewerben',
            subheadline:
              'Erzählen Sie uns von Ihrer Zielgruppe und wie Sie tafiya teilen möchten. Die meisten Bewerbungen prüfen wir innerhalb von drei Werktagen.',
            formNote:
              'Bereits genehmigt? Schreiben Sie an partners@tafiya.co für Kampagnen-Assets und Deep Links.',
          },
        },
      ],
    },
    ar: {
      title: 'الشركاء',
      description:
        'انضم إلى برنامج شركاء tafiya — عمولات تنافسية وتقارير فورية.',
      sections: [
        {
          value: {
            eyebrow: 'الشركاء',
            headline: 'اربح مع tafiya',
            subheadline:
              'شارك رحلات مختارة وعروض طيران مع جمهورك واربح عن كل حجز مؤهل.',
            buttons: [{ label: 'التقديم لبرنامج الشركاء' }],
          },
        },
        {
          value: {
            eyebrow: 'مزايا البرنامج',
            headline: 'مصمم للمبدعين ومواقع السفر',
            items: [
              {
                title: 'عمولات تنافسية',
                description:
                  'اربح من رحلات الطيران والفنادق والباقات مع مستويات دفع شفافة.',
              },
              {
                title: 'لوحة تحكم فورية',
                description:
                  'تتبع النقرات والتحويلات والأرباح بتقارير يومية وتصدير CSV.',
              },
              {
                title: 'دعم الشركاء',
                description:
                  'مديرو شراكة مخصصون وأصول حملات وروابط عميقة لأي صفحة وجهة.',
              },
            ],
          },
        },
        {
          value: {
            eyebrow: 'كيف يعمل',
            headline: 'ثلاث خطوات لبدء الربح',
            body: `### قدّم عبر الإنترنت

أخبرنا عن موقعك وحجم جمهورك وأسواقك الرئيسية. نراجع معظم الطلبات خلال ثلاثة أيام عمل.


### شارك روابطك

استخدم روابط متتبعة في المقالات أو النشرات أو وسائل التواصل. الروابط العميقة توصل المسافرين إلى المسار أو الفندق الذي توصي به.


### استلم دفعاتك شهريًا

تُعتمد العمولات بعد تواريخ السفر وتُدفع عبر تحويل بنكي أو PayPal في اليوم 15 من كل شهر.


أسئلة؟ راسل partners@tafiya.co — يسعدنا شرح معدلات العمولة والتقويمات الترويجية.`,
          },
        },
        {
          value: {
            eyebrow: 'طلب الشراكة',
            headline: 'التقديم لبرنامج الشركاء',
            subheadline:
              'أخبرنا عن جمهورك وكيف تخطط لترويج tafiya. نراجع معظم الطلبات خلال ثلاثة أيام عمل.',
            formNote:
              'موافق عليك مسبقًا؟ راسل partners@tafiya.co للحصول على أصول الحملات والروابط العميقة.',
          },
        },
      ],
    },
  },

  press: {
    fr: {
      title: 'Presse',
      description: 'Actualités, ressources de marque et contacts médias pour la couverture voyage de tafiya.',
      sections: [
        {
          value: {
            eyebrow: 'Médias',
            headline: 'Presse et ressources de marque',
            subheadline:
              'Logos, visuels produit, biographies de direction et angles éditoriaux pour les journalistes qui couvrent le voyage moderne.',
            buttons: [{ label: 'Contacter l’équipe presse' }],
          },
        },
        {
          value: {
            eyebrow: 'Service presse',
            headline: 'Comment nous pouvons aider',
            body: `tafiya aide les voyageurs à comparer vols, séjours boutique et expériences locales en un seul endroit. Nous soutenons volontiers les sujets sur le voyage flexible, la transparence des prix et la planification mobile.


Pour des interviews, annonces sous embargo ou visuels haute résolution, écrivez à press@tafiya.co avec votre média, votre deadline et votre numéro de contact. Nous visons une réponse sous un jour ouvré.`,
          },
        },
        {
          value: {
            eyebrow: 'Kit de marque',
            headline: 'Ce que vous pouvez télécharger',
            items: [
              {
                title: 'Logo et signature',
                description:
                  'Versions SVG et PNG pour fonds clairs et sombres, avec règles d’espace libre.',
              },
              {
                title: 'Captures produit',
                description:
                  'Parcours web et mobile pour la recherche, le paiement et la gestion d’itinéraire.',
              },
              {
                title: 'Biographies de direction',
                description:
                  'Biographies courtes et longues plus photos des fondateurs et responsables produit.',
              },
            ],
          },
        },
        {
          value: {
            eyebrow: 'Actualités récentes',
            headline: 'Angles que nous pouvons aborder',
            body: `### Rebooking mobile-first

Comment tafiya aide les voyageurs à modifier leurs plans depuis la porte d’embarquement avec l’inventaire en direct des compagnies.


### Transparence des prix

Pourquoi afficher bagages et frais de modification dès le paiement renforce la confiance.


### Itinéraires durables

Programmes partenaires qui mettent en avant les liaisons ferroviaires et les itinéraires à faibles émissions en Europe.`,
          },
        },
        {
          value: {
            eyebrow: 'Demandes médias',
            headline: 'Contacter l’équipe presse',
            subheadline:
              'Demandez des visuels, interviews ou citations pour votre article. Indiquez votre média et votre deadline pour que nous puissions prioriser.',
            formNote:
              'Pour les demandes urgentes le jour même, écrivez directement à press@tafiya.co avec URGENT dans l’objet.',
          },
        },
      ],
    },
    de: {
      title: 'Presse',
      description: 'News, Marken-Assets und Medienkontakte für tafiya-Reiseberichterstattung.',
      sections: [
        {
          value: {
            eyebrow: 'Medien',
            headline: 'Presse und Markenressourcen',
            subheadline:
              'Logos, Produktbilder, Führungsbiografien und Story-Ideen für Journalisten, die modernes Reisen abdecken.',
            buttons: [{ label: 'Presse-Team kontaktieren' }],
          },
        },
        {
          value: {
            eyebrow: 'Mediendesk',
            headline: 'Wie wir helfen können',
            body: `tafiya hilft Reisenden, Flüge, Boutique-Unterkünfte und lokale Erlebnisse an einem Ort zu vergleichen. Wir unterstützen gerne Themen zu flexiblem Reisen, Preistransparenz und mobiler Reiseplanung.


Für Interviewanfragen, Embargo-Mitteilungen oder hochauflösende Assets schreiben Sie an press@tafiya.co mit Medium, Deadline und bevorzugter Telefonnummer. Wir antworten in der Regel innerhalb eines Werktags.`,
          },
        },
        {
          value: {
            eyebrow: 'Brand Kit',
            headline: 'Was Sie herunterladen können',
            items: [
              {
                title: 'Logo und Wortmarke',
                description:
                  'SVG- und PNG-Varianten für helle und dunkle Hintergründe mit Freiraum-Richtlinien.',
              },
              {
                title: 'Produkt-Screenshots',
                description:
                  'Web- und Mobile-Flows für Suche, Checkout und Reiseplanverwaltung.',
              },
              {
                title: 'Führungsbiografien',
                description:
                  'Kurz- und Langbiografien plus Porträts von Gründern und Produktleitern.',
              },
            ],
          },
        },
        {
          value: {
            eyebrow: 'Aktuelle News',
            headline: 'Story-Ideen, die wir besprechen können',
            body: `### Mobile-first Umbuchung

Wie tafiya Reisenden hilft, Pläne am Gate mit Live-Airline-Inventar zu ändern.


### Preistransparenz

Warum Gepäck- und Änderungsgebühren vor dem Checkout Vertrauen schaffen.


### Nachhaltige Routen

Partnerprogramme, die Bahnverbindungen und emissionsärmere Routen in Europa hervorheben.`,
          },
        },
        {
          value: {
            eyebrow: 'Medienanfragen',
            headline: 'Presse-Team kontaktieren',
            subheadline:
              'Fordern Sie Assets, Interviews oder Zitate für Ihre Story an. Nennen Sie Medium und Deadline zur Priorisierung.',
            formNote:
              'Für dringende Anfragen am selben Tag schreiben Sie direkt an press@tafiya.co mit URGENT im Betreff.',
          },
        },
      ],
    },
    ar: {
      title: 'الصحافة',
      description: 'أخبار وأصول العلامة التجارية وجهات اتصال إعلامية لتغطية سفر tafiya.',
      sections: [
        {
          value: {
            eyebrow: 'الإعلام',
            headline: 'الصحافة وموارد العلامة',
            subheadline:
              'شعارات وصور المنتج وسير القيادة وزوايا قصصية للصحفيين الذين يغطون السفر الحديث.',
            buttons: [{ label: 'تواصل مع فريق الصحافة' }],
          },
        },
        {
          value: {
            eyebrow: 'مكتب الإعلام',
            headline: 'كيف يمكننا المساعدة',
            body: `يساعد tafiya المسافرين على مقارنة رحلات الطيران والإقامات البوتيكية والتجارب المحلية في مكان واحد. يسعدنا دعم موضوعات السفر المرن وشفافية الأسعار والتخطيط عبر الهاتف.


لطلبات المقابلات أو الإعلانات تحت الحظر أو المواد عالية الدقة، راسل press@tafiya.co مع وسيلتك والموعد النهائي ورقم الاتصال. نهدف للرد خلال يوم عمل واحد.`,
          },
        },
        {
          value: {
            eyebrow: 'حزمة العلامة',
            headline: 'ما يمكنك تنزيله',
            items: [
              {
                title: 'الشعار والاسم',
                description:
                  'نسخ SVG وPNG للخلفيات الفاتحة والداكنة مع إرشادات المساحة الحرة.',
              },
              {
                title: 'لقطات المنتج',
                description:
                  'مسارات الويب والجوال للبحث والدفع وإدارة خط السير.',
              },
              {
                title: 'سير القيادة',
                description:
                  'سير قصيرة وطويلة وصور للمؤسسين وقادة المنتج.',
              },
            ],
          },
        },
        {
          value: {
            eyebrow: 'أخبار حديثة',
            headline: 'زوايا يمكننا مناقشتها',
            body: `### إعادة الحجز عبر الجوال أولًا

كيف يساعد tafiya المسافرين على تغيير الخطط من البوابة مع مخزون شركات الطيران المباشر.


### شفافية الأسعار

لماذا عرض أمتعة ورسوم التغيير مبكرًا يبني الثقة عند الدفع.


### مسارات مستدامة

برامج شراكة تبرز الاتصالات بالقطار وخطوط السير الأقل انبعاثات عبر أوروبا.`,
          },
        },
        {
          value: {
            eyebrow: 'استفسارات إعلامية',
            headline: 'تواصل مع فريق الصحافة',
            subheadline:
              'اطلب مواد أو مقابلات أو اقتباسات لقصتك. أدرج وسيلتك والموعد النهائي لنرتب الأولوية.',
            formNote:
              'للطلبات العاجلة في نفس اليوم، راسل press@tafiya.co مباشرة مع URGENT في عنوان الرسالة.',
          },
        },
      ],
    },
  },

  careers: {
    fr: {
      title: 'Carrières',
      description:
        'Rejoignez tafiya — postes remote-first en produit, ingénierie et opérations destination.',
      sections: [
        {
          value: {
            eyebrow: 'Entreprise',
            headline: 'Construisez l’avenir du voyage avec nous',
            subheadline:
              'Nous sommes une équipe remote-first qui conçoit des outils pour rendre la planification de voyage calme, transparente et vraiment agréable.',
            buttons: [{ label: 'Postuler maintenant' }],
          },
        },
        {
          value: {
            eyebrow: 'Culture',
            headline: 'Notre façon de travailler',
            body: `tafiya est distribuée entre Londres, Lisbonne et Singapour, avec des rituels async-friendly et des retraites trimestrielles dans des destinations que nous aimons. Nous recrutons pour la curiosité, l’écriture claire et l’empathie envers les voyageurs sous stress réel — correspondances manquées, changements de visa et voyages familiaux de dernière minute inclus.


Chacun reçoit une allocation voyage, un budget formation et des horaires flexibles qui respectent les fuseaux horaires locaux. Nous publions les fourchettes salariales sur chaque poste et gardons des processus d’entretien ciblés — en général trois échanges, jamais plus de deux semaines au total.`,
          },
        },
        {
          value: {
            eyebrow: 'Avantages',
            headline: 'Ce que vous pouvez attendre',
            items: [
              {
                title: 'Remote-first',
                description:
                  'Travaillez de n’importe où avec des heures de chevauchement et deux rassemblements d’équipe par an.',
              },
              {
                title: 'Allocation voyage',
                description:
                  'Budget annuel pour explorer de nouvelles routes et tester le produit que vous livrez.',
              },
              {
                title: 'Budget développement',
                description:
                  'Formations, conférences et livres — si cela améliore votre métier, nous le soutenons.',
              },
            ],
          },
        },
        {
          value: {
            eyebrow: 'Postes ouverts',
            headline: 'Nous recrutons',
            body: `### Senior Product Designer — Voyages et itinéraires

Piloter les parcours de planification multi-villes et l’enregistrement mobile. Remote (fuseaux EU/UK).


### Full-stack Engineer — Recherche et tarification

Construire une recherche de tarifs rapide et fiable avec Node et des outils front-end modernes. Remote mondial.


### Destination Operations Lead — Méditerranée

Valider les guides, négocier les allotements hôteliers et tenir les partenaires sur le terrain responsables.


Vous ne voyez pas de poste adapté ? Postulez quand même ci-dessous — nous gardons les profils forts en dossier.`,
          },
        },
        {
          value: {
            eyebrow: 'Comment postuler',
            headline: 'Trois étapes pour rejoindre tafiya',
            body: `### Choisissez un poste

Sélectionnez une offre ouverte ci-dessus, ou dites-nous où vous apporteriez le plus de valeur pour une candidature générale.


### Envoyez votre travail

Incluez un portfolio, GitHub ou profil LinkedIn pour que nous comprenions comment vous pensez et livrez.


### Complétez le formulaire ci-dessous

Notre équipe talent examine les candidatures sous trois jours ouvrés et propose un court appel d’introduction en cas de match.`,
          },
        },
        {
          value: {
            eyebrow: 'Postuler maintenant',
            headline: 'Envoyez votre candidature',
            subheadline:
              'Indiquez le poste qui vous intéresse et partagez des liens vers votre travail dont vous êtes fier. Nous répondons sous trois jours ouvrés.',
            formNote:
              'Vous préférez l’e-mail ? Envoyez CV et portfolio directement à careers@tafiya.co avec l’intitulé du poste en objet.',
          },
        },
      ],
    },
    de: {
      title: 'Karriere',
      description:
        'Werden Sie Teil von tafiya — Remote-first-Rollen in Produkt, Engineering und Destination Operations.',
      sections: [
        {
          value: {
            eyebrow: 'Unternehmen',
            headline: 'Gestalten Sie mit uns die Zukunft des Reisens',
            subheadline:
              'Wir sind ein Remote-first-Team, das Tools entwickelt, die Reiseplanung ruhig, transparent und wirklich angenehm machen.',
            buttons: [{ label: 'Jetzt bewerben' }],
          },
        },
        {
          value: {
            eyebrow: 'Kultur',
            headline: 'Wie wir arbeiten',
            body: `tafiya ist über London, Lissabon und Singapur verteilt, mit async-freundlichen Ritualen und vierteljährlichen Team-Retreats an Destinationen, die wir lieben. Wir stellen nach Neugier, klarer Schrift und Empathie für Reisende unter realem Stress ein — verpasste Anschlüsse, Visumänderungen und Last-Minute-Familienreisen inklusive.


Alle erhalten ein Reisebudget, Weiterbildungsbudget und flexible Zeiten, die lokale Zeitzonen respektieren. Wir veröffentlichen Gehaltsbänder für jede Rolle und halten Interviewprozesse fokussiert — typischerweise drei Gespräche, nie länger als zwei Wochen insgesamt.`,
          },
        },
        {
          value: {
            eyebrow: 'Benefits',
            headline: 'Was Sie erwarten können',
            items: [
              {
                title: 'Remote-first',
                description:
                  'Arbeiten Sie von überall mit Kern-Overlap-Zeiten und zweimal jährlichen Team-Treffen.',
              },
              {
                title: 'Reisebudget',
                description:
                  'Jahresbudget, um neue Routen zu erkunden und das Produkt zu testen, das Sie ausliefern.',
              },
              {
                title: 'Weiterbildungsbudget',
                description:
                  'Kurse, Konferenzen und Bücher — wenn es Ihr Handwerk verbessert, unterstützen wir es.',
              },
            ],
          },
        },
        {
          value: {
            eyebrow: 'Offene Stellen',
            headline: 'Wir stellen ein',
            body: `### Senior Product Designer — Trips & Itineraries

End-to-End-Flows für Multi-City-Planung und mobiles Check-in leiten. Remote (EU/UK-Zeitzonen).


### Full-stack Engineer — Search & Pricing

Schnelle, zuverlässige Tarifsuche mit Node und modernen Front-end-Tools bauen. Remote weltweit.


### Destination Operations Lead — Mittelmeer

Guides prüfen, Hotelkontingente verhandeln und Partner vor Ort accountable halten.


Kein passender Job? Bewerben Sie sich trotzdem unten — wir behalten starke Profile in der Pipeline.`,
          },
        },
        {
          value: {
            eyebrow: 'So bewerben Sie sich',
            headline: 'Drei Schritte zu tafiya',
            body: `### Rolle wählen

Wählen Sie eine offene Position oben oder sagen Sie uns, wo Sie am meisten Mehrwert bringen würden.


### Arbeit senden

Fügen Sie Portfolio, GitHub oder LinkedIn bei, damit wir verstehen, wie Sie denken und liefern.


### Formular unten ausfüllen

Unser Talent-Team prüft Bewerbungen innerhalb von drei Werktagen und meldet sich bei Match für ein kurzes Intro-Gespräch.`,
          },
        },
        {
          value: {
            eyebrow: 'Jetzt bewerben',
            headline: 'Bewerbung einreichen',
            subheadline:
              'Nennen Sie die Rolle, die Sie interessiert, und teilen Sie Links zu Arbeit, auf die Sie stolz sind. Wir antworten innerhalb von drei Werktagen.',
            formNote:
              'Lieber per E-Mail? Senden Sie Lebenslauf und Portfolio direkt an careers@tafiya.co mit Rollentitel im Betreff.',
          },
        },
      ],
    },
    ar: {
      title: 'الوظائف',
      description:
        'انضم إلى tafiya — أدوار عن بُعد في المنتج والهندسة وعمليات الوجهات.',
      sections: [
        {
          value: {
            eyebrow: 'الشركة',
            headline: 'ابنِ مستقبل السفر معنا',
            subheadline:
              'نحن فريق يعمل عن بُعد أولًا يصمم أدوات تجعل تخطيط الرحلات هادئًا وشفافًا وممتعًا حقًا.',
            buttons: [{ label: 'قدّم الآن' }],
          },
        },
        {
          value: {
            eyebrow: 'الثقافة',
            headline: 'كيف نعمل',
            body: `tafiya موزعة بين لندن ولشبونة وسنغافورة، مع طقوس تتسامح مع العمل غير المتزامن وخلوات ربع سنوية في وجهات نحبها. نوظف للفضول والكتابة الواضحة والتعاطف مع المسافرين تحت ضغط حقيقي — رحلات فائتة وتغييرات تأشيرة ورحلات عائلية في اللحظة الأخيرة.


يحصل الجميع على بدل سفر وميزانية تعلم وساعات مرنة تحترم المناطق الزمنية المحلية. ننشر نطاقات الرواتب لكل دور ونبقي مقابلات التوظيف مركزة — عادة ثلاث محادثات، لا تتجاوز أسبوعين إجمالًا.`,
          },
        },
        {
          value: {
            eyebrow: 'المزايا',
            headline: 'ما يمكنك توقعه',
            items: [
              {
                title: 'عن بُعد أولًا',
                description:
                  'اعمل من أي مكان مع ساعات تداخل أساسية ولقاءين فريقيين سنويًا.',
              },
              {
                title: 'بدل السفر',
                description:
                  'ميزانية سنوية لاستكشاف مسارات جديدة وتجربة المنتج الذي تطوره.',
              },
              {
                title: 'ميزانية النمو',
                description:
                  'دورات ومؤتمرات وكتب — إن كان يطور مهارتك، ندعمه.',
              },
            ],
          },
        },
        {
          value: {
            eyebrow: 'الوظائف المفتوحة',
            headline: 'نوظف حاليًا',
            body: `### مصمم منتج أول — الرحلات وخطوط السير

قيادة مسارات التخطيط متعدد المدن وتسجيل الوصول عبر الجوال. عن بُعد (مناطق EU/UK).


### مهندس full-stack — البحث والتسعير

بناء بحث أسعار سريع وموثوق بـ Node وأدوات واجهة حديثة. عن بُعد عالميًا.


### قائد عمليات الوجهات — البحر الأبيض المتوسط

تقييم المرشدين والتفاوض على حصص الفنادق ومساءلة الشركاء الميدانيين.


لا ترى دورًا مناسبًا؟ قدّم أدناه على أي حال — نحتفظ بالملفات القوية.`,
          },
        },
        {
          value: {
            eyebrow: 'كيفية التقديم',
            headline: 'ثلاث خطوات للانضمام إلى tafiya',
            body: `### اختر دورًا

اختر وظيفة مفتوحة أعلاه، أو أخبرنا أين تضيف أكبر قيمة للتقديم العام.


### أرسل عملك

أرفق ملف أعمال أو GitHub أو LinkedIn لنفهم كيف تفكر وتنجز.


### أكمل النموذج أدناه

يراجع فريق المواهب الطلبات خلال ثلاثة أيام عمل ويتواصل لمكالمة تعريفية قصيرة عند التطابق.`,
          },
        },
        {
          value: {
            eyebrow: 'قدّم الآن',
            headline: 'أرسل طلبك',
            subheadline:
              'أخبرنا بالدور الذي يهمك وشارك روابط لعمل تفخر به. نرد خلال ثلاثة أيام عمل.',
            formNote:
              'تفضل البريد؟ أرسل سيرتك وملف أعمالك مباشرة إلى careers@tafiya.co مع عنوان الدور في الموضوع.',
          },
        },
      ],
    },
  },

  mobile: {
    fr: {
      title: 'Application mobile',
      description:
        'Téléchargez l’app tafiya pour iOS et Android — itinéraires, cartes d’embarquement et alertes prix en déplacement.',
      sections: [
        {
          value: {
            eyebrow: 'Application mobile',
            headline: 'Vos voyages dans votre poche',
            subheadline:
              'Téléchargez tafiya pour iOS et Android — itinéraires, cartes d’embarquement et alertes prix synchronisés avec votre compte web.',
            buttons: [{ label: 'Télécharger l’app' }],
          },
        },
        {
          value: {
            eyebrow: 'iOS et Android',
            headline: 'Vos voyages, toujours avec vous',
            subheadline:
              'Recherchez des vols, gérez vos réservations et recevez les changements de porte en temps réel — synchronisé avec votre compte web tafiya.',
            bullets: [
              'Accès hors ligne aux itinéraires, cartes d’embarquement et bons d’hôtel',
              'Alertes baisse de prix quand vos routes enregistrées passent sous votre objectif',
              'Connexion biométrique et stockage chiffré des documents',
            ],
          },
        },
        {
          value: {
            eyebrow: 'Fonctionnalités',
            headline: 'Conçue pour les jours de voyage',
            items: [
              {
                title: 'Frise de voyage en direct',
                description:
                  'Vols, hôtels et activités dans un itinéraire défilable qui se met à jour quand les plans changent.',
              },
              {
                title: 'Notifications intelligentes',
                description:
                  'Changements de porte, fenêtres d’enregistrement et baisses de prix — seulement les alertes activées.',
              },
              {
                title: 'Cartes d’embarquement mobiles',
                description:
                  'Passes compatibles Wallet avec actualisation automatique quand les compagnies réattribuent sièges ou portes.',
              },
            ],
          },
        },
        {
          value: {
            eyebrow: 'Configuration requise',
            headline: 'Fonctionne sur les téléphones que vous utilisez déjà',
            body: `tafiya nécessite iOS 16 ou ultérieur, ou Android 10+. Le téléchargement est gratuit — connectez-vous avec votre compte existant et vos voyages apparaissent immédiatement.


### Besoin d’aide pour l’installation ?

Écrivez à support@tafiya.co avec le modèle de votre appareil et la version du système. Pour les questions de compte ou de réservation, consultez Aide/FAQ.`,
          },
        },
        {
          value: {
            headline: 'Des questions sur l’app ?',
            subheadline:
              'Notre équipe support peut aider pour l’installation, la connexion et les paramètres de notification.',
            buttons: [{ label: 'Consulter Aide et FAQ' }, { label: 'Contacter le support' }],
          },
        },
      ],
    },
    de: {
      title: 'Mobile App',
      description:
        'Laden Sie die tafiya-App für iOS und Android — Reisepläne, Bordkarten und Preisalarme unterwegs.',
      sections: [
        {
          value: {
            eyebrow: 'Mobile App',
            headline: 'Reisepläne in der Tasche',
            subheadline:
              'Laden Sie tafiya für iOS und Android — Reisepläne, Bordkarten und Preisalarme synchron mit Ihrem Web-Konto.',
            buttons: [{ label: 'App herunterladen' }],
          },
        },
        {
          value: {
            eyebrow: 'iOS und Android',
            headline: 'Ihre Reisen, immer dabei',
            subheadline:
              'Flüge suchen, Buchungen verwalten und Gate-Änderungen in Echtzeit — synchron mit Ihrem tafiya-Web-Konto.',
            bullets: [
              'Offline-Zugriff auf Reisepläne, Bordkarten und Hotelgutscheine',
              'Preisalarme, wenn gespeicherte Routen unter Ihr Ziel fallen',
              'Biometrische Anmeldung und verschlüsselte Dokumentenspeicherung',
            ],
          },
        },
        {
          value: {
            eyebrow: 'App-Funktionen',
            headline: 'Für Reisetage gemacht',
            items: [
              {
                title: 'Live-Reise-Timeline',
                description:
                  'Flüge, Hotels und Aktivitäten in einem scrollbaren Reiseplan, der sich bei Planänderungen aktualisiert.',
              },
              {
                title: 'Smarte Benachrichtigungen',
                description:
                  'Gate-Änderungen, Check-in-Fenster und Preisdrops — nur die Alarme, die Sie aktivieren.',
              },
              {
                title: 'Mobile Bordkarten',
                description:
                  'Wallet-fähige Pässe mit automatischer Aktualisierung bei Sitz- oder Gate-Neuzuweisung.',
              },
            ],
          },
        },
        {
          value: {
            eyebrow: 'Anforderungen',
            headline: 'Läuft auf den Smartphones, die Sie bereits nutzen',
            body: `tafiya benötigt iOS 16 oder neuer oder Android 10+. Der Download ist kostenlos — melden Sie sich mit Ihrem bestehenden Konto an und Ihre Reisen erscheinen sofort.


### Hilfe bei der Installation?

Schreiben Sie an support@tafiya.co mit Gerätemodell und OS-Version. Für Konto- oder Buchungsfragen besuchen Sie Hilfe/FAQ.`,
          },
        },
        {
          value: {
            headline: 'Fragen zur App?',
            subheadline:
              'Unser Support hilft bei Installation, Login und Benachrichtigungseinstellungen.',
            buttons: [{ label: 'Hilfe und FAQ besuchen' }, { label: 'Support kontaktieren' }],
          },
        },
      ],
    },
    ar: {
      title: 'تطبيق الجوال',
      description:
        'حمّل تطبيق tafiya لـ iOS وAndroid — خطط السفر وبطاقات الصعود وتنبيهات الأسعار أثناء التنقل.',
      sections: [
        {
          value: {
            eyebrow: 'تطبيق الجوال',
            headline: 'خطط سفرك في جيبك',
            subheadline:
              'حمّل tafiya لـ iOS وAndroid — خطط السفر وبطاقات الصعود وتنبيهات الأسعار متزامنة مع حسابك على الويب.',
            buttons: [{ label: 'احصل على التطبيق' }],
          },
        },
        {
          value: {
            eyebrow: 'iOS وAndroid',
            headline: 'رحلاتك معك دائمًا',
            subheadline:
              'ابحث عن رحلات وأدر الحجوزات واستقبل تغييرات البوابة فورًا — متزامن مع حساب tafiya على الويب.',
            bullets: [
              'وصول دون اتصال لخطط السفر وبطاقات الصعود وقسائم الفنادق',
              'تنبيهات انخفاض السعر عندما تنخفض المسارات المحفوظة عن هدفك',
              'تسجيل دخول بيومتري وتخزين مشفر للمستندات',
            ],
          },
        },
        {
          value: {
            eyebrow: 'ميزات التطبيق',
            headline: 'مصمم لأيام السفر',
            items: [
              {
                title: 'جدول رحلة مباشر',
                description:
                  'رحلات طيران وفنادق وأنشطة في خطة سفر قابلة للتمرير تتحدث مع تغيّر الخطط.',
              },
              {
                title: 'إشعارات ذكية',
                description:
                  'تغييرات البوابة ونوافذ تسجيل الوصول وانخفاض الأسعار — التنبيهات التي تفعّلها فقط.',
              },
              {
                title: 'بطاقات صعود للجوال',
                description:
                  'بطاقات جاهزة للمحفظة مع تحديث تلقائي عند إعادة تعيين المقاعد أو البوابات.',
              },
            ],
          },
        },
        {
          value: {
            eyebrow: 'المتطلبات',
            headline: 'يعمل على الهواتف التي تستخدمها بالفعل',
            body: `يتطلب tafiya iOS 16 أو أحدث، أو Android 10+. التحميل مجاني — سجّل الدخول بحسابك الحالي وتظهر رحلاتك فورًا.


### تحتاج مساعدة في التثبيت؟

راسل support@tafiya.co مع طراز جهازك وإصدار النظام. لأسئلة الحساب أو الحجز، زُر المساعدة/الأسئلة الشائعة.`,
          },
        },
        {
          value: {
            headline: 'أسئلة عن التطبيق؟',
            subheadline:
              'يمكن لفريق الدعم المساعدة في التثبيت وتسجيل الدخول وإعدادات الإشعارات.',
            buttons: [{ label: 'زيارة المساعدة والأسئلة الشائعة' }, { label: 'تواصل مع الدعم' }],
          },
        },
      ],
    },
  },

  airlines: {
    fr: {
      title: 'Compagnies aériennes',
      description:
        'Comparez plus de 600 compagnies partenaires dans le monde sur tafiya — compagnies traditionnelles et low-cost.',
      sections: [
        {
          value: {
            eyebrow: 'Vols',
            headline: 'Plus de 600 compagnies partenaires',
            subheadline:
              'Une seule recherche parmi compagnies traditionnelles, low-cost et opérateurs régionaux — avec filtres alliance, cabine et escales.',
            buttons: [{ label: 'Rechercher des vols' }],
          },
        },
        {
          value: {
            eyebrow: 'Recherche intelligente',
            headline: 'Trouvez le bon tarif plus vite',
            logoTickerLabel: 'Comparez les tarifs des principales compagnies, dont',
            items: [
              {
                title: 'Filtres alliance et compagnie',
                description:
                  'Affinez par Star Alliance, oneworld, SkyTeam ou votre compagnie préférée.',
              },
              {
                title: 'Comparaison du coût réel',
                description:
                  'Voyez bagages, choix de siège et frais de modification avant de valider — pas à l’aéroport.',
              },
              {
                title: 'Rebooking en direct',
                description:
                  'Correspondance manquée ? Rebooker les itinéraires éligibles depuis l’app pendant que le support suit votre dossier.',
              },
            ],
          },
        },
        {
          value: {
            eyebrow: 'Couverture',
            headline: 'Une recherche, toutes les grandes compagnies',
            body: `tafiya récupère horaires et tarifs en direct des compagnies full-service, low-cost et régionales sur six continents. Filtrez par alliance, cabine, escales ou compagnie préférée — puis comparez le coût réel de chaque tarif avant de réserver.


L’inventaire se met à jour en quasi temps réel. Si un tarif change après avoir enregistré un voyage, nous vous prévenons pour verrouiller le meilleur prix ou ajuster les dates.


Pour des réservations corporate ou de groupe sur plusieurs compagnies, écrivez à groups@tafiya.co et notre équipe coordonnera tarifs et sièges.`,
          },
        },
        {
          value: {
            headline: 'Prêt à comparer les compagnies ?',
            subheadline:
              'Recherchez des tarifs en direct avec filtres alliance et prix tout compris — ou découvrez comment les frais sont affichés avant le paiement.',
            buttons: [{ label: 'Rechercher des vols' }, { label: 'Comprendre les frais aériens' }],
          },
        },
      ],
    },
    de: {
      title: 'Fluggesellschaften',
      description:
        'Vergleichen Sie über 600 Airline-Partner weltweit auf tafiya — Netzcarrier und Low-Cost-Airlines.',
      sections: [
        {
          value: {
            eyebrow: 'Flüge',
            headline: 'Über 600 Airline-Partner',
            subheadline:
              'Eine Suche über Netzcarrier, Low-Cost-Airlines und Regionalflieger — mit Filtern für Allianz, Kabine und Stopps.',
            buttons: [{ label: 'Flüge suchen' }],
          },
        },
        {
          value: {
            eyebrow: 'Smarter suchen',
            headline: 'Den richtigen Tarif schneller finden',
            logoTickerLabel: 'Tarife führender Carrier vergleichen, darunter',
            items: [
              {
                title: 'Allianz- und Airline-Filter',
                description:
                  'Ergebnisse nach Star Alliance, oneworld, SkyTeam oder bevorzugter Airline eingrenzen.',
              },
              {
                title: 'Echter Kostenvergleich',
                description:
                  'Gepäck, Sitzwahl und Änderungsgebühren vor der Buchung sehen — nicht am Flughafen.',
              },
              {
                title: 'Live-Umbuchung',
                description:
                  'Anschluss verpasst? Berechtigte Reisepläne in der App umbuchen, während der Support Ihren Fall verfolgt.',
              },
            ],
          },
        },
        {
          value: {
            eyebrow: 'Abdeckung',
            headline: 'Eine Suche, alle großen Carrier',
            body: `tafiya zieht Live-Flugpläne und Tarife von Full-Service-Airlines, Low-Cost-Carriern und Regionalfliegern auf sechs Kontinenten. Filtern Sie nach Allianz, Kabine, Stopps oder bevorzugter Airline — und vergleichen Sie die echten Kosten jedes Tarifs vor der Buchung.


Das Inventar aktualisiert sich nahezu in Echtzeit. Ändert sich ein Tarif nach dem Speichern einer Reise, benachrichtigen wir Sie, damit Sie den besseren Preis sichern oder Termine anpassen können.


Für Firmen- oder Gruppenbuchungen über mehrere Carrier schreiben Sie an groups@tafiya.co — unser Team koordiniert Tarife und Sitzplätze.`,
          },
        },
        {
          value: {
            headline: 'Bereit, Airlines zu vergleichen?',
            subheadline:
              'Live-Tarife mit Allianzfiltern und All-in-Preisen suchen — oder erfahren, wie Gebühren vor dem Checkout angezeigt werden.',
            buttons: [{ label: 'Flüge suchen' }, { label: 'Airline-Gebühren verstehen' }],
          },
        },
      ],
    },
    ar: {
      title: 'شركات الطيران',
      description:
        'قارن أكثر من 600 شريك طيران حول العالم على tafiya — شركات تقليدية ومنخفضة التكلفة.',
      sections: [
        {
          value: {
            eyebrow: 'رحلات الطيران',
            headline: 'أكثر من 600 شريك طيران',
            subheadline:
              'بحث واحد عبر شركات تقليدية ومنخفضة التكلفة ومشغلين إقليميين — مع فلاتر للتحالف والدرجة والتوقف.',
            buttons: [{ label: 'البحث عن رحلات' }],
          },
        },
        {
          value: {
            eyebrow: 'بحث أذكى',
            headline: 'اعثر على السعر المناسب أسرع',
            logoTickerLabel: 'قارن الأسعار عبر شركات رائدة بما في ذلك',
            items: [
              {
                title: 'فلاتر التحالف وشركة الطيران',
                description:
                  'ضيّق النتائج حسب Star Alliance أو oneworld أو SkyTeam أو شركتك المفضلة.',
              },
              {
                title: 'مقارنة التكلفة الحقيقية',
                description:
                  'اعرض الأمتعة واختيار المقعد ورسوم التغيير قبل الالتزام — وليس في المطار.',
              },
              {
                title: 'إعادة حجز مباشرة',
                description:
                  'فاتتك رحلة الربط؟ أعد حجز المسارات المؤهلة من التطبيق بينما يتابع الدعم حالتك.',
              },
            ],
          },
        },
        {
          value: {
            eyebrow: 'التغطية',
            headline: 'بحث واحد، كل الشركات الكبرى',
            body: `يجلب tafiya جداول وأسعار مباشرة من شركات الخدمة الكاملة والمنخفضة التكلفة والإقليمية عبر ست قارات. فلتر حسب التحالف والدرجة والتوقف أو شركة الطيران المفضلة — ثم قارن التكلفة الحقيقية لكل سعر قبل الحجز.


يُحدَّث المخزون شبه فوريًا. إذا تغيّر السعر بعد حفظ رحلة، نُعلمك لتثبيت السعر الأفضل أو تعديل التواريخ.


لحجوزات الشركات أو المجموعات عبر عدة شركات، راسل groups@tafiya.co وسينسق فريقنا الأسعار والمقاعد.`,
          },
        },
        {
          value: {
            headline: 'مستعد لمقارنة شركات الطيران؟',
            subheadline:
              'ابحث عن أسعار مباشرة مع فلاتر التحالف والتسعير الشامل — أو تعرّف كيف تُعرض الرسوم قبل الدفع.',
            buttons: [{ label: 'البحث عن رحلات' }, { label: 'فهم رسوم شركات الطيران' }],
          },
        },
      ],
    },
  },

  'help-faq': {
    fr: {
      title: 'Aide et FAQ',
      description:
        'Réponses sur les réservations, paiements, annulations et le support compte tafiya.',
      sections: [
        {
          value: {
            eyebrow: 'Support',
            headline: 'Comment pouvons-nous vous aider ?',
            subheadline:
              'Parcourez les questions fréquentes ou contactez notre équipe — nous répondons sous un jour ouvré.',
          },
        },
        {
          value: {
            eyebrow: 'Réservations',
            headline: 'Avant de voyager',
            body: `### Comment modifier mes dates ?

Ouvrez votre voyage dans l’app ou le tableau de bord web, sélectionnez Modifier les dates et choisissez parmi la disponibilité en direct. Les frais de modification de la compagnie ou de l’hôtel s’affichent avant confirmation.


### Puis-je ajouter des bagages après réservation ?

Oui — allez dans les détails du vol et appuyez sur Ajouter des bagages. Les prix viennent directement de la compagnie et peuvent être plus bas en achat anticipé.


### Où sont mes documents ?

Cartes d’embarquement, bons d’hôtel et billets d’activité se trouvent sous Documents dans chaque voyage. Vous pouvez les transférer à vos compagnons de voyage depuis le même écran.`,
          },
        },
        {
          value: {
            eyebrow: 'Paiements',
            headline: 'Facturation et remboursements',
            body: `### Quels moyens de paiement acceptez-vous ?

Cartes de crédit et débit majeures, Apple Pay, Google Pay et virement bancaire pour certains forfaits au-delà de 2 000 £.


### Quand suis-je débité ?

Vols et hôtels sont facturés à la réservation sauf si le tarif est réservable — les options de mise en attente affichent une date d’expiration claire au paiement.


### Comment fonctionnent les remboursements ?

L’éligibilité dépend des règles tarifaires affichées avant achat. Les remboursements approuvés reviennent sur votre moyen de paiement d’origine sous 5 à 10 jours ouvrés.`,
          },
        },
        {
          value: {
            eyebrow: 'Compte',
            headline: 'Profil et sécurité',
            body: `### J’ai oublié mon mot de passe

Utilisez Mot de passe oublié sur l’écran de connexion. Les liens de réinitialisation expirent après 24 heures pour la sécurité.


### Comment supprimer mon compte ?

Écrivez à privacy@tafiya.co depuis l’adresse de votre compte. Nous finalisons la suppression sous 30 jours et confirmons par e-mail.


Toujours bloqué ? Contactez support@tafiya.co ou appelez le +44 20 7946 0958 du lundi au vendredi, 9h00–18h00 GMT.`,
          },
        },
        {
          value: {
            eyebrow: 'Contactez-nous',
            headline: 'Parler à un spécialiste',
            subheadline:
              'Partagez votre référence de réservation et nous reprenons là où la FAQ s’arrête.',
            formNote:
              'Incluez votre ID de voyage pour une aide plus rapide. Pour la presse, utilisez press@tafiya.co.',
          },
        },
      ],
    },
    de: {
      title: 'Hilfe und FAQ',
      description:
        'Antworten zu tafiya-Buchungen, Zahlungen, Stornierungen und Kontosupport.',
      sections: [
        {
          value: {
            eyebrow: 'Support',
            headline: 'Wie können wir helfen?',
            subheadline:
              'Durchsuchen Sie häufige Fragen oder erreichen Sie unser Team — wir antworten innerhalb eines Werktags.',
          },
        },
        {
          value: {
            eyebrow: 'Buchungen',
            headline: 'Vor der Reise',
            body: `### Wie ändere ich meine Daten?

Öffnen Sie Ihre Reise in der App oder im Web-Dashboard, wählen Sie Daten ändern und entscheiden Sie aus Live-Verfügbarkeit. Änderungsgebühren von Airline oder Hotel werden vor Bestätigung angezeigt.


### Kann ich nach der Buchung Gepäck hinzufügen?

Ja — gehen Sie zu Ihren Flugdetails und tippen Sie Gepäck hinzufügen. Preise kommen direkt von der Airline und können im Voraus günstiger sein.


### Wo sind meine Dokumente?

Bordkarten, Hotelgutscheine und Aktivitätstickets finden Sie unter Dokumente in jeder Reise. Sie können sie von dort an Mitreisende weiterleiten.`,
          },
        },
        {
          value: {
            eyebrow: 'Zahlungen',
            headline: 'Abrechnung und Erstattungen',
            body: `### Welche Zahlungsmethoden akzeptieren Sie?

Gängige Kredit- und Debitkarten, Apple Pay, Google Pay und Banküberweisung für ausgewählte Pakete über £2.000.


### Wann werde ich belastet?

Flüge und Hotels werden bei Buchung belastet, außer der Tarif ist haltbar — Halteoptionen zeigen eine klare Ablaufzeit beim Checkout.


### Wie funktionieren Erstattungen?

Die Erstattungsfähigkeit hängt von den vor dem Kauf angezeigten Tarifregeln ab. Genehmigte Erstattungen gehen innerhalb von 5–10 Werktagen auf Ihre ursprüngliche Zahlungsmethode zurück.`,
          },
        },
        {
          value: {
            eyebrow: 'Konto',
            headline: 'Profil und Sicherheit',
            body: `### Ich habe mein Passwort vergessen

Nutzen Sie Passwort vergessen auf dem Anmeldebildschirm. Reset-Links laufen aus Sicherheitsgründen nach 24 Stunden ab.


### Wie lösche ich mein Konto?

Schreiben Sie an privacy@tafiya.co von der Adresse Ihres Kontos. Wir schließen die Löschung innerhalb von 30 Tagen ab und bestätigen per E-Mail.


Immer noch nicht weiter? Kontaktieren Sie support@tafiya.co oder rufen Sie +44 20 7946 0958 Montag–Freitag, 9:00–18:00 GMT an.`,
          },
        },
        {
          value: {
            eyebrow: 'Kontaktieren Sie uns',
            headline: 'Mit einem Spezialisten sprechen',
            subheadline:
              'Teilen Sie Ihre Buchungsreferenz und wir setzen dort an, wo die FAQ aufhört.',
            formNote:
              'Geben Sie Ihre Reise-ID für schnellere Hilfe an. Für Presseanfragen nutzen Sie press@tafiya.co.',
          },
        },
      ],
    },
    ar: {
      title: 'المساعدة والأسئلة الشائعة',
      description:
        'إجابات عن حجوزات tafiya والمدفوعات والإلغاءات ودعم الحساب.',
      sections: [
        {
          value: {
            eyebrow: 'الدعم',
            headline: 'كيف يمكننا مساعدتك؟',
            subheadline:
              'تصفح الأسئلة الشائعة أو تواصل مع فريقنا — نرد خلال يوم عمل واحد.',
          },
        },
        {
          value: {
            eyebrow: 'الحجوزات',
            headline: 'قبل السفر',
            body: `### كيف أغيّر تواريخي؟

افتح رحلتك في التطبيق أو لوحة الويب، اختر تغيير التواريخ واختر من التوفر المباشر. تظهر رسوم التغيير من شركة الطيران أو الفندق قبل التأكيد.


### هل يمكنني إضافة أمتعة بعد الحجز؟

نعم — اذهب إلى تفاصيل الرحلة واضغط إضافة أمتعة. الأسعار تأتي مباشرة من شركة الطيران وقد تكون أقل عند الشراء مسبقًا.


### أين مستنداتي؟

بطاقات الصعود وقسائم الفنادق وتذاكر الأنشطة تحت المستندات في كل رحلة. يمكنك إرسالها لرفاق السفر من نفس الشاشة.`,
          },
        },
        {
          value: {
            eyebrow: 'المدفوعات',
            headline: 'الفوترة والاسترداد',
            body: `### ما طرق الدفع المقبولة؟

بطاقات ائتمان وخصم رئيسية وApple Pay وGoogle Pay وتحويل بنكي لبعض الباقات فوق £2,000.


### متى يُخصم المبلغ؟

تُخصم رحلات الطيران والفنادق عند الحجز ما لم يكن السعر قابلًا للتعليق — خيارات التعليق تعرض وقت انتهاء واضحًا عند الدفع.


### كيف تعمل الاستردادات؟

يعتمد الأهلية على قواعد السعر المعروضة قبل الشراء. تعود المبالغ المعتمدة لطريقة الدفع الأصلية خلال 5–10 أيام عمل.`,
          },
        },
        {
          value: {
            eyebrow: 'الحساب',
            headline: 'الملف والأمان',
            body: `### نسيت كلمة المرور

استخدم نسيت كلمة المرور في شاشة تسجيل الدخول. تنتهي روابط إعادة التعيين بعد 24 ساعة للأمان.


### كيف أحذف حسابي؟

راسل privacy@tafiya.co من عنوان بريد حسابك. نكمل الحذف خلال 30 يومًا ونؤكد بالبريد.


ما زلت عالقًا؟ تواصل support@tafiya.co أو اتصل +44 20 7946 0958 من الاثنين إلى الجمعة، 9:00–18:00 بتوقيت غرينتش.`,
          },
        },
        {
          value: {
            eyebrow: 'اتصل بنا',
            headline: 'تحدث مع أخصائي',
            subheadline:
              'شارك مرجع حجزك ونكمل من حيث توقفت الأسئلة الشائعة.',
            formNote:
              'أدرج معرف رحلتك لمساعدة أسرع. لاستفسارات الصحافة استخدم press@tafiya.co.',
          },
        },
      ],
    },
  },

  'low-fare-tips': {
    fr: {
      title: 'Conseils petits prix',
      description:
        'Conseils pratiques pour trouver des vols moins chers avec tafiya — dates flexibles, alertes et routage malin.',
      sections: [
        {
          value: {
            eyebrow: 'Guides',
            headline: 'Voyagez plus malin, dépensez moins',
            subheadline:
              'Dates flexibles, aéroports voisins et périodes inter-saison peuvent réduire fortement les tarifs.',
          },
        },
        {
          value: {
            eyebrow: 'Gains rapides',
            headline: 'Quatre habitudes qui baissent les tarifs',
            items: [
              {
                title: 'Dates flexibles',
                description:
                  'Décalez le départ d’un jour ou deux — les vols en milieu de semaine sont souvent 20 à 30 % moins chers sur les routes populaires.',
              },
              {
                title: 'Aéroports voisins',
                description:
                  'Incluez des aéroports alternatifs dans un rayon de deux heures pour débloquer les low-cost.',
              },
              {
                title: 'Alertes prix',
                description:
                  'Enregistrez une recherche et nous vous e-mailons quand le tarif passe sous votre objectif.',
              },
            ],
          },
        },
        {
          value: {
            eyebrow: 'Stratégies avancées',
            headline: 'Quand réserver et comment router',
            body: `### Réserver en inter-saison

L’Europe en avril ou octobre, l’Asie du Sud-Est en début de mousson et les stations de ski fin mars combinent souvent bon temps et demande plus faible.


### Mixer les compagnies avec discernement

Deux allers simples sur des compagnies différentes peuvent battre un aller-retour — tafiya signale les temps de correspondance pour laisser assez de marge.


### Créer des alertes tôt

Pour les fêtes de pointe, créez une alerte 4 à 6 mois à l’avance. Nous suivons l’évolution quotidienne et mettons en avant le jour le moins cher selon les tendances historiques de votre route.


Vous voulez des idées de routage personnalisées ? Écrivez à support@tafiya.co avec votre aéroport de départ et le mois de voyage.`,
          },
        },
        {
          value: {
            headline: 'Lancer une alerte prix',
            subheadline:
              'Recherchez votre route, appuyez sur Enregistrer et nous vous prévenons quand les tarifs baissent.',
            buttons: [{ label: 'Rechercher des vols' }],
          },
        },
      ],
    },
    de: {
      title: 'Tipps für günstige Tarife',
      description:
        'Praktische Tipps für günstigere Flüge mit tafiya — flexible Daten, Alarme und smartes Routing.',
      sections: [
        {
          value: {
            eyebrow: 'Guides',
            headline: 'Smarter reisen, weniger ausgeben',
            subheadline:
              'Flexible Daten, nahegelegene Flughäfen und Nebensaison-Fenster können Tarife deutlich senken.',
          },
        },
        {
          value: {
            eyebrow: 'Schnelle Erfolge',
            headline: 'Vier Gewohnheiten für niedrigere Tarife',
            items: [
              {
                title: 'Flexible Daten',
                description:
                  'Abflug um einen oder zwei Tage verschieben — Wochenmitte-Flüge sind auf beliebten Routen oft 20–30 % günstiger.',
              },
              {
                title: 'Nahegelegene Flughäfen',
                description:
                  'Alternative Flughäfen im Radius von zwei Stunden einbeziehen, um Low-Cost-Carrier freizuschalten.',
              },
              {
                title: 'Preisalarme',
                description:
                  'Suche speichern und wir mailen, wenn der Tarif unter Ihr Ziel fällt.',
              },
            ],
          },
        },
        {
          value: {
            eyebrow: 'Tiefere Strategien',
            headline: 'Wann buchen und wie routen',
            body: `### In der Nebensaison buchen

Europa im April oder Oktober, Südostasien zu Regensaisonbeginn und Skigebiete Ende März verbinden oft gutes Wetter mit geringerer Nachfrage.


### Carrier durchdacht mischen

Zwei One-Ways bei verschiedenen Airlines können Round-Trip schlagen — tafiya markiert Self-Transfer-Zeiten für ausreichend Puffer.


### Früh Alarme setzen

Für Feiertagsspitzen Alarm 4–6 Monate vorher erstellen. Wir verfolgen tägliche Preisbewegungen und heben den günstigsten Kauftag nach historischen Routentrends hervor.


Persönliche Routing-Ideen gewünscht? Schreiben Sie an support@tafiya.co mit Heimatflughafen und Reisemonat.`,
          },
        },
        {
          value: {
            headline: 'Preisalarm starten',
            subheadline:
              'Suchen Sie Ihre Route, tippen Sie Speichern und wir benachrichtigen bei Preisrückgang.',
            buttons: [{ label: 'Flüge suchen' }],
          },
        },
      ],
    },
    ar: {
      title: 'نصائح الأسعار المنخفضة',
      description:
        'نصائح عملية لإيجاد رحلات أرخص مع tafiya — تواريخ مرنة وتنبيهات وتوجيه ذكي.',
      sections: [
        {
          value: {
            eyebrow: 'أدلة',
            headline: 'سافر بذكاء وأنفق أقل',
            subheadline:
              'التواريخ المرنة والمطارات القريبة ونوافذ ما بين المواسم قد تخفض الأسعار بشكل كبير.',
          },
        },
        {
          value: {
            eyebrow: 'مكاسب سريعة',
            headline: 'أربع عادات تخفض الأسعار',
            items: [
              {
                title: 'تواريخ مرنة',
                description:
                  'غيّر المغادرة يومًا أو يومين — رحلات منتصف الأسبوع غالبًا أرخص بنسبة 20–30% على المسارات الشائعة.',
              },
              {
                title: 'مطارات قريبة',
                description:
                  'أدرج مطارات بديلة ضمن نطاق ساعتين لفتح شركات منخفضة التكلفة.',
              },
              {
                title: 'تنبيهات الأسعار',
                description:
                  'احفظ بحثًا ونرسل بريدًا عندما ينخفض السعر عن هدفك.',
              },
            ],
          },
        },
        {
          value: {
            eyebrow: 'استراتيجيات أعمق',
            headline: 'متى تحجز وكيف توجّه المسار',
            body: `### احجز في المواسم الوسطى

أوروبا في أبريل أو أكتوبر، وجنوب شرق آسيا في بداية الموسم الماطر، ومنتجعات التزلج أواخر مارس تجمع غالبًا طقسًا جيدًا وطلبًا أقل.


### امزج الشركات بعناية

تذكرتان ذهاب باتجاه واحد على شركتين مختلفتين قد تتفوق على الذهاب والعودة — يُبرز tafiya أوقات التحويل الذاتي لتترك هامشًا كافيًا.


### أنشئ تنبيهات مبكرًا

للعطلات المزدحمة، أنشئ تنبيهًا قبل 4–6 أشهر. نتتبع حركة السعر اليومية ونبرز أرخص يوم للشراء وفق الاتجاهات التاريخية لمسارك.


تريد أفكار توجيه مخصصة؟ راسل support@tafiya.co مع مطارك وشهر السفر.`,
          },
        },
        {
          value: {
            headline: 'ابدأ تنبيه سعر',
            subheadline:
              'ابحث عن مسارك واضغط حفظ وسنُعلمك عند انخفاض الأسعار.',
            buttons: [{ label: 'البحث عن رحلات' }],
          },
        },
      ],
    },
  },

  'airline-fees': {
    fr: {
      title: 'Frais aériens',
      description:
        'Comprenez les frais de bagages, sièges et modifications avant de réserver sur tafiya.',
      sections: [
        {
          value: {
            eyebrow: 'Vols',
            headline: 'Comprenez les frais aériens dès le départ',
            subheadline:
              'Nous affichons bagages, choix de siège et frais de modification avant le paiement pour comparer le coût réel de chaque tarif.',
          },
        },
        {
          value: {
            eyebrow: 'Types de frais',
            headline: 'Ce que nous montrons avant de payer',
            items: [
              {
                title: 'Bagages',
                description:
                  'Franchises cabine et soute, plus prix des bagages prépayés quand les compagnies les fournissent.',
              },
              {
                title: 'Choix de siège',
                description:
                  'Sièges standard, préférés et extra espace jambes avec prix par segment.',
              },
              {
                title: 'Modifications et annulations',
                description:
                  'Frais de modification et estimations d’écart tarifaire pour changements de date ou d’itinéraire.',
              },
            ],
          },
        },
        {
          value: {
            eyebrow: 'Pourquoi c’est important',
            headline: 'Pas de surprises à l’aéroport',
            body: `Les tarifs basic economy peuvent sembler bon marché jusqu’à l’ajout des frais bagages et siège. tafiya étiquette chaque tarif avec une estimation tout compris quand les compagnies partagent les données, et signale quand un billet economy classique inclut un bagage en soute.


Certaines low-cost facturent les bagages cabine qui passent en soute. Nous le signalons dans les résultats pour comparer avec les options full-service sur la même route.


Les données de frais viennent des compagnies et peuvent changer sans préavis. Les montants finaux sont confirmés sur l’écran de paiement de la compagnie avant paiement. Questions sur un tarif précis ? Écrivez à support@tafiya.co avec votre route et dates de voyage.`,
          },
        },
        {
          value: {
            headline: 'Comparer les tarifs tout compris',
            subheadline:
              'Recherchez des vols avec le détail des frais visible dès le premier résultat.',
            buttons: [{ label: 'Rechercher des vols' }],
          },
        },
      ],
    },
    de: {
      title: 'Airline-Gebühren',
      description:
        'Verstehen Sie Gepäck-, Sitz- und Änderungsgebühren, bevor Sie auf tafiya buchen.',
      sections: [
        {
          value: {
            eyebrow: 'Flüge',
            headline: 'Airline-Gebühren von Anfang an verstehen',
            subheadline:
              'Wir zeigen Gepäck, Sitzwahl und Änderungsgebühren vor dem Checkout, damit Sie die echten Kosten jedes Tarifs vergleichen.',
          },
        },
        {
          value: {
            eyebrow: 'Gebührenarten',
            headline: 'Was wir vor der Zahlung anzeigen',
            items: [
              {
                title: 'Gepäck',
                description:
                  'Handgepäck- und Aufgabegepäck-Freigaben plus Prepaid-Gepäckpreise, wenn Airlines sie bereitstellen.',
              },
              {
                title: 'Sitzwahl',
                description:
                  'Standard-, Preferred- und Extra-Beinfreiheit-Sitze mit Preisen pro Segment.',
              },
              {
                title: 'Änderungen und Stornierungen',
                description:
                  'Airline-Änderungsgebühren und Schätzungen der Tarifdifferenz bei Datums- oder Routenänderung.',
              },
            ],
          },
        },
        {
          value: {
            eyebrow: 'Warum das wichtig ist',
            headline: 'Keine Überraschungen am Flughafen',
            body: `Basic-Economy-Tarife wirken günstig, bis Gepäck- und Sitzgebühren addiert werden. tafiya kennzeichnet jeden Tarif mit einer All-in-Schätzung, wenn Airlines Gebührendaten teilen, und hebt hervor, wenn ein Legacy-Economy-Ticket aufgegebenes Gepäck enthält.


Manche Low-Cost-Carrier berechnen Handgepäck, das ins Overhead passt. Wir weisen darauf in den Suchergebnissen hin, damit Sie mit Full-Service-Optionen auf derselben Route vergleichen können.


Gebührendaten stammen von Airlines und können sich ohne Vorankündigung ändern. Endbeträge werden auf dem Airline-Checkout-Bildschirm vor Zahlung bestätigt. Fragen zu einem bestimmten Tarif? Schreiben Sie an support@tafiya.co mit Route und Reisedaten.`,
          },
        },
        {
          value: {
            headline: 'All-in-Tarife vergleichen',
            subheadline:
              'Flüge suchen mit sichtbarer Gebührenaufschlüsselung ab dem ersten Ergebnis.',
            buttons: [{ label: 'Flüge suchen' }],
          },
        },
      ],
    },
    ar: {
      title: 'رسوم شركات الطيران',
      description:
        'افهم رسوم الأمتعة والمقاعد والتغيير قبل الحجز على tafiya.',
      sections: [
        {
          value: {
            eyebrow: 'رحلات الطيران',
            headline: 'افهم رسوم شركات الطيران مبكرًا',
            subheadline:
              'نعرض رسوم الأمتعة واختيار المقعد والتغيير قبل الدفع لمقارنة التكلفة الحقيقية لكل سعر.',
          },
        },
        {
          value: {
            eyebrow: 'أنواع الرسوم',
            headline: 'ما نعرضه قبل الدفع',
            items: [
              {
                title: 'الأمتعة',
                description:
                  'حصص اليد والشحن، وأسعار الأمتعة المدفوعة مسبقًا عندما توفرها الشركات.',
              },
              {
                title: 'اختيار المقعد',
                description:
                  'مقاعد عادية ومفضلة ومساحة إضافية للساقين بأسعار لكل مقطع.',
              },
              {
                title: 'التغييرات والإلغاء',
                description:
                  'رسوم تغيير شركة الطيران وتقديرات فرق السعر لتغيير التاريخ أو المسار.',
              },
            ],
          },
        },
        {
          value: {
            eyebrow: 'لماذا يهم',
            headline: 'لا مفاجآت في المطار',
            body: `قد تبدو أسعار الاقتصاد الأساسي رخيصة حتى تُضاف رسوم الأمتعة والمقاعد. يُوسم tafiya كل سعر بتقدير شامل عندما تشارك الشركات بيانات الرسوم، ويُبرز عندما يتضمن تذكرة اقتصاد تقليدية حقيبة مشحونة.


تفرض بعض شركات منخفضة التكلفة رسومًا على حقائب المقصورة التي تدخل العلوية. نوضح ذلك في نتائج البحث لمقارنتها بخيارات الخدمة الكاملة على نفس المسار.


تأتي بيانات الرسوم من شركات الطيران وقد تتغير دون إشعار. تُؤكد المبالغ النهائية على شاشة دفع الشركة قبل الدفع. أسئلة عن سعر محدد؟ راسل support@tafiya.co مع مسارك وتواريخ السفر.`,
          },
        },
        {
          value: {
            headline: 'قارن الأسعار الشاملة',
            subheadline:
              'ابحث عن رحلات مع تفصيل الرسوم ظاهرًا من أول نتيجة.',
            buttons: [{ label: 'البحث عن رحلات' }],
          },
        },
      ],
    },
  },
};
