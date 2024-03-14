<script lang="ts">

import Fa from "svelte-fa";
import { faDiscord } from "@fortawesome/free-brands-svg-icons"

</script>

<nav>
    <div id="left">
        <a href="/"><img src="/img/siround.png" alt="SPBOT Logo" /></a>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/lifelines">Lifelines</a></li>
        </ul>
    </div>
    <div id="right">
        <a href="https://discord.com/api/oauth2/authorize?client_id=794098689983381525&permissions=92160&scope=bot">
            <button>
                <Fa icon={faDiscord}/>
                Add Bot
            </button>
    </div>
</nav>

<style>
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        padding-left: 2rem;
        padding-right: 2rem;
        background-color: rgb(32,34,37);
        border-radius: 15px;
    }

    #left ul {

        /* side by side */
        
        display: flex;
        gap: 1rem;

        /* center vertically */

        align-items: center;

        /* remove bullet points */

        list-style: none;

        /* remove margin */

        padding-left: 1rem;
    
    }

    #left ul li a {
        text-decoration: none;
        color: white;
    }

    #left {
        /* side by side */
        
        display: flex;
        gap: 1rem;
    }

    #right a button {
        background-color: #5865F2;
        border-radius: 5px;
        text-decoration: none;
        color: white;
        border: none;
    }

    #right a button:hover {
        background-color: #3A3B3C;
    }

    /* @media to check if vertical or horizontal */
    @media screen and (orientation: portrait) {
        /* set font sizes */
        #left ul li a {
            font-size: 0.9rem;
        }

        #left ul {
            gap: 0.5rem;
        }

        #left img {
            width: 50px;
        }

        #right a button {
            font-size: 0.9rem;
            padding: 0.6rem 0.6rem;
        }

        nav {
            padding-left: 1rem;
        }
    }
    @media screen and (orientation: landscape) {
        /* set font sizes and margins and padding, etc*/
        #left ul li a {
            font-size: 1.5rem;
        }

        #left img {
            width: 70px;
        }

        #right a button {
            font-size: 1.5rem;
            padding: 0.7rem 1.5rem;
        }
    }


    /*  */
</style>