import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Analytics, logEvent } from '@angular/fire/analytics';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit {
  @ViewChild('aboutContent', { static: true }) aboutContent!: ElementRef;
  private analytics = inject(Analytics);

  // Information about Philip's background
  personalInfo = {
    fullName: 'Philip Amwata',
    age: 27,
    nationality: 'Kenyan',
    languages: [
      'English',
      'Swahili',
      'German (Limited)',
      'Korean (Elementary)',
    ],
    education: "Bachelor's in Computer Science, University of Cape Town",
    badmintonStartYear: 2009,
    currentClubs: 'Currently seeking opportunities with Luxembourg clubs',
    careerHighlights: [
      'Ranked 8th in South Africa (2023)',
      'Round of 16, South Africa Internationals (2022)',
      'Kenya National U19 Team Member',
      'Bronze Medal, South Africa U19 Team Tournament (2010)',
    ],
    badmintonPhilosophy:
      'I believe badminton is not just a sport but a means to develop discipline, strategic thinking, and cultural exchange. My approach combines technical precision with speed and power, focusing on singles competition where I can fully express my aggressive playing style.',
  };

  ngOnInit() {
    this.initScrollAnimations();
  }

  initScrollAnimations() {
    // Animate the about section when it comes into view
    gsap.from('.about-content', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Animate the profile image
    gsap.from('.profile-image', {
      opacity: 0,
      x: -50,
      duration: 1,
      scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }

  logResumeDownload() {
    logEvent(this.analytics, 'resume_download', {
      section: 'about',
    });
  }
}
