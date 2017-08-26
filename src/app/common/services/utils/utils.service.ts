import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
    find(name, items ,prop , conditions) {
        let i = 0, found;
        if(items === undefined  ||items === null) { return; }
        for (; i < items.length; i++) {
            if (items[i][prop] === name) {
                return items[i];
            }
            else if(conditions.length){
                let j=0;
                for(;j<conditions.length;j++){
                    let arrname=conditions[j];
                    if(Array.isArray(items[i][arrname])){
                        found = this.find(name,items[i][arrname] ,prop ,conditions);
                        if (found) {
                           break;
                        }
                    }
                }
                if(found) {
                    return found;
                }
            }
        }
    }
}