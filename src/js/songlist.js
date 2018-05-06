{
    let view = {
        el: '.songList-container',
        template: `
         <ul class="songList">
                    <li>歌曲1</li>
                    <li>歌曲1</li>
                    <li>歌曲1</li>
                    <li>歌曲1</li>
                    <li>歌曲1</li>
                    <li>歌曲1</li>
                </ul>`,
        render(data){
            return $(this.el).html(this.template)
        }
    }
    let moudle = {}
    let controller = {
        init(view, moudle){
            this.view = view
            this.moudle = moudle
            this.view.render(this.moudle.data)
        }
    }
    controller.init(view, moudle)
}