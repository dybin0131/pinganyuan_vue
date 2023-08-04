import router from './router'



const whiteList = [ '/resetpsd','/register','/login']

router.beforeEach(async(to, from, next) => {
  if(localStorage.getItem("user")){
    if (to.path === '/login') {
      next({ path: '/'})
    }else{
      next();
    }
  }else{
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
     
    }
  }
})

router.afterEach(() => {
 
})
