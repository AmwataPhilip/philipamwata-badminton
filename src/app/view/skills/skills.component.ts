import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
})
export class SkillsComponent implements OnInit {
  // Technical skills with ratings (out of 10)
  technicalSkills = [
    {
      name: 'Singles Play',
      rating: 9,
      description:
        'Specializing in aggressive singles play with tactical precision.',
    },
    {
      name: 'Smash Power',
      rating: 10,
      description:
        'Exceptional smash power that puts pressure on opponents and creates winning opportunities.',
    },
    {
      name: 'Court Coverage',
      rating: 9,
      description:
        'Superior speed and mobility to cover all areas of the court efficiently.',
    },
    {
      name: 'Jumping Ability',
      rating: 9,
      description:
        'High vertical jumping ability for offensive smashes and defensive blocks.',
    },
    {
      name: 'Footwork',
      rating: 8,
      description:
        'Quick, precise footwork that enables efficient court coverage and positioning.',
    },
    {
      name: 'Net Play',
      rating: 7,
      description:
        'Controlled net play with deceptive shots to disrupt opponent rhythm.',
    },
    {
      name: 'Service',
      rating: 8,
      description:
        'Strategic serving with variation in placement, speed, and trajectory.',
    },
    {
      name: 'Defense',
      rating: 7,
      description: 'Solid defensive capabilities against powerful attacks.',
    },
  ];

  // Other skills relevant to badminton
  otherSkills = [
    {
      name: 'Game Analysis',
      description:
        'Ability to analyze opponent weaknesses and adapt strategy accordingly.',
    },
    {
      name: 'Physical Conditioning',
      description:
        'Rigorous training regimen focused on endurance, speed, and power.',
    },
    {
      name: 'Mental Toughness',
      description:
        'Strong focus and resilience under pressure in competitive situations.',
    },
    {
      name: 'Match Temperament',
      description:
        'Balanced emotional control that maintains performance during critical points.',
    },
    {
      name: 'Coaching & Mentoring',
      description:
        'Experience mentoring younger players and sharing technical knowledge.',
    },
    {
      name: 'Languages',
      description:
        'Communication in multiple languages (English, Swahili, basic German and Korean).',
    },
  ];

  // Equipment information
  equipment = {
    rackets: '3 Yonex Rackets (professional grade)',
    shoes: 'Yonex Power Cushion Badminton Shoes',
    bag: 'Professional Wilson Badminton Bag',
    kit: 'Full competition kit ready for club colors',
  };

  ngOnInit() {
    this.initAnimations();
  }

  initAnimations() {
    // Animate skill bars
    gsap.from('.skill-bar-fill', {
      width: 0,
      duration: 1.2,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '#skills',
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });

    // Animate other skills cards
    gsap.from('.other-skill-card', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: '.other-skills-section',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Animate equipment section
    gsap.from('.equipment-item', {
      x: -30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.equipment-section',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  // Helper function to get the CSS width based on rating
  getSkillWidth(rating: number): string {
    return `${rating * 10}%`;
  }

  // Helper function to get the appropriate color class based on rating
  getColorClass(rating: number): string {
    if (rating >= 9) return 'bg-primary';
    if (rating >= 7) return 'bg-blue-500';
    return 'bg-blue-300';
  }
}
