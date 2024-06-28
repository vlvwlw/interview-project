export const reachBottom = {
    install(app: any){
        app.directive('reach-bottom', {
            mounted(el:any, binding:any) {
                console.log(el, binding)
            },
        })
    }
}