import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface CommunityInitiative {
  title: string;
  description: string;
  location: 'Kenya' | 'Luxembourg' | 'Global';
  targetAudience: string;
  impact: string;
  imageUrl?: string;
  status: 'planned' | 'in-progress' | 'ongoing';
}

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './community.component.html',
})
export class CommunityComponent implements OnInit {
  // Community initiatives
  initiatives: CommunityInitiative[] = [
    {
      title: 'Youth Badminton Development Program',
      description:
        'A grassroots initiative to introduce badminton to young players in underserved communities, providing coaching, equipment, and competitive opportunities.',
      location: 'Kenya',
      targetAudience: 'Children aged 8-16',
      impact:
        'Increased participation in badminton among youth, creating pathways to national-level competition.',
      imageUrl: '/assets/images/placeholder-youth-program.jpg',
      status: 'in-progress',
    },
    {
      title: 'Luxembourg Badminton Integration Program',
      description:
        'A program designed to help international players integrate into the Luxembourg badminton scene, providing guidance on clubs, tournaments, and training opportunities.',
      location: 'Luxembourg',
      targetAudience: 'International players relocating to Luxembourg',
      impact:
        'Enhanced diversity and international presence in Luxembourg badminton.',
      imageUrl: '/assets/images/placeholder-luxembourg-program.jpg',
      status: 'planned',
    },
    {
      title: 'Badminton Coach Mentorship Network',
      description:
        'A platform connecting experienced badminton coaches with aspiring ones for knowledge sharing, skill development, and professional growth.',
      location: 'Global',
      targetAudience: 'New and experienced badminton coaches',
      impact:
        'Improved coaching standards and methodology sharing across borders.',
      imageUrl: '/assets/images/placeholder-coach-mentorship.jpg',
      status: 'planned',
    },
    {
      title: 'Community Badminton Tournaments',
      description:
        'Organizing accessible tournaments for players of all skill levels to foster community engagement and provide competitive experience.',
      location: 'Kenya',
      targetAudience: 'Players of all ages and skill levels',
      impact:
        'Increased competitive opportunities and community building through badminton.',
      imageUrl: '/assets/images/placeholder-community-tournament.jpg',
      status: 'ongoing',
    },
  ];

  // Volunteering opportunities
  volunteerOpportunities = [
    'Assistant coaching for youth programs',
    'Tournament organization and coordination',
    'Equipment donations for underprivileged players',
    'Digital content creation for badminton education',
    'Mentorship for aspiring competitive players',
  ];

  // Impact metrics
  impactMetrics = {
    playersReached: '200+',
    communitiesEngaged: '5',
    tournamentsOrganized: '3',
    equipmentDonated: '50+ rackets',
  };

  activeLocation: 'all' | 'Kenya' | 'Luxembourg' | 'Global' = 'all';

  ngOnInit() {
    this.initAnimations();
  }

  initAnimations() {
    // Animate section header
    gsap.from('.community-header', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: '#community',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    // Animate vision statement
    gsap.from('.vision-statement', {
      opacity: 0,
      scale: 0.95,
      duration: 1,
      delay: 0.3,
      scrollTrigger: {
        trigger: '#community',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    // Animate initiatives
    gsap.from('.initiative-card', {
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.initiatives-section',
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });

    // Animate impact metrics
    gsap.from('.metric-item', {
      x: -20,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      scrollTrigger: {
        trigger: '.impact-section',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }

  filterByLocation(location: 'all' | 'Kenya' | 'Luxembourg' | 'Global') {
    this.activeLocation = location;

    // Re-animate filtered initiatives
    setTimeout(() => {
      gsap.from('.initiative-card:not(.hidden)', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        clearProps: 'all',
      });
    }, 50);
  }

  shouldShowInitiative(initiative: CommunityInitiative): boolean {
    if (this.activeLocation === 'all') return true;
    return initiative.location === this.activeLocation;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'in-progress':
        return 'bg-blue-500';
      case 'ongoing':
        return 'bg-green-500';
      default:
        return 'bg-gray-400';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'in-progress':
        return 'In Progress';
      case 'ongoing':
        return 'Ongoing';
      default:
        return 'Planned';
    }
  }
}
