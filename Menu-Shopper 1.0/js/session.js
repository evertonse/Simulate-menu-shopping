class Session{
  constructor(user){
    this.user = user;
    /* Adding updateSession to the user associated with it */
    Session.currentUser=this.user;
    this.updateSession();
    


    
  }
  updateSession(){
    let sessionNav = document.body.querySelector('#account-nav');
    sessionNav.querySelector('.current-date').textContent=this.user.date;
    sessionNav.querySelector('.current-date').style.cssText="font-size:1.2rem;"
    sessionNav.querySelector('.account-balance').textContent=`$ ${this.user.balance}`;
    sessionNav.querySelector('.personal-info h6').textContent=this.user.name;
    
    let session = sessionNav.querySelector('.personal-info').querySelector('.new-session');
    sessionNav.querySelector('.personal-info h6').addEventListener('click',e=>{
      e.stopPropagation();
      console.log('personal info been clicked');
      session.classList.toggle('show-new-session');
    })
    document.body.querySelector('.container').addEventListener('click',e=>{
      session.classList.remove('show-new-session');

    })

    let logins_available = session.querySelectorAll('.login');
    logins_available.forEach(login=>{
      login.addEventListener('click',e=>{
      console.log(e.currentTarget);
      new Session(new User(e.currentTarget.textContent,50000)).updateSession();
    })
    });
    this.user.addEvent('change',this.updateSession.bind(this));

  }
  endSession(){
    
  }
}