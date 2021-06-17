$(async ()=>{
    const check_follow =  await $.ajax(
        {
            url:"/follow-api/check-follow",
            type: "post",
            dataType: "json",
            data:{
                followed_user_id : $("#user_id").val()

            }
        })
    if(check_follow.error){
        console.log("error")
        return
    }
    if(check_follow.follow){
        $("#follow-button").hide()
        $("#un-follow-button").show()
    }
    else {
        $("#un-follow-button").hide()
        $("#follow-button").show()
    }
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
            return
        }
        $("#follow-button").hide()
        $("#un-follow-button").show()
    })

    $("#un-follow-button").on("click",async ()=>{

        const ajax_result = await $.ajax({
            url:"/follow-api/un-follow",
            type: "post",
            dataType: "json",
            data:{
                followed_user_id : $("#user_id").val()
            }
        })
        console.log(ajax_result)
        if(ajax_result.error){
            console.log("error")
            return
        }
        $("#un-follow-button").hide()
        $("#follow-button").show()
    })
})