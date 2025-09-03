// TestimonialsSection.jsx
import {
    Briefcase,
    Edit,
    LogIn,
    LogOut,
    Quote,
    Send,
    Star,
    Trash2,
    User
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
    auth,
    db,
    onValue,
    provider,
    push,
    ref,
    remove,
    signInWithPopup,
    signOut,
    update
} from "../firebase";
import { useAuth } from "./AuthContext";

const COLORS = {
  marble: "#E7DFD6",
  bronze: "#B08B57", 
  slate: "#6B7785",
  ink: "#1F232B",
  darkBg: "#0A0B0D",
  darkCard: "#141518",
  peach: "#F1D6BF"
};

const TestimonialsSection = () => {
  const { currentUser, isAdmin } = useAuth();
  const [mouse, setMouse] = useState({ x: "50%", y: "50%" });
  const sectionRef = useRef(null);
  
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    occupation: "",
    company: "",
    rating: 5,
    comment: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const occupations = [
    "Select an occupation",
    "Business Owner",
    "Marketing Manager", 
    "Social Media Manager",
    "Content Creator",
    "Influencer",
    "Blogger",
    "YouTuber",
    "Entrepreneur",
    "Startup Founder",
    "Creative Director",
    "Brand Manager",
    "Digital Marketer",
    "E-commerce Owner",
    "Photographer",
    "Event Planner",
    "Restaurant Owner",
    "Fitness Coach",
    "Consultant",
    "Freelancer",
    "Student",
    "Other"
  ];

  const onMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouse({ x: `${x}%`, y: `${y}%` });
  };

  const getProfilePictureUrl = (email) => {
    if (!email) return null;
    const normalizedEmail = email.toLowerCase().trim();
    const hash = normalizedEmail.split("").reduce((acc, char) => {
      const code = char.charCodeAt(0);
      return (acc << 5) - acc + code;
    }, 0);
    return `https://www.gravatar.com/avatar/${Math.abs(hash)}?s=200&d=mp&r=pg`;
  };

  useEffect(() => {
    const testimonialsRef = ref(db, "testimonials");
    onValue(testimonialsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const result = Object.entries(data)
          .map(([id, value]) => ({ id, ...value }))
          .sort((a, b) => new Date(b.dateAndTime) - new Date(a.dateAndTime));
        setTestimonials(result);
      } else {
        setTestimonials([]);
      }
      setIsLoading(false);
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      setError("");
    } catch (error) {
      if (
        error.code === "auth/popup-closed-by-user" ||
        error.code === "auth/cancelled-popup-request"
      ) {
        setError("Login cancelled. Please try again.");
      } else {
        setError("Failed to login. Please try again.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setEditingId(null);
      setFormData({
        name: "",
        email: "",
        occupation: "",
        company: "",
        rating: 5,
        comment: ""
      });
    } catch (error) {
      setError("Failed to logout.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.occupation ||
      formData.occupation === "Select an occupation" ||
      !formData.company ||
      !formData.comment
    ) {
      setError("All fields are required.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const testimonialData = {
        name: formData.name,
        email: formData.email,
        occupation: formData.occupation,
        company: formData.company,
        rating: formData.rating,
        comment: formData.comment,
        dateAndTime: new Date().toISOString(),
        profilePictureUrl: getProfilePictureUrl(formData.email),
        userId: currentUser.uid,
        userDisplayName: currentUser.displayName,
        userPhotoURL: currentUser.photoURL
      };

      if (editingId) {
        await update(ref(db, `testimonials/${editingId}`), testimonialData);
        setSuccessMessage("Testimonial updated successfully!");
      } else {
        await push(ref(db, "testimonials"), testimonialData);
        setSuccessMessage("Thank you for your testimonial!");
      }

      setFormData({
        name: "",
        email: "",
        occupation: "",
        company: "",
        rating: 5,
        comment: ""
      });
      setEditingId(null);

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

    } catch (err) {
      console.error(err);
      setError("Something went wrong! Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (testimonial) => {
    setFormData({
      name: testimonial.name,
      email: testimonial.email,
      occupation: testimonial.occupation,
      company: testimonial.company,
      rating: testimonial.rating,
      comment: testimonial.comment
    });
    setEditingId(testimonial.id);
    setError("");
    setSuccessMessage("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await remove(ref(db, `testimonials/${id}`));
        setSuccessMessage("Testimonial deleted successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } catch (error) {
        setError("Failed to delete testimonial.");
      }
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-[#B08B57] text-[#B08B57]" : "text-[#E7DFD6]/30"
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0B0D]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B08B57]"></div>
      </div>
    );
  }

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative min-h-screen overflow-hidden text-[#E7DFD6] bg-[#0A0B0D]"
    >
      {/* Cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-700"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x} ${mouse.y}, rgba(176,139,87,0.14), transparent 55%)`
        }}
      />

      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 rounded-full px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] mb-6">
            <span className="inline-block w-2 h-2 rounded-full bg-[#B08B57]" />
            <span className="text-xs md:text-sm text-[#E7DFD6]/80 font-medium tracking-wide">
              What clients say about my work
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] relative mb-6">
            <span className="block overflow-hidden">
              <span className="block  text-transparent bg-clip-text bg-gradient-to-br from-[#E7DFD6] via-[#B08B57] to-[#6B7785]">
                Client Testimonials
              </span>
            </span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-[#B08B57] to-transparent animate-expand-width" />
          </h1>

          <p className="text-[#E7DFD6]/70 max-w-2xl mx-auto">
            Real feedback from clients who trusted me with their brand identity and design needs.
          </p>

          {/* Auth buttons */}
          <div className="mt-8 flex justify-center">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 text-sm text-[#E7DFD6]/80">
                  <img
                    src={currentUser.photoURL || getProfilePictureUrl(currentUser.email)}
                    alt="Profile"
                    className="w-8 h-8 rounded-full ring-2 ring-[#B08B57]/30"
                  />
                  <span>Welcome, {currentUser.displayName || currentUser.email}</span>
                  {isAdmin && <span className="text-[#B08B57] font-medium">(Admin)</span>}
                </div>
                <button
                  onClick={handleLogout}
                  className="group relative inline-flex items-center justify-center border-2 border-[#E7DFD6]/25 text-[#E7DFD6] px-4 py-2 rounded-full overflow-hidden transition-all duration-500 hover:border-[#B08B57] text-sm"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span className="relative z-10">Logout</span>
                  <div className="absolute inset-0 bg-[#B08B57]/15 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleGoogleLogin}
                className="group relative inline-flex items-center justify-center px-6 py-3 rounded-full text-[#0A0B0D] overflow-hidden"
                style={{
                  background: COLORS.bronze,
                  boxShadow: "0 16px 36px -16px rgba(176,139,87,.45)"
                }}
              >
                <LogIn className="h-4 w-4 mr-2" />
                <span className="relative z-10 text-sm font-medium">Login with Google to Share</span>
                <div className="absolute inset-0 -z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C89B67] to-[#D4A574] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -inset-8 bg-[#B08B57]/35 blur-2xl group-hover:blur-3xl transition-all duration-500" />
                </div>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Testimonial Form */}
          <div className="order-2 lg:order-1">
            <div className="rounded-2xl p-6 bg-white/[0.06] backdrop-blur-xl ring-1 ring-white/10 shadow-[0_20px_70px_-20px_rgba(0,0,0,0.6)]">
              <h2 className="text-2xl font-bold text-white mb-6">
                {currentUser
                  ? editingId
                    ? "Edit Your Testimonial"
                    : "Share Your Experience"
                  : "Login Required"}
              </h2>

              {successMessage && (
                <div className="bg-green-900/30 text-green-300 p-4 mb-6 rounded-xl border border-green-500/20 backdrop-blur-sm">
                  {successMessage}
                </div>
              )}

              {error && (
                <div className="bg-red-900/30 text-red-300 p-4 mb-6 rounded-xl border border-red-500/20 backdrop-blur-sm">
                  {error}
                </div>
              )}

              {currentUser ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#E7DFD6]/70 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full rounded-xl bg-[#0A0B0D]/50 ring-1 ring-white/10 px-4 py-3 outline-none text-[#E7DFD6] placeholder:text-[#E7DFD6]/35 focus:ring-[#B08B57]/40"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#E7DFD6]/70 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full rounded-xl bg-[#0A0B0D]/50 ring-1 ring-white/10 px-4 py-3 outline-none text-[#E7DFD6] placeholder:text-[#E7DFD6]/35 focus:ring-[#B08B57]/40"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#E7DFD6]/70 mb-2">
                        Occupation
                      </label>
                      <select
                        value={formData.occupation}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            occupation: e.target.value
                          })
                        }
                        className="w-full rounded-xl bg-[#0A0B0D]/50 ring-1 ring-white/10 px-4 py-3 outline-none text-[#E7DFD6] focus:ring-[#B08B57]/40"
                        required
                      >
                        {occupations.map((occ, i) => (
                          <option key={i} value={occ} className="bg-[#0A0B0D]">
                            {occ}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#E7DFD6]/70 mb-2">
                        Company/Institution
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className="w-full rounded-xl bg-[#0A0B0D]/50 ring-1 ring-white/10 px-4 py-3 outline-none text-[#E7DFD6] placeholder:text-[#E7DFD6]/35 focus:ring-[#B08B57]/40"
                        placeholder="Your company name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#E7DFD6]/70 mb-2">
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="transition-colors duration-200"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= formData.rating
                                ? "fill-[#B08B57] text-[#B08B57]"
                                : "text-[#E7DFD6]/30 hover:text-[#B08B57]/50"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-3 text-sm text-[#E7DFD6]/70 self-center">
                        {formData.rating} star{formData.rating !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#E7DFD6]/70 mb-2">
                      Your Testimonial
                    </label>
                    <textarea
                      rows="4"
                      value={formData.comment}
                      onChange={(e) =>
                        setFormData({ ...formData, comment: e.target.value })
                      }
                      className="w-full rounded-xl bg-[#0A0B0D]/50 ring-1 ring-white/10 px-4 py-3 outline-none text-[#E7DFD6] placeholder:text-[#E7DFD6]/35 focus:ring-[#B08B57]/40 resize-none"
                      placeholder="Share your experience working with me. What design services did you use? How was the process? What results did you achieve?"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative inline-flex items-center justify-center w-full px-6 py-4 rounded-xl text-[#0A0B0D] overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: isSubmitting ? '#888' : COLORS.bronze,
                      boxShadow: "0 16px 36px -16px rgba(176,139,87,.45)"
                    }}
                  >
                    <span className="relative z-10 font-medium flex items-center gap-3">
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#0A0B0D] border-t-transparent rounded-full animate-spin"></div>
                          {editingId ? "Updating..." : "Submitting..."}
                        </>
                      ) : (
                        <>
                          <span>{editingId ? "Update Testimonial" : "Share Testimonial"}</span>
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 -z-10">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#C89B67] to-[#D4A574] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setFormData({
                          name: "",
                          email: "",
                          occupation: "",
                          company: "",
                          rating: 5,
                          comment: ""
                        });
                      }}
                      className="w-full px-6 py-3 rounded-xl border-2 border-[#E7DFD6]/25 text-[#E7DFD6] hover:border-[#B08B57] transition-colors duration-300"
                    >
                      Cancel Edit
                    </button>
                  )}
                </form>
              ) : (
                <div className="text-center py-12">
                  <User className="w-16 h-16 text-[#E7DFD6]/30 mx-auto mb-4" />
                  <p className="text-[#E7DFD6]/70">
                    Please login with Google to share your testimonial and help others discover the quality of my design services.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Testimonials Display */}
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl font-bold text-white mb-6">
              Recent Testimonials ({testimonials.length})
            </h2>
            
            {testimonials.length > 0 ? (
              <div className="space-y-6 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="relative rounded-2xl p-6 bg-white/[0.06] backdrop-blur-xl ring-1 ring-white/10 shadow-[0_20px_70px_-20px_rgba(0,0,0,0.6)] hover:shadow-[0_30px_90px_-20px_rgba(0,0,0,0.7)] transition-all duration-500"
                  >
                    {/* Edit/Delete buttons */}
                    {(isAdmin || currentUser?.uid === testimonial.userId) && (
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button
                          onClick={() => handleEdit(testimonial)}
                          className="p-2 rounded-full bg-[#B08B57]/20 hover:bg-[#B08B57]/30 transition-colors duration-200"
                          title="Edit testimonial"
                        >
                          <Edit className="h-4 w-4 text-[#B08B57]" />
                        </button>
                        <button
                          onClick={() => handleDelete(testimonial.id)}
                          className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-colors duration-200"
                          title="Delete testimonial"
                        >
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </button>
                      </div>
                    )}

                    <Quote className="w-8 h-8 text-[#B08B57]/30 mb-4" />
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {renderStars(testimonial.rating)}
                      <span className="ml-2 text-sm text-[#E7DFD6]/60">
                        {testimonial.rating}/5
                      </span>
                    </div>

                    {/* Testimonial content */}
                    <p className="text-[#E7DFD6] leading-relaxed mb-6 text-sm">
                      "{testimonial.comment}"
                    </p>

                    {/* User info */}
                    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                      <div className="w-12 h-12 rounded-full bg-[#B08B57]/20 p-0.5 flex-shrink-0">
                        {testimonial.userPhotoURL || testimonial.profilePictureUrl ? (
                          <img
                            src={testimonial.userPhotoURL || testimonial.profilePictureUrl}
                            alt={`${testimonial.name}'s profile`}
                            className="w-full h-full rounded-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <div
                          className="w-full h-full rounded-full bg-[#B08B57]/30 flex items-center justify-center"
                          style={{
                            display: testimonial.userPhotoURL || testimonial.profilePictureUrl ? "none" : "flex"
                          }}
                        >
                          <User className="w-6 h-6 text-[#E7DFD6]" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-[#E7DFD6] truncate">
                          {testimonial.name}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-[#E7DFD6]/60">
                          <Briefcase className="w-3 h-3" />
                          <span className="truncate">
                            {testimonial.occupation} at {testimonial.company}
                          </span>
                        </div>
                        <p className="text-xs text-[#E7DFD6]/40 mt-1">
                          {new Date(testimonial.dateAndTime).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 rounded-2xl bg-white/[0.03] backdrop-blur-xl ring-1 ring-white/10">
                <Quote className="w-16 h-16 text-[#E7DFD6]/20 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#E7DFD6]/60 mb-2">
                  No testimonials yet
                </h3>
                <p className="text-[#E7DFD6]/40">
                  Be the first to share your experience working with me!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Local styles */}
      <style jsx>{`
        @keyframes slide-up { 
          from { transform: translateY(100%); } 
          to { transform: translateY(0); } 
        }
        @keyframes expand-width { 
          from { width: 0; } 
          to { width: 200px; } 
        }
        @keyframes grain {
          0%,100% { transform: translate(0,0); }
          10% { transform: translate(-5%,-10%); } 
          20% { transform: translate(-15%,5%); }
          30% { transform: translate(7%,-25%); } 
          40% { transform: translate(-5%,25%); }
          50% { transform: translate(-15%,10%); } 
          60% { transform: translate(15%,0%); }
          70% { transform: translate(0%,15%); } 
          80% { transform: translate(3%,25%); }
          90% { transform: translate(-10%,10%); }
        }
        
        .animate-slide-up { 
          animation: slide-up .8s cubic-bezier(0.16,1,0.3,1) forwards; 
        }
        .animate-expand-width { 
          animation: expand-width 1s cubic-bezier(0.16,1,0.3,1) .4s forwards; 
        }
        .animate-grain { 
          animation: grain 8s steps(10) infinite; 
        }
        
        .bg-noise { 
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); 
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(231, 223, 214, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(176, 139, 87, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(176, 139, 87, 0.7);
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;