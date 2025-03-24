import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Firestore, doc, updateDoc, increment } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import gsap from 'gsap';

interface NavLink {
  label: string;
  href: string;
  ariaLabel: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  isScrolled = false;
  isMenuOpen = false;

  // Using inject instead of constructor injection
  private firestore: Firestore = inject(Firestore);

  // Navigation links array
  navLinks: NavLink[] = [
    {
      label: 'Home',
      href: '#hero',
      ariaLabel: 'Go to homepage section',
    },
    {
      label: 'About',
      href: '#about',
      ariaLabel: 'Learn about Philip Amwata',
    },
    {
      label: 'Achievements',
      href: '#achievements',
      ariaLabel: "View Philip's badminton achievements",
    },
    {
      label: 'Skills',
      href: '#skills',
      ariaLabel: "See Philip's badminton skills",
    },
    {
      label: 'Blog',
      href: '#blog',
      ariaLabel: "Read Philip's latest blog posts",
    },
  ];

  ngOnInit(): void {
    // Check initial scroll position
    this.checkScroll();
  }

  ngAfterViewInit(): void {
    // Initialize animations after view is ready
    // this.initAnimations();
  }

  /**
   * Track scroll position to update navbar appearance
   */
  @HostListener('window:scroll')
  checkScroll(): void {
    // Update when scroll position is greater than 50px
    this.isScrolled = window.scrollY > 50;
  }

  /**
   * Initialize GSAP animations for navbar elements
   */
  initAnimations(): void {
    // Stagger animation for desktop nav links
    const desktopLinks = document.querySelectorAll('.desktop-nav-link');
    gsap.from(desktopLinks, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.3,
    });

    // Animate the brand logo
    const logo = document.querySelector('.flex-shrink-0 a');
    if (logo) {
      gsap.from(logo, {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: 'back.out(1.5)',
      });
    }
  }

  /**
   * Toggle mobile menu open/close state
   * Uses GSAP for smoother animation control
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;

    // Use GSAP to animate mobile menu items when opening
    if (this.isMenuOpen) {
      // Wait for the menu to be visible in the DOM before animating
      setTimeout(() => {
        const mobileLinks = document.querySelectorAll('#mobile-menu a');
        gsap.fromTo(
          mobileLinks,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: 'power1.out' }
        );
      }, 50);
    }
  }

  /**
   * Close mobile menu
   */
  closeMenu(): void {
    this.isMenuOpen = false;
  }

  /**
   * Track navigation link clicks for analytics
   * @param linkName Name of the clicked link
   */
  logNavClick(linkName: string): void {
    try {
      // Update click analytics in Firestore
      const analyticsRef = doc(this.firestore, 'analytics', 'navigation');
      updateDoc(analyticsRef, {
        [`clicks.${linkName.toLowerCase().replace(/\s+/g, '_')}`]: increment(1),
      });

      console.log(`Navigation click: ${linkName}`);
    } catch (error) {
      console.error('Error logging navigation click:', error);
    }
  }
}
