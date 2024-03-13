<script lang="ts">
import Fa from "svelte-fa";
import { faDiscord } from "@fortawesome/free-brands-svg-icons"
</script>

<footer>
    <div class="container">
        <div class="column">
            <div class="title">
                <p>Legal</p>
            </div>
            <div class="links">
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
            </div>
        </div>
        <div class="column">
            <div class="title">
                <p>Where to Donate</p>
            </div>
            <div class="links">
                <a href="https://988lifeline.org/donate/" target="_blank">US Suicide and Crisis Lifeline</a>
                <a href="https://www.samaritans.org/donate-now/" target="_blank">Samaritans: UK</a>
                <a href="https://www.arpitafoundation.org/contact.html" target="_blank">Arpita Foundation: India</a>
                <a href="https://www.befrienders-jpn.org/donate" target="_blank">Befrienders International: Japan</a>

            </div>
        </div>
        <div class="column">
            <div class="title">
                <p>Support</p>
            </div>
            <div class="links">
                <a href="https://discord.gg/YHvfUqVgWS" target="_blank">Our Discord Server</a>
                <a href="https://github.com/Bobrobot1/Suicide-Prevention-Bot" target="_blank">Source Code</a>
            </div>
        </div>
    </div>
    <p>Made with ❤️, using <a href="https://kit.svelte.dev/" target="_blank">SvelteKit</a>.</p>

</footer>

<style>
    @media screen and (orientation:landscape){
        footer {
            padding-top:2vh;
            padding-bottom:1vh;
            padding-left: 3rem;
            padding-right: 2rem;
            background-color: rgb(32,34,37);
            border-radius: 15px;
            margin-top: 3vh;
        }

        .container {
            display: flex;
            /* justify-content: space-between; */
            align-items: start  ;

            gap:3vw
        }

        .column {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .column > .title {
            display: flex;
            justify-content: center;
            font-size: 1.5vw;
            text-align: center;
            line-height: 0vh;
        }

        .column > .links {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .column > .links > a {
            text-decoration: none;
            color: white;
            font-size: 1vw;
        }

        footer > p {
            padding-top: 2vh;
            font-size: 1vw;
        }

        footer > p > a {
            color: white;
        }
    }

    @media screen and (orientation:portrait) {
        footer {
            padding-top:2vh;
            padding-bottom:1vh;
            padding-left: 3rem;
            padding-right: 2rem;
            background-color: rgb(32,34,37);
            border-radius: 15px;
            margin-top: 3vh;
        }

        .container {
            display: flex;
            flex-direction: column;
            align-items:start;
            gap:3vw
        }

        .column {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .column > .title {
            display: flex;
            /* justify-content: center; */
            font-size: 5vw;
            text-align: center;
            line-height: 0vh;
        }

        .column > .links {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .column > .links > a {
            text-decoration: none;
            color: white;
            font-size: 3vw;
        }

        footer > p {
            padding-top: 2vh;
            font-size: 4vw;
        }

        footer > p > a {
            color: white;
        }
    }

    
</style>