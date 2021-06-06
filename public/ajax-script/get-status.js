$(async () => {
    // -----------------
    // Json受け取るタイプ
    const ajax_result = await $.ajax({
        url: "/post-api/get-status/",
        type: "post",
        dataType: "json",
        data: {
            post_id: $("#post_id").val()
        }
    })
    if (ajax_result.error) {
        console.log("error")
        return
    }
    // resultにSQLの実行データとか入ってる場合
    console.log(ajax_result)
    const items = ajax_result.result
    const html = `  <section class="card m-1">
                        <div class="card-body">
                            <h4 class="card-title">${items.user_set_name}</h4>
                            <h6 class="card-subtitle mb-2 text-muted">@${items.user_set_id}</h6>
                            <p class="card-text">
                                ${items.text}
                            </p>
                            <div class="row d-flex justify-content-around col-6">
                                <a href="/user/${items.user_set_id}" class="card-link">Another link</a>
                                <div data-toggle="modal" data-target="#exampleModal">
                                    <button class="btn btn-info">reply</button>
                                </div>
                            </div>
                            
                        </div>
                </section>`
    $("#result").append(html)

    if(ajax_result.reply.length !== 0){
        let reply_html
        ajax_result.reply.forEach(item=>{
            reply_html = `  <section class="card m-1 ml-4">
                        <div class="card-body">
                            <h4 class="card-title">Reply ${items.user_set_name}</h4>
                            <h6 class="card-subtitle mb-2 text-muted">@${items.user_set_id}</h6>
                            <p class="card-text">
                                ${items.text}
                            </p>
                            <div class="row d-flex justify-content-around col-6">
                                <a href="/user/${items.user_set_id}" class="card-link">Another link</a>
                                </div>
                            </div>
                           
                        </div>
                </section>`
            $("#result").append(reply_html)

        })
    }
})