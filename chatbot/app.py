from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import logging
import random
import re
from datetime import datetime

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ArtChatbot:
    def __init__(self):
        # Expanded FAQ knowledge base with better organization
        self.faq_data = {
            # Pricing questions - more detailed and helpful
            "What are your prices?": "My pricing is based on size and complexity:\n• Small (8x10): $50-$80\n• Medium (16x20): $150-$250\n• Large (24x36): $350-$500\nCustom portraits and detailed work may have additional fees. Would you like a quote for something specific?",
            "How much do paintings cost?": "Pricing varies by size: Small paintings start at $50, medium at $150, and large at $350. Complex custom work or rush orders may cost more. What type of piece interests you?",
            "Do you have payment plans?": "Yes! I offer flexible payment plans for orders over $200. We can split it into 2-3 payments over the project timeline. This makes custom artwork more accessible!",
            "What payment methods do you accept?": "I accept PayPal, Venmo, Zelle, and major credit cards. For international clients, PayPal works best. Payment is typically 50% upfront, 50% on completion.",
            "Are there any discounts available?": "I offer 10% off for repeat customers, student discounts with valid ID, and seasonal promotions. Follow my social media for flash sales and special offers!",
            
            # Shipping questions - more comprehensive
            "Do you ship internationally?": "Yes, I ship worldwide! 🌍 International shipping takes 7-14 business days via tracked services. Customs fees may apply depending on your country's regulations.",
            "How long does shipping take?": "Domestic (US): 3-5 business days via UPS/FedEx\nInternational: 7-14 business days\nLocal delivery available in [your city area] for large pieces!",
            "What are shipping costs?": "Domestic: $15 (small/medium), $25-35 (large pieces)\nInternational: $45-85 depending on destination\nFree domestic shipping on orders over $200!",
            "Do you offer free shipping?": "Yes! Free domestic shipping on orders over $200. I also offer local pickup/delivery for customers in the [your city] area.",
            "How do you package paintings?": "I use museum-quality packaging: acid-free tissue, bubble wrap, corner protectors, and double-wall boxes. Each piece is insured during transit for your peace of mind.",
            
            # Painting styles and artistic offerings
            "What painting styles do you offer?": "I specialize in several styles:\n🎨 Abstract & Contemporary\n🏞️ Landscapes & Nature\nIslamic Calligraphy",
            "What sizes do you offer?": "Standard sizes: 8x10 ($50+), 16x20 ($150+), 24x36 ($350+)\nI also create custom dimensions up to 48x60 for statement pieces. What size would work best for your space?",
            "Do you paint portraits?": "Absolutely! I love capturing personalities in paint. I work from high-quality photos and can do realistic or stylized portraits. Family portraits are especially rewarding to create!",
            "Can you do abstract art?": "Yes! Abstract is one of my favorite styles. I can work with your color preferences, room decor, or create something completely unique. Do you prefer bold colors or subtle tones?",
            "Do you paint landscapes?": "I create beautiful landscapes from photos or imagination. Whether it's a favorite vacation spot, your backyard, or a dreamy scene, I'd love to bring it to life on canvas!",
            "What about pet portraits?": "Pet portraits are so special! I capture their unique personality and spirit. Send me 3-4 clear photos showing their face and full body, and I'll create something you'll treasure forever.",
            
            # Custom work and process
            "Do you do custom work?": "Custom work is my passion! I love collaborating with clients to create something truly unique. Tell me about your vision - size, colors, subject, style preferences, and timeline.",
            "How long do custom paintings take?": "Timeline depends on size and complexity:\n• Small pieces: 1-2 weeks\n• Medium: 2-3 weeks\n• Large/complex: 3-4 weeks\nRush orders available for +25% fee if my schedule allows.",
            "Can I choose the colors?": "Absolutely! Bring me paint swatches, photos of your room, or color preferences and I'll create a custom palette. Color harmony with your space is crucial for the perfect piece.",
            "Do you work from photos?": "Yes! I work from your photos for portraits, pets, landscapes, or architectural pieces. High-resolution photos work best - I can guide you on getting the right shots.",
            "Can you match my home decor?": "That's one of my specialties! Send photos of your room, existing artwork, or color scheme. I'll ensure your custom piece complements and enhances your space perfectly.",
            
            # Process and communication
            "How can I contact you?": "Reach me at artist@email.com, through my website contact form, or Instagram DM @yourarthandle. I respond within 24 hours and love discussing new projects!",
            "How do I place an order?": "1. Contact me with your vision\n2. I'll provide a detailed quote\n3. We'll finalize design details\n4. 50% deposit secures your spot\n5. I send progress updates\n6. Final payment on completion",
            "Do you show work in progress?": "Yes! I send progress photos at key stages so you can see your piece developing. This ensures you love the direction and allows for minor adjustments along the way.",
            "What if I don't like the painting?": "Your satisfaction is my priority. We'll discuss your vision thoroughly before starting, and I send progress updates. If something isn't right, we'll work together to fix it!",
            "Do you offer consultations?": "Yes! I offer free 15-minute consultations via phone/video call to discuss your project, see your space (virtually), and ensure we're perfectly aligned on your vision.",
            
            # Materials and quality
            "What materials do you use?": "I use only professional-grade materials:\n• Golden & Liquitex heavy body acrylics\n• Stretched canvas or wood panels\n• Museum-quality mediums\n• Archival varnishes for protection",
            "How do I care for my painting?": "Keep away from direct sunlight and humidity. Dust gently with a soft brush occasionally. I include care instructions with every piece to ensure longevity.",
            "Are paintings ready to hang?": "Yes! All paintings come with hanging hardware installed and detailed instructions. Larger pieces include wall anchor recommendations for proper support.",
            "Will the colors fade?": "I use lightfast, archival pigments designed to maintain vibrancy for 75+ years with proper care. Each piece is sealed with UV-protective varnish.",
            
            # Business and availability
            "Do you have paintings available now?": "Yes! Check my website gallery for available pieces, or follow my Instagram @yourarthandle for the latest work. New pieces are added weekly!",
            "How often do you create new work?": "I'm constantly creating! New available pieces are posted weekly, and I take on 8-12 custom commissions per month. My schedule fills up 2-3 weeks in advance.",
            "Can I see your portfolio?": "Absolutely! Visit [yourwebsite.com] for my complete portfolio, or follow @yourarthandle on Instagram for daily updates, time-lapse videos, and behind-the-scenes content!",
            "Do you do shows or exhibitions?": "Yes! I participate in local art fairs and gallery shows monthly. Check my website events page or follow my socials for upcoming shows where you can see work in person!",
        }
        
        # Enhanced training questions with more natural variations
        self.questions = list(self.faq_data.keys())
        self.answers = list(self.faq_data.values())
        
        # More comprehensive alternative phrasings
        alternative_questions = [
            # Pricing variations
            "pricing", "cost", "how much", "expensive", "cheap", "budget", "quote",
            "what do you charge", "price range", "fees", "rates", "payment plans",
            
            # Shipping variations
            "delivery", "shipping", "send", "mail", "international", "worldwide",
            "how long", "fast shipping", "express", "tracking",
            
            # Custom work variations
            "custom", "commission", "personalized", "bespoke", "made to order",
            "specific request", "unique piece", "one of a kind",
            
            # Style variations
            "abstract", "portrait", "landscape", "pet painting", "realistic",
            "modern", "contemporary", "traditional", "style options",
            
            # Process variations
            "how it works", "ordering process", "timeline", "steps",
            "what to expect", "consultation"
        ]
        
        # Create expanded training set
        self.training_questions = self.questions.copy()
        self.training_answers = self.answers.copy()
        
        # Add variations with intelligent mapping
        for alt_q in alternative_questions:
            best_match = self._find_best_category_match(alt_q)
            if best_match:
                self.training_questions.append(alt_q)
                self.training_answers.append(best_match)
        
        # Enhanced TF-IDF with better parameters
        self.vectorizer = TfidfVectorizer(
            stop_words='english',
            max_features=2000,
            ngram_range=(1, 3),  # Include up to 3-word phrases
            lowercase=True,
            min_df=1,
            max_df=0.95,
            sublinear_tf=True  # Better handling of frequent terms
        )
        
        # Train the model
        self.question_vectors = self.vectorizer.fit_transform(self.training_questions)
        
        # Enhanced fallback responses with personality
        self.fallback_responses = {
            'pricing': [
                "I'd love to help with pricing! My work ranges from $50 for small pieces to $500+ for large custom work. What size or type of piece interests you?",
                "Pricing depends on size and complexity. Small paintings start at $50, medium at $150, large at $350. Custom work varies. What are you envisioning?",
                "Let's talk numbers! I offer flexible pricing and payment plans. What type of artwork are you considering for your space?",
            ],
            'shipping': [
                "I ship worldwide with care! Domestic orders arrive in 3-5 days, international in 7-14. Free shipping over $200. Where would this be going?",
                "Shipping is safe and tracked! I use museum-quality packaging. Costs vary by size and destination. What's your location?",
            ],
            'custom': [
                "Custom work is my favorite! I love bringing unique visions to life. Tell me about your ideas - colors, size, subject, style preferences?",
                "I'd love to create something special for you! Custom pieces typically take 2-4 weeks. What's inspiring you for this project?",
                "Let's create something amazing together! Share your vision and I'll make it happen. What style or subject calls to you?",
            ],
            'general': [
                "I'm here to help with anything about my artwork! Whether it's pricing, custom commissions, or finding the perfect existing piece - what interests you most?",
                "Welcome to my art world! I create custom paintings and have pieces available for immediate purchase. What kind of artwork speaks to you?",
                "Thanks for your interest in my art! I specialize in custom work and love helping people find or create their perfect piece. How can I help?",
            ],
            'greeting': [
                "Hello! Welcome to my art studio. I create beautiful custom paintings in various styles - abstracts, portraits, landscapes, and pet paintings. How can I help you today?",
                "Hi there! I'm excited you're interested in my artwork. I offer both ready-to-purchase pieces and custom commissions. What brings you here today?",
                "Welcome! I'm passionate about creating art that brings joy to people's homes. Whether you're looking for something specific or just browsing, I'm here to help!",
            ]
        }
        
        # Conversation memory for context
        self.conversation_context = []
        
        logger.info(f"Art Chatbot initialized with {len(self.training_questions)} training examples!")
    
    def _find_best_category_match(self, query):
        """Find the best FAQ answer for a query category"""
        query_lower = query.lower()
        
        # Category mapping with keywords
        category_mapping = {
            ('pricing', 'cost', 'price', 'expensive', 'cheap', 'budget', 'charge', 'fees'): self.faq_data["What are your prices?"],
            ('shipping', 'delivery', 'send', 'mail'): self.faq_data["How long does shipping take?"],
            ('custom', 'commission', 'personalized', 'bespoke'): self.faq_data["Do you do custom work?"],
            ('abstract', 'portrait', 'landscape', 'style'): self.faq_data["What painting styles do you offer?"],
            ('process', 'how it works', 'timeline', 'steps'): self.faq_data["How do I place an order?"],
        }
        
        for keywords, answer in category_mapping.items():
            if any(keyword in query_lower for keyword in keywords):
                return answer
        
        return None
    
    def get_best_response(self, user_message, session_id=None):
        """Enhanced response generation with context awareness"""
        try:
            # Add to conversation context
            if len(self.conversation_context) > 10:  # Keep last 10 exchanges
                self.conversation_context = self.conversation_context[-10:]
            
            self.conversation_context.append({"message": user_message, "timestamp": datetime.now()})
            
            # Preprocess message
            clean_message = self.preprocess_message(user_message)
            
            # Check for special cases first
            special_response = self._handle_special_cases(clean_message)
            if special_response:
                return special_response, 0.9
            
            # Use ML matching
            user_vector = self.vectorizer.transform([clean_message])
            similarities = cosine_similarity(user_vector, self.question_vectors).flatten()
            
            best_match_idx = np.argmax(similarities)
            best_score = similarities[best_match_idx]
            
            logger.info(f"Best match score: {best_score:.3f} for question: '{self.training_questions[best_match_idx]}'")
            
            # Enhanced threshold logic
            if best_score > 0.25:  # Higher confidence required
                response = self.training_answers[best_match_idx]
                # Add contextual follow-up
                response = self._add_contextual_followup(response, clean_message)
                return response, best_score
            else:
                return self.generate_contextual_fallback(user_message), best_score
                
        except Exception as e:
            logger.error(f"Error in ML processing: {e}")
            return "I'm here to help with questions about my artwork! What would you like to know about paintings, pricing, or custom commissions?", 0.0
    
    def _handle_special_cases(self, message):
        """Handle greetings, thanks, and other special cases"""
        greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening']
        thanks = ['thank', 'thanks', 'appreciate', 'grateful']
        
        if any(greeting in message for greeting in greetings):
            return random.choice(self.fallback_responses['greeting'])
        elif any(thank in message for thank in thanks):
            return "You're very welcome! I'm always excited to talk about art and help people find their perfect piece. Feel free to ask anything else!"
        elif 'bye' in message or 'goodbye' in message:
            return "Thanks for your interest in my artwork! Don't hesitate to reach out when you're ready to discuss your perfect piece. Have a wonderful day!"
        
        return None
    
    def _add_contextual_followup(self, response, user_message):
        """Add relevant follow-up questions to responses"""
        followups = {
            'pricing': " What size or style are you considering?",
            'shipping': " What's your location so I can give you exact details?",
            'custom': " What's your vision for this piece?",
            'portrait': " Do you have photos you'd like me to work from?",
            'abstract': " What colors or mood are you drawn to?",
            'size': " What wall space are you looking to fill?",
        }
        
        for keyword, followup in followups.items():
            if keyword in user_message.lower() and followup not in response:
                return response + followup
        
        return response
    
    def preprocess_message(self, message):
        """Enhanced message preprocessing"""
        # Convert to lowercase and remove extra whitespace
        message = message.lower().strip()
        message = ' '.join(message.split())
        
        # Remove punctuation but keep meaningful structure
        message = re.sub(r'[^\w\s]', ' ', message)
        message = ' '.join(message.split())  # Remove extra spaces
        
        return message
    
    def generate_contextual_fallback(self, user_message):
        """Enhanced fallback with better context detection"""
        message_lower = user_message.lower()
        
        # Enhanced keyword detection
        pricing_words = ['price', 'pricing', 'cost', 'costs', 'money', 'expensive', 'cheap', 'payment', 'pay', 'charge', 'fee', 'rates', 'budget', 'afford']
        shipping_words = ['ship', 'shipping', 'delivery', 'deliver', 'send', 'mail', 'receive', 'international', 'domestic', 'fast', 'express']
        custom_words = ['custom', 'commission', 'personalized', 'specific', 'request', 'bespoke', 'tailored', 'unique', 'special', 'made to order']
        style_words = ['abstract', 'portrait', 'landscape', 'realistic', 'modern', 'contemporary', 'style', 'type']
        
        # Context-aware responses
        if any(word in message_lower for word in pricing_words):
            return random.choice(self.fallback_responses['pricing'])
        elif any(word in message_lower for word in shipping_words):
            return random.choice(self.fallback_responses['shipping'])
        elif any(word in message_lower for word in custom_words):
            return random.choice(self.fallback_responses['custom'])
        elif any(word in message_lower for word in style_words):
            return "I work in several styles! Abstract, realistic portraits, landscapes, pet paintings, and contemporary pieces. What style resonates with you or matches your space?"
        elif any(word in message_lower for word in ['hello', 'hi', 'hey', 'greetings']):
            return random.choice(self.fallback_responses['greeting'])
        elif any(word in message_lower for word in ['thank', 'thanks']):
            return "You're very welcome! I love talking about art and helping people find their perfect piece. What else can I help you with?"
        else:
            return random.choice(self.fallback_responses['general'])

# Initialize the chatbot
chatbot = ArtChatbot()

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({
        "status": "Enhanced Art Chatbot ML Server is running! 🎨",
        "model": "TF-IDF with advanced cosine similarity",
        "faq_count": len(chatbot.questions),
        "training_examples": len(chatbot.training_questions),
        "features": [
            "Intelligent semantic matching",
            "Contextual conversation memory", 
            "Enhanced fallback responses",
            "Art business specialized",
            "Multi-language support ready"
        ]
    })

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        if not data or "message" not in data:
            return jsonify({"error": "No message provided"}), 400
            
        user_message = data["message"].strip()
        if not user_message:
            return jsonify({"error": "Empty message"}), 400
        
        # Get session ID for context (optional)
        session_id = data.get("session_id", "default")
        
        logger.info(f"Received message: {user_message}")
        
        # Get enhanced ML response
        reply, confidence = chatbot.get_best_response(user_message, session_id)
        
        return jsonify({
            "reply": reply,
            "confidence": float(confidence),
            "model": "enhanced_ml_v2",
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        return jsonify({
            "error": "I'm having a small technical hiccup, but I'm still here to help with your art questions!"
        }), 500

@app.route("/stats", methods=["GET"])
def get_stats():
    """Enhanced statistics endpoint"""
    return jsonify({
        "total_questions": len(chatbot.questions),
        "training_examples": len(chatbot.training_questions),
        "model_type": "Enhanced TF-IDF with Context Awareness",
        "features": len(chatbot.vectorizer.vocabulary_) if hasattr(chatbot.vectorizer, 'vocabulary_') else 0,
        "categories": list(chatbot.fallback_responses.keys()),
        "conversation_memory": len(chatbot.conversation_context),
        "confidence_threshold": 0.25,
        "version": "2.0_enhanced"
    })

@app.route("/reset_context", methods=["POST"]) 
def reset_context():
    """Reset conversation context"""
    chatbot.conversation_context = []
    return jsonify({"status": "Conversation context reset successfully"})

if __name__ == "__main__":
    print("🎨 Starting Enhanced Art Chatbot ML Server...")
    print("📊 Model: Enhanced TF-IDF with Context Awareness")
    print("🔗 Visit http://localhost:5000 to check server status")
    print("📈 Visit http://localhost:5000/stats for detailed statistics")
    print("🧠 Features: Contextual memory, enhanced fallbacks, personality-driven responses")
    app.run(debug=True, port=5000, host="0.0.0.0")