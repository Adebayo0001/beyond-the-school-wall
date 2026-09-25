export interface TabletopProduct {
  id: string;
  title: string;
  subtitle: string;
  category: 'all' | 'strategy' | 'business' | 'finance' | 'stem' | 'chess';
  categoryLabel: string;
  price: number; // in NGN
  priceUsd: string;
  ageLabel: string;
  players: string;
  duration: string;
  skills: string[];
  rating: number;
  reviewCount: number;
  badge?: string;
  imageSrc: string;
  deliveryTimeline: string;
  features: string[];
  fullDescription: string[];
  specs: { [key: string]: string };
}

export const STORE_PRODUCTS: TabletopProduct[] = [
  {
    id: 'juegoal-chess-checkers',
    title: 'Juegoal 20" Portable Chess & Checkers Set (2-in-1 Travel Set)',
    subtitle: 'Official USCF & FIDE Spec Roll-Up Tournament Mousepad Mat with Canvas Storage Bag',
    category: 'chess',
    categoryLabel: 'Tournament Chess & Checkers',
    price: 42000,
    priceUsd: '$28',
    ageLabel: 'Ages 6+ & Adults',
    players: '2 Players',
    duration: '30–60 Mins',
    skills: ['Spatial Geometry', 'Positional Calculation', 'Defensive Patience', 'Tactical Sacrifices'],
    rating: 4.9,
    reviewCount: 148,
    badge: 'TOURNAMENT GRADE',
    imageSrc: '/images/chess.jpg',
    deliveryTimeline: '2–3 Weeks',
    features: [
      'Dual functional 2 in 1 Chess & Checkers set meeting USCF & FIDE official tournament requirements',
      '20-inch heavy-weight thick rubber mousepad mat with 2.25-inch squares and algebraic coordinates',
      'Includes 32 tournament chess pieces, 24 checker pieces, plus 2 extra Queens & 2 extra Checkers for promotions',
      'Floppy rubber mat stays completely flat on tables, UV and scratch resistant, hard to wrinkle or stain',
      'Soft green canvas travel storage bag holds rolled board and all pieces securely for easy portability'
    ],
    fullDescription: [
      'Travel Chess & Checkers Set: Juegoal dual functional 2 in 1 Chess Sets meets US Chess Federation and FIDE requirements for Official Tournament use. The board measures 20 inches with 2.25 inch squares, boundaries are designed using numbers and letters algebraic coordinates to describe and record chess moves. Include 32 chess pieces and 24 checker pieces, and 2 extra Queens & 2 extra checkers for easy promotions.',
      'Folding Chess Board Mat: The professional roll up chess board is made of thick rubber, features clear pattern, could not be more convenient to carry and keep in place. The board can be laid flat on your table, providing a pleasant heavy weight surface, hard to wrinkle and stain, UV and scratch resistant. While we recommend you store it flat or rolled, this floppy chess board mat is very light but very strong, and will easily fold to a compact size for travel.',
      'Perfect Learning & Entertainment Tool: The chess and checkers board are available to everyone, either for social and family entertainment or as an excellent tool for kids will be a useful start for an intellectually stimulating hobby. Classic game great for schools, clubs, or tournaments.',
      'Portable & Easy Storage: Comes with a soft green carry storage canvas bag with plenty of space for chess & checker pieces. Convenient to carry and travel.'
    ],
    specs: {
      'Board Dimensions': '20" x 20" (50.8cm x 50.8cm)',
      'Square Size': '2.25 Inches (5.7cm)',
      'Material': 'Thick Non-Slip Rubber Mousepad Mat',
      'Total Pieces': '34 Chess Pieces (2 Extra Queens) + 26 Checkers',
      'Included Bag': 'Padded Green Canvas Storage Shoulder Bag',
      'Delivery Timeline': '2–3 Weeks Guaranteed'
    }
  },
  {
    id: 'monopoly-token-vote',
    title: 'Monopoly Game: Classic Family Board Game (Token Vote Edition)',
    subtitle: 'The World’s Favorite Property Trading Game with 8 Fan-Voted Metallic Tokens',
    category: 'business',
    categoryLabel: 'Business & Real Estate',
    price: 38500,
    priceUsd: '$25',
    ageLabel: 'Ages 8+ & Families',
    players: '2–6 Players',
    duration: '60–120 Mins',
    skills: ['Real Estate Trading', 'Cashflow Management', 'Asset Negotiation', 'Risk Hedging'],
    rating: 4.8,
    reviewCount: 312,
    badge: 'FAMILY FAVORITE',
    imageSrc: '/images/monopoly-game.jpg',
    deliveryTimeline: '2–3 Weeks',
    features: [
      'Family Game Night staple! Players buy, sell, dream, and scheme their way to riches',
      'Buy, sell, and trade neighborhoods, charge rent, and build houses and hotels to bankrupt rivals',
      'Includes 8 iconic tokens: Top Hat, Rubber Ducky, Scotty Dog, Hazel Cat, Race Car, Penguin, Battleship, Thimble',
      'High-durability folding quad board, full play-money bank, Chance & Community Chest card decks',
      'Ideal for teaching negotiation, cash reserve buffers, and property capital accumulation'
    ],
    fullDescription: [
      'Family Game Night Staple: Players buy, sell, dream, and scheme their way to riches with the classic Monopoly board game.',
      'Buy, Sell, and Trade to Win: Players compete to buy out neighborhoods, sell properties, charge rent, and grow an empire in the Monopoly game for adults and kids ages 8 and up.',
      'Build Houses and Hotels: Love that feeling when an opponent lands on an owned property? In this beloved family board game, the more players build, the more rent money they can collect. Cha-ching!',
      'What’s Your Token?: Includes 8 tokens: the Top Hat, Rubber Ducky, Scotty, Hazel, Race Car, Penguin, Battleship, and Thimble.'
    ],
    specs: {
      'Player Capacity': '2 to 6 Players',
      'Target Age': 'Ages 8 and Up',
      'Box Contents': 'Gameboard, 8 Tokens, 28 Title Deed Cards, 16 Chance Cards, 16 Community Chest Cards, 32 Houses, 12 Hotels, 2 Dice, Money Pack & Game Guide',
      'Publisher': 'Hasbro Gaming',
      'Delivery Timeline': '2–3 Weeks Guaranteed'
    }
  },
  {
    id: 'ice-cream-empire',
    title: 'Ice Cream Empire Board Game',
    subtitle: 'Strategic Business Building, Geography & Money Handling Game for Families & Adults',
    category: 'business',
    categoryLabel: 'Entrepreneurship & Trade',
    price: 45000,
    priceUsd: '$30',
    ageLabel: 'Ages 7+ & Adults',
    players: '2–4 Players',
    duration: '60 Mins',
    skills: ['Inventory Management', 'Pricing Strategy', 'National Market Expansion', 'Financial Math'],
    rating: 4.9,
    reviewCount: 94,
    badge: 'TOP STRATEGY',
    imageSrc: '/images/empire-game-.jpg',
    deliveryTimeline: '2–3 Weeks',
    features: [
      'Build an Ice Cream Business: Open retail shop locations, manage inventory based on market prices, and race to build 8 shops nationally',
      'Practice Math, Geography & Money Handling: Calculate inventory costs, collect profits, and secure high-value retail hubs',
      'Strategic Family Fun: Easy to learn in minutes with deep tactical layers that scale every session for kids, teens, and adults',
      'No two games are the same: Highly competitive expansion race that keeps game night energetic and educational',
      'Complete tabletop kit with retail store tokens, market price cards, cash register deck, and full map board'
    ],
    fullDescription: [
      'Strategic Family Fun for Ages 7+: A fun tabletop board game where players grow their ice cream company through calculated choices and friendly competition. Great for adults, teens, kids, and couples who love strategy games. Builds planning, simple math and geographic thinking while keeping game night fun on every turn.',
      'Build an Ice Cream Business: Open retail ice cream shop locations, manage inventory based on market prices and race to be first to build 8 ice cream shops nationally. A standout in strategy games that feels competitive and rewarding.',
      'Practice Math, Geography & Money Handling: Calculate inventory, collect profits, and pick high-value store locations across the national map. An engaging game where everyone builds their own business empire while refining core financial math skills.',
      'Easy to Learn, Challenging to Master: Quick setup and clear English instructions get everyone playing fast, with depth that scales each session. Runs about 60 minutes for 2–4 players.'
    ],
    specs: {
      'Game Playtime': 'Approx. 60 Minutes',
      'Player Range': '2 to 4 Players',
      'Skill Focus': 'Retail Operations, Inventory Valuation, US Geography & Math',
      'Components': 'National Gameboard, Store Tokens, Ice Cream Inventory Cards, Currency Deck',
      'Delivery Timeline': '2–3 Weeks Guaranteed'
    }
  },
  {
    id: 'genius-games-ion',
    title: 'Genius Games Ion: A Compound Building Game (2nd Edition)',
    subtitle: 'Peer-Reviewed Science Accurate Chemistry Card Drafting Game About Cations, Anions & Noble Gases',
    category: 'stem',
    categoryLabel: 'Science & STEM Chemistry',
    price: 36000,
    priceUsd: '$24',
    ageLabel: 'Ages 10+ (Secondary, Teachers & Adults)',
    players: '2–7 Players',
    duration: '20–30 Mins',
    skills: ['Ionic Bonding Concepts', 'Drafting Tactics', 'Valence Charges', 'Radioactive Decay Modeling'],
    rating: 4.8,
    reviewCount: 112,
    badge: 'PEER-REVIEWED STEM',
    imageSrc: '/images/genium-game-ion.jpg',
    deliveryTimeline: '2–3 Weeks',
    features: [
      'Learn Real Science: Interact with ionic bonding fundamentals, neutrally charged compounds, cations, anions, noble gases, acids & bases',
      'Fast-Paced Pick & Pass Drafting: 20–30 minute play sessions for 2–7 players matching electrical charges to score points',
      'Peer-Reviewed by 20+ PhD Scientists: STEM and NGSS compliant with an included "Science Behind the Game" booklet',
      'Radioactive Expansion Included: Advanced mode incorporates radioactive decay mechanics for experienced players',
      'Awarded the Dice Tower Seal of Approval for outstanding classroom and family learning design'
    ],
    fullDescription: [
      'Learn Science: Players will interact and learn the fundamentals of ionic bonding through creating neutrally charged compounds, noble gases, charges, anions and cations, and acids and bases. Science geeks and students will love playing this fast-paced pick-and-pass card game.',
      'Fast Paced: Ion is a fast-paced card game for 2-7 players spanning around 20-30 minutes. Each round, players compete to build compounds using positively and negatively charged ions. Points are scored for successful compounds, Noble Gases, and achieving Goal Cards.',
      'Pick and Pass Mechanics: Each player starts with a hand of cards, selects one to place in their compound tableau, and passes the remaining hand. Match positive and negative charges to create stable neutral compounds.',
      'Scientifically Accurate: Peer-reviewed by a team of 20+ PhD doctors and scientists from around the globe. Includes the comprehensive "Science Behind Ion" booklet explaining real-world chemistry concepts.',
      'Radioactive Expansion: Advanced variant introduces radioactive isotope decay management for competitive group play.'
    ],
    specs: {
      'Player Capacity': '2 to 7 Players',
      'Game Duration': '20 to 30 Minutes',
      'Science Certification': 'STEM & NGSS Compliant • Dice Tower Seal of Approval',
      'Box Contents': 'Ionic Card Decks, Noble Gas Cards, Radioactive Decay Deck, Science Booklet, Rulebook',
      'Publisher': 'Genius Games',
      'Delivery Timeline': '2–3 Weeks Guaranteed'
    }
  },
  {
    id: 'catan-6th-edition',
    title: 'CATAN Board Game (6th Edition)',
    subtitle: 'The Legendary Strategy Board Game of Trading, Building & Settling for Families & Competitors',
    category: 'strategy',
    categoryLabel: '4X Strategy & Resource Trading',
    price: 58000,
    priceUsd: '$38',
    ageLabel: 'Ages 10+ & Strategy Lovers',
    players: '3–4 Players',
    duration: '60–90 Mins',
    skills: ['Resource Barter Negotiation', 'Territorial Expansion', 'Probabilistic Rolling Strategy', 'Supply Bottleneck Control'],
    rating: 4.9,
    reviewCount: 520,
    badge: 'WORLD CLASSIC',
    imageSrc: '/images/catan-board-.jpg',
    deliveryTimeline: '2–3 Weeks',
    features: [
      'Explore the Island of Catan: Settle the uninhabited island by gathering resources, building infrastructure, and trading',
      'Trade, Build, and Settle: Harvest Brick, Wood, Wheat, Ore, and Sheep to construct roads, settlements, and cities in the race to 10 victory points',
      'Modular Hexagonal Board: 19 terrain hexes create a completely fresh board layout every single game for infinite replayability',
      'Dynamic Player Bartering: Active negotiations between turns require clever trade diplomacy and defensive robber placement',
      'Official 6th Edition with refreshed wooden settlement pieces, vibrant full-color hex art, and heavy-duty card decks'
    ],
    fullDescription: [
      'Explore the Island of Catan: Settle the uninhabited island of Catan by gathering resources, building infrastructure, and nurturing trade relationships with fellow players.',
      'Strategy and Competition: Compete with 2-3 opponents to expand your settlements and cities while managing resources and evading the robber on desert tiles.',
      'Trade, Build, and Settle: Use brick, wood, wheat, ore, and sheep to construct roads, settlements, and cities in your race to 10 victory points.',
      'Replayable and Engaging: With a modular hexagonal board, no two games are the same, offering endless strategic opportunities and high player engagement.',
      'For Families and Strategy Enthusiasts: Designed for 3-4 players, ages 10 and up, CATAN 6th Edition is the pinnacle of friendly competitive board gaming.'
    ],
    specs: {
      'Players': '3 to 4 Players',
      'Playtime': '60 to 90 Minutes',
      'Board Geometry': '19 Modular Hexagonal Terrain Tiles + 6 Sea Frame Pieces',
      'Components': '96 Resource Cards, 25 Development Cards, 4 Building Cost Cards, 2 Special Cards, 16 Cities, 20 Settlements, 60 Roads, 1 Robber Pawn, 2 Dice',
      'Publisher': 'Catan Studio',
      'Delivery Timeline': '2–3 Weeks Guaranteed'
    }
  },
  {
    id: 'simplyfun-bankit',
    title: 'SimplyFun BankIt! - Money Management & Financial Literacy Board Game',
    subtitle: 'Hands-On Financial Decision Making: Save, Spend, Donate, Earn Bank Interest & Buy a Bike',
    category: 'finance',
    categoryLabel: 'Financial Literacy & Math',
    price: 39500,
    priceUsd: '$26',
    ageLabel: 'Ages 8+ (Kids, Teens & Families)',
    players: '1–4 Players',
    duration: '30–45 Mins',
    skills: ['Budgeting & Saving', 'Compound Bank Interest', 'Expense Prioritization', 'Investment Trade-offs'],
    rating: 4.8,
    reviewCount: 78,
    badge: 'FINANCIAL LITERACY',
    imageSrc: '/images/bankit game.jpg',
    deliveryTimeline: '2–3 Weeks',
    features: [
      'Learn Money Management: Hands-on financial literacy board game teaching budgeting, saving, and smart spending',
      'Decision-Making Skills: Players choose when to spend on immediate wants or deposit into interest-earning bank savings',
      'Realistic Everyday Scenarios: Earn income, pay living bills, calculate interest dividends, and make smart investment decisions',
      'Engaging Family & Classroom Fun: Easy for kids ages 8–12 to master while challenging teens and adults to outsmart the market',
      'Goal-Oriented Race: Manage cash reserves and earn compound dividends to be the first player to purchase the shiny new bicycle!'
    ],
    fullDescription: [
      'Learn Money Management: BankIt! is a money board game that provides a hands-on learning experience by teaching players how to manage money, make wise financial decisions, and budget effectively.',
      'Decision-Making Skills: This financial literacy game teaches decision-making skills as players choose when to spend or save their play money. Players learn how to think strategically and make choices that impact their financial future.',
      'Real-Life Scenarios: Immerse yourself in realistic scenarios, such as earning an income, paying bills, saving for a bike, and making investment decisions. BankIt! simulates real-life situations to master personal finance fundamentals.',
      'Educational Family Fun: BankIt! is not only a money game for kids ages 8-12 but is fun for all on family game night! Engage in friendly competition in the world of finance and money management.',
      'How to Play: Players race around the board earning money and learning to save or invest in order to earn more interest. Save the most to be the first player to buy a shiny new bike!'
    ],
    specs: {
      'Target Age': 'Ages 8 and Up (1 to 4 Players)',
      'Game Playtime': '30 to 45 Minutes',
      'Core Topics': 'Saving, Checking Accounts, Bank Interest, Donating, Budgeting',
      'Box Includes': 'Full Color Banking Gameboard, 4 Player Movers, Currency Bills, Bank Interest Slips, Expense & Opportunity Decks, Die',
      'Publisher': 'SimplyFun',
      'Delivery Timeline': '2–3 Weeks Guaranteed'
    }
  }
];

export function getTabletopProduct(id: string): TabletopProduct | undefined {
  return STORE_PRODUCTS.find(p => p.id === id);
}
