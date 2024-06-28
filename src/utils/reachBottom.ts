export const reachBottom = {
    install(app: any){
        app.directive('reach-bottom', {
            mounted(el, binding) {
                console.log(el, binding)
            },
        })
    }
}