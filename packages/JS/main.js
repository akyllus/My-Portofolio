'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Moon, Sun, ChevronUp } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
      const currentSection = getSectionInView()
      if (currentSection) setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getSectionInView = () => {
    const sections = document.querySelectorAll('section[id]')
    let current = ''

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      if (window.scrollY >= sectionTop - 58) {
        current = section.getAttribute('id') || ''
      }
    })

    return current
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md dark:bg-gray-800' : 'bg-transparent'}`}>
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-primary">Portfolio</a>
          <div className="hidden md:flex space-x-4">
            {['home', 'about', 'skills', 'services', 'portfolio', 'contact'].map((item) => (
              <a key={item} href={`#${item}`} className={`capitalize ${activeSection === item ? 'text-primary' : 'text-gray-600 dark:text-gray-300'}`}>{item}</a>
            ))}
          </div>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          <Button variant="outline" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            Menu
          </Button>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 py-2">
            {['home', 'about', 'skills', 'services', 'portfolio', 'contact'].map((item) => (
              <a key={item} href={`#${item}`} className="block px-4 py-2 capitalize" onClick={() => setIsMenuOpen(false)}>{item}</a>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">
        <section id="home" className="min-h-screen flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-center">Welcome to My Portfolio</h1>
        </section>

        <section id="skills" className="py-16 bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">My Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {['Frontend', 'Backend', 'Design', 'Soft Skills'].map((category) => (
                <Card key={category}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{category}</h3>
                    <ul className="space-y-2">
                      {['Skill 1', 'Skill 2', 'Skill 3'].map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">My Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Web Development', 'UI/UX Design', 'Mobile App Development'].map((service) => (
                <Card key={service}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{service}</h3>
                    <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <Button>Learn More</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="py-16 bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">My Portfolio</h2>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
              }}
            >
              {[1, 2, 3, 4, 5].map((item) => (
                <SwiperSlide key={item}>
                  <Card>
                    <CardContent className="p-6">
                      <img src={`/placeholder.svg?height=200&width=300`} alt={`Project ${item}`} className="w-full h-40 object-cover mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Project {item}</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <section id="contact" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Contact Me</h2>
            <form className="max-w-lg mx-auto">
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2">Name</label>
                <input type="text" id="name" className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2">Email</label>
                <input type="email" id="email" className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block mb-2">Message</label>
                <textarea id="message" rows={4} className="w-full p-2 border rounded"></textarea>
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 My Portfolio. All rights reserved.</p>
        </div>
      </footer>

      <Button
        variant="outline"
        size="icon"
        className={`fixed bottom-4 right-4 transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ChevronUp className="h-4 w-4" />
      </Button>
    </div>
  )
}

