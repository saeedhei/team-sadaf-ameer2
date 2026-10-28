import { GalleryProject, ServiceItem, Testimonial } from '../types';
import lawnImage from '../assets/images/lawn_mowing_stripes_1791992992954.jpg';
import hedgeImage from '../assets/images/hedge_trimming_shaping_1791992994507.jpg';
import gardenImage from '../assets/images/hero_manchester_garden_1791992991902.jpg';
import plantingImage from '../assets/images/planting_weeding_border_1791993275799.jpg';
import makeoverImage from '../assets/images/garden_makeover_patio_1791992995362.jpg';
import pressureWashingImage from '../assets/images/pressure_washing_paving_1791992995061.jpg';

export const BUSINESS_INFO = {
  name: 'EU Gardening Services',
  address: '1341 Ashton Old Rd, Openshaw, Manchester M11 1JT, United Kingdom',
  street: '1341 Ashton Old Rd',
  area: 'Openshaw',
  city: 'Manchester',
  postcode: 'M11 1JT',
  country: 'United Kingdom',
  phone: '+44 7496 786474',
  phoneRaw: '+447496786474',
  whatsappNumber: '447496786474',
  email: 'eugardeningservicesmcr@gmail.com',
  workingHours: 'Monday – Saturday: 08:00 – 18:00 (Sunday by prior arrangement)',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=1341+Ashton+Old+Rd,+Openshaw,+Manchester+M11+1JT',
  defaultWhatsAppMessage:
    'Hello, I’m interested in your gardening services in Manchester and would like a free quote.',
  getWhatsAppUrl: (customMessage?: string) => {
    const msg = customMessage || BUSINESS_INFO.defaultWhatsAppMessage;
    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  },
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'lawn-mowing',
    title: 'Lawn Mowing & Care',
    shortDesc: 'Regular striped cutting, precision border edging, and seasonal turf conditioning.',
    fullDesc:
      'Keep your Manchester lawn in pristine, striped condition throughout the growing season. We use commercial rear-roller mowers to create signature British lawn stripes, trim edges flush with strimmers and shears, and leave all paths and patios blown clear of grass cuttings.',
    image: lawnImage,
    iconName: 'Scissors',
    features: [
      'Crisp striped cylinder or roller finish',
      'Sharp vertical edging along flowerbeds & paths',
      'Grass clippings gathered & placed in green bins or removed',
      'Seasonal aeration, overseeding & feed treatments available',
      'Flexible weekly, fortnightly, or one-off cut schedules',
    ],
    pricingGuide: 'From £25 for standard gardens (free quote provided)',
    bestFor: 'Homeowners, landlords, and commercial grounds needing dependable lawn upkeep',
    recommendedFrequency: 'Fortnightly between March and October',
  },
  {
    id: 'hedge-trimming',
    title: 'Hedge Trimming & Shaping',
    shortDesc: 'Sharp architectural shaping, height reduction, and neat boundary hedge pruning.',
    fullDesc:
      'Overgrown hedges can quickly block natural light and encroach on pathways. We provide expert trimming, leveling, and reduction for privet, conifer, beech, laurel, and hawthorn hedges across Greater Manchester, ensuring tidy geometric lines and healthy seasonal regrowth.',
    image: hedgeImage,
    iconName: 'Trees',
    features: [
      'Precision top levelling and crisp vertical lines',
      'Conifer, laurel, privet, and beech hedge shaping',
      'Height reductions and branch thinning for increased light',
      'Full branch and twig sweeping with complete site clear-down',
      'Respectful of local wildlife and nesting season guidelines',
    ],
    pricingGuide: 'Quotes based on hedge height, length, and access',
    bestFor: 'Boundary hedges, formal privacy borders, and topiary maintenance',
    recommendedFrequency: '1 to 2 times annually (late spring & late summer)',
  },
  {
    id: 'garden-maintenance',
    title: 'Garden Maintenance',
    shortDesc: 'Complete year-round garden care, seasonal pruning, tidying, and weed management.',
    fullDesc:
      'A dependable scheduled garden care service tailored to Manchester weather. Whether you need a fortnightly visit to keep weeds under control and plants flourishing or a monthly seasonal tidy, our team takes pride in keeping your outdoor spaces healthy, inviting, and clean.',
    image: gardenImage,
    iconName: 'Sparkles',
    features: [
      'Comprehensive weeding of flower beds, borders, and gravel',
      'Shrub pruning, deadheading roses, and seasonal plant shaping',
      'Autumn leaf collection and winter garden tidy-ups',
      'Composting and green waste management',
      'Tailored recurring schedules (weekly, fortnightly, monthly)',
    ],
    pricingGuide: 'Flexible hourly or fixed-visit rates per property',
    bestFor: 'Busy families, elderly residents, and landlords needing hassle-free garden health',
    recommendedFrequency: 'Fortnightly during spring/summer, monthly in winter',
  },
  {
    id: 'planting-weeding',
    title: 'Planting & Weeding',
    shortDesc: 'Bed preparation, perennial flower planting, soil enrichment, and weed suppression.',
    fullDesc:
      'Transform tired flower borders into vibrant, pollinator-friendly displays. We remove stubborn weeds down to the root, enrich heavy clay Manchester soils with organic compost, and plant durable perennials, shrubs, and seasonal bedding plants suited to local conditions.',
    image: plantingImage,
    iconName: 'Flower2',
    features: [
      'Deep root weed extraction without excessive chemical use',
      'Bed preparation, digging, and soil conditioning with compost',
      'Perennial, herbaceous, and shrub planting schemes',
      'Premium bark mulching for moisture retention and weed prevention',
      'Seasonal bulb planting (daffodils, alliums, tulips)',
    ],
    pricingGuide: 'Transparent labour + plant sourcing options',
    bestFor: 'Reviving dull borders, creating colourful front gardens, and weed eradication',
    recommendedFrequency: 'Seasonal bed overhauls in spring and autumn',
  },
  {
    id: 'garden-makeovers',
    title: 'Garden Makeovers & Clearances',
    shortDesc: 'Overgrown garden transformations, full site clearances, and new turfing.',
    fullDesc:
      'Have you inherited an overgrown jungle or neglected rental property? We tackle heavy brambles, self-seeded saplings, dilapidated sheds, and untamed vegetation. We can level the ground, lay fresh turf, install raised sleeper beds, and give your garden a complete fresh start.',
    image: makeoverImage,
    iconName: 'Trowel',
    features: [
      'Heavy bramble, weed, and overgrown ivy clearance',
      'Soil grading, leveling, and premium turf laying',
      'Raised timber sleeper beds for low-maintenance gardening',
      'Full green waste bagging and legal disposal',
      'End-of-tenancy garden restorations for landlords & letting agents',
    ],
    pricingGuide: 'Free on-site or photo-based fixed quotation',
    bestFor: 'New homeowners, overgrown properties, and landlords preparing for sale or let',
    recommendedFrequency: 'One-off major transformation project',
  },
  {
    id: 'pressure-washing',
    title: 'Pressure Washing & Jet Cleaning',
    shortDesc: 'Restoring slippery stone patios, driveways, decking, and block paving.',
    fullDesc:
      'Manchester rain and damp winters leave patios and driveways coated in slippery green algae, black spots, and moss. Our commercial-grade high-pressure jet washing safely strips away years of grime, restoring the natural beauty of Indian sandstone, flags, block paving, and timber decking.',
    image: pressureWashingImage,
    iconName: 'Droplets',
    features: [
      'Deep cleaning of Indian sandstone, concrete flags & porcelain',
      'Block paving cleaning with kiln-dried sand re-pointing',
      'Timber decking de-mossing and non-slip surface restoration',
      'Driveways, paths, garden walls, and steps cleaned thoroughly',
      'Eco-friendly cleaning with minimal chemical dependency',
    ],
    pricingGuide: 'From £60 depending on square meterage and surface type',
    bestFor: 'Slippery patios, weathered driveways, and spring outdoor revitalisation',
    recommendedFrequency: 'Once annually in spring or early autumn',
  },
];

export const TRUST_INDICATORS = [
  {
    title: 'Local Manchester Base',
    subtitle: 'Openshaw Based',
    desc: 'Located at 1341 Ashton Old Rd, Openshaw. Quick callouts across Manchester, Droylsden, Clayton, and nearby postcodes.',
  },
  {
    title: 'Clear & Free Quotations',
    subtitle: 'No Hidden Costs',
    desc: 'Transparent, competitive pricing. Send photos via WhatsApp or book a visit for a guaranteed free, no-obligation quote.',
  },
  {
    title: 'Dependable Scheduling',
    subtitle: 'Punctual & Reliable',
    desc: 'We value your time. We agree on a date and time slot, communicate clearly, and arrive equipped to do the job properly.',
  },
  {
    title: 'Commercial Gear & Tidy Finish',
    subtitle: 'Spotless Clean-Up',
    desc: 'Equipped with professional petrol mowers, trimmers, and pressure washers. We leave all driveways and paths swept clean.',
  },
];

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: 'proj-1',
    title: 'Residential Lawn Striping & Edge Detailing',
    category: 'lawns',
    location: 'Openshaw (M11)',
    image: lawnImage,
    description: 'Fortnightly lawn cutting with sharp roller stripes, border trimmings, and blown patio clear-up.',
    completionTime: '1 Hour',
  },
  {
    id: 'proj-2',
    title: 'Formal Privet & Conifer Boundary Hedge Shaping',
    category: 'hedges',
    location: 'Droylsden (M43)',
    image: hedgeImage,
    description: 'Precision trimming of 25-meter boundary hedge line, leveling tops and removing overgrowth from the path.',
    completionTime: '3 Hours',
  },
  {
    id: 'proj-3',
    title: 'Sandstone Patio Restoration & Sleepers',
    category: 'makeovers',
    location: 'Gorton (M18)',
    image: makeoverImage,
    description: 'Full garden makeover: leveled garden bed, added treated timber sleeper planters, and seeded fresh lawn.',
    completionTime: '2 Days',
  },
  {
    id: 'proj-4',
    title: 'Indian Sandstone Jet Washing & Algae Removal',
    category: 'pressure-washing',
    location: 'Clayton (M11)',
    image: pressureWashingImage,
    description: 'High-pressure wash removing years of stubborn Manchester moss and grime, restoring natural stone colour.',
    completionTime: 'Half Day',
  },
  {
    id: 'proj-5',
    title: 'Perennial Flower Border Planting & Bark Mulch',
    category: 'planting',
    location: 'Didsbury (M20)',
    image: plantingImage,
    description: 'Removal of entrenched weeds, soil improvement with rich compost, and planting of hardy British perennials.',
    completionTime: '1 Day',
  },
  {
    id: 'proj-6',
    title: 'Complete Garden Clearance & Summer Tidy',
    category: 'makeovers',
    location: 'Ancoats (M4)',
    image: gardenImage,
    description: 'Comprehensive seasonal maintenance: lawn cut, hedges reshaped, borders weeded, and green waste bagged.',
    completionTime: '1 Day',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'David R.',
    area: 'Openshaw',
    postcode: 'M11',
    service: 'Lawn Mowing & Hedge Trimming',
    rating: 5,
    date: 'August 2026',
    comment:
      'EU Gardening Services have been maintaining our front and back gardens fortnightly this season. Always on time, very polite, and the lawn stripes look brilliant every time. Highly recommended local team.',
  },
  {
    id: 'test-2',
    name: 'Sarah & Mark H.',
    area: 'Droylsden',
    postcode: 'M43',
    service: 'Patio Pressure Washing',
    rating: 5,
    date: 'September 2026',
    comment:
      'Our Indian stone patio was black with moss and dangerously slippery after the wet winter. The pressure washing made it look brand new in just a few hours. Cleaned up all the splash marks too.',
  },
  {
    id: 'test-3',
    name: 'James K.',
    area: 'Clayton',
    postcode: 'M11',
    service: 'Garden Clearance & Makeover',
    rating: 5,
    date: 'July 2026',
    comment:
      'We moved into a house where the back garden was completely overgrown with brambles. EU Gardening cleared the lot, took away all the green waste, and leveled the lawn. Outstanding hard work.',
  },
  {
    id: 'test-4',
    name: 'Emma T.',
    area: 'Gorton',
    postcode: 'M18',
    service: 'Regular Maintenance & Planting',
    rating: 5,
    date: 'August 2026',
    comment:
      'Communicating over WhatsApp was effortless. Got a quick quote with a couple of photos, and they were around two days later. Courteous, hard working, and left the garden spotless.',
  },
];

export const COVERAGE_POSTCODES = [
  { code: 'M11', area: 'Openshaw, Clayton, Abbey Hey', primary: true },
  { code: 'M43', area: 'Droylsden', primary: true },
  { code: 'M18', area: 'Gorton, Abbey Hey', primary: true },
  { code: 'M34', area: 'Denton, Audenshaw', primary: true },
  { code: 'M4', area: 'Ancoats, Northern Quarter', primary: true },
  { code: 'M1', area: 'Manchester City Centre', primary: true },
  { code: 'M12', area: 'Ardwick, West Gorton', primary: true },
  { code: 'M13', area: 'Longsight, Victoria Park', primary: false },
  { code: 'M14', area: 'Fallowfield, Rusholme', primary: false },
  { code: 'M19', area: 'Levenshulme, Burnage', primary: false },
  { code: 'M20', area: 'Didsbury, Withington', primary: false },
  { code: 'SK5', area: 'Reddish, Stockport', primary: true },
  { code: 'SK4', area: 'Heaton Moor, Heaton Mersey', primary: false },
  { code: 'OL6', area: 'Ashton-under-Lyne', primary: true },
  { code: 'OL7', area: 'Ashton-under-Lyne (West)', primary: true },
  { code: 'M3', area: 'Salford, Manchester City Centre', primary: false },
  { code: 'M5', area: 'Ordsall, Salford', primary: false },
];
