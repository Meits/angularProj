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

  source: Source = {
    _id: "",
    title : "",
    updated_at : "",
  };

  ngOnInit() {
    this.sourcesService.getServices()
    .subscribe((data: Array<Source>) =>  {
      this.sources = data;
    });
  }

  editSource (id) {
    this.source = this.getSource(id);
    this.modalService.open(ModalSourcesComponent,{sources : this.sources, source : this.source});
  }
  getSource(id: any): Source {
    let result : Source = {
      _id : "",
      title : "",
      updated_at : "",
    };
    this.sources.forEach(function(item : Source) {
        if(item._id == id) {
          result = item;
        }
    });

    return result;
  }
  deleteSource (id) {
    
    let idDelete = null;
    let result : Source = {
      _id : "",
      title : "",
      updated_at : "",
    };

    if(confirm("Удалить?")) {
      this.sources.forEach(function(item : Source, key) {
        if(item._id == id) {
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
    
    
    // if(this.deleteSource(id)) {
    //   this.toastService.show('Deleted', 4000);
    // }
  }


  // saveSource () {
  //   this.sourcesService.saveSource(this.source).subscribe((source) => {
  //     this.sources.push(source);
  //     this.toastService.show('I am a toast!', 4000);
  //     this.clearSource();
  //   });
  // }

  // private clearSource () {
  //   this.source.title = "";
  //   this.source._id = "";
  // }

  public openSourceModal() {
    this.modalService.open(ModalSourcesComponent,{sources : this.sources});
  }

}
