{
    let view = {
        el: `.songList-container`,
        template: `
        <ul class="songList">
        </ul>`,
        render(data) {
            let $el = $(this.el)
            $el.html(this.template)
            let {songs} = data
            let liList = songs.map((song) => {
               return $('<li></li>').text(song.name).attr('data-id', song.id)               
            })
            $el.find('ul').empty()
            liList.map((d) => {
                $el.find('ul').append(d)
            })
        },
        activeItem(li){
            let $li = $(li)
            $li.addClass('active').siblings('.active').removeClass('active') 
        },
        clearActive(){
            $(this.el).find('li').removeClass('active')
        }
    }
    let moudle = {
        data: {
            songs: []
        },
        find() {
            let query = new AV.Query('Song');
            return query.find().then((songs) => {
                this.data.songs = songs.map((song) => {
                    return {id: song.id, ...song.attributes}
                })
                return songs
            });
        },
    }
    let controller = {
        init(view, moudle) {
            this.view = view
            this.moudle = moudle
            this.view.render(this.moudle.data)
            this.getAllSongs()
            this.bindEvents()
            
            window.eventHub.on('creat', (data) => {
                this.moudle.data.songs.push(data)
                this.view.render(this.moudle.data)
            })
            window.eventHub.on('upload', (data) => {
                this.view.clearActive()
            })
            
        },
        getAllSongs(){
            return this.moudle.find().then(() => {
                this.view.render(this.moudle.data)
            })
        },
        bindEvents() {
            $(this.view.el).on('click', 'li', (e) => {
                
                this.view.activeItem(e.currentTarget)
                //this.moudle.selectId = e.currentTarget.getAttribute('data - id')
                // this.view.render(this.moudle.data)
                let data = []
                for(let song in this.moudle.data.songs){
                    if (this.moudle.data.songs[song].id === e.currentTarget.getAttribute('data-id')){
                        data = this.moudle.data.songs[song]
                    }
                }
                
                window.eventHub.emit('select', data)

            })
        }
    }
    controller.init(view, moudle)
}