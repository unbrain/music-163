{
    let view = {
        el: '.page > main',
        template: `
        <form action="">
                <div class="songEditTitle">编辑歌曲信息</div>
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
        },
        init() {
            this.$el = $(this.el)
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
            
            Song.save().then((song)=>{
                let {id, attribute} = song
                Object.assign(this.data, {id, ...attribute})
            });
        }
    }
    let controller = {
        init(view, moudle) {
            this.view = view
            this.view.init()
            this.moudle = moudle
            this.view.render(this.moudle.data)

            window.eventHub.on('upload', (data) => {
                this.view.render(data)
            })
            this.bindEvent()
        },
        bindEvent() {
            this.view.$el.on('submit', 'form', (e) => {
                e.preventDefault()
                let needs = 'name singer url'.split(' ')
                let data = {}
                needs.map((string) => {
                    data[string] = this.view.$el.find(`[name="${string}"]`).val()
                })
                this.moudle.creat(data)
            })
        }
    }
    controller.init(view, moudle)
}