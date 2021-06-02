$(async ()=>{
    // -----------------
    // Json受け取るタイプ
    const ajax_result = await $.ajax({
        url:"/get-status/",
        type: "post",
        dataType: "json",
        data:{
            post_id:$("#post_id").val()
        }
    })
    if(ajax_result.error){
        console.log("error")
        return
    }
    // resultにSQLの実行データとか入ってる場合
    ajax_result.result.forEach(items=>{
        console.log(items)
    })
})