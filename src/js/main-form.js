{
    let view = {
        el: '.page > main',
        template: `
        <form action="">
                <div class="songEditTitle">编辑歌曲信息</div>
                <div class="row">
                    <label for="">歌名:
                        <input type="text" value="__key__">
                    </label>
                </div>
                <div class="row">
                    <label for="">歌手:
                        <input type="text">
                    </label>
                </div>
                <div class="row">
                    <label for="">外链:
                        <input type="text" value="__link__">
                    </label>
                </div>
                <div class="row">
                    <button type="submit">保存</button>
                </div>
            </form>`,
        render(data = {}){
            let palceholders = ['key', 'link']
            let html = this.template
            palceholders.map((string) => {
                html = html.replace(`__${string}__`, data[string] || '')
            })
            $(this.el).html(html)
        }

    }
    let moudle = {}
    let controller = {
        init(view, moudle) {
            this.view = view
            this.moudle = moudle
            this.view.render(this.moudle.data)
            window.eventHub.on('upload', (data) => {
                this.view.render(data)
            })
        }
    }
    controller.init(view, moudle)
}