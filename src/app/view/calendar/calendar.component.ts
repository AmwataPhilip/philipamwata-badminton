import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Firestore,
  collection,
  collectionData,
  query,
  orderBy,
  where,
  Timestamp,
} from '@angular/fire/firestore';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { Observable } from 'rxjs';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: Date | Timestamp;
  endDate?: Date | Timestamp;
  location: string;
  eventType: 'tournament' | 'training' | 'community' | 'other';
  registrationUrl?: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit {
  private firestore = inject(Firestore);
  private analytics = inject(Analytics);

  calendarEvents$!: Observable<CalendarEvent[]>;
  activeFilter: 'all' | 'tournament' | 'training' | 'community' = 'all';

  // Placeholder events for development
  // These will be replaced with Firebase data in production
  placeholderEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'Luxembourg National Championships',
      description:
        'Participating in the singles division of the Luxembourg National Badminton Championships.',
      startDate: new Date('2025-05-15'),
      endDate: new Date('2025-05-17'),
      location: 'Luxembourg City, Luxembourg',
      eventType: 'tournament',
      registrationUrl: 'https://example.com/tournament-registration',
    },
    {
      id: '2',
      title: 'Public Training Session',
      description:
        'Open training session focusing on advanced singles tactics and footwork drills.',
      startDate: new Date('2025-04-23'),
      location: 'Nairobi, Kenya',
      eventType: 'training',
    },
    {
      id: '3',
      title: 'Youth Development Workshop',
      description:
        'Workshop for junior players and coaches focusing on technical fundamentals and training methodologies.',
      startDate: new Date('2025-04-10'),
      endDate: new Date('2025-04-11'),
      location: 'Nairobi, Kenya',
      eventType: 'community',
    },
    {
      id: '4',
      title: 'Benelux International',
      description:
        'International tournament featuring players from Belgium, Netherlands, and Luxembourg.',
      startDate: new Date('2025-06-12'),
      endDate: new Date('2025-06-14'),
      location: 'Brussels, Belgium',
      eventType: 'tournament',
      registrationUrl: 'https://example.com/benelux-registration',
    },
    {
      id: '5',
      title: 'Technical Training Camp',
      description:
        'Intensive training camp focused on advanced singles techniques and match strategy.',
      startDate: new Date('2025-05-05'),
      endDate: new Date('2025-05-07'),
      location: 'Luxembourg City, Luxembourg',
      eventType: 'training',
    },
  ];

  ngOnInit() {
    // In production, fetch actual events from Firebase
    // this.fetchCalendarEvents();

    // For development, sort placeholder events by date
    this.placeholderEvents.sort(
      (a, b) =>
        (a.startDate instanceof Date
          ? a.startDate
          : a.startDate.toDate()
        ).getTime() -
        (b.startDate instanceof Date
          ? b.startDate
          : b.startDate.toDate()
        ).getTime()
    );

    // Initialize animations
    this.initScrollAnimations();
  }

  fetchCalendarEvents() {
    const now = new Date();
    const eventsCollection = collection(this.firestore, 'calendarEvents');
    const eventsQuery = query(
      eventsCollection,
      where('startDate', '>=', now),
      orderBy('startDate', 'asc')
    );

    this.calendarEvents$ = collectionData(eventsQuery, {
      idField: 'id',
    }) as Observable<CalendarEvent[]>;
  }

  initScrollAnimations() {
    gsap.from('.calendar-header', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: '#calendar',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.event-card', {
      y: 20,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      scrollTrigger: {
        trigger: '.events-list',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }

  filterEvents(filter: 'all' | 'tournament' | 'training' | 'community') {
    this.activeFilter = filter;

    // Log filter usage
    logEvent(this.analytics, 'calendar_filter', {
      filter_applied: filter,
    });

    // Animate filtered events
    setTimeout(() => {
      gsap.from('.event-card:not(.hidden)', {
        y: 15,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power1.out',
        clearProps: 'all',
      });
    }, 50);
  }

  shouldShowEvent(event: CalendarEvent): boolean {
    if (this.activeFilter === 'all') return true;
    return event.eventType === this.activeFilter;
  }

  formatDate(dateObj: Date | Timestamp): string {
    let date: Date;

    if (dateObj instanceof Date) {
      date = dateObj;
    } else {
      // Convert Firestore Timestamp to Date if needed
      date = (dateObj as Timestamp).toDate();
    }

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  formatDateRange(
    startDate: Date | Timestamp,
    endDate?: Date | Timestamp
  ): string {
    if (!endDate) {
      return this.formatDate(startDate);
    }

    const start =
      startDate instanceof Date ? startDate : (startDate as Timestamp).toDate();
    const end =
      endDate instanceof Date ? endDate : (endDate as Timestamp).toDate();

    // If same day event
    if (start.toDateString() === end.toDateString()) {
      return this.formatDate(start);
    }

    // If same month event
    if (
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear()
    ) {
      return `${start.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })} - ${end.toLocaleDateString('en-US', {
        day: 'numeric',
        year: 'numeric',
      })}`;
    }

    // Different months
    return `${this.formatDate(start)} - ${this.formatDate(end)}`;
  }

  getEventTypeIcon(eventType: string): string {
    switch (eventType) {
      case 'tournament':
        return `
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10 1l3 6 6 .75-4.5 4.5 1.5 6.5-6-3.5-6 3.5 1.5-6.5L1 7.75 7 7l3-6z" clip-rule="evenodd"></path>
          </svg>
        `;
      case 'training':
        return `
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path>
          </svg>
        `;
      case 'community':
        return `
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
          </svg>
        `;
      default:
        return `
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path>
          </svg>
        `;
    }
  }

  getEventTypeClass(eventType: string): string {
    switch (eventType) {
      case 'tournament':
        return 'text-blue-800 bg-blue-100';
      case 'training':
        return 'text-green-800 bg-green-100';
      case 'community':
        return 'text-purple-800 bg-purple-100';
      default:
        return 'text-gray-800 bg-gray-100';
    }
  }

  logEventClick(eventId: string, eventTitle: string) {
    logEvent(this.analytics, 'calendar_event_click', {
      event_id: eventId,
      event_title: eventTitle,
    });
  }
}
