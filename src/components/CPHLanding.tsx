import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { MapPin, Wifi, Coffee, Leaf, Clock, User2, Quote, Mail, CheckCircle2, Sparkles, Star, ExternalLink, MessageCircle } from "lucide-react";
import { guestConfig } from "@/config/guestConfig";
import { HeaderWeather } from "./HeaderWeather";

// Helper: section wrapper
const Section = ({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: React.ReactNode }) => (
  <section id={id} className="w-full py-16 md:py-24">
    <div className="container mx-auto px-4 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>
          {subtitle && <p className="text-muted-foreground mt-2 max-w-2xl">{subtitle}</p>}
        </div>
        {children}
      </motion.div>
    </div>
  </section>
);

export function CPHLanding() {
  const { host } = guestConfig;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const name = data.get("name");
    const email = data.get("email");
    const dates = data.get("dates");
    const message = data.get("message");
    const subject = encodeURIComponent(`Couchsurfing Request from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nDates: ${dates}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${host.phone}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky Nav */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <Sparkles className="h-5 w-5" />
            <span>Copenhagen CS</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a className="hover:text-primary" href="#about">About</a>
            <a className="hover:text-primary" href="#why">Why Stay</a>
            <a className="hover:text-primary" href="#space">The Space</a>
            <a className="hover:text-primary" href="#rules">Rules</a>
            <a className="hover:text-primary" href="#testimonials">Reviews</a>
            <a className="hover:text-primary" href="#tips">Local Tips</a>
            <a className="hover:text-primary" href="#faq">FAQ</a>
            <Button asChild size="sm">
              <a href="#contact">Request to Stay</a>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div id="top" className="relative">
        <div className="absolute inset-0 -z-10">
          <div
            className="h-[72vh] w-full bg-center bg-cover"
            style={{
              backgroundImage: "url('/home.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        <div className="container mx-auto max-w-6xl px-4 h-[72vh] flex items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight max-w-3xl">
              Stay with a Local in <span className="text-primary">Copenhagen</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
              Cozy home, friendly vibes, and insider tips—right in the heart of the city.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#contact">Request to Stay</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#space">See the Space</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Weather Widget */}
      <div className="container mx-auto max-w-6xl px-4 -mt-8 relative z-10">
        <HeaderWeather />
      </div>

      {/* About */}
      <Section id="about" title="Hej! I'm Your Host" subtitle={`I've been welcoming travelers to Copenhagen since 2020.`}>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card className="overflow-hidden">
              <img
                alt="Host portrait"
                className="h-72 w-full object-cover"
                src={host.photo || '/me.png'}
              />
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  Friendly, curious, and always up for a walk or a coffee chat.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2 flex items-center">
            <div className="space-y-4">
              <p>
                I love hosting and meeting people from around the world. I can help you plan city walks, find the best
                bakeries, and navigate bikes and the metro like a local.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <Feature icon={<Wifi className="h-5 w-5" />} title="Fast Wi‑Fi" text="Easy remote work setup." />
                <Feature icon={<Coffee className="h-5 w-5" />} title="Morning Coffee" text="Tea & coffee available." />
                <Feature icon={<Leaf className="h-5 w-5" />} title="Green Spots" text="Parks & canals nearby." />
                <Feature icon={<Clock className="h-5 w-5" />} title="Flexible Check‑in" text="When possible, within reason." />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Why Stay */}
      <Section id="why" title="Why Stay With Me" subtitle="A simple, comfortable base with a local's guidance.">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Comfortable Couch/Bed", text: "Clean bedding, cozy setup, shared spaces." },
            { title: "Great Location", text: "Walkable area with metro and buses close by." },
            { title: "Local Guidance", text: "Neighborhood walks, food tips, hidden gems." },
          ].map((f, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-xl">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{f.text}</CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* The Space / Gallery */}
      <Section id="space" title="The Space" subtitle="What your stay looks like.">
        <div className="grid md:grid-cols-2 gap-6">
          <GalleryImage src="/home.jpg" alt="Living room" />
          <GalleryImage src="/home.jpg" alt="Guest bed/couch" />
          <GalleryImage src="/home.jpg" alt="Kitchen" />
          <GalleryImage src="/home.jpg" alt="Bathroom" />
        </div>
        <p className="mt-6 text-muted-foreground">
          Guests sleep in the living room on a comfortable couch/guest bed. Fresh linens and blankets are provided. You'll share
          access to the bathroom and kitchen.
        </p>
        <Card className="mt-6">
          <CardContent className="p-4 grid sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <Amenity text="Wi‑Fi" />
            <Amenity text="Towels & Linens" />
            <Amenity text="Kitchen Access" />
            <Amenity text="Tea & Coffee" />
            <Amenity text="Heater" />
            <Amenity text="Laundry (ask)" />
            <Amenity text="Bike Tips" />
            <Amenity text="Public Transport Nearby" />
          </CardContent>
        </Card>
      </Section>

      {/* House Rules */}
      <Section id="rules" title="House Rules" subtitle="Helps everyone have a great stay.">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <Rule text="No smoking indoors" />
              <Rule text="Quiet hours after 23:00" />
              <Rule text="Max stay: 3 nights" />
              <Rule text="Please keep common areas tidy" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Good to Know</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <Rule text="Kitchen use is welcome, clean as you go" />
              <Rule text="Flexible check-in when possible" />
              <Rule text="Let me know allergies or preferences" />
              <Rule text="I host solo travelers and couples" />
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Testimonials */}
      <Section id="testimonials" title="Guest Reviews" subtitle="Real notes from past guests.">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { quote: "Amazing host — kind, communicative, and helpful.", name: "Sarah, Canada", rating: 5 },
            { quote: "Loved exploring the canals together. Felt at home!", name: "Marco, Italy", rating: 5 },
            { quote: "Great location and super cozy space.", name: "Emma, Australia", rating: 5 },
          ].map((t, i) => (
            <Card key={i}>
              <CardHeader className="flex-row items-center gap-2">
                <Quote className="h-5 w-5 text-primary" />
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }, (_, j) => (
                    <Star key={j} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <CardTitle className="text-base">{t.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{t.quote}</CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6">
          <Button variant="outline" asChild>
            <a href={host.couchsurfing} target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              See full Couchsurfing profile
            </a>
          </Button>
        </div>
      </Section>

      {/* Local Tips */}
      <Section id="tips" title="Local Tips" subtitle="Food, coffee, and hidden corners to explore.">
        <div className="grid lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Food & Coffee</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <Tip text="Try local smørrebrød at a cozy spot nearby." />
              <Tip text="Third‑wave coffee roasters within a 10‑minute walk." />
              <Tip text="Budget‑friendly eats around the corner." />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Walks & Views</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <Tip text="Canal walk at sunset — quiet and beautiful." />
              <Tip text="Green parks great for picnics and people‑watching." />
              <Tip text="Bike‑friendly paths to major sights." />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Getting Around</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <Tip text="Metro within minutes — direct to airport." />
              <Tip text="Use a travel card for easy tap‑in/out." />
              <Tip text="Bike rentals are nearby and affordable." />
            </CardContent>
          </Card>
        </div>
        <Card className="mt-8">
          <CardContent className="p-0">
            <div className="aspect-[16/6] w-full bg-muted flex items-center justify-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span>{host.addressLine1}, {host.city}</span>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* FAQ */}
      <Section id="faq" title="FAQ" subtitle="Quick answers to common questions.">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="q1">
            <AccordionTrigger>What are check‑in and check‑out times?</AccordionTrigger>
            <AccordionContent>
              Check‑in from 15:00 when possible; check‑out by 11:00. I can store bags if schedules don't align.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>Can I use the kitchen?</AccordionTrigger>
            <AccordionContent>
              Yes — you're welcome to cook. Please clean as you go and be mindful during quiet hours.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>Do you host couples?</AccordionTrigger>
            <AccordionContent>
              Yes, I can host friendly couples comfortable with a shared living space.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q4">
            <AccordionTrigger>What's the WiFi password?</AccordionTrigger>
            <AccordionContent>
              The WiFi details are provided upon arrival, or you can check the WiFi tab in the navigation.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Request to Stay" subtitle="Tell me a bit about your trip and dates.">
        <Card>
          <CardContent className="p-6">
            <form
              className="grid md:grid-cols-2 gap-4"
              onSubmit={handleFormSubmit}
            >
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="name">Name</label>
                <Input id="name" name="name" placeholder="Your name" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">Email</label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium" htmlFor="dates">When would you like to stay?</label>
                <Input id="dates" name="dates" placeholder="e.g. 12–15 Nov" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium" htmlFor="message">Message</label>
                <Textarea id="message" name="message" placeholder="Tell me about your trip and what you're looking for." rows={5} />
              </div>
              <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
                <Button type="submit" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Send Request
                </Button>
                <Button asChild variant="outline" className="gap-2">
                  <a href={`https://wa.me/${host.whatsapp?.replace('+', '') || ''}`} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Me
                  </a>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Section>

      <Separator className="my-6" />

      {/* Footer */}
      <footer className="py-8">
        <div className="container mx-auto max-w-6xl px-4 grid md:grid-cols-3 gap-6 items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold">
              <Sparkles className="h-5 w-5" />
              <span>Copenhagen CS</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Friendly hosting in Copenhagen with a simple, comfortable stay and local tips.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Quick Links</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a className="hover:text-primary" href="#about">About</a></li>
              <li><a className="hover:text-primary" href="#space">The Space</a></li>
              <li><a className="hover:text-primary" href="#rules">House Rules</a></li>
              <li><a className="hover:text-primary" href="#contact">Request to Stay</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Elsewhere</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a className="hover:text-primary" href={host.couchsurfing} target="_blank" rel="noreferrer">Couchsurfing Profile</a></li>
              <li><a className="hover:text-primary" href={`mailto:${host.phone}`}>Email Me</a></li>
              <li><a className="hover:text-primary" href={`tel:${host.phone}`}>Call Me</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto max-w-6xl px-4 mt-6 text-xs text-muted-foreground">© {new Date().getFullYear()} Copenhagen CS</div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-3 p-3 rounded-2xl bg-muted/50">
      <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">{icon}</div>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-muted-foreground">{text}</div>
      </div>
    </div>
  );
}

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="overflow-hidden rounded-2xl shadow-sm">
      <img src={src} alt={alt} className="h-64 w-full object-cover hover:scale-[1.02] transition-transform" />
    </motion.div>
  );
}

function Amenity({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /><span>{text}</span></div>
  );
}

function Rule({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2"><User2 className="h-4 w-4" /><span>{text}</span></div>
  );
}

function Tip({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>{text}</span></div>
  );
}
