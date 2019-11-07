import { Component, OnInit } from '@angular/core';
import { SourcesService } from '../sources.service';
import { Source } from '../models/source';
import { MzModalService, MzToastService } from 'ngx-materialize';
import { ModalSourcesComponent } from '../modal-sources/modal-sources.component';


@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.sass']
})
export class SourcesComponent implements OnInit {
 
  constructor(private sourcesService : SourcesService, private modalService: MzModalService, private toastService: MzToastService) {}

  sources: Array<Source>;
  source: Source;

  ngOnInit() {
    this.sources = this.sourcesService.sources;
  }

  editSource (id) {
    this.source = this.sourcesService.getService(id, this.sources);
    this.modalService.open(ModalSourcesComponent,{sources : this.sources, source : this.source});
  }
  
  deleteSource (id) {
    if(confirm("Удалить?")) {
      let index = this.sourcesService.getServiceIndex(id, this.sources);
      if(index) {
        this.sourcesService.deleteSource(this.sources[index]).subscribe(() => {
          this.sources.splice(index, 1);
          this.toastService.show('Deleted', 4000);
        });
      }
    }

  }

  public openSourceModal() {
    this.modalService.open(ModalSourcesComponent,{sources : this.sources});
  }

}
