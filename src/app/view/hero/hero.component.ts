import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { Analytics, logEvent } from '@angular/fire/analytics';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit, AfterViewInit {
  @ViewChild('heroContent', { static: true }) heroContent!: ElementRef;
  private analytics = inject(Analytics);

  ngOnInit() {}

  ngAfterViewInit() {
    this.animateHeroContent();
  }

  animateHeroContent() {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    timeline
      .from('.hero-title', { y: 50, opacity: 0, duration: 1 })
      .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
      .from('.hero-description', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
      .from('.hero-cta', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6');
  }

  scrollToAbout() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });

      // Log event to Firebase Analytics
      logEvent(this.analytics, 'scroll_to_section', {
        section_name: 'about',
      });
    }
  }

  logCTAClick(ctaName: string) {
    logEvent(this.analytics, 'cta_click', {
      cta_name: ctaName,
    });
  }
}
