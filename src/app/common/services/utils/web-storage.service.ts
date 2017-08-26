import { Injectable } from '@angular/core';

@Injectable()
export class WebStorageService {
     updateArrayStorage(arr ,item ): any[]{
         arr.push(item);
         return arr.slice();
     }
}