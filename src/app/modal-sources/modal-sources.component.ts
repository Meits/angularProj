import { Component, OnInit, Input } from '@angular/core';
import { MzBaseModal, MzToastService } from 'ngx-materialize';
import { SourcesService } from '../sources.service';
import { Source } from '../models/source';

@Component({
  selector: 'app-modal-sources',
  templateUrl: './modal-sources.component.html',
  styleUrls: ['./modal-sources.component.sass']
})
export class ModalSourcesComponent extends MzBaseModal  implements OnInit {

  constructor(private sourcesService : SourcesService, private toastService: MzToastService) {
    super();
  }

  @Input() source: Source = {
    _id: "",
    title : "",
    updated_at : "",
  };

  @Input() sources : Array<Source>;

  saveSource () {
    this.sourcesService.saveSource(this.source).subscribe((source) => {
      this.sources.push(source);
      this.toastService.show('Saved', 4000);
      this.clearSource();

      this.modalComponent.closeModal();
    });
  }
  updateSource () {
    console.log(this.source);
    this.sourcesService.updateSource(this.source).subscribe((source) => {
        this.toastService.show('Updated', 4000);
        this.modalComponent.closeModal();
    });
  }

  private clearSource () {
    this.source.title = "";
    this.source._id = "";
  }


  ngOnInit() {
   
  }
}
