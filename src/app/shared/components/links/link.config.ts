import {LinkTargetsEnum} from './link-targets.enum';
import {LinkRelsEnum} from './link-rels.enum';

export interface LinkConfig {
  href?: string;
  text?: string;
  target?: LinkTargetsEnum;
  rel?: LinkRelsEnum;
}
