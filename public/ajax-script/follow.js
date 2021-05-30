$(async ()=>{
    $("#follow-button").on("click",async ()=>{
        const ajax_result = await $.ajax({
            url:"/follow-api/follow",
            type: "post",
            dataType: "json",
            data:{
                followed_user_id : $("#user_id").val()
            }
        })
        console.log(ajax_result)
        if(ajax_result.error){
            console.log("error")
        }
    })

})