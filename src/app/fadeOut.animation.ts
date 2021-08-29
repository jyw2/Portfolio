import { animation, style, animate, trigger, transition, useAnimation } from '@angular/animations';

export const fadeOutTrigger = trigger('fadeOut', [transition('* => void', [animate(800,style({ 'opacity': '0'}))])])
