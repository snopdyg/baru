"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, Menu } from "lucide-react"
import Image from "next/image"

export default function FrostWebsite() {
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const contractAddress = "COMING SOON"

  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    document.title = "TISM on Base - The Ultimate Meme Token"

    // Load Bungee font
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Bungee&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    // Apply font to body
    document.body.style.fontFamily = "Bungee, cursive"

    // Smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = "smooth"

    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    // Observe all sections
    const sections = document.querySelectorAll("[data-animate]")
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const copyToClipboard = () => {
    if (contractAddress === "COMING SOON") {
      return // Don't copy if it's coming soon
    }
    navigator.clipboard.writeText(contractAddress)
    setCopiedAddress(true)
    setTimeout(() => setCopiedAddress(false), 2000)
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  const getAnimationClass = (elementId: string, delay = 0) => {
    const isVisible = visibleSections.has(elementId)
    return `transition-all duration-1000 ease-out ${delay > 0 ? `delay-${delay}` : ""} ${
      isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
    }`
  }

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "Bungee, cursive",
        backgroundImage: "url('/tism-background.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-2 sm:p-4 transition-all duration-300">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
            <Image
              src="/tism-logo.jpeg"
              alt="TISM Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:block bg-white/90 backdrop-blur-sm rounded-full px-6 xl:px-8 py-2 xl:py-3 border-4 border-black shadow-lg transform hover:scale-105 transition-all duration-300"
            style={{ fontFamily: "Bungee, cursive" }}
          >
            <div className="flex items-center gap-4 xl:gap-8 font-bold text-black text-sm xl:text-lg">
              <button
                onClick={() => scrollToSection("home")}
                className="hover:text-cyan-600 transition-colors duration-300"
              >
                HOME
              </button>
              <button
                onClick={() => scrollToSection("tokenomics")}
                className="hover:text-cyan-600 transition-colors duration-300"
              >
                TOKENOMICS
              </button>
              <button
                onClick={() => scrollToSection("memes")}
                className="hover:text-cyan-600 transition-colors duration-300"
              >
                MEMES
              </button>
              <button
                onClick={() => scrollToSection("how-to-buy")}
                className="hover:text-cyan-600 transition-colors duration-300"
              >
                HOW TO BUY?
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-black shadow-lg"
          >
            <Menu className="w-5 h-5 text-black" />
          </button>

          <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-3 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-lg border-4 border-black shadow-lg transform hover:scale-105 transition-all duration-300">
            BUY $TISM
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-white/95 backdrop-blur-sm rounded-2xl border-4 border-black shadow-lg mx-2">
            <div
              className="flex flex-col p-4 gap-4 font-bold text-black text-lg"
              style={{ fontFamily: "Bungee, cursive" }}
            >
              <button
                onClick={() => scrollToSection("home")}
                className="text-left hover:text-cyan-600 transition-colors duration-300 py-2"
              >
                HOME
              </button>
              <button
                onClick={() => scrollToSection("tokenomics")}
                className="text-left hover:text-cyan-600 transition-colors duration-300 py-2"
              >
                TOKENOMICS
              </button>
              <button
                onClick={() => scrollToSection("memes")}
                className="text-left hover:text-cyan-600 transition-colors duration-300 py-2"
              >
                MEMES
              </button>
              <button
                onClick={() => scrollToSection("how-to-buy")}
                className="text-left hover:text-cyan-600 transition-colors duration-300 py-2"
              >
                HOW TO BUY?
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center pt-20 sm:pt-24 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between relative z-10 gap-8 lg:gap-0">
          <div className="flex-1 animate-fade-in-left order-2 lg:order-1">
            <Image
              src="/tism-mascot.png"
              alt="TISM Mascot Character"
              width={400}
              height={400}
              className="w-full max-w-xs sm:max-w-md mx-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="flex-1 text-center animate-fade-in-right order-1 lg:order-2">
            <h1
              className="text-4xl sm:text-6xl lg:text-8xl font-black text-white mb-4 drop-shadow-lg transform hover:scale-105 transition-transform duration-500"
              style={{
                textShadow: "4px 4px 0px #000, -4px -4px 0px #000, 4px -4px 0px #000, -4px 4px 0px #000",
                fontFamily: "Bungee, cursive",
              }}
            >
              TISM
            </h1>
            <p
              className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-8"
              style={{ fontFamily: "Bungee, cursive" }}
            >
              TISM ON BASE
              <br />
              THE ALPHA MEME TOKEN OF BASE CHAIN.
            </p>

            <div className="flex justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
              {[
                { icon: "/x-logo.webp", alt: "X (Twitter)" },
                { icon: "/telegram-logo.webp", alt: "Telegram" },
                { icon: "/dexscreener-logo.webp", alt: "DexScreener" },
                { icon: "/ape-logo.jpeg", alt: "Ape Platform" },
              ].map((social, index) => (
                <div
                  key={index}
                  className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-500 rounded-full flex items-center justify-center border-2 sm:border-4 border-black shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer animate-bounce p-1 sm:p-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Image
                    src={social.icon || "/placeholder.svg"}
                    alt={social.alt}
                    width={24}
                    height={24}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>

            <div className="text-center animate-pulse">
              <div className="inline-flex flex-col items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center border-2 sm:border-4 border-black mb-2 transform hover:scale-110 transition-transform duration-300">
                  <span className="font-bold text-black text-sm sm:text-base">0</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-black mb-2" style={{ fontFamily: "Bungee, cursive" }}>
                  SCROLL FOR MORE
                </p>
                <ChevronDown className="w-4 h-4 sm:w-6 sm:h-6 text-black animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        data-animate="about"
        className="py-12 sm:py-20 relative"
        style={{
          backgroundImage: "url('/tism-background.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
            <div className={`flex-1 ${getAnimationClass("about")}`}>
              <h2
                className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-6 lg:mb-8"
                style={{
                  textShadow: "4px 4px 0px #000",
                  fontFamily: "Bungee, cursive",
                }}
              >
                ABOUT
              </h2>

              <div className="space-y-4 lg:space-y-6 text-sm sm:text-base lg:text-lg font-bold text-white leading-relaxed">
                <p
                  className={`${getAnimationClass("about", 200)}`}
                  style={{ fontFamily: "Bungee, cursive", textShadow: "2px 2px 0px #000" }}
                >
                  TISM, THE <span className="text-orange-400">BLUE CHAMPION</span> ON THE BASE BLOCKCHAIN. THIS ADORABLE
                  BLUE CHARACTER REPRESENTS THE SPIRIT OF COMMUNITY AND THE POWER OF MEMES IN THE CRYPTO SPACE. WITH ITS
                  CHEERFUL PRESENCE AND UPLIFTING ENERGY, TISM BRINGS JOY AND EXCITEMENT TO THE BASE NETWORK.
                </p>

                <p
                  className={`${getAnimationClass("about", 400)}`}
                  style={{ fontFamily: "Bungee, cursive", textShadow: "2px 2px 0px #000" }}
                >
                  WHEREVER THE COMMUNITY GOES, TISM FOLLOWS, CREATING WAVES OF ENTHUSIASM AND BRINGING PEOPLE TOGETHER
                  THROUGH THE POWER OF SHARED HUMOR AND BLOCKCHAIN INNOVATION.
                </p>

                <p
                  className={`${getAnimationClass("about", 600)}`}
                  style={{ fontFamily: "Bungee, cursive", textShadow: "2px 2px 0px #000" }}
                >
                  TOGETHER, <span className="text-orange-400">THE TISM COMMUNITY</span> SHOWS THAT IN THE WORLD OF
                  BLOCKCHAIN, EVEN A MEME TOKEN CAN BRING REAL VALUE AND CONNECTION TO THE COMMUNITY.
                </p>
              </div>
            </div>

            <div className={`flex-1 flex justify-center ${getAnimationClass("about", 300)}`}>
              <Image
                src="/tism-clock.png"
                alt="TISM Character on Clock"
                width={300}
                height={300}
                className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 object-contain transform hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section
        id="tokenomics"
        data-animate="tokenomics"
        className="py-12 sm:py-20 relative"
        style={{
          backgroundImage: "url('/tism-background.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <p
            className={`text-center text-sm sm:text-base lg:text-lg font-bold text-white mb-8 lg:mb-12 ${getAnimationClass("tokenomics")}`}
            style={{ fontFamily: "Bungee, cursive", textShadow: "2px 2px 0px #000" }}
          >
            TOGETHER, <span className="text-orange-400">THE TISM COMMUNITY</span> SHOWS THAT IN THE WORLD OF BLOCKCHAIN,
            EVEN A MEME TOKEN CAN BRING REAL VALUE AND CONNECTION TO THE COMMUNITY.
          </p>

          <Card
            className={`bg-gradient-to-br from-cyan-300/90 to-cyan-400/90 border-4 sm:border-8 border-black rounded-2xl sm:rounded-3xl shadow-2xl max-w-6xl mx-auto backdrop-blur-sm transform hover:scale-105 transition-all duration-500 ${getAnimationClass("tokenomics", 200)}`}
          >
            <CardContent className="p-6 sm:p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex-1 w-full">
                  <h2
                    className={`text-3xl sm:text-4xl lg:text-6xl font-black text-black mb-8 lg:mb-12 text-center lg:text-left ${getAnimationClass("tokenomics", 300)}`}
                    style={{
                      textShadow: "3px 3px 0px #fff",
                      fontFamily: "Bungee, cursive",
                    }}
                  >
                    TOKENOMICS
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
                    {[
                      { label: "SUPPLY", value: "1B" },
                      { label: "TAXES", value: "0%" },
                      { label: "LIQUIDITY", value: "BURNT" },
                    ].map((item, index) => (
                      <Card
                        key={item.label}
                        className={`bg-white/95 border-2 sm:border-4 border-black rounded-xl sm:rounded-2xl shadow-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300 ${getAnimationClass("tokenomics", 400 + index * 100)}`}
                      >
                        <CardContent className="p-4 sm:p-6 text-center">
                          <p
                            className="font-bold text-black text-xs sm:text-sm mb-2"
                            style={{ fontFamily: "Bungee, cursive" }}
                          >
                            {item.label}
                          </p>
                          <p
                            className="font-black text-black text-lg sm:text-xl"
                            style={{ fontFamily: "Bungee, cursive" }}
                          >
                            {item.value}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card
                    className={`bg-white/95 border-2 sm:border-4 border-black rounded-xl sm:rounded-2xl shadow-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300 ${getAnimationClass("tokenomics", 700)}`}
                  >
                    <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <p className="font-mono text-black text-xs sm:text-sm break-all">{contractAddress}</p>
                      <Button
                        onClick={copyToClipboard}
                        disabled={contractAddress === "COMING SOON"}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-3 py-2 sm:px-4 sm:py-2 rounded-lg border-2 border-black transform hover:scale-105 transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {contractAddress === "COMING SOON" ? "SOON" : copiedAddress ? "COPIED!" : "COPY"}
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className={`flex-1 flex justify-center ${getAnimationClass("tokenomics", 500)}`}>
                  <Image
                    src="/tism-tokenomics-new.jpeg"
                    alt="TISM Character in Stone Spiral Tunnel"
                    width={320}
                    height={320}
                    className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-contain transform hover:scale-105 transition-transform duration-500 drop-shadow-2xl rounded-2xl sm:rounded-3xl"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How to Buy Section */}
      <section
        id="how-to-buy"
        data-animate="how-to-buy"
        className="py-12 sm:py-20 relative"
        style={{
          backgroundImage: "url('/tism-background.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2
            className={`text-3xl sm:text-4xl lg:text-6xl font-black text-white text-center mb-12 lg:mb-16 ${getAnimationClass("how-to-buy")}`}
            style={{
              textShadow: "4px 4px 0px #000",
              fontFamily: "Bungee, cursive",
            }}
          >
            HOW TO BUY?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {[
              "DOWNLOAD THE METAMASK EXTENSION FROM THE OFFICIAL WEBSITE AND INSTALL IT IN YOUR BROWSER. FUND IT BY TRANSFERRING BASE-D ETHEREUM FROM AN EXCHANGE OR ALTERNATIVE ON-RAMP AND SWAP IT TO BASE CHAIN.",
              "GO TO UNISWAP'S WEBSITE AND CONNECT YOUR METAMASK WALLET.",
              'TO SWAP BASE FOR $TISM, SELECT BASE IN THE "FROM" FIELD AND CHOOSE $TISM IN THE "TO" FIELD USING OUR CONTRACT ADDRESS. ENTER THE AMOUNT OF TOKENS YOU WANT & PRESS SWAP.',
              'VERIFY YOUR TRANSACTION STATUS IN METAMASK UNDER THE "ACTIVITY" TAB OR ON BASESCAN USING YOUR BASE ADDRESS. YOU IMPORT THE TOKEN TO YOUR METAMASK BY PASTING IN THE CONTRACT ADDRESS "CA".',
            ].map((text, index) => (
              <Card
                key={index}
                className={`bg-white/95 border-4 sm:border-8 border-black rounded-2xl sm:rounded-3xl shadow-2xl backdrop-blur-sm transform hover:scale-105 transition-all duration-500 ${getAnimationClass("how-to-buy", 200 + index * 150)}`}
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-cyan-400 rounded-full flex items-center justify-center border-2 sm:border-4 border-black shadow-lg flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
                      <span className="text-lg sm:text-2xl font-black text-black">{index + 1}</span>
                    </div>
                    <div>
                      <p
                        className="font-bold text-black text-sm sm:text-base lg:text-lg leading-tight"
                        style={{ fontFamily: "Bungee, cursive" }}
                      >
                        {text.includes("UNISWAP") ? (
                          <>
                            GO TO <span className="text-blue-500 underline">UNISWAP'S</span> WEBSITE AND CONNECT YOUR
                            METAMASK WALLET.
                          </>
                        ) : (
                          text
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Memes Section */}
      <section
        id="memes"
        data-animate="memes"
        className="py-12 sm:py-20 relative overflow-hidden"
        style={{
          backgroundImage: "url('/tism-background.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2
            className={`text-3xl sm:text-4xl lg:text-6xl font-black text-white text-center mb-12 lg:mb-16 ${getAnimationClass("memes")}`}
            style={{
              textShadow: "4px 4px 0px #000",
              fontFamily: "Bungee, cursive",
            }}
          >
            MEMES
          </h2>

          {/* Top Row - Left to Right */}
          <div className="mb-6 overflow-hidden">
            <div className="flex gap-4 animate-scroll-left-to-right">
              {[
                { src: "/meme-1.jpeg", alt: "TISM Dab Pose" },
                { src: "/meme-2.jpeg", alt: "TISM in Car Seat" },
                { src: "/meme-3.jpeg", alt: "TISM Warrior Knight" },
                { src: "/meme-4.jpeg", alt: "TISM in Hands" },
                { src: "/meme-5.jpeg", alt: "TISM on Roller Coaster" },
                { src: "/meme-6.jpeg", alt: "TISM in Meadow" },
                // Duplicate for seamless loop
                { src: "/meme-1.jpeg", alt: "TISM Dab Pose" },
                { src: "/meme-2.jpeg", alt: "TISM in Car Seat" },
                { src: "/meme-3.jpeg", alt: "TISM Warrior Knight" },
                { src: "/meme-4.jpeg", alt: "TISM in Hands" },
                { src: "/meme-5.jpeg", alt: "TISM on Roller Coaster" },
                { src: "/meme-6.jpeg", alt: "TISM in Meadow" },
              ].map((meme, i) => (
                <Card
                  key={i}
                  className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 border-2 sm:border-4 border-black rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-all duration-500 bg-white/20 backdrop-blur-sm"
                >
                  <CardContent className="p-0 h-full">
                    <Image
                      src={meme.src || "/placeholder.svg"}
                      alt={meme.alt}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Bottom Row - Right to Left */}
          <div className="overflow-hidden">
            <div className="flex gap-4 animate-scroll-right-to-left">
              {[
                { src: "/meme-7.jpeg", alt: "TISM in Box" },
                { src: "/meme-8.jpeg", alt: "TISM Claw Machine" },
                { src: "/meme-9.jpeg", alt: "TISM with Money" },
                { src: "/meme-10.jpeg", alt: "TISM To The Moon" },
                { src: "/meme-11.jpeg", alt: "TISM I Luv You" },
                { src: "/meme-12.jpeg", alt: "TISM Surfing" },
                // Duplicate for seamless loop
                { src: "/meme-7.jpeg", alt: "TISM in Box" },
                { src: "/meme-8.jpeg", alt: "TISM Claw Machine" },
                { src: "/meme-9.jpeg", alt: "TISM with Money" },
                { src: "/meme-10.jpeg", alt: "TISM To The Moon" },
                { src: "/meme-11.jpeg", alt: "TISM I Luv You" },
                { src: "/meme-12.jpeg", alt: "TISM Surfing" },
              ].map((meme, i) => (
                <Card
                  key={i}
                  className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 border-2 sm:border-4 border-black rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-all duration-500 bg-white/20 backdrop-blur-sm"
                >
                  <CardContent className="p-0 h-full">
                    <Image
                      src={meme.src || "/placeholder.svg"}
                      alt={meme.alt}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 sm:py-12 relative"
        style={{
          backgroundImage: "url('/tism-background.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/80 to-teal-500/80 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 sm:gap-4 transform hover:scale-105 transition-transform duration-300">
              <Image
                src="/tism-footer-logo.jpeg"
                alt="TISM Footer Logo"
                width={64}
                height={64}
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-lg"
              />
              <div className="text-center sm:text-left">
                <p
                  className="font-bold text-white text-base sm:text-lg"
                  style={{ fontFamily: "Bungee, cursive", textShadow: "2px 2px 0px #000" }}
                >
                  © 2025 TISM TOKEN
                </p>
                <p
                  className="font-bold text-white text-xs sm:text-sm opacity-90"
                  style={{ fontFamily: "Bungee, cursive", textShadow: "1px 1px 0px #000" }}
                >
                  ALL RIGHTS RESERVED
                </p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              {[
                { icon: "/x-logo.webp", alt: "X (Twitter)" },
                { icon: "/telegram-logo.webp", alt: "Telegram" },
                { icon: "/dexscreener-logo.webp", alt: "DexScreener" },
                { icon: "/ape-logo.jpeg", alt: "Ape Platform" },
              ].map((social, index) => (
                <div
                  key={index}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-full flex items-center justify-center border-2 sm:border-4 border-black shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer p-1 sm:p-2"
                >
                  <Image
                    src={social.icon || "/placeholder.svg"}
                    alt={social.alt}
                    width={24}
                    height={24}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>

            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-full text-lg sm:text-xl border-4 border-black shadow-lg transform hover:scale-105 transition-all duration-300">
              BUY $TISM
            </Button>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scroll-left-to-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        @keyframes scroll-right-to-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-fade-in-left {
          animation: fade-in-left 1s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 1s ease-out;
        }

        .animate-scroll-left-to-right {
          animation: scroll-left-to-right 30s linear infinite;
        }

        .animate-scroll-right-to-left {
          animation: scroll-right-to-left 30s linear infinite;
        }

        .delay-200 {
          transition-delay: 200ms;
        }

        .delay-300 {
          transition-delay: 300ms;
        }

        .delay-400 {
          transition-delay: 400ms;
        }

        .delay-500 {
          transition-delay: 500ms;
        }

        .delay-600 {
          transition-delay: 600ms;
        }

        .delay-700 {
          transition-delay: 700ms;
        }
      `}</style>
    </div>
  )
}
