import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { useState } from "react";

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.error("EmailJS configuration is missing. Please check your environment variables.");
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
        publicKey
      );
      
      toast.success("Message sent successfully! We'll get back to you shortly.");
      reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again later or contact us directly via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="pt-32 pb-20 bg-background border-b border-border">
        <div className="container px-4">
          <h1 className="font-display text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-6">
            Get In <span className="text-primary">Touch</span>
          </h1>
          <p className="font-mono text-muted-foreground text-xl max-w-3xl border-l-4 border-secondary pl-6">
            Ready to elevate your brand? Let's start a conversation.
          </p>
        </div>
      </section>

      <section className="py-24 bg-card min-h-screen">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-4xl font-bold uppercase tracking-tighter mb-8">
                Contact <span className="text-secondary">Info</span>
              </h2>
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase mb-1">Email</h3>
                    <p className="font-mono text-muted-foreground">sales@reeliq.ca</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase mb-1">Phone</h3>
                    <p className="font-mono text-muted-foreground">+1 (204) 905-2692</p>
                    <p className="font-mono text-muted-foreground">Mon-Fri, 9am - 5pm CST</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center border border-primary/20">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase mb-1">Studio</h3>
                    <p className="font-mono text-muted-foreground">Steinbach, Manitoba</p>
                    <p className="font-mono text-muted-foreground">Canada</p>
                  </div>
                </div>
              </div>

              <div className="p-8 border border-border bg-background relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-bl-full -mr-12 -mt-12"></div>
                <h3 className="font-display text-2xl font-bold uppercase mb-4">New Client Offer</h3>
                <p className="font-mono text-muted-foreground mb-6">
                  First time working with us? Ask about our introductory social media packages designed for startups and local businesses.
                </p>
                <div className="h-1 w-full bg-gradient-to-r from-primary to-secondary"></div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-background border border-border p-8 md:p-12 relative">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
              <h2 className="font-display text-3xl font-bold uppercase tracking-tighter mb-8">
                Send a <span className="text-primary">Message</span>
              </h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-xs uppercase tracking-widest font-bold text-muted-foreground">First Name</label>
                    <Input {...register("firstName", { required: true })} className="rounded-none border-border bg-card focus:border-primary h-12" placeholder="JANE" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-xs uppercase tracking-widest font-bold text-muted-foreground">Last Name</label>
                    <Input {...register("lastName", { required: true })} className="rounded-none border-border bg-card focus:border-primary h-12" placeholder="DOE" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase tracking-widest font-bold text-muted-foreground">Email Address</label>
                  <Input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} type="email" className="rounded-none border-border bg-card focus:border-primary h-12" placeholder="JANE@EXAMPLE.COM" />
                </div>
                
                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase tracking-widest font-bold text-muted-foreground">Subject</label>
                  <Input {...register("subject", { required: true })} className="rounded-none border-border bg-card focus:border-primary h-12" placeholder="PROJECT INQUIRY" />
                </div>
                
                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase tracking-widest font-bold text-muted-foreground">Message</label>
                  <Textarea {...register("message", { required: true })} className="rounded-none border-border bg-card focus:border-primary min-h-[150px] resize-none" placeholder="TELL US ABOUT YOUR PROJECT..." />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="w-full rounded-none font-bold uppercase tracking-widest text-lg h-14 hover:bg-secondary hover:text-secondary-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
