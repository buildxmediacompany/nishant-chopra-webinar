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
] as const;

export type Testimonial = (typeof TESTIMONIALS)[number];
