<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import "../global.css";
    import Footer from "$lib/components/footer.svelte";
</script>

<meta name="Description" content="Combating suicide with technology. Automated mental health crisis detection trusted by thousands of servers.">
<meta property="og:title" content="Add Suicide Prevention Bot" />
<meta property="og:type" content="Suicide Prevention Bot for Discord" />
<meta property="og:url" content="http://spbot.9021007.xyz" />
<meta property="og:image" content="http://spbot.9021007.xyz/img/spbotimage2.png" />
<meta property="og:description" content="Combating suicide with technology. Automated mental health crisis detection trusted by thousands of servers." />
<meta name="theme-color" content="#4d87b2">
<meta name="twitter:card" content="summary_large_image">


<div class="navbar"><Navbar /></div>
<slot />
<div class="footer"><Footer /></div>
<style>
    .navbar {
        position:absolute;
        width:calc(100% - 1rem);
        top:1rem;
    }
</style>
