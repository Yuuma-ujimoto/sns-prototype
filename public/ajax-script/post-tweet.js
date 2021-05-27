$(async ()=>{
   await $("#post-tweet").on("click",async ()=>{
       const text = $("#text")


       const result =  await $.ajax({
            url:"/post-api/post-tweet",
            type:"post",
            dataType:"json",
            data:{
                text:text.val(),
                type: "tweet"
            }
        })
       console.log(result)
    })

})