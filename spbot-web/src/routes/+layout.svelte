<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import "../global.css";
    import Footer from "$lib/components/footer.svelte";
</script>




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
