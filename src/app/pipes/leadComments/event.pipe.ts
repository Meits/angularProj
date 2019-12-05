import { Pipe, PipeTransform } from '@angular/core';
import { LeadComment } from 'src/app/models/leadComment';

@Pipe({
  name: 'event'
})
export class EventPipe implements PipeTransform {

  transform(comments: Array<LeadComment>, type : number): any {
    return comments.filter((comment) => comment.is_event == type);
  }

}
