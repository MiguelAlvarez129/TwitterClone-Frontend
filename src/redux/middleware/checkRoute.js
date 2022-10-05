
export const loggerMiddleware = (store) => (next) => (action) => {
  next(action)
};

const checkString = (paths,string) => {
  return paths.reduce((acc,e)=>{
    const regex =  new RegExp(e) 
    if (acc) return true
    if (regex.test(string)) return true
    return false
  },false)
}

export const addPathsMiddleware = (store) => (next) => (action) =>{
  const {router:{location}} = store.getState();
  if (action.type === 'data/saveData'){
    let paths = []
    if (location.pathname === "/home"){
      paths = ['/compose/tweet','/home',/\/gallery/g.source]
    } else { 
      paths = ['/compose/tweet','/settings/profile',/\/gallery/g.source,location.pathname + '$']
    }
    action.payload = {paths,...action.payload}
  }
  
  next(action)
}

export const checkPath = (store) => (next) => (action) =>{
  const {data:{paths}} = store.getState();
  if (action.type === '@@router/LOCATION_CHANGE'){
    const {location:{pathname}} = action.payload 
    if (paths.length && !checkString(paths,pathname)){
      console.log(!checkString(paths,pathname),paths,pathname)
      store.dispatch({type:"data/clearData"})
    }
  }
  next(action)
}