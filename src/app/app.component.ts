import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { NavbarComponent } from './view/navbar/navbar.component';
import { HeroComponent } from './view/hero/hero.component';
import { AboutComponent } from './view/about/about.component';
import { AchievementsComponent } from './view/achievements/achievements.component';
import { SkillsComponent } from './view/skills/skills.component';
import { GalleryComponent } from './view/gallery/gallery.component';
import { BlogComponent } from './view/blog/blog.component';
import { TechBadmintonComponent } from './view/tech-badminton/tech-badminton.component';
import { CommunityComponent } from './view/community/community.component';
import { CalendarComponent } from './view/calendar/calendar.component';
import { ContactComponent } from './view/contact/contact.component';
import { FooterComponent } from './view/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    AchievementsComponent,
    SkillsComponent,
    GalleryComponent,
    BlogComponent,
    TechBadmintonComponent,
    CommunityComponent,
    CalendarComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private analytics = inject(Analytics);

  ngOnInit() {
    // Set page title for SEO
    this.titleService.setTitle(
      'Philip Amwata | Professional Badminton Player | Kenya & Luxembourg'
    );

    // Set meta tags for SEO
    this.metaService.addTags([
      {
        name: 'description',
        content:
          'Philip Amwata - Professional badminton player ranked 8th in South Africa. Specializing in singles competition with international tournament experience. Available for Luxembourg club opportunities.',
      },
      {
        name: 'keywords',
        content:
          'Philip Amwata, badminton, professional badminton player, Kenya badminton, Luxembourg badminton, singles player, international badminton',
      },
      { name: 'author', content: 'Philip Amwata' },
      { name: 'robots', content: 'index, follow' },
      {
        property: 'og:title',
        content: 'Philip Amwata | Professional Badminton Player',
      },
      {
        property: 'og:description',
        content:
          'Professional badminton player with international tournament experience and ranked 8th in South Africa.',
      },
      {
        property: 'og:image',
        content:
          'https://badminton.philipamwata.net/assets/images/philip-amwata-action.jpg',
      },
      { property: 'og:url', content: 'https://badminton.philipamwata.net' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        name: 'twitter:title',
        content: 'Philip Amwata | Professional Badminton Player',
      },
      {
        name: 'twitter:description',
        content:
          'Professional badminton player with international tournament experience and ranked 8th in South Africa.',
      },
      {
        name: 'twitter:image',
        content:
          'https://badminton.philipamwata.net/assets/images/philip-amwata-action.jpg',
      },
    ]);

    // Log page view to Firebase Analytics
    logEvent(this.analytics, 'page_view', {
      page_title: 'Home',
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }
}
