export interface Campaign {
  id: string;
  title: string;
  description: string;
  story: string;
  category: 'medical' | 'emergency' | 'education' | 'disaster' | 'family' | 'food';
  goalAmount: number;
  collectedAmount: number;
  donors: number;
  image: string;
  creatorName: string;
  creatorAvatar: string;
  status: 'active' | 'closed' | 'verified';
  createdAt: string;
  endDate: string;
  updates: Array<{ date: string; message: string }>;
  recentDonors: Array<{ name: string; amount: number; date: string; avatar: string }>;
  tags: string[];
}

export interface ItemDonation {
  id: string;
  itemName: string;
  category: 'clothes' | 'food' | 'books' | 'furniture' | 'medicine' | 'electronics';
  quantity: number;
  condition: 'new' | 'used' | 'excellent' | 'fair';
  description: string;
  pickupAddress: string;
  preferredDate: string;
  preferredTime: string;
  photos: string[];
  status: 'pending' | 'accepted' | 'scheduled' | 'collected' | 'delivered';
  contactName: string;
  contactPhone: string;
  submittedAt: string;
}

export interface MoneyDonation {
  id: string;
  amount: number;
  campaignId: string;
  campaignTitle: string;
  donorName: string;
  donorEmail: string;
  date: string;
  transactionId: string;
  receipt: boolean;
  anonymous: boolean;
}

// Campaign mock data
export const campaigns: Campaign[] = [
  {
    id: '1',
    title: 'Emergency Medical Fund for Rohit',
    description: 'Help save a child battling acute leukemia',
    story: 'Rohit is a 7-year-old boy diagnosed with acute leukemia. His parents are struggling with the treatment costs of ৳50,00,000. Your donation can save his life.',
    category: 'medical',
    goalAmount: 5000000,
    collectedAmount: 3245670,
    donors: 234,
    image: 'https://news.cgtn.com/news/2024-07-05/Emergency-response-activated-as-flood-impacts-over-1-5-million-people-1uYUc5t0V3O/img/90ed81b97d974c899216affd8485c765/90ed81b97d974c899216affd8485c765.png',
    creatorName: 'Sarah Khan',
    creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    status: 'verified',
    createdAt: '2024-01-15',
    endDate: '2024-06-15',
    tags: ['urgent', 'medical', 'child'],
    updates: [
      { date: '2024-03-20', message: 'Rohit completed first round of chemotherapy. Doctors are hopeful.' },
      { date: '2024-02-28', message: 'Raised ৳30 lakhs! Treatment has begun.' },
    ],
    recentDonors: [
      { name: 'Anonymous', amount: 50000, date: '2024-03-25', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1' },
      { name: 'Ahmed Hassan', amount: 100000, date: '2024-03-24', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2' },
      { name: 'Fatima Begum', amount: 25000, date: '2024-03-23', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3' },
    ],
  },
  {
    id: '2',
    title: 'Education Support for Village School',
    description: 'Build classrooms for 200+ underprivileged children',
    story: 'A remote village school needs 3 new classrooms to accommodate growing student enrollment. Help us provide quality education to the next generation.',
    category: 'education',
    goalAmount: 1500000,
    collectedAmount: 890000,
    donors: 156,
    image: 'https://images.pexels.com/photos/9090747/pexels-photo-9090747.jpeg?_gl=1*1hfm9ps*_ga*MTc5MjI4Mjg5OS4xNzY4NTgzNTg5*_ga_8JE65Q40S6*czE3NzY2ODY1NzkkbzYkZzEkdDE3NzY2ODY2MjAkajE5JGwwJGgw',
    creatorName: 'Dr. Mohammad Hasan',
    creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
    status: 'verified',
    createdAt: '2024-02-01',
    endDate: '2024-07-01',
    tags: ['education', 'community', 'children'],
    updates: [
      { date: '2024-03-15', message: 'Construction of first classroom began!' },
      { date: '2024-03-01', message: 'Crossed ৳8 lakhs milestone!' },
    ],
    recentDonors: [
      { name: 'Raina Dutta', amount: 75000, date: '2024-03-25', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5' },
      { name: 'Tech Founders Network', amount: 200000, date: '2024-03-20', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=6' },
      { name: 'Zainab Ali', amount: 50000, date: '2024-03-18', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=7' },
    ],
  },
  {
    id: '3',
    title: 'Flood Relief - Emergency Food & Shelter',
    description: 'Help 500+ families displaced by monsoon floods',
    story: 'Recent floods have displaced over 500 families. We need emergency support for food, clean water, and temporary shelter.',
    category: 'disaster',
    goalAmount: 2000000,
    collectedAmount: 1750000,
    donors: 412,
    image: 'https://www.ozharvest.org/app/uploads/2021/08/Granville-Hamper-Hub_August_Joyce-Ong.jpg',
    creatorName: 'Relief NGO Bangladesh',
    creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=8',
    status: 'verified',
    createdAt: '2024-03-10',
    endDate: '2024-04-10',
    tags: ['disaster', 'emergency', 'urgent', 'food', 'shelter'],
    updates: [
      { date: '2024-03-25', message: '5,000 family meal packs distributed so far!' },
      { date: '2024-03-20', message: 'Temporary shelters set up for 200 families.' },
    ],
    recentDonors: [
      { name: 'Corporate Charity Fund', amount: 500000, date: '2024-03-25', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=9' },
      { name: 'Individual donors', amount: 150000, date: '2024-03-24', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=10' },
    ],
  },
  {
    id: '4',
    title: 'Family Support - Single Mother of 3',
    description: 'Help Nasrin provide shelter and education for her children',
    story: 'Nasrin is a widow struggling to support 3 children. Your donation will help her pay for schooling, rent, and basic necessities.',
    category: 'family',
    goalAmount: 500000,
    collectedAmount: 385000,
    donors: 89,
    image: 'https://images.pexels.com/photos/7978513/pexels-photo-7978513.jpeg?_gl=1*10cd601*_ga*MTc5MjI4Mjg5OS4xNzY4NTgzNTg5*_ga_8JE65Q40S6*czE3NzY2ODg5ODkkbzckZzEkdDE3NzY2ODkxMDYkajMzJGwwJGgw',
    creatorName: 'Community Support',
    creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=11',
    status: 'active',
    createdAt: '2024-02-20',
    endDate: '2024-08-20',
    tags: ['family', 'women', 'education'],
    updates: [
      { date: '2024-03-20', message: 'Children enrolled in school!' },
    ],
    recentDonors: [
      { name: 'Compassionate Hearts', amount: 100000, date: '2024-03-25', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12' },
      { name: 'Amina Sheikh', amount: 50000, date: '2024-03-22', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=13' },
    ],
  },
  {
    id: '5',
    title: 'Daily Meal Program for Street Children',
    description: 'Feed 100 street children daily with nutritious meals',
    story: 'Our organization provides one meal a day to 100 homeless children. We need monthly support to continue this critical program.',
    category: 'food',
    goalAmount: 300000,
    collectedAmount: 210000,
    donors: 145,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop',
    creatorName: 'Children Welfare Foundation',
    creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=14',
    status: 'verified',
    createdAt: '2024-01-10',
    endDate: '2024-12-10',
    tags: ['food', 'children', 'recurring'],
    updates: [
      { date: '2024-03-25', message: '2,100 meals served this month!' },
      { date: '2024-02-28', message: 'Expanded to 100 children from 75.' },
    ],
    recentDonors: [
      { name: 'Food Business Group', amount: 50000, date: '2024-03-25', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=15' },
      { name: 'Hassan Ali', amount: 25000, date: '2024-03-24', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=16' },
      { name: 'Ifrah Khan', amount: 35000, date: '2024-03-23', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=17' },
    ],
  },
  {
    id: '6',
    title: 'Medical Camp in Rural Area',
    description: 'Free healthcare for 5000+ villagers',
    story: 'We organize quarterly medical camps in remote villages. This quarter we need funds for doctors, medicines, and equipment.',
    category: 'medical',
    goalAmount: 750000,
    collectedAmount: 620000,
    donors: 178,
    image: 'https://images.pexels.com/photos/33127869/pexels-photo-33127869.jpeg?_gl=1*i0bful*_ga*MTc5MjI4Mjg5OS4xNzY4NTgzNTg5*_ga_8JE65Q40S6*czE3NzY2ODg5ODkkbzckZzEkdDE3NzY2ODkwMTckajMyJGwwJGgw',
    creatorName: 'Health for All NGO',
    creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=18',
    status: 'verified',
    createdAt: '2024-01-20',
    endDate: '2024-06-20',
    tags: ['medical', 'rural', 'healthcare'],
    updates: [
      { date: '2024-03-22', message: '3,500 patients examined in last camp.' },
    ],
    recentDonors: [
      { name: 'Medical Professionals', amount: 150000, date: '2024-03-25', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=19' },
      { name: 'Dhaka Hospital Group', amount: 100000, date: '2024-03-23', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=20' },
    ],
  },
];

// Popular categories for item donations
export const itemCategories = [
  { id: 'clothes', name: 'Clothes', icon: '👕', color: 'bg-blue-100' },
  { id: 'food', name: 'Food & Groceries', icon: '🍎', color: 'bg-orange-100' },
  { id: 'books', name: 'Books & Stationery', icon: '📚', color: 'bg-purple-100' },
  { id: 'furniture', name: 'Furniture', icon: '🛋️', color: 'bg-amber-100' },
  { id: 'medicine', name: 'Medicine & Health', icon: '💊', color: 'bg-red-100' },
  { id: 'electronics', name: 'Electronics', icon: '💻', color: 'bg-gray-100' },
];

// Campaign categories
export const campaignCategories = [
  { id: 'medical', name: 'Medical', color: 'bg-red-100', textColor: 'text-red-700' },
  { id: 'education', name: 'Education', color: 'bg-blue-100', textColor: 'text-blue-700' },
  { id: 'disaster', name: 'Disaster Relief', color: 'bg-orange-100', textColor: 'text-orange-700' },
  { id: 'emergency', name: 'Emergency', color: 'bg-rose-100', textColor: 'text-rose-700' },
  { id: 'family', name: 'Family Support', color: 'bg-pink-100', textColor: 'text-pink-700' },
  { id: 'food', name: 'Food Security', color: 'bg-amber-100', textColor: 'text-amber-700' },
];

// Stats for homepage
export const stats = [
  { label: 'Total Donations', value: '৳50+ Crore' },
  { label: 'Active Campaigns', value: '124' },
  { label: 'Donors Community', value: '45,000+' },
  { label: 'Lives Impacted', value: '250,000+' },
];

// Testimonials
export const testimonials = [
  {
    name: 'Rajab Khan',
    role: 'Campaign Creator - Medical Fund',
    text: 'DonateBridge helped me raise funds for my daughter\'s surgery. The platform was easy to use and I received so much community support.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=21',
  },
  {
    name: 'Ayesha Rahman',
    role: 'Regular Donor',
    text: 'I love the transparency and regular updates on campaigns. I can see exactly where my donation goes. This platform changed how I give.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=22',
  },
  {
    name: 'Karim Ahmed',
    role: 'NGO Director',
    text: 'As an NGO, DonateBridge has become our primary fundraising platform. The reach and credibility it brings is invaluable.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=23',
  },
];

// FAQ data
export const faqs = [
  {
    question: 'How does DonateBridge ensure transparency?',
    answer: 'All campaigns are verified and regular updates are mandatory. Donors can track where their money goes with detailed financial reports.',
  },
  {
    question: 'Is my donation secure?',
    answer: 'Yes, we use industry-standard encryption and partner with trusted payment providers. All transactions are protected.',
  },
  {
    question: 'How do I track item donations?',
    answer: 'You\'ll receive SMS and email updates at each stage: pending, accepted, scheduled, collected, and delivered.',
  },
  {
    question: 'Can I create a campaign?',
    answer: 'Yes! We require basic verification and documentation. Visit "Start Fundraiser" to begin the process.',
  },
  {
    question: 'What items can I donate?',
    answer: 'We accept clothes, food, books, furniture, medicine, electronics, and more. Items must be in good condition.',
  },
  {
    question: 'Do I get a tax receipt?',
    answer: 'Yes, all donations ৳2000+ qualify for tax deduction. Receipts are issued automatically.',
  },
];

// How it works steps
export const howItWorks = [
  {
    step: 1,
    title: 'Browse & Choose',
    description: 'Explore verified campaigns and causes that match your interests.',
    icon: '🔍',
  },
  {
    step: 2,
    title: 'Donate Your Way',
    description: 'Donate money or items. Every contribution makes a real impact.',
    icon: '💝',
  },
  {
    step: 3,
    title: 'Track Progress',
    description: 'Get real-time updates on how your donation is making a difference.',
    icon: '📊',
  },
  {
    step: 4,
    title: 'See the Impact',
    description: 'Read success stories and see the positive change you helped create.',
    icon: '⭐',
  },
];

// Featured partners
export const partners = [
  'BRAC',
  'ASA',
  'GiveDirectly',
  'World Vision',
  'Doctors Without Borders',
  'Local Community Centers',
];
