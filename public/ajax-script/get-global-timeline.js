$(async ()=>{

    // -----------------
    // Json受け取るタイプ
    const ajax_result = await $.ajax({
        url:"/timeline-api/get-global-timeline",
        type: "get",
        dataType: "json"
    })
    if(ajax_result.error){
        console.log("error")
        return
    }

    let html
    // resultにSQLの実行データとか入ってる場合
    ajax_result.result.forEach(items=>{
        console.log(items)
        html = `  <section class="card m-1">
                        <div class="card-body">
                            <h4 class="card-title">${items.user_set_name}</h4>
                            <h6 class="card-subtitle mb-2 text-muted">@${items.user_set_id}</h6>
                            <p class="card-text">
                                ${items.text}
                            </p>
                            <a href="/tweet/${items.id}" class="card-link">tweet link</a>
                            <a href="/user/${itesm.user_set_id}" class="card-link">Another link</a>
                        </div>
                </section>`
        $("#result").append(html)
    })
})