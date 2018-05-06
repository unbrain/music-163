{
    let view = {
        el: '.page > main',
        template: `
        <form action="">
                <div class="songEditTitle">编辑歌曲信息</div>
                <div class="row">
                    <label for="">歌名:
                        <input type="text">
                    </label>
                </div>
                <div class="row">
                    <label for="">歌手:
                        <input type="text">
                    </label>
                </div>
                <div class="row">
                    <label for="">外链:
                        <input type="text">
                    </label>
                </div>
                <div class="row">
                    <button type="submit">保存</button>
                </div>
            </form>`,
        render(data){
            $(this.el).html(this.template)
        }

    }
    let moudle = {}
    let controller = {
        init(view, moudle) {
            this.view = view
            this.moudle = moudle
            this.view.render(this.moudle.data)
        }
    }
    controller.init(view, moudle)
}