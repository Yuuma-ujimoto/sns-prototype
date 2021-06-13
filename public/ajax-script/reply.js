
$(async () => {
    // -----------------
    // Json受け取るタイプ

    const text = $("#text")
    $("#reply").on("click", async () => {
        const ajax_result = await $.ajax({
            url: "/post-api/post-reply",
            type: "post",
            dataType: "json",
            data: {
                post_id: $("#post_id").val(),
                text: text.val()
            }
        })
        text.val("")
        console.log(ajax_result)
        if (ajax_result.error) {
            console.log("error")
        }


    })
    // resultにSQLの実行データとか入ってる場合

})