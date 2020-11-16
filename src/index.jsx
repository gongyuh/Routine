import App from './App.jsx'

if(module.hot){
    module.hot.accept(error=>{
        if(error){
            console.log('热更新出bug了')
        }
    })
}