import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Analytics, logEvent } from '@angular/fire/analytics';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  private analytics = inject(Analytics);

  currentYear = new Date().getFullYear();

  // Footer navigation links
  footerLinks = [
    { label: 'About', href: '#about', ariaLabel: 'Learn about Philip Amwata' },
    {
      label: 'Achievements',
      href: '#achievements',
      ariaLabel: "View Philip's badminton achievements",
    },
    {
      label: 'Skills',
      href: '#skills',
      ariaLabel: "Explore Philip's badminton skills",
    },
    {
      label: 'Gallery',
      href: '#gallery',
      ariaLabel: 'View photos and videos of Philip playing badminton',
    },
    {
      label: 'Blog',
      href: '#blog',
      ariaLabel: "Read Philip's badminton blog posts",
    },
    { label: 'Contact', href: '#contact', ariaLabel: 'Contact Philip Amwata' },
  ];

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

  ngOnInit() {
    this.initAnimations();
  }

  initAnimations() {
    gsap.from('.footer-content', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: 'footer',
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Log scroll to top event
    logEvent(this.analytics, 'scroll_to_top');
  }

  logFooterLinkClick(linkLabel: string) {
    logEvent(this.analytics, 'footer_link_click', {
      link_name: linkLabel,
    });
  }
}
