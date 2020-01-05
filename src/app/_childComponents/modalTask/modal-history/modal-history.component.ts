import { Component, OnInit } from '@angular/core';
import { MzBaseModal } from 'ngx-materialize';

@Component({
  selector: 'app-modal-history',
  templateUrl: './modal-history.component.html',
  styleUrls: ['./modal-history.component.sass']
})
export class ModalHistoryComponent extends MzBaseModal implements OnInit {

  constructor() { 

    super();
  }

  ngOnInit() {
  }

}
