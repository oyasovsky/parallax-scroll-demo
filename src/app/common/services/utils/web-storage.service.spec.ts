import { WebStorageService } from '../utils/web-storage.service';

describe('WebStorage Service ', () => {
    let webStorage = new WebStorageService();

    it('call updateArrayStorage should return new array reference', () => {
         let item ='new item';
         let array=['item1','item2'];
         let result =webStorage.updateArrayStorage(array,item);

         expect(result).not.toBe(['item1','item2' , 'new item']);
    });
    
});