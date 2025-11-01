'use client'

import { useState, useEffect } from 'react'
import { Check, Lock, Truck, Shield } from 'lucide-react'

export default function Funnel() {
  const [email, setEmail] = useState('')
  const [step, setStep] = useState<'discount' | 'upsell' | 'complete'>('discount')
  const [discountApplied, setDiscountApplied] = useState(false)

  useEffect(() => {
    /** 
        very simply js to capture mouse position 
        and set variables to the % location. Everything else is css/svg.
    **/
    function moveBg(e: PointerEvent) {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        (e.target as HTMLElement).style.setProperty('--x', ((e.clientX - rect.x) / rect.width * 100).toString());
        (e.target as HTMLElement).style.setProperty('--y', ((e.clientY - rect.y) / rect.height * 100).toString());
    }
    document.querySelectorAll('.gooey-btn').forEach(button => {
      button.addEventListener('pointermove', moveBg as EventListener)
    });

    /** just some JS for the intro animation, nothing here is needed
    for the gooey interaction. **/
    let x: NodeJS.Timeout;
    function intro() {
        let i = 4; 
        x = setInterval(() => {
            document.querySelectorAll('.gooey-btn').forEach(button => {
              (button as HTMLElement).style.setProperty('--x', (Math.random() * 100).toString());
              (button as HTMLElement).style.setProperty('--y', (Math.random() * 100).toString());
            });
            i--;
            if (i === 0) {
                clearInterval(x);
            }
        }, 100);
    }
    
    function introTwo() {
        let i = 4; 
        x = setInterval(() => {
            document.querySelectorAll('.gooey-btn').forEach(button => {
              (button as HTMLElement).style.setProperty('--x', (Math.random() * 100).toString());
              (button as HTMLElement).style.setProperty('--y', (Math.random() * 100).toString());
            });
            i--;
            if (i === 0) {
                clearInterval(x);
            }
        }, 100);
    }
    
    function introThree() {
        let i = 4; 
        x = setInterval(() => {
            document.querySelectorAll('.gooey-btn').forEach(button => {
              (button as HTMLElement).style.setProperty('--x', (Math.random() * 100).toString());
              (button as HTMLElement).style.setProperty('--y', (Math.random() * 100).toString());
            });
            i--;
            if (i === 0) {
                clearInterval(x);
            }
        }, 100);
    }
    intro();
    introTwo();
    introThree();
    document.querySelectorAll('.gooey-btn').forEach(button => {
      button.addEventListener('pointerover', (e) => {
        clearInterval(x);
        (e.target as HTMLElement).style.setProperty( "--a", '' );
      });
    });

    return () => {
      document.querySelectorAll('.gooey-btn').forEach(button => {
        button.removeEventListener('pointermove', moveBg as EventListener)
        button.removeEventListener('pointerover', () => {})
      })
      if (x) clearInterval(x)
    }
  }, [])

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // In production, save to Supabase/Brevo
      console.log('Email saved:', email)
      setDiscountApplied(true)
      setTimeout(() => {
        setStep('upsell')
      }, 2000)
    }
  }

  const handleUpgrade = () => {
    setStep('complete')
    // Redirect to checkout with 3-bottle bundle
    console.log('Upgrading to 3-bottle bundle')
  }

  const handleContinue = () => {
    setStep('complete')
    // Redirect to checkout with original selection
    console.log('Continuing with original order')
  }

  return (
    <main 
      className="min-h-screen bg-white relative"
      style={{
        backgroundImage: 'url(/images/hero%20bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Content wrapper */}
      <div className="relative z-10">
      
      {/* Step 1: Discount Offer */}
      {step === 'discount' && (
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl p-8 text-center space-y-6">
              <div className="text-6xl mb-4">🎁</div>
              <h1 className="text-4xl font-medium text-text">
                Wait! Before you buy...
              </h1>
              <p className="text-2xl text-accent font-medium">
                Unlock 10% off your first order
              </p>
              <p className="text-lg text-text/80">
                Join our wellness community and receive exclusive discounts, health tips, and early access to new products.
              </p>

              <form onSubmit={handleEmailSubmit} className="space-y-4 pt-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-6 py-4 border border-border rounded-eubiosis text-lg focus:outline-none focus:border-accent bg-white/80 backdrop-blur-sm"
                />
                <button
                  type="submit"
                  className="btn w-full text-lg py-4"
                >
                  Get My Discount
                </button>
              </form>

              {discountApplied && (
                <div className="bg-accent/10 border border-accent rounded-eubiosis p-6 mt-6 animate-pulse backdrop-blur-sm">
                  <div className="flex items-center justify-center gap-2 text-accent font-medium text-lg">
                    <Check className="w-6 h-6" />
                    <span>Your discount has been applied!</span>
                  </div>
                  <p className="text-text/70 mt-2">Redirecting you to our special offer...</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Step 2: Upsell */}
      {step === 'upsell' && (
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl p-8 space-y-8">
              <div className="text-center space-y-4">
                <div className="text-5xl mb-4">💪</div>
                <h2 className="text-3xl font-medium text-text">
                  Most users feel full results after 30 days
                </h2>
                <p className="text-xl text-text/80">
                  Save 15% with our 3-bottle bundle and ensure you have enough for a complete transformation.
                </p>
              </div>

              {/* Comparison */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Original Order */}
                <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-eubiosis p-6 space-y-4">
                  <h3 className="text-xl font-medium text-text">Your Current Order</h3>
                  <div className="space-y-2">
                    <p className="text-text/70">1 Bottle (10-day supply)</p>
                    <p className="text-2xl font-medium text-text">R499</p>
                    <p className="text-sm text-text/50">10% discount applied</p>
                  </div>
                </div>

                {/* Upgraded Order */}
                <div className="bg-white/70 backdrop-blur-sm border-2 border-accent rounded-eubiosis p-6 space-y-4 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                    BEST VALUE
                  </div>
                  <h3 className="text-xl font-medium text-accent">Upgrade to 3-Bottle Bundle</h3>
                  <div className="space-y-2">
                    <p className="text-text/70">3 Bottles (30-day supply)</p>
                    <p className="text-2xl font-medium text-accent">R1249</p>
                    <p className="text-sm text-accent font-medium">Save 15% + Free Shipping</p>
                  </div>
                  <div className="pt-2 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-text/70">
                      <Check className="w-4 h-4 text-accent" />
                      <span>Complete 30-day transformation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text/70">
                      <Check className="w-4 h-4 text-accent" />
                      <span>Best price per bottle</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text/70">
                      <Check className="w-4 h-4 text-accent" />
                      <span>Free nationwide shipping</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-4">
                <button
                  onClick={handleUpgrade}
                  className="btn w-full text-lg py-4"
                >
                  Yes, Upgrade My Order
                </button>
                <button
                  onClick={handleContinue}
                  className="btn-secondary w-full text-lg py-4"
                >
                  No Thanks, Continue
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Step 3: Complete */}
      {step === 'complete' && (
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl p-8 text-center space-y-6">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-3xl font-medium text-text">
                Thank you for your order!
              </h2>
              <p className="text-lg text-text/80">
                You're one step closer to restoring your gut balance and renewing your vitality.
              </p>
              <div className="bg-accent/10 border border-accent rounded-eubiosis p-6 backdrop-blur-sm">
                <p className="text-accent font-medium">
                  Order confirmation has been sent to: {email}
                </p>
              </div>
              <p className="text-sm text-text/50">
                This is a demo. In production, this would redirect to a payment processor.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Trust Footer - Always Visible */}
      <section className="py-12 px-4 bg-white/70 backdrop-blur-sm border-t border-white/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-text">Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-text">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-text">100% Natural Formula</span>
            </div>
          </div>
        </div>
      </section>

      {/* SVG Filter for Gooey Buttons - Exact CodePen */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 1"></feFuncA>
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="5"></feGaussianBlur>
          <feComponentTransfer>
            <feFuncA type="table" tableValues="-5 11"></feFuncA>
          </feComponentTransfer>
        </filter>
      </svg>
      </div>
    </main>
  )
}
