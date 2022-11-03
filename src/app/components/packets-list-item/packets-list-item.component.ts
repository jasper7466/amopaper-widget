import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NopaperService } from 'src/app/services/nopaper.service';
import { RoutingService } from 'src/app/services/routing.service';
import { IPacket } from 'src/app/store/packets-list';
import { packetSelector } from 'src/app/store/packets-list/selectors';

@Component({
  selector: 'app-packets-list-item',
  templateUrl: './packets-list-item.component.html',
  styleUrls: ['./packets-list-item.component.css'],
})
export class PacketsListItemComponent implements OnInit, OnDestroy, OnChanges {
  @Input() packetId: number = 0;

  public packet$: Observable<IPacket>;

  constructor(
    private routingService: RoutingService,
    private nopaperService: NopaperService,
    private store: Store
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.nopaperService.startPacketPolling(this.packetId);
    this.packet$ = this.store.select(packetSelector(this.packetId));
  }

  ngOnDestroy(): void {
    this.nopaperService.stopPacketPolling(this.packetId);
  }

  public navigatePacketPage(): void {
    console.log('navigating to packet id', this.packetId);
    this.routingService.goPacketPage(this.packetId);
  }
}
