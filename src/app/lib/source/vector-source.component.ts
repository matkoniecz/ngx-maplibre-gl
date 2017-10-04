import { VectorSource} from 'mapbox-gl';
import { Component, Input, OnDestroy, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { MapService } from '../map/map.service';

@Component({
  selector: 'mgl-vector-source',
  template: ''
})
export class VectorSourceComponent implements OnInit, OnDestroy, OnChanges, VectorSource {
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() url?: string;
  @Input() tiles?: string[];
  @Input() minzoom?: number;
  @Input() maxzoom?: number;

  type: 'vector' = 'vector'; // Just to make ts happy

  constructor(
    private MapService: MapService
  ) { }

  ngOnInit() {
    this.MapService.addSource(this.id, {
      type: this.type,
      url: this.url,
      tiles: this.tiles,
      minzoom: this.minzoom,
      maxzoom: this.maxzoom,
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.url && !changes.url.isFirstChange() ||
      changes.tiles && !changes.tiles.isFirstChange() ||
      changes.minzoom && !changes.minzoom.isFirstChange() ||
      changes.maxzoom && !changes.maxzoom.isFirstChange()
    ) {
      this.ngOnDestroy();
      this.ngOnInit();
    }
  }

  ngOnDestroy() {
    this.MapService.removeSource(this.id);
  }
}
