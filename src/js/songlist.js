{
    let view = {
        el: `.songList-container`,
        template: `
        <ul class="songList">
        </ul>`,
        render(data){
            let $el = $(this.el)
            $el.html(this.template)
            let {songs} = data
            
            let liList = songs.map((song) => $('<li></li>').text(song.name))
            //console.log(liList)
            $el.find('ul').empty()
            liList.map((d)=>{
                $el.find('ul').append(d)
            })
        }
    }
    let moudle = {
        data: {
            songs: []},

    }
    let controller = {
        init(view, moudle){
            this.view = view
            this.moudle = moudle
            this.view.render(this.moudle.data)
            window.eventHub.on('creat', (data) => {
                //console.log(data)
                this.moudle.data.songs.push(data)
                this.view.render(this.moudle.data)
            })
        },
        bindEvent(){
           
        }
    }
    controller.init(view, moudle)
}