{
    let view = {
        el: `.songList-container`,
        template: `
        <ul class="songList">
        </ul>`,
        render(data) {
            let $el = $(this.el)
            $el.html(this.template)
            let { songs, selectId } = data

            let liList = songs.map((song) => {
                let $li = $('<li></li>').text(song.name).attr('data-id', song.id)
                if (song.id === selectId) { $li.addClass('active') }
                return $li

            })
            $el.find('ul').empty()
            liList.map((d) => {
                $el.find('ul').append(d)
            })
        },
        clearActive() {
            $(this.el).find('.active').removeClass('active')
        }
    }
    let moudle = {
        data: {
            songs: [],
            selectId: null,
        },
        find() {
            let query = new AV.Query('Song');
            return query.find().then((songs) => {
                this.data.songs = songs.map((song) => {
                    return { id: song.id, ...song.attributes }
                })
                return songs
            });
        }
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
            window.eventHub.on('update', (song) => {
                let songs = this.moudle.data.songs

                for (let i = 0; i < songs.length; i++) {
                    if (songs[i].id === song.id) {
                        Object.assign(songs[i], song)
                    }
                }
                this.view.render(this.moudle.data)
            })
        },
        getAllSongs() {
            return this.moudle.find().then(() => {
                this.view.render(this.moudle.data)
            })
        },
        bindEvents() {
            $(this.view.el).on('click', 'li', (e) => {
                this.moudle.data.selectId = e.currentTarget.getAttribute('data-id')
                this.view.render(this.moudle.data)
                let data = []
                for (let song in this.moudle.data.songs) {
                    if (this.moudle.data.songs[song].id === e.currentTarget.getAttribute('data-id')) {
                        data = this.moudle.data.songs[song]
                    }
                }
                window.eventHub.emit('select', data)
            })
        }
    }
    controller.init(view, moudle)
}