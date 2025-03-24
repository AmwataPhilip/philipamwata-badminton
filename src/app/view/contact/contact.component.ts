import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { Analytics, logEvent } from '@angular/fire/analytics';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiryType: 'club' | 'tournament' | 'coaching' | 'media' | 'other';
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  private fb = inject(FormBuilder);
  private functions = inject(Functions);
  private analytics = inject(Analytics);

  contactForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  errorMessage = '';

  // Social media links
  socialLinks = [
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/philipamwata',
      icon: 'linkedin',
    },
    { platform: 'Instagram', url: '#', icon: 'instagram' },
    { platform: 'Twitter', url: '#', icon: 'twitter' },
    { platform: 'YouTube', url: '#', icon: 'youtube' },
  ];

  // Inquiry types
  inquiryTypes = [
    { value: 'club', label: 'Club Opportunities' },
    { value: 'tournament', label: 'Tournament Invitation' },
    { value: 'coaching', label: 'Coaching Request' },
    { value: 'media', label: 'Media Inquiry' },
    { value: 'other', label: 'Other Inquiry' },
  ];

  ngOnInit() {
    this.initContactForm();
    this.initAnimations();
  }

  initContactForm() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      inquiryType: ['club', Validators.required],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
      agreeToTerms: [false, Validators.requiredTrue],
    });
  }

  initAnimations() {
    // Animate contact form entry
    gsap.from('.contact-form-container', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });

    // Animate contact details entry
    gsap.from('.contact-details', {
      x: -30,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });

    // Animate social links
    gsap.from('.social-link', {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.social-links',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  // Form field validation helpers
  get nameField() {
    return this.contactForm.get('name');
  }
  get emailField() {
    return this.contactForm.get('email');
  }
  get subjectField() {
    return this.contactForm.get('subject');
  }
  get messageField() {
    return this.contactForm.get('message');
  }
  get inquiryTypeField() {
    return this.contactForm.get('inquiryType');
  }
  get agreeToTermsField() {
    return this.contactForm.get('agreeToTerms');
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);

    if (!field) return '';

    if (field.errors?.['required']) {
      return 'This field is required';
    }

    if (field.errors?.['email']) {
      return 'Please enter a valid email address';
    }

    if (field.errors?.['minlength']) {
      return `Must be at least ${field.errors?.['minlength'].requiredLength} characters`;
    }

    return 'Invalid input';
  }

  async onSubmit() {
    if (this.contactForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.contactForm.controls).forEach((key) => {
        const control = this.contactForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    try {
      // In production, we would use Firebase Cloud Functions to send the email
      // const sendEmail = httpsCallable(this.functions, 'sendContactEmail');
      // await sendEmail(this.contactForm.value);

      // For development, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Log successful form submission
      logEvent(this.analytics, 'contact_form_submit', {
        inquiry_type: this.contactForm.value.inquiryType,
      });

      this.submitSuccess = true;
      this.contactForm.reset({
        inquiryType: 'club',
        agreeToTerms: false,
      });
    } catch (error) {
      this.submitError = true;
      this.errorMessage =
        'There was an error sending your message. Please try again later.';

      // Log form submission error
      logEvent(this.analytics, 'contact_form_error');
    } finally {
      this.isSubmitting = false;

      // Scroll to form top for user to see success/error message
      document
        .getElementById('contact')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Form reset handler
  resetForm() {
    this.contactForm.reset({
      inquiryType: 'club',
      agreeToTerms: false,
    });
    this.submitSuccess = false;
    this.submitError = false;
  }
}
