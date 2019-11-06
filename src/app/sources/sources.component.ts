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
 

  constructor(private sourcesService : SourcesService, private modalService: MzModalService, private toastService: MzToastService) {
    
  }

  sources: Array<Source>;

  source: Source;

  ngOnInit() {
    this.sourcesService.getServices()
    .subscribe((data: Array<Source>) =>  {
      this.sources = data;
    });
  }

  editSource (id) {
    this.source = this.sourcesService.getService(id, this.sources);
    this.modalService.open(ModalSourcesComponent,{sources : this.sources, source : this.source});
  }
  
  deleteSource (id) {
    
    let idDelete = null;
    let result : Source;

    if(confirm("Удалить?")) {
      this.sources.forEach(function(item : Source, key) {
        if(item.id == id) {
          idDelete = key;
          result = item;
        }
      });
      
      if(idDelete) {
        this.sourcesService.deleteSource(result).subscribe(() => {
          this.sources.splice(idDelete, 1);
          this.toastService.show('Deleted', 4000);
        });
      }
    }

  }

  public openSourceModal() {
    this.modalService.open(ModalSourcesComponent,{sources : this.sources});
  }

}
