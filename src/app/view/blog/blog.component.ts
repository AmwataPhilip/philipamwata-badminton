import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Firestore,
  collection,
  collectionData,
  query,
  orderBy,
  limit,
} from '@angular/fire/firestore';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { Observable } from 'rxjs';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  imageUrl?: string;
  slug: string;
  category: string;
  readTime: number;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {
  private firestore = inject(Firestore);
  private analytics = inject(Analytics);

  blogPosts$!: Observable<BlogPost[]>;

  // Placeholder blog posts for development
  // These will be replaced with Firebase data in production
  placeholderPosts: BlogPost[] = [
    {
      id: '1',
      title: 'My Journey to South Africa Internationals 2022',
      excerpt:
        'Reflecting on the preparation, challenges, and lessons learned from competing in my first major international tournament.',
      date: '2022-08-10',
      author: 'Philip Amwata',
      imageUrl: '/assets/images/placeholder-blog1.jpg',
      slug: 'journey-to-south-africa-internationals',
      category: 'Tournaments',
      readTime: 5,
    },
    {
      id: '2',
      title: 'Training Techniques to Improve Your Smash Power',
      excerpt:
        'A detailed breakdown of the exercises and drills I use to develop the powerful smash that has become a key part of my game.',
      date: '2023-01-15',
      author: 'Philip Amwata',
      imageUrl: '/assets/images/placeholder-blog2.jpg',
      slug: 'improve-smash-power',
      category: 'Training',
      readTime: 7,
    },
    {
      id: '3',
      title: 'The Mental Side of Badminton: Focus Under Pressure',
      excerpt:
        'How I maintain concentration and calm during critical match points and high-pressure situations.',
      date: '2023-03-22',
      author: 'Philip Amwata',
      imageUrl: '/assets/images/placeholder-blog3.jpg',
      slug: 'mental-side-badminton',
      category: 'Mental Training',
      readTime: 6,
    },
    {
      id: '4',
      title: 'Badminton in Kenya: Nurturing the Next Generation',
      excerpt:
        "My vision for growing the sport in Kenya and the initiatives I'm planning to support young talent.",
      date: '2023-05-05',
      author: 'Philip Amwata',
      imageUrl: '/assets/images/placeholder-blog4.jpg',
      slug: 'badminton-in-kenya',
      category: 'Community',
      readTime: 4,
    },
  ];

  ngOnInit() {
    // In production, fetch actual blog posts from Firebase
    // this.fetchBlogPosts();

    // For development, use placeholder data

    // Initialize animations
    this.initScrollAnimations();
  }

  fetchBlogPosts() {
    const blogCollection = collection(this.firestore, 'blogPosts');
    const blogQuery = query(blogCollection, orderBy('date', 'desc'), limit(4));

    this.blogPosts$ = collectionData(blogQuery, {
      idField: 'id',
    }) as Observable<BlogPost[]>;
  }

  initScrollAnimations() {
    gsap.from('.blog-card', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#blog',
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });
  }

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  logBlogClick(postId: string, postTitle: string) {
    logEvent(this.analytics, 'blog_post_click', {
      post_id: postId,
      post_title: postTitle,
    });
  }
}
