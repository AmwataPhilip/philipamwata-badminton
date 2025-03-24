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
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { Observable, map } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: string;
  type: 'image' | 'video' | 'youtube';
  url: string;
  thumbnail?: string;
  caption: string;
  date?: string;
  tags?: string[];
  safeUrl?: SafeResourceUrl;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {
  @ViewChild('galleryGrid', { static: false }) galleryGrid!: ElementRef;
  private firestore = inject(Firestore);
  private sanitizer = inject(DomSanitizer);
  private analytics = inject(Analytics);

  galleryItems$!: Observable<GalleryItem[]>;
  selectedItem: GalleryItem | null = null;
  isLightboxOpen = false;
  activeFilter = 'all';

  // Placeholder gallery items for development
  // These will be replaced with Firebase data in a production environment
  placeholderItems: GalleryItem[] = [
    {
      id: '1',
      type: 'image',
      url: '/assets/images/placeholder-match1.jpg',
      caption: 'South Africa Internationals 2022 - Singles Match',
      date: '2022-07-15',
      tags: ['tournament', 'singles'],
    },
    {
      id: '2',
      type: 'image',
      url: '/assets/images/placeholder-training.jpg',
      caption: 'Training session focusing on smash technique',
      date: '2023-02-10',
      tags: ['training', 'technique'],
    },
    {
      id: '3',
      type: 'youtube',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      caption: 'Match highlights from Western Province Championships',
      date: '2021-09-23',
      tags: ['tournament', 'highlights'],
    },
    {
      id: '4',
      type: 'image',
      url: '/assets/images/placeholder-match2.jpg',
      caption: 'University Championships semi-final match',
      date: '2020-11-05',
      tags: ['tournament', 'university'],
    },
    {
      id: '5',
      type: 'image',
      url: '/assets/images/placeholder-team.jpg',
      caption: 'With the Kenya U19 National Team',
      date: '2010-08-20',
      tags: ['team', 'national'],
    },
    {
      id: '6',
      type: 'youtube',
      url: 'https://www.youtube.com/embed/abc123',
      caption: 'Badminton skills demonstration and training tips',
      date: '2023-03-15',
      tags: ['training', 'skills'],
    },
  ];

  ngOnInit() {
    // In production, fetch actual gallery items from Firebase
    // this.fetchGalleryItems();

    // For development, use placeholder data
    this.processPlaceholderItems();

    // Initialize animations
    setTimeout(() => {
      this.initScrollAnimations();
    }, 500);
  }

  processPlaceholderItems() {
    // Process YouTube URLs to make them safe
    this.placeholderItems = this.placeholderItems.map((item) => {
      if (item.type === 'youtube') {
        return {
          ...item,
          safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(item.url),
        };
      }
      return item;
    });
  }

  fetchGalleryItems() {
    const galleryCollection = collection(this.firestore, 'gallery');

    this.galleryItems$ = collectionData(galleryCollection, {
      idField: 'id',
    }).pipe(
      map((items) => {
        return items.map((item: any) => {
          // Process YouTube URLs to make them safe
          if (item.type === 'youtube') {
            return {
              ...item,
              safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(item.url),
            };
          }
          return item;
        });
      })
    );
  }

  initScrollAnimations() {
    gsap.from('.gallery-item', {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#gallery',
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });
  }

  openLightbox(item: GalleryItem) {
    this.selectedItem = item;
    this.isLightboxOpen = true;
    document.body.classList.add('overflow-hidden');

    // Log gallery item view
    logEvent(this.analytics, 'gallery_item_view', {
      item_id: item.id,
      item_type: item.type,
    });
  }

  closeLightbox() {
    this.isLightboxOpen = false;
    document.body.classList.remove('overflow-hidden');
  }

  filterGallery(filter: string) {
    this.activeFilter = filter;

    // Log filter usage
    logEvent(this.analytics, 'gallery_filter', {
      filter_applied: filter,
    });

    // Re-trigger animations after filter change
    setTimeout(() => {
      gsap.from('.gallery-item:not(.hidden)', {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power1.out',
      });
    }, 50);
  }

  shouldShowItem(item: GalleryItem): boolean {
    if (this.activeFilter === 'all') return true;
    return item.tags?.includes(this.activeFilter) || false;
  }
}
