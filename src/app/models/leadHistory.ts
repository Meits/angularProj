import { Lead } from './lead';
import { LeadComment } from './leadComment';

export class LeadHistory {
    lead : Lead;
    history : Array<LeadComment>;
}