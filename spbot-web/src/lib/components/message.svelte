<script lang="ts">
    import Embed from "./embed.svelte";
</script>

<div class="container">
    <img src="/img/siround.png" alt="SPBOT Logo" />
    <div class="msg-column">
        <div class="name">Suicide Prevention Bot
            <span class="botTag">
                <svg aria-label="Verified Bot" class="botTagVerified" aria-hidden="false" role="img" width="16" height="16" viewBox="0 0 16 15.2"><path d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z" fill="currentColor"></path></svg>
                <span class="botText">BOT</span>
            </span>
        </div> 
        <div class="content"><Embed/></div>
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

.botTag {
    font-family: "gg sans", sans-serif;
    height: .9375rem;
    padding: 0 .275rem;
    margin-top: .075em;
    border-radius: .1875rem;
    margin-left: .25rem;
    position: relative;
    top: .1rem;
    font-size: .625rem;
    text-transform: uppercase;
    vertical-align: top;
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    text-indent: 0;
    background-color: rgb(91,100,234);
}

.botText {
    line-height: .9375rem;
    position: relative;
    font-weight: 500;
    vertical-align: top;
}

.botTagVerified {
    width: 0.9375rem;
    height: 0.9375rem;
    margin-left: -0.25rem;
    display: inline-block;
    overflow: hidden;
}

</style>