{
    let view = {
        el: '.page > main',
        template: `
        <form action="">
                <div class="row">
                    <label for="">歌名:
                        <input name="name" type="text" value="__name__">
                    </label>
                </div>
                <div class="row">
                    <label for="">歌手:
                        <input name="singer" type="text">
                    </label>
                </div>
                <div class="row">
                    <label for="">外链:
                        <input name="url" type="text" value="__url__">
                    </label>
                </div>
                <div class="row">
                    <button type="submit">保存</button>
                </div>
            </form>`,
        render(data = {}) {
            let palceholders = ['name', 'url']
            let html = this.template
            palceholders.map((string) => {
                html = html.replace(`__${string}__`, data[string] || '')
            })
            $(this.el).html(html)
            if (data.id) {
                $(this.el).prepend('<div class="songEditTitle">编辑歌曲信息</div>')
            } else {

                $(this.el).prepend('<div class="songEditTitle">编辑新建歌曲信息</div>')
            }
        },
        init() {
            this.$el = $(this.el)
        },
        reset() {
            this.render({})
        }
    }
    let moudle = {
        data: {
            name: '',
            singer: '',
            url: '',
            id: '',
        },
        creat(data) {
            var TestObject = AV.Object.extend('Song');
            var Song = new TestObject();
            Song.set('name', data.name);
            Song.set('singer', data.singer);
            Song.set('url', data.url);
            return Song.save().then((song) => {
                let { id, attributes } = song
                Object.assign(this.data, { id, ...attributes })
                // console.log('this.data')
                // console.log(this.data)
            });
        },
        update(data) {
            var song = AV.Object.createWithoutData('Song', this.data.id)
            console.log(this.data.id)
            song.set('name', data.name)
            song.set('singer', data.singer)
            song.set('url', data.url)
            console.log(song)
            return song.save().then((response) => {
                Object.assign(this.data, data)               
                return response
            })
        },
    }
    let controller = {
        init(view, moudle) {
            this.view = view
            this.view.init()
            this.moudle = moudle
            this.view.render(this.moudle.data)
            window.eventHub.on('upload', (data) => {
                    this.moudle.data = data

                this.view.render(this.moudle.data)
            })
            this.bindEvent()
            window.eventHub.on('select', (data) => {
                this.moudle.data = data
                this.view.render(data)
            })

        },
        creat() {
            let needs = 'name singer url'.split(' ')
            let data = {}
            needs.map((string) => {
                data[string] = this.view.$el.find(`[name="${string}"]`).val()
            })
            this.moudle.creat(data).then(() => {
                this.view.reset()
                let data = JSON.stringify(this.moudle.data)
                window.eventHub.emit('creat', JSON.parse(data))
            })
        },
        update() {
            let needs = 'name singer url'.split(' ')
            let data = {}
            needs.map((string) => {
                data[string] = this.view.$el.find(`[name="${string}"]`).val()
            })
            this.moudle.update(data).then(()=>{
                
            },(e)=>{console.log(e)})
        },
        bindEvent() {
            this.view.$el.on('submit', 'form', (e) => {
                e.preventDefault()
                if (this.moudle.data.id) {
                    console.log(this.moudle.data.id)
                    this.update()
                } else {
                    this.creat()
                }
            })
        }
    }
    controller.init(view, moudle)
}