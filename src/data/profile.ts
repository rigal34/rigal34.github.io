/*
 * ============================================================
 *  TOUT LE CONTENU DU SITE EST ICI.
 *  Pour changer un texte, un projet ou un lien, modifie ce fichier :
 *  les composants viennent lire ces données.
 * ============================================================
 */

// ---------- Identité et liens ----------
export const identity = {
    firstName: "Bruno",
    lastName: "Rigal",
    initials: "BR",
    title: "Développeur full stack",
    city: "Montpellier",
    email: "rigalbruno30@gmail.com",
    githubUser: "rigal34",
    githubUrl: "https://github.com/rigal34",
    linkedinUrl: "https://www.linkedin.com/in/bruno-rigal-dev/",
    cvFile: "/cv-bruno-rigal.pdf",
    cvDownloadName: "CV_Bruno_Rigal.pdf",
    photo: "/images/bruno-rigal.jpg",
    siteUrl: "https://rigal34.github.io",
};

export const slogan =
    "Développeur passionné : j'adore innover, inventer des applications, échanger des idées et les voir fonctionner, tout en faisant gagner de l'argent à l'entreprise qui m'accueille.";

// ---------- Écran d'accueil ----------
export const hero = {
    loading: ["CONNEXION AU SERVEUR SÉCURISÉ...", "CONTOURNEMENT DU PARE-FEU...", "ACCÈS AUTORISÉ."],
    kicker: "Identité vérifiée",
    typing: [
        "Développeur full stack",
        "Symfony · React · Java",
        "Des applications qui font gagner du temps",
        "Disponible pour une alternance",
    ],
};

// Le terminal qui tape tout seul
export const terminalTitle = "bruno@dev-terminal";
export const terminalCommands = [
    { cmd: "whoami", output: "Bruno Rigal · développeur full stack" },
    { cmd: "cat competences.json", output: '["Symfony", "PHP", "React", "JavaScript", "SQL", "Java"]' },
    { cmd: "git status", output: "Sur la branche main\nVotre branche est à jour avec 'origin/main'." },
    { cmd: "npm run deploy", output: "Déploiement en production...\nSuccès ! Prêt à rejoindre votre équipe." },
];

// Les icônes sous les statistiques GitHub (noms définis dans src/components/ui/TechIcon.tsx)
export const analyzedSkills = "php,symfony,js,react,mysql,bootstrap,java,spring,python,git";

// ---------- À propos ----------
export const about = {
    statusBadge: "STATUT : DISPONIBLE",
    idBadge: "ID : DEV_FULL_STACK",
    typing: [
        "Initialisation du profil...",
        "Développeur full stack",
        "Concepteur Développeur d'Applications",
        "En recherche d'alternance",
    ],
    intro:
        "Développeur titulaire du titre professionnel Développeur Web et Web Mobile, je prépare à l'EPSI Montpellier le titre Concepteur Développeur d'Applications (niveau 6), en contrat de professionnalisation.",
    highlights: [
        "AutoRent : une plateforme de location de véhicules en Symfony, conçue seul en trois mois, de la base de données à la mise en ligne.",
        "Sentinel : le tableau de bord React du sas de sécurité de mon équipe, au workshop national EPSI « Horizon 2080 ».",
        "Des automatisations n8n et Python qui récupèrent les informations et les rangent toutes seules dans Excel.",
        "Ligne d'Eau : un site professionnel de plomberie réalisé par Claude Opus 5.5, une IA, sous ma direction, puis mis en ligne.",
    ],
    outro:
        "Permis B et véhiculé, je me déplace sans contrainte autour de Montpellier. Je me forme en ce moment à Java et Spring Boot.",
    stats: [
        { label: "Titre professionnel", value: "Bac+2", color: "neon-cyan" },
        { label: "En préparation", value: "Bac+3", color: "neon-purple" },
        { label: "Sur GitHub depuis", value: "2021", color: "green-500" },
    ],
};

// ---------- Compétences ----------
// level : "Maîtrisé", "Pratiqué" ou "En apprentissage"
// icon : un nom défini dans src/components/ui/TechIcon.tsx (php, symfony, react, n8n, ia...)
export type SkillLevel = "Maîtrisé" | "Pratiqué" | "En apprentissage";
export const skillCategories: { id: string; name: string; skills: { name: string; level: SkillLevel; icon: string }[] }[] = [
    {
        id: "langages",
        name: "LANGAGES",
        skills: [
            { name: "PHP 8", level: "Maîtrisé", icon: "php" },
            { name: "JavaScript", level: "Maîtrisé", icon: "js" },
            { name: "HTML5", level: "Maîtrisé", icon: "html" },
            { name: "CSS3", level: "Maîtrisé", icon: "css" },
            { name: "SQL", level: "Pratiqué", icon: "mysql" },
            { name: "Python", level: "En apprentissage", icon: "python" },
            { name: "Java", level: "En apprentissage", icon: "java" },
        ],
    },
    {
        id: "backend",
        name: "BACK_END",
        skills: [
            { name: "Symfony", level: "Maîtrisé", icon: "symfony" },
            { name: "Doctrine ORM", level: "Maîtrisé", icon: "doctrine" },
            { name: "Twig", level: "Maîtrisé", icon: "twig" },
            { name: "Architecture MVC", level: "Maîtrisé", icon: "php" },
            { name: "API REST", level: "Pratiqué", icon: "postman" },
            { name: "Spring Boot", level: "En apprentissage", icon: "spring" },
        ],
    },
    {
        id: "frontend",
        name: "FRONT_END",
        skills: [
            { name: "React", level: "Pratiqué", icon: "react" },
            { name: "Bootstrap", level: "Maîtrisé", icon: "bootstrap" },
            { name: "Sass", level: "Maîtrisé", icon: "sass" },
            { name: "Tailwind CSS", level: "Pratiqué", icon: "tailwind" },
            { name: "WordPress", level: "Pratiqué", icon: "wordpress" },
            { name: "Figma", level: "Pratiqué", icon: "figma" },
        ],
    },
    {
        id: "donnees",
        name: "DONNÉES",
        skills: [
            { name: "MySQL", level: "Maîtrisé", icon: "mysql" },
            { name: "SQLite", level: "Pratiqué", icon: "sqlite" },
            { name: "Merise / UML", level: "Pratiqué", icon: "uml" },
            { name: "Sécurité (SQLi, XSS, CSRF)", level: "Pratiqué", icon: "secu" },
        ],
    },
    {
        id: "outils",
        name: "OUTILS_DEPLOIEMENT",
        skills: [
            { name: "Git & GitHub", level: "Maîtrisé", icon: "git" },
            { name: "VS Code", level: "Maîtrisé", icon: "vscode" },
            { name: "Vercel / AlwaysData", level: "Pratiqué", icon: "vercel" },
            { name: "Agile / Scrum", level: "Pratiqué", icon: "scrum" },
            { name: "Docker", level: "En apprentissage", icon: "docker" },
        ],
    },
    {
        id: "auto",
        name: "AUTOMATISATION_IA",
        skills: [
            { name: "n8n", level: "Pratiqué", icon: "n8n" },
            { name: "Scripts Python", level: "Pratiqué", icon: "python" },
            { name: "Excel automatisé", level: "Pratiqué", icon: "excel" },
            { name: "IA locale (LM Studio, Whisper)", level: "Pratiqué", icon: "ia" },
        ],
    },
];

// ---------- Parcours ----------
export const ringIcons = ["php", "symfony", "react", "js", "mysql", "java", "git", "python"];
export const experiences = [
    {
        id: "epsi",
        company: "EPSI Montpellier",
        role: "Concepteur Développeur d'Applications",
        period: "Sept. 2026 – sept. 2027",
        location: "Montpellier",
        description:
            "Titre de niveau 6 (Bac+3) en contrat de professionnalisation. Je cherche l'entreprise qui m'accueillera : une semaine à l'école, deux semaines en entreprise.",
        details: [
            "Java 21 et Spring Boot dès le premier bloc de la formation.",
            "Bases de données : SQL, modélisation Merise et UML.",
            "Python, environnement de développement, travail en équipe.",
            "Workshop national « Horizon 2080 » : projet Sentinel, en équipe de cinq.",
        ],
        tech: ["Java", "Spring Boot", "SQL", "UML", "Python"],
        stats: { Niveau: "Bac+3", Rythme: "1 sem. / 2 sem.", Statut: "Alternance" },
    },
    {
        id: "dwwm",
        company: "Titre Développeur Web et Web Mobile",
        role: "Formation à distance · soutenance à Mulhouse",
        period: "2025",
        location: "Titre obtenu en novembre 2025",
        description:
            "Titre professionnel de niveau 5 (Bac+2), obtenu avec mon projet AutoRent : une application complète, de la conception à la mise en production.",
        details: [
            "Analyse du besoin : user stories, diagrammes, maquettes Figma.",
            "Base de données MySQL modélisée et gérée avec Doctrine.",
            "Back-end Symfony en MVC, rôles client et administrateur, protection CSRF.",
            "Site responsive et accessible, mis en ligne sur AlwaysData.",
        ],
        tech: ["Symfony", "PHP 8", "MySQL", "Twig", "Bootstrap"],
        stats: { Niveau: "Bac+2", Projet: "AutoRent", Durée: "3 mois" },
    },
    {
        id: "autodidacte",
        company: "Projets personnels",
        role: "Développeur autodidacte",
        period: "2021 – aujourd'hui",
        location: "github.com/rigal34",
        description:
            "Depuis 2021, j'apprends en construisant : de l'intégration HTML/CSS aux applications React et Symfony, chaque exercice finit sur GitHub.",
        details: [
            "Séries d'exercices Sass, BEM, responsive et animations CSS.",
            "JavaScript : API, fetch, manipulation du DOM, algorithmes.",
            "Une IA qui tourne en local, sans Internet, pour garder les données confidentielles.",
            "Des workflows n8n branchés sur Gmail qui remplissent Excel tout seuls.",
        ],
        tech: ["JavaScript", "React", "Sass", "n8n", "Python"],
        stats: { Dépôts: "85+", Depuis: "2021", Méthode: "Git" },
    },
];

// ---------- Projets ----------
// status : EN LIGNE, TERMINÉ, EN COURS ou CLASSIFIÉ (code privé)
export const projects = [
    {
        id: "autorent",
        title: "AutoRent",
        codename: "MISSION_AUTORENT",
        status: "EN LIGNE",
        description:
            "Plateforme de location de véhicules. Le client parcourt le catalogue, filtre par catégorie et réserve avec un prix calculé automatiquement. L'administrateur gère véhicules, catégories, réservations et utilisateurs depuis un tableau de bord.",
        tech: ["Symfony", "PHP 8", "MySQL", "Doctrine", "Twig", "Bootstrap"],
        stats: { Rôles: "2", Protection: "CSRF", Durée: "3 mois" },
        liveUrl: "https://location-voiture.alwaysdata.net/",
        codeUrl: "https://github.com/rigal34/AutoRent",
    },
    {
        id: "sentinel",
        title: "Sentinel",
        codename: "SAS_SENTINEL",
        status: "TERMINÉ",
        description:
            "Workshop national EPSI « Horizon 2080 », en équipe de cinq : le sas de sécurité d'un vaisseau, piloté par une carte ESP8266 (badge NFC, porte motorisée, alarme). J'ai réalisé le tableau de bord React qui affiche les passages du sas à partir d'une API.",
        tech: ["React", "API REST", "FastAPI", "Docker", "MQTT"],
        stats: { Équipe: "5", Durée: "5 jours", "Ma partie": "React" },
        liveUrl: "",
        codeUrl: "https://github.com/SinjeHQ/WorkshopP4G6",
    },
    {
        id: "taskmanager",
        title: "TaskManager",
        codename: "GESTION_TACHES",
        status: "EN COURS",
        description:
            "Application de gestion de tâches en React. Déjà en place : inscription, connexion avec jeton JWT, menu qui s'adapte à l'utilisateur connecté. En cours : création, modification et suppression des tâches.",
        tech: ["React 19", "React Router", "Axios", "Tailwind", "JWT"],
        stats: { Pages: "6", Connexion: "JWT", Statut: "En cours" },
        liveUrl: "",
        codeUrl: "https://github.com/rigal34/taskmanager",
    },
    {
        id: "renovmanager",
        title: "RenovManager",
        codename: "GESTION_CHANTIER",
        status: "CLASSIFIÉ",
        description:
            "Application de gestion pour une entreprise du bâtiment : un catalogue de plus de 6 000 prestations, des devis créés directement sur le chantier depuis un mobile ou une tablette, et des factures générées automatiquement.",
        tech: ["Symfony 6.4", "PHP 8.2", "MySQL", "Doctrine", "Bootstrap"],
        stats: { Prestations: "6 000+", Devis: "Mobile", Code: "Privé" },
        liveUrl: "",
        codeUrl: "",
    },
    {
        id: "automatisation",
        title: "Automatisations n8n et Python",
        codename: "ROBOT_EXCEL",
        status: "ACTIF",
        description:
            "Des workflows n8n, installés comme un service Windows, lisent des e-mails Gmail et rangent les informations dans des fichiers Excel. Un script Python récupère des résultats publiés en ligne et les range dans Excel, sans doublons, en un clic.",
        tech: ["n8n", "Python", "Gmail API", "Excel"],
        stats: { "Saisie à la main": "0", Lancement: "Auto", Doublons: "0" },
        liveUrl: "",
        codeUrl: "",
    },
    {
        id: "ia",
        title: "IA souveraine en local",
        codename: "IA_SOUVERAINE",
        status: "TERMINÉ",
        description:
            "Une IA générative qui tourne entièrement sur mon ordinateur, sans cloud : LM Studio pour les modèles, AnythingLLM pour interroger mes propres documents, Whisper pour transcrire l'audio. Étude d'architecture publiée sur GitHub.",
        tech: ["LM Studio", "AnythingLLM", "Whisper", "Python"],
        stats: { "Données locales": "100 %", Cloud: "Aucun", Internet: "Inutile" },
        liveUrl: "",
        codeUrl: "https://github.com/rigal34/Local-IA-Sovereign-Architecture",
    },
    {
        id: "ligne-deau",
        title: "Ligne d'Eau",
        codename: "MISSION_IA_COEQUIPIER",
        status: "EN LIGNE",
        description:
            "Site professionnel d'un plombier-carreleur (entreprise fictive) : vitrine des réalisations, catalogue de fournitures, demande de devis avec photos, contact et espace pro pour répondre aux clients. Réalisé par Claude Opus 5.5 sous le commandement de Bruno Rigal.",
        tech: ["PHP 8", "SQLite", "JavaScript", "CSS", "Claude Opus 5.5"],
        stats: { Pages: "50+", Vérifications: "48", Coéquipier: "IA" },
        liveUrl: "https://location-voiture.alwaysdata.net/ligne-deau/",
        codeUrl: "",
    },
    {
        id: "resto-stephanie",
        title: "Le Resto de Stéphanie",
        codename: "WORDPRESS_PUR",
        status: "EN LIGNE",
        description:
            "Site vitrine d'un restaurant provençal (fictif) créé en WordPress pur : thème officiel Twenty Twenty-Five et éditeur de blocs, sans code écrit à la main. Hébergé chez moi, sur un vieux PC sous Linux transformé en serveur (Nginx, PHP-FPM, MariaDB) et relié à Internet par un tunnel Cloudflare.",
        tech: ["WordPress", "Twenty Twenty-Five", "Linux", "Nginx", "MariaDB", "Cloudflare"],
        stats: { CMS: "WordPress", "Code ajouté": "0", Serveur: "Maison" },
        liveUrl: "https://resto.bruno34.com",
        codeUrl: "https://github.com/rigal34/resto-de-stephanie",
    },
    {
        id: "liste-des-taches",
        title: "Liste des tâches",
        codename: "JAVASCRIPT_PUR",
        status: "EN LIGNE",
        description:
            "Application de liste de tâches que j'ai réalisée uniquement en JavaScript, sans framework : on entre avec son prénom, puis chaque tâche s'affiche sur une carte colorée selon son état (en cours ou terminée), avec ses tags. On peut ajouter, terminer, rouvrir ou supprimer une tâche, et suivre l'avancement sur une page de statistiques avec un graphique. L'API Node.js/Express tourne sur mon serveur Linux à la maison.",
        tech: ["JavaScript", "Node.js", "Express", "Chart.js", "Linux"],
        stats: { Langage: "JavaScript", Framework: "Aucun", Serveur: "Maison" },
        liveUrl: "https://liste-des-taches.bruno34.com",
        codeUrl: "https://github.com/rigal34/TODO-APPS",
    },
];

// ---------- Je travaille avec une IA ----------
// La partie qui présente le site Ligne d'Eau, réalisé par une IA sous ma direction.
export const aiTeammate = {
    kicker: "Nouvelle génération de développeur",
    title: "Je travaille avec une IA",
    credit: "Ligne d'Eau a été réalisé par Claude Opus 5.5, sous le commandement de Bruno Rigal.",
    intro:
        "Je ne reste pas seul face à mon code. Je travaille avec une IA comme avec un coéquipier : je fixe l'objectif, je découpe le travail, je questionne chaque choix et je vérifie le résultat avant de le mettre en ligne.",
    resultTitle: "Le résultat : Ligne d'Eau",
    resultText:
        "Un site professionnel de plomberie sur plusieurs pages : douches à l'italienne, rénovation de salles de bain, vitrine des chantiers, catalogue de fournitures, demande de devis avec photos et espace pro. Adapté au téléphone, à la tablette et à l'ordinateur.",
    resultUrl: "https://location-voiture.alwaysdata.net/ligne-deau/",
    resultNote: "Entreprise fictive, créée pour la démonstration.",
    // Ce que j'ai fait, et ce que l'IA a fait
    roles: [
        {
            who: "Bruno Rigal · chef de projet",
            items: [
                "J'ai écrit le cahier des charges : les pages, la vitrine, les devis, le contact, l'affichage sur mobile.",
                "J'ai questionné les choix techniques avant de valider le langage et l'hébergement.",
                "J'ai piloté la mise en ligne sur AlwaysData, à côté d'AutoRent, sans le perturber.",
            ],
        },
        {
            who: "Claude Opus 5.5 · coéquipier IA",
            items: [
                "A écrit le code, les textes et les illustrations du site.",
                "A testé chaque page sur téléphone, tablette et ordinateur.",
                "A rédigé le guide d'installation et de mise en ligne.",
            ],
        },
    ],
    // Pourquoi c'est un atout pour une entreprise
    arguments: [
        {
            title: "Une IA dans le nuage, une IA en local",
            text: "Claude Opus 5.5 pour les gros chantiers. LM Studio, AnythingLLM et Whisper sur mon ordinateur quand les données doivent rester confidentielles.",
        },
        {
            title: "Je garde la main",
            text: "L'IA propose, je décide. Rien n'est mis en ligne sans que je l'aie compris et validé.",
        },
        {
            title: "Un résultat vérifié",
            text: "48 vérifications automatiques dans un vrai navigateur et un contrôle d'accessibilité aux normes WCAG, sans erreur.",
        },
        {
            title: "Plus vite en production",
            text: "Le site a été conçu, testé et mis en ligne en une journée de travail.",
        },
    ],
    stats: [
        { label: "Pages", value: "50+" },
        { label: "Vérifications", value: "48" },
        { label: "Accessibilité", value: "0 erreur" },
    ],
};

// ---------- Formations ----------
export const educations = [
    {
        degree: "Concepteur Développeur d'Applications",
        program: "Titre professionnel niveau 6 (Bac+3) · RNCP 37873",
        location: "EPSI Montpellier",
        date: "2026 – 2027",
        grade: "En cours",
        done: false,
    },
    {
        degree: "Développeur Web et Web Mobile",
        program: "Titre professionnel niveau 5 (Bac+2)",
        location: "À distance · Mulhouse",
        date: "2025",
        grade: "Obtenu en novembre 2025",
        done: true,
    },
];

// ---------- Dépôts GitHub mis en avant ----------
export const featuredRepos = [
    {
        name: "odento",
        owner: "rigal34",
        language: "Twig",
        year: "2025",
        type: "E_COMMERCE",
        desc: "Boutique en ligne de démonstration en Symfony 6.4, avec EasyAdmin, Doctrine et MySQL.",
    },
    {
        name: "dentiste",
        owner: "rigal34",
        language: "PHP",
        year: "2025",
        type: "SITE_MVC",
        desc: "Site d'un cabinet dentaire en PHP, avec une architecture MVC écrite à la main.",
    },
    {
        name: "blog",
        owner: "rigal34",
        language: "PHP",
        year: "2025",
        type: "BLOG_SYMFONY",
        desc: "Blog développé avec Symfony : entités Doctrine, migrations de base de données, AssetMapper.",
    },
];

// ---------- Accréditations ----------
// icon : diplome, fusee, alternance ou permis (icônes dessinées dans SecurityClearance.tsx)
export const accreditations = [
    {
        title: "Développeur Web et Web Mobile",
        issuer: "Titre professionnel · ministère du Travail",
        ref: "TP-01280",
        level: "NIVEAU_5",
        status: "VALIDE",
        icon: "diplome",
    },
    {
        title: "Concepteur Développeur d'Applications",
        issuer: "Titre professionnel · EPSI Montpellier",
        ref: "RNCP 37873",
        level: "NIVEAU_6",
        status: "EN COURS",
        icon: "fusee",
    },
    {
        title: "Contrat de professionnalisation",
        issuer: "Profil ouvrant droit à des aides cumulables",
        ref: "1 SEM. ÉCOLE / 2 SEM. ENTREPRISE",
        level: "ALTERNANCE",
        status: "DISPONIBLE",
        icon: "alternance",
    },
    {
        title: "Permis B · véhiculé",
        issuer: "Mobilité autour de Montpellier",
        ref: "OCCITANIE",
        level: "MOBILITÉ",
        status: "VALIDE",
        icon: "permis",
    },
];

// ---------- Contact ----------
export const contact = {
    kicker: "Transmission entrante",
    titleTop: "Établir",
    titleBottom: "le contact",
    text:
        "Un poste en alternance, un projet ou une simple question ? Le canal est ouvert : écrivez-moi, je réponds rapidement.",
};
