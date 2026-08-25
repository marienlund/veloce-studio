/* ==========================================================================
   VELOCE STUDIO — INTERACTIVE WEBSITE BUILDER ENGINE WITH AI COPYWRITER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // ── 1. STUDIO STATE & DEFAULTS ──────────────────────────────────────────
  const state = {
    layoutArchetype: "saas-launchpad",
    brandName: "Aura Studio",
    tagline: "Fremtidens digitale løsninger",
    heroTitle: "Skab resultater med din virksomhed",
    heroDesc: "Vi leverer skræddersyede løsninger, der forvandler din vision til virkelighed. Oplev lynhurtig performance og kompromisløs kvalitet.",
    ctaText: "Få et Uforpligtende Tilbud",
    aboutText: "Vi udfører professionelt arbejde med stor stolthed og dedikation. Vores mål er altid 100% tilfredse kunder og kvalitetsløsninger der holder.",
    contactPhone: "+45 29 80 07 93",
    contactEmail: "kontakt@aura-studio.dk",
    customOverrides: {}, // Map of elementId -> custom innerHTML text edited by user
    logoIcon: "fa-rocket",
    heroImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?auto=format&fit=crop&w=1200&q=80",
    userPhotos: [
      { id: "init_1", name: "Håndværk & Byg", src: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?auto=format&fit=crop&w=1000&q=80", slot: "hero" },
      { id: "init_2", name: "Kvalitetsarbejde", src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80", slot: "auto" },
      { id: "init_3", name: "Facader & Detaljer", src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80", slot: "auto" }
    ],
    colorPrimary: "#7c3aed",
    colorSecondary: "#06b6d4",
    colorBg: "#0f172a",
    colorText: "#f8fafc",
    bgMode: "light",
    fontPair: "outfit-inter",
    buttonShape: "pill",
    buttonEffect: "glow",
    navStyle: "glass-sticky",
    heroLayout: "split-image",
    mobilepayNumber: "88888",
    stripeLink: "https://buy.stripe.com/demo",
    bookingLink: "https://calendly.com",
    sections: {
      payment: true,
      features: true,
      showcase: true,
      pricing: true,
      testimonials: true,
      faq: true,
      contact: true
    },
    isPaid: false
  };

  // ── 2. DOM ELEMENTS ─────────────────────────────────────────────────────
  const previewViewport = document.getElementById('previewViewport');
  const deviceFrame = document.getElementById('deviceFrame');
  const viewportLabel = document.getElementById('viewportLabel');
  const previewUrl = document.getElementById('previewUrl');

  const selectAiIndustry = document.getElementById('selectAiIndustry');
  const inputCustomKeyword = document.getElementById('inputCustomKeyword');
  const btnRunAiCopywriter = document.getElementById('btnRunAiCopywriter');

  const selectLayoutArchetype = document.getElementById('selectLayoutArchetype');
  const inputBrandName = document.getElementById('inputBrandName');
  const inputTagline = document.getElementById('inputTagline');

  const inputHeroTitle = document.getElementById('inputHeroTitle');
  const inputHeroDesc = document.getElementById('inputHeroDesc');
  const inputCtaText = document.getElementById('inputCtaText');
  const inputAboutText = document.getElementById('inputAboutText');
  const inputContactPhone = document.getElementById('inputContactPhone');
  const inputContactEmail = document.getElementById('inputContactEmail');

  const inputMultipleImages = document.getElementById('inputMultipleImages');
  const uploadedGalleryGrid = document.getElementById('uploadedGalleryGrid');
  const emptyGalleryMsg = document.getElementById('emptyGalleryMsg');
  const uploadedCount = document.getElementById('uploadedCount');
  const stockPresetGrid = document.getElementById('stockPresetGrid');

  const colorPrimary = document.getElementById('colorPrimary');
  const colorSecondary = document.getElementById('colorSecondary');
  const colorBg = document.getElementById('colorBg');
  const colorText = document.getElementById('colorText');

  const hexPrimary = document.getElementById('hexPrimary');
  const hexSecondary = document.getElementById('hexSecondary');
  const hexBg = document.getElementById('hexBg');
  const hexText = document.getElementById('hexText');

  const selectFontPair = document.getElementById('selectFontPair');
  const selectNavStyle = document.getElementById('selectNavStyle');
  const selectHeroLayout = document.getElementById('selectHeroLayout');

  // Payment Inputs & Toggles
  const chkPayment = document.getElementById('chkPayment');
  const inputMobilePay = document.getElementById('inputMobilePay');
  const inputStripeLink = document.getElementById('inputStripeLink');
  const inputBookingLink = document.getElementById('inputBookingLink');

  if (chkPayment) {
    chkPayment.addEventListener('change', (e) => {
      state.sections.payment = e.target.checked;
      updateLivePreview();
    });
  }
  if (inputMobilePay) {
    inputMobilePay.addEventListener('input', (e) => {
      state.mobilepayNumber = e.target.value;
      updateLivePreview();
    });
  }
  if (inputStripeLink) {
    inputStripeLink.addEventListener('input', (e) => {
      state.stripeLink = e.target.value;
      updateLivePreview();
    });
  }
  if (inputBookingLink) {
    inputBookingLink.addEventListener('input', (e) => {
      state.bookingLink = e.target.value;
      updateLivePreview();
    });
  }

  const chkFeatures = document.getElementById('chkFeatures');
  const chkShowcase = document.getElementById('chkShowcase');
  const chkPricing = document.getElementById('chkPricing');
  const chkTestimonials = document.getElementById('chkTestimonials');
  const chkFaq = document.getElementById('chkFaq');
  const chkContact = document.getElementById('chkContact');

  const btnGenerate = document.getElementById('btnGenerate');
  const btnSurprise = document.getElementById('btnSurprise');
  const btnCheckout = document.getElementById('btnCheckout');
  const btnFullscreen = document.getElementById('btnFullscreen');
  
  // Checkout Modal Elements
  const modalCheckout = document.getElementById('modalCheckout');
  const btnCloseCheckout = document.getElementById('btnCloseCheckout');
  const checkoutStepOrder = document.getElementById('checkoutStepOrder');
  const checkoutStepSuccess = document.getElementById('checkoutStepSuccess');
  const payFormCard = document.getElementById('payFormCard');
  const payFormMobilePay = document.getElementById('payFormMobilePay');
  const btnSubmitPayment = document.getElementById('btnSubmitPayment');
  const receiptId = document.getElementById('receiptId');
  const btnDownloadZip = document.getElementById('btnDownloadZip');
  const btnDownloadSingleHtml = document.getElementById('btnDownloadSingleHtml');

  const loaderOverlay = document.getElementById('loaderOverlay');
  const loaderFill = document.getElementById('loaderFill');
  const loaderTitle = document.getElementById('loaderTitle');
  const loaderStatusText = document.getElementById('loaderStatusText');

  // ── 3. AI COPYWRITER KNOWLEDGE BASE (10 INDUSTRIES) ──────────────────────
      const presets = {
    cyberpunk: { primary: "#7c3aed", secondary: "#06b6d4", bg: "#0f172a", text: "#f8fafc", icon: "fa-wand-magic-sparkles", bgMode: "dark", archetype: "saas-launchpad" },
    emerald: { primary: "#059669", secondary: "#34d399", bg: "#064e3b", text: "#f0fdf4", icon: "fa-gem", bgMode: "mint", archetype: "bento-grid" },
    sunset: { primary: "#f43f5e", secondary: "#fb923c", bg: "#fff1f2", text: "#881337", icon: "fa-sun", bgMode: "blush", archetype: "zigzag-story" },
    oceanic: { primary: "#0284c7", secondary: "#38bdf8", bg: "#f0f9ff", text: "#0c4a6e", icon: "fa-water", bgMode: "skyblue", archetype: "executive-biz" },
    minimal: { primary: "#334155", secondary: "#64748b", bg: "#ffffff", text: "#0f172a", icon: "fa-cube", bgMode: "light", archetype: "portfolio-focus" },
    nordic: { primary: "#0f766e", secondary: "#2dd4bf", bg: "#faf8f5", text: "#451a03", icon: "fa-snowflake", bgMode: "cream", archetype: "local-craft" },
    executive: { primary: "#d97706", secondary: "#fbbf24", bg: "#faf8f5", text: "#451a03", icon: "fa-briefcase", bgMode: "cream", archetype: "executive-biz" },
    neonpink: { primary: "#ec4899", secondary: "#f472b6", bg: "#fff1f2", text: "#881337", icon: "fa-bolt", bgMode: "blush", archetype: "saas-launchpad" },
    bordeaux: { primary: "#9f1239", secondary: "#f43f5e", bg: "#fff1f2", text: "#881337", icon: "fa-crown", bgMode: "blush", archetype: "portfolio-focus" },
    sage: { primary: "#15803d", secondary: "#84cc16", bg: "#f0fdf4", text: "#14532d", icon: "fa-leaf", bgMode: "mint", archetype: "local-craft" },
    cosmic: { primary: "#6d28d9", secondary: "#a78bfa", bg: "#faf5ff", text: "#581c87", icon: "fa-moon", bgMode: "lavender", archetype: "bento-grid" },
    mocha: { primary: "#78350f", secondary: "#fde68a", bg: "#faf8f5", text: "#451a03", icon: "fa-mug-hot", bgMode: "cream", archetype: "zigzag-story" },
    arctic: { primary: "#0284c7", secondary: "#06b6d4", bg: "#f0f9ff", text: "#0c4a6e", icon: "fa-snowflake", bgMode: "skyblue", archetype: "saas-launchpad" },
    tangerine: { primary: "#ea580c", secondary: "#f59e0b", bg: "#fff7ed", text: "#7c2d12", icon: "fa-fire", bgMode: "peach", archetype: "bento-grid" },
    monochrome: { primary: "#18181b", secondary: "#71717a", bg: "#ffffff", text: "#09090b", icon: "fa-layer-group", bgMode: "light", archetype: "portfolio-focus" },
    grape: { primary: "#7e22ce", secondary: "#c084fc", bg: "#faf5ff", text: "#581c87", icon: "fa-gem", bgMode: "lavender", archetype: "executive-biz" }
  };

  const aiIndustryPresets = {
    murer: {
      brandName: "OC Murer & Entreprise",
      tagline: "Autoriseret Murer & Entreprenør",
      heroTitle: "Kvalitetsmurerarbejde og Solidt Håndværk",
      heroDesc: "Vi udfører alt indenfor klinke- og flisearbejde, badeværelser, nedrivning og renovering med garanti for høj kvalitet.",
      ctaText: "Få et Uforpligtende Tilbud",
      aboutText: "Med over 15 års erfaring i murerbranchen leverer vi solide løsninger, der holder i generationer. Vi overholder altid aftalte priser og tidsplaner.",
      icon: "fa-hammer", archetype: "local-craft", bgMode: "light",
      primary: "#059669", secondary: "#34d399",
      heroImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
      ],
      overrides: {
        card_1_t: "Badeværelser & Fliser", card_1_d: "Specialister i udskiftning af klinker, vådrumssikring og komplet renovering af badeværelser.",
        card_2_t: "Nedrivning & Ombygning", card_2_d: "Sikker og effektiv nedrivning af vægge, murværk og ældre bygninger med fokus på renlighed.",
        card_3_t: "Facaderenovering & Støbearbejde", card_3_d: "Renovering af slidte facader, omfugning af murværk og udstøbning af solide funderinger."
      }
    },
    tomrer: {
      brandName: "Nordic Tømrer & Tag",
      tagline: "Professionelt Tømrer- & Snedkerarbejde",
      heroTitle: "Flotte Træterrasser, Nye Vinduer og Nyt Tag",
      heroDesc: "Vi forvandler din bolig med kompromisløst træarbejde, energivenlige vinduer og holdbare tagløsninger.",
      ctaText: "Bestil Gratis Besigtigelse",
      aboutText: "Vores passion er godt træværk. Vi lytter til dine ønsker og leverer skræddersyede løsninger til tiden og til den aftalte pris.",
      icon: "fa-hammer", archetype: "local-craft", bgMode: "cream",
      primary: "#78350f", secondary: "#fde68a",
      heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80"
      ],
      overrides: {
        card_1_t: "Nye Vinduer & Døre", card_1_d: "Energibesparende udskiftning af vinduer og døre der sænker varmeregningen.",
        card_2_t: "Træterrasser & Beklædning", card_2_d: "Skræddersyede træterrasser og facadebeklædning i højeste trækvalitet.",
        card_3_t: "Tagrenovering & Tagudskiftning", card_3_d: "Nyt tegltag, tagpap eller renovering af spær og undertag med garanti."
      }
    },
    gartner: {
      brandName: "Grøn Balance Anlæg",
      tagline: "Anlægsgartner & Brolægning",
      heroTitle: "Skab Drømmehaven med Smuk Belægning",
      heroDesc: "Vi lægger nye indkørsler, stensætninger, anlægger rullegræs og vedligeholder grønne områder året rundt.",
      ctaText: "Få et Tilbud på Belægning",
      aboutText: "Vi skaber harmoniske uderum med fokus på holdbare stentyper, flot plantering og langtidsholdbar kvalitet.",
      icon: "fa-leaf", archetype: "local-craft", bgMode: "mint",
      primary: "#15803d", secondary: "#84cc16",
      heroImage: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1558904541-efa8c196b27d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80"
      ],
      overrides: {
        card_1_t: "Brolægning & Indkørsler", card_1_d: "Fliselægning af indkørsler, terrasser og havestier med garanti mod sætningsskader.",
        card_2_t: "Rullegræs & Plantering", card_2_d: "Etablering af snorlige rullegræsplæner, hækbeplantning og blomsterbede.",
        card_3_t: "Havepleje & Beskæring", card_3_d: "Løbende vedligeholdelse af grønne områder, træbeskæring og hækklipning."
      }
    },
    laege: {
      brandName: "Lægehuset Sundhed & Omsorg",
      tagline: "Almen Medicinsk Lægepraksis",
      heroTitle: "Tryg og Professionel Lægehjælp for Hele Familien",
      heroDesc: "Vi tilbyder grundige konsultationer, receptfornyelse, helbredstjek og børneundersøgelser i rolige rammer.",
      ctaText: "Bestil Tid eller Recept",
      aboutText: "Vores erfarne læger og sygeplejersker sætter din sundhed i første række. Vi tager os god tid til at lytte og rådgive.",
      icon: "fa-user-doctor", archetype: "executive-biz", bgMode: "skyblue",
      primary: "#0284c7", secondary: "#38bdf8",
      heroImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"
      ],
      overrides: {
        card_1_t: "Konsultation & Helbredstjek", card_1_d: "Grundig undersøgelse, blodtryksmåling og opfølgning på kroniske tilstande.",
        card_2_t: "Receptfornyelse & Attester", card_2_d: "Hurtig fornyelse af fast medicin og udstedelse af kørekort- og rejseattester.",
        card_3_t: "Børne- & Graviditetsundersøgelse", card_3_d: "Trygge børnevaccinationer og omsorgsfuld opfølgning under graviditeten."
      }
    },
    fysioterapi: {
      brandName: "Aura Fysioterapi & Genoptræning",
      tagline: "Autoriseret Fysioterapi & Sportsklinik",
      heroTitle: "Kom Smertefrit Tilbage til Dit Aktive Liv",
      heroDesc: "Skræddersyet fysioterapeutisk behandling af ryg-, nakke- og sportsskader med dokumenterede genoptræningsøvelser.",
      ctaText: "Book Fysioterapi Konsultation",
      aboutText: "Vi kombinerer manuel behandling med målrettet træning for at fjerne årsagen til dine smerter og forebygge tilbagefald.",
      icon: "fa-child-reaching", archetype: "local-craft", bgMode: "mint",
      primary: "#059669", secondary: "#34d399",
      heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80"
      ],
      overrides: {
        card_1_t: "Ryg- & Nakkebehandling", card_1_d: "Målrettet fysioterapi mod hold i ryggen, diskusprolaps og spændingshovedpine.",
        card_2_t: "Sportsskader & Genoptræning", card_2_d: "Genoptræning efter knæ-, skulder- eller ankelskader med individuelt træningsprogram.",
        card_3_t: "Holdningskorrektion & Ergonomi", card_3_d: "Vejledning i kropsholdning, arbejdsstillinger og forebyggelse af kontorskader."
      }
    },
    fysiurgisk: {
      brandName: "Krop & Balance Massage",
      tagline: "Fysiurgisk Massage & Kropsterapi",
      heroTitle: "Slip for Ømme Muskler, Spændinger og Stress",
      heroDesc: "Dybdegående fysiurgisk massage der løsner op for myoser, fremmer blodcirkulationen og giver fornyet energi.",
      ctaText: "Book Behandling Nu",
      aboutText: "Vores certificerede massører skræddersyr hver behandling til dine specifikke muskler og smerteområder.",
      icon: "fa-spa", archetype: "portfolio-focus", bgMode: "blush",
      primary: "#db2777", secondary: "#f472b6",
      heroImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
      ],
      overrides: {
        card_1_t: "Fysiurgisk Dybdemassage", card_1_d: "Målrettet dybdegående massage mod nakkespændinger, lændesmerter og musearme.",
        card_2_t: "Bindevævsmassage & Cupping", card_2_d: "Frigør spændt bindevæv, forbedrer lymfedrænage og øger muskelsmidighed.",
        card_3_t: "Afstressende Wellness", card_3_d: "Rolig helkropsmassage med nærende olier der sænker kropsstress og giver ro."
      }
    },
    psykolog: {
      brandName: "Indsigt Psykologhus",
      tagline: "Autoriseret Psykolog & Samtaleterapi",
      heroTitle: "Få Redskaber til Mere Mental Balance og Trivsel",
      heroDesc: "Professionel og empatisk samtaleterapi til dig der oplever stress, angst, livskriser eller ønsker personlig udvikling.",
      ctaText: "Book Fortrolig Samtale",
      aboutText: "I et trygt og ufordømmende rum arbejder vi sammen om at skabe indsigt, bryde mønstre og genfinde din styrke.",
      icon: "fa-brain", archetype: "executive-biz", bgMode: "lavender",
      primary: "#6d28d9", secondary: "#a78bfa",
      heroImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1499209974431-9dac3ada00d7?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
      ],
      overrides: {
        card_1_t: "Stress- & Angstbehandling", card_1_d: "Kognitiv terapi og konkrete værktøjer til at håndtere tankemylder, uro og udbrændthed.",
        card_2_t: "Parterapi & Relationer", card_2_d: "Forbedr kommunikationen og genopbyg fortroligheden i parforholdet.",
        card_3_t: "Livskriser & Sorgbearbejdning", card_3_d: "Støttende samtaler ved skilsmisse, tab og forandringer."
      }
    },
    kiropraktor: {
      brandName: "SpineCare Kiropraktik",
      tagline: "Autoriseret Kiropraktor & Osteopati",
      heroTitle: "Fjern Låsninger i Ryg, Led og Nakke",
      heroDesc: "Skånsom og effektiv kiropraktisk justering der genopretter kroppens naturlige bevægelighed og fjerner nervesmerter.",
      ctaText: "Bestil Første Undersøgelse",
      aboutText: "Vi undersøger hele bevægeapparatet for at finde den præcise årsag til dine smerter og tilbyder behandling uden ventetid.",
      icon: "fa-bone", archetype: "local-craft", bgMode: "skyblue",
      primary: "#0369a1", secondary: "#38bdf8",
      heroImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
      ],
      overrides: {
        card_1_t: "Kiropraktisk Ledjustering", card_1_d: "Løsner ledlåsninger i hvirbelsøjlen, bækken og skuldre for hurtig smertelindring.",
        card_2_t: "Diskusprolaps & Iskias", card_2_d: "Specialiseret trykaflastende behandling ved iskiassmerter og udstråling i ben.",
        card_3_t: "Hovedpine & Svimmelhed", card_3_d: "Afhjælper nakkeudløst hovedpine, kæbespændinger og krystalsyge."
      }
    },
    optiker: {
      brandName: "Vision Optics & Øjenklinik",
      tagline: "Autoriseret Optiker & Synsprøver",
      heroTitle: "Oplev Verden med Krystalklart Syn",
      heroDesc: "Grundige digitale synsprøver, eksklusive designerbriller og perfekt tilpassede kontaktlinser af højeste kvalitet.",
      ctaText: "Bestil Gratis Synsprøve",
      aboutText: "Vores optikere rådgiver dig om de bedste glasløsninger og stel der passer perfekt til din ansigtsform og livsstil.",
      icon: "fa-glasses", archetype: "portfolio-focus", bgMode: "cream",
      primary: "#0f766e", secondary: "#2dd4bf",
      heroImage: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80"
      ],
      overrides: {
        card_1_t: "Præcisions Synsprøve", card_1_d: "Udvidet 3D synstest inklusiv måling af øjentryk og samsynskontrol.",
        card_2_t: "Designerbriller & Solbriller", card_2_d: "Stort udvalg af håndplukkede stel fra førende danske og internationale mærker.",
        card_3_t: "Kontaktlinse Tilpasning", card_3_d: "Prøv månedslinser, endagslinser eller flerstyrkelinser med professionel oplæring."
      }
    },
    fodterapi: {
      brandName: "Klinik for Fodterapi & Sundhed",
      tagline: "Statsautoriseret Fodterapeut",
      heroTitle: "Giv Dine Fødder den Omsorg og Behandling De Fortjener",
      heroDesc: "Professionel fodbehandling, individuelle indlægssåler og afhjælpning af nedgroede negle, hård hud og ligtorne.",
      ctaText: "Bestil Fodbehandling",
      aboutText: "Vores statsautoriserede fodterapeuter sikrer dine fødder de bedste betingelser med skånsomme og effektive behandlinger.",
      icon: "fa-shoe-prints", archetype: "executive-biz", bgMode: "mint",
      primary: "#0d9488", secondary: "#5eead4",
      heroImage: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80"
      ],
      overrides: {
        card_1_t: "Klassisk Fodbehandling", card_1_d: "Fodbad, klipning og slibning af negle, fjernelse af hård hud og afsluttende creme.",
        card_2_t: "Individuelle Indlægssåler", card_2_d: "Ganganalyse og fremstilling af specialstøbte indlæg til aflastning af smerter.",
        card_3_t: "Behandling af Nedgroede Negle", card_3_d: "Smertelindrende bøjlebehandling (ortonyxi) der korrigerer neglens vækst."
      }
    },
    frisor: {
      brandName: "Studio Elegance Hair",
      tagline: "Eksklusiv Hår- & Skønhedssalon",
      heroTitle: "Skræddersyet Klipning, Farve og Styling",
      heroDesc: "Forkæl dig selv i rolige og luksuriøse omgivelser. Vores passionerede stylister fremhæver dit bedste look.",
      ctaText: "Book Tid Online Now",
      aboutText: "Hos Studio Elegance handler det om dig. Vi arbejder med skånsomme, organiske hårprodukter og nyeste teknikker.",
      icon: "fa-scissors", archetype: "portfolio-focus", bgMode: "blush",
      primary: "#ec4899", secondary: "#f472b6",
      heroImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80"
      ],
      overrides: {
        card_1_t: "Dame- & Herreklip", card_1_d: "Præcisionsklip tilpasset din ansigtsform og personlige stil.",
        card_2_t: "Balayage & Farvebehandling", card_2_d: "Professionel farvning, highlights og skånsom balayage med glansfuldt resultat.",
        card_3_t: "Kur & Styling", card_3_d: "Nærende hårkure, hovedbundsmassage og styling til festlige lejligheder."
      }
    },
    tandlaege: {
      brandName: "Tandklinik Sundt Smil",
      tagline: "Moderne & Smertefri Tandbehandling",
      heroTitle: "Giv Dit Smil Glansen og Sundheden Tilbage",
      heroDesc: "Vi tilbyder omsorgsfuld tandbehandling uden smerter i trygge rammer med nyeste teknologi.",
      ctaText: "Bestil Tid til Eftersyn",
      aboutText: "Vi forstår at mange kan føle utryghed ved tandlægebesøg. Vores venlige team sørger for en rolig og smertefri oplevelse.",
      icon: "fa-tooth", archetype: "executive-biz", bgMode: "skyblue",
      primary: "#0284c7", secondary: "#38bdf8",
      heroImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
      ],
      overrides: {
        card_1_t: "Eftersyn & Tandrensning", card_1_d: "Grundigt eftersyn, forebyggelse og fjernelse af tandsten for et sundt tandsæt.",
        card_2_t: "Kosmetisk Tandpleje", card_2_d: "Skånsom tandblegning, porcelænsfacader og usynlig tandregulering.",
        card_3_t: "Implantater & Kroner", card_3_d: "Holdbare porcelænskroner og tandimplantater der ser ud og føles som naturlige tænder."
      }
    },
    restaurant: {
      brandName: "Gourmet Bistro & Grill",
      tagline: "Autentiske Råvarer & Smagsoplevelser",
      heroTitle: "Nyd Enestående Mad i Hjertet af Byen",
      heroDesc: "Vi serverer sæsonaktuelle retter tilberedt fra bunden med friske lokale råvarer og udsøgte vine.",
      ctaText: "Reserver Et Bord",
      aboutText: "Vores køkken kombinerer det klassiske franske med et moderne nordisk tvist. Hos os går god mad og hygge hånd i hånd.",
      icon: "fa-utensils", archetype: "portfolio-focus", bgMode: "peach",
      primary: "#ea580c", secondary: "#f59e0b",
      heroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80"
      ],
      overrides: {
        card_1_t: "A la Carte Menu", card_1_d: "Udsøgt udvalg af kød, fisk og vegetariske retter af højeste råvarekvalitet.",
        card_2_t: "Selskaber & Private Dining", card_2_d: "Hold din næste fødselsdag, konfirmation eller firmafest i vores hyggelige lokaler.",
        card_3_t: "Vinkort & Cocktails", card_3_d: "Håndplukkede vine fra førende huse og friske signatur-cocktails."
      }
    },
    tech: {
      brandName: "Aura Cloud Platform",
      tagline: "Next-Gen Enterprise Cloud & AI Integration",
      heroTitle: "Automatiser Din Virksomheds Arbejdsgange",
      heroDesc: "Skaler din forretning med vores lynhurtige skyplatform. Få fuldt overblik over data, kunder og regnskab på ét sted.",
      ctaText: "Start 14 Dages Gratis Prøve",
      aboutText: "Bygget af softwareingeniører til moderne virksomheder. Vi skaber løsninger der sparer dig 10+ arbejdstimer hver uge.",
      icon: "fa-rocket", archetype: "saas-launchpad", bgMode: "gradient",
      primary: "#7c3aed", secondary: "#06b6d4",
      heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
      ],
      overrides: {
        card_1_t: "Realtids Analytics", card_1_d: "Automatisk rapportering og konverteringsdata leveret direkte til din skærm.",
        card_2_t: "Sikker Cloud API", card_2_d: "Lyn-API der integrerer problemfrit med dine eksisterende ERP og CRM systemer.",
        card_3_t: "24/7 AI Support", card_3_d: "Intelligent virtuel assistent der besvarer kundespørgsmål i døgndrift."
      }
    },
    bogholder: {
      brandName: "KlarVinkel Rådgivning",
      tagline: "Statsautoriseret Bogholderi & Regnskab",
      heroTitle: "Slip for Papirarbejdet og Få Styr på Skatten",
      heroDesc: "Vi overtager dit bogholderi, momsindberetning og årsregnskab, så du kan fokusere 100% på din forretning.",
      ctaText: "Få Et Tilbud på Bogholderi",
      aboutText: "Vi sikrer at dit regnskab overholder alle lovkrav, og finder de optimale skattemæssige fradrag for din virksomhed.",
      icon: "fa-chart-pie", archetype: "executive-biz", bgMode: "light",
      primary: "#2563eb", secondary: "#38bdf8",
      heroImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
      ],
      overrides: {
        card_1_t: "Løbende Bogføring", card_1_d: "Digital bilagshåndtering og afstemning af bank og konti hver måned.",
        card_2_t: "Moms & Årsregnskab", card_2_d: "Rettidig indberetning af moms, skatteopgørelse og indsendelse af årsrapport.",
        card_3_t: "Økonomisk Rådgivning", card_3_d: "Strategisk rådgivning om budgetter, likviditet og selskabsoptimering."
      }
    },
    fotograf: {
      brandName: "Lumière Foto Studio",
      tagline: "Visuel Storytelling & Portrætfotografi",
      heroTitle: "Fang Livets Største Øjeblikke i Høj Opløsning",
      heroDesc: "Vi skaber stemningsfulde og autentiske billeder til bryllupper, portrætter, børnefamilier og erhverv.",
      ctaText: "Book En Fotografering",
      aboutText: "Med blik for det ægte udtryk og naturlige lys fanger vi de magiske øjeblikke, du vil værdsætte hele livet.",
      icon: "fa-camera", archetype: "portfolio-focus", bgMode: "lavender",
      primary: "#581c87", secondary: "#c084fc",
      heroImage: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80"
      ],
      overrides: {
        card_1_t: "Bryllup & Fest", card_1_d: "Komplet dækning af din store dag – fra forberedelse til brudevals.",
        card_2_t: "Portræt & Familie", card_2_d: "Stilfulde portrætfotos i studie eller i naturskønne udendørs omgivelser.",
        card_3_t: "Erhverv & Produkt", card_3_d: "Professionelle medarbejderfotos, produktbilleder og stemningsbilleder til web."
      }
    },
    auto: {
      brandName: "Veloce Auto Service",
      tagline: "Autoriseret Bilværksted & Dækcenter",
      heroTitle: "Din Bil er i Trygge Hænder Hos Os",
      heroDesc: "Vi reparerer og servicerer alle bilmærker med bevarelse af fabriksgarantien. Hurtig ekspedition og gratis lånebil.",
      ctaText: "Book Tid til Værksted",
      aboutText: "Vores topmoderne værksted råder over nyeste testudstyr. Vi gennemgår altid reparationer med dig før vi starter.",
      icon: "fa-car", archetype: "local-craft", bgMode: "light",
      primary: "#ea580c", secondary: "#dc2626",
      heroImage: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80"
      ],
      overrides: {
        card_1_t: "Eftersyn & Serviceeftersyn", card_1_d: "Grundigt stempelservice efter fabrikkens forskrifter inkl. stempel i bogen.",
        card_2_t: "Klargøring til Syn", card_2_d: "Gennemgang af bremser, lygter og styretøj så din bil går glat igennem syn.",
        card_3_t: "Dækskifte & Afbalancering", card_3_d: "Sæsonskifte af sommer- og vinterdæk, salg af kvalitetsdæk og dækhotel."
      }
    }
  };

  // ── 4. WEB AUDIO SOUND EFFECTS ──────────────────────────────────────────
  function playMagicSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.6);
      
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.7);
    } catch (e) {}
  }

  function playSuccessChime() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.15);
      osc.frequency.setValueAtTime(783.99, now + 0.3);
      osc.frequency.setValueAtTime(1046.50, now + 0.45);
      
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.8);
    } catch (e) {}
  }

  // ── 5. WEBSITE GENERATOR CORE ───────────────────────────────────────────
  
// ==========================================================================
// 15 VISUAL TEMPLATE DEFINITIONS (MATCHING SKABELONER WIREFRAME PHOTO)
// ==========================================================================

const templateDefinitions = [
  {
    id: "split-classic",
    name: "1. Classic Split",
    badge: "Klassisk",
    desc: "Tekst & CTA til venstre, stort hero-billede til højre.",
    svg: `<svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="156" height="106" rx="6" fill="#1e293b" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <path d="M2 8 C2 4.7 4.7 2 8 2 L152 2 C155.3 2 158 4.7 158 8 L158 14 L2 14 Z" fill="rgba(255,255,255,0.06)"/>
      <circle cx="8" cy="8" r="1.5" fill="#ef4444"/><circle cx="13" cy="8" r="1.5" fill="#f59e0b"/><circle cx="18" cy="8" r="1.5" fill="#10b981"/>
      <rect x="12" y="26" width="60" height="5" rx="2.5" fill="#f8fafc"/>
      <rect x="12" y="36" width="50" height="3" rx="1.5" fill="#94a3b8"/>
      <rect x="12" y="43" width="42" height="3" rx="1.5" fill="#94a3b8"/>
      <rect x="12" y="54" width="32" height="10" rx="5" fill="#7c3aed"/>
      <rect x="86" y="25" width="62" height="70" rx="4" fill="rgba(124, 58, 237, 0.25)" stroke="#7c3aed" stroke-dasharray="3 3"/>
    </svg>`
  },
  {
    id: "hero-banner",
    name: "2. Hero Banner",
    badge: "Centreret",
    desc: "Centreret overskrift med stort fuldbredde hero-billede banner.",
    svg: `<svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="156" height="106" rx="6" fill="#1e293b" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <path d="M2 8 C2 4.7 4.7 2 8 2 L152 2 C155.3 2 158 4.7 158 8 L158 14 L2 14 Z" fill="rgba(255,255,255,0.06)"/>
      <circle cx="8" cy="8" r="1.5" fill="#ef4444"/><circle cx="13" cy="8" r="1.5" fill="#f59e0b"/><circle cx="18" cy="8" r="1.5" fill="#10b981"/>
      <rect x="45" y="22" width="70" height="6" rx="3" fill="#f8fafc"/>
      <rect x="16" y="34" width="128" height="52" rx="5" fill="rgba(6, 182, 212, 0.25)" stroke="#06b6d4" stroke-dasharray="3 3"/>
      <rect x="40" y="92" width="80" height="4" rx="2" fill="#94a3b8"/>
    </svg>`
  },
  {
    id: "hero-stacked",
    name: "3. Stacked Dual",
    badge: "Moderne",
    desc: "Overskrift til venstre, 2 stakkede kort-elementer til højre.",
    svg: `<svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="156" height="106" rx="6" fill="#1e293b" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <path d="M2 8 C2 4.7 4.7 2 8 2 L152 2 C155.3 2 158 4.7 158 8 L158 14 L2 14 Z" fill="rgba(255,255,255,0.06)"/>
      <circle cx="8" cy="8" r="1.5" fill="#ef4444"/><circle cx="13" cy="8" r="1.5" fill="#f59e0b"/><circle cx="18" cy="8" r="1.5" fill="#10b981"/>
      <rect x="12" y="24" width="55" height="5" rx="2.5" fill="#f8fafc"/>
      <rect x="12" y="34" width="45" height="3" rx="1.5" fill="#94a3b8"/>
      <rect x="12" y="41" width="38" height="3" rx="1.5" fill="#94a3b8"/>
      <rect x="12" y="52" width="28" height="9" rx="4.5" fill="#7c3aed"/>
      <rect x="78" y="24" width="70" height="32" rx="4" fill="rgba(124, 58, 237, 0.2)" stroke="#7c3aed"/>
      <rect x="78" y="61" width="70" height="32" rx="4" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4"/>
    </svg>`
  },
  {
    id: "grid-3-cards",
    name: "4. 3 Grid Cards",
    badge: "Populær",
    desc: "Top overskrift med 3 store vertikale feature-kort.",
    svg: `<svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="156" height="106" rx="6" fill="#1e293b" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <path d="M2 8 C2 4.7 4.7 2 8 2 L152 2 C155.3 2 158 4.7 158 8 L158 14 L2 14 Z" fill="rgba(255,255,255,0.06)"/>
      <circle cx="8" cy="8" r="1.5" fill="#ef4444"/><circle cx="13" cy="8" r="1.5" fill="#f59e0b"/><circle cx="18" cy="8" r="1.5" fill="#10b981"/>
      <rect x="50" y="22" width="60" height="5" rx="2.5" fill="#f8fafc"/>
      <rect x="12" y="34" width="40" height="60" rx="4" fill="rgba(124, 58, 237, 0.2)" stroke="#7c3aed"/>
      <rect x="60" y="34" width="40" height="60" rx="4" fill="rgba(124, 58, 237, 0.2)" stroke="#7c3aed"/>
      <rect x="108" y="34" width="40" height="60" rx="4" fill="rgba(124, 58, 237, 0.2)" stroke="#7c3aed"/>
    </svg>`
  },
  {
    id: "horizontal-cards",
    name: "5. Horizontal Rows",
    badge: "Struktureret",
    desc: "Topsektion med 2 brede vandrette rækker og tekst under.",
    svg: `<svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="156" height="106" rx="6" fill="#1e293b" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <path d="M2 8 C2 4.7 4.7 2 8 2 L152 2 C155.3 2 158 4.7 158 8 L158 14 L2 14 Z" fill="rgba(255,255,255,0.06)"/>
      <circle cx="8" cy="8" r="1.5" fill="#ef4444"/><circle cx="13" cy="8" r="1.5" fill="#f59e0b"/><circle cx="18" cy="8" r="1.5" fill="#10b981"/>
      <rect x="14" y="22" width="132" height="24" rx="4" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981"/>
      <rect x="14" y="51" width="132" height="24" rx="4" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981"/>
      <rect x="14" y="82" width="132" height="4" rx="2" fill="#94a3b8"/>
      <rect x="14" y="90" width="90" height="4" rx="2" fill="#94a3b8"/>
    </svg>`
  },
  {
    id: "bento-grid",
    name: "6. Bento 2x2 Grid",
    badge: "Bento",
    desc: "Tekst til venstre med et 4-bens 2x2 bento-grid til højre.",
    svg: `<svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="156" height="106" rx="6" fill="#1e293b" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <path d="M2 8 C2 4.7 4.7 2 8 2 L152 2 C155.3 2 158 4.7 158 8 L158 14 L2 14 Z" fill="rgba(255,255,255,0.06)"/>
      <circle cx="8" cy="8" r="1.5" fill="#ef4444"/><circle cx="13" cy="8" r="1.5" fill="#f59e0b"/><circle cx="18" cy="8" r="1.5" fill="#10b981"/>
      <rect x="12" y="24" width="45" height="65" rx="4" fill="rgba(248, 250, 252, 0.05)" stroke="rgba(255,255,255,0.2)"/>
      <rect x="65" y="24" width="40" height="30" rx="3" fill="rgba(124, 58, 237, 0.25)" stroke="#7c3aed"/>
      <rect x="110" y="24" width="38" height="30" rx="3" fill="rgba(124, 58, 237, 0.25)" stroke="#7c3aed"/>
      <rect x="65" y="59" width="40" height="30" rx="3" fill="rgba(124, 58, 237, 0.25)" stroke="#7c3aed"/>
      <rect x="110" y="59" width="38" height="30" rx="3" fill="rgba(124, 58, 237, 0.25)" stroke="#7c3aed"/>
    </svg>`
  },
  {
    id: "hero-fullwidth",
    name: "7. Wide Impact",
    badge: "Impact",
    desc: "Tekstsektion for oven med bredt fuldbredde sektionsbånd.",
    svg: `<svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="156" height="106" rx="6" fill="#1e293b" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <path d="M2 8 C2 4.7 4.7 2 8 2 L152 2 C155.3 2 158 4.7 158 8 L158 14 L2 14 Z" fill="rgba(255,255,255,0.06)"/>
      <circle cx="8" cy="8" r="1.5" fill="#ef4444"/><circle cx="13" cy="8" r="1.5" fill="#f59e0b"/><circle cx="18" cy="8" r="1.5" fill="#10b981"/>
      <rect x="12" y="24" width="70" height="5" rx="2.5" fill="#f8fafc"/>
      <rect x="12" y="33" width="100" height="4" rx="2" fill="#94a3b8"/>
      <rect x="12" y="41" width="80" height="4" rx="2" fill="#94a3b8"/>
      <rect x="12" y="54" width="136" height="40" rx="4" fill="rgba(236, 72, 153, 0.25)" stroke="#ec4899"/>
    </svg>`
  },
  {
    id: "asymmetric-stacked",
    name: "8. Asymmetric Stack",
    badge: "Kreativ",
    desc: "Overskrift og tekst til venstre, 2 høje asymmetriske bokse.",
    svg: `<svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="156" height="106" rx="6" fill="#1e293b" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <path d="M2 8 C2 4.7 4.7 2 8 2 L152 2 C155.3 2 158 4.7 158 8 L158 14 L2 14 Z" fill="rgba(255,255,255,0.06)"/>
      <circle cx="8" cy="8" r="1.5" fill="#ef4444"/><circle cx="13" cy="8" r="1.5" fill="#f59e0b"/><circle cx="18" cy="8" r="1.5" fill="#10b981"/>
      <rect x="12" y="24" width="60" height="5" rx="2.5" fill="#f8fafc"/>
      <rect x="12" y="33" width="50" height="4" rx="2" fill="#94a3b8"/>
      <rect x="12" y="41" width="40" height="4" rx="2" fill="#94a3b8"/>
      <rect x="12" y="55" width="60" height="20" rx="4" fill="rgba(255,255,255,0.08)"/>
      <rect x="80" y="24" width="68" height="30" rx="4" fill="rgba(6, 182, 212, 0.25)" stroke="#06b6d4"/>
      <rect x="80" y="59" width="68" height="36" rx="4" fill="rgba(124, 58, 237, 0.25)" stroke="#7c3aed"/>
    </svg>`
  },
  {
    id: "split-5050",
    name: "9. 50/50 Split",
    badge: "Balance",
    desc: "Lige opdelt 50% tekst og 50% billede i perfekt balance.",
    svg: `<svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="156" height="106" rx="6" fill="#1e293b" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <path d="M2 8 C2 4.7 4.7 2 8 2 L152 2 C155.3 2 158 4.7 158 8 L158 14 L2 14 Z" fill="rgba(255,255,255,0.06)"/>
      <circle cx="8" cy="8" r="1.5" fill="#ef4444"/><circle cx="13" cy="8" r="1.5" fill="#f59e0b"/><circle cx="18" cy="8" r="1.5" fill="#10b981"/>
      <rect x="12" y="24" width="62" height="68" rx="4" fill="rgba(248, 250, 252, 0.06)" stroke="rgba(255,255,255,0.2)"/>
      <rect x="84" y="24" width="64" height="68" rx="4" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981"/>
    </svg>`
  },
  {
    id: "multi-row-cards",
    name: "10. Multi-Row Cards",
    badge: "Dynamisk",
    desc: "Overskrift med 2 brede kort og bundbånd.",
    svg: `<svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="156" height="106" rx="6" fill="#1e293b" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <path d="M2 8 C2 4.7 4.7 2 8 2 L152 2 C155.3 2 158 4.7 158 8 L158 14 L2 14 Z" fill="rgba(255,255,255,0.06)"/>
      <circle cx="8" cy="8" r="1.5" fill="#ef4444"/><circle cx="13" cy="8" r="1.5" fill="#f59e0b"/><circle cx="18" cy="8" r="1.5" fill="#10b981"/>
      <rect x="12" y="22" width="136" height="5" rx="2.5" fill="#f8fafc"/>
      <rect x="12" y="32" width="64" height="38" rx="4" fill="rgba(124, 58, 237, 0.25)" stroke="#7c3aed"/>
      <rect x="82" y="32" width="66" height="38" rx="4" fill="rgba(124, 58, 237, 0.25)" stroke="#7c3aed"/>
      <rect x="12" y="76" width="136" height="18" rx="3" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4"/>
    </svg>`
  },
  {
    id: "stacked-banners",
    name: "11. Stacked Banners",
    badge: "Ren",
    desc: "Stakkede fuldbredde båndsektioner oven på hinanden.",
    svg: `<svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="156" height="106" rx="6" fill="#1e293b" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <path d="M2 8 C2 4.7 4.7 2 8 2 L152 2 C155.3 2 158 4.7 158 8 L158 14 L2 14 Z" fill="rgba(255,255,255,0.06)"/>
      <circle cx="8" cy="8" r="1.5" fill="#ef4444"/><circle cx="13" cy="8" r="1.5" fill="#f59e0b"/><circle cx="18" cy="8" r="1.5" fill="#10b981"/>
      <rect x="12" y="22" width="136" height="26" rx="4" fill="rgba(236, 72, 153, 0.25)" stroke="#ec4899"/>
      <rect x="12" y="52" width="136" height="20" rx="4" fill="rgba(124, 58, 237, 0.25)" stroke="#7c3aed"/>
      <rect x="12" y="76" width="136" height="20" rx="4" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981"/>
    </svg>`
  },
  {
    id: "hero-3-columns",
    name: "12. Hero + 3 Columns",
    badge: "Pro",
    desc: "Stort topbanner med 3 feature-søjler placeret nedenunder.",
    svg: `<svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="156" height="106" rx="6" fill="#1e293b" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <path d="M2 8 C2 4.7 4.7 2 8 2 L152 2 C155.3 2 158 4.7 158 8 L158 14 L2 14 Z" fill="rgba(255,255,255,0.06)"/>
      <circle cx="8" cy="8" r="1.5" fill="#ef4444"/><circle cx="13" cy="8" r="1.5" fill="#f59e0b"/><circle cx="18" cy="8" r="1.5" fill="#10b981"/>
      <rect x="12" y="22" width="136" height="32" rx="4" fill="rgba(6, 182, 212, 0.25)" stroke="#06b6d4"/>
      <rect x="12" y="60" width="40" height="36" rx="4" fill="rgba(124, 58, 237, 0.25)" stroke="#7c3aed"/>
      <rect x="60" y="60" width="40" height="36" rx="4" fill="rgba(124, 58, 237, 0.25)" stroke="#7c3aed"/>
      <rect x="108" y="60" width="40" height="36" rx="4" fill="rgba(124, 58, 237, 0.25)" stroke="#7c3aed"/>
    </svg>`
  },
  {
    id: "top-cards-3",
    name: "13. Top 3 Cards",
    badge: "Fokus",
    desc: "3 feature-kort placeret øverst med tekstsektion under.",
    svg: `<svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="156" height="106" rx="6" fill="#1e293b" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <path d="M2 8 C2 4.7 4.7 2 8 2 L152 2 C155.3 2 158 4.7 158 8 L158 14 L2 14 Z" fill="rgba(255,255,255,0.06)"/>
      <circle cx="8" cy="8" r="1.5" fill="#ef4444"/><circle cx="13" cy="8" r="1.5" fill="#f59e0b"/><circle cx="18" cy="8" r="1.5" fill="#10b981"/>
      <rect x="12" y="22" width="40" height="38" rx="4" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981"/>
      <rect x="60" y="22" width="40" height="38" rx="4" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981"/>
      <rect x="108" y="22" width="40" height="38" rx="4" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981"/>
      <rect x="12" y="66" width="136" height="30" rx="4" fill="rgba(248, 250, 252, 0.06)" stroke="rgba(255,255,255,0.2)"/>
    </svg>`
  },
  {
    id: "sidebar-layout",
    name: "14. Sidebar Split",
    badge: "Sidepanel",
    desc: "Smalt sidepanel til venstre med stort hovedindhold til højre.",
    svg: `<svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="156" height="106" rx="6" fill="#1e293b" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <path d="M2 8 C2 4.7 4.7 2 8 2 L152 2 C155.3 2 158 4.7 158 8 L158 14 L2 14 Z" fill="rgba(255,255,255,0.06)"/>
      <circle cx="8" cy="8" r="1.5" fill="#ef4444"/><circle cx="13" cy="8" r="1.5" fill="#f59e0b"/><circle cx="18" cy="8" r="1.5" fill="#10b981"/>
      <rect x="12" y="22" width="38" height="72" rx="4" fill="rgba(124, 58, 237, 0.25)" stroke="#7c3aed"/>
      <rect x="56" y="22" width="92" height="72" rx="4" fill="rgba(248, 250, 252, 0.06)" stroke="rgba(255,255,255,0.2)"/>
    </svg>`
  },
  {
    id: "media-left-list",
    name: "15. Media Left List",
    badge: "Overskuelig",
    desc: "Stort medie-billede til venstre med punktliste-tekster til højre.",
    svg: `<svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="156" height="106" rx="6" fill="#1e293b" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <path d="M2 8 C2 4.7 4.7 2 8 2 L152 2 C155.3 2 158 4.7 158 8 L158 14 L2 14 Z" fill="rgba(255,255,255,0.06)"/>
      <circle cx="8" cy="8" r="1.5" fill="#ef4444"/><circle cx="13" cy="8" r="1.5" fill="#f59e0b"/><circle cx="18" cy="8" r="1.5" fill="#10b981"/>
      <rect x="12" y="22" width="64" height="72" rx="4" fill="rgba(6, 182, 212, 0.25)" stroke="#06b6d4" stroke-dasharray="3 3"/>
      <rect x="84" y="26" width="64" height="18" rx="3" fill="rgba(255,255,255,0.08)"/>
      <rect x="84" y="49" width="64" height="18" rx="3" fill="rgba(255,255,255,0.08)"/>
      <rect x="84" y="72" width="64" height="18" rx="3" fill="rgba(255,255,255,0.08)"/>
    </svg>`
  }
];

function renderTemplatePickers() {
  const sidebarGrid = document.getElementById('templatePickerGrid');
  const modalGrid = document.getElementById('modalTemplateGrid');

  if (sidebarGrid) {
    sidebarGrid.innerHTML = templateDefinitions.map(t => `
      <div class="wire-card ${state.layoutArchetype === t.id ? 'active' : ''}" data-template-id="${t.id}" title="${t.name}">
        <div class="wire-card-svg">${t.svg}</div>
        <div class="wire-card-title">${t.name}</div>
        <span class="wire-card-badge">${t.badge}</span>
      </div>
    `).join('');

    sidebarGrid.querySelectorAll('.wire-card').forEach(card => {
      card.addEventListener('click', () => {
        selectTemplate(card.dataset.templateId);
      });
    });
  }

  if (modalGrid) {
    modalGrid.innerHTML = templateDefinitions.map(t => `
      <div class="modal-template-card ${state.layoutArchetype === t.id ? 'active' : ''}" data-template-id="${t.id}">
        <div class="wire-card-svg">${t.svg}</div>
        <div class="modal-template-info">
          <h4>${t.name} <span class="wire-card-badge">${t.badge}</span></h4>
          <p>${t.desc}</p>
        </div>
        <button class="btn-sparkle modal-template-select-btn" type="button">Vælg Denne Skabelon</button>
      </div>
    `).join('');

    modalGrid.querySelectorAll('.modal-template-card').forEach(card => {
      card.addEventListener('click', () => {
        selectTemplate(card.dataset.templateId);
        const modal = document.getElementById('templateModal');
        if (modal) modal.close();
      });
    });
  }
}


function selectTemplate(templateId) {
  state.layoutArchetype = templateId;
  state.userChosenTemplate = true;
  
  const selectLayoutArchetype = document.getElementById('selectLayoutArchetype');
  if (selectLayoutArchetype) {
    let hasOpt = Array.from(selectLayoutArchetype.options).some(o => o.value === templateId);
    if (!hasOpt) {
      const opt = document.createElement('option');
      opt.value = templateId;
      opt.textContent = `✨ Skabelon: ${templateId}`;
      selectLayoutArchetype.appendChild(opt);
    }
    selectLayoutArchetype.value = templateId;
  }

  renderTemplatePickers();
  updateLivePreview();
  if (typeof playMagicSound === 'function') playMagicSound();
}



function generateWebsiteHTML(isProduction = false, page = state.activeSubpage || 'index') {
    const fontsMap = {
      'outfit-inter': { heading: "'Outfit', sans-serif", body: "'Inter', sans-serif" },
      'playfair-jakarta': { heading: "'Playfair Display', serif", body: "'Plus Jakarta Sans', sans-serif" },
      'space-roboto': { heading: "'Space Grotesk', sans-serif", body: "'Inter', sans-serif" },
      'syne-archivo': { heading: "'Syne', sans-serif", body: "'Inter', sans-serif" }
    };

    const fontStyle = fontsMap[state.fontPair] || fontsMap['outfit-inter'];

    let btnRadius = "9999px";
    if (state.buttonShape === 'rounded') btnRadius = "12px";
    if (state.buttonShape === 'sharp') btnRadius = "0px";

    let btnEffectCSS = "";
    if (state.buttonEffect === 'glow') {
      btnEffectCSS = `box-shadow: 0 0 20px ${state.colorPrimary}66; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);`;
    } else if (state.buttonEffect === 'glass') {
      btnEffectCSS = `backdrop-filter: blur(12px); background: linear-gradient(135deg, ${state.colorPrimary}cc 0%, ${state.colorSecondary}88 100%); border: 1px solid rgba(255,255,255,0.2);`;
    } else {
      btnEffectCSS = `background: ${state.colorPrimary}; color: white; border: none;`;
    }

    let bgStyleCSS = `background-color: ${state.colorBg}; color: ${state.colorText};`;
    if (state.bgMode === 'custom') {
      bgStyleCSS = `background-color: ${state.colorBg}; color: ${state.colorText};`;
    } else if (state.bgMode === 'light') {
      bgStyleCSS = `background-color: #ffffff; color: #0f172a;`;
    } else if (state.bgMode === 'blush') {
      bgStyleCSS = `background: linear-gradient(135deg, #fff1f2 0%, #ffe4e6 50%, #fdf2f8 100%); color: #881337;`;
    } else if (state.bgMode === 'cream') {
      bgStyleCSS = `background: linear-gradient(135deg, #faf8f5 0%, #fef3c7 50%, #fffbeb 100%); color: #451a03;`;
    } else if (state.bgMode === 'skyblue') {
      bgStyleCSS = `background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%); color: #0c4a6e;`;
    } else if (state.bgMode === 'mint') {
      bgStyleCSS = `background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%); color: #14532d;`;
    } else if (state.bgMode === 'lavender') {
      bgStyleCSS = `background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%); color: #581c87;`;
    } else if (state.bgMode === 'peach') {
      bgStyleCSS = `background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fed7aa 100%); color: #7c2d12;`;
    } else if (state.bgMode === 'gradient') {
      bgStyleCSS = `background: radial-gradient(circle at 10% 20%, rgba(236,72,153,0.15) 0%, rgba(255,255,255,1) 60%), radial-gradient(circle at 90% 80%, rgba(6,182,212,0.15) 0%, rgba(255,255,255,1) 60%); background-color: #ffffff; color: #0f172a;`;
    } else if (state.bgMode === 'dark') {
      bgStyleCSS = `background-color: #0f172a; color: #f8fafc;`;
    } else if (state.bgMode === 'oled') {
      bgStyleCSS = `background-color: #000000; color: #ffffff;`;
    }

    function isHexDark(hex) {
      if (!hex || typeof hex !== 'string') return false;
      hex = hex.replace('#', '');
      if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
      if (hex.length !== 6) return false;
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      return luma < 128;
    }

    const isDarkBg = state.bgMode === 'dark' || state.bgMode === 'oled' || (state.bgMode === 'custom' && isHexDark(state.colorBg));

    const editAttr = isProduction ? "" : 'contenteditable="true"';

    // Determine Hero Image & Multi-Photos
    let activeHeroImg = state.heroImage || "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?auto=format&fit=crop&w=1000&q=80";
    const heroPhoto = state.userPhotos.find(p => p.slot === 'hero');
    if (heroPhoto) activeHeroImg = heroPhoto.src;
    else if (state.userPhotos.length > 0) activeHeroImg = state.userPhotos[0].src;

    const photo1 = state.userPhotos[0]?.src || activeHeroImg || "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?auto=format&fit=crop&w=800&q=80";
    const photo2 = state.userPhotos[1]?.src || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80";
    const photo3 = state.userPhotos[2]?.src || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80";

    // Build Dynamic Portfolio Cards
    let portfolioItemsHTML = "";
    if (state.userPhotos.length > 0) {
      portfolioItemsHTML = state.userPhotos.map((photo, i) => `
        <div class="portfolio-item">
          <img src="${photo.src}" alt="${photo.name}">
          <div class="portfolio-overlay">
            <h3 ${editAttr} data-edit-key="port_title_${i}">${state.customOverrides[`port_title_${i}`] || photo.name || `${state.brandName} Projekt #${i+1}`}</h3>
            <p ${editAttr} data-edit-key="port_desc_${i}">${state.customOverrides[`port_desc_${i}`] || `Uploadet Billede #${i+1}`}</p>
          </div>
        </div>
      `).join('');
    } else {
      portfolioItemsHTML = `
        <div class="portfolio-item">
          <img src="${activeHeroImg}" alt="Projekt 1">
          <div class="portfolio-overlay">
            <h3 ${editAttr} data-edit-key="port_title_0">${state.customOverrides['port_title_0'] || `${state.brandName} Visuals`}</h3>
            <p ${editAttr} data-edit-key="port_desc_0">${state.customOverrides['port_desc_0'] || 'Digital Identitet & Håndværk'}</p>
          </div>
        </div>
        <div class="portfolio-item">
          <img src="assets/emerald_tech_hero.jpg" alt="Projekt 2">
          <div class="portfolio-overlay">
            <h3 ${editAttr} data-edit-key="port_title_1">${state.customOverrides['port_title_1'] || 'Emerald Suite'}</h3>
            <p ${editAttr} data-edit-key="port_desc_1">${state.customOverrides['port_desc_1'] || 'Platform & Arkitektur'}</p>
          </div>
        </div>
      `;
    }

    // Features Section
    let featuresHTML = "";
    if (state.sections.features || page === 'services') {
      if (state.layoutArchetype === 'bento-grid') {
        featuresHTML = `
        <section class="features-section" id="features">
          <div class="section-title">
            <h2 ${editAttr} data-edit-key="bento_head">${state.customOverrides['bento_head'] || 'Bento Grid Architecture'}</h2>
            <p ${editAttr} data-edit-key="bento_sub">${state.customOverrides['bento_sub'] || 'Struktureret og moderne boks-layout inspireret af banebrydende tech-giganter.'}</p>
          </div>
          <div class="bento-grid-container">
            <div class="bento-card bento-large">
              <div class="card-icon"><i class="fa-solid fa-bolt"></i></div>
              <h3 ${editAttr} data-edit-key="feat_1_t">${state.customOverrides['feat_1_t'] || 'Lyn-performance & AI Ingestion'}</h3>
              <p ${editAttr} data-edit-key="feat_1_d">${state.customOverrides['feat_1_d'] || 'Indlæser på millisekunder med vores automatiserede caching og CDN-arkitektur.'}</p>
            </div>
            <div class="bento-card">
              <div class="card-icon"><i class="fa-solid fa-shield-halved"></i></div>
              <h3 ${editAttr} data-edit-key="feat_2_t">${state.customOverrides['feat_2_t'] || 'Sikkerhed i særklasse'}</h3>
              <p ${editAttr} data-edit-key="feat_2_d">${state.customOverrides['feat_2_d'] || 'End-to-end kryptering og automatisk backup.'}</p>
            </div>
            <div class="bento-card">
              <div class="card-icon"><i class="fa-solid fa-mobile-screen"></i></div>
              <h3 ${editAttr} data-edit-key="feat_3_t">${state.customOverrides['feat_3_t'] || '100% Responsiv'}</h3>
              <p ${editAttr} data-edit-key="feat_3_d">${state.customOverrides['feat_3_d'] || 'Skalerer perfekt til alle skærmstørrelser.'}</p>
            </div>
            <div class="bento-card bento-wide">
              <div class="card-icon"><i class="fa-solid fa-chart-line"></i></div>
              <h3 ${editAttr} data-edit-key="feat_4_t">${state.customOverrides['feat_4_t'] || 'Avanceret Realtids Analytics'}</h3>
              <p ${editAttr} data-edit-key="feat_4_d">${state.customOverrides['feat_4_d'] || 'Indbygget sporingsdashboard med øjeblikkelig konverteringsstatistik.'}</p>
            </div>
          </div>
        </section>`;
      } else {
        featuresHTML = `
        <section class="features-section" id="features">
          <div class="section-title">
            <h2 ${editAttr} data-edit-key="feat_main_t">${state.customOverrides['feat_main_t'] || 'Vores Unikke Ydelser'}</h2>
            <p ${editAttr} data-edit-key="feat_main_d">${state.customOverrides['feat_main_d'] || 'Bygget til at skabe maksimal værdi og vækst for din virksomhed.'}</p>
          </div>
          <div class="cards-grid">
            <div class="card">
              <div class="card-icon"><i class="fa-solid fa-bolt"></i></div>
              <h3 ${editAttr} data-edit-key="card_1_t">${state.customOverrides['card_1_t'] || 'Lynhurtig Hastighed'}</h3>
              <p ${editAttr} data-edit-key="card_1_d">${state.customOverrides['card_1_d'] || 'Optimeret kodebase der indlæser på få millisekunder og maksimerer din SEO-placering.'}</p>
            </div>
            <div class="card">
              <div class="card-icon"><i class="fa-solid fa-shield-halved"></i></div>
              <h3 ${editAttr} data-edit-key="card_2_t">${state.customOverrides['card_2_t'] || 'Sikkerhed i Topklasse'}</h3>
              <p ${editAttr} data-edit-key="card_2_d">${state.customOverrides['card_2_d'] || 'Enterprise-grade beskyttelse og løbende sikkerhedskopiering af alle dine data.'}</p>
            </div>
            <div class="card">
              <div class="card-icon"><i class="fa-solid fa-mobile-screen"></i></div>
              <h3 ${editAttr} data-edit-key="card_3_t">${state.customOverrides['card_3_t'] || '100% Responsivt Design'}</h3>
              <p ${editAttr} data-edit-key="card_3_d">${state.customOverrides['card_3_d'] || 'Perfekt visning på både smartphones, tablets og alle skærmstørrelser.'}</p>
            </div>
          </div>
        </section>`;
      }
    }

    
    
    // Determine Hero Grid & Layout per Archetype (15 Skabeloner)
    let heroInnerHTML = "";
    const arch = state.layoutArchetype || "split-classic";

    const heroImgTitle = state.customOverrides['hero_img_title'] || state.customOverrides['brandName'] || state.brandName;
    const heroImgDesc = state.customOverrides['hero_img_desc'] || state.customOverrides['tagline'] || state.tagline || 'Professionelle løsninger og kvalitetsarbejde';

    const heroRightVisualHTML = `
      <div class="hero-right-visual" style="position:relative; width:100%; height:400px; min-height:360px; max-height:450px; border-radius:24px; overflow:hidden; box-shadow:0 25px 60px rgba(0,0,0,0.35); border:1px solid ${isDarkBg ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'};">
        <img src="${activeHeroImg}" alt="${state.brandName}" style="width:100%; height:100%; object-fit:cover; display:block; filter:brightness(0.95);" onerror="this.src='https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?auto=format&fit=crop&w=1000&q=80'">
        <div class="hero-image-overlay" style="position:absolute; bottom:18px; left:18px; right:18px; padding:18px 22px; background:rgba(15, 23, 42, 0.85); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); border-radius:18px; border:1px solid rgba(255,255,255,0.18); color:#ffffff; box-shadow:0 10px 30px rgba(0,0,0,0.35); text-align:left;">
          <div style="display:inline-flex; align-items:center; gap:6px; background:linear-gradient(135deg, var(--primary), var(--secondary)); color:#ffffff; padding:4px 12px; border-radius:9999px; font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:8px;">
            <i class="fa-solid fa-camera"></i> ${state.brandName}
          </div>
          <h3 style="font-size:1.25rem; font-weight:800; margin-bottom:4px; color:#ffffff; text-shadow:0 2px 4px rgba(0,0,0,0.5);" ${editAttr} data-edit-key="hero_img_title">${heroImgTitle}</h3>
          <p style="font-size:0.86rem; opacity:0.95; line-height:1.4; color:rgba(255,255,255,0.9);" ${editAttr} data-edit-key="hero_img_desc">${heroImgDesc}</p>
        </div>
      </div>
    `;

    if (arch === "split-classic" || arch === "saas-launchpad") {
      // 1. Classic Split
      heroInnerHTML = `
        <div class="hero-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:40px; max-width:1200px; margin:0 auto; align-items:center;">
          <div class="hero-content">
            <div class="hero-badge"><i class="fa-solid fa-wand-magic-sparkles"></i> <span ${editAttr} data-edit-key="hero_badge">${state.customOverrides['hero_badge'] || '1. Classic Split Layout'}</span></div>
            <h1 class="hero-title" ${editAttr} data-edit-key="heroTitle">${state.customOverrides['heroTitle'] || state.heroTitle}</h1>
            <p class="hero-desc" ${editAttr} data-edit-key="heroDesc">${state.customOverrides['heroDesc'] || state.heroDesc}</p>
            <div class="hero-cta">
              <a href="#contact" class="btn btn-primary" ${editAttr} data-edit-key="ctaText">${state.customOverrides['ctaText'] || state.ctaText}</a>
              <a href="#features" class="btn-secondary-link">Se Ydelser <i class="fa-solid fa-arrow-down"></i></a>
            </div>
          </div>
          ${heroRightVisualHTML}
        </div>`;
    } else if (arch === "hero-banner" || arch === "executive-biz") {
      // 2. Hero Banner / Executive Biz
      heroInnerHTML = `
        <div class="hero-content centered-hero" style="max-width:1200px; margin:0 auto; width:100%;">
          <div style="text-align:center; max-width:800px; margin:0 auto 30px auto;">
            <div class="hero-badge"><i class="fa-solid fa-sparkles"></i> <span ${editAttr} data-edit-key="hero_badge">${state.customOverrides['hero_badge'] || '2. Hero Banner & Executive Layout'}</span></div>
            <h1 class="hero-title" ${editAttr} data-edit-key="heroTitle">${state.customOverrides['heroTitle'] || state.heroTitle}</h1>
            <p class="hero-desc" ${editAttr} data-edit-key="heroDesc">${state.customOverrides['heroDesc'] || state.heroDesc}</p>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:30px; align-items:center; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.12); padding:30px; border-radius:28px;">
            <div>
              <h3 style="font-size:1.4rem; margin-bottom:12px;"><i class="fa-solid fa-trophy" style="color:var(--secondary);"></i> Professionel Løsning til Tiden</h3>
              <p style="opacity:0.9; margin-bottom:20px;">Vi sikrer gennemsigtighed, høj kvalitet og fuld tilfredshed på alle opgaver.</p>
              <a href="#contact" class="btn btn-primary" ${editAttr} data-edit-key="ctaText">${state.customOverrides['ctaText'] || state.ctaText}</a>
            </div>
            ${heroRightVisualHTML}
          </div>
        </div>`;
    } else if (arch === "hero-stacked") {
      // 3. Stacked Dual
      heroInnerHTML = `
        <div class="hero-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:center; max-width:1200px; margin:0 auto;">
          <div class="hero-content">
            <div class="hero-badge"><i class="fa-solid fa-layer-group"></i> <span ${editAttr} data-edit-key="hero_badge">${state.customOverrides['hero_badge'] || '3. Stacked Dual Layout'}</span></div>
            <h1 class="hero-title" ${editAttr} data-edit-key="heroTitle">${state.customOverrides['heroTitle'] || state.heroTitle}</h1>
            <p class="hero-desc" ${editAttr} data-edit-key="heroDesc">${state.customOverrides['heroDesc'] || state.heroDesc}</p>
            <div class="hero-cta">
              <a href="#contact" class="btn btn-primary" ${editAttr} data-edit-key="ctaText">${state.customOverrides['ctaText'] || state.ctaText}</a>
            </div>
          </div>
          <div class="hero-stacked-cards" style="display:flex; flex-direction:column; gap:20px;">
            ${heroRightVisualHTML}
            <div class="stacked-card" style="background:rgba(6,182,212,0.15); border:1px solid var(--secondary); padding:16px 20px; border-radius:18px; display:flex; align-items:center; gap:16px;">
              <img src="${photo2}" alt="Foto 2" style="width:80px; height:60px; object-fit:cover; border-radius:10px;">
              <div>
                <h4 style="font-size:0.95rem; color:var(--secondary);"><i class="fa-solid fa-bolt"></i> Kvalitetsgaranti & Hurtig Levering</h4>
                <p style="font-size:0.82rem; opacity:0.9;">Få uforpligtende rådgivning i dag.</p>
              </div>
            </div>
          </div>
        </div>`;
    } else if (arch === "grid-3-cards") {
      // 4. 3 Grid Cards
      heroInnerHTML = `
        <div class="hero-content grid-hero" style="max-width:1200px; margin:0 auto; width:100%;">
          <div class="hero-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:center; margin-bottom:30px;">
            <div class="hero-content-left">
              <div class="hero-badge"><i class="fa-solid fa-table-cells-large"></i> 4. 3 Grid Cards Layout</div>
              <h1 class="hero-title" ${editAttr} data-edit-key="heroTitle">${state.customOverrides['heroTitle'] || state.heroTitle}</h1>
              <p class="hero-desc" ${editAttr} data-edit-key="heroDesc">${state.customOverrides['heroDesc'] || state.heroDesc}</p>
            </div>
            ${heroRightVisualHTML}
          </div>
          <div class="hero-cards-row" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:20px;">
            <div class="hero-card-item" style="background:rgba(255,255,255,0.05); border:1px solid var(--primary); padding:18px; border-radius:18px; overflow:hidden;">
              <img src="${photo1}" alt="Foto 1" style="width:100%; height:140px; object-fit:cover; border-radius:12px; margin-bottom:12px;">
              <h3>Kvalitet & Præcision</h3>
              <p style="font-size:0.85rem; opacity:0.8; margin-top:4px;">Højeste standarder i alt hvad vi udfører.</p>
            </div>
            <div class="hero-card-item" style="background:rgba(255,255,255,0.05); border:1px solid var(--secondary); padding:18px; border-radius:18px; overflow:hidden;">
              <img src="${photo2}" alt="Foto 2" style="width:100%; height:140px; object-fit:cover; border-radius:12px; margin-bottom:12px;">
              <h3>Sikkerhed & Tryghed</h3>
              <p style="font-size:0.85rem; opacity:0.8; margin-top:4px;">Faste priser og klar kommunikation.</p>
            </div>
            <div class="hero-card-item" style="background:rgba(255,255,255,0.05); border:1px solid var(--primary); padding:18px; border-radius:18px; overflow:hidden;">
              <img src="${photo3}" alt="Foto 3" style="width:100%; height:140px; object-fit:cover; border-radius:12px; margin-bottom:12px;">
              <h3>100% Tilfredshed</h3>
              <p style="font-size:0.85rem; opacity:0.8; margin-top:4px;">Glade kunder er vores bedste anbefaling.</p>
            </div>
          </div>
        </div>`;
    } else if (arch === "horizontal-cards") {
      // 5. Horizontal Rows
      heroInnerHTML = `
        <div class="hero-content horizontal-hero" style="max-width:1200px; margin:0 auto; width:100%; display:flex; flex-direction:column; gap:20px;">
          <div style="text-align:center; margin-bottom:10px;">
            <div class="hero-badge"><i class="fa-solid fa-bars-staggered"></i> 5. Horizontal Rows Layout</div>
            <h1 class="hero-title" ${editAttr} data-edit-key="heroTitle">${state.customOverrides['heroTitle'] || state.heroTitle}</h1>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:30px; align-items:center; background:linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.15)); border:1px solid var(--primary); padding:28px; border-radius:24px;">
            <div>
              <p class="hero-desc" style="margin-bottom:20px;" ${editAttr} data-edit-key="heroDesc">${state.customOverrides['heroDesc'] || state.heroDesc}</p>
              <button class="btn-primary" ${editAttr} data-edit-key="ctaText">${state.customOverrides['ctaText'] || state.ctaText}</button>
            </div>
            ${heroRightVisualHTML}
          </div>
          <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); padding:20px 28px; border-radius:18px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
            <div>
              <h3 style="font-size:1.15rem;">Direkte kontakt & hurtig betjening</h3>
              <p style="font-size:0.88rem; opacity:0.8;">Ring til os på ${state.contactPhone} eller send en besked.</p>
            </div>
            <a href="tel:${state.contactPhone}" class="btn-secondary-link"><i class="fa-solid fa-phone"></i> Ring Nu</a>
          </div>
        </div>`;
    } else if (arch === "bento-grid") {
      // 6. Bento 2x2 Grid
      heroInnerHTML = `
        <div class="hero-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:center; max-width:1200px; margin:0 auto;">
          <div class="hero-content">
            <div class="hero-badge"><i class="fa-solid fa-cubes"></i> 6. Bento 2x2 Grid Layout</div>
            <h1 class="hero-title" ${editAttr} data-edit-key="heroTitle">${state.customOverrides['heroTitle'] || state.heroTitle}</h1>
            <p class="hero-desc" ${editAttr} data-edit-key="heroDesc">${state.customOverrides['heroDesc'] || state.heroDesc}</p>
            <div class="hero-cta">
              <button class="btn-primary" ${editAttr} data-edit-key="ctaText">${state.customOverrides['ctaText'] || state.ctaText}</button>
            </div>
          </div>
          <div class="bento-box-wrapper" style="display:flex; flex-direction:column; gap:16px;">
            ${heroRightVisualHTML}
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
              <div style="background:rgba(124,58,237,0.2); border:1px solid var(--primary); padding:16px; border-radius:14px;"><i class="fa-solid fa-bolt" style="color:var(--primary); font-size:1.3rem;"></i><h4 style="margin-top:6px; font-size:0.9rem;">Hurtig Service</h4></div>
              <div style="background:rgba(6,182,212,0.2); border:1px solid var(--secondary); padding:16px; border-radius:14px;"><i class="fa-solid fa-star" style="color:var(--secondary); font-size:1.3rem;"></i><h4 style="margin-top:6px; font-size:0.9rem;">5 Stjerner</h4></div>
            </div>
          </div>
        </div>`;
    } else if (arch === "hero-fullwidth") {
      // 7. Wide Impact
      heroInnerHTML = `
        <div class="hero-content wide-impact-hero" style="max-width:1200px; margin:0 auto; width:100%;">
          <div style="background:linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(236,72,153,0.25) 100%); border:1px solid var(--primary); padding:36px; border-radius:28px; box-shadow:0 25px 60px rgba(0,0,0,0.3); display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:center;">
            <div>
              <div class="hero-badge"><i class="fa-solid fa-expand"></i> 7. Wide Impact Layout</div>
              <h1 class="hero-title" style="font-size:2.4rem;" ${editAttr} data-edit-key="heroTitle">${state.customOverrides['heroTitle'] || state.heroTitle}</h1>
              <p class="hero-desc" ${editAttr} data-edit-key="heroDesc">${state.customOverrides['heroDesc'] || state.heroDesc}</p>
              <button class="btn-primary" style="font-size:1.1rem; padding:16px 36px;" ${editAttr} data-edit-key="ctaText">${state.customOverrides['ctaText'] || state.ctaText}</button>
            </div>
            ${heroRightVisualHTML}
          </div>
        </div>`;
    } else if (arch === "asymmetric-stacked") {
      // 8. Asymmetric Stack
      heroInnerHTML = `
        <div class="hero-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:center; max-width:1200px; margin:0 auto;">
          <div class="hero-content">
            <div class="hero-badge"><i class="fa-solid fa-shapes"></i> 8. Asymmetric Stack Layout</div>
            <h1 class="hero-title" ${editAttr} data-edit-key="heroTitle">${state.customOverrides['heroTitle'] || state.heroTitle}</h1>
            <p class="hero-desc" ${editAttr} data-edit-key="heroDesc">${state.customOverrides['heroDesc'] || state.heroDesc}</p>
            <div class="hero-cta">
              <button class="btn-primary" ${editAttr} data-edit-key="ctaText">${state.customOverrides['ctaText'] || state.ctaText}</button>
            </div>
          </div>
          <div class="asymmetric-wrapper" style="transform:rotate(-1.5deg);">
            ${heroRightVisualHTML}
          </div>
        </div>`;
    } else if (arch === "split-5050") {
      // 9. 50/50 Split
      heroInnerHTML = `
        <div class="hero-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:40px; max-width:1200px; margin:0 auto; align-items:center;">
          <div class="hero-content" style="background:rgba(255,255,255,0.04); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,0.12); padding:40px; border-radius:24px;">
            <div class="hero-badge"><i class="fa-solid fa-scale-balanced"></i> 9. 50/50 Split Layout</div>
            <h1 class="hero-title" ${editAttr} data-edit-key="heroTitle">${state.customOverrides['heroTitle'] || state.heroTitle}</h1>
            <p class="hero-desc" ${editAttr} data-edit-key="heroDesc">${state.customOverrides['heroDesc'] || state.heroDesc}</p>
            <button class="btn-primary" ${editAttr} data-edit-key="ctaText">${state.customOverrides['ctaText'] || state.ctaText}</button>
          </div>
          ${heroRightVisualHTML}
        </div>`;
    } else if (arch === "multi-row-cards") {
      // 10. Multi-Row Cards
      heroInnerHTML = `
        <div class="hero-content multi-row-hero" style="max-width:1200px; margin:0 auto; width:100%; display:flex; flex-direction:column; gap:20px;">
          <div class="hero-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:30px; align-items:center;">
            <div class="hero-content">
              <div class="hero-badge"><i class="fa-solid fa-bars"></i> 10. Multi-Row Cards Layout</div>
              <h1 class="hero-title" ${editAttr} data-edit-key="heroTitle">${state.customOverrides['heroTitle'] || state.heroTitle}</h1>
              <p class="hero-desc" ${editAttr} data-edit-key="heroDesc">${state.customOverrides['heroDesc'] || state.heroDesc}</p>
            </div>
            ${heroRightVisualHTML}
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
            <div style="background:rgba(124,58,237,0.15); border:1px solid var(--primary); padding:20px 24px; border-radius:18px; display:flex; justify-content:space-between; align-items:center;">
              <h4 style="font-size:1.05rem;">Certificerede & Erfarne Fagfolk</h4>
              <button class="btn-primary" ${editAttr} data-edit-key="ctaText">${state.customOverrides['ctaText'] || state.ctaText}</button>
            </div>
            <div style="background:rgba(6,182,212,0.15); border:1px solid var(--secondary); padding:20px 24px; border-radius:18px; display:flex; justify-content:space-between; align-items:center;">
              <h4 style="font-size:1.05rem;">100% Tilfredshedsgaranti på alt</h4>
              <a href="tel:${state.contactPhone}" class="btn-secondary-link"><i class="fa-solid fa-phone"></i> ${state.contactPhone}</a>
            </div>
          </div>
        </div>`;
    } else if (arch === "stacked-banners") {
      // 11. Stacked Banners
      heroInnerHTML = `
        <div class="hero-content stacked-banners-hero" style="max-width:1200px; margin:0 auto; width:100%; display:flex; flex-direction:column; gap:20px;">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:30px; align-items:center; background:linear-gradient(135deg, rgba(236,72,153,0.2) 0%, rgba(124,58,237,0.2) 100%); border:1px solid #ec4899; padding:32px; border-radius:24px;">
            <div>
              <div class="hero-badge"><i class="fa-solid fa-layer-group"></i> 11. Stacked Banners Layout</div>
              <h1 class="hero-title" style="font-size:2.2rem; margin:10px 0;" ${editAttr} data-edit-key="heroTitle">${state.customOverrides['heroTitle'] || state.heroTitle}</h1>
              <p class="hero-desc" ${editAttr} data-edit-key="heroDesc">${state.customOverrides['heroDesc'] || state.heroDesc}</p>
            </div>
            ${heroRightVisualHTML}
          </div>
          <div style="background:rgba(124,58,237,0.15); border:1px solid var(--primary); padding:20px 28px; border-radius:16px; display:flex; justify-content:space-between; align-items:center;">
            <h3 style="font-size:1.1rem;">Bånd Sektion 2 — Kvalitetsløsninger i Højeste Klasse</h3>
            <button class="btn-primary" ${editAttr} data-edit-key="ctaText">${state.customOverrides['ctaText'] || state.ctaText}</button>
          </div>
        </div>`;
    } else if (arch === "hero-3-columns") {
      // 12. Hero + 3 Columns
      heroInnerHTML = `
        <div class="hero-content hero-3col" style="max-width:1200px; margin:0 auto; width:100%;">
          <div class="hero-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:center; margin-bottom:30px;">
            <div class="hero-content-left">
              <div class="hero-badge"><i class="fa-solid fa-table-columns"></i> 12. Hero + 3 Columns Layout</div>
              <h1 class="hero-title" ${editAttr} data-edit-key="heroTitle">${state.customOverrides['heroTitle'] || state.heroTitle}</h1>
              <p class="hero-desc" ${editAttr} data-edit-key="heroDesc">${state.customOverrides['heroDesc'] || state.heroDesc}</p>
            </div>
            ${heroRightVisualHTML}
          </div>
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:20px;">
            <div style="background:rgba(255,255,255,0.05); border:1px solid var(--primary); padding:18px; border-radius:18px;">
              <img src="${photo1}" alt="Søjle 1" style="width:100%; height:130px; object-fit:cover; border-radius:12px; margin-bottom:10px;">
              <h3>Erfaring & Ekspertise</h3>
            </div>
            <div style="background:rgba(255,255,255,0.05); border:1px solid var(--secondary); padding:18px; border-radius:18px;">
              <img src="${photo2}" alt="Søjle 2" style="width:100%; height:130px; object-fit:cover; border-radius:12px; margin-bottom:10px;">
              <h3>Hurtig Udførelse</h3>
            </div>
            <div style="background:rgba(255,255,255,0.05); border:1px solid var(--primary); padding:18px; border-radius:18px;">
              <img src="${photo3}" alt="Søjle 3" style="width:100%; height:130px; object-fit:cover; border-radius:12px; margin-bottom:10px;">
              <h3>Kunde i Fokus</h3>
            </div>
          </div>
        </div>`;
    } else if (arch === "top-cards-3") {
      // 13. Top 3 Cards
      heroInnerHTML = `
        <div class="hero-content top-cards-hero" style="max-width:1200px; margin:0 auto; width:100%;">
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; margin-bottom:28px;">
            <div style="background:rgba(16,185,129,0.15); border:1px solid #10b981; padding:16px; border-radius:16px; display:flex; align-items:center; gap:12px;"><i class="fa-solid fa-bolt" style="font-size:1.4rem; color:#10b981;"></i><div><h4 style="font-size:0.95rem;">Fast Pris</h4><p style="font-size:0.78rem; opacity:0.8;">Ingen ubehagelige overaskelser</p></div></div>
            <div style="background:rgba(16,185,129,0.15); border:1px solid #10b981; padding:16px; border-radius:16px; display:flex; align-items:center; gap:12px;"><i class="fa-solid fa-shield-halved" style="font-size:1.4rem; color:#10b981;"></i><div><h4 style="font-size:0.95rem;">Certificeret</h4><p style="font-size:0.78rem; opacity:0.8;">Autoriseret garanti på alt</p></div></div>
            <div style="background:rgba(16,185,129,0.15); border:1px solid #10b981; padding:16px; border-radius:16px; display:flex; align-items:center; gap:12px;"><i class="fa-solid fa-star" style="font-size:1.4rem; color:#10b981;"></i><div><h4 style="font-size:0.95rem;">Høj Rating</h4><p style="font-size:0.78rem; opacity:0.8;">5 ud af 5 stjerner fra kunder</p></div></div>
          </div>
          <div class="hero-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:center;">
            <div class="hero-content">
              <div class="hero-badge"><i class="fa-solid fa-arrow-up-1-9"></i> 13. Top 3 Cards Layout</div>
              <h1 class="hero-title" ${editAttr} data-edit-key="heroTitle">${state.customOverrides['heroTitle'] || state.heroTitle}</h1>
              <p class="hero-desc" ${editAttr} data-edit-key="heroDesc">${state.customOverrides['heroDesc'] || state.heroDesc}</p>
              <button class="btn-primary" ${editAttr} data-edit-key="ctaText">${state.customOverrides['ctaText'] || state.ctaText}</button>
            </div>
            ${heroRightVisualHTML}
          </div>
        </div>`;
    } else if (arch === "sidebar-layout") {
      // 14. Sidebar Split
      heroInnerHTML = `
        <div class="hero-sidebar-grid" style="display:grid; grid-template-columns:260px 1fr 1fr; gap:24px; max-width:1200px; margin:0 auto; width:100%; align-items:center;">
          <div class="sidebar-box" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.12); padding:24px; border-radius:20px; display:flex; flex-direction:column; gap:14px;">
            <div class="brand-badge"><i class="fa-solid fa-cube"></i> 14. Sidebar Split</div>
            <h3 style="font-size:1.1rem;">Menu & Info</h3>
            <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px; font-size:0.88rem; opacity:0.88;">
              <li><i class="fa-solid fa-check text-gradient"></i> Kvalitetsgaranti</li>
              <li><i class="fa-solid fa-check text-gradient"></i> Erfarne Fagfolk</li>
              <li><i class="fa-solid fa-check text-gradient"></i> Fast Lav Pris</li>
              <li><i class="fa-solid fa-phone text-gradient"></i> ${state.contactPhone}</li>
            </ul>
            <button class="btn-primary" style="margin-top:auto;" ${editAttr} data-edit-key="ctaText">${state.customOverrides['ctaText'] || state.ctaText}</button>
          </div>
          <div class="main-content-box">
            <h1 class="hero-title" ${editAttr} data-edit-key="heroTitle">${state.customOverrides['heroTitle'] || state.heroTitle}</h1>
            <p class="hero-desc" ${editAttr} data-edit-key="heroDesc">${state.customOverrides['heroDesc'] || state.heroDesc}</p>
          </div>
          ${heroRightVisualHTML}
        </div>`;
    } else if (arch === "media-left-list") {
      // 15. Media Left List
      heroInnerHTML = `
        <div class="hero-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:center; max-width:1200px; margin:0 auto;">
          ${heroRightVisualHTML}
          <div class="hero-content">
            <div class="hero-badge"><i class="fa-solid fa-list-check"></i> 15. Media Left List Layout</div>
            <h1 class="hero-title" ${editAttr} data-edit-key="heroTitle">${state.customOverrides['heroTitle'] || state.heroTitle}</h1>
            <p class="hero-desc" ${editAttr} data-edit-key="heroDesc">${state.customOverrides['heroDesc'] || state.heroDesc}</p>
            <div class="feature-list" style="display:flex; flex-direction:column; gap:12px; margin-bottom:28px;">
              <div style="background:rgba(255,255,255,0.06); padding:12px 18px; border-radius:12px; display:flex; align-items:center; gap:12px; font-weight:600;"><i class="fa-solid fa-circle-check" style="color:var(--primary);"></i> Skræddersyet løsning til dine behov</div>
              <div style="background:rgba(255,255,255,0.06); padding:12px 18px; border-radius:12px; display:flex; align-items:center; gap:12px; font-weight:600;"><i class="fa-solid fa-circle-check" style="color:var(--secondary);"></i> Hurtig responstid og direkte kontakt</div>
            </div>
            <button class="btn-primary" ${editAttr} data-edit-key="ctaText">${state.customOverrides['ctaText'] || state.ctaText}</button>
          </div>
        </div>`;
    } else {
      // Fallback for all other industry presets & archetypes
      heroInnerHTML = `
        <div class="hero-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:40px; max-width:1200px; margin:0 auto; align-items:center;">
          <div class="hero-content">
            <div class="hero-badge"><i class="fa-solid fa-wand-magic-sparkles"></i> <span ${editAttr} data-edit-key="hero_badge">${state.customOverrides['hero_badge'] || state.brandName}</span></div>
            <h1 class="hero-title" ${editAttr} data-edit-key="heroTitle">${state.customOverrides['heroTitle'] || state.heroTitle}</h1>
            <p class="hero-desc" ${editAttr} data-edit-key="heroDesc">${state.customOverrides['heroDesc'] || state.heroDesc}</p>
            <div class="hero-cta">
              <button class="btn-primary" ${editAttr} data-edit-key="ctaText">${state.customOverrides['ctaText'] || state.ctaText}</button>
            </div>
          </div>
          ${heroRightVisualHTML}
        </div>`;
    }

    return `
<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <base href="${window.location.origin}/">
  <title>${state.customOverrides['brandName'] || state.brandName} — ${state.customOverrides['tagline'] || state.tagline}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@500;600;700&family=Space+Grotesk:wght@500;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <style>
    :root {
      --primary: ${state.colorPrimary};
      --secondary: ${state.colorSecondary};
      --bg: ${state.colorBg};
      --text: ${state.bgMode === 'light' ? '#0f172a' : state.colorText};
      --font-heading: ${fontStyle.heading};
      --font-body: ${fontStyle.body};
      --btn-radius: ${btnRadius};
    }

    html { scroll-behavior: smooth; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    body {
      font-family: var(--font-body);
      ${bgStyleCSS}
      line-height: 1.6;
      overflow-x: hidden;
    }

    h1, h2, h3, h4 {
      font-family: var(--font-heading);
      font-weight: 700;
      line-height: 1.2;
    }

    a { color: inherit; text-decoration: none; }

    /* EDITABLE HIGHLIGHT */
    [contenteditable="true"] {
      outline: none;
      transition: background 0.2s, box-shadow 0.2s;
      border-radius: 4px;
      padding: 2px 4px;
    }
    [contenteditable="true"]:hover {
      background: rgba(6, 182, 212, 0.15);
      box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.4);
    }
    [contenteditable="true"]:focus {
      background: rgba(124, 58, 237, 0.2);
      box-shadow: 0 0 0 2px var(--primary);
    }

    /* BUTTONS */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 28px;
      border-radius: var(--btn-radius);
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      ${btnEffectCSS}
    }
    .btn:hover {
      transform: translateY(-3px) scale(1.02);
      opacity: 0.95;
    }

    .btn-secondary {
      background: ${state.bgMode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)'};
      border: 1px solid ${state.bgMode === 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.15)'};
      color: var(--text);
      border-radius: var(--btn-radius);
      padding: 14px 28px;
      font-weight: 600;
    }
    .btn-secondary:hover { background: ${state.bgMode === 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.18)'}; }

    /* NAVIGATION */
    header.site-nav {
      position: sticky;
      top: 0;
      z-index: 100;
      padding: 18px 5%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${isDarkBg ? '#f8fafc' : '#0f172a'};
      ${state.navStyle === 'glass-sticky' ? (isDarkBg ? 'background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255, 255, 255, 0.12); box-shadow: 0 4px 20px rgba(0,0,0,0.3);' : 'background: rgba(255, 255, 255, 0.88); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid rgba(0, 0, 0, 0.08); box-shadow: 0 4px 20px rgba(0,0,0,0.05);') : ''}
      ${state.navStyle === 'floating-island' ? (isDarkBg ? 'margin: 15px 5%; border-radius: 9999px; background: rgba(15, 23, 42, 0.88); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 15px 35px rgba(0,0,0,0.4);' : 'margin: 15px 5%; border-radius: 9999px; background: rgba(255, 255, 255, 0.92); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(0, 0, 0, 0.1); box-shadow: 0 15px 35px rgba(0,0,0,0.08);') : ''}
      ${state.navStyle === 'minimal-clean' ? (isDarkBg ? 'background: transparent; border-bottom: 1px solid rgba(255,255,255,0.1);' : 'background: transparent; border-bottom: 1px solid rgba(0,0,0,0.08);') : ''}
      transition: all 0.3s ease;
    }

    .brand-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: var(--font-heading);
      font-size: 1.35rem;
      font-weight: 800;
      color: ${isDarkBg ? '#ffffff' : '#0f172a'};
      letter-spacing: -0.02em;
    }
    .logo-icon {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 1.2rem;
      box-shadow: 0 4px 12px ${state.colorPrimary}40;
    }

    .nav-links {
      display: flex;
      gap: 24px;
      align-items: center;
      font-weight: 600;
      font-size: 0.95rem;
    }
    .nav-links a {
      color: ${isDarkBg ? 'rgba(248, 250, 252, 0.9)' : 'rgba(15, 23, 42, 0.85)'};
      transition: all 0.2s ease;
      padding: 6px 12px;
      border-radius: 8px;
      text-decoration: none;
    }
    .nav-links a:hover {
      color: var(--primary);
      background: ${isDarkBg ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'};
    }

    .site-nav .btn {
      padding: 10px 22px;
      font-size: 0.9rem;
      font-weight: 700;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: #ffffff !important;
      border: none;
      border-radius: var(--btn-radius);
      box-shadow: 0 4px 14px ${state.colorPrimary}40;
      transition: all 0.2s ease;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .site-nav .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px ${state.colorPrimary}60;
      opacity: 0.95;
    }

    /* HERO SECTION */
    .hero-section {
      padding: 40px 5% 40px 5%;
      position: relative;
      width: 100%;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 36px;
      max-width: 1200px;
      margin: 0 auto;
      align-items: center;
      text-align: left;
      width: 100%;
    }

    @media (max-width: 768px) {
      .hero-grid {
        grid-template-columns: 1fr !important;
        gap: 24px;
      }
      .hero-right-visual {
        height: 280px !important;
      }
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      border-radius: 9999px;
      background: ${state.bgMode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)'};
      border: 1px solid var(--primary);
      color: var(--primary);
      font-size: 0.82rem;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    .hero-title {
      font-size: clamp(2.5rem, 5vw, 4.2rem);
      margin-bottom: 20px;
      letter-spacing: -1px;
    }

    .text-gradient {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-desc {
      font-size: 1.15rem;
      opacity: 0.85;
      margin-bottom: 35px;
      max-width: ${state.heroLayout === 'centered-impact' ? '700px' : '100%'};
      ${state.heroLayout === 'centered-impact' ? 'margin-left: auto; margin-right: auto;' : ''}
    }

    .hero-cta {
      display: flex;
      gap: 16px;
      justify-content: ${state.heroLayout === 'centered-impact' ? 'center' : 'flex-start'};
    }

    .hero-visual {
      position: relative;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(0,0,0,0.4);
      border: 1px solid rgba(255,255,255,0.15);
      max-height: 480px;
    }
    .hero-visual img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* BENTO GRID STYLES */
    .bento-grid-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .bento-card {
      background: ${state.bgMode === 'light' ? '#ffffff' : 'rgba(255,255,255,0.04)'};
      border: 1px solid ${state.bgMode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'};
      border-radius: 20px;
      padding: 30px;
      display: flex;
      flex-direction: column;
    }
    .bento-large { grid-column: span 2; }
    .bento-wide { grid-column: span 3; }

    /* FEATURES SECTION */
    .features-section {
      padding: 80px 5%;
      background: ${state.bgMode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)'};
      border-top: 1px solid rgba(255,255,255,0.05);
    }
    .section-title {
      text-align: center;
      max-width: 600px;
      margin: 0 auto 60px auto;
    }
    .section-title h2 { font-size: 2.3rem; margin-bottom: 12px; }
    
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .card {
      background: ${state.bgMode === 'light' ? '#ffffff' : 'rgba(255,255,255,0.04)'};
      border: 1px solid ${state.bgMode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'};
      border-radius: 20px;
      padding: 35px 28px;
      transition: all 0.3s ease;
      box-shadow: ${state.bgMode === 'light' ? '0 10px 25px rgba(0,0,0,0.05)' : 'none'};
    }
    .card:hover {
      transform: translateY(-8px);
      border-color: var(--primary);
      box-shadow: 0 15px 35px rgba(0,0,0,0.3);
    }

    .card-icon {
      width: 55px;
      height: 55px;
      border-radius: 14px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      color: white;
      margin-bottom: 22px;
    }

    /* SHOWCASE / PORTFOLIO */
    .showcase-section {
      padding: 80px 5%;
      max-width: 1200px;
      margin: 0 auto;
    }
    .portfolio-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 30px;
    }
    .portfolio-item {
      border-radius: 20px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.1);
      position: relative;
      height: 260px;
    }
    .portfolio-item img { width: 100%; height: 100%; object-fit: cover; }
    .portfolio-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      color: white;
    }

    /* PRICING TABLE */
    .pricing-section {
      padding: 80px 5%;
      background: ${state.bgMode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)'};
    }
    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 30px;
      max-width: 1000px;
      margin: 0 auto;
    }
    .price-card {
      background: ${state.bgMode === 'light' ? '#ffffff' : 'rgba(255,255,255,0.04)'};
      border: 1px solid ${state.bgMode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'};
      border-radius: 24px;
      padding: 40px 30px;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .price-card.popular {
      border-color: var(--primary);
      background: linear-gradient(180deg, rgba(124, 58, 237, 0.15) 0%, rgba(255,255,255,0.02) 100%);
    }
    .price { font-size: 2.8rem; font-weight: 800; margin: 20px 0; }

    /* FAQ ACCORDION */
    .faq-section {
      padding: 80px 5%;
      max-width: 800px;
      margin: 0 auto;
    }
    .faq-item {
      background: ${state.bgMode === 'light' ? '#ffffff' : 'rgba(255,255,255,0.04)'};
      border: 1px solid ${state.bgMode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'};
      border-radius: 14px;
      margin-bottom: 14px;
      overflow: hidden;
    }
    .faq-question {
      padding: 20px 24px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .faq-answer {
      padding: 0 24px 20px 24px;
      opacity: 0.8;
      font-size: 0.95rem;
    }

    /* FOOTER */
    footer.site-footer {
      padding: 60px 5% 30px 5%;
      border-top: 1px solid rgba(255,255,255,0.08);
      text-align: center;
      opacity: 0.8;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .hero-grid { grid-template-columns: 1fr; text-align: center; }
      .hero-cta { justify-content: center; }
      .nav-links { display: none; }
      .bento-grid-container { grid-template-columns: 1fr; }
      .bento-large, .bento-wide { grid-column: span 1; }
    }
  </style>
</head>
<body>

  <!-- NAVIGATION BAR -->
  <header class="site-nav">
    <div class="brand-logo">
      <div class="logo-icon">
        <i class="fa-solid ${state.logoIcon}"></i>
      </div>
      <span ${editAttr} data-edit-key="brandName">${state.customOverrides['brandName'] || state.brandName}</span>
    </div>
    <nav class="nav-links">
      <a href="${isProduction ? 'index.html' : '#'}" ${isProduction ? '' : 'onclick="window.parent.postMessage({type:\'SWITCH_SUBPAGE\', page:\'index\'}, \'*\'); return false;"'} class="${page === 'index' ? 'active' : ''}">Forside</a>
      <a href="${isProduction ? 'om-os.html' : '#'}" ${isProduction ? '' : 'onclick="window.parent.postMessage({type:\'SWITCH_SUBPAGE\', page:\'about\'}, \'*\'); return false;"'} class="${page === 'about' ? 'active' : ''}">Om Os</a>
      <a href="${isProduction ? 'ydelser.html' : '#'}" ${isProduction ? '' : 'onclick="window.parent.postMessage({type:\'SWITCH_SUBPAGE\', page:\'services\'}, \'*\'); return false;"'} class="${page === 'services' ? 'active' : ''}">Ydelser</a>
      <a href="${isProduction ? 'priser.html' : '#'}" ${isProduction ? '' : 'onclick="window.parent.postMessage({type:\'SWITCH_SUBPAGE\', page:\'pricing\'}, \'*\'); return false;"'} class="${page === 'pricing' ? 'active' : ''}">Priser</a>
      <a href="${isProduction ? 'kontakt.html' : '#'}" ${isProduction ? '' : 'onclick="window.parent.postMessage({type:\'SWITCH_SUBPAGE\', page:\'contact\'}, \'*\'); return false;"'} class="btn">Kontakt</a>
    </nav>
  </header>

  ${page === 'index' ? `
  <!-- HERO SECTION -->
  <section class="hero-section" id="hero">
    ${heroInnerHTML}
  </section>
  <section class="about-section" id="om" style="padding:80px 5%; max-width:1200px; margin:0 auto;">
    <div class="section-title">
      <h2 ${editAttr} data-edit-key="about_title">${state.customOverrides['about_title'] || `Om ${state.brandName}`}</h2>
      <p ${editAttr} data-edit-key="aboutText">${state.customOverrides['aboutText'] || state.aboutText}</p>
    </div>
  </section>
  ${featuresHTML}
  ${state.sections.payment ? `
  <section class="payment-section" id="betaling" style="padding:80px 5%; max-width:1200px; margin:0 auto; text-align:center;">
    <div class="section-title">
      <h2 ${editAttr} data-edit-key="pay_title">${state.customOverrides['pay_title'] || 'Hurtig Betaling & Online Booking'}</h2>
      <p ${editAttr} data-edit-key="pay_sub">${state.customOverrides['pay_sub'] || 'Betal nemt med MobilePay, Kreditkort / Apple Pay eller bestil en tid direkte online.'}</p>
    </div>
    <div class="payment-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:24px; margin-top:40px;">
      <div class="pay-card" style="background:${state.bgMode === 'light' ? '#ffffff' : 'rgba(255,255,255,0.04)'}; border:2px solid #5a52ff; border-radius:20px; padding:32px; display:flex; flex-direction:column; align-items:center;">
        <i class="fa-solid fa-mobile-screen-button" style="font-size:2rem; color:#5a52ff; margin-bottom:12px;"></i>
        <h3>MobilePay Betaling</h3>
        <p style="margin-bottom:16px;">Overfør direkte via MobilePay MyShop: <strong>${state.mobilepayNumber || '88888'}</strong></p>
      </div>
      <div class="pay-card" style="background:${state.bgMode === 'light' ? '#ffffff' : 'rgba(255,255,255,0.04)'}; border:2px solid var(--primary); border-radius:20px; padding:32px; display:flex; flex-direction:column; align-items:center;">
        <i class="fa-solid fa-credit-card" style="font-size:2rem; color:var(--primary); margin-bottom:12px;"></i>
        <h3>Kort & Apple Pay</h3>
        <p style="margin-bottom:16px;">Sikker online betaling og fakturering</p>
      </div>
    </div>
  </section>` : ''}
  ${state.sections.showcase ? `
  <section class="showcase-section" id="portfolio" style="padding:80px 5%; max-width:1200px; margin:0 auto;">
    <div class="section-title">
      <h2>Billedgalleri & Projekter</h2>
    </div>
    <div class="portfolio-grid">${portfolioItemsHTML}</div>
  </section>` : ''}
  ${state.sections.contact ? `
  <section class="contact-section" id="contact" style="padding:80px 5%; background:${state.bgMode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)'}; border-top:1px solid rgba(255,255,255,0.08);">
    <div class="section-title">
      <h2 ${editAttr} data-edit-key="cnt_title">${state.customOverrides['cnt_title'] || `Kontakt ${state.brandName}`}</h2>
      <p ${editAttr} data-edit-key="cnt_sub">${state.customOverrides['cnt_sub'] || `Ring på ${state.contactPhone} eller skriv til ${state.contactEmail}.`}</p>
    </div>
  </section>` : ''}
  ` : ''}

  ${page === 'about' ? `
  <!-- STANDALONE OM OS UNDERSIDE -->
  <section style="padding:60px 5% 20px 5%; max-width:1200px; margin:0 auto; text-align:center;">
    <div class="hero-badge"><i class="fa-solid fa-circle-info"></i> Om Os & Historie</div>
    <h1 style="font-size:3rem; margin:16px 0;" ${editAttr} data-edit-key="sub_about_t">${state.customOverrides['sub_about_t'] || `Om ${state.brandName}`}</h1>
    <p style="font-size:1.2rem; opacity:0.9; max-width:800px; margin:0 auto 30px auto;" ${editAttr} data-edit-key="aboutText">${state.customOverrides['aboutText'] || state.aboutText}</p>
  </section>

  <!-- ABOUT HERO VISUAL + VALUES -->
  <section style="padding:40px 5%; max-width:1200px; margin:0 auto;">
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:center;">
      ${heroRightVisualHTML}
      <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); padding:36px; border-radius:24px;">
        <h2 style="font-size:1.8rem; margin-bottom:16px;"><i class="fa-solid fa-gem text-gradient"></i> Vores Filosofi & Faglighed</h2>
        <p style="opacity:0.9; line-height:1.8; margin-bottom:20px;">Hos ${state.brandName} brænder vi for at levere de bedste løsninger med fokus på præcision, tryghed og høj kundetilfredshed. Vores faglige stolthed danner fundamentet for alt vores arbejde.</p>
        <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:24px; font-weight:600;">
          <div><i class="fa-solid fa-circle-check" style="color:var(--primary);"></i> 100% Tilfredshedsgaranti på alle projekter</div>
          <div><i class="fa-solid fa-circle-check" style="color:var(--secondary);"></i> Erfarne & certificerede fagfolk</div>
          <div><i class="fa-solid fa-circle-check" style="color:var(--primary);"></i> Gennemskuelige aftaler og faste priser</div>
        </div>
        <a href="${isProduction ? 'kontakt.html' : '#'}" ${isProduction ? '' : 'onclick="parent.switchPreviewSubpage(\'contact\'); return false;"'} class="btn">Kontakt Os i Dag</a>
      </div>
    </div>
  </section>

  <!-- TEAM / PHOTO SHOWCASE GRID -->
  <section style="padding:60px 5%; max-width:1200px; margin:0 auto;">
    <div class="section-title">
      <h2>Billeder & Glimt fra Hverdagen</h2>
      <p>Et kig bag kulisserne og vores arbejde i marken.</p>
    </div>
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:20px; margin-top:30px;">
      <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:20px; overflow:hidden; padding:16px;">
        <img src="${photo1}" alt="Foto 1" style="width:100%; height:200px; object-fit:cover; border-radius:14px; margin-bottom:12px;" onerror="this.src='https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?auto=format&fit=crop&w=800&q=80'">
        <h3 style="font-size:1.1rem; margin-bottom:4px;">Kvalitet i Fokus</h3>
        <p style="font-size:0.88rem; opacity:0.8;">Højeste faglige standarder i hver detalje.</p>
      </div>
      <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:20px; overflow:hidden; padding:16px;">
        <img src="${photo2}" alt="Foto 2" style="width:100%; height:200px; object-fit:cover; border-radius:14px; margin-bottom:12px;" onerror="this.src='https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80'">
        <h3 style="font-size:1.1rem; margin-bottom:4px;">Dedikeret Rådgivning</h3>
        <p style="font-size:0.88rem; opacity:0.8;">Vi lytter til dine ønsker og behov.</p>
      </div>
      <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:20px; overflow:hidden; padding:16px;">
        <img src="${photo3}" alt="Foto 3" style="width:100%; height:200px; object-fit:cover; border-radius:14px; margin-bottom:12px;" onerror="this.src='https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'">
        <h3 style="font-size:1.1rem; margin-bottom:4px;">Pålidelig Levering</h3>
        <p style="font-size:0.88rem; opacity:0.8;">Aftaler og tidsplaner overholdes 100%.</p>
      </div>
    </div>
  </section>
  ` : ''}

  ${page === 'services' ? `
  <!-- STANDALONE YDELSER UNDERSIDE -->
  <section style="padding:60px 5% 20px 5%; max-width:1200px; margin:0 auto; text-align:center;">
    <div class="hero-badge"><i class="fa-solid fa-screwdriver-wrench"></i> Vores Ydelser</div>
    <h1 style="font-size:3rem; margin:16px 0;" ${editAttr} data-edit-key="sub_serv_t">${state.customOverrides['sub_serv_t'] || `Vores Ydelser & Løsninger`}</h1>
    <p style="font-size:1.2rem; opacity:0.9; max-width:800px; margin:0 auto 30px auto;">Se alt hvad vi tilbyder hos ${state.brandName}. Skræddersyet professionel rådgivning og udførelse.</p>
  </section>
  ${featuresHTML}

  <!-- PHOTO SERVICES SHOWCASE -->
  <section style="padding:60px 5%; max-width:1200px; margin:0 auto;">
    <div class="section-title">
      <h2>Visualisering af Ydelser</h2>
    </div>
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:20px; margin-top:20px;">
      <div style="background:rgba(255,255,255,0.05); border:1px solid var(--primary); border-radius:20px; padding:16px; overflow:hidden;">
        <img src="${photo1}" alt="Service 1" style="width:100%; height:180px; object-fit:cover; border-radius:12px; margin-bottom:12px;" onerror="this.src='https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?auto=format&fit=crop&w=800&q=80'">
        <h3 style="font-size:1.15rem; margin-bottom:6px;">Specialløsninger</h3>
        <p style="font-size:0.88rem; opacity:0.85;">Tilpasset præcis din opgave.</p>
      </div>
      <div style="background:rgba(255,255,255,0.05); border:1px solid var(--secondary); border-radius:20px; padding:16px; overflow:hidden;">
        <img src="${photo2}" alt="Service 2" style="width:100%; height:180px; object-fit:cover; border-radius:12px; margin-bottom:12px;" onerror="this.src='https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80'">
        <h3 style="font-size:1.15rem; margin-bottom:6px;">Løbende Service & Vedligehold</h3>
        <p style="font-size:0.88rem; opacity:0.85;">Fast aftale og tryg opfølgning.</p>
      </div>
      <div style="background:rgba(255,255,255,0.05); border:1px solid var(--primary); border-radius:20px; padding:16px; overflow:hidden;">
        <img src="${photo3}" alt="Service 3" style="width:100%; height:180px; object-fit:cover; border-radius:12px; margin-bottom:12px;" onerror="this.src='https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'">
        <h3 style="font-size:1.15rem; margin-bottom:6px;">Rådgivning & Optimering</h3>
        <p style="font-size:0.88rem; opacity:0.85;">Faglig sparring før opstart.</p>
      </div>
    </div>
  </section>
  ` : ''}

  ${page === 'pricing' ? `
  <!-- STANDALONE PRISER UNDERSIDE -->
  <section style="padding:60px 5% 20px 5%; max-width:1200px; margin:0 auto; text-align:center;">
    <div class="hero-badge"><i class="fa-solid fa-tags"></i> Prisopstilling</div>
    <h1 style="font-size:3rem; margin:16px 0;" ${editAttr} data-edit-key="sub_prc_t">${state.customOverrides['sub_prc_t'] || `Prisoverblik & Pakker`}</h1>
    <p style="font-size:1.2rem; opacity:0.9; max-width:800px; margin:0 auto 30px auto;">Gennemsigtige priser og ingen skjulte gebyrer. Vælg pakken der passer bedst til dig.</p>
  </section>

  <!-- PRICING PACKAGES GRID -->
  <section class="pricing-section" id="pricing" style="padding:20px 5% 60px 5%; max-width:1200px; margin:0 auto;">
    <div class="pricing-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:24px;">
      <div class="price-card" style="background:${state.bgMode === 'light' ? '#ffffff' : 'rgba(255,255,255,0.05)'}; border:1px solid rgba(255,255,255,0.12); padding:32px; border-radius:24px; text-align:center;">
        <h3 style="font-size:1.5rem; margin-bottom:8px;">Starter Pakke</h3>
        <div class="price" style="font-size:2.4rem; font-weight:800; color:var(--primary); margin:16px 0;">4.995 kr</div>
        <p style="opacity:0.85; margin-bottom:20px;">Ideelt til mindre opgaver og opstart.</p>
        <ul style="list-style:none; padding:0; margin:0 0 24px 0; text-align:left; display:flex; flex-direction:column; gap:10px; font-size:0.9rem;">
          <li><i class="fa-solid fa-check" style="color:var(--primary);"></i> Inkluderer grundlæggende rådgivning</li>
          <li><i class="fa-solid fa-check" style="color:var(--primary);"></i> Hurtig eksekvering</li>
          <li><i class="fa-solid fa-check" style="color:var(--primary);"></i> 100% Garanti</li>
        </ul>
        <a href="${isProduction ? 'kontakt.html' : '#'}" ${isProduction ? '' : 'onclick="parent.switchPreviewSubpage(\'contact\'); return false;"'} class="btn-secondary" style="width:100%; justify-content:center;">Vælg Starter</a>
      </div>

      <div class="price-card popular" style="background:${state.bgMode === 'light' ? '#ffffff' : 'rgba(255,255,255,0.06)'}; border:2px solid var(--primary); padding:32px; border-radius:24px; text-align:center; position:relative; box-shadow:0 15px 40px rgba(124,58,237,0.25);">
        <div class="hero-badge" style="margin-bottom:12px;">Mest Populær</div>
        <h3 style="font-size:1.5rem; margin-bottom:8px;">Professional Pakke</h3>
        <div class="price" style="font-size:2.4rem; font-weight:800; color:var(--secondary); margin:16px 0;">9.995 kr</div>
        <p style="opacity:0.85; margin-bottom:20px;">Den mest komplette løsning til virksomheder.</p>
        <ul style="list-style:none; padding:0; margin:0 0 24px 0; text-align:left; display:flex; flex-direction:column; gap:10px; font-size:0.9rem;">
          <li><i class="fa-solid fa-check" style="color:var(--secondary);"></i> Udvidet rådgivning & opfølgning</li>
          <li><i class="fa-solid fa-check" style="color:var(--secondary);"></i> Prioriteret behandling</li>
          <li><i class="fa-solid fa-check" style="color:var(--secondary);"></i> Inkluderer alle moduler & garanti</li>
        </ul>
        <a href="${isProduction ? 'kontakt.html' : '#'}" ${isProduction ? '' : 'onclick="parent.switchPreviewSubpage(\'contact\'); return false;"'} class="btn" style="width:100%; justify-content:center;">Vælg Professional</a>
      </div>
    </div>
  </section>

  <!-- PRICING HERO VISUAL BANNER WITH PHOTO -->
  <section style="padding:40px 5%; max-width:1200px; margin:0 auto;">
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:center; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); padding:30px; border-radius:28px;">
      ${heroRightVisualHTML}
      <div>
        <h2 style="font-size:1.8rem; margin-bottom:12px;">Skræddersyet Tilbud?</h2>
        <p style="opacity:0.9; margin-bottom:20px;">Har du en opgave der kræver en særlig tilpasset aftale? Vi giver gerne et uforpligtende fast tilbud.</p>
        <a href="${isProduction ? 'kontakt.html' : '#'}" ${isProduction ? '' : 'onclick="parent.switchPreviewSubpage(\'contact\'); return false;"'} class="btn"><i class="fa-solid fa-calculator"></i> Indhent Tilbud</a>
      </div>
    </div>
  </section>
  ` : ''}

  ${page === 'contact' ? `
  <!-- STANDALONE KONTAKT UNDERSIDE -->
  <section style="padding:60px 5% 20px 5%; max-width:1200px; margin:0 auto; text-align:center;">
    <div class="hero-badge"><i class="fa-solid fa-envelope"></i> Kontakt Os</div>
    <h1 style="font-size:3rem; margin:16px 0;" ${editAttr} data-edit-key="sub_cnt_t">${state.customOverrides['sub_cnt_t'] || `Kontakt ${state.brandName}`}</h1>
    <p style="font-size:1.2rem; opacity:0.9; max-width:800px; margin:0 auto 30px auto;">Vi står klar til at hjælpe dig. Skriv en besked eller ring direkte til os.</p>
  </section>

  <section style="padding:20px 5% 60px 5%; max-width:1200px; margin:0 auto;">
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:start;">
      <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); padding:36px; border-radius:24px;">
        <h3 style="font-size:1.5rem; margin-bottom:20px;">Send en Besked</h3>
        <form style="display:flex; flex-direction:column; gap:16px;" onsubmit="return false;">
          <input type="text" placeholder="Dit navn" style="padding:14px; border-radius:12px; border:1px solid rgba(255,255,255,0.15); background:rgba(15,23,42,0.8); color:inherit;">
          <input type="email" placeholder="Din e-mailadresse" style="padding:14px; border-radius:12px; border:1px solid rgba(255,255,255,0.15); background:rgba(15,23,42,0.8); color:inherit;">
          <textarea rows="4" placeholder="Din besked..." style="padding:14px; border-radius:12px; border:1px solid rgba(255,255,255,0.15); background:rgba(15,23,42,0.8); color:inherit;"></textarea>
          <button class="btn" style="justify-content:center;">Send Besked</button>
        </form>
      </div>

      <div style="display:flex; flex-direction:column; gap:20px;">
        <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); padding:28px; border-radius:20px;">
          <h4 style="font-size:1.2rem; margin-bottom:10px;"><i class="fa-solid fa-phone" style="color:var(--primary);"></i> Direkte Telefon</h4>
          <p style="font-size:1.3rem; font-weight:800;">${state.contactPhone}</p>
        </div>
        <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); padding:28px; border-radius:20px;">
          <h4 style="font-size:1.2rem; margin-bottom:10px;"><i class="fa-solid fa-envelope" style="color:var(--secondary);"></i> E-mail Support</h4>
          <p style="font-size:1.1rem; font-weight:700;">${state.contactEmail}</p>
        </div>
        ${heroRightVisualHTML}
      </div>
    </div>
  </section>
  ` : ''}

  <!-- FOOTER -->
  <footer class="site-footer">
    <p>&copy; ${new Date().getFullYear()} ${state.customOverrides['brandName'] || state.brandName} — Tlf: ${state.contactPhone} — ${state.contactEmail}. Alle rettigheder forbeholdes.</p>
  </footer>

</body>
</html>
    `;
  }

  // ── 6. RENDER PREVIEW TO IFRAME & BIDIRECTIONAL SYNC ────────────────────
  function updateLivePreview() {
    const htmlCode = generateWebsiteHTML(false);
    
    // Inject into preview iframe
    previewViewport.innerHTML = `<iframe id="previewIframe" style="width:100%; height:100%; border:none; background:${state.colorBg};"></iframe>`;
    
    const iframe = document.getElementById('previewIframe');
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(htmlCode);
    doc.close();

    // Scroll preview to top so layout changes are immediately visible
    try {
      if (iframe.contentWindow) iframe.contentWindow.scrollTo(0, 0);
    } catch (e) {}

    // Attach inline editing event listeners inside the iframe
    iframe.onload = () => {
      const editables = doc.querySelectorAll('[contenteditable="true"]');
      editables.forEach(el => {
        el.addEventListener('input', () => {
          const key = el.dataset.editKey;
          const text = el.innerHTML;
          if (key) {
            state.customOverrides[key] = text;
            
            // Sync with sidebar input fields if matching state key
            if (key === 'brandName') { state.brandName = text; inputBrandName.value = text; }
            if (key === 'tagline') { state.tagline = text; inputTagline.value = text; }
            if (key === 'heroTitle') { state.heroTitle = text; inputHeroTitle.value = text; }
            if (key === 'heroDesc') { state.heroDesc = text; inputHeroDesc.value = text; }
            if (key === 'ctaText') { state.ctaText = text; inputCtaText.value = text; }
            if (key === 'aboutText') { state.aboutText = text; inputAboutText.value = text; }
          }
        });
      });
    };
  }

  // ── 7. AI COPYWRITER ENGINE ─────────────────────────────────────────────
  btnRunAiCopywriter.addEventListener('click', () => {
    playMagicSound();
    const indKey = selectAiIndustry.value;
    const customKw = inputCustomKeyword.value.trim();
    const preset = aiIndustryPresets[indKey] || aiIndustryPresets.murer;

    loaderTitle.textContent = "AI Veloce Skriver Dine Branche-Tekster...";
    loaderStatusText.textContent = `Genererer overskrifter, ydelser og anmeldelser for ${preset.brandName}...`;
    loaderOverlay.classList.remove('hidden');
    loaderFill.style.width = '0%';

    setTimeout(() => { loaderFill.style.width = '50%'; }, 500);
    setTimeout(() => { loaderFill.style.width = '100%'; }, 1000);

    setTimeout(() => {
      loaderOverlay.classList.add('hidden');

      // Update state with AI copywriter results
      state.brandName = customKw ? `${preset.brandName} ${customKw}` : preset.brandName;
      state.tagline = preset.tagline;
      state.heroTitle = customKw ? `${preset.heroTitle} i ${customKw}` : preset.heroTitle;
      state.heroDesc = preset.heroDesc;
      state.ctaText = preset.ctaText;
      state.aboutText = preset.aboutText;
      state.logoIcon = preset.icon;
      if (!state.userChosenTemplate) {
        state.layoutArchetype = preset.archetype;
      }
      state.bgMode = preset.bgMode;
      state.colorPrimary = preset.primary;
      state.colorSecondary = preset.secondary;

      // Apply overrides
      state.customOverrides = { ...preset.overrides };
      if (customKw) {
        state.customOverrides['heroTitle'] = `${preset.heroTitle} i ${customKw}`;
        state.customOverrides['brandName'] = `${preset.brandName} ${customKw}`;
      }

      // Sync Sidebar Inputs UI
      inputBrandName.value = state.brandName;
      inputTagline.value = state.tagline;
      inputHeroTitle.value = state.heroTitle;
      inputHeroDesc.value = state.heroDesc;
      inputCtaText.value = state.ctaText;
      inputAboutText.value = state.aboutText;
      selectLayoutArchetype.value = preset.archetype;
      colorPrimary.value = preset.primary; hexPrimary.textContent = preset.primary;
      colorSecondary.value = preset.secondary; hexSecondary.textContent = preset.secondary;

      // Apply AI Stock / Industry Photos
      if (preset.heroImage) {
        state.heroImage = preset.heroImage;
      }
      if (preset.gallery && preset.gallery.length > 0) {
        state.userPhotos = preset.gallery.map((src, idx) => ({
          id: `ai_img_${indKey}_${idx}`,
          name: `${preset.brandName} Foto #${idx + 1}`,
          src: src,
          slot: idx === 0 ? 'hero' : 'auto'
        }));
        renderUploadedGallerySidebar();
      }

      // Sync theme mode chip
      document.querySelectorAll('#bgThemeControl .theme-chip').forEach(c => {
        c.classList.toggle('active', c.dataset.bgmode === preset.bgMode);
      });

      updateLivePreview();
    }, 1200);
  });

  // ── 8. RENDER UPLOADED GALLERY IN SIDEBAR ────────────────────────────────
  function renderUploadedGallerySidebar() {
    uploadedCount.textContent = state.userPhotos.length;
    
    if (state.userPhotos.length === 0) {
      emptyGalleryMsg.style.display = 'block';
      uploadedGalleryGrid.innerHTML = `
        <div class="empty-gallery-msg">
          <span>Ingen uploaded billeder endnu. Brug feltet ovenfor til at uploade din samling.</span>
        </div>`;
      return;
    }

    uploadedGalleryGrid.innerHTML = state.userPhotos.map((photo, index) => `
      <div class="uploaded-thumb-card" data-id="${photo.id}">
        <img src="${photo.src}" alt="${photo.name}">
        <div class="thumb-info">
          <select class="select-photo-slot" data-id="${photo.id}">
            <option value="auto" ${photo.slot === 'auto' ? 'selected' : ''}>Galleri #${index + 1}</option>
            <option value="hero" ${photo.slot === 'hero' ? 'selected' : ''}>Hoved Billede (Hero)</option>
          </select>
        </div>
        <button class="btn-remove-img" data-id="${photo.id}" title="Slet foto"><i class="fa-solid fa-xmark"></i></button>
      </div>
    `).join('');

    // Event listeners for slot select and remove
    uploadedGalleryGrid.querySelectorAll('.select-photo-slot').forEach(select => {
      select.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        const slot = e.target.value;
        const photo = state.userPhotos.find(p => p.id === id);
        if (photo) {
          if (slot === 'hero') {
            state.userPhotos.forEach(p => { if (p.id !== id && p.slot === 'hero') p.slot = 'auto'; });
          }
          photo.slot = slot;
          renderUploadedGallerySidebar();
          updateLivePreview();
        }
      });
    });

    uploadedGalleryGrid.querySelectorAll('.btn-remove-img').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.dataset.id;
        state.userPhotos = state.userPhotos.filter(p => p.id !== id);
        renderUploadedGallerySidebar();
        updateLivePreview();
      });
    });
  }

  // ── 9. EVENT LISTENERS & INTERACTION ────────────────────────────────────

  // Multi Image Upload Handling
  inputMultipleImages.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      let filesProcessed = 0;
      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (evt) => {
          state.userPhotos.push({
            id: 'photo_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            src: evt.target.result,
            name: file.name,
            slot: (state.userPhotos.length === 0 && index === 0) ? 'hero' : 'auto'
          });

          filesProcessed++;
          if (filesProcessed === files.length) {
            renderUploadedGallerySidebar();
            updateLivePreview();
          }
        };
        reader.readAsDataURL(file);
      });
    }
  });

  // Stock Preset Grid
  document.querySelectorAll('#stockPresetGrid .stock-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('#stockPresetGrid .stock-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      state.heroImage = thumb.dataset.img;
      updateLivePreview();
    });
  });

  // Layout Archetype Selector
  selectLayoutArchetype.addEventListener('change', (e) => {
    selectTemplate(e.target.value);
  });

  // Text Inputs Sidebar Event Listeners
  inputBrandName.addEventListener('input', (e) => {
    const val = e.target.value.trim() || "Aura Studio";
    state.brandName = val;
    state.customOverrides['brandName'] = val;
    previewUrl.textContent = `https://${val.toLowerCase().replace(/\s+/g, '-')}.dk`;
    updateLivePreview();
  });

  inputTagline.addEventListener('input', (e) => {
    const val = e.target.value.trim() || "Fremtidens digitale løsninger";
    state.tagline = val;
    state.customOverrides['tagline'] = val;
    updateLivePreview();
  });

  inputHeroTitle.addEventListener('input', (e) => {
    state.heroTitle = e.target.value;
    state.customOverrides['heroTitle'] = e.target.value;
    updateLivePreview();
  });

  inputHeroDesc.addEventListener('input', (e) => {
    state.heroDesc = e.target.value;
    state.customOverrides['heroDesc'] = e.target.value;
    updateLivePreview();
  });

  const inputHeroImgTitle = document.getElementById('inputHeroImgTitle');
  const inputHeroImgDesc = document.getElementById('inputHeroImgDesc');
  if (inputHeroImgTitle) {
    inputHeroImgTitle.addEventListener('input', (e) => {
      state.customOverrides['hero_img_title'] = e.target.value;
      updateLivePreview();
    });
  }
  if (inputHeroImgDesc) {
    inputHeroImgDesc.addEventListener('input', (e) => {
      state.customOverrides['hero_img_desc'] = e.target.value;
      updateLivePreview();
    });
  }

  inputCtaText.addEventListener('input', (e) => {
    state.ctaText = e.target.value;
    state.customOverrides['ctaText'] = e.target.value;
    updateLivePreview();
  });

  inputAboutText.addEventListener('input', (e) => {
    state.aboutText = e.target.value;
    state.customOverrides['aboutText'] = e.target.value;
    updateLivePreview();
  });

  inputContactPhone.addEventListener('input', (e) => {
    state.contactPhone = e.target.value;
    state.customOverrides['contactPhone'] = e.target.value;
    updateLivePreview();
  });

  inputContactEmail.addEventListener('input', (e) => {
    state.contactEmail = e.target.value;
    state.customOverrides['contactEmail'] = e.target.value;
    updateLivePreview();
  });

  // AI Image Generation Button
  const btnAiFetchImages = document.getElementById('btnAiFetchImages');
  if (btnAiFetchImages) {
    btnAiFetchImages.addEventListener('click', () => {
      playMagicSound();
      const indKey = selectAiIndustry.value;
      const preset = aiIndustryPresets[indKey] || aiIndustryPresets.murer;

      loaderTitle.textContent = "AI Veloce Henter Branche-Fotos...";
      loaderStatusText.textContent = `Genererer 3 professionelle billeder til ${preset.brandName}...`;
      loaderOverlay.classList.remove('hidden');
      loaderFill.style.width = '0%';
      setTimeout(() => { loaderFill.style.width = '50%'; }, 300);
      setTimeout(() => { loaderFill.style.width = '100%'; }, 700);

      setTimeout(() => {
        loaderOverlay.classList.add('hidden');
        if (preset.heroImage) state.heroImage = preset.heroImage;
        if (preset.gallery && preset.gallery.length > 0) {
          state.userPhotos = preset.gallery.map((src, i) => ({
            id: `ai_img_${indKey}_${i}`,
            name: `${preset.brandName} AI Foto #${i + 1}`,
            src: src,
            slot: i === 0 ? 'hero' : 'auto'
          }));
          renderUploadedGallerySidebar();
        }
        updateLivePreview();
      }, 900);
    });
  }

  // Color Pickers
  function handleColorChange(inputEl, hexEl, key) {
    if (!inputEl) return;
    inputEl.addEventListener('input', (e) => {
      state[key] = e.target.value;
      if (hexEl) hexEl.textContent = e.target.value;
      if (key === 'colorBg' || key === 'colorText') {
        state.bgMode = 'custom';
        document.querySelectorAll('#bgThemeControl .theme-chip').forEach(c => c.classList.remove('active'));
      }
      updateLivePreview();
    });
  }

  handleColorChange(colorPrimary, hexPrimary, 'colorPrimary');
  handleColorChange(colorSecondary, hexSecondary, 'colorSecondary');
  handleColorChange(colorBg, hexBg, 'colorBg');
  handleColorChange(colorText, hexText, 'colorText');

  // Theme Presets Chips (16 Palettes)
  document.querySelectorAll('.preset-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.preset-chips .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      
      const presetKey = chip.dataset.preset;
      const preset = presets[presetKey];
      if (preset) {
        state.colorPrimary = preset.primary;
        state.colorSecondary = preset.secondary;
        state.colorBg = preset.bg;
        state.colorText = preset.text;
        state.bgMode = preset.bgMode || 'custom';
        state.logoIcon = preset.icon;
        if (preset.archetype) {
          state.layoutArchetype = preset.archetype;
          selectLayoutArchetype.value = preset.archetype;
        }

        // Sync UI
        if (colorPrimary) { colorPrimary.value = preset.primary; hexPrimary.textContent = preset.primary; }
        if (colorSecondary) { colorSecondary.value = preset.secondary; hexSecondary.textContent = preset.secondary; }
        if (colorBg) { colorBg.value = preset.bg; hexBg.textContent = preset.bg; }
        if (colorText) { colorText.value = preset.text; hexText.textContent = preset.text; }

        // Sync theme mode chip
        document.querySelectorAll('#bgThemeControl .theme-chip').forEach(c => {
          c.classList.toggle('active', c.dataset.bgmode === state.bgMode);
        });

        // Sync icon selector
        document.querySelectorAll('.icon-option').forEach(opt => {
          opt.classList.toggle('active', opt.dataset.icon === preset.icon);
        });

        updateLivePreview();
      }
    });
  });

  // Quick Accent Swatches
  document.querySelectorAll('#accentSwatches .swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      const color = swatch.dataset.color;
      state.colorPrimary = color;
      colorPrimary.value = color;
      hexPrimary.textContent = color;
      updateLivePreview();
    });
  });

  // Background Theme Mode (10 Presets Grid)
  document.querySelectorAll('#bgThemeControl .theme-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#bgThemeControl .theme-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.bgMode = chip.dataset.bgmode;
      updateLivePreview();
    });
  });

  // Icon Selector
  document.querySelectorAll('.icon-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.icon-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      state.logoIcon = opt.dataset.icon;
      updateLivePreview();
    });
  });

  // Selects
  selectFontPair.addEventListener('change', (e) => {
    state.fontPair = e.target.value;
    updateLivePreview();
  });

  selectNavStyle.addEventListener('change', (e) => {
    state.navStyle = e.target.value;
    updateLivePreview();
  });

  selectHeroLayout.addEventListener('change', (e) => {
    state.heroLayout = e.target.value;
    updateLivePreview();
  });

  // Segmented Controls (Button Shape & Effect)
  document.querySelectorAll('#buttonShapeControl .segment').forEach(seg => {
    seg.addEventListener('click', () => {
      document.querySelectorAll('#buttonShapeControl .segment').forEach(s => s.classList.remove('active'));
      seg.classList.add('active');
      state.buttonShape = seg.dataset.shape;
      updateLivePreview();
    });
  });

  document.querySelectorAll('#buttonEffectControl .segment').forEach(seg => {
    seg.addEventListener('click', () => {
      document.querySelectorAll('#buttonEffectControl .segment').forEach(s => s.classList.remove('active'));
      seg.classList.add('active');
      state.buttonEffect = seg.dataset.effect;
      updateLivePreview();
    });
  });

  // Checkboxes
  const sectionCheckboxes = [
    { el: chkFeatures, key: 'features' },
    { el: chkShowcase, key: 'showcase' },
    { el: chkPricing, key: 'pricing' },
    { el: chkTestimonials, key: 'testimonials' },
    { el: chkFaq, key: 'faq' },
    { el: chkContact, key: 'contact' }
  ];

  sectionCheckboxes.forEach(({ el, key }) => {
    el.addEventListener('change', (e) => {
      state.sections[key] = e.target.checked;
      updateLivePreview();
    });
  });

  // Jump to section in live preview iframe
  document.querySelectorAll('.btn-jump-section').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const iframe = document.getElementById('previewIframe');
      if (iframe && iframe.contentWindow) {
        const targetEl = iframe.contentWindow.document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Viewport Switcher
  document.querySelectorAll('.viewport-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.viewport-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const vp = btn.dataset.viewport;
      deviceFrame.className = `device-frame ${vp}-view`;
      
      if (vp === 'desktop') viewportLabel.textContent = "Skrivebord (100%)";
      if (vp === 'tablet') viewportLabel.textContent = "Tablet (768px)";
      if (vp === 'mobile') viewportLabel.textContent = "Mobil (375px)";
    });
  });

  // Subpage Tab Switcher & PostMessage Listener
  window.switchPreviewSubpage = function(pageId) {
    state.activeSubpage = pageId;
    document.querySelectorAll('#subpageTabsBar .subpage-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.page === pageId);
    });
    updateLivePreview();
  };

  window.addEventListener('message', (e) => {
    if (e.data && e.data.type === 'SWITCH_SUBPAGE') {
      window.switchPreviewSubpage(e.data.page);
    }
  });

  document.querySelectorAll('#subpageTabsBar .subpage-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      window.switchPreviewSubpage(tab.dataset.page);
    });
  });

  // ── USER GUIDE MODAL ──────────────────────────────────────────────────
  const btnOpenGuideModal = document.getElementById('btnOpenGuideModal');
  const guideModal = document.getElementById('guideModal');
  const btnCloseGuideModal = document.getElementById('btnCloseGuideModal');
  const btnOkGuide = document.getElementById('btnOkGuide');

  if (btnOpenGuideModal && guideModal) {
    btnOpenGuideModal.addEventListener('click', () => {
      guideModal.classList.remove('hidden');
    });
  }
  if (btnCloseGuideModal && guideModal) {
    btnCloseGuideModal.addEventListener('click', () => {
      guideModal.classList.add('hidden');
    });
  }
  if (btnOkGuide && guideModal) {
    btnOkGuide.addEventListener('click', () => {
      guideModal.classList.add('hidden');
    });
  }
  if (guideModal) {
    guideModal.addEventListener('click', (e) => {
      if (e.target === guideModal) {
        guideModal.classList.add('hidden');
      }
    });
  }

  // ── 10. CHECKOUT & PAYMENT FLOW (STRIPE & EMAIL INTEGRATION) ───────────

  // Helper: Generate multi-page website content object for server processing / ZIP creation
  function getWebsitePagesPayload() {
    return {
      'index.html': generateWebsiteHTML(true, 'index'),
      'om-os.html': generateWebsiteHTML(true, 'about'),
      'ydelser.html': generateWebsiteHTML(true, 'services'),
      'priser.html': generateWebsiteHTML(true, 'pricing'),
      'kontakt.html': generateWebsiteHTML(true, 'contact')
    };
  }

  // Check URL query string on page load for return from Stripe payment
  async function checkPaymentSuccessUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccess = urlParams.get('payment_success');
    const sessionId = urlParams.get('session_id');

    if (paymentSuccess === 'true' && sessionId) {
      try {
        if (loaderTitle && loaderOverlay && loaderFill) {
          loaderTitle.textContent = "Verificerer Stripe Betaling...";
          loaderStatusText.textContent = "Henter ordrebekræftelse og e-mail kvittering...";
          loaderOverlay.classList.remove('hidden');
          loaderFill.style.width = '70%';
        }

        const res = await fetch(`/api/verify-payment?session_id=${encodeURIComponent(sessionId)}`);
        const data = await res.json();

        if (loaderFill) loaderFill.style.width = '100%';
        setTimeout(() => {
          if (loaderOverlay) loaderOverlay.classList.add('hidden');
          if (data.success) {
            state.isPaid = true;
            if (receiptId) receiptId.textContent = `#${data.receiptId || 'VELOCE-PAID'}`;
            if (checkoutStepOrder) checkoutStepOrder.classList.add('hidden');
            if (checkoutStepSuccess) checkoutStepSuccess.classList.remove('hidden');
            if (modalCheckout && typeof modalCheckout.showModal === 'function') modalCheckout.showModal();
            playSuccessChime();

            // Clean up query string from browser URL
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        }, 600);
      } catch (err) {
        console.error("Error verifying payment from URL:", err);
        if (loaderOverlay) loaderOverlay.classList.add('hidden');
      }
    }
  }

  // Initialize payment return check on page load
  checkPaymentSuccessUrl();

  btnCheckout.addEventListener('click', () => {
    checkoutStepOrder.classList.remove('hidden');
    checkoutStepSuccess.classList.add('hidden');
    modalCheckout.showModal();
  });

  btnCloseCheckout.addEventListener('click', () => {
    modalCheckout.close();
  });

  // Payment Tabs Switcher (Card vs MobilePay)
  document.querySelectorAll('.payment-tabs .pay-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.payment-tabs .pay-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const method = tab.dataset.paymethod;
      if (method === 'card') {
        payFormCard.classList.remove('hidden');
        payFormMobilePay.classList.add('hidden');
      } else {
        payFormCard.classList.add('hidden');
        payFormMobilePay.classList.remove('hidden');
      }
    });
  });

  // Submit Payment (Stripe Redirect or Demo Execution with Email Dispatch)
  btnSubmitPayment.addEventListener('click', async () => {
    const emailInput = document.getElementById('payEmail');
    const customerEmail = emailInput ? emailInput.value.trim() : '';

    if (!customerEmail || !customerEmail.includes('@')) {
      alert("Indtast venligst en gyldig e-mailadresse for at modtage kvitteringen og kildekoden.");
      if (emailInput) emailInput.focus();
      return;
    }

    loaderTitle.textContent = "Forbinder til Betalingsgateway...";
    loaderStatusText.textContent = "Opretter sikker Stripe / MobilePay session...";
    loaderOverlay.classList.remove('hidden');
    loaderFill.style.width = '20%';

    try {
      const websitePages = getWebsitePagesPayload();

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: customerEmail,
          brandName: state.brandName || 'Min Hjemmeside',
          websitePages
        })
      });

      const data = await response.json();
      loaderFill.style.width = '60%';

      if (data.url) {
        // Real Stripe Live/Test mode -> redirect to Stripe Hosted Checkout
        loaderStatusText.textContent = "Omdirigerer til Stripe Betaling (Kort & MobilePay)...";
        loaderFill.style.width = '100%';
        setTimeout(() => {
          window.location.href = data.url;
        }, 500);
      } else {
        // Demo Mode -> instant simulation with server-side email dispatch
        loaderTitle.textContent = "Verificerer Betaling & Sender E-mail...";
        loaderStatusText.textContent = "Pakker kildekode og afsender e-mail kvittering...";
        loaderFill.style.width = '100%';

        setTimeout(() => {
          loaderOverlay.classList.add('hidden');
          state.isPaid = true;
          playSuccessChime();

          if (receiptId) receiptId.textContent = `#${data.receiptId || 'VELOCE-DEMO'}`;
          checkoutStepOrder.classList.add('hidden');
          checkoutStepSuccess.classList.remove('hidden');
        }, 1000);
      }
    } catch (err) {
      console.error("Payment creation error:", err);
      loaderOverlay.classList.add('hidden');
      alert("Der opstod en fejl under oprettelsen af betalingen. Prøv venligst igen.");
    }
  });

  // Download ZIP Package (MULTI-PAGE PRODUCTION HTML)
  btnDownloadZip.addEventListener('click', async () => {
    if (typeof JSZip !== 'undefined') {
      const zip = new JSZip();
      
      // Generate all 5 standalone subpage HTML files
      zip.file('index.html', generateWebsiteHTML(true, 'index'));
      zip.file('om-os.html', generateWebsiteHTML(true, 'about'));
      zip.file('ydelser.html', generateWebsiteHTML(true, 'services'));
      zip.file('priser.html', generateWebsiteHTML(true, 'pricing'));
      zip.file('kontakt.html', generateWebsiteHTML(true, 'contact'));

      zip.file('README.txt', `Tak for dit køb hos Veloce Studio!\n\nDin multi-page hjemmeside for ${state.brandName} er 100% klar med 5 separate HTML undersider:\n\n- index.html (Forside)\n- om-os.html (Om Os)\n- ydelser.html (Ydelser & Services)\n- priser.html (Priser & Pakker)\n- kontakt.html (Kontakt & Online Booking)\n\nUpload mappen direkte til Simply.com, One.com eller dit webhotel.`);

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${state.brandName.toLowerCase().replace(/\s+/g, '-')}-hjemmeside.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      btnDownloadSingleHtml.click();
    }
  });

  // Download Single index.html (CLEAN PRODUCTION HTML)
  btnDownloadSingleHtml.addEventListener('click', () => {
    const blob = new Blob([generateWebsiteHTML(true)], { type: 'text/html' }); // TRUE = Clean Production HTML
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.brandName.toLowerCase().replace(/\s+/g, '-')}-index.html`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // ── 11. VUPTI! GENERATE MAGIC BUTTON & LOADER ──────────────────────────
  btnGenerate.addEventListener('click', () => {
    playMagicSound();
    loaderTitle.textContent = "AI Veloce Genererer Hjemmeside...";
    loaderStatusText.textContent = "Syntetiserer farver, typografi og 3D layout...";
    loaderOverlay.classList.remove('hidden');
    loaderFill.style.width = '0%';

    setTimeout(() => {
      loaderFill.style.width = '40%';
      loaderStatusText.textContent = "Sammensætter farver, typografi og 3D layout...";
    }, 400);

    setTimeout(() => {
      loaderFill.style.width = '80%';
      loaderStatusText.textContent = "Optimerer responsiv mobilvisning og SEO...";
    }, 800);

    setTimeout(() => {
      loaderFill.style.width = '100%';
    }, 1200);

    setTimeout(() => {
      loaderOverlay.classList.add('hidden');
      updateLivePreview();
    }, 1400);
  });

  // Surprise Me Randomizer
  btnSurprise.addEventListener('click', () => {
    const keys = Object.keys(presets);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const chip = document.querySelector(`.preset-chips .chip[data-preset="${randomKey}"]`);
    if (chip) chip.click();
    btnGenerate.click();
  });

  // Fullscreen Modal Toggle
  btnFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      previewViewport.requestFullscreen().catch(err => {});
    } else {
      document.exitFullscreen().catch(err => {});
    }
  });


  // Template Modal Handlers (Inside DOMContentLoaded)
  const btnOpenTemplateModal = document.getElementById('btnOpenTemplateModal');
  const btnSidebarMoreTemplates = document.getElementById('btnSidebarMoreTemplates');
  const btnCloseTemplateModal = document.getElementById('btnCloseTemplateModal');
  const btnCloseTemplateModalFooter = document.getElementById('btnCloseTemplateModalFooter');
  const templateModal = document.getElementById('templateModal');

  const openTModal = () => {
    if (templateModal) {
      renderTemplatePickers();
      if (typeof templateModal.showModal === 'function') {
        templateModal.showModal();
      } else {
        templateModal.setAttribute('open', 'true');
      }
    }
  };

  const closeTModal = () => {
    if (templateModal) {
      if (typeof templateModal.close === 'function') {
        templateModal.close();
      } else {
        templateModal.removeAttribute('open');
      }
    }
  };

  if (btnOpenTemplateModal) btnOpenTemplateModal.addEventListener('click', openTModal);
  if (btnSidebarMoreTemplates) btnSidebarMoreTemplates.addEventListener('click', openTModal);
  if (btnCloseTemplateModal) btnCloseTemplateModal.addEventListener('click', closeTModal);
  if (btnCloseTemplateModalFooter) btnCloseTemplateModalFooter.addEventListener('click', closeTModal);

  // Initial render of visual template pickers
  renderTemplatePickers();

  // Initial Render
  updateLivePreview();
});
