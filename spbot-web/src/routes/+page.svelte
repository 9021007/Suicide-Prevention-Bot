<script lang="ts">
    import Message from "$lib/components/message.svelte";
    import Usermessage from "$lib/components/usermessage.svelte";
    import Fa from "svelte-fa";
import { faDiscord } from "@fortawesome/free-brands-svg-icons"
</script>

<div class="start">
    <h1>Combating suicide with technology</h1>
    <h3>Automated mental health crisis detection, trusted by thousands of servers.</h3>
    <a href="https://discord.com/api/oauth2/authorize?client_id=794098689983381525&permissions=92160&scope=bot" target="_blank">
        <button>
            <Fa icon={faDiscord}/>
            Add Bot
        </button>
    </a>
    <img src="/img/scroll.svg" class="scroll" alt="icon of a mouse scrolling down">
    <img src="/img/swipe.svg" class="swipe" alt="icon of a downwards chevron">
</div>

<div class="maincolumn" style="width: 100%;">
    <div class="row1">
        <div class="text">
            <p>Get users connected with the help they need</p>
        </div>
        <div class="embed"><Message/></div>
    </div>
    <div class="row2">
        <div class="text">
            <p>Detect those struggling with suicide, and send them resources to help</p>
        </div>
        <div class="embed"><Usermessage icon="/img/red.png" message="i dont want to be here anymore, it hurts too much"/></div>

    </div>
    <div class="row3">
        <div class="text">
            <p>Avoid false positives</p>
        </div>
        <div class="embed"><Usermessage icon="/img/green.png" message="how do I make a Linux process kill itself"/></div>
    </div>
    <div class="row4">
        <div class="column1">
            <img src="/img/ai.svg" alt="icon of brain with circuit board traces encircling it">
            <div class="title">Machine Learning</div>
            <p>Suicide Prevention Bot uses machine learning to scan every message for signs of suicide, not a list of keywords.</p>
        </div>
        <div class="column2">
            <img src="/img/people.svg" alt="icon of two people, one had their arm on the shoulder of the other">
            <div class="title">Trusted by thousands</div>
            <p>Thousands of servers use Suicide Prevention Bot to help protect their users every day.</p>
        </div>
        <div class="column3">
            <img src="/img/privacy.svg" alt="icon of eye with strike through it">
            <div class="title">Safe, private, and secure</div>
            <p>Messages are not logged or used to train any machine learning models.</p>
        </div>
    </div>

    
</div>

<style>
    /* put row elements side by side, with the left element taking up 50% of the width */
    

    /* check if portrait or landscape */
    @media screen and (orientation:portrait) {

        .start {
            height:100vh;
        }

        .start > h1 {
            font-size: 6vw;
            font-weight: bold;
            text-align: center;
            padding-top: 40vh;
            line-height: 4vh;

        }

        .start > h3 {
            font-size: 5vw;
            font-weight: bold;
            text-align: center;
            color:#888888;
            line-height: 4vh;
        }

        .start > a {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 2vh;
            text-decoration: none;
        }

        .start > a > button {
            font-size: 6vw;
            font-weight: bold;
            padding: 2.5vw;
            border-radius: 0.5vw;
            background-color: #5865F2;
            color: white;
            border: 5px solid #5865F2;
            cursor: pointer;
        }

        .start > a > button:hover {
            background-color: #3A3B3C;
        }

        .start > .swipe {
            width: 100%;
            height: 7vh;
            margin-top: 15vh;
            animation: swipe 8s cubic-bezier(0.45, 0, 0.55, 1) 0.5s 1 normal forwards;
            filter:invert(1);
            margin-left: auto;
            margin-right: auto;
        }

        .start > .scroll {
            display: none;
        }

        @keyframes swipe {
            0% {
                transform: translateY(0);
            }

            20% {
                transform: translateY(4vh);
            }

            40% {
                transform: translateY(0);
            }

            60% {
                transform: translateY(4vh);
            }

            80% {
                transform: translateY(0);
            }

            100% {
                transform: translateY(4vh);
            }
        }

        .maincolumn {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding-top:1rem
        }

        .row1, .row2, .row3{
            align-content: center;
            align-items: center;
            justify-content: center;
            text-align: center;
            width:100%;
        }

        .row1 > .text {
            font-weight: bold;
            white-space: pre-line;
            font-size: 6vw;
        }

        .row1 > .embed {
            text-align: left;
            max-width:620px;
            /* center */
            margin-left:auto;
            margin-right:auto;
        }    

        .row2 > .text {
            font-weight: bold;
            /* use word wrap */
            white-space: pre-line;
            font-size: 5vw;
            }

        .row2 > .embed {
            margin-left:auto;
            text-align: left;
            max-width:480px;
            margin-right:auto;
        }    

        .row3 > .text {
            font-weight: bold;
            white-space: pre-line;
            font-size: 5vw;
        }

        .row3 > .embed {
            margin-left:auto;
            text-align: left;
            max-width:480px;
            margin-right:auto;        }   
        .row4 {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-content: center;
            align-items: center;
            justify-content: center;
            width:100%;
            font-size: 5vh;
            text-align: center;
        }
        
        .row4 > .column1 > .title, .row4 > .column2 > .title, .row4 > .column3 > .title {
            font-size: 5vw;
            font-weight: bold;
            padding-top:5%;
        }

        .row4 > .column1 > p, .row4 > .column2 > p, .row4 > .column3 > p {
            font-size: 3vw;
        }

        .row4 > .column1 > img, .row4 > .column2 > img, .row4 > .column3 > img {
            /* height: 15vh; */
            width:30vw;
            padding-left:5vw;
            padding-top:5vh;
            filter:invert(1)
        }
    }
    
    @media screen and (orientation:landscape) {
        :root {
            --gap: 1rem;
            --bouncedistance: 4vh;
        }
        
        .start {
            height:100vh;
        }

        .start > h1 {
            font-size: 4vw;
            font-weight: bold;
            text-align: center;
            padding-top: 40vh;
            line-height: 4vh;

        }

        .start > h3 {
            font-size: 2.1vw;
            font-weight: bold;
            text-align: center;
            color:#888888;
            line-height: 1vh;
        }

        .start > a {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 2vh;
            text-decoration: none;
        }

        .start > a > button {
            font-size: 2.1vw;
            font-weight: bold;
            padding: 1vw;
            border-radius: 0.5vw;
            background-color: #5865F2;
            color: white;
            border: 5px solid #5865F2;
            cursor: pointer;
        }

        .start > a > button:hover {
            background-color: #3A3B3C;
        }

        .start > .scroll {
            width: 100%;
            height: 10vh;
            margin-top: 15vh;
            animation: scroll 8s cubic-bezier(0.45, 0, 0.55, 1) 0.5s 1 normal forwards;
            filter:invert(1);
            /*center the image */
            margin-left: auto;
            margin-right: auto;
        }
        
        @keyframes scroll {
            0% {
                transform: translateY(0);
            }

            20% {
                transform: translateY(4vh);
            }

            40% {
                transform: translateY(0);
            }

            60% {
                transform: translateY(4vh);
            }

            80% {
                transform: translateY(0);
            }

            100% {
                transform: translateY(4vh);
            }
        }

        .swipe {
            display: none;
        }

        .maincolumn {
            display: flex;
            flex-direction: column;
            gap: 5rem;
            padding-top:1rem;
        }

        .row1, .row2, .row3{
            display: inline-flex;
            flex-direction: row;
            gap: var(--gap);
            align-content: center;
            align-items: center;
            justify-content: center;
            width:100%;
            font-size: 5vh;
        }

        .row1 > .text {
            font-weight: bold;
            width: calc(50% - (var(--gap)/2));
            font-size: 2vw;
            text-align: right;
        }

        .row1 > .embed {
            min-width:50%;
            
        }    

        .row2 > .text {
            font-weight: bold;
            width: calc(50% - (var(--gap)/2));
            font-size: 2vw;
            text-align: right;
            }

        .row2 > .embed {
            max-width:50%;
            transform: scale(1.5);
            margin-right:auto;
            padding-left:5%;
        }

        .row3 > .text {
            font-weight: bold;
            width: calc(50% - (var(--gap)/2));
            font-size: 2vw;
            text-align: right;


        }

        .row3 > .embed {
            max-width:50%;
            transform: scale(1.5);
            margin-right:auto;
            padding-left:4%;
        }    

        @media screen and (max-width: 1315px) { /* for people with bad monitors */
            .row2 > .embed {
                transform: scale(1);
            }

            .row3 > .embed {
                transform: scale(1);
            }
        }
        .row4 {
            display: flex;
            flex-direction: row;
            gap: calc(var(--gap)*2);
            align-content: center;
            align-items: flex-start;
            justify-content: center;
            width:100%;
            line-height: 1.5vw;
            text-align: center;
        }

        .row4 > .column1, .row4 > .column2, .row4 > .column3 {
            width: calc(33% - (var(--gap)/3));
            overflow-wrap: break-word;
            white-space: pre-line;
        }

        .row4 > .column1 > .title, .row4 > .column2 > .title, .row4 > .column3 > .title {
            font-size: 2vw;
            font-weight: bold;
        }
        .row4 > .column1 > p, .row4 > .column2 > p, .row4 > .column3 > p {
            font-size: 1vw;
            font-weight: medium;
        }
        .row4 > .column1 > img, .row4 > .column2 > img, .row4 > .column3 > img {
            width: auto;
            height: 6vw;
            padding-top:1vw;
            padding-bottom:1vw;
            filter:invert(1)
        }
    }





</style>