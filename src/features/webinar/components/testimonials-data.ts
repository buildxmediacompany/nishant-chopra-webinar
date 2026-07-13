/**
 * Shared student testimonial data used by both the
 * TestimonialGrid (marquee quotes) and ScreenshotGrid (DM cards).
 */
export const TESTIMONIALS = [
  {
    id: "t1",
    name: "Priya S.",
    location: "Mumbai",
    avatar: "/assets/1.webp",
    quote:
      "Workshop ke baad Bollywood gaane me jo murkiyan hoti hain, sab clear lag rahi hain. Thank you so much Nishant sir ❤️",
    rating: 5,
  },
  {
    id: "t2",
    name: "Riya",
    location: "Delhi",
    avatar: "/assets/3.webp",
    quote:
      "Pehle high notes mere liye nightmare the, par sir apke tips ke baad main easily unhe hit karti hoon. Confidence ab double ho gaya hai. Thank you sir 😊",
    rating: 5,
  },
  {
    id: "t3",
    name: "Anjali M.",
    location: "Pune",
    avatar: "/assets/4.webp",
    quote:
      "Thank you so much — ab meri voice mein clear change feel ho raha hai aur ab main confidently apni singing present kar pa rahi hun 🙏",
    rating: 5,
  },
  {
    id: "t4",
    name: "Rajesh K.",
    location: "Bangalore",
    avatar: "/assets/2.webp",
    quote:
      "Main sochta tha singing sirf gifted log kar sakte hain, par aapne sab easy bana diya. Thank you so much sir!",
    rating: 5,
  },
  {
    id: "t5",
    name: "Harshit",
    location: "Jaipur",
    avatar: "/assets/5.webp",
    quote:
      "Nishant sir, aaj pehli baar high notes itni easily hit hui 😊 Ab gaane mein confidence aa gaya. All credit goes to you 🙏❤️",
    rating: 5,
  },
  {
    id: "t6",
    name: "Aakash V.",
    location: "Hyderabad",
    avatar: "/assets/6.webp",
    quote:
      "Hi Nishant sir, now I can sing with real feeling — not just the notes. Your tips are working like magic!",
    rating: 5,
  },
  {
    id: "t7",
    name: "Arjun Mehta",
    location: "Mumbai",
    avatar: "/assets/t7.webp",
    quote:
      "Maine pehle socha tha ki singing sirf unke liye hai jinhe naturally gift milti hai. Iss workshop ne sab badal diya — pehli baar lag raha hai ki main actually kuch seekh sakta hoon. Sir ka teaching style ekdum practical aur clear hai 🙏",
    rating: 5,
  },
  {
    id: "t8",
    name: "Karan Bhatia",
    location: "Delhi",
    avatar: "/assets/t8.webp",
    quote:
      "Mujhe hamesha darr lagta tha ki main gaaunga toh log hasenge. Lekin sir ne ek technique batai — 5 minute mein meri voice ka tension chala gaya. Ab main office parties mein bhi confidently gaata hoon 😄",
    rating: 5,
  },
  {
    id: "t9",
    name: "Suresh Nair",
    location: "Chennai",
    avatar: "/assets/t9.webp",
    quote:
      "At 52, I thought it was too late to learn singing. Nishant sir proved me completely wrong. The way he explains sur and taan makes it so simple. My family can't believe the difference in just one session!",
    rating: 5,
  },
  {
    id: "t10",
    name: "Shreya Kapoor",
    location: "Bangalore",
    avatar: "/assets/t10.webp",
    quote:
      "Ek hi session mein itna kuch seekha — breathwork, high notes aur harkat — jo 2 saal se kisi ne nahi samjhaya. Sir ka explanation sunke laga ki singing is actually so logical. Definitely joining the full course! ✨",
    rating: 5,
  },
  {
    id: "t11",
    name: "Meenakshi Iyer",
    location: "Pune",
    avatar: "/assets/t11.webp",
    quote:
      "I used to get breathless singing even one full song. After the breathing technique Nishant sir taught, I sang 3 songs back-to-back at my sister's sangeet. The compliments were overwhelming 🥹❤️",
    rating: 5,
  },
  {
    id: "t12",
    name: "Rohan Verma",
    location: "Ahmedabad",
    avatar: "/assets/t12.webp",
    quote:
      "Sir ne jo concept samjhaya — resonance aur voice placement — isko practically try kiya aur yaar, pehli baar lag raha tha main actually sahi gaa raha hoon! 2 ghante mein itna improvement kisi ne socha bhi nahi tha. Must attend! 🎤🔥",
    rating: 5,
  },
] as const;

export type Testimonial = (typeof TESTIMONIALS)[number];
