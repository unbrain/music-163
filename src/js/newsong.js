{
    let view = {
        el: '.newSong',
        template: `歌曲列表`,
        render(data){
            return $(this.el).html(this.template)
        }
    }
    let moudle = {}
    let controller = {
        init(view, moudle){
            this.view = view
            this.moudle =moudle
            this.view.render(this.moudle.data)
            window.eventHub.on('upload', (data)=>{
                console.log('new song')
                console.log(data)
            })
        }
    }
    controller.init(view, moudle)
}