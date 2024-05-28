import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DateTime, Interval } from 'luxon';
import { Subscription, interval, map, takeWhile } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  targetDate: DateTime = DateTime.fromISO("2024-06-27T06:00:00");
  countdown: any;
  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription = interval(1000)
      .pipe(
        map(() => {
          const now = DateTime.local();
          const diff = this.targetDate.diff(now);
          if (diff.valueOf() > 0) {
            const duration = Interval.fromDateTimes(now, this.targetDate).toDuration(['days', 'hours', 'minutes', 'seconds']);
            return {
              days: duration.days,
              hours: duration.hours,
              minutes: duration.minutes,
              seconds: Math.floor(duration.seconds)
            };
          } else {
            return null;
          }
        }),
        takeWhile((countdown) => countdown !== null, true)
      )
      .subscribe((countdown) => {
        this.countdown = countdown;
        if (countdown) {
          const days = document.getElementById('days');
          const hours = document.getElementById('hours');
          const minutes = document.getElementById('minutes');
          const seconds = document.getElementById('seconds');
          if (days) {
            days.setAttribute('style', `--value:${countdown.days}`);
          }
          if (hours) {
            hours.setAttribute('style', `--value:${countdown.hours}`);
          }
          if (minutes) {
            minutes.setAttribute('style', `--value:${countdown.minutes}`);
          }
          if (seconds) {
            seconds.setAttribute('style', `--value:${countdown.seconds}`);
          }
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
