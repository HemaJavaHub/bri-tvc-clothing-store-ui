export class Orderdetails {
     orderNumber:string;
     username:string;
     email:string;
     items:OrderItems[];
     total:number;
     address:string;
     date:string;
}
export class OrderItems{
    //id:any;
    name:string;
    price:number;
    size:string;
    qty:number;
}
