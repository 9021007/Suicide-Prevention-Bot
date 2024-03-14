<script lang="ts">
    export let icon = "/img/siround.png";
    export let message = "Message";
</script>



<div class="container">
    <img src={icon} alt="User Logo" />
    <div class="msg-column">
        <div class="name">Example User</div> 
        <div class="content">{message}</div>
    </div>
</div>

<style>

img {
    width: 40px;
    height: 40px;
}

.container {
    display: flex;
    gap: 17px;
    padding: 1rem;
    border-radius: 15px;
    background-color: rgb(32,34,37);
    margin-left:2vw
}

.msg-column {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.name {
    font-family: "gg sans", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1rem;
    vertical-align: baseline;
    position: relative;
    flex-shrink: 0;
}

.content {
    font-family: "gg sans", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    vertical-align: baseline;
    position: relative;
    flex-shrink: 0;
}

</style>