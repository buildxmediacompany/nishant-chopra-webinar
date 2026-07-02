/**
 * Usage: npm run db:seed
 * Populates a first webinar + the shared content pools so the site renders
 * meaningfully out of the box. Everything here is placeholder copy/media —
 * replace it from /admin once you're live.
 */
import "dotenv/config";
import { db } from "@/db";
import {
  webinars,
  testimonialScreenshots,
  testimonials,
  bonuses,
  featureHighlights,
  audienceSegments,
  faqs,
  siteSettings,
} from "@/db/schema";

async function main() {
  console.log("Seeding...");

  await db.insert(webinars).values({
    slug: "sing-like-a-pro",
    isActive: true,
    announcementBarText:
      "Register Now, Seats are Filling Fast only for First 100 People",
    countdownTargetAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days out
    heroHeadline:
      "In {gold}3 Simple Steps{/gold} Master High Notes, Harkats & Sing Bollywood Songs Like a Pro {gold}In Just 2 Hours{/gold} {red}Live Masterclass!{/red}",
    heroSubheadline: "From Basic to Advanced — No Classical Background Required",
    heroVideoUrl: "",
    heroVideoThumbnailUrl: "https://placehold.co/640x800/1a0f0f/e8b545?text=Mentor+Intro+Video",
    eventDate: "2026-07-05",
    eventTime: "7 PM",
    language: "Hindi and English",
    mode: "Zoom",
    ratingValue: "4.9",
    ratingLabel: "Rating",
    studentsTrainedLabel: "10,000+ Students Trained",
    seatsRegisteredLabel: "2,847 already registered",
    originalPricePaise: 479400,
    offerPricePaise: 9900,
    seatsLeftCount: 2,
    seatsLeftText: "Filling Fast Only 2 Seats Left",
    registrationUrl: "https://example.com/register",
    mentorName: "Nishant Chopra",
    mentorTagline: "8+ Years of Teaching Experience",
    mentorBio:
      "Nishant has mentored 1000+ singers to strengthen their high notes, master murkis and taans, and sing Bollywood songs with real expression and control.",
    mentorPhotoUrl: "https://placehold.co/500x600/1a0f0f/e8b545?text=Nishant+Chopra",
    mentorBadges: "1000+ Students,4.9/5 Rating,Award Winner",
  });

  await db.insert(testimonialScreenshots).values(
    Array.from({ length: 6 }).map((_, i) => ({
      imageUrl: `https://placehold.co/500x400/13181f/e8b545?text=Student+Review+${i + 1}`,
      altText: `Student review screenshot ${i + 1}`,
      order: i,
    }))
  );

  await db.insert(testimonials).values([
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      quote:
        "I always thought I couldn't sing high notes. After just one session, I felt notes I never imagined I could. This workshop changed everything.",
      avatarUrl: "https://i.pravatar.cc/150?img=47",
      order: 0,
    },
    {
      name: "Arjun Patel",
      location: "Ahmedabad",
      rating: 5,
      quote:
        "The harkat techniques blew my mind. My friends now ask me to sing at every gathering. Best decision I ever made attending this session.",
      avatarUrl: "https://i.pravatar.cc/150?img=12",
      order: 1,
    },
    {
      name: "Sneha Reddy",
      location: "Hyderabad",
      rating: 5,
      quote:
        "No classical background, zero formal training — and yet I'm now confidently singing at events. The step-by-step approach is magical.",
      avatarUrl: "https://i.pravatar.cc/150?img=32",
      order: 2,
    },
    {
      name: "Rahul Verma",
      location: "Delhi",
      rating: 5,
      quote:
        "I spent 2 years on YouTube tutorials with no progress. One step-by-step session gave me more clarity than everything I'd tried before.",
      avatarUrl: "https://i.pravatar.cc/150?img=53",
      order: 3,
    },
    {
      name: "Kavita Nair",
      location: "Bangalore",
      rating: 5,
      quote:
        "The daily riyaz tracks are worth it alone. My voice has become noticeably clearer and more flexible — I can actually feel the improvement.",
      avatarUrl: "https://i.pravatar.cc/150?img=29",
      order: 4,
    },
    {
      name: "Amit Singh",
      location: "Pune",
      rating: 5,
      quote:
        "I was skeptical at first, but the feedback was incredible. He corrected my pitch in real time and I could hear the difference instantly.",
      avatarUrl: "https://i.pravatar.cc/150?img=15",
      order: 5,
    },
  ]);

  await db.insert(bonuses).values([
    {
      title: "High-Notes Warm-Up Guide",
      valuePaise: 99900,
      description:
        "Master effortless high notes with a quick, proven warm-up routine you can use every day.",
      iconName: "Mic2",
      order: 0,
    },
    {
      title: "Murki & Harkat Pro Pack",
      valuePaise: 99900,
      description:
        "Step-by-step exercises to add smooth murkiyan and intricate harkats so you can sing complex runs with ease.",
      iconName: "AudioWaveform",
      order: 1,
    },
    {
      title: "Bollywood Vocal Style Tips",
      valuePaise: 99900,
      description:
        "Techniques to make your voice sound authentic, Bollywood-pressing, feel, and tone just like the pros.",
      iconName: "Music",
      order: 2,
    },
    {
      title: "Voice Range Expansion Drills",
      valuePaise: 79900,
      description:
        "Progressive exercises to safely increase your vocal range so high and low notes feel effortless.",
      iconName: "TrendingUp",
      order: 3,
    },
    {
      title: "Post-Webinar Live Q&A Access",
      valuePaise: 99800,
      description:
        "Exclusive 30-minute session to ask your personal singing questions and get direct feedback.",
      iconName: "MessageCircleQuestion",
      order: 4,
    },
  ]);

  await db.insert(featureHighlights).values([
    {
      title: "Hit High Notes Effortlessly",
      description:
        "Learn the exact technique to reach notes you thought were impossible — without straining your voice.",
      iconName: "ArrowUpNarrowWide",
      order: 0,
    },
    {
      title: "Master Harkats & Taans",
      description:
        "Discover the secrets behind those beautiful ornamentations that make Bollywood songs come alive.",
      iconName: "Waves",
      order: 1,
    },
    {
      title: "Sing Any Bollywood Song",
      description:
        "Get a step-by-step framework to learn and perform any Bollywood song with confidence and emotion.",
      iconName: "Music4",
      order: 2,
    },
    {
      title: "Beginner-Friendly – No Classical Background Needed",
      description:
        "Learn the exact technique to reach notes you thought were impossible using your voice as it is today.",
      iconName: "Sprout",
      order: 3,
    },
    {
      title: "See Results in 7 Days",
      description:
        "Students report noticeable improvement within the first week of applying these techniques.",
      iconName: "CalendarCheck2",
      order: 4,
    },
    {
      title: "Live Practice & Feedback",
      description:
        "This isn't a lecture — you'll get live practice time and real-time corrections from the mentor.",
      iconName: "Radio",
      order: 5,
    },
    {
      title: "Structured Practice Plan – Improve Daily Without Confusion",
      description:
        "No more random YouTube tutorials. You'll get a clear, day-by-day routine that shows exactly what to practice.",
      iconName: "ListChecks",
      order: 6,
    },
    {
      title: "Confidence Boost – Sing Without Fear",
      description:
        "Whether it's a family function, karaoke night, stage performance, or Instagram reel, sing without overthinking or feeling embarrassed about high notes.",
      iconName: "ShieldCheck",
      order: 7,
    },
    {
      title: "Vocal Clarity – No More Throat Tightness",
      description:
        "Stop forcing your throat. Learn how to open your throat properly so you can sing strong, clear, and powerful without strain or discomfort during high notes.",
      iconName: "Sparkle",
      order: 8,
    },
  ]);

  await db.insert(audienceSegments).values([
    {
      title: "Bathroom Singers",
      description:
        "You love singing but feel stuck at the same level and want to sound professional.",
      iconName: "ShowerHead",
      order: 0,
    },
    {
      title: "Stage Performers",
      description:
        "You perform at events and want to captivate audiences with flawless vocals.",
      iconName: "Theater",
      order: 1,
    },
    {
      title: "Aspiring Bollywood Singers",
      description:
        "You dream of singing Bollywood songs with the right emotion, pitch, and style.",
      iconName: "Star",
      order: 2,
    },
    {
      title: "Struggling with High Notes",
      description:
        "You crack, strain, or go off-pitch every time you try for those powerful notes.",
      iconName: "AlertTriangle",
      order: 3,
    },
    {
      title: "Self-Taught Singers",
      description:
        "You've learned from YouTube but need structured guidance to truly level up.",
      iconName: "GraduationCap",
      order: 4,
    },
    {
      title: "Instrumentalists Adding Vocals",
      description:
        "You play an instrument and want to add your musical skill to your vocal repertoire.",
      iconName: "Guitar",
      order: 5,
    },
  ]);

  await db.insert(faqs).values([
    {
      question: "Who is this webinar for & what will I learn?",
      answer:
        "This is for anyone who wants to sing better — beginners to intermediate singers, bathroom singers, stage performers, and self-taught vocalists. You'll learn how to hit high notes, add harkats and taans, and sing Bollywood songs with confidence.",
      order: 0,
    },
    {
      question: "What is the duration of the webinar?",
      answer: "The live session runs for approximately 2 hours, including a live Q&A.",
      order: 1,
    },
    {
      question: "Will the webinar be live or recorded?",
      answer:
        "It's 100% live so you can ask questions and get real-time feedback. A limited-time recording may be shared with registered attendees afterward.",
      order: 2,
    },
    {
      question: "How can I make the payment?",
      answer:
        'Tap any "Register Now" button — you\'ll be taken to our secure registration page to complete payment.',
      order: 3,
    },
    {
      question: "How will I know if my seat is confirmed?",
      answer:
        "You'll receive a confirmation email/WhatsApp message immediately after successful registration, along with the joining link.",
      order: 4,
    },
    {
      question: "What is the refund policy if I can't attend?",
      answer:
        "Since seats are limited and reserved for you specifically, this workshop is non-refundable. If you can't attend live, reach out and we'll help where we can.",
      order: 5,
    },
    {
      question: "What are the requirements to join the webinar?",
      answer:
        "Just a phone or laptop with a stable internet connection and Zoom installed. No prior classical training or equipment needed.",
      order: 6,
    },
    {
      question: "Any additional info / guidance?",
      answer:
        "Join a few minutes early, keep a notebook handy, and come ready to sing along — this is a practical, participation-first session.",
      order: 7,
    },
  ]);

  await db.insert(siteSettings).values({
    id: 1,
    siteName: "Nishant Chopra Live",
    defaultRegistrationUrl: "https://example.com/register",
    supportEmail: "support@example.com",
    supportPhone: "+91 00000 00000",
    footerText: "© 2026 Nishant Chopra. All rights reserved.",
  });

  console.log("✅ Seed complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
