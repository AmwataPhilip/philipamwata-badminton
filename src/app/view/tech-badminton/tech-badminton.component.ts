import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface TechInitiative {
  title: string;
  description: string;
  icon: string;
  status: 'planned' | 'in-progress' | 'completed';
}

@Component({
  selector: 'app-tech-badminton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech-badminton.component.html',
})
export class TechBadmintonComponent implements OnInit {
  // Tech-badminton integration initiatives
  techInitiatives: TechInitiative[] = [
    {
      title: 'Performance Analytics Platform',
      description:
        'A custom data analytics platform to track player metrics, match statistics, and performance indicators for targeted training improvements.',
      icon: 'analytics',
      status: 'in-progress',
    },
    {
      title: 'Training Video Analysis Tool',
      description:
        'AI-powered video analysis tool that provides insights on technique, movement patterns, and tactical decisions during matches.',
      icon: 'video',
      status: 'planned',
    },
    {
      title: 'Smart Badminton Training App',
      description:
        'Mobile application offering personalized training programs, technique tutorials, and progress tracking for players of all levels.',
      icon: 'mobile',
      status: 'planned',
    },
    {
      title: 'Community Badminton Platform',
      description:
        'Online platform connecting players, coaches, and clubs to share resources, organize events, and grow the badminton community.',
      icon: 'community',
      status: 'in-progress',
    },
    {
      title: 'Badminton Equipment Sensor',
      description:
        'IoT-enabled racket sensors that provide real-time feedback on swing speed, impact force, and stroke angles for technique refinement.',
      icon: 'sensor',
      status: 'planned',
    },
  ];

  // Tech skills relevant to badminton
  techSkills = [
    {
      category: 'Data Analysis',
      skills: [
        'Performance metrics tracking',
        'Match pattern analysis',
        'Opponent strategy profiling',
      ],
    },
    {
      category: 'Software Development',
      skills: [
        'Training application development',
        'Tournament management systems',
        'Player development platforms',
      ],
    },
    {
      category: 'Emerging Technologies',
      skills: [
        'AI/ML for technique analysis',
        'IoT for equipment optimization',
        'VR/AR training simulations',
      ],
    },
  ];

  ngOnInit() {
    this.initScrollAnimations();
  }

  initScrollAnimations() {
    // Animate the section title and description
    gsap.from('.tech-header-content', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '#tech-badminton',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    // Animate the tech initiatives cards
    gsap.from('.initiative-card', {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.initiatives-section',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Animate the skills lists
    gsap.from('.skill-category', {
      x: -30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.skills-section',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'in-progress':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      default:
        return 'bg-gray-400';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return 'Planned';
    }
  }
}
