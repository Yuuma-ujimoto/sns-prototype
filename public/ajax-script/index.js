const get_global_timeline = async () => {

    // -----------------
    // Json受け取るタイプ
    const ajax_result = await $.ajax({
        url: "/timeline-api/get-global-timeline",
        type: "get",
        dataType: "json"
    })
    if (ajax_result.error) {
        console.log("error")
        return
    }

    let html
    // resultにSQLの実行データとか入ってる場合
    $("#result").empty()
    ajax_result.result.forEach(items => {
        html = `  <section class="card m-1">
                        <div class="card-body">
                            <h4 class="card-title">${items.user_set_name}</h4>
                            <h6 class="card-subtitle mb-2 text-muted"><a href="/user/${items.user_set_id}">@${items.user_set_id}</a></h6>
                            <p class="card-text">
                                ${items.text}
                            </p>
                            <a href="/status/${items.id}" class="card-link">tweet link</a>
                        </div>
                </section>`
        $("#result").append(html)
    })
}


$(async () => {
    await get_global_timeline()

    await $("#post-tweet").on("click", async () => {
        const text = $("#text")


        const result = await $.ajax({
            url: "/post-api/post-tweet",
            type: "post",
            dataType: "json",
            data: {
                text: text.val(),
                type: "tweet"
            }
        })
        console.log(result)
        await get_global_timeline()
    })

})