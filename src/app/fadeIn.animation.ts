import { animation, style, animate, trigger, transition, useAnimation } from '@angular/animations';

export const fadeInTrigger = trigger('spawn', [transition('void => *', [animate(0,style({ 'opacity': '0'})),animate('800ms')])])

export const fadeInTriggerNormal  = trigger('spawn0', [transition('void => *', [animate(0,style({ 'opacity': '0'})),animate('700ms')])])

export const fadeInTriggerDelay  = trigger('spawn1', [transition('void => *', [animate(0,style({ 'opacity': '0'})),animate('700ms 300ms')])])

export const fadeInTriggerDelay2  = trigger('spawn2', [transition('void => *', [animate(0,style({ 'opacity': '0'})),animate('700ms 600ms')])])
