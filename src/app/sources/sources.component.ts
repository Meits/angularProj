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
    console.log(id);
  }
  deleteSource (id) {
    console.log(id);
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
