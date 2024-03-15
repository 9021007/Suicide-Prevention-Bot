<script lang="ts">
    
// file data.json has all hotlines in a file formatted in an array of objects, each object being:
// {
//     "Group": "Africa", -continent
//     "Value": "DZ", -country code
//     "Label": "Algeria", -country name
//     "Number": "0021 3983 2000 58", -hotline number
//     "Organization": "nosource", -organization
//     "Website": "", -website
//     "Note": "" -note
// },
import { onMount } from 'svelte';
import data from './data.json';

onMount(() => {
    const country = document.getElementById('country');
    const countryOptgroupAfrica = document.getElementById('country-optgroup-Africa');
    const countryOptgroupAmericas = document.getElementById('country-optgroup-Americas');
    const countryOptgroupAsia = document.getElementById('country-optgroup-Asia');
    const countryOptgroupEurope = document.getElementById('country-optgroup-Europe');
    const countryOptgroupOceania = document.getElementById('country-optgroup-Oceania');

    data.forEach((item) => {
        const option = document.createElement('option');
        option.value = item.Value;
        option.text = item.Label;
        option.setAttribute('data-number', item.Number);
        option.setAttribute('data-organization', item.Organization);
        option.setAttribute('data-website', item.Website);
        option.setAttribute('data-note', item.Note);
        option.setAttribute('data-donate', item.Donate);
        switch (item.Group) {
            case 'Africa':
                countryOptgroupAfrica.appendChild(option);
                break;
            case 'Americas':
                countryOptgroupAmericas.appendChild(option);
                break;
            case 'Asia':
                countryOptgroupAsia.appendChild(option);
                break;
            case 'Europe':
                countryOptgroupEurope.appendChild(option);
                break;
            case 'Oceania':
                countryOptgroupOceania.appendChild(option);
                break;
        }
    });

    country.addEventListener('change', (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        console.log(selectedOption);
        const number = selectedOption.getAttribute('data-number');
        const organization = selectedOption.getAttribute('data-organization');
        const website = selectedOption.getAttribute('data-website');
        const note = selectedOption.getAttribute('data-note');
        const donate = selectedOption.getAttribute('data-donate');
        const nonemsg = "We checked, but we couldn\'t find a number for this region. If you know of a hotline in this region, please let us know by joining our Discord server or submitting a GitHub pull request."
        if (number == "NONE") {
            document.querySelector('.info .number').textContent = nonemsg;
        } else if (number) {
            document.querySelector('.info .number').textContent = `Number: ${number}`;
        } else if (selectedOption.label == "Select a region...") {
            document.querySelector('.info .number').textContent = 'Information you search for will appear in this area';
        } else {
            document.querySelector('.info .number').textContent = nonemsg
        }
        if (organization == "nosource") {
            document.querySelector('.info .organization').textContent = `The number we have on file is widely shared on the Internet, but we were unable to locate an official source or organization for it. If you know more about this number, please let us know by joining our Discord server or submitting a GitHub pull request.`;
        } else if (organization) {
            document.querySelector('.info .organization').textContent = `Organization: ${organization}`;
        } else {
            document.querySelector('.info .organization').textContent = '';
        }
        if (website) {
            document.querySelector('.info .website').textContent = `${website}`;
            document.querySelector('.info .websitelink').href = website;
            document.querySelector('.info .websitelabel').textContent = 'Website: ';
        } else {
            document.querySelector('.info .website').textContent = '';
            document.querySelector('.info .websitelabel').textContent = '';
        }
        if (note) {
            document.querySelector('.info .note').textContent = `Note: ${note}`;
        } else {
            document.querySelector('.info .note').textContent = '';
        }
        if (donate) {
            document.querySelector('.info .donate').textContent = `${donate}`;
            document.querySelector('.info .donatelink').href = donate;
            document.querySelector('.info .donationlabel').textContent = 'Donate: ';
        } else {
            document.querySelector('.info .donate').textContent = '';
            document.querySelector('.info .donationlabel').textContent = '';
        }
    });
});






</script>

<title>Lifelines</title>

<div class="container">
    <p class="title">Find a lifeline in your area</p>
    <p class="subtitle">Search hundreds of numbers, dataset last updated 2024/3/13.</p>
    <div class="dropdown">
        <select name="country" class="form-control" id="country">
            <option value="0" label="Select a region...">
            </option>
            <optgroup id="country-optgroup-Africa" label="Africa">
            </optgroup>
            <optgroup id="country-optgroup-Americas" label="Americas">
            </optgroup>
            <optgroup id="country-optgroup-Asia" label="Asia">
            </optgroup>
            <optgroup id="country-optgroup-Europe" label="Europe">
            </optgroup>
            <optgroup id="country-optgroup-Oceania" label="Oceania">
            </optgroup>
        </select>
    </div>

    <div class="info">
        <p class="number">Information you search for will appear in this area</p>
        <p class="organization"></p>
        <p class="websitelabel"></p><a href="" class="websitelink" target="_blank"><p class="website"></p></a>
        <p class="note"></p>
        <p class="donationlabel"></p><a href="" class="donatelink" target="_blank"><p class="donate"></p></a>
    </div>


    
</div>

<style>
    @media screen and (orientation: landscape) {
        .container {
            padding-top: calc(1rem + 70px);
            margin-top: 1.5rem;
        }

        .title {
            padding-top: 19vh;
            font-size: 6vw;
            text-align: center;
            line-height: 0vh;
        }

        .subtitle {
            font-size: 2.5vw;
            padding-bottom:8vh;
            line-height: 0vh;
            text-align: center;
            color:#888888;
        }

        .dropdown {
            width: 50%;
            margin: 0 auto;
            padding-bottom:5vh;
        }

        .dropdown > select {
            min-width: 50vw;
            padding: 1vw;
            font-size: 1.5vw;
            background-color: rgb(32,34,37);
            border: none;
            border-radius: 2vw;
            color: white;
            padding-top:3vh;
            padding-bottom:3vh;
            padding-left: 2vw;
            padding-right: 3vw;
            margin-bottom:5vh;
            border-right: 2vw solid transparent
        }

        .info {
            background-color: rgb(32,34,37);
            border-radius: 15px;
            padding-top: 3vh;
            padding-bottom: 3vh;
            padding-left: 3vw;
            padding-right: 3vw;
        }

        .info > p, a {
            font-size: 1.5vw;
            color: white;

        }
    }
    @media screen and (orientation: portrait) {
        .container {
            padding-top: calc(1rem + 50px);
            margin-top: 1.5rem;
        }

        .title {
            padding-top: 25vh;
            font-size: 8vw;
            text-align: center;
            line-height: 0vh;
        }

        .subtitle {
            font-size: 6vw;
            padding-bottom:10vh;
            /* line-height: 0vh; */
            text-align: center;
            color:#888888;
        }

        .dropdown {
            width: calc(100vw - 2rem);
            margin: 0 auto;
            padding-bottom:6vh;
        }

        .dropdown > select {
            max-width: calc(100vw - 2rem);
            padding: 1vw;
            font-size: 4.3vw;
            background-color: rgb(32,34,37);
            border: none;
            border-radius: 2vw;
            color: white;
            padding-top:3vh;
            padding-bottom:3vh;
            padding-left: 3vw;
            padding-right: 3vw;
            margin-bottom:5vh;
        }

        .info {
            background-color: rgb(32,34,37);
            border-radius: 15px;
            padding-top: 3vh;
            padding-bottom: 3vh;
            padding-left: 3vw;
            padding-right: 3vw;
        }

        .info > p, a {
            font-size: 5vw;
            color: white;

        }
    }
</style>
