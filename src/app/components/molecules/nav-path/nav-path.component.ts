import {
  TNavigationPart,
  RoutingService,
} from 'src/app/services/sub-services/routing.service';
import { takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-path',
  templateUrl: './nav-path.component.html',
  styleUrls: ['./nav-path.component.css'],
})
export class NavPathComponent implements OnInit, OnDestroy {
  private onDestroyEmitter = new EventEmitter<void>();
  public navPath: TNavigationPart[] = [];

  constructor(private routingService: RoutingService) {}

  ngOnInit(): void {
    this.routingService
      .navParts()
      .pipe(takeUntil(this.onDestroyEmitter))
      .subscribe((navParts) => (this.navPath = navParts));
  }

  ngOnDestroy(): void {
    this.onDestroyEmitter.emit();
  }
}
