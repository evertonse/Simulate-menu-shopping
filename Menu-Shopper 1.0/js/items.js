class Item{
  constructor(url,description,title,price){
    this.title = title?.toUpperCase()
    this.description = description??"default";
    this.url = url??'Merda';
  
    /* create Default random price */
    this.price = price??
      Math.ceil(Math.random()*1000 + 9);

    Item.itemsCount++;
    /* unically identify the item by ordem of creation */
    this.identifier=Item?.itemsCount;
    Item.currentItems.set(this.identifier,this);
    
  }
  static isAnyHidden=false;
  static itemsCount = 0;
  static currentItems = new Map();
  static hiddenItems =0;
  static createItemHTMLElement = ()=>{
    function getTemplateCopy(){
      const temp = document.querySelector('template');
      return temp.content.cloneNode(true);
    }
    let templateItem = getTemplateCopy()

    return templateItem;
  }
  
  render(){
    let itemHTMLElement = Item.createItemHTMLElement();
    /* every DOM item has a unique key in the class list */
    itemHTMLElement.querySelector('.item').classList.add(`item-number-${this.identifier}`);
    /* Setting up the image and description of the Item */
    itemHTMLElement.querySelector('img').src=this.url;
    itemHTMLElement.querySelector('.item-title').textContent = this.title;  
    itemHTMLElement.querySelector('.description').textContent = this.description;  
    itemHTMLElement.querySelector('.item-price').textContent = '$' + this.price;  

    // atribute buy funcionality to the buy DOM button
    // Show pop pup for buy button
    let buy_button=itemHTMLElement.querySelector('.buy');
    if(!buy_button.hasAttribute("buy-event")){
      buy_button.addEventListener('click', this.buy.bind(this,Session.currentUser));
      buy_button.setAttribute('buy-event','true');
    }
    



    /* Rendering on the Item-container */
    function appendItem(item,whereDOMSelector){
      /* appending */
      console.log('BEEN ADDED',item);
      document.body.querySelector(whereDOMSelector).appendChild(item);
    } 
      console.log('Appending itemHTMLElement');

    appendItem(itemHTMLElement,'.items-container');
  }
  buy(user){
    let setEvents = ()=>{
      /* functions */
      var MakeBuy= (user)=>{
      console.log('Make Buy');
      if(user.balance>=this.price){
      user.balance-=this.price;
      user.items+=this;
      this.delete();

      }else{
        alert('you dont have money');
      }
    }
      /* Toggle display to block of any HTML element */
      var showToggler = (itemHtmlElement)=>{
        itemHtmlElement.classList.toggle('show');
      }
      let thisItemElement = document.body.querySelector('.items-container').querySelector(`.item-number-${this.identifier}`);
      let buyPopup=thisItemElement.querySelector('.buy-popup');
      /*Show calculation for your balance compared to the price of the item  */
      buyPopup.querySelector('.saldo').innerHTML=`<div class="saldo">
            <p>seu saldo é de:</p>
            <p style="color: green;float: right;">${user.balance}</p>
            <p style="color: red;float: right;">${this.price}</p>
            <p style="float: right;">${user.balance-this.price}</p>
          <div/>`;
      /*  thisItemElement.addEventListener('mouseover',e=>{
        buyPopup.classList.toggle('show');
      }) */
    if(!thisItemElement.hasAttribute("buy-event")){
      thisItemElement.addEventListener('mouseleave',()=>{
        console.log('getting out');
        buyPopup.classList.remove('show');
    
      })
      thisItemElement.setAttribute('buy-event','true');
    }
      
      showToggler(buyPopup);
    
      /* buyItemHTMLElementPopUp.classList.toggle('show'); */
      let yesBtn=buyPopup.querySelector('.btn-yes');
      let noBtn=buyPopup.querySelector('.btn-no');
      if(!yesBtn.hasAttribute('btn-yes-event')){
        yesBtn.addEventListener('click',MakeBuy.bind(this,user));

        yesBtn.setAttribute('btn-yes-event','true');
      }
      if(!noBtn.hasAttribute('btn-no-event')){
        noBtn.addEventListener('click',()=>{
          console.log('NO Button');
          showToggler(buyPopup);
          noBtn.setAttribute('btn-no-event','true');
        });
      }
    }
    setEvents();
    
    
    
    

  }
  
  delete(){
    function removeItem(item,whereFromSelector){
      /* appending */
      console.log('BEEN ADDED',item);
      let itemHTMLElement = document.body.querySelector(whereFromSelector).querySelector(item);
      itemHTMLElement.remove();
    } 
      console.log('removing itemHTMLElement');
    removeItem(`.item-number-${this.identifier}`,'.items-container');
    Item.currentItems.delete(this.identifier);

  }
  hide(){
    let thisItemElement = document.body.querySelector('.items-container').querySelector(`.item-number-${this.identifier}`);
    thisItemElement.classList.add('hide');
  }
  show(){
    let thisItemElement = document.body.querySelector('.items-container').querySelector(`.item-number-${this.identifier}`);
    thisItemElement.classList.remove('hide');
  }
  //Static functions
  static createManyItems(many,arrOfObjects){
    let arraOfItems=[]
    return arrOfItems;
  }
  static renderAll(...args){
    args.forEach(arg =>{
      arg.render();
    })
  }
  static showAll(){
    Item.currentItems.forEach((item,item_id)=>{
      console.log('Item being show:');
      console.log(item);
      item.show();
      
    });
    Item.isAnyHidden=false;
  }
  

}
