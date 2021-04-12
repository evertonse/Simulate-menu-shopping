async function ApiHandler(theme){

  async function fetchPhotos(query){
    let clientID='1ty8n9Y6fcImo_lvtdXMsyQiZ1fSZ4OA1KC8wf4N3io';
    let resp = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${clientID}`)
    
    let data = await  resp.json();
    console.log(data);
    return  data.results;
    
  }
  async function addItems(theme){
    let results = await fetchPhotos(theme);
    console.log();
    results.forEach(result=>{

      let word = result.alt_description?.split(" ")[2]
      new Item(result.urls.small,result.alt_description,word).render();
    })
    Item.currentItems.forEach(item =>{
  })
  }

  await addItems(theme,{});

}

(function search(){
  ApiHandler("products");
  const input = document.body.querySelector('#search');
  input.addEventListener('search',e=>{
    console.log('searching');
    ApiHandler(e.currentTarget.value);
    e.currentTarget.value ="";

  });

}());


new Session(new User('Everton',12033));
(function sortBy(){
    const sortButtons= document.querySelectorAll('.sort-options-container button');
    sortButtons.forEach(btn=>{
    console.log('getting btn atribute');
    let min =btn.getAttribute('min')
    let max =btn.getAttribute('max')
    btn.addEventListener('click',showItem.bind(null,min,max));
  });


  function showItem(min,max){
    let hiddenItems=0;
    Item.showAll();
    Item.currentItems.forEach((item,item_id)=>{
      if(item.price>=min && item.price<=max){
        return;
      }
      else{
        console.log('Item being hided:');
        console.log(item);
        item.hide();
        hiddenItems++;
      // item.classList.toggle
      }
    })  ;
    Item.isAnyHidden=true;
    return hiddenItems;
  }
})();