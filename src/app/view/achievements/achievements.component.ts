import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achievements.component.html',
})
export class AchievementsComponent implements OnInit {
  // Define achievements structure
  achievements = [
    {
      year: '2023',
      title: 'South Africa National Ranking',
      description:
        'Achieved 8th position in South Africa national badminton rankings.',
      icon: 'trophy',
    },
    {
      year: '2022',
      title: 'South Africa Internationals',
      description:
        'Reached Round of 16 in the prestigious South Africa International tournament.',
      icon: 'tournament',
    },
    {
      year: '2017-2020',
      title: 'University of Cape Town',
      description:
        'Represented UCT Badminton Club in intervarsity competitions.',
      icon: 'university',
    },
    {
      year: '2010',
      title: 'Kenya U19 National Team',
      description: 'Selected to represent Kenya in the Under-19 National Team.',
      icon: 'team',
    },
    {
      year: '2010',
      title: 'South Africa U19 Tournament',
      description:
        'Won Bronze Medal with Kenya U19 team at South Africa tournament.',
      icon: 'medal',
    },
  ];

  // Tournament results structure
  tournaments = [
    {
      year: '2022',
      name: 'South Africa Internationals',
      result: 'Round of 16',
      location: 'Johannesburg, South Africa',
    },
    {
      year: '2021',
      name: 'Western Province Championships',
      result: 'Quarter-finalist',
      location: 'Cape Town, South Africa',
    },
    {
      year: '2020',
      name: 'University Championships',
      result: 'Semi-finalist',
      location: 'Cape Town, South Africa',
    },
    {
      year: '2010',
      name: 'South Africa U19 Team Tournament',
      result: 'Bronze Medal',
      location: 'Pretoria, South Africa',
    },
  ];

  ngOnInit() {
    this.initScrollAnimations();
  }

  initScrollAnimations() {
    // Animate the achievement timeline
    gsap.from('.achievement-item', {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: '#achievements',
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });

    // Animate the tournament results
    gsap.from('.tournament-item', {
      opacity: 0,
      x: -50,
      stagger: 0.15,
      duration: 0.6,
      scrollTrigger: {
        trigger: '.tournaments-section',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }

  // Function to get the appropriate icon for each achievement
  getIconPath(iconName: string): string {
    // In a real implementation, this would return actual SVG paths
    // For now, we'll return a placeholder
    return iconName;
  }
}
