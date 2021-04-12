class User{
  constructor(name,balance){
    this._name = name;
    this._balance=balance;
    this.date = new Date()
    let items = 'jorgue'/* Fetch items list */
    this._items=[];
    this.anyChangeEvent = []

  }
  set name(text){
    this._name=text;
  }
  
  get name(){
    return this._name;
  }
  set items(obj){
    this._items=obj;
    console.log('Item Bought:', this.items);
  }
  get items(){
    return this._items;
  }
  set balance(balance){
    this._balance=balance;
    console.log(this);
    console.log('your changing blance');
    console.log(this.anyChangeEvent);
    this.ChangeEventCallBacks();
  }
  get balance(){
    return this._balance;
  }
  ChangeEventCallBacks(){
    this.anyChangeEvent.forEach(cb=>{
      console.log(cb,'is running');
      cb(this);
    })
  }
  addEvent(typeOfEvent,cb){
    if(typeOfEvent ==='change'){
      let isEqual=false;
      this.anyChangeEvent.forEach(func=>{
        if(func.name===cb.name){
          console.log('their equal');
          isEqual=true;
        }
      });
      if(isEqual){
        return;
      }
      this.anyChangeEvent.push(cb);
      console.log('Adding Event');
      
        
      
    }
  }
  /* push function to be activated when anything changes in the user object */
}
