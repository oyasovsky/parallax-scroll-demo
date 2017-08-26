import { UtilsService } from '../utils/utils.service';

describe('Utils Service ', () => {
    let service = new UtilsService();
    let jsondata = require ('../../../../config.json');
    let data = jsondata.components;

    it('call find method with parameteres (flow_login , data , name , [])   should return  {{flowlogin}} ', () => {
         let name='flow_login',
             prop ='name',
             conditions= [];

         let result =service.find(name ,data,prop ,conditions);

         expect(result.isActive).toBe('{{flowlogin}}');
    });

    it('call find method with parameteres (null , data , name , [] ) should return undefined ', () => {
         let name=null ,
             prop ='name' ,
            conditions= [];

         let result =service.find(name ,data,prop ,conditions);

         expect(result).not.toBeDefined();
    });

    it('call find method with parameteres (empty string , data , name , [] ) should return undefined ', () => {
         let name='' ,
             prop ='name' ,
             conditions= [];

         let result =service.find(name ,data,prop ,conditions);
         expect(result).not.toBeDefined();
    });


    it('call find method with parameteres (flow_loginb , data , name , [])   should return {{flowloginb}} ', () => {
            let name='flow_loginb' ,
                prop ='name' ,
                conditions= [];

            let result =service.find(name ,data,prop ,conditions);
            expect(result.isActive).toBe('{{flowloginb}}');
    });


    it('call find method with parameteres (flow_code , data , name , [features,ui])   should return {{flowcode}} ', () => {
            let name='flow_code',
            prop ='name',
            conditions= ['features' , 'ui'];

            let result =service.find(name ,data,prop ,conditions);
            expect(result.isActive).toBe('{{flowcode}}');
    });

    it('call find method with parameteres (show_list , data , name , [features,ui])   should return {{showlist}} ', () => {
            let name='show_list',
                prop ='name',
                conditions= ['features' , 'ui'];

            let result =service.find(name ,data,prop ,conditions);
            expect(result.isActive).toBe('{{showlist}}');
    });

    it('call find method with parameteres (show_list , data , name , [features])   should return undefined ', () => {
            let name='show_list',
                prop ='name',
                conditions= ['features'];

            let result =service.find(name ,data,prop ,conditions);
            expect(result).not.toBeDefined();
    });


});
