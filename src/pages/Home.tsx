import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Sparkles, Zap, Shield, Clock, MessageSquare } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get instant AI responses powered by advanced language models",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your conversations are encrypted and never stored",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Always ready to help, any time of day or night",
    },
    {
      icon: MessageSquare,
      title: "Natural Conversations",
      description: "Chat naturally like you would with a human assistant",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Your Intelligent AI Assistant
              </h1>
              
              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-accent text-2xl">•</span>
                  <span>Instant answers to any question in seconds</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent text-2xl">•</span>
                  <span>Powered by advanced AI technology</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent text-2xl">•</span>
                  <span>Easy to use, no setup required</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent text-2xl">•</span>
                  <span>Perfect balance of speed and quality</span>
                </li>
              </ul>

              <div className="flex flex-wrap gap-4">
                <Link to="/chat">
                  <Button 
                    size="lg" 
                    className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 shadow-lg"
                  >
                    Start Chatting
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-white border-white hover:bg-white/10 text-lg px-8 py-6"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right Content - Visual */}
            <div className="relative animate-in fade-in slide-in-from-right duration-700">
              <div className="relative rounded-2xl bg-gradient-secondary p-8 shadow-2xl border border-border">
                <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-accent/20 blur-3xl"></div>
                <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-primary/20 blur-3xl"></div>
                
                <div className="relative space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">AI Assistant</div>
                      <div className="font-semibold text-foreground">Ready to help</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-primary/10 rounded-lg p-4 ml-auto max-w-[80%] border border-primary/20">
                      <p className="text-sm text-foreground">What can you help me with?</p>
                    </div>
                    <div className="bg-secondary rounded-lg p-4 max-w-[90%] border border-border">
                      <p className="text-sm text-foreground">
                        I can help with questions, brainstorming, writing, coding, research, and much more! What would you like to explore?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-background/30 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-in fade-in duration-700">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Our AI ChatBot</h2>
            <p className="text-xl text-white/80">Powerful features designed for seamless conversations</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border hover:border-primary transition-all hover:shadow-glow animate-in fade-in slide-in-from-bottom duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto text-center animate-in fade-in duration-700">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already experiencing the power of AI-assisted conversations
          </p>
          <Link to="/chat">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-12 py-6 shadow-lg"
            >
              Start Your First Chat
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 bg-background/30 backdrop-blur-sm">
        <div className="container mx-auto text-center text-white/60">
          <p>&copy; 2025 AI ChatBot. Powered by Lovable AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
